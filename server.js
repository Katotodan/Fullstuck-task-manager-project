const express = require('express')
const connectDb = require('./db/connect')
const taskModel = require('./db/model')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/', async(req,res) =>{
    try {
        const task = await taskModel.find({})
        res.render('home', {tasks : task})
    } catch (error) {
        res.render('home', {tasks : ""})
    }

    
})
app.post('/add', async (req,res) =>{
    try {
        await taskModel.create(req.query)
        res.redirect('/')
    } catch (error) {
        console.log('Something went wrong')
        res.render('home', {tasks : ""})
    }
    
})

app.delete('/delete', async (req,res) =>{
    try {
        await taskModel.findOneAndDelete({_id: req.query._id})
        res.redirect('/')  
    } catch (error) {
        console.log(error)
        
    }
    
})
app.put('/update', async(req,res)=>{
    try {
        const task1 = await taskModel.findById(req.query)
        await taskModel.findByIdAndUpdate(req.query._id , {done: !task1.done})
    } catch (error) {
        console.log(error)

    }
    
})

const startServer = async() =>{
    await connectDb()
    app.listen(port, console.log('App is listening on port ' + port))
}
startServer()

// Sorting and styling

