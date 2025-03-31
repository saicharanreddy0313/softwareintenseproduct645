require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/UserRoutes');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000', // Should match your React app's port (usually 3000)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add more methods as needed
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Database
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// In your Express.js route
const axios = require('axios');




// Error handling

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});