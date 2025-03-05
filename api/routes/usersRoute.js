const express = require('express');
const router = express.Router();
const db = require('../database');


router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ serverErr: error });
    }
});

router.post('/', (req, res) => {
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
})

module.exports = router;