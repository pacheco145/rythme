const express = require('express');
const stylesController = require('../controllers/styles.controller')

const router = express.Router();

router.get('/', stylesController.stylesGet)

module.exports = router;