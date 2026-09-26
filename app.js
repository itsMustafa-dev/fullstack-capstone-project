const express = require('express');
const cors = require('cors');
const app = express();
const port = 3060;

app.use(cors());
app.use(express.json());

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

// API routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes); 
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('GiftLink API is running');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
