const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

router.use(cookieParser());

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(401).json({ 
            unauthorized: 'Email et mot de passe requis', 
            user: {email, password } 
        })
    }

    const [dbUsers] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);

    if(dbUsers.length === 0) {
        res.status(401).json({ error: 'Identifiants incorrect' })
    }
    
    const userLogin = dbUsers[0];
    let token = jwt.sign({email}, process.env.TOKEN_SECRET, {expiresIn: '24h'});

    res.cookie("token", token, {
        httpOnly: true, // JS cannot read it
        secure: process.env.TOKEN_SECRET,
        sameSite: 'Strict', // CSRF protection
    });

    bcrypt.compare(password, userLogin.password, (err, result) => {
        if(err) {
            return res.status(500).json({ serverErr: 'Erreur bcrypt compare : ' + err })
        }

        if(!result) {
            return res.status(401).json({ error: 'Mot de passe incorrect' })
        } else {
            return res.status(200).json({ msg: 'Login OK', token, result, role: userLogin.role })
        }
    })
})

module.exports = router;