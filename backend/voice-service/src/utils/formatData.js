const formatVoiceResponse = (voice) => ({
  id: voice._id.toString(),
  casual_name: voice.casual_name,
  name: voice.name,
  type: voice.type ? {
    id: voice.type._id.toString(),
    name: voice.type.name
  } : null,
  language: voice.language ? {
    id: voice.language._id.toString(),
    name: voice.language.name
  } : null,
  device_profile: voice.device_profile ? {
    id: voice.device_profile._id.toString(),
    name: voice.device_profile.name,
    description: voice.device_profile.description
  } : null,
  gender: voice.gender,
  age: voice.age ? {
    id: voice.age._id.toString(),
    range: voice.age.range
  } : null,
  sample_voice: voice.sample_voice ? {
    id: voice.sample_voice._id.toString(),
    file_collection: voice.sample_voice.file_collection,
    file_url: voice.sample_voice.file_url,
    file_type: voice.sample_voice.file_type,
    file_size: voice.sample_voice.file_size
  } : null
});

module.exports = {
  formatVoiceResponse
};