const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }, 
    image: {
        type: String,
        required : true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }, 
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        trim: true,
        ref: "User"
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

module.exports = mongoose.model("Post", postsSchema)