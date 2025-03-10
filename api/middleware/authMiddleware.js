const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const db = require('../database');

router.use(cookieParser());

module.exports = async (req, res, next) => {
   
    const [rows] = await db.execute('SELECT * FROM sessions');
    console.log('📌 SESSIONS :', rows);

    const session = {
        id: rows[0].session_id,
        expires: rows[0].expires,
        data: JSON.parse(rows[0].data),
    }

     // 📌 Vérifie ce qui est stocké
    console.log(session);
    
    if (!session || !session.data.token) {
        return res.status(401).json({ unauthorized: 'Accès refusé : session invalide' });
    }

    jwt.verify(session.data.token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide' });
        }
        
        //req.user = decoded; // Ajoute les infos du token à req.user
        next();
    });
};