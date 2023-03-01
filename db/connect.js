const mongoose = require('mongoose')

const connectDb = () =>{
    return mongoose.connect('mongodb://127.0.0.1:27017/taskManager')
    .then(console.log('Db connected'))
    .catch((error) => console.log('Db not connected'))
}
module.exports = connectDb
