const {Schema,model, models} = require('mongoose');

const noteSchema = new Schema({
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
    createdAt:{
        type:Date,
        default:Date.now
    }   
},{timestamps:true})

module.exports = model('Note', noteSchema);