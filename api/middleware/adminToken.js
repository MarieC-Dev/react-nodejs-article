const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

router.use(cookieParser());

module.exports = (req, res, next) => {
    const token = req.cookies.token; // Get cookie token

    if(!token) {
        return res.status(401).json({ unauthorized: 'Accès refusé' })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
        if(err) {
            return res.status(500).json({ serverErr: 'Token invalide' })
        }

        console.log(res.body);
        
        req.user = result;
        next();
    });
};
