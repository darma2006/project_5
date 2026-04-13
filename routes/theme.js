const express = require('express');
const router = express.Router();
const controller = require('../controllers/themeController');

router.get('/', controller.getThemes);
router.post('/', controller.createTheme);

module.exports = router;