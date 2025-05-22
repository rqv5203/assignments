var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log('user data', data);
    return data;
}

router.get('/', function(req, res, next) {
    const code = req.query.code;
    try {
        const redirectUrl = 'http://localhost:127.0.0.1:3000/oauth';

        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        );
        const response = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(response.tokens);
        console.log('tokens aquired');
        const user = oAuth2Client.credentials;
        await getUserData(user.access_token);
    } catch (error) {
        console.log('error when signing in with google');
    }
});

module.exports = router;