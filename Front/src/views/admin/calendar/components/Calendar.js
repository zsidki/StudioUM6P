import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => (
    <span>
        <strong>Service Name:</strong> {event.serviceName} <br />
        <strong>Assigned to:</strong> {event.workerAssigned}
    </span>
);

const BigCalendar = () => {
    const [myEventsList, setMyEventsList] = useState([]);

    // Fetch event data from your API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://comm6-0-1.onrender.com/api/selections/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Transform data to match the calendar format
                const formattedEvents = data.map(event => ({
                    serviceName: event.serviceName, // Store service name
                    workerAssigned: event.workerAssigned, // Store worker assigned
                    start: new Date(event.startDate), // Adjust these according to your API response
                    end: new Date(event.endDate), // Adjust these according to your API response
                }));

                setMyEventsList(formattedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array means this effect runs once after the first render

    const handleSelectEvent = (event) => {
        alert(event.serviceName);
    };

    

    return (
        <div style={{ height: '80vh', width: '100vw', backgroundColor: 'white' }}>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%' }}
                selectable
                onSelectEvent={handleSelectEvent}
                views={['month', 'week', 'day']} // Define the available views
                defaultView="month" // Set the default view
                components={{
                    event: CustomEvent, // Use the custom event component
                }}
            />
        </div>
    );
};

export default BigCalendar;
