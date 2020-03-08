const express = require('express')();
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(path.join(__dirname, './client')));

app.get('/', (req, res) => res.send('<h1>Hello world</h1>'));
app.listen(3000, () => console.log(`listening on port ${PORT}`));
