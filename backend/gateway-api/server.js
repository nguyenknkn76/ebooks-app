const express = require('express');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

// Use user routes
// app.use(userRoutes);
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Gateway API listening on port 5000');
});
