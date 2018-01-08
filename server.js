var express = require('express');
var path = require('path');
var app = express();
app.use('/node_modules', express.static('node_modules'));
app.use(express.static('public'));
app.listen(8000);

 