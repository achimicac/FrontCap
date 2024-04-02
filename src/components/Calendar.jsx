import React, { useState } from 'react';

function Calendar() {
    const [select, setSelect] = useState({
        date: '',
        time: ''
    });
    const [oldselect, setOldselect] = useState([
        { work_date: '2024-03-12', start_time: '13:00:00', end_time: '14:00:00' },
        { work_date: '2024-03-12', start_time: '15:00:00', end_time: '16:00:00' },
        { work_date: '2024-03-12', start_time: '19:00:00', end_time: '21:00:00' }
    ]);

    // Define time options array
    const [timeOptions, setTimeOptions] = useState([]);

    // Generate time options within a specific range
    const generateTimeOptions = () => {
        const startTime = 0; // Start time in hours (e.g., 8 AM)
        const endTime = 23; // End time in hours (e.g., 6 PM)
        const options = [];

        const selectedDateOccupiedHours = oldselect
            .filter(item => item.work_date === select.date)
            .map(item => ({
                start: parseInt(item.start_time.substring(0, 2), 10),
                end: parseInt(item.end_time.substring(0, 2), 10)
            }));

        for (let hour = startTime; hour <= endTime; hour++) {
            let isOccupied = false;
            for (let i = 0; i < selectedDateOccupiedHours.length; i++) {
                if (hour >= selectedDateOccupiedHours[i].start && hour < selectedDateOccupiedHours[i].end) {
                    isOccupied = true;
                    break;
                }
            }
            if (!isOccupied) {
                const time = `${hour.toString().padStart(2, '0')}:00`;
                options.push(time);
            }
        }

        return options;
    };

    // Update time options when date changes
    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setSelect({ date: selectedDate, time: '' }); // Reset selected time when date changes
        setTimeOptions(generateTimeOptions());
    };

    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        setSelect({ ...select, time: selectedTime });
    };

    return (
        <div className="calendar-container">
            <label htmlFor="date">Date:</label>
            <input 
                type="date" 
                id="date" 
                value={select.date} 
                onChange={handleDateChange} 
                min={getCurrentDate()} 
                required 
            />

            <label htmlFor="time">Time:</label>
            <select 
                id="time" 
                value={select.time} 
                onChange={handleTimeChange} 
                disabled={!select.date} // Disable time select until date is selected
                required 
            >
                <option value="">Select Time</option>
                {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
}

// Function to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month/day is less than 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
};

export default Calendar;
