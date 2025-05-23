const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.post('/request', async function(req, res) {
    const redirectUri = 'http://localhost:3000/auth/linkedin/callback';
    const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=profile%20email%20openid`;
    
    res.json({ url: linkedinAuthUrl });
});

router.get('/callback', async function(req, res) {
    const code = req.query.code;
    const redirectUri = 'http://localhost:3000/auth/linkedin/callback';

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is required' });
    }

    try {
        console.log(env.LINKEDIN_CLIENT_ID);
        // Exchange code for access token
        const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: process.env.LINKEDIN_CLIENT_ID,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET
        });

        const tokenResponse = await fetch(`${tokenUrl}?${params.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Get user profile data
        const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'cache-control': 'no-cache',
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });
        const userData = await profileResponse.json();
        
        res.json({ success: true, user: userData });
    } catch (error) {
        console.error('Error signing in with LinkedIn:', error);
        res.status(500).json({ error: 'Failed to authenticate with LinkedIn' });
    }
});

module.exports = router; 