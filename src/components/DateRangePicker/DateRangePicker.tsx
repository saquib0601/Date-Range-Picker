import React, { useState } from 'react';
import { isWeekday, formatDate, getWeekendDatesInRange } from '../../utils/dateUtils';

interface DateRangePickerProps {
  onChange: (dateRange: [string, string], weekendDates: string[]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Function to reset time of a date to midnight (to avoid timezone issues)
  const resetTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const handleDateClick = (date: Date) => {
    if (!isWeekday(date)) return;
  
    const newDate = resetTime(date); // Reset time
  
    if (!startDate || (startDate && endDate)) {
      // If startDate is not set or both start and end dates are set, reset the selection
      setStartDate(newDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // If startDate is set but endDate is not, finalize the range
      if (newDate >= startDate) {
        setEndDate(newDate);
  
        // Get weekend dates in the range
        const weekends = getWeekendDatesInRange(startDate, newDate);
  
        // Call onChange with the selected date range and weekends
        onChange([formatDate(startDate), formatDate(newDate)], weekends);
      }
    }
  };
  

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const renderDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: JSX.Element[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected = (startDate && date >= startDate && (!endDate || date <= endDate)) && isWeekday(date);

      days.push(
        <button
          key={i}
          onClick={() => handleDateClick(date)}
          disabled={!isWeekday(date)}
          className={`date-button ${isSelected ? 'selected' : ''}`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const applyPredefinedRange = (daysAgo: number) => {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - daysAgo);

    const resetNow = resetTime(now);
    const resetPastDate = resetTime(pastDate);

    setStartDate(resetPastDate);
    setEndDate(resetNow);

    const weekends = getWeekendDatesInRange(resetPastDate, resetNow);
    onChange([formatDate(resetPastDate), formatDate(resetNow)], weekends);
  };

  return (
    <div className="date-range-picker">
      <div className="navigation-buttons">
        <button onClick={handlePrevMonth}>Prev Month</button>
        <span>{currentMonth + 1}/{currentYear}</span>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>
      <div className="date-buttons">
        {renderDaysInMonth(currentYear, currentMonth)}
      </div>

      {/* Predefined ranges */}
      <div className="predefined-ranges">
        <button className="predefined-button" onClick={() => applyPredefinedRange(7)}>
          Last 7 Days
        </button>
        <button className="predefined-button" onClick={() => applyPredefinedRange(30)}>
          Last 30 Days
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
