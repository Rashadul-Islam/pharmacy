import React, { useEffect, useState } from 'react';
import UserSideBar from '../../SideBar/UserSideBar';
import "./AddMedicine.css";

const AddMedicine = () => {
    const [medicineByName, SetMedicineByName] = useState([]);
    const [medicine, setMedicine] = useState({
        brandName: '',
        genericName: '',
        description: '',
        originalPrice: '',
        sellingPrice: '',
        receivedDate: '',
        expireDate: '',
        quantity: ''
    });
    const handleBlur = (event) => {
        const newMedicineInfo = { ...medicine };
        newMedicineInfo[event.target.name] = event.target.value;
        setMedicine(newMedicineInfo);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (medicineByName === null) {
            const medicineInfo = { ...medicine };
            const url = "http://localhost:5000/addMedicine"
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medicineInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        alert('Medicine Added Successfully!!!');
                        document.getElementById("form-div").reset();
                    }
                })
        }
        else {
            alert("This Generic Name Already Exist!!!!");
        }
    }
    useEffect(() => {
        if (medicine.genericName !== '') {
            fetch(`http://localhost:5000/medicine/${medicine.genericName}`)
                .then(res => res.json())
                .then(data => SetMedicineByName(data))
                .catch(err => SetMedicineByName(null))
        }

    }, [medicine.genericName])


    const date = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const year = today.getFullYear();
        const current = year + '-' + month + '-' + day;
        return current;
    }

    const minDate = () => {
        const currentDate = date();
        document.getElementById("receive").setAttribute("max", currentDate);
    }

    const maxDate = () => {
        const currentDate = date();
        document.getElementById("expire").setAttribute("min", currentDate);
    }

    return (
        <div id="background">
            <UserSideBar></UserSideBar>
            <div>
                <h3 className="text-center pt-5"><strong>Add New Medicine</strong></h3>
                <form id="form-div" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-6 pb-3">
                            <label>Brand Name</label>
                            <input type="text" onBlur={handleBlur} name="brandName" className="form-control" required />
                        </div>
                        <div className="form-group col-md-6 pb-3">
                            <label>Generic Name</label>
                            <input type="text" onBlur={handleBlur} name="genericName" className="form-control" required />
                        </div>
                    </div>
                    <div className="form-group pb-3">
                        <label>Category/Description</label>
                        <input type="text" onBlur={handleBlur} name="description" className="form-control" required />
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6 pb-3">
                            <label>Original Price</label>
                            <input type="text" onBlur={handleBlur} name="originalPrice" className="form-control" required />
                        </div>
                        <div className="form-group col-md-6 pb-3">
                            <label>Selling Price</label>
                            <input type="text" onBlur={handleBlur} name="sellingPrice" className="form-control" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-4 pb-3">
                            <label>Received Date</label>
                            <input type="date" onClick={minDate} onBlur={handleBlur} id="receive" name="receivedDate" className="form-control" required />
                        </div>
                        <div className="form-group col-md-4 pb-3">
                            <label>Expire Date</label>
                            <input type="date" onClick={maxDate} onBlur={handleBlur} id="expire" name="expireDate" className="form-control" required />
                        </div>
                        <div className="form-group col-md-4 pb-3">
                            <label>Quantity</label>
                            <input type="text" onBlur={handleBlur} name="quantity" className="form-control" required />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddMedicine;