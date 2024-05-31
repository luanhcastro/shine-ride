export const generateTimes = () => {
    const times = [];
    let startTime = 10 * 60;
    const endTime = 18 * 60;
  
    while (startTime < endTime) {
      const hours = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      if (!(hours === 11 && minutes >= 30) && !(hours === 12) && !(hours === 13 && minutes === 0)) {
        times.push(time);
      }
  
      startTime += 15;
    }
  
    return times;
  };
  