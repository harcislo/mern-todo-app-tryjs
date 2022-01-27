import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {registration} from "../../actions/user";

const Registration = ({form, setForm, changeHandler}) => {
    const history = useNavigate()

    return (
        <div>
            <h3>Регистрация</h3>
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
                        onClick={() => registration(form, history)}
                    >
                        Регистрация
                    </button>

                    <Link to="/" className="btn-outline btn-reg ">Есть акаунт?</Link>

                </div>
            </form>
        </div>
    );
};

export default Registration;