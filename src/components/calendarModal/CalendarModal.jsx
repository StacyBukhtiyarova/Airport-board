import React, { useState } from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './calendar.css';
import './calendarModal.scss';

const CalendarModal = ({ onClickDate, pickedDate }) => {
  return (
    <div>
      <Link to={`/${pickedDate.toLocaleDateString()}`}>
        <div className="calendar__modal">
          <Calendar
            onClickDate={onClickDate}
            onChange={onClickDate}
            pickedDate={pickedDate}
            value={pickedDate}
          />
        </div>
      </Link>
    </div>
  );
};

export default CalendarModal;

CalendarModal.propTypes = {
  onClickDate: PropTypes.func,
};
