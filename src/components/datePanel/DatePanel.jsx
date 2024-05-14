import React from 'react';
import PropTypes from 'prop-types';
import './datePanel.scss';

const DatePanel = ({ onClickDate, pickedDate, onChangeDate }) => {
  const oneDayMs = 86400000;
  const yesterday = new Date(new Date().getTime() - oneDayMs).toLocaleDateString('ua-Ua', dateOptions);
  const today = new Date(new Date().getTime()).toLocaleDateString('ua-Ua', dateOptions );
  const tomorrow = new Date(new Date().getTime() + oneDayMs).toLocaleDateString('ua-Ua',dateOptions);
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
        type="date"
        value={pickedDate.toLocaleDateString()}
        onChange={(e) => onChangeDate(e)}
        className="input__type-date"
      />
      <div className="date-panel__container">
        <span>{yesterday}</span>
        <button
          onClick={handleClickYesterday}
          className="date-panel__button">
          <span>YESTERDAY</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
      <div className="date-panel__container">
        <span>{today}</span>
        <button
          onClick={handleClickToday}
          className="date-panel__button">
          <span>TODAY</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
      <div className="date-panel__container">
        <span>{tomorrow}</span>
        <button
          onClick={handleClickTomorrow}
          className="date-panel__button">
          <span>TOMORROW</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
    </div>
  );
};

DatePanel.propTypes = {
  onClickDate: PropTypes.func.isRequired,
};

export default DatePanel;
