const express = require('express');
const router = express.Router();
const UserController = require('../../../controllers/administrativo/user/userController');


router.get('/', UserController.getAll);

router.get('/:id', UserController.getById);

router.post('/', UserController.insert);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.delete);

module.exports = router;
