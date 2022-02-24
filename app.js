const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const multer = require('multer');
// const {authenticate} = require ('./middlewares');
// const changeAvatar = require("../../controllers/changeAvatar");




require("dotenv").config();

const app = express()
const authRouter = require('./routes/api/authRouter');
const contactsRouter = require('./routes/api/contacts');
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json())

// const upload = multer({dest: 'temp/'});

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);


// app.patch('api/avatars', upload.single("image"), authenticate, async (req, res)=>{
//   console.log(req.body);
//   console.log(req.file);
// });


app.use((req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app;

