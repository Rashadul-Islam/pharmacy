import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import UserSideBar from '../../SideBar/UserSideBar';
import "./SellerHome.css";

const SellerHome = () => {

    const history = useHistory();

    const [user, setUser] = useState([]);
    const [allMedicine, setAllMedicine] = useState([]);
    const [sells, setSells] = useState([]);

    useEffect(() => {
        fetch('https://dry-headland-65168.herokuapp.com/alluser')
            .then(res => res.json())
            .then(data => setUser(data))
    }, [user])

    useEffect(() => {
        fetch("https://dry-headland-65168.herokuapp.com/medicines")
            .then(res => res.json())
            .then(data => setAllMedicine(data))
    }, [allMedicine])


    const currentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const year = today.getFullYear();
        const current = year + '-' + month + '-' + day;
        return current;
    }

    useEffect(() => {
        const date = currentDate();
        fetch(`https://dry-headland-65168.herokuapp.com/${date}`)
            .then(res => res.json())
            .then(data => setSells(data))
    }, [sells])


    const total = () => {
        let sellTotal = 0;
        let profitTotal = 0;
        for (let i = 0; i < sells.length; i++) {
            sellTotal += (sells[i].totalSell);
            profitTotal += sells[i].totalProfit;
        }
        return ({
            sell: parseFloat(sellTotal.toFixed(2)),
            profit: parseFloat(profitTotal.toFixed(2))
        })
    }

    const handleClick = (link) => {
        history.push(`/${link}`);
    }

    const handleLogOut = () => {
        sessionStorage.clear();
        history.push("/login");
    }

    return (
        <div id="bg">
            <UserSideBar></UserSideBar>
            <div className="d-flex justify-content-center align-items-center row mx-auto responsive">
                <div className=" card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem', height: "11rem" }}>
                    <h1><FaIcons.FaCapsules /></h1>
                    <p><strong>Total Medicine</strong></p>
                    <p><strong>{allMedicine.length}</strong></p>
                </div>
                <div onClick={() => handleClick("sellMedicine")} className=" cursor card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem', height: "11rem" }}>
                    <h1><FaIcons.FaCapsules /></h1>
                    <p><strong>Sell Medicine</strong></p>
                </div>
                <div onClick={() => handleClick("editProfile")} className="cursor card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem',height: "11rem" }}>
                    <h1><FaIcons.FaEdit /></h1>
                    <p><strong>Edit Profile</strong></p>
                </div>
                <div className="card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem', height: "11rem" }}>
                    <h1><FaIcons.FaMoneyBillAlt /></h1>
                    <p><strong>Sells Today</strong></p>
                    <p><strong>{total().sell}৳</strong></p>
                </div>
                <div className="card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem', height: "11rem" }}>
                    <h1><FaIcons.FaMoneyBillAlt /></h1>
                    <p><strong>Profit Today</strong></p>
                    <p><strong>{total().profit}৳</strong></p>
                </div>
                <div onClick={handleLogOut} className=" cursor card card_login d-flex justify-content-center align-items-center col-md-4 position-static p-4 m-4" style={{ width: '12rem', height: "11rem" }}>
                    <h1><FaIcons.FaPowerOff /></h1>
                    <p><strong>LogOut</strong></p>
                </div>
            </div>
            <div className="d-flex justify-content-around align-items-center row w-75 mx-auto">

            </div>
        </div>
    );
};

export default SellerHome;