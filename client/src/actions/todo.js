import axios from "axios";
import {API_URL} from "../config";

const MAIN_URL = 'https://mern-todo-app-tryjs-backend.herokuapp.com/' // or http://localhost:5000/


export const createTodo = async (text, userId, todos, setTodos, getTodo) => {
    if(!text) return null
    try {
        await axios.post(`${API_URL}api/todo/add`, {text, userId}, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            setTodos([...todos], res.data.todo)
            getTodo()

        })
    } catch (e) {
        console.log(e)
    }
}

export const getTodos = async (userId, setTodos) => {
    try {
        await axios.get(`${API_URL}api/todo`, {
            headers: {
                "Content-Type": "application/json"
            },
            params: {userId}
        }). then(res => setTodos(res.data.todo))
    } catch (e) {
        console.log(e)
    }
}

export const deleteTodo = async (id, getTodo) => {
    try {

        await axios.delete(`${API_URL}api/todo/delete/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            id
        }).then(() => getTodo())

    } catch (e) {
        console.log(e)
    }
}

export const completedTodo = async (id, getTodo, setTodos, todos) => {
    try {

        await axios.put(`${API_URL}api/todo/complete/${id}`, {id}, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            setTodos([...todos], res.data)
            getTodo()
        })

    } catch (e) {
        console.log(e)
    }
}

export const importantTodo = async (id, getTodo, setTodos, todos) => {
    try {

        await axios.put(`${API_URL}api/todo/important/${id}`, {id}, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            setTodos([...todos], res.data)
            getTodo()
        })

    } catch (e) {
        console.log(e)
    }
}