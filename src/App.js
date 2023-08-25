import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { SwishSpinner } from 'react-spinners-kit';
import Header from './Components/Dashboard/Header/Header';
import Main from './Components/Dashboard/Index/Main';
import Footer from '../src/Components/Dashboard/Footer/Footer';
import Shop from './Components/Dashboard/Shop/Shop';
import CartPage from './Components/Dashboard/Cart/Cart';
import './App.css'
import Checkout from './Components/Dashboard/Checkout/Checkout';
import Login from './Components/Auth/Login/Login';
import Membership from './Components/Dashboard/Membership/Membership';
import Terms from './Components/Dashboard/Terms/Terms';
import Contact from './Components/Dashboard/Contact/Contact';
import Find from './Components/Dashboard/Find/Find';
import Profile from './Components/Dashboard/Profile/Profile';
import Product from './Components/Dashboard/Product/Product';
import { AuthProvider } from './Components/Auth/AuthContext/AuthContext';

function App() {

  const login = '#login-form';
  const register = '#register-form';

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const [user, setUser] = useState(null);

  const [bill, setBill] = useState({ shippingType: '', shippingCost: 0, totalbill: 0 });

  useEffect(() => {
    axios
      .get('http://localhost:4000/getproducts')
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
        // Show the spinner for 2 seconds and then hide it
        setTimeout(() => {
          setShowSpinner(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  if (showSpinner) {
    // Show the spinner while data is being fetched
    return (
      <div className="spinner-overlay">
        <SwishSpinner size={100} frontColor="green" backColor="whitesmoke" loading={isLoading} />
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<><Header /> <Main products={products} /><Footer /></>}></Route>
          <Route exact path="/index" element={<><Header /> <Main products={products} /><Footer /></>}></Route>
          <Route exact path="/shop" element={<><Header /> <Shop products={products} addToCart={addToCart} /><Footer /></>}></Route>
          <Route exact path="/cart" element={<><Header /> <CartPage cartItems={cartItems} setCartItems={setCartItems} bill={bill} setBill={setBill} /><Footer /></>}></Route>
          <Route exact path="/checkout" element={<><Header /> <Checkout cartItems={cartItems} setCartItems={setCartItems} bill={bill} /><Footer /></>}></Route>
          <Route exact path="/login" element={<Login state={login} setUser={setUser} />}></Route>
          <Route exact path="/register" element={<Login state={register} setUser={setUser}/>}></Route>
          <Route exact path="/membership" element={<><Header /> <Membership /><Footer /></>}></Route>
          <Route exact path="/terms" element={<><Header /> <Terms /><Footer /></>}></Route>
          <Route exact path="/contact" element={<><Header /> <Contact /><Footer /></>}></Route>
          <Route exact path="/find" element={<><Header /> <Find /><Footer /></>}></Route>
          <Route exact path="/profile" element={<><Header /> <Profile /><Footer /></>}></Route>
          <Route exact path="/product" element={<><Header /> <Product /><Footer /></>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
