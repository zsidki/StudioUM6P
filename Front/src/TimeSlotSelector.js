import React, { useState } from 'react';

export const TimeSlotSelector = ({ availableTimes, selectedTime, onSelectTime }) => {
  const [selected, setSelected] = useState(selectedTime);

  const handleTimeClick = (time) => {
    setSelected(time);
    onSelectTime(time);
  };

  return (
    <div className="flex flex-wrap mt-4">
      {availableTimes.map((time, index) => (
        <button
          key={index}
          onClick={() => handleTimeClick(time)}
          className={`m-2 px-4 py-2 rounded-md border ${selected === time ? 'bg-custom-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          {time}
        </button>
      ))}
    </div>
  );
};
