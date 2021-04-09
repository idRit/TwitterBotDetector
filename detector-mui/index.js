const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

app.use(express.static('public'))

app.get("/", express.static(path.join(__dirname, 'public')));

let server = app.listen(5000);
console.log("listening on 5000");