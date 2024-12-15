const { exec } = require('child_process');

const combineAudio = async () => {
  exec('python src/services/bgmusic/combine-audio.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
}

module.exports = {combineAudio};

