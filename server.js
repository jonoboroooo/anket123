const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submit', (req, res) => {
    const data = req.body;
    fs.appendFile('data.json', JSON.stringify(data) + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data');
        } else {
            res.send('Data saved successfully');
        }
    });
});

app.get('/api/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data');
        } else {
            const lines = data.trim().split('\n');
            const jsonData = lines.map(line => JSON.parse(line));
            res.json(jsonData);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
