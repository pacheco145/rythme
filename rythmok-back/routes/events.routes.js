const express = require('express');
const controller = require('../controllers/events.controller')

const router = express.Router();

router.get('/', controller.eventsGet)
router.get('/:id', controller.eventGetById)



module.exports = router;
