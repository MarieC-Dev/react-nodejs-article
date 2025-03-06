const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const usersRoute = require('./routes/usersRoute');
const articlesRoute = require('./routes/articlesRoute');
const loginRoute = require('./routes/loginRoute');
const adminToken = require('./middleware/adminToken');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // specify your frontend origin here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials (cookies, HTTP authentication)
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoute);
app.use('/articles', articlesRoute);
app.use('/login', loginRoute);


// ADMIN route
app.get('/admin/dashboard', adminToken, (req, res) => {
    return res.json({ message: 'Welcome' });
}); 

// check protected routes
//console.log("📌 Routes disponibles :", app._router.stack);

app.listen(PORT, () => {
    console.log('✅ API Listen port ' + PORT);
})
