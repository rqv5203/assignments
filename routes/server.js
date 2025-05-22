const express = require('express');
const { connectDB } = require('../db');
const dotenv = require('dotenv');

dotenv.config();

const {OAuth2Client} = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/',async function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://localhost:3000');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    const redirectUrl = 'http://localhost:127.0.0.1:3000/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    })
});

res.json({url: authorizeUrl});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
});