import React, {useCallback, useContext, useEffect, useState} from 'react'
import './MainPage.scss'
import {completedTodo, createTodo, deleteTodo, getTodos, importantTodo} from "../../actions/todo";
import {AuthContext} from "../../context/AuthContext";

const MainPage = () => {
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([])
    const {userId} = useContext(AuthContext)
    const getTodo = useCallback( async () => {
        getTodos(userId, setTodos)
    }, [userId])

    const createTodoHandler = useCallback((text, userId) => {
        createTodo(text, userId, todos, setTodos, getTodo).then(r => r)
        setText('')
    }, [text, userId, todos, getTodo])

    const removeTodo = useCallback((id, getTodo) => {
        deleteTodo(id, getTodo)
    }, [getTodo])

    const completedTodoHandler = useCallback(async (id) => {
        completedTodo(id, getTodo, setTodos, todos)
    }, [getTodo, todos])

    const importantTodoHandler = useCallback((id) => {
        importantTodo(id, getTodo, setTodos, todos)
    }, [getTodo, todos])



    useEffect(() => {
        getTodo()
    }, [getTodo])

    return (
        <div className={'container'}>
            <div className="main-page">
                <h4>Добавить задачу</h4>
                <form className={'form form-login'} onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="text"
                                   id={'text'}
                                   name={'input'}
                                   className={'validate'}
                                   onChange={ e => setText(e.target.value)}
                                   value={text}

                            />
                            <label htmlFor="input">Задача</label>
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={() => createTodoHandler(text, userId)} className={'waves-effect waves-light btn teal'}>
                            Добавить
                        </button>
                    </div>
                </form>

                <h3>Активные задачи</h3>
                <div className="todos">
                    {
                        todos.map((todo, index) => {
                            const cls = ['row flex todos-item']
                            if (todo.completed) {
                                cls.push('completed')
                            }
                            if (todo.important) {
                                cls.push('important')
                            }


                            return (
                                <div className={cls.join(' ')} key={index}>
                                    <div className="col todos-num">{index + 1}</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="col todos-buttons">
                                        <i className="material-icons teal-text" onClick={() => completedTodoHandler(todo._id)}>check</i>
                                        <i onClick={() => importantTodoHandler(todo._id)} className="material-icons orange-text">warning</i>
                                        <i onClick={() => removeTodo(todo._id, getTodo)} className="material-icons red-text">delete</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage