const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');
const userModel = require('../models/userModel');

const login = async (identifier, password) => {
    const user = await userModel.findUserByUsernameOrEmail(identifier);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.generateToken({ id: user.id, username: user.username });
    return { token, user };
};

module.exports = {
    login,
};