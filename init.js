const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function calldb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
        console.log('You are succesfull connected to mongodb')
    } catch (error) {
        console.log(error.message)
    }
}

calldb()


let allchat = [
    {
        from : 'adam',
        to : 'steve',
        msg : 'hi how are you steve',
        created_at : new Date()
    } ,

    {
        from : 'mark',
        to : 'elon',
        msg : 'hi how are you elon',
        created_at : new Date()
    } ,

    {
        from : 'bill',
        to : 'warren',
        msg : 'hi how are you warren',
        created_at : new Date()
    } ,

    {
        from : 'peter',
        to : 'robert',
        msg : 'hi how are you robert',
        created_at : new Date()
    }
]

// Chat.insertMany(allchat).then(value => console.log(value))
// Chat.find().then(value => console.log(value))
// Chat.deleteMany({}).then(value  =>  console.log(value))