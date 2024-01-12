import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

export default function ActivityStats() {

    const [data, setData] = useState([{ activity: 'activity', duration: 'duration' }]);
    const [dataGrouped, setDataGrouped] = useState([{ activity: 'activity', duration: 'duration' }]);

    useEffect(() => getTrainings(), []);

    // Get trainings from database
    const getTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                setData(responseData);
            })
            .catch(err => console.error(err));
    };

    // Group data by activity and sum durations
    const groupData = (data) => {
        const groupedData = _.groupBy(data, 'activity');

        const transformedData = Object.entries(groupedData).map(([activity, group]) => ({
            activity,
            duration: group.reduce((sum, entry) => sum + parseFloat(entry.duration), 0),
        }));

        setDataGrouped(transformedData);
        console.log(transformedData);
    };

    // Refresh data when data changes
    useEffect(() => groupData(data), [data]);

    // Render chart
    return (
        <div>
            <h1>ActivityStats</h1>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={dataGrouped}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis
                        dataKey="activity"
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar
                        dataKey="duration"
                        fill="#8884d8"
                        background={{ fill: '#eee' }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}