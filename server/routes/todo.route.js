const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')
const {Types} = require("mongoose");

router.post('/add', async (req, res) => {
    try {
        const {text, userId} = req.body

        const todo = await new Todo({
            owner: userId,
            text: text,
            completed: false,
            important: false
        })

        await todo.save()

        res.status(200).json({message: 'Задача добавлена', todo})


    } catch (e) {
        res.status(400).json({message: 'Ошибка добавления задачи'})
        console.log(e)
    }
})

router.get('/', async (req, res) => {
    try {
        const {userId} = req.query

        const todo = await Todo.find({owner: userId})

        return res.json({todo})

    } catch (e) {
        res.status(400).json({message: "Ошибка получения данных"})
        console.log(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({_id: req.params.id})
        return res.json(todo)
    } catch (e) {
        res.status(400).json({message: "Ошибка удаления данных"})
        console.log(e)
    }
})

router.put('/complete/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({_id: req.params.id})
        todo.completed = !todo.completed
        await todo.save()
        return res.status(200).json(todo)
    } catch (e) {
        res.status(400).json({message: "Ошибка обновления данных"})
        console.log(e)
    }
})

router.put('/important/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({_id: req.params.id})
        todo.important = !todo.important
        await todo.save()
        return res.status(200).json(todo)
    } catch (e) {
        res.status(400).json({message: "Ошибка обновления данных"})
        console.log(e)
    }
})



module.exports = router