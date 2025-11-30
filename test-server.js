const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Test endpoint pentru înregistrare
app.post('/api/auth/register', (req, res) => {
  console.log('Request body:', req.body);
  res.json({
    success: true,
    message: 'Înregistrare reușită (test)',
    token: 'fake-token-123',
    user: {
      id: '123',
      name: req.body.name,
      email: req.body.email,
      userType: 'student'
    },
    requiresProfileCompletion: true
  });
});

// Test endpoint pentru login
app.post('/api/auth/login', (req, res) => {
  console.log('Login request:', req.body);
  res.json({
    success: true,
    message: 'Login reușit (test)',
    token: 'fake-token-456',
    user: {
      id: '123',
      name: 'Test User',
      email: req.body.email,
      userType: 'student'
    },
    requiresProfileCompletion: false
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Test server rulează pe portul ${PORT}`);
});
