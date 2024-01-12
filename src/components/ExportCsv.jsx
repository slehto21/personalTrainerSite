import React from 'react';
import { CSVLink } from 'react-csv';


export default function ExportCsv(props) {

    // Set props to csvData
    const { csvData } = props;
    // Remove links from csvData
    const filteredCsvData = csvData.map(({ links, ...rest }) => rest);

    // Render button, which exports csvData to csv file
    return (
        <div>
            <CSVLink filename="customers.csv" data={filteredCsvData}>
                Export to CSV
            </CSVLink>
        </div>

    )

}