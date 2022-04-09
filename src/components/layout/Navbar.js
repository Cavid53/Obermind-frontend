import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    React
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link"  to="/">Orders</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link"  to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link"  to="/Register">Register</NavLink>
                        </li>
                    </ul>
                </div>
            
            </div>
        </nav>
    )
}

export default Navbar;