import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../Logic/Timer_Logic';
import './counter.css';  // Ensure the CSS file is correctly imported

function Counter() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [timeLeft, setTimeLeft] = useState({});
    const [showDetails, setShowDetails] = useState(false);  // State to control visibility

    useEffect(() => {
        if (showDetails) {
            const updateTimer = () => {
                const newTimeLeft = calculateTimeLeft(eventDate, eventTime);
                setTimeLeft(newTimeLeft);
            };

            updateTimer();
            const intervalId = setInterval(updateTimer, 1000);

            return () => clearInterval(intervalId);
        }
    }, [eventDate, eventTime, showDetails]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowDetails(true);  // Show event details and timer after submit
    };

    return (
        <div className="parent-container">
            <form onSubmit={handleSubmit} className="form-style">
                <label htmlFor='event_name' className="label-style">Event Name:</label>
                <input type='text' onChange={e => setEventName(e.target.value)} required className="input-style"/>
                <label htmlFor='event_date' className="label-style">Event Date:</label>
                <input type='date' onChange={e => setEventDate(e.target.value)} required className="input-style"/>
                <label htmlFor='event_time' className="label-style">Event Time:</label>
                <input type='time' onChange={e => setEventTime(e.target.value)} required className="input-style"/>
                <button type='submit' className="button-style">Submit</button>
            </form>
            {showDetails && (
                <section className="counter-style">
                    <h1 className="event-name">{eventName}</h1>
                    <p className="event-date-time">{eventDate} at {eventTime}</p>
                    <div className="time-left">
                        Time Left:
                        {timeLeft.weeks_left > 0 && `${timeLeft.weeks_left} weeks `}
                        {timeLeft.days_left > 0 && `${timeLeft.days_left} days `}
                        {timeLeft.hours_left > 0 && `${timeLeft.hours_left} hours `}
                        {timeLeft.minutes_left > 0 && `${timeLeft.minutes_left} minutes `}
                        {timeLeft.seconds_left > 0 && `${timeLeft.seconds_left} seconds`}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Counter;




