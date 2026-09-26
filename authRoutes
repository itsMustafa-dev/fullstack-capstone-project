const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Register
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const { email, password, firstName, lastName } = req.body;

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await collection.insertOne({ email, password: hash, firstName, lastName });
        
        const payload = { user: { id: newUser.insertedId } };
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken });
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const { email, password } = req.body;

        const theUser = await collection.findOne({ email });
        if (!theUser) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, theUser.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const payload = { user: { id: theUser._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken });
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

// Update Profile
router.put('/update', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const { email, firstName, lastName } = req.body;

        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: { firstName, lastName } },
            { returnDocument: 'after' }
        );

        res.json(updatedUser);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
