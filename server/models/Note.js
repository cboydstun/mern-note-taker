const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    priority:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

module.exports = mongoose.model('Note', NoteSchema);