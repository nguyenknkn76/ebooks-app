const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

// router.get('/voices', voiceController.getVoices);
router.get('/voices', voiceController.getAllVoices);
router.get('/voices/:id', voiceController.getVoiceById);
router.post('/voices', voiceController.createVoice);

module.exports = router;
