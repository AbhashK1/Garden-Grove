import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review({cartItems, bill, addressDetails}) {
  const props=cartItems;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.quantity} />
            <Typography variant="body2">₹{product.dprice}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={bill.selectedDeliveryName} />
            <Typography variant="body2">₹{bill.selectedDeliveryCost}</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          ₹{bill.totalBill+bill.selectedDeliveryCost}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addressDetails.firstName} {addressDetails.lastName}</Typography>
          <Typography gutterBottom>{addressDetails.address1}, {addressDetails.address2}</Typography>
          <Typography gutterBottom>{addressDetails.city}, {addressDetails.zip}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}