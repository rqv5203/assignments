const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const {OAuth2Client} = require('google-auth-library');
const User = require('../models/User');

dotenv.config();

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    return data;
}

router.get('/', async function(req, res, next) {
    console.log('oauth route');
    
    const code = req.query.code;
    console.log('code', code);

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is required' });
    }

    try {
        const redirectUrl = 'http://localhost:3000/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        );

        const response = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(response.tokens);
        console.log('tokens acquired');
        
        const user = oAuth2Client.credentials;
        const googleUserData = await getUserData(user.access_token);
        
        // Create or update user in MongoDB
        const userData = {
            email: googleUserData.email,
            name: googleUserData.name,
            picture: googleUserData.picture,
            provider: 'google',
            providerId: googleUserData.sub
        };
        
        const userModel = new User(userData);
        await userModel.save();
        
        // Redirect to frontend with user data
        res.redirect(`http://localhost:3001?success=true&user=${encodeURIComponent(JSON.stringify(userData))}`);
    } catch (error) {
        console.error('Error signing in with Google:', error);
        res.redirect(`http://localhost:3001?success=false&error=${encodeURIComponent('Failed to authenticate with Google')}`);
    }
});

module.exports = router;