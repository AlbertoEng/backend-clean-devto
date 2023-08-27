require('dotenv').config();
const server = require('./src/server');
const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

const PORT = process.env.PORT;

// mongodb+srv://albertoeng:luccaeng@cluster0.clskhtu.mongodb.net/devto-database
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
    .then(()=>{
        console.log('DB conected');
        server.listen( PORT , ()=>{
            console.log(`server listening on port ${PORT}`);
        })
    })
    .catch(( err )=>{
        console.error('DB error', err);
    })





