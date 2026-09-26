const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');

// Search and filter gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        let query = {};

        // Filter by category
        if (req.query.category && req.query.category !== 'all') {
            query.category = req.query.category;
        }

        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error performing search');
    }
});

module.exports = router;
