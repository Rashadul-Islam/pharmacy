import React, { useState } from 'react';
import UserSideBar from '../../SideBar/UserSideBar';

const Report = () => {

    const [data, setData] = useState({});

    const [blur, setBlur] = useState({
        start: "",
        end: ""
    });

    const handleBlur = (event) => {
        const storeValue = { ...blur };
        storeValue[event.target.name] = event.target.value;
        setBlur(storeValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://dry-headland-65168.herokuapp.com/report/${blur.start}/${blur.end}`)
            .then(response => response.json())
            .then(data => setData(data))
        document.getElementById("form-div").reset();
        document.getElementById("report").style.display = "none";
        document.getElementById("record").style.display = "block";
    }

    const date = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const year = today.getFullYear();
        const current = year + '-' + month + '-' + day;
        return current;
    }

    const maxDate = () => {
        const currentDate = date();
        document.getElementById("end").setAttribute("max", currentDate);
    }

    const minDate = () => {
        const currentDate = date();
        document.getElementById("start").setAttribute("max", currentDate);
    }

    const calculateTotal = () => {
        let sellTotal = 0;
        let profitTotal = 0;
        for (let i = 0; i < data.length; i++) {
            sellTotal += data[i].totalSell;
            profitTotal += data[i].totalProfit;
        }
        return ({
            sell: sellTotal,
            profit: profitTotal
        })
    }


    function printReport() {
        document.title = 'report.pdf';
        window.print();
    }

    return (
        <div id="background">
            <UserSideBar></UserSideBar>
            <div className="pt-5 mx-auto">
                <div id="report">
                    <h3 className="text-center"><strong>Sells Report</strong></h3>
                    <form id="form-div" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="form-group col-md-5 pb-3">
                                <label>From</label>
                                <input type="date" id="start" onClick={minDate} onBlur={handleBlur} name="start" className="form-control" required />
                            </div>
                            <div className="form-group col-md-5 pb-3">
                                <label>To</label>
                                <input type="date" id="end" onClick={maxDate} onBlur={handleBlur} name="end" className="form-control" required />
                            </div>
                            <div className="form-group col-md-2 pb-3 pt-3">
                                <button className="btn btn-primary w-100" type="submit">Generate</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="record" style={{ display: "none" }}>
                    <div id="print">
                        <div className="text-center">
                            <h5><strong>NEW LIFE MEDICINE</strong></h5>
                            <h6><strong>Sector-10, Uttara</strong></h6>
                            <h6 className="text-center"><strong>{blur.start} to {blur.end}</strong></h6>
                            <div className="d-flex justify-content-between mx-auto pb-2 selling_info">
                                <p>Admin: {sessionStorage.getItem("name")}</p>
                                <p>Date: {date()}</p>
                            </div>
                        </div>
                        <table id='voucher_table'>
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Total Sell</th>
                                    <th scope="col">Total Profit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.length && data.map(data =>
                                        <tr key={data._id}>
                                            <td data-label="Name">{data.date}</td>
                                            <td data-label="Date">{data.name}</td>
                                            <td data-label="Quantity">{data.totalSell}</td>
                                            <td data-label="Amount">{data.totalProfit}</td>
                                        </tr>)
                                }
                                <tr>
                                    <td className="text-center" colSpan="2">Total</td>
                                    <td data-label="Total Sell" className="text-right" colSpan="1">{calculateTotal().sell}</td>
                                    <td data-label="Total Profit" className="text-right" colSpan="1">{calculateTotal().profit}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex mx-auto justify-content-end pb-3 print">
                        <button onClick={printReport} type="button" className="btn btn-success">Print</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;