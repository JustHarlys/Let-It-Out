import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 3001; // Usar el puerto proporcionado por Railway

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173' // Asegúrate de que esta URL sea correcta
}));

// URI con la contraseña codificada
const mongoUri = "mongodb+srv://Harlys:Harlys%401234@letitoutcluster.hqqmu.mongodb.net/LetItOut?retryWrites=true&w=majority";
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
    const { id, message } = req.body;

    try {
        await db.collection('Entries').insertOne({ id, message });
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
