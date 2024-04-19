import { Request, Response, Router } from 'express';
import { login } from '../operations/login';

const userLogin = Router();

userLogin.post("/user/login", async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await login(email, password);
        res.send(result);
        console.log("User logged in successfully");
    } catch (error: any) {
        res.status(500).send("Login failed: " + error.message);
    }
});

export default userLogin;
