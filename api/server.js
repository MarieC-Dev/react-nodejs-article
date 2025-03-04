const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const db = require('./database');

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

/* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', '*');
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");
    res.setHeader("Authorization", "Bearer " + process.env.TOKEN_SECRET);

    next();
}); */

app.get('/articles', async (req, res) => {
    try {   
        const [rows] = await db.query('SELECT * FROM Article');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ msg: 'Get erreur serveur :' + error })
    }
});

app.post('/addUser', (req, res, next) => {
    // TODO Vérifier si user existe déjà

    const { username, email, password } = req.body;

    if(!username || !email) {
        return res.status(400).json({ error: 'Le nom et le mail sont requis' })
    }

    bcrypt.hash(password, 10)
    .then(hashPwd => {
        const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
        const queries = [username, email, hashPwd];

        db.execute(sql, queries, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de l'insertion dans la DB. " + err });
            }
            
            return res.status(201).json({ message: 'Utilisateur ajouté !', userId: result.insertId });
        });
    })
    .catch(err => res.status(500).json({ error: "Erreur de hachage du mot de passe. " + err }));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(401).json({ unauthorized: '' })
    }

    const [dbUsers] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);

    if(dbUsers.length === 0) {
        res.status(401).json({ error: 'Accès refusé' })
    }
    
    const userLogin = dbUsers[0];
    const token = jwt.sign({email}, process.env.TOKEN_SECRET, {expiresIn: '24h'});

    res.cookie("token", token, {
        httpOnly: true, // JS cannot read it
        secure: process.env.TOKEN_SECRET,
        sameSite: 'Strict', // CSRF protection
    });

    bcrypt.compare(password, userLogin.password, (err, result) => {
        if(err) {
            return res.status(500).json({ serverErr: 'Erreur bcrypt compare : ' + err })
        }
        
        return res.status(200).json({ msg: 'Login OK', token, result })
    })
});

function adminToken(req, res, next) {
    const token = req.cookies.token; // Get cookie token

    if(!token) {
        return res.status(401).json({ unauthorized: 'Accès refusé' })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
        if(err) {
            return res.status(500).json({ serverErr: 'Token invalide' })
        }

        req.user = result;
        next();
    });
};

// ADMIN route
app.get('/admin/dashboard', adminToken, (req, res) => {
    return res.json({ message: 'Welcome' });
}); 

// check protected routes
//console.log("📌 Routes disponibles :", app._router.stack);

app.listen(PORT, () => {
    console.log('✅ API Listen port ' + PORT);
})
