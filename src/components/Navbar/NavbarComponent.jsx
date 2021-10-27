import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { logout } from "../../api/auth.api";

import './Navbar.css';

export const Navbar = ({ isLogged, tokenValidityStatus }) => {
    const handleLogout = async (e) => {
        try {
            e.preventDefault();

            if (localStorage.getItem('access_token')) {
                await logout();
                tokenValidityStatus();
                return (
                    <Redirect to='signin' />
                )
            }
        } catch (e) {
            alert(e.message);
        }
    }
    console.log('isLogged', isLogged)
    const navbarContainer = () => {
        if (isLogged) {
            return (
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="btn nav-link" to='/main'>Home</Link>
                            <Link className="btn nav-link" aria-current="page" to='/new_task'>Create task</Link>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <a className='btn nav-link me-2' onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            )
        } else if (!isLogged) {
            return (
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="btn nav-link" to='/main'>Home</Link>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <Link className='btn nav-link me-2' to='/signin'>Sign In</Link>
                        <Link className='btn nav-link me-2' to='/signup'>Sign Up</Link>
                    </div>
                </div>
            )
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {navbarContainer()}
        </nav>
    );
};
