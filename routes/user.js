const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);
router.get('/:username', controller.getUserByUsername);
router.put('/:username', controller.updateUser);

router.delete('/:username', controller.deleteUser);

module.exports = router;