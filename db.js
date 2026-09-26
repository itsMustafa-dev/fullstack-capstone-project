const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB cluster
        await client.connect(); 
        console.log("Connected successfully to MongoDB");
        
        dbInstance = client.db('giftlink');
        return dbInstance;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

module.exports = connectToDatabase;
