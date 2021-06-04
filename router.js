const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server is currently UP and RUNNING!');
})

module.exports = router;