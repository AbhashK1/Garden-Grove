import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from 'react';
import minus from './Resources/minus-button.png'
import plus from './Resources/plus-button.png'
import cancel from './Resources/cancel.png'
import back from './Resources/back.png'
import './Cart.css'
import { Link } from "react-router-dom";


function CartPage({ cartItems, setCartItems, bill, setBill }) {
  const [cartInitialized, setCartInitialized] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('1');
  const deliveryOptions = {
    '1': { name: 'Standard-Delivery', cost: 40 },
    '2': { name: 'Fast Delivery', cost: 90 },
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemToRemove) => {
    // Filter out the item to remove from the cartItems array
    const updatedCartItems = cartItems.filter((item) => item !== itemToRemove);
    // Update the cartItems state
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (itemIndex, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[itemIndex] = { ...updatedCartItems[itemIndex], quantity: newQuantity };
    setCartItems(updatedCartItems);
  };

  const totalBill = cartItems.reduce(
    (total, item) => total + parseInt(item.dprice) * parseInt(item.quantity),
    0
  );


  const selectedDeliveryName = deliveryOptions[selectedDeliveryOption].name;
  const selectedDeliveryCost = deliveryOptions[selectedDeliveryOption].cost;
  const updatedTotalBill = totalBill + selectedDeliveryCost;

  useEffect(() => {
    // Check if cartItems have been initialized
    if (!cartInitialized) {
      const updatedCartItems = cartItems.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCartItems(updatedCartItems);
      setCartInitialized(true);
    }
  }, [cartItems, cartInitialized, setCartItems]);

  const handleDeliveryOptionChange = (event) => {
    setSelectedDeliveryOption(event.target.value);
  };

  const handleShippingOption = (shippingType, shippingCost) => {
    setBill({ selectedDeliveryName, selectedDeliveryCost, totalBill });
  };

  return (
    <section className="section" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {cartItems.length} items
                        </MDBTypography>
                      </div>

                      {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                      ) : (
                        cartItems.map((item, index) => (
                          <><hr className="my-4" />
                            <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                  src={item.url}
                                  fluid className="rounded-3" alt="Cotton T-shirt" />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography tag="h6" className="text-black mb-0">
                                  {item.title}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                <button style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => {
                                  // Increase the quantity by 1
                                  const newQuantity = item.quantity + 1;
                                  updateQuantity(index, newQuantity); // Pass the index instead of the item
                                }}><img src={plus} /></button>
                                <input
                                  id="quantity"
                                  style={{ width: "40px" }}
                                  value={item.quantity}
                                  readOnly
                                />
                                <button style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => {
                                  // Decrease the quantity by 1, but ensure it doesn't go below 1
                                  const newQuantity = Math.max(1, item.quantity - 1);
                                  updateQuantity(index, newQuantity); // Pass the index instead of the item
                                }}><img src={minus} /></button>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                  ₹{item.dprice * item.quantity}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <button style={{ backgroundColor: "#FFFFFF", border: "none" }}><img src={cancel} width="30" heigth="30" onClick={() => removeFromCart(item)} /></button>
                              </MDBCol>
                            </MDBRow></>
                        ))
                      )}


                      <hr className="my-4" />

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <Link to="/shop">
                            <MDBCardText tag="a" className="text-body">
                              <img src={back} width="30" heigth="30" style={{ marginRight: "10px" }} />Back
                              To Shop
                            </MDBCardText></Link>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          items: {cartItems.length}
                        </MDBTypography>
                        <MDBTypography tag="h5">₹{totalBill}</MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Shipping
                      </MDBTypography>

                      <div className="mb-4 pb-2">
                        <select
                          className="select p-2 rounded bg-grey"
                          style={{ width: '100%' }}
                          value={selectedDeliveryOption}
                          onChange={handleDeliveryOptionChange}
                        >
                          <option value="1">Standard-Delivery - ₹{deliveryOptions['1'].cost}</option>
                          <option value="2">Fast Delivery - ₹{deliveryOptions['2'].cost}</option>
                        </select>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Give code
                      </MDBTypography>

                      <div className="mb-5">
                        <input class="form-control" placeholder="Enter Your Code" style={{ backgroundColor: "#eae8e8", borderWidth: "1px", borderColor: "#1c1919" }} />
                      </div>


                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">₹{cartItems.length === 0 ? 0 : updatedTotalBill}</MDBTypography>
                      </div>
                      <div class="d-grid gap-2">
                        <Link to="/checkout" class="btn btn-secondary" style={{color:"white"}} onClick={handleShippingOption}>Checkout</Link>
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default CartPage;
