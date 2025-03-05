const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
    try {   
        const [rows] = await db.query('SELECT * FROM Article');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ msg: 'Get erreur serveur :' + error })
    }
});

module.exports = router;