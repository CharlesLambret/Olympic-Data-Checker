// import { MongoClient } from 'mongodb';
// import { createAdmin } from '../src/CRUD/users/admin/createadmin';
// import dotenv from 'dotenv';
// dotenv.config();

// describe('createAdmin', () => {
// let client: MongoClient;

// beforeAll(async () => {
//     const mongoURI = process.env.MONGO_URI || ''; 
//     client = new MongoClient(mongoURI);
//     await client.connect();
// });

// afterAll(async () => {
//     await client.close();
// });

// it('should create an admin user successfully', async () => {
//     const email = 'admin@example.com';
//     const name = 'Test Admin';
//     const password = 'securePassword';
//     const admin = true;
    
//     const result = await createAdmin(email, name, password, admin);
//     expect(result).toEqual('Admin created successfully.');

//     const db = client.db();
//     const users = db.collection('users');
//     const createdUser = await users.findOne({ email });
//     expect(createdUser).toBeTruthy();
//     if (createdUser) {
//         expect(createdUser.name).toBe(name);
//     }

// })}

