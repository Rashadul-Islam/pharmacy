import React, { useEffect, useState } from 'react';
import UserSideBar from '../../SideBar/UserSideBar';
import * as FaIcons from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

const SearchUser = () => {

    const history = useHistory();

    const [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const search = searchInput === "" ? setSearchInput(sessionStorage.getItem('searchUser')) : searchInput;
    useEffect(() => {
        fetch('https://dry-headland-65168.herokuapp.com/userSearch?search=' + search)
            .then(res => res.json())
            .then(data => setSearchResult(data))
            .catch(err => setSearchResult([]))
    }, [search])

    const handleSearch = (e) => {
        e.preventDefault();
        const text = document.getElementById("searchValue").value;
        const fixText = text.charAt(0).toUpperCase() + text.slice(1);
        setSearchInput(fixText)
        document.getElementById("searchValue").value = "";
    }

    const setEdit = (id) => {
        sessionStorage.setItem("edit", id)
        history.push("/editUser")
    }

    //delete medicine
    const handleDelete = id => {
        fetch(`https://dry-headland-65168.herokuapp.com/users/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
    }

    return (
        <div id="background">
            <UserSideBar></UserSideBar>

            <form onSubmit={handleSearch}>
                <div className="input-group pt-5 d-flex justify-content-center position-static">
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
                            searchResult.length !== 0 ?
                                searchResult.map(data =>
                                    <tr key={data._id}>
                                        <td data-label="Brand Name">{data.email}</td>
                                        <td data-label="Generic Name">{data.name}</td>
                                        <td data-label="Description">{data.password}</td>
                                        <td data-label="Original Price">{data.role}</td>
                                        <td data-label="Action"><FaIcons.FaEdit onClick={() => setEdit(data._id)} style={{ cursor: "pointer" }} />
                                            <span style={{ cursor: "pointer" }} onClick={() => handleDelete(data._id)}><FaIcons.FaTrashAlt /></span></td>
                                    </tr>) :

                                <tr>
                                    <td className="text-center" colSpan="5">No Result Found !!!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-center pt-3">
                <Link style={{ textDecoration: "none", color: "black" }} to="/manageMember">See All User</Link>
            </div>
        </div>
    );
};

export default SearchUser;