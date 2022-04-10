import React, { useState, useEffect } from 'react';
import { NavLink , useNavigate } from 'react-router-dom';

const Navbar = () => {
    let isActive = true;
    if (!localStorage.getItem('user-info')) {
        isActive = false;
    }

    const navigate = useNavigate();
    const logout = () =>{
        localStorage.clear();
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <NavLink className="navbar-brand" to="/order">
                    React
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">

                        {(() => {
                            if (isActive) {
                                return (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/order">Orders</NavLink>
                                    </li>
                                    
                                )
                            }
                        })()}

                        {(() => {
                            if (!isActive) {
                                return (

                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                )
                            }
                        })()}

                        {(() => {
                            if (!isActive) {
                                return (

                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/Register">Register</NavLink>
                                    </li>
                                )
                            }
                        })()}

                        {(() => {
                            if (isActive) {
                                return (

                                    <li className="nav-item">
                                        <button className='btn btn-primary' onClick={logout}>Logout</button>
                                    </li>
                                )
                            }
                        })()}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;