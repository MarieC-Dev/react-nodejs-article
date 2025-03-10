const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

router.use(cookieParser());

// .../login/me
router.get('/me', (req, res) => {
    if(req.session.user) {
        return res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        return res.json({ isAuthenticated: false, msg: 'User not connected' })
    }
})

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(401).json({ 
            unauthorized: 'Email et mot de passe requis', 
            user: { email, password } 
        })
    }

    const [dbUsers] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);

    if(dbUsers.length === 0) {
        return res.status(401).json({ error: 'Identifiants incorrect' })
    }
    
    const userLogin = dbUsers[0];

    bcrypt.compare(password, userLogin.password, (err, result) => {
        if(err) {
            return res.status(500).json({ serverErr: 'Erreur bcrypt compare : ' + err })
        }

        if(!result) {
            return res.status(401).json({ error: 'Mot de passe incorrect' })
        } 

        let token = jwt.sign(
            { id: userLogin.id, email: userLogin.email }, 
            process.env.TOKEN_SECRET, 
            { expiresIn: '7d' }
        );
    
        req.session.user = { id: userLogin.id, email: userLogin.email }
        req.session.token = token;
    
        req.session.save(err => {
            if (err) {
                return res.status(500).json({ session: 'Erreur de sauvegarde de la session' });
            }
            // ✅ Envoi de la réponse finale (UNE SEULE FOIS)
            return res.json({ msg: 'Login OK', token, user: req.session.user });
        });    
    })
})

module.exports = router;
