const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send("Hello, world.")
})

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));