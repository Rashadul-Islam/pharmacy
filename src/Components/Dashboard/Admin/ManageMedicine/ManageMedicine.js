import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import UserSideBar from '../../SideBar/UserSideBar';
import * as FaIcons from 'react-icons/fa';
import "./ManageMedicine.css";
import { useHistory } from 'react-router-dom';

const ManageMedicine = () => {

    const history = useHistory();

    const [allMedicine, setAllMedicine] = useState([]);

    useEffect(() => {
        fetch("https://dry-headland-65168.herokuapp.com/medicines")
            .then(res => res.json())
            .then(data => setAllMedicine(data))
    }, [allMedicine])

    const handleSearch = (e) => {
        e.preventDefault();
        const text = document.getElementById("searchValue").value;
        const fixText = text.charAt(0).toUpperCase() + text.slice(1);
        sessionStorage.setItem('result', fixText);
        document.getElementById("searchValue").value = '';
        history.push("/searchResult");
    }

    //delete medicine
    const handleDelete = id => {
        fetch(`https://dry-headland-65168.herokuapp.com/medicines/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
    }

    const setEdit = (id) => {
        sessionStorage.setItem("edit", id)
        history.push("/editMedicine")
    }

    return (
        <div id="background">
            <UserSideBar></UserSideBar>
            <h3 className="text-center pt-3"><strong>Manage Medicine</strong></h3>
            <form onSubmit={handleSearch}><div className="input-group pt-2 d-flex justify-content-center position-static">
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
                            allMedicine.map(data =>
                                data.quantity < 5 ?
                                    <tr key={data._id} style={{ color: "red" }}>
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
                                    </tr> :
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
                                    </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ManageMedicine;