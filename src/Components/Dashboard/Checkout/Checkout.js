import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext/AuthContext'
import { Link } from 'react-router-dom';
import './Checkout.css'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link to="/index" color="inherit">
        Garden Grove
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, cartItems, bill, addressDetails, paymentDetails, handleAddressFormChange, handlePaymentFormChange) {

  switch (step) {
    case 0:
      return <AddressForm addressDetails={addressDetails}
      onChange={handleAddressFormChange}/>;
    case 1:
      return <PaymentForm paymentDetails={paymentDetails}
      onChange={handlePaymentFormChange}/>;
    case 2:
      return <Review cartItems={cartItems} bill={bill} />;
    default:
      throw new Error('Unknown step');
  }
}

function EmptyCartMessage() {
  return (
    <Typography variant="h6" align="center" style={{ margin: '10px' }}>
      Your cart is empty. Add some items to your cart!
    </Typography>
  );
}

export default function Checkout({ cartItems, bill }) {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [addressDetails, setAddressDetails] = React.useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state:'',
    zip:'',
    country:'',
  });

  const [paymentDetails, setPaymentDetails] = React.useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv:'',
  });

  const handleAddressFormChange = (newAddressDetails) => {
    setAddressDetails(newAddressDetails);
  };

  const handlePaymentFormChange = (newPaymentDetails) => {
    setPaymentDetails(newPaymentDetails);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);


  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div style={{ backgroundColor: '#d1fce2', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ backgroundColor: '#faf3ef', borderRadius: '20px' }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>

          {cartItems.length === 0 ? (
            <EmptyCartMessage />
          ) : (
            <>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.
                  </Typography>
                  <br />
                  <div class="d-grid gap-2">
                    <Link to="/index" class="btn btn-secondary" style={{ color: "white" }} >Home</Link>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, cartItems, bill, addressDetails, paymentDetails, handleAddressFormChange, handlePaymentFormChange)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </>
          )}
        </Paper>
        <Copyright />
      </Container>
    </div>
  );
}