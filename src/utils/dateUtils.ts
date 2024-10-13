export const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Sunday = 0, Saturday = 6
  };
  
  export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-CA');
  };
  
  export const getWeekendDatesInRange = (start: Date, end: Date): string[] => {
    const weekendDates: string[] = [];
    let date = new Date(start);
    
    // Create a new date object to avoid mutating the original end date
    const adjustedEnd = new Date(end);
    adjustedEnd.setHours(23, 59, 59, 999); // Adjust the end date to include it in the iteration
    
    while (date <= adjustedEnd) {
      if (!isWeekday(date)) {
        weekendDates.push(formatDate(date));
      }
      date.setDate(date.getDate() + 1);
    }
    return weekendDates;
  };
  
  