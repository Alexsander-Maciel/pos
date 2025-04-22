const express = require('express');
const router = express.Router();

// Exemplo de rota administrativa
router.get('/dashboard', (req, res) => {
    res.json({ message: 'Admin Dashboard' });
});

module.exports = router;