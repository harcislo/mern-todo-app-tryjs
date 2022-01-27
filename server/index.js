const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth.route')
const todoRouter = require('./routes/todo.route')
const corsMiddleware = require('./middleware/cors.middleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(corsMiddleware)
app.use('/api/auth', authRouter)
app.use('/api/todo', todoRouter)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://harcislo:20021986@mern-todoapp-tryjs.49oh2.mongodb.net/mern-todoApp-tryJs?retryWrites=true&w=majority')

        app.listen(PORT, () => {
            console.log(`Server started on PORT: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()