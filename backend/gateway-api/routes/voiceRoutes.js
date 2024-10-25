// gateway-api/routes/voiceRoutes.js
const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

// Route to get voice information
// router.get('/voice', voiceController.getVoiceInfo);
router.get('/voice/:voiceId', voiceController.getVoiceById);

module.exports = router;
