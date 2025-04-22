const express = require('express');
const adminRoutes = require('./adminRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Rotas administrativas
router.use('/admin', adminRoutes);

// Rotas de autenticação
router.use('/auth', authRoutes);

module.exports = router;