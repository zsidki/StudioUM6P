import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AdminDashboard.css';  // Custom CSS for styling

const localizer = momentLocalizer(moment);

const WorkerCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchWorkerAssignments(); // Fetch worker data when component mounts
  }, []);

  const fetchWorkerAssignments = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all'); // API to fetch selections
      const selections = response.data;

      // Format the selections into events for the calendar
      const calendarEvents = selections.map((selection) => ({
        title: `${selection.workerAssigned} - ${selection.serviceName} (${selection.category})`,
        start: new Date(selection.startDate),
        end: new Date(selection.endDate),
        allDay: false,
        worker: selection.workerAssigned,
        service: selection.serviceName,
        category: selection.category,
        price: selection.price,
      }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error fetching worker assignments:', error);
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#D4451E',
        color: '#fff',
        borderRadius: '5px',
        padding: '5px',
        border: 'none',
      },
    };
  };

  return (
    <div style={{ height: '80vh', padding: '20px' }}>
      <h2>Worker Assignment Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        tooltipAccessor={(event) =>
          `${event.worker}\nService: ${event.service}\nCategory: ${event.category}\nPrice: MAD ${event.price}`
        }
        views={['month', 'week', 'day']}
        defaultView="week"
        onSelectEvent={(event) =>
          alert(`Worker: ${event.worker}\nService: ${event.service}\nCategory: ${event.category}\nPrice: MAD ${event.price}\nStarts: ${event.start}\nEnds: ${event.end}`)
        } // Show detailed info on click
      />
    </div>
  );
};

export default WorkerCalendar;
