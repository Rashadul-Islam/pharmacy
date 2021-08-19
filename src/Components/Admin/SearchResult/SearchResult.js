import React, { useEffect, useState } from 'react';
import UserSideBar from '../../SideBar/UserSideBar';
import * as FaIcons from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

const SearchResult = () => {

    const history = useHistory();

    const [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const search = searchInput === "" ? setSearchInput(sessionStorage.getItem('result')) : searchInput;
    useEffect(() => {
        fetch('https://dry-headland-65168.herokuapp.com/medicineSearch?search=' + search)
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
        history.push("/editMedicine")
    }

    //delete medicine
    const handleDelete = id => {
        fetch(`https://dry-headland-65168.herokuapp.com/medicines/delete/${id}`, {
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
                            <th scope="col">Brand Name</th>
                            <th scope="col">Generic Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Original Price</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">Received Date</th>
                            <th scope="col">Expire Date</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchResult.length !== 0 ?
                                searchResult.map(data =>
                                    <tr key={data._id}>
                                        <td data-label="Brand Name">{data.brandName}</td>
                                        <td data-label="Generic Name">{data.genericName}</td>
                                        <td data-label="Description">{data.description}</td>
                                        <td data-label="Original Price">{data.originalPrice}</td>
                                        <td data-label="Selling Price">{data.sellingPrice}</td>
                                        <td data-label="Received Date">{data.receivedDate}</td>
                                        <td data-label="Expire Date">{data.expireDate}</td>
                                        <td data-label="Quantity">{data.quantity}</td>
                                        <td data-label="Action"><FaIcons.FaEdit onClick={() => setEdit(data._id)} style={{ cursor: "pointer" }} />
                                            <span style={{ cursor: "pointer" }} onClick={() => handleDelete(data._id)}><FaIcons.FaTrashAlt /></span></td>
                                    </tr>) :

                                <tr>
                                    <td className="text-center" colSpan="9">No Result Found !!!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-center pt-3">
                <Link style={{ textDecoration: "none", color: "black" }} to="/manageMedicine">See All Medicine</Link>
            </div>
        </div>
    );
};

export default SearchResult;