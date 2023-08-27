const express = require('express');
const cors = require('cors')
const app = express();

const authRouter  = require('./routes/auth.router');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');

app.use(cors())
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter );
app.use('/posts', postsRouter);

app.get('/', ( req, res )=>{
    res.json({
        message: 'API Devto v1'
    })
})

module.exports = app