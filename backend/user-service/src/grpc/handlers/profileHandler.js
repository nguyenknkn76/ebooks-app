const { Profile, MediaFile, sequelize } = require('../../models');
const { uploadMediaFile2 } = require('../../utils/upload');
const grpc = require('@grpc/grpc-js');

const createProfile = async (call, callback) => {
  const transaction = await sequelize.transaction();
  try {
    const { user_id, name, phone, address, avatar } = call.request;
    
    // Create profile
    const profile = await Profile.create({
      user: user_id,
      name,
      phone,
      address
    }, { transaction });

    let mediaFile = null;
    
    // Handle avatar upload if provided
    if (avatar) {
      const fileUrl = await uploadMediaFile2({
        bucket_name: process.env.AWS_BUCKET_NAME_AVATAR,
        file_name: avatar.file_name,
        file_content: avatar.file_content,
        file_type: avatar.file_type
      });

      // Create media file record
      mediaFile = await MediaFile.create({
        profile: profile.id,
        file_url: fileUrl,
        file_type: avatar.file_type,
        file_collection: 'avatar'
      }, { transaction });
    }

    await transaction.commit();

    callback(null, {
      profile: {
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        avatar: mediaFile ? {
          id: mediaFile.id,
          file_url: mediaFile.file_url,
          file_type: mediaFile.file_type
        } : null
      },
      message: 'Profile created successfully'
    });
  } catch (error) {
    await transaction.rollback();
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = { createProfile };