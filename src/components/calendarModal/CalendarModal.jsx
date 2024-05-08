import React, { useState } from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import './calendar.css';
import './calendarModal.scss';

const CalendarModal = ({ onClickDate, pickedDate }) => {
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

CalendarModal.propTypes = {
  onClickDate: PropTypes.func,
};
