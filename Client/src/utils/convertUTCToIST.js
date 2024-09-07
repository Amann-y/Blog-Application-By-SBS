export const convertUTCToIST = (utcDate) => {
    const date = new Date(utcDate);
    // IST is UTC+5:30
    const offset = 5 * 60 + 30; // minutes
    const localDate = new Date(date.getTime() + offset * 60 * 1000);
    
    return localDate.toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata', 
      hour12: true, 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      // hour: 'numeric', 
      // minute: 'numeric', 
      // second: 'numeric'
    });
  };