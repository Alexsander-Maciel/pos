const express = require('express');
const router = express.Router();
const permissionController = require('../../../controllers/administrativo/permission/permissionController');


router.get('/', permissionController.getAll);

router.get('/:id', permissionController.getById);

router.post('/',  permissionController.insert);

router.put('/:id', permissionController.update);

router.delete('/:id', permissionController.softDelete);

module.exports = router;
