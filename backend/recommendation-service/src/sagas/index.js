const saga1 = require('./saga1');

const startSagas = async () => {
  await saga1();
  console.log('All sagas have been started');
};

module.exports = {startSagas};
