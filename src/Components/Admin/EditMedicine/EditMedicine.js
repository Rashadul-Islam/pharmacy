import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserSideBar from '../../SideBar/UserSideBar';

const EditMedicine = () => {

    const history = useHistory();

    const [store, setStore] = useState([]);

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

    useEffect(() => {
        const id = sessionStorage.getItem("edit");
        fetch(`https://dry-headland-65168.herokuapp.com/medicines/${id}`)
            .then(res => res.json())
            .then(data => setStore(data))
    }, [setStore])

    const handleBlur = (event) => {
        const storeMedicine = { ...medicine };
        storeMedicine[event.target.name] = event.target.value;
        setMedicine(storeMedicine);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        if (Object.values(medicine).every(x => x === '')) {
            alert('Nothing changed!!!');
            document.getElementById("form-div").reset();
            history.push("/manageMedicine");
        }

        else {
            const updateMedicine = {
                brandName: medicine.brandName === "" ? store.brandName : medicine.brandName,
                genericName: medicine.genericName === "" ? store.genericName : medicine.genericName,
                description: medicine.description === "" ? store.description : medicine.description,
                originalPrice: medicine.originalPrice === "" ? store.originalPrice : medicine.originalPrice,
                sellingPrice: medicine.sellingPrice === "" ? store.sellingPrice : medicine.sellingPrice,
                receivedDate: medicine.receivedDate === "" ? store.receivedDate : medicine.receivedDate,
                expireDate: medicine.expireDate === "" ? store.expireDate : medicine.expireDate,
                quantity: medicine.quantity === "" ? store.quantity : medicine.quantity
            }
            const id = sessionStorage.getItem("edit");
            if (JSON.stringify(medicine) !== JSON.stringify(updateMedicine)) {
                fetch(`https://dry-headland-65168.herokuapp.com/medicine/update/${id}`, {
                    method: 'PATCH',
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify(updateMedicine)
                })
                    .then(res => res.json())
                    .then(data => {
                        alert('Information updated successfully!!!');
                        document.getElementById("form-div").reset();
                        history.push("/manageMedicine");
                    })
            }
        }

    }

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
                <h3 className="text-center pt-5"><strong>Edit Medicine Information</strong></h3>
                <form id="form-div" onSubmit={handleEdit}>
                    <div className="row">
                        <div className="form-group col-md-6 pb-3">
                            <label>Brand Name</label>
                            <input type="text" onBlur={handleBlur} name="brandName" defaultValue={store.brandName} className="form-control" required />
                        </div>
                        <div className="form-group col-md-6 pb-3">
                            <label>Generic Name</label>
                            <input type="text" onBlur={handleBlur} name="genericName" defaultValue={store.genericName} className="form-control" required />
                        </div>
                    </div>
                    <div className="form-group pb-3">
                        <label>Category/Description</label>
                        <input type="text" onBlur={handleBlur} name="description" defaultValue={store.description} className="form-control" required />
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6 pb-3">
                            <label>Original Price</label>
                            <input type="text" onBlur={handleBlur} name="originalPrice" defaultValue={store.originalPrice} className="form-control" required />
                        </div>
                        <div className="form-group col-md-6 pb-3">
                            <label>Selling Price</label>
                            <input type="text" onBlur={handleBlur} name="sellingPrice" defaultValue={store.sellingPrice} className="form-control" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-4 pb-3">
                            <label>Received Date</label>
                            <input type="date" onClick={minDate} onBlur={handleBlur} id="receive" name="receivedDate" defaultValue={store.receivedDate} className="form-control" required />
                        </div>
                        <div className="form-group col-md-4 pb-3">
                            <label>Expire Date</label>
                            <input type="date" onClick={maxDate} onBlur={handleBlur} id="expire" name="expireDate" defaultValue={store.expireDate} className="form-control" required />
                        </div>
                        <div className="form-group col-md-4 pb-3">
                            <label>Quantity</label>
                            <input type="text" onBlur={handleBlur} name="quantity" defaultValue={store.quantity} className="form-control" required />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Save</button>
                </form>

            </div>
        </div>
    );
};

export default EditMedicine;