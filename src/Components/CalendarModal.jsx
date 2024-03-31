import React from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarModal = ({ modalWindow, setModalWindow, onClickDate }) => {
  const onClickDay = () => {
    setTimeout(() => {
      setModalWindow(!modalWindow);
    }, 1000);
  };

  return (
    <div>
      <div className="calendar__modal">
        <Calendar
          onClickDate={onClickDate}
          onChange={onClickDate}
        />
      </div>
    </div>
  );
};

export default CalendarModal;
