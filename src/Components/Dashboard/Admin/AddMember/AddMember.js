import React from 'react';
import { useState } from 'react/cjs/react.development';
import UserSideBar from '../../SideBar/UserSideBar';
import * as IoIcons from 'react-icons/io';
const AddMember = () => {

    const [userInfo, setUserInfo] = useState({
        email: '',
        name: '',
        password: '',
        role: ''
    });

    const handleBlur = (event) => {
        const newUserInfo = { ...userInfo };
        newUserInfo[event.target.name] = event.target.value;
        setUserInfo(newUserInfo);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { ...userInfo };
        const url = "https://dry-headland-65168.herokuapp.com/addMember"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('User Added Successfully!!!');
                    document.getElementById("myForm").reset();
                }
            })

    }

    return (
        <div id="background">
            <UserSideBar></UserSideBar>
            <div className="pt-4 mt-5 pb-4">
                <div className="card mx-auto p-4 pb-5 mt-5 position-static card_login" style={{ width: "18rem" }}>
                    <form id="myForm" onSubmit={handleSubmit}>
                        <h5 className="pt-4 text-center font-weight-bold pb-3">Add Member<span><IoIcons.IoMdPeople /></span></h5>
                        <input className="form-control" type="Email" onBlur={handleBlur} name="email" placeholder="Email" required />
                        <br />
                        <input className="form-control" type="name" onBlur={handleBlur} name="name" placeholder="Username" required />
                        <br />
                        <input className="form-control" type="Password" onBlur={handleBlur} name="password" placeholder="Password" required />
                        <br />
                        <select className="form-control form-control" onBlur={handleBlur} name="role" required>
                            <option style={{ display: 'none' }}>Select Role</option>
                            <option>Admin</option>
                            <option>Seller</option>
                        </select>
                        <br />
                        <button className="form-control btn-success" type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMember;