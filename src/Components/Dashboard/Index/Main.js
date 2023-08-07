import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import b1 from './Resources/Images/b1.jpg'
import b2 from './Resources/Images/b2.jpg'
import b3 from './Resources/Images/b3.jpg'


function Main({ products }) {
    const limitedProducts = products.slice(0, 4);

    const images = [b1, b2, b3]; // Replace b1, b2, b3 with your image URLs or import statements
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 5000 milliseconds (5 seconds) interval between slides, you can adjust this value

        return () => {
            clearInterval(timer);
        };
    }, [images.length]);

    return (
        <div class="main"><div class="sec1">
            <div id="myCarousel" className="" data-bs-ride="">
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
                            <img src={image} alt={`Image ${index + 1}`} className="d-block w-100" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="carousel-text">
                <p>Tired of overpaying for groceries?</p>
                <div className="sec1-btn">
                    <Link to="/register"><button className="button-17" role="button">Yes!</button></Link>
                    <Link to="/membership"><button className="button-18" role="button">I like overpaying</button></Link>
                </div>
            </div>
        </div><div className="sec2">
                <div className="grid-container">
                    <div className="grid-item1"></div>

                    <div className="grid-item2">
                        <div className="sec2-item2">
                            <div className="sec2-text">
                                <p>Get the best prices<br />from the market<br />across major cities</p>
                            </div>
                            <div className="div-but24">
                            <Link to="/register"><button className="button-24">
                                    Get Started
                                </button></Link>
                            </div>
                            <div>
                                <div className="sc-ee301021-6">
                                    <div className="sc-ee301021-7">Low Price Promise</div>
                                    <div className="sc-ee301021-4">
                                        If you find a product for less elsewhere, <span>we'll match it.</span>
                                    </div>
                                    <div className="sc-ee301021-9">
                                        See <Link to="/terms">Terms</Link> for details.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sec3">
                <div class="sec3-text">
                    <p>The Easiest Way To Shop Healthy
                    </p>
                </div>

                <div class="grid-container">
                    {
                        limitedProducts.map(product => {
                            var originalPrice = parseInt(product.oprice);
                            var discountPrice = parseInt(product.dprice);
                            var savings = ((originalPrice - discountPrice) / originalPrice) * 100;
                            return <div class="grid-item">
                                <div class="sc-c5eaa547-0">
                                    <div class="fresnel-container fresnel-lessThan-lg ">
                                        <div class="sc-e0e305e2-0">
                                            <div class="sc-847ff752-0">
                                                <span
                                                    style={{
                                                        boxSizing: 'border-box',
                                                        display: 'inline-block',
                                                        overflow: 'hidden',
                                                        width: '159px',
                                                        height: '159px',
                                                        background: 'none',
                                                        backgroundColor: '#faf3ef',
                                                        opacity: 1,
                                                        border: '0px',
                                                        margin: '0px',
                                                        padding: '0px',
                                                        position: 'relative',
                                                    }}><img
                                                        alt="" aria-label="" data-testid="productCard_image" src={product.url} decoding="async"
                                                        data-nimg="fixed" class="sc-847ff752-1 iPJfJT"
                                                        style={{
                                                            backgroundColor: '#faf3ef',
                                                            position: 'absolute',
                                                            inset: '0px',
                                                            boxSizing: 'border-box',
                                                            padding: '0px',
                                                            border: 'none',
                                                            margin: 'auto',
                                                            display: 'block',
                                                            width: '0px',
                                                            height: '0px',
                                                            minWidth: '100%',
                                                            maxWidth: '100%',
                                                            minHeight: '100%',
                                                            maxHeight: '100%',
                                                            objectFit: 'contain',
                                                            objectPosition: 'center center',
                                                        }} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sc-c5eaa547-1">Save {(Math.floor(savings))}%</div>
                                    <div class="sc-c5eaa547-2">₹{product.dprice}</div>
                                    <div class="sc-c5eaa547-3">₹{product.oprice} MRP</div>
                                    <div class="sc-c5eaa547-4">{product.title}</div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div class="div-but25">
                <Link to="/register"><button class="button-25" role="button">Start
                        Shopping</button></Link>
                </div>
            </div>

            <div class="sec4">
                <div>
                    <div class="sec-4-headline">
                        <p>Groceries Delivered At Your Doorstep</p>
                    </div>
                    <div class="sc-4e67e03b-2">
                        <div class="sc-4e67e03b-3">
                            <p class="sc-4e67e03b-6">1</p>
                            <p class="sc-4e67e03b-4">Build Your Order</p>
                            <p class="sc-4e67e03b-5">Customize your box &amp; set a schedule for delivery</p>
                        </div>
                        <div class="sc-4e67e03b-3">
                            <p class="sc-4e67e03b-6">2</p>
                            <p class="sc-4e67e03b-4">Save Even More</p>
                            <p class="sc-4e67e03b-5">Get an extra 5–10% off thousands of products through our partners</p>
                        </div>
                        <div class="sc-4e67e03b-3">
                            <p class="sc-4e67e03b-6">3</p>
                            <p class="sc-4e67e03b-4">You’re In Control</p>
                            <p class="sc-4e67e03b-5">Add items, cancel orders, or place one-time orders anytime</p>
                        </div>
                    </div>
                    <div class="div-but26">
                    <Link to="/register"><button class="button-26" role="button">Get
                            Started</button></Link>
                    </div>
                </div>
            </div>


            <div class="sec5">
                <div class="grid-container">

                    <div class="grid-item1">
                        <div class="sec5-headline">
                            <p>Go A Step Further
                            </p>
                        </div>
                        <div class="sec5-desc">
                            <p>Become A Member, Harness Our Cutting-Edge<br /> Prediction Model for Unbeatable Price Insights!<br /> and much
                                more.</p>
                        </div>
                        <div class="sec5-list-wrap">
                            <div class="sec5-list-head">
                                <p>Membership Perks</p>
                            </div>
                            <div class="sec5-list">
                                <ul class="flex-column tick-list">
                                    <li><svg width="29" height="27" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"
                                        class="sc-efHYUO sc-4e33163f-2  fNUFxw">
                                        <path
                                            d="M27.991 3.599C29.37 1.866 21.38 0 21.38 0S9.152 14.941 8.56 16.864a20.177 20.177 0 00-3.483-4.948C3.68 10.948 0 16.038 0 16.038a60.946 60.946 0 008.04 10.164S19.021 14.888 27.99 3.599z"
                                            fill="#333"></path>
                                    </svg> Powerful Price Prediction Feature</li>
                                    <li><svg width="29" height="27" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"
                                        class="sc-efHYUO sc-4e33163f-2  fNUFxw">
                                        <path
                                            d="M27.991 3.599C29.37 1.866 21.38 0 21.38 0S9.152 14.941 8.56 16.864a20.177 20.177 0 00-3.483-4.948C3.68 10.948 0 16.038 0 16.038a60.946 60.946 0 008.04 10.164S19.021 14.888 27.99 3.599z"
                                            fill="#333"></path>
                                    </svg> Extra 10% off on every order</li>
                                    <li><svg width="29" height="27" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"
                                        class="sc-efHYUO sc-4e33163f-2  fNUFxw">
                                        <path
                                            d="M27.991 3.599C29.37 1.866 21.38 0 21.38 0S9.152 14.941 8.56 16.864a20.177 20.177 0 00-3.483-4.948C3.68 10.948 0 16.038 0 16.038a60.946 60.946 0 008.04 10.164S19.021 14.888 27.99 3.599z"
                                            fill="#333"></path>
                                    </svg> Fast, carbon-neutral shipping</li>
                                </ul>
                            </div>
                            <div class="sec5-after-list">
                                <p>For as low as ₹60/month<br /> billed annually</p>
                            </div>
                        </div>
                        <div class="but-x">
                            <Link to="/membership" class="sc-232424a1-0">Start Saving<svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"
                                class="sc-iBzEeX">
                                <path
                                    d="M6.81.066c.84 1.38 1.668 2.526 2.484 3.438.828.9 1.77 1.728 2.826 2.484v.108a17.77 17.77 0 00-2.826 2.502c-.816.9-1.644 2.04-2.484 3.42l-1.134-.936c1.356-2.052 2.676-3.54 3.96-4.464-1.08.096-2.118.144-3.114.144H.132v-1.44h6.39c.996 0 2.034.048 3.114.144-1.284-.924-2.604-2.412-3.96-4.464L6.81.066z"
                                    fill="#333"></path>
                            </svg></Link>
                        </div>
                    </div>

                    <div class="grid-item2"></div>
                </div>
            </div>


        </div>
    );
}

export default Main;

