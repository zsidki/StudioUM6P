import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AdminDashboard.css';  // Custom CSS for styling

const localizer = momentLocalizer(moment);

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all');
        const selections = response.data.map((selection) => ({
          title: `${selection.workerAssigned} - ${selection.serviceName}`,
          start: new Date(selection.startDate),
          end: new Date(selection.endDate),
          serviceName: selection.serviceName,
          category: selection.category,
          worker: selection.workerAssigned,
        }));
        setEvents(selections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEventMouseOver = (event, e) => {
    const { clientX, clientY } = e;
    setTooltip({
      visible: true,
      content: `${event.worker} - ${event.serviceName} (${event.category})`,
      x: clientX,
      y: clientY,
    });
  };

  const handleEventMouseOut = () => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };

  return (
    <div style={{ position: 'relative' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        onSelectEvent={(event) => alert(`${event.worker}: ${event.serviceName}`)}
        onMouseOver={handleEventMouseOver}
        onMouseOut={handleEventMouseOut}
      />
      {tooltip.visible && (
        <div
          className="rbc-tooltip"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            transform: 'translate(10px, 10px)',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
