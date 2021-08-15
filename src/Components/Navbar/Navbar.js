import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../Images/logo.png";

const Navbar = () => {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <img style={{ width: "120px" }} className="img-fluid" src={logo} alt="" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link link_style text-white" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link_style text-white" aria-current="page" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link link_style text-white" aria-current="page" target="_blank" rel="noopener noreferrer" href="https://facebook.com/rashadul5">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;