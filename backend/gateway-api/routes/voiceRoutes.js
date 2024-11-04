const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

router.get('/voices', voiceController.getVoices);

module.exports = router;
