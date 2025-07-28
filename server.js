// Imports
const express = require('express');
const bodyParser = require("body-parser");
const { nanoid } = require('nanoid');


// Global Variables
const app = express();
const PORT = process.env.PORT || 3000;
const envelopes = [];
const totalBudget = 0;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res, next) => {
    res.send("Hello, world.")
})

app.post('/envelopes', (req, res, next) => {
    const { name, budget } = req.body;
    const newEnvelope = { name, budget };
    newEnvelope.id = nanoid();
    envelopes.push(newEnvelope);
    res.status(201).send(newEnvelope);
});

// Sever Init
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));