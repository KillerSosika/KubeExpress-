require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes.js');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

// Простой health-check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Auth Service' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
})
