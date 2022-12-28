const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/cinemafront'));

app.get('/auth/login', (req, res) => 
    res.sendFile('index.html', {root : 'dist/cinemafront'}),
);