import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { register } from "../../api/auth.api";

import './Auth.css';

export const RegisterPage = ({ isLogged }) => {
    const initRegisterForm = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    const [createSuccessfully, setCreateSuccessfully] = useState(false);
    const [registerForm, setRegisterForm] = useState(initRegisterForm);

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const response = await register(registerForm);

            if (response) {
                setCreateSuccessfully(true);
                setRegisterForm(initRegisterForm);
                alert('Created! Try to login');
            }
        } catch (e) {
            alert(e.message);
        }
    }

    if (createSuccessfully) {
        return (
            <Redirect to='/signin' />
        )
    }

    if (isLogged) {
        return (<Redirect to='/main' />)
    }

    return (
        <div className='container'>
            <div>

            </div>
            <form className='registerForm'>
                <div className="mb-3">
                    <label htmlFor="registerFirstNameInput" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="registerFirstNameInput"
                        onChange={(event) => {
                            setRegisterForm({...registerForm, firstName: event.target.value});
                            console.log(registerForm);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="registerLastNameInput" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="registerLastNameInput"
                        onChange={(event) => {
                            setRegisterForm({...registerForm, lastName: event.target.value});
                            console.log(registerForm);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="registerEmailInput" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="registerEmailInput"
                        onChange={(event) => {
                            setRegisterForm({...registerForm, email: event.target.value});
                            console.log(registerForm);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="registerPasswordInput" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="registerPasswordInput"
                        onChange={(event) => {
                            setRegisterForm({...registerForm, password: event.target.value});
                            console.log(registerForm);
                        }}
                    />
                    <div id="passwordHelp" className="form-text">We'll never share your pass with anyone else.</div>
                </div>
                <div className='row justify-content-between m-1'>
                    <Link to='/signin' type='button' className='btn btn-outline-secondary col-4'>Already have profile ? Sign In</Link>
                    <button type="submit" className="btn btn-success col-4" onClick={handleSubmit}>Create Profile</button>
                </div>

            </form>
        </div>
    )
}
