const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    profilePic: {
        type: String,
        trim: true,
        default: 'https://th.bing.com/th/id/R.653f93c3cb58cb7f21b6a721ebdbec19?rik=wJggWmq6sjoy5w&riu=http%3a%2f%2fwww.4x4.ec%2foverlandecuador%2fwp-content%2fuploads%2f2017%2f06%2fdefault-user-icon-8.jpg&ehk=9fyAmt1RIymhvMctzqJXJMDodZfLHOkhYLUAIoBLYfs%3d&risl=&pid=ImgRaw&r=0'
    },
    email: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date()
    }
})


module.exports = mongoose.model('User', usersSchema);