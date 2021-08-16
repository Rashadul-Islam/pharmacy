import React, { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import UserSideBar from '../../SideBar/UserSideBar';

const ManageMember = () => {

    const history = useHistory();

    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        fetch('https://dry-headland-65168.herokuapp.com/alluser')
            .then(res => res.json())
            .then(data => setAllUser(data))
    }, [allUser])

    const setEdit = (id) => {
        sessionStorage.setItem("editUser", id)
        history.push("/editUser")
    }

    //delete user
    const handleDelete = id => {
        if (id === sessionStorage.getItem("Id")) {
            alert("Don't loose your administrative power...!!!");
        }
        else {
            fetch(`https://dry-headland-65168.herokuapp.com/users/delete/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const text = document.getElementById("searchValue").value;
        const fixText = text.charAt(0).toUpperCase() + text.slice(1);
        sessionStorage.setItem('searchUser', fixText);
        document.getElementById("searchValue").value = '';
        history.push("/searchUser");
    }


    return (
        <div id="background">
            <UserSideBar></UserSideBar>
            <form onSubmit={handleSearch}><div className="input-group pt-2 d-flex justify-content-center position-static pt-5">
                <div className="form-outline">
                    <input type="text" id="searchValue" className="form-control" placeholder="search" required />
                </div>
                <button type="submit" className="btn btn-primary">
                    <FaIcons.FaSearch />
                </button>
            </div>
            </form>
            <div className="pt-3">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser.map(data =>
                                <tr key={data._id}>
                                    <td data-label="Brand Name">{data.email}</td>
                                    <td data-label="Brand Name">{data.name}</td>
                                    <td data-label="Generic Name">{data.password}</td>
                                    <td data-label="Description">{data.role}</td>
                                    <td data-label="Action"><FaIcons.FaEdit onClick={() => setEdit(data._id)} style={{ cursor: "pointer" }} />
                                        <span style={{ cursor: "pointer" }} onClick={() => handleDelete(data._id)}><FaIcons.FaTrashAlt /></span></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
};

export default ManageMember;