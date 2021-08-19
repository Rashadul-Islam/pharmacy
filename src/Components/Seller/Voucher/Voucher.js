import React, { useContext } from 'react';
import { UserContext2, UserContext3 } from '../../../App';
import UserSideBar from '../../SideBar/UserSideBar';
import "./Voucher.css";

const Voucher = () => {
    /* eslint-disable no-unused-vars */
    const [contextMedicine, setConTextMedicine] = useContext(UserContext2);
    const [conTextTotal, setConTextTotal] = useContext(UserContext3);
    /* eslint-disable no-unused-vars */

    const date = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const year = today.getFullYear();
        const current = year + '-' + month + '-' + day;
        return current;
    }

    function printFunction() {
        window.print();
    }

    return (
        <div id="bg">
            <UserSideBar></UserSideBar>
            <div className="pt-5 mx-auto">
                <h3 className="text-center pb-3"><strong>Cash Voucher</strong></h3>
                <div id="print">
                    <div className="text-center">
                        <h5><strong>NEW LIFE MEDICINE</strong></h5>
                        <h6><strong>Sector-10, Uttara</strong></h6>
                        <div className="d-flex justify-content-between mx-auto pb-2 selling_info">
                            <p>Seller: {sessionStorage.getItem("name")}</p>
                            <p>Date: {date()}</p>
                        </div>
                    </div>
                    <table id='voucher_table'>
                        <thead>
                            <tr>
                                <th scope="col">Brand Name</th>
                                <th scope="col">Generic Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contextMedicine.length && contextMedicine.map(data =>
                                    <tr key={data._id}>
                                        <td data-label="Brand Name">{data.brandName}</td>
                                        <td data-label="Generic Name">{data.genericName}</td>
                                        <td data-label="Quantity">{data.sellQuantity}</td>
                                        <td data-label="Amount">{data.sellingPrice * data.sellQuantity}</td>
                                    </tr>)
                            }
                            <tr>
                                <td className="text-center" colSpan="3">Total</td>
                                <td data-label="Total Selling Price" className="text-right" colSpan="1">{conTextTotal.totalSell || 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex mx-auto justify-content-end pb-3 print">
                <button onClick={printFunction} type="button" className="btn btn-success">Print</button>
            </div>
        </div>
    );
};

export default Voucher;