import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

export default function TrainingList() {

    const [trainings, setTrainings] = useState([{
        date: 'date', duration: 'duration', activity: 'activity', firstname: 'firstname', lastname: 'lastname', id: 'id'
    }]);

    // Ref to ag-grid
    const gridRef = useRef();

    // Columns for traininglist
    const columns = [
        { field: 'date', headerName: 'Date', sortable: true, filter: true },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
        { field: 'customer.firstname', headerName: 'First name', sortable: true, filter: true },
        { field: 'customer.lastname', headerName: 'Last name', sortable: true, filter: true },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteTraining(params)}>
                    Delete
                </Button>,
        }
    ];

    useEffect(() => getTrainings(), []);

    const formatDate = (date) => {
        return dayjs(date).format('DD.MM.YYYY HH:mm');
    };

    // Delete training from database
    const deleteTraining = (params) => {
        console.log('https://traineeapp.azurewebsites.net/api/trainings/' + params.data.id)
        if (window.confirm('Are you sure?')) {
            fetch('https://traineeapp.azurewebsites.net/api/trainings/' + params.data.id, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        getTrainings();
                    } else
                        alert('Something went wrong in deletion: ' + response.status);
                })
                .catch(err => console.error(err));
        }
    }

    // Get trainings from database and format them
    const getTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                const formattedTrainings = responseData.map(training => ({
                    ...training,
                    date: formatDate(training.date),
                }));
                console.log(formattedTrainings);
                setTrainings(formattedTrainings);
            })
            .catch(err => console.error(err));
    };

    // Render traininglist
    return (
        <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto' }}>
            <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                columnDefs={columns}
                rowData={trainings}
                pagination={true}
                paginationPageSize={10}
                rowSelection="single"
            >
            </AgGridReact>
        </div>
    )
}