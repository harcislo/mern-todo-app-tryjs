import React from 'react';
import './AuthPage.scss'
import {Link} from "react-router-dom";
import {authorization} from "../../actions/user";

const Login = ({form, setForm, changeHandler, login}) => {

    const loginHandler = (form) => {
        authorization(form, login).then(res => res)
    }

    return (
        <div>
            <h3>Авторизация</h3>
            <form onSubmit={e => e.preventDefault()} className="form form-login">
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            type="email"
                            name="email"
                            className="validate"
                            value={form.email}
                            autoFocus={true}
                            onChange={changeHandler}

                        />

                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            type="password"
                            name="password"
                            className="validate"
                            value={form.password}
                            onChange={changeHandler}
                        />

                        <label htmlFor="password">Password</label>
                    </div>
                </div>

                <div className="row">
                    <button
                        className='waves-effect waves-light btn teal'
                        onClick={() => loginHandler(form)}
                    >
                        Войти
                    </button>

                    <Link to="/registration" className="btn-outline btn-reg ">Нет акаунта?</Link>

                </div>
            </form>
        </div>
    );
};

export default Login;