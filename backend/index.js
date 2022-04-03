const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const cors = require('cors')

require("dotenv").config();

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI
const DB_NAME = process.env.DB_NAME

const app = express()

const corsOptions = {}

app.use(express.json(), cors(corsOptions))
app.use('/auth', authRouter)

const start = async () => {
  try {
    await mongoose.connect(DB_URI + DB_NAME)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()