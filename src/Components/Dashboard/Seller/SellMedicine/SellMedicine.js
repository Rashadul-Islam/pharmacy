import React, { useContext, useEffect, useState } from 'react';
import UserSideBar from '../../SideBar/UserSideBar';
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { UserContext2, UserContext3 } from '../../../../App';

const SellMedicine = () => {

    const history = useHistory();

    /* eslint-disable no-unused-vars */

    const [conTextMedicine, setConTextMedicine] = useContext(UserContext2);
    const [conTextTotal, setConTextTotal] = useContext(UserContext3);
    /* eslint-disable no-unused-vars */

    const [input, setInput] = useState("");// store input value
    const [result, setResult] = useState([]);//store search result
    const [storeData, setStoreData] = useState({})//store medicine by name
    const [addMedicine, SetAddMedicine] = useState([])//store added medicine
    const [blurData, setBlurData] = useState({ //store blur data value
        genericName: '',
        sellQuantity: ''
    })
    const [total, setTotal] = useState({ //store calculated data value
        totalSell: 0,
        totalProfit: 0
    })

    const handleClick = () => {
        const value = document.getElementById("input").value;
        const fixValue = value.charAt(0).toUpperCase() + value.slice(1);
        setInput(fixValue);
    }

    useEffect(() => {
        if (input !== "") {
            fetch('https://dry-headland-65168.herokuapp.com/medicineSearch?search=' + input)
                .then(res => res.json())
                .then(data => setResult(data))
        }
    }, [input])

    useEffect(() => {
        if (blurData.genericName !== '') {
            fetch(`https://dry-headland-65168.herokuapp.com/medicine/${blurData.genericName}`)
                .then(res => res.json())
                .then(data => setStoreData(data))
        }

    }, [blurData.genericName])

    const handleBlur = (event) => {
        const newData = { ...blurData };
        newData[event.target.name] = event.target.value;
        setBlurData(newData);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById("myForm").reset();
        if (result.length !== 0) {// checking medicine exist or not
            if (addMedicine.length > 0) {///checking addMedicine hold medicine or not
                if (addMedicine.find(data => (data.genericName) === blurData.genericName)) {//checking duplicate medicine
                    alert("Already Added...!!!");
                }
                else {
                    if (storeData.quantity >= blurData.sellQuantity) {
                        const data = { ...storeData };
                        const newData = Object.assign(data, blurData);
                        const newAdded = [...addMedicine];
                        newAdded.push(newData);
                        SetAddMedicine(newAdded);
                        calculate(newAdded);
                    }
                    else {
                        alert("Out of Storage...!!!");
                    }
                }
            }
            else {
                if (storeData.quantity >= blurData.sellQuantity) {
                    const data = { ...storeData };
                    const newData = Object.assign(data, blurData);
                    const newAdded = [...addMedicine];
                    newAdded.push(newData);
                    SetAddMedicine(newAdded);
                    calculate(newAdded);
                }
                else {
                    alert("Out of Storage...!!!");
                }
            }
        }
        else {
            alert("Medicine Not Exist...!!!");
        }
    }

    const handleDelete = (id) => {
        const apps = [...addMedicine];
        const removeIndex = apps.findIndex(item => item._id === id);
        apps.splice(removeIndex, 1);
        SetAddMedicine(apps);
        calculate(apps);
    }

    const calculate = (data) => {
        let totalSell = 0;
        let totalProfit = 0;
        for (let i = 0; i < data.length; i++) {
            totalSell += (data[i].sellingPrice * data[i].sellQuantity);
            totalProfit += (data[i].sellingPrice * data[i].sellQuantity) - (data[i].originalPrice * data[i].sellQuantity);
        }
        setTotal({
            totalSell: totalSell,
            totalProfit: totalProfit
        })
        setConTextMedicine(data);
        setConTextTotal({
            totalSell: totalSell,
            totalProfit: totalProfit
        });
    }

    const sellingInfo = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const year = today.getFullYear();
        const current = year + '-' + month + '-' + day;
        const sellingInfo = {
            name: sessionStorage.getItem("name"),
            date: current,
            totalSell: total.totalSell,
            totalProfit: total.totalProfit
        }
        const url = "https://dry-headland-65168.herokuapp.com/addSell"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sellingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Information Saved...!!!");
                    history.push("/voucher");
                }
            })
    }

    const handleSave = () => {
        if (addMedicine.length > 0) {
            for (let i = 0; i < addMedicine.length; i++) {
                let updateMedicine = { quantity: addMedicine[i].quantity - addMedicine[i].sellQuantity }
                fetch(`https://dry-headland-65168.herokuapp.com/medicine/reduce/${addMedicine[i]._id}`, {
                    method: 'PATCH',
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify(updateMedicine)
                })
                    .then(res => res.json())
            }
            sellingInfo();
        }
        else {
            alert("Add Medicine First...!!!");
        }
    }

    return (
        <div id="bg">
            <UserSideBar></UserSideBar>
            <h3 className="text-center pt-3"><strong>Sell Medicine</strong></h3>
            <div className="pt-3 position-static w-75" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <form id='myForm' onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-8 pb-2">
                            <input type="text" list="result" id="input" name="genericName" onChange={handleClick} onBlur={handleBlur} className="form-control" placeholder="Search" required />
                            <datalist id="result">
                                {
                                    result.length &&
                                    result.map(data =>
                                        <option key={data._id}>{data.genericName}</option>
                                    )
                                }
                            </datalist>
                        </div>
                        <div className="form-group col-md-2 pb-2">
                            <input type="number" min="1" onBlur={handleBlur} name="sellQuantity" className="form-control" required />
                        </div>
                        <div className=" col-md-2 pb-2">
                            <button type="submit" className="btn btn-primary w-100"><FaIcons.FaPlusCircle /> Add</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="pt-3">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Brand Name</th>
                            <th scope="col">Generic Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Profit</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            addMedicine.map(data =>
                                <tr key={data._id}>
                                    <td data-label="Brand Name">{data.brandName}</td>
                                    <td data-label="Generic Name">{data.genericName}</td>
                                    <td data-label="Description">{data.description}</td>
                                    <td data-label="Selling Price">{data.sellingPrice}</td>
                                    <td data-label="Quantity">{data.sellQuantity}</td>
                                    <td data-label="Amount">{data.sellingPrice * data.sellQuantity}</td>
                                    <td data-label="Profit">{(data.sellingPrice * data.sellQuantity) - (data.originalPrice * data.sellQuantity)}</td>
                                    <td data-label="Action" style={{ cursor: "pointer" }} onClick={() => handleDelete(data._id)}><FaIcons.FaTrashAlt /></td>
                                </tr>)
                        }
                        <tr>
                            <td className="text-center" colSpan="5">Total</td>
                            <td data-label="Total Selling Price" id="sell" className="text-right" colSpan="1">{total.totalSell}</td>
                            <td data-label="Total Profit" id="profit" className="text-right" colSpan="1">{total.totalProfit}</td>
                            <td colSpan="1"></td>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-center pb-1">
                    <button onClick={handleSave} className="btn btn-success" style={{ width: "95%" }}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default SellMedicine;