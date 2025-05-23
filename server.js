const express = require('express');
const { connectDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
});