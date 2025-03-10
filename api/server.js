const express = require('express');
const cors = require('cors');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authMiddleware = require('./middleware/authMiddleware');
const usersRoute = require('./routes/usersRoute');
const articlesRoute = require('./routes/articlesRoute');
const loginRoute = require('./routes/loginRoute');
const logoutRoute = require('./routes/logoutRoute');
const db = require('./database');

const app = express();
const PORT = 3000;

// Création du store de session
const sessionStore = new MySQLStore({}, db);

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY, // Clé secrète pour signer les sessions
    resave: false,
    saveUninitialized: false,
    store: sessionStore,  // Utilisation de MySQLStore pour stocker la session
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



// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('✅ MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});

app.listen(PORT, () => {
    console.log('✅ API Listen port ' + PORT);
})
