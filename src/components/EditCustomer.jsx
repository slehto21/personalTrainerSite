import React from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { useState } from 'react';

export default function EditCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    });
    const [open, setOpen] = React.useState(false);

    // Open dialog and set customer
    const handleClickOpen = () => {
        console.log(props.customer);
        setCustomer({
            firstname: props.customer.firstname, lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress, postcode: props.customer.postcode,
            city: props.customer.city, email: props.customer.email, phone: props.customer.phone
        });
        setOpen(true);
    }

    // Close dialog
    const handleClose = () => {
        setOpen(false);
    }

    // Update customer state
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    // Update customer and close dialog
    const updateCustomer = () => {
        props.updateCustomer(props.customer.links[0].href, customer);
        handleClose();
    }

    // Render dialog, where user can edit customer information
    return (
        <div>
            <Button onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill the customer information
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}
                        label="First name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}
                        label="Last name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}
                        label="Street address"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={e => handleInputChange(e)}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}
                        label="Phone"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={updateCustomer} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}