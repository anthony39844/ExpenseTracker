const db = require('./db/db.js'); 
const {readdirSync, read} = require('fs')
const express = require('express')
const session = require('express-session');
const cors = require('cors')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const {authenticate} = require('./authenticate')
const app = express()


require('dotenv').config()

const PORT = process.env.PORT
const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Update to your frontend origin
    credentials: true}))

//session
app.use(session({
    secret: 'anthony39844', // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoUrl }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to Port', PORT)
    })
}

server() 