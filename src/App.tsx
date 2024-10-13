import DateRangePicker from './components/DateRangePicker/DateRangePicker';

function App() {
  const handleDateChange = (dateRange: [string, string], weekendDates: string[]) => {
    console.log('Selected Date Range:', dateRange);
    console.log('Weekend Dates:', weekendDates);
  };

  return (
    <div>
      <h1>Weekday Date Range Picker</h1>
      <DateRangePicker onChange={handleDateChange} />
    </div>
  );
}

export default App;
