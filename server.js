//const express = require('express');
//const path = require('path');

//const app = express();

//app.use(express.static('./dist/cinemafront'));

//app.get('/', (req, res) => 
//    res.sendFile('index.html', {root : 'dist/cinemafront'}),
//);


const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('/auth', serveStatic(path.join(__dirname,'/dist')))

const port = process.env.PORT || 8080
app.listen(port)