const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const {OAuth2Client} = require('google-auth-library');

dotenv.config();

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log('user data', data);
    return data;
}

router.get('/', async function(req, res, next) {
    const code = req.query.code;
    
    if (!code) {
        return res.status(400).json({ error: 'Authorization code is required' });
    }

    try {
        const redirectUrl = 'http://localhost:3001/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        );

        const response = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(response.tokens);
        console.log('tokens acquired');
        
        const user = oAuth2Client.credentials;
        const userData = await getUserData(user.access_token);
        
        res.json({ success: true, user: userData });
    } catch (error) {
        console.error('Error signing in with Google:', error);
        res.status(500).json({ error: 'Failed to authenticate with Google' });
    }
});

module.exports = router;