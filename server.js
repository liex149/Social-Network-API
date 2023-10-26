const express = require('express');
const db = require('./config/connection')
const mongoose = require('mongoose');
const routes = require('./routes');
const cwd = process.cwd();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));