const express = require('express');
const router = express.Router();
const Gif = require('../models/Gif');

// Save a GIF
router.post('/save', async (req, res) => {
    try {
        const gifData = {
            id: req.body.id,
            title: req.body.title,
            url: req.body.url,
            preview: req.body.preview,
            userId: req.body.userId,
            tags: req.body.tags || []
        };

        const gif = new Gif(gifData);
        const result = await gif.save();
        res.json({ success: true, gif: result });
    } catch (error) {
        console.error('Error saving GIF:', error);
        res.status(500).json({ success: false, error: 'Failed to save GIF' });
    }
});

// Get user's saved GIFs
router.get('/user/:userId', async (req, res) => {
    try {
        const gifs = await Gif.findByUserId(req.params.userId);
        res.json({ success: true, gifs });
    } catch (error) {
        console.error('Error fetching user GIFs:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch GIFs' });
    }
});

// Delete a saved GIF
router.delete('/:id', async (req, res) => {
    try {
        await Gif.delete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting GIF:', error);
        res.status(500).json({ success: false, error: 'Failed to delete GIF' });
    }
});

module.exports = router; 