const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        require: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task