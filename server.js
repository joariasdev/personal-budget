// Imports
const express = require('express');
const bodyParser = require("body-parser");
const { nanoid } = require('nanoid');


// Global Variables
const app = express();
const PORT = process.env.PORT || 3000;
const envelopes = [];
const totalbalance = 0;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/envelopes', (req, res, next) => {
    res.send(envelopes);
})

app.get('/envelopes/:id', (req, res, next) => {
    const envelope = envelopes.find(e => e.id === req.params.id);
    if (!envelope) {
        res.status(404).send('Not Found');
    }
    res.send(envelope);
})

app.post('/envelopes', (req, res, next) => {
    const { name, balance } = req.body;
    const newEnvelope = { name, balance };
    newEnvelope.id = nanoid();
    envelopes.push(newEnvelope);
    res.status(201).send(newEnvelope);
});

app.put('/envelopes/:id', (req, res, next) => {
    const envelope = envelopes.find(e => e.id === req.params.id);
    if (!envelope) {
        res.status(404).send('Not Found');
    }
    envelope.name = req.body.name;
    envelope.balance = req.body.balance;
    res.send(envelope);
});

app.delete('/envelopes/:id', (req, res, next) => {
    const envelopeIndex = envelopes.findIndex(e => e.id === req.params.id);
    if (envelopeIndex === -1) {
        res.status(404).send('Not Found');
    }
    envelopes.splice(envelopeIndex, 1);
    res.status(204).send('Deleted');
});

app.post('/envelopes/transfer/:from/:to', (req, res, next) => {
    const { amount } = req.body;
    const originEnvelope = envelopes.find(e => e.id === req.params.from);
    const targetEnvelope = envelopes.find(e => e.id === req.params.to);

    if (!originEnvelope || !targetEnvelope) {
        res.status(404).send('Not Found');
    };

    originEnvelope.balance -= amount;
    targetEnvelope.balance += amount;

    res.send("Transfer complete.")
});

// Sever Init
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));