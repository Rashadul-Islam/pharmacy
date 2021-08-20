import React from 'react';
import "./Home.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import * as FaIcons from 'react-icons/fa';

const Home = () => {
    return (
        <div className="home-bg">
            <Navbar></Navbar>
            <div className="d-flex justify-content-center align-items-center row mx-auto homepage">
                <div className=" card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem',height: "11rem" }}>
                    <h1><FaIcons.FaUsers /></h1>
                    <p><strong>Manage User</strong></p>
                </div>
                <div className=" card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem',height: "11rem" }}>
                    <h1><FaIcons.FaCapsules /></h1>
                    <p><strong>Manage Medicine</strong></p>
                </div>
                <div className=" card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem',height: "11rem" }}>
                    <h1><FaIcons.FaFilePdf /></h1>
                    <p><strong>Generate Report</strong></p>
                </div>
                <div className="card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem',height: "11rem" }}>
                    <h1><FaIcons.FaSearch /></h1>
                    <p><strong>Easy Search</strong></p>
                </div>
                <div className="card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem',height: "11rem" }}>
                    <h1><FaIcons.FaMoneyBill /></h1>
                    <p><strong>Easy Billing</strong></p>
                </div>
                <div className=" card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem',height: "11rem" }}>
                    <h1><FaIcons.FaSignInAlt /></h1>
                    <p><strong>Secure Login</strong></p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;