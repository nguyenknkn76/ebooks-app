// const mongoose = require('mongoose');
// const Voice = require('../models/voice');
// const Language = require('../models/language');
// const DeviceProfile = require('../models/deviceProfile');
// const Type = require('../models/type');
// const MediaFile = require('../models/mediaFile');
// // const { v4: uuidv4 } = require('uuid');

// const insertSampleData = async () => {
//     // Insert sample data for Language
//     const languages = await Language.insertMany([
//         { language_code: 'en', language: 'English', description: 'English Language' },
//         { language_code: 'es', language: 'Spanish', description: 'Spanish Language' }
//     ]);

//     // Insert sample data for DeviceProfile
//     const deviceProfiles = await DeviceProfile.insertMany([
//         { name: 'Profile 1', description: 'First device profile' },
//         { name: 'Profile 2', description: 'Second device profile' }
//     ]);

//     // Insert sample data for Type
//     const types = await Type.insertMany([
//         { type: 'Type A', description: 'Description for Type A' },
//         { type: 'Type B', description: 'Description for Type B' }
//     ]);

//     // Insert sample data for MediaFile
//     const mediaFiles = await MediaFile.insertMany([
//         { table_name: 'media', file_url: 'http://example.com/file1.mp3', file_type: 'audio/mp3', file_size: 12345 },
//         { table_name: 'media', file_url: 'http://example.com/file2.mp3', file_type: 'audio/mp3', file_size: 67890 }
//     ]);

//     // Insert sample data for Voice
//     const voices = await Voice.insertMany([
//         {
//             name: 'Anna',
//             type: types[0]._id, // Giả sử type đầu tiên là "Type A"
//             language: languages[0]._id, // Giả sử language đầu tiên là "English"
//             device_profile: deviceProfiles[0]._id, // Giả sử deviceProfile đầu tiên là "Profile 1"
//             sample_voice: mediaFiles[0]._id, // Giả sử mediaFile đầu tiên là "http://example.com/file1.mp3"
//             gender: 'Female',
//             age: 25
//         },
//         {
//             name: 'John',
//             type: types[1]._id, // Giả sử type thứ hai là "Type B"
//             language: languages[1]._id, // Giả sử language thứ hai là "Spanish"
//             device_profile: deviceProfiles[1]._id, // Giả sử deviceProfile thứ hai là "Profile 2"
//             sample_voice: mediaFiles[1]._id, // Giả sử mediaFile thứ hai là "http://example.com/file2.mp3"
//             gender: 'Male',
//             age: 35
//         }
//     ]);

//     console.log('Sample data inserted successfully');
//     mongoose.connection.close();
// }

// module.exports = { insertSampleData }
