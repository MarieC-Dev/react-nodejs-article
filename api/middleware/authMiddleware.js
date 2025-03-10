const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

router.use(cookieParser());

module.exports = (req, res, next) => {
    console.log('===> Middleware, session:', req.session); // 📌 Vérifie ce qui est stocké

    if (!req.session || !req.session.token) {
        return res.status(401).json({ unauthorized: 'Accès refusé : session invalide' });
    }

    jwt.verify(req.session.token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide' });
        }
        
        req.user = decoded; // Ajoute les infos du token à req.user
        next();
    });
};