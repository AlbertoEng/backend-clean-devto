const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        message: 'API Devto v1'
    })
})

module.exports = app