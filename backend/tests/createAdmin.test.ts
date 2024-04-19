import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { createAdmin } from '../src/CRUD/users/admin/operations/createadmin';
import bcrypt from 'bcrypt';
import { MongoConnection } from '../src/db/call';

jest.mock('../src/db/call', () => ({
    MongoConnection: jest.fn()
}));

describe('MongoDB Connection and Admin Creation', () => {
    let mongoServer: MongoMemoryServer;
    let db: Db;
    let client: MongoClient;

    beforeAll(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            jest.requireActual('../src/db/call').MongoConnection.mockImplementation(async () => {
                const realClient = new MongoClient(uri);
                await realClient.connect();
                return realClient;
            });

            client = await MongoConnection(); 
            db = client?.db("TP-React");
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
        }
    });

    afterAll(async () => {
        try {
            await client.close();
        } catch (error) {
            console.error('Error closing the client:', error);
        }
        await mongoServer.stop();
    });

    beforeEach(async () => {
        try {
            await db.collection('users').deleteMany({});
        } catch (error) {
            console.error('Database operation failed:', error);
        }
    });

    test('should successfully connect to MongoDB', async () => {
        await expect(client.db().command({ ping: 1 })).resolves.not.toThrow();
    });

    test('should create a new admin if the email does not exist', async () => {
        const result = await createAdmin('test@example.com', 'Test Admin', 'password123', true);
        expect(result).toBe('Admin created successfully.');
        const savedAdmin = await db.collection('users').findOne({ email: 'test@example.com' });
        expect(savedAdmin).not.toBeNull();
        if (savedAdmin) {
            expect(savedAdmin.name).toBe('Test Admin');
            expect(savedAdmin.admin).toBe(true);
            expect(await bcrypt.compare('password123', savedAdmin.passwordHash)).toBe(true);
        }
    });

    test('should return an error message if the admin already exists', async () => {
        await db.collection('users').insertOne({
            email: 'test@example.com',
            name: 'Existing Admin',
            passwordHash: await bcrypt.hash('password123', 10),
            admin: true
        });
        const result = await createAdmin('test@example.com', 'Test Admin', 'password123', true);
        expect(result).toBe('Admin already exists.');
    });
});
