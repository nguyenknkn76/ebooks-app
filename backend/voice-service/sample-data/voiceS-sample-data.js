const mongoose = require('mongoose');
const Voice = require('../models/voice');
const Language = require('../models/language');
const DeviceProfile = require('../models/deviceProfile');
const Type = require('../models/type');
const MediaFile = require('../models/mediaFile');
const { v4: uuidv4 } = require('uuid');

const insertSampleData = async () => {
    // console.log('Connected successfully to MongoDB');

    // Insert sample data for Language
    const languages = await Language.insertMany([
        { id: uuidv4(), language_code: 'en', language: 'English', description: 'English Language' },
        { id: uuidv4(), language_code: 'es', language: 'Spanish', description: 'Spanish Language' }
      ]);
  
      // Insert sample data for DeviceProfile
      const deviceProfiles = await DeviceProfile.insertMany([
        { id: uuidv4(), name: 'Profile 1', description: 'First device profile' },
        { id: uuidv4(), name: 'Profile 2', description: 'Second device profile' }
      ]);
  
      // Insert sample data for Type
      const types = await Type.insertMany([
        { id: uuidv4(), type: 'Type A', description: 'Description for Type A' },
        { id: uuidv4(), type: 'Type B', description: 'Description for Type B' }
      ]);
  
      // Insert sample data for MediaFile
      const mediaFiles = await MediaFile.insertMany([
        { id: uuidv4(), table_name: 'media', file_url: 'http://example.com/file1.mp3', file_type: 'audio/mp3', file_size: 12345 },
        { id: uuidv4(), table_name: 'media', file_url: 'http://example.com/file2.mp3', file_type: 'audio/mp3', file_size: 67890 }
      ]);
  
      // Insert sample data for Voice
      const voices = await Voice.insertMany([
        { 
          id: uuidv4(),
          name: 'Voice 1',
          type_id: types[0]._id,
          language_id: languages[0]._id,
          device_profile_id: deviceProfiles[0]._id,
          sample_voice_id: mediaFiles[0]._id
        },
        { 
          id: uuidv4(),
          name: 'Voice 2',
          type_id: types[1]._id,
          language_id: languages[1]._id,
          device_profile_id: deviceProfiles[1]._id,
          sample_voice_id: mediaFiles[1]._id
        }
      ]);
  
    console.log('Sample data inserted successfully');
    mongoose.connection.close();
}

module.exports = {insertSampleData}

