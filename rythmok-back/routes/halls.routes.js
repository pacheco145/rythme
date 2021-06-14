const express = require('express');
const controller = require('../controllers/halls.controller');

const router = express.Router();

router.get('/', controller.hallsGet);
router.get('/:id', controller.hallsGetById);

module.exports = router;
