import { Request, Response, Router } from 'express';
import { login } from '../operations/login';
import { ObjectId } from 'mongodb';

export const userLogin = Router();

userLogin.post("/user/login", async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await login(email, password);

        if (result.success && result._id) { 
            req.session.userId = new ObjectId(result._id);
            res.send({ message: "User logged in successfully", userId: result._id.toString() }); // Send the ObjectId as a string
        } else {
            res.status(401).send(result.message);
        }
        
    } catch (error: any) {
        res.status(500).send("Login failed: " + error.message);
    }
});



export const userLogout = Router();

userLogout.post('/logout', (req: Request, res: Response) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: 'Failed to log out, please try again.' });
        }

        res.clearCookie('connect.sid'); 
        res.send({ message: 'You have been logged out successfully.' });
    });
});


