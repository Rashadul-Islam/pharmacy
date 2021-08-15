import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { UserContext } from '../../App';
import "./Login.css";
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    /* eslint-disable no-unused-vars */

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    /* eslint-disable no-unused-vars */

    const [userInfo, setUserInfo] = useState({
        Email: '',
        Password: '',
        Role: ''
    });

    // Invalid text
    const [text, setText] = useState('');


    // load user
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (userInfo.Email !== '') {
            fetch(`https://dry-headland-65168.herokuapp.com/users/${userInfo.Email}`)
                .then(res => res.json())
                .then(data => setUsers(data))
                .catch(err => setUsers(null))
        }

    }, [userInfo.Email])
    const handleBlur = (event) => {
        const newUserInfo = { ...userInfo };
        newUserInfo[event.target.name] = event.target.value;
        setUserInfo(newUserInfo);
    }

    const handleError = (e) => {
        let newText = { ...text };
        newText = (e === true) ? "Invalid Login Credential" : "";
        setText(newText);
        document.getElementById("myForm").reset();
    }

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (users !== null) {
            if (users.password === userInfo.Password && users.role === userInfo.Role) {
                setLoggedInUser(users);
                sessionStorage.setItem('role', users.role);
                sessionStorage.setItem('Id', users._id);
                sessionStorage.setItem('name', users.name);
                history.replace(from);
                handleError(false);
            }
            else {
                handleError(true);
            }

        }
        else {
            handleError(true);
        }
    }
    return (
        <div id="login_bg">
            <Navbar></Navbar>
            <div className="d-flex mt-5 pt-5">
                <div className="card align-items-center mx-auto mt-5 pb-5 card_login" style={{ width: '18rem' }}>
                    <form id="myForm" onSubmit={handleSubmit}>
                        <h5 className="pt-4 text-center font-weight-bold pb-2">Login</h5>
                        <input className="form-control" type="Email" onBlur={handleBlur} name="Email" placeholder="Email" required />
                        <br />
                        <input className="form-control" type="Password" onBlur={handleBlur} name="Password" placeholder="Password" required />
                        <br />
                        <select className="form-control form-control-sm" onBlur={handleBlur} name="Role">
                            <option style={{ display: 'none' }}>Select Role</option>
                            <option>Admin</option>
                            <option>Seller</option>
                        </select>
                        <br />
                        <button className="form-control btn-success" type="submit">Login</button>
                    </form>
                </div>
            </div>
            <div className='pt-4'>
                <p className="text-center text-danger">{text}</p>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;