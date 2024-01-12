import { Dialog } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default function AddTraining(props) {

    const [training, setTraining] = useState({
        date: '', duration: '', activity: '', customer: '', time: ''
    });
    const [open, setOpen] = React.useState(false);

    dayjs.extend(utc);
    dayjs.extend(timezone);

    // Open dialog and set customer
    const handleClickOpen = () => {
        setOpen(true);
        setTraining({ customer: props.customer.links[0].href })
    };

    // Close dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Update training state
    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    // Save training and close dialog
    const addTraining = () => {
        const isoDateTime = dayjs(`${training.date}T${training.time}`).tz('Europe/Helsinki').toISOString();
        let { time, ...trainingWithoutTime } = training;
        trainingWithoutTime.date = isoDateTime;
        props.saveTraining(trainingWithoutTime);
        handleClose();
    };


    // Render dialog, where user can add a new training
    return (
        <div>
            <Button onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill the training information
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        type="date"
                        value={training.date || ''}
                        onChange={e => handleInputChange(e)}
                        label="Date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                            style: { width: '100%' }
                        }} />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="time"
                        type="time"
                        value={training.time || ''}
                        onChange={e => handleInputChange(e)}
                        label="Time"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                            style: { width: '100%' }
                        }} />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration || ''}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity || ''}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="customer"
                        value={training.customer || ''}
                        onChange={e => handleInputChange(e)}
                        label="Customer"
                        style={{ display: 'none' }}
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={addTraining} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}