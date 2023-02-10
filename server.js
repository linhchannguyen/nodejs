import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/books', authenToken, (req, res) => {
    res.json({ status: 'success', data: req.body });
})

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
        if (error) res.sendStatus(403)
        next();
    })
}

app.listen(PORT, () => {
    console.log(`Server run with port ${PORT}`)
})