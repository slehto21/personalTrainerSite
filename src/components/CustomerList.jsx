import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useRef } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Button from '@mui/material/Button';
import AddTraining from './AddTraining';
import ExportCSV from './ExportCsv';

export default function CustomerList() {
    const [customers, setCustomers] = useState([{
        firstname: 'firstname', lastname: 'lastname', streetaddress: 'streetaddress',
        postcode: 'postcode', city: 'city', email: 'email', phone: 'phone'
    }]);

    // Ref to ag-grid
    const gridRef = useRef();

    // Customerlist columns
    const columns = [
        { field: 'firstname', headerName: 'First name', sortable: true, filter: true },
        { field: 'lastname', headerName: 'Last name', sortable: true, filter: true },
        { field: 'streetaddress', headerName: 'Street address', sortable: true, filter: true },
        { field: 'postcode', headerName: 'Postcode', sortable: true, filter: true },
        { field: 'city', headerName: 'City', sortable: true, filter: true },
        { field: 'email', headerName: 'Email', sortable: true, filter: true },
        { field: 'phone', headerName: 'Phone', sortable: true, filter: true },
        {
            cellRenderer: params =>
                <AddTraining saveTraining={saveTraining} customer={params.data} />
        },
        {
            cellRenderer: params =>
                <EditCustomer updateCustomer={updateCustomer} customer={params.data} />
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>,
        }
    ];

    useEffect(() => getCustomers(), []);

    // Delete customer from database
    const deleteCustomer = (params) => {
        console.log("params.data.links[0].href = " + params.data.links[0].href);
        const customerHref = params.data.links[0].href;
        if (window.confirm('Are you sure?')) {
            fetch(customerHref, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        getCustomers();
                    } else
                        alert('Something went wrong in deletion: ' + response.status);
                })
                .catch(err => console.error(err)); // console.log/console.error/console.warning
        }
    }

    // Get customers from database
    const getCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData.content);
                setCustomers(responseData.content);
            })
            .catch(err => console.error(err));
    };

    // Add customer to database
    const saveCustomer = (newCustomer) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(res => getCustomers())
            .catch(err => console.error(err))
    }

    // Update customer in database
    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(res => getCustomers())
            .catch(err => console.error(err))
    }

    // Add training to database
    const saveTraining = (newTraining) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newTraining)
        })
            .then(res => getCustomers())
            .catch(err => console.error(err))
    }

    // Render customerlist, where user can add, edit, delete customers and get data as csv
    return (
        <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto' }}>
            <AddCustomer saveCustomer={saveCustomer} />
            <ExportCSV csvData={customers} />
            <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                columnDefs={columns}
                rowData={customers}
                pagination={true}
                paginationPageSize={10}
                rowSelection="single"
            >
            </AgGridReact>
        </div>
    );
}