const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const voiceRoutes = require('./routes/voiceRoutes');

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', voiceRoutes);

app.listen(4000, () => {
    console.log('Gateway API running on port 4000');
});

