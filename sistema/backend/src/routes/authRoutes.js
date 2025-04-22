const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const authSchema = require('../schemas/authSchema');
const authResolver = require('../resolvers/authResolver');
const router = express.Router();

// Middleware para validar requisições GraphQL
router.use('/login', (req, res, next) => {
    if (!req.body || !req.body.query) {
        return res.status(400).json({ error: 'A query string is required.' });
    }
    next();
});

// Configuração do endpoint GraphQL
router.use('/login', graphqlHTTP({
    schema: authSchema,
    rootValue: authResolver,
    graphiql: process.env.NODE_ENV !== 'production', // Desabilitar GraphiQL em produção
    customFormatErrorFn: (err) => {
        console.error(err.message);
        return { message: err.message || 'An error occurred.' };
    },
}));

module.exports = router;