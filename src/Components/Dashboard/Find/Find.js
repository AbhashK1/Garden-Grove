import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from "./Search";
import './Find.css';

function Find() {
    const [tableData, setTableData] = useState([]);

    const handleOnSearchChange = (searchData) => {
        const value = searchData.value;
        axios.get(`http://127.0.0.1:5000/data?index=${value}`)
            .then(response => {
                console.log(response);
                setTableData(response.data); // Assuming response.data is an array of objects
            })
            .catch(error => {
                console.log("Some Error Occurred");
            });
    }

    return (
        <div className="section-find">
            <div className="search">
                <Search onSearchChange={handleOnSearchChange} />
            </div>
            <div className="table-responsive">
                {tableData.length > 0 && (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Vegetable Name</th>
                                <th>Market Price (₹)</th>
                                <th>Retail Price (₹)</th>
                                <th>Shopping Mall Price (₹)</th>
                                <th>Unit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data['Vegetable-Name']}</td>
                                    <td>{data['Market-Price']}</td>
                                    <td>{data['Retail-Price']}</td>
                                    <td>{data['Shopping-Mall']}</td>
                                    <td>{data['Unit']}</td>
                                    <td className='tdx'><Link to={`/product?vegetable=${encodeURIComponent(data['Vegetable-Name'])}`}><button type="button" class="btn btn-secondary btx">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-circle" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"></path>
                                        </svg>
                                    </button></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Find;
