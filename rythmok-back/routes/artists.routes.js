const express = require('express');
const controller = require('../controllers/artists.controller');

const router = express.Router();

router.get('/', controller.artistsGet);
router.get('/:id', controller.artistGetById);

module.exports = router;
