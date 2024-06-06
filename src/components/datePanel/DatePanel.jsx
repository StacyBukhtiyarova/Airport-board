import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import './datePanel.scss';

const DatePanel = ({ onClickDate, onChangeDate, pickedDate }) => {
  const oneDayMs = 86400000;
  const dateOptions = {
    day: '2-digit',
    month: '2-digit',
  };
  const yesterday = new Date(
    new Date().getTime() - oneDayMs
  ).toLocaleDateString('ua-Ua', dateOptions);
  const today = new Date(new Date().getTime()).toLocaleDateString(
    'ua-Ua',
    dateOptions
  );
  const tomorrow = new Date(new Date().getTime() + oneDayMs).toLocaleDateString(
    'ua-Ua',
    dateOptions
  );
  const handleClickYesterday = () => {
    const yesterdayDate = new Date(new Date().getTime() - oneDayMs);
    onClickDate(yesterdayDate);
  };

  const handleClickToday = () => {
    onClickDate(new Date());
  };

  const handleClickTomorrow = () => {
    const tomorrowDate = new Date(new Date().getTime() + oneDayMs);
    onClickDate(tomorrowDate);
  };

  return (
    <div className="date-panel">
      <input
        value={pickedDate.toISOString().split('T')[0]}
        type="date"
        onChange={(e) => onChangeDate(e)}
        className="date-panel__container input__type-date"
      />
      <FontAwesomeIcon
        className="calendar-icon"
        icon={faCalendar}
      />
      <div className="date-panel__container">
        <span>{yesterday}</span>
        <button
          onClick={handleClickYesterday}
          className="date-panel__button">
          <span>YESTERDAY</span>
        </button>
        <span
          className="date-panel__line"
          style={{
            borderBottomColor:
              pickedDate.toDateString() ===
              new Date(new Date().getTime() - oneDayMs).toDateString()
                ? '#1eb7ee'
                : '',
          }}></span>
      </div>
      <div className="date-panel__container">
        <span>{today}</span>
        <button
          onClick={handleClickToday}
          className="date-panel__button">
          <span>TODAY</span>
        </button>
        <span
          className="date-panel__line"
          style={{
            borderBottomColor:
              pickedDate.toDateString() === new Date().toDateString()
                ? '#1eb7ee'
                : '',
          }}></span>
      </div>
      <div className="date-panel__container">
        <span>{tomorrow}</span>
        <button
          onClick={handleClickTomorrow}
          className="date-panel__button">
          <span>TOMORROW</span>
        </button>
        <span
          className="date-panel__line"
          style={{
            borderBottomColor:
              pickedDate.toDateString() ===
              new Date(new Date().getTime() + oneDayMs).toDateString()
                ? '#1eb7ee'
                : '',
          }}></span>
      </div>
    </div>
  );
};

DatePanel.propTypes = {
  onClickDate: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func,
  pickedDate: PropTypes.object,
};

export default DatePanel;
