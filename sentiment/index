require('dotenv').config();
const express = require('express');
const natural = require('natural'); 

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

app.post('/sentiment', (req, res) => {
    const { sentence } = req.query;
    if (!sentence) {
        return res.status(400).json({ error: 'Sentence is missing' });
    }
    
    const tokenizer = new natural.WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(sentence);
    const sentiment = analyzer.getSentiment(tokenizedReview);
    
    let sentimentLabel = 'neutral';
    if (sentiment > 0) sentimentLabel = 'positive';
    if (sentiment < 0) sentimentLabel = 'negative';

    res.json({ sentimentScore: sentiment, sentiment: sentimentLabel });
});

app.listen(port, () => {
    console.log(`Sentiment service running on port ${port}`);
});
