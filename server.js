import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = process.env.PORT || 3001; 

app.use(bodyParser.json());

app.use(cors({
    origin: 'https://letitout.vercel.app' 
}));


const mongoUri = process.env.DATABASE_URL;
let db;

MongoClient.connect(mongoUri)
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db('LetItOut');
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/getEntries', async (req, res) => {
    try {
        const entries = await db.collection('Entries').find().toArray();
        res.json(entries);
    } catch (err) {
        console.log('MongoDB Error', err);
        res.status(500).send('Error Fetching Data');
    }
});

app.post('/saveEntry', async (req, res) => {
    const { id, message, date } = req.body;

    try {
        await db.collection('Entries').insertOne({ id, message, date });
        res.send('Entry data inserted');
    } catch (err) {
        console.log('MongoDB Error', err);
        res.status(500).send('Error inserting data');
    }
});

app.post('/saveSuggestion', async (req, res) => {
    const { id, suggestion } = req.body;

    try {
        await db.collection('Suggestions').insertOne({ id, suggestion });
        res.send('Suggestion data inserted');
    } catch (err) {
        console.log('MongoDB Error', err);
        res.status(500).send('Error inserting data');
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
