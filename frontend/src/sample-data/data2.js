const languages = ["English", "Vietnamese"];
const deviceProfiles = ["Smartphone", "Headphone"];
const ages = ["Adult", "Senior", "Child"];
const types = ["Basic", "Neutral2", "WaveNet"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const voices = Array.from({ length: 10 }, (_, index) => {
  const language = getRandomItem(languages);
  const locale = language === "English" ? "en-US" : "vi-VN";
  const type = getRandomItem(types);



  return {
    id: `voice${index + 1}`,
    name: name,
    casual_name: `Voice ${index + 1}`,
    language: language,
    device_profile: getRandomItem(deviceProfiles),
    gender: index % 2 === 0 ? "Male" : "Female",
    age: getRandomItem(ages),
    type: type
  };
});

console.log(voices);
