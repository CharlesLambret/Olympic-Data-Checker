import express from 'express';
import indexuser from './CRUD/users/classicuser';
import indexadmin from './CRUD/users/admin/indexusers';
import session from 'express-session';
import indexolympics from './CRUD/olympics/indexolympics';
const app = express();
app.use(express.json());

app.use(session({
  secret: '8xxR1ZXfXUMKYqcsdhCU',
  resave: false,
  saveUninitialized: false,
  name: 'connect.sid',
  cookie: { secure: 'auto', httpOnly: true }
}));

app.use(
  indexuser, 
  indexadmin, 
  indexolympics
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
