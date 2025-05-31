const express = require('express');
const dotenv = require('dotenv');
const {OAuth2Client} = require('google-auth-library');

dotenv.config();

const app = express();
const cors = require('cors');

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3001', // You can specify allowed origins in your .env file
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());

var requestRoutes = require('./routes/request');
var oauthRoutes = require('./routes/oauth');
var linkedinRoutes = require('./routes/linkedin');
var gifsRoutes = require('./routes/gifs');

app.use('/request', requestRoutes);
app.use('/oauth', oauthRoutes);
app.use('/auth/linkedin', linkedinRoutes);
app.use('/gifs', gifsRoutes);

module.exports = app;