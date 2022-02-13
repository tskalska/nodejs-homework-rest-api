// CKhJ5e7cy1eKZIcr - mongodb
// mongodb+srv://Skate:CKhJ5e7cy1eKZIcr@cluster0.beqzf.mongodb.net/test

// const mongoose = require('mongoose');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require("dotenv").config();

const app = express()
const contactsRouter = require('./routes/api/contacts')
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json())

app.use('/api/contacts', contactsRouter);

// const {DB_HOST, PORT = 3000} = process.env;

// mongoose.connect(DB_HOST)
//   .then(()=>app.listen(PORT))
//   .catch(error=>{
//     console.log(error.message);
//     process.exit(1); 
//   });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app;

