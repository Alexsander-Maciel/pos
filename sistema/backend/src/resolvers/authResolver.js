const authController = require('../controllers/authController');

const authResolver = {
    Query: {
        login: async (_, { identifier, password }) => {
            return await authController.login(identifier, password);
        },
    },
};

module.exports = authResolver;