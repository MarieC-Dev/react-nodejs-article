const express = require('express');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authMiddleware = require('./middleware/authMiddleware');
const usersRoute = require('./routes/usersRoute');
const articlesRoute = require('./routes/articlesRoute');
const loginRoute = require('./routes/loginRoute');
const logoutRoute = require('./routes/logoutRoute');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY, // Clé secrète pour signer les sessions
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true, 
        sameSite: "lax",
    },
}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // specify your frontend origin here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials (cookies, HTTP authentication)
}));
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoute);
app.use('/articles', articlesRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);


// ADMIN route
app.get('/admin/dashboard', authMiddleware, (req, res) => {
    return res.json({ message: 'Welcome' });
}); 

// check protected routes
//console.log("📌 Routes disponibles :", app._router.stack);

app.listen(PORT, () => {
    console.log('✅ API Listen port ' + PORT);
})
