const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const voiceRoutes = require('./routes/voiceRoutes');
const bookRoutes = require('./routes/bookRoutes');
const sagaRoutes = require('./routes/sagaRoutes');
const app = express();

app.use(express.json({limit: '200mb'}));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', voiceRoutes);
app.use('/api', bookRoutes);
app.use('/api', sagaRoutes);
// app.use('/api', noteRoutes);

const runApp = async () => {
  app.listen(5000, () => {
    console.log('Gateway API listening on port 5000');
  });
}

module.exports = {runApp};