const mongoose = require('mongoose')

const Chatschema = new mongoose.Schema({
    from : {
        type : String 
    } , 
    to : {
        type : String
    } ,
    msg : {
        type : String 
    } ,
    created_at : {
        type : Date
    }
})

const Chat = mongoose.model('Chat' , Chatschema)

module.exports = Chat