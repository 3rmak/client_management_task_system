import React, { useState } from 'react';

import { Link, Redirect } from "react-router-dom";

import { login } from "../../api/auth.api";

import './Auth.css';

export const LoginPage = ({ isLogged, tokenValidityStatus }) => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const tokens = await login(loginForm);

            if (tokens) {
                tokenValidityStatus();
            } else if(!tokens) {
                alert('Login failed. Try again later')
            }
        } catch (e) {
            alert(e.message);
        }
    }

    if (isLogged) {
        return (<Redirect to='/main' />)
    }

    return (
        <div className='container'>
            <form className='loginForm'>
                <div className="mb-3">
                    <label htmlFor="loginEmailInput" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="loginEmailInput"
                        aria-describedby="emailHelp"
                        onChange={(event) => {
                            setLoginForm({...loginForm, email: event.target.value});
                            console.log(loginForm);
                        }}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginPasswordInput" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPasswordInput"
                        onChange={(event) => {
                            setLoginForm({...loginForm, password: event.target.value});
                            console.log(loginForm);
                        }}
                    />
                </div>
                <div className='row justify-content-between m-1'>
                    <Link to='/signup' type='button' className='btn btn-outline-secondary col-4'>Have no profile ? Register</Link>
                    <button type="submit" className="btn btn-primary col-4" onClick={handleSubmit}>Submit</button>
                </div>

            </form>
        </div>
    )
};

