const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.session);

    if(req.session.user) {
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).json({ logoutError: err })
            }
            res.clearCookie("connect.sid");
            return res.json({ logoutMsg: 'Logout success' })
        })
    } else {
        return res.status(400).json({ userNtFound: 'User not found' });
    }
})

module.exports = router;