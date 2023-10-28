const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
var methodOverride = require('method-override')
const port = 3000
const Chat = require('./models/chat.js')

async function calldb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
        console.log('You are succesfull connected to mongodb')
    } catch (error) {
        console.log(error.message)
    }
}

calldb()

const app = express()

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))
app.use(express.static(path.join(__dirname , 'public')))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))

app.listen(port , () => {
    console.log('Your app is listining on port 3000')
})

app.get('/' , (req ,res) => {
    res.send('<h1>Hi and Welcome to my website 👋</h1>')
})

app.get('/chats' , async (req , res) =>  {
        let chats = await Chat.find()
        res.render('chats.ejs' , {chats})
}) 

app.get('/chats/new' , (req ,res)  =>  {
      res.render('form.ejs')
})

app.post('/chats' , (req ,res)  => {
    let {from , to , msg} = req.body
    let chat = new Chat({
        from:from ,
        msg : msg  ,
        to : to
    })
    chat.save()
    res.redirect('/chats')
})

app.get('/chats/:id/edit' , async(req ,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render('edit.ejs' , {chat})
 })

app.put('/chats/:id' , async(req , res) => {
    let {id} = req.params;
    let {msg}  = req.body;
    let chat = await Chat.findByIdAndUpdate(id , {msg : msg} , {runValidators : true} , {new : true})
    res.redirect('/chats')
})

app.delete('/chats/:id' , async(req ,res) => {
    let {id} = req.params;
   await Chat.findByIdAndDelete(id)
   res.redirect('/chats')
    
})