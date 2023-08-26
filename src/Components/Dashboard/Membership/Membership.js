import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import accept from './accept.png'

const tiers = [
  {
    title: 'Premium',
    subheader: 'Membership Perks',
    price: '60',
    description: [
      'Powerful Price Prediction Feature',
      'Extra 10% off on every order',
      'Fast, carbon-neutral shipping',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Membership() {
  const navigate = useNavigate();

  const userx = localStorage.getItem('user');
  const parsedUser = JSON.parse(userx);


  const RAZOR_PAY_KEY_ID = "rzp_test_Fo9DGjTaOK5EDP";
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentHandler = async (e) => {
    if (!parsedUser) {
      navigate('/login');
    }
    else {
      const API_URL = 'http://localhost:4000/'
      e.preventDefault();
      const orderUrl = `${API_URL}order`;
      const response = await Axios.get(orderUrl);
      const { data } = response;
      const options = {
        key: RAZOR_PAY_KEY_ID,
        name: "Garden Grove",
        description: "Payment",
        order_id: data.id,
        handler: async (response) => {
          try {
            const paymentId = response.razorpay_payment_id;
            const url = `${API_URL}capture/${paymentId}`;
            const captureResponse = await Axios.post(url, {})
            console.log(captureResponse.data);
            setPaymentSuccess(true);
            handleUpdatePremuim();

          } catch (err) {
            console.log(err);
          }
        },
        theme: {
          color: "#686CFD",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  };

  const handleUpdatePremuim = () => {
    const updatedInfo = {
      email: parsedUser.email,
      premiumUser: true
    };

    axios.post('http://localhost:4000/updatePremium', updatedInfo)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error updating address:', error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Membership
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Fresh Harvest Pricing: Streamlining Vegetable Market Logistics
        </Typography>
      </Container>
      {/* End hero unit */}
      {paymentSuccess ? (
        <Container maxWidth="md" component="main">
          <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex' }}>
              <img src={accept} style={{ width: '30px', height: '30px', marginRight: '10px', marginBottom: '7px' }} /><h5>You are a Premium Member</h5>
            </div>
            <div class="d-grid gap-2" style={{ display: 'grid', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
              <Link to="/index" class="btn btn-secondary" style={{ color: "white", width: '100px' }} >Home</Link>
            </div>
          </div>
        </Container>
      ) : (
        <Container maxWidth="md" component="main">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
                style={{ width: '300px' }}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Premium' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                    style={{ backgroundColor: "#faf3ef" }}
                  />
                  <CardContent >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component="h2" variant="h3" color="text.primary">
                        ₹{tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions >
                    <Button fullWidth variant={tier.buttonVariant} onClick={paymentHandler}>
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </div>
        </Container>
      )}

      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}