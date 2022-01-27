import React, {useContext, useState} from 'react'
import './AuthPage.scss'
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import {AuthContext} from "../../context/AuthContext";

const AuthPage = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        console.log([e.target.name],':', form)
    }

    const {login} = useContext(AuthContext)

    return (
        <>
            <div className="container">
                <div className="auth-page">
                        <Routes>
                            <Route path="/" element={<Login form={form} setForm={setForm} changeHandler={changeHandler} login={login}/>} />
                            <Route path="/registration" element={<Registration form={form} setForm={setForm} changeHandler={changeHandler}/>} />
                        </Routes>

                </div>
            </div>
        </>

    )
}

export default AuthPage;