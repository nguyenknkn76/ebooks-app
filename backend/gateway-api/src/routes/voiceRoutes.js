const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

router.post('/voices', voiceController.createVoice);
router.get('/voices', voiceController.getAllVoices);
router.get('/voices/filter', voiceController.getAllVoices2);
router.get('/voices/voice/:id', voiceController.getVoiceById);
router.delete('/voices/:id', voiceController.deleteVoice);

router.post('/voices/ages', voiceController.createAge);
router.get('/voices/ages', voiceController.getAllAges);
router.get('/voices/ages/:id', voiceController.getAgeById);

router.post('/voices/device-profiles', voiceController.createDeviceProfile);
router.get('/voices/device-profiles', voiceController.getAllDeviceProfiles);
router.get('/voices/device-profiles/:id', voiceController.getDeviceProfileById);

router.post('/voices/languages', voiceController.createLanguage);
router.get('/voices/languages', voiceController.getAllLanguages);
router.get('/voices/languages/:id', voiceController.getLanguageById);

router.post('/voices/types', voiceController.createType);
router.get('/voices/types', voiceController.getAllTypes);
router.get('/voices/types/:id', voiceController.getTypeById);

router.post('/voices/audio-files', voiceController.createAudioFiles);
router.get('/voices/count/total', voiceController.countVoices);

router.get('/voices/ggc-names', voiceController.getGgcVoiceName);
module.exports = router;
