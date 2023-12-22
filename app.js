const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const poll = require("./routes/poll")

const app =  express();
require("./config/db")

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/poll", poll);

app.use(cors());

const port = 3000;

app.listen(port, () => console.log(`Server iniciado na porta ${port}`))
