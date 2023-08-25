import './Product.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, { Component, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart } from "chart.js";
import { registerables } from 'chart.js';
import { ImpulseSpinner } from 'react-spinners-kit';

Chart.register(CategoryScale);
Chart.register(...registerables);

function Product() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const vegetableName = queryParams.get('vegetable');
    const formattedName = vegetableName.replace(/\s/g, '-');
    const [price, setPrice] = useState([]);
    const [predictedprice, setpredictedPrice] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://127.0.0.9:8080/getprice?name=${formattedName}`)
            .then((response) => {
                setPrice(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`http://127.0.0.9:8080/predict?name=${formattedName}`)
            .then((response) => {
                setpredictedPrice(response.data);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
    }, []);

    console.log(predictedprice);

    const sprice=price.slice(-15);
    const days = Array.from({ length: sprice.length }, (_, i) => i + 1);

    const data = {
        labels: days,
        datasets: [
            {
                label: vegetableName,
                data: sprice,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };



    return (
        <div className="section-product">
            <div class="container">
                <h1 class="header">Price Analysis : {vegetableName}</h1>
                <div class="divider"></div>
                <div class="graph-container">
                    <div class="graph">
                    <Line data={data}/>
                    </div>
                    <div class="cardx">
                        <div class="cardy">
                            <div class="card">
                                <div class="cardtext">
                                    <h2>Predicted Price</h2>
                                    <p style={{display:'flex', justifyContent:'center' }}>
                                        {isLoading ? (
                                            <ImpulseSpinner size={30} color="#36D7B7" />
                                        ) : (
                                            `₹ ${predictedprice}`
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div class="card2">
                                <div class="cardtext">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;