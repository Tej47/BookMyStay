require('dotenv').config();
const express = require('express');
const dbConfig = require('./dbconfig');
const router = require('./router');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


dbConfig();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
