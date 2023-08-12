import React, { useState } from 'react';
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
