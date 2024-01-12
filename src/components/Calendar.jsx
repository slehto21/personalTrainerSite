import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import { startOfWeek } from "date-fns";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";
import dayjs from 'dayjs';

export default function TrainingCalendar() {

    const [trainings, setTrainings] = useState([
        {
            start: new Date(), // Start date
            end: new Date(), // End date
            title: '', // Info about training
        }
    ]);

    useEffect(() => getTrainings(), []);

    // Get trainings from database, format them and set them to state
    const getTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                const formattedTrainings = responseData.map(training => ({
                    ...training,
                    start: dayjs(training.date).toDate(),
                    end: dayjs(training.date).add(training.duration, 'minute').toDate(),
                    title: training.activity + ' / ' + training.customer.firstname + ' ' + training.customer.lastname,
                }));
                console.log(formattedTrainings);
                setTrainings(formattedTrainings);
            })
            .catch(err => console.error(err));
    };

    // Calendar localization
    const locales = {
        'en-US': enUS,
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    //Render calendar
    return (
        <div>
            <h1>Calendar</h1>
            <Calendar
                localizer={localizer}
                events={trainings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "50px" }} />
        </div>
    )
}
