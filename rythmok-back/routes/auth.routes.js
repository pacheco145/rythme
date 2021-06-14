const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();


router.post('/login', controller.loginPost);

router.get('/check-session', controller.checkSession);

router.post('/register', controller.registerPost);

router.post('/logout', controller.logoutPost);

module.exports = router; 