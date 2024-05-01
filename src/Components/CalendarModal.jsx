import React from 'react';

import Calendar from 'react-calendar';

import '../styles/calendar.scss';

const CalendarModal = ({ onClickDate }) => {
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
