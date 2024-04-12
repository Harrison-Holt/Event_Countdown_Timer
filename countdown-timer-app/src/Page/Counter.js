import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../Logic/Timer_Logic';
import './counter.css';  // Ensure the CSS file is correctly imported

function Counter() {
    const [eventName, setEventName] = useState(localStorage.getItem('eventName') || '');
    const [eventDate, setEventDate] = useState(localStorage.getItem('eventDate') || '');
    const [eventTime, setEventTime] = useState(localStorage.getItem('eventTime') || '');
    const [timeLeft, setTimeLeft] = useState({});
    const [showDetails, setShowDetails] = useState(false);  

    useEffect(() => {
        const updateTimer = () => {
            if (showDetails && eventDate && eventTime) {
                const newTimeLeft = calculateTimeLeft(eventDate, eventTime);
                setTimeLeft(newTimeLeft);
            }
        };

        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [eventDate, eventTime, showDetails]);

    useEffect(() => {
        localStorage.setItem('eventName', eventName);
        localStorage.setItem('eventDate', eventDate);
        localStorage.setItem('eventTime', eventTime);
    }, [eventName, eventDate, eventTime]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowDetails(true);  // Show event details and timer after submit
    };

    const handleDelete = () => {
        // Clear state, localStorage, and hide details
        setShowDetails(false);  // Also hide the event details
        setEventName('');
        setEventDate('');
        setEventTime('');
        localStorage.removeItem('eventName');
        localStorage.removeItem('eventDate');
        localStorage.removeItem('eventTime');
    };

    return (
        <div className="parentContainer">
            {showDetails && (
                <section className="counter">
                    <h1 className="eventName">{eventName || "No Event Selected"}</h1>
                    <p className="eventDateTime">{`${eventDate} at ${eventTime}`}</p>
                    <div className="timeLeft">
                        Time Left:
                        {timeLeft.weeks_left > 0 && <span>{timeLeft.weeks_left} weeks </span>}
                        {timeLeft.days_left > 0 && <span>{timeLeft.days_left} days </span>}
                        {timeLeft.hours_left > 0 && <span>{timeLeft.hours_left} hours </span>}
                        {timeLeft.minutes_left > 0 && <span>{timeLeft.minutes_left} minutes </span>}
                        {timeLeft.seconds_left > 0 && <span>{timeLeft.seconds_left} seconds </span>}
                    </div>
                </section>
            )}
            <form onSubmit={handleSubmit} className="form">
                <input type='text' id='event_name' value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Event Name" required className="input"/>
                <input type='date' id='event_date' value={eventDate} onChange={e => setEventDate(e.target.value)} required className="input"/>
                <input type='time' id='event_time' value={eventTime} onChange={e => setEventTime(e.target.value)} required className="input"/>
                <div className="buttonGroup">
                    <button type='submit' className="button">Set Event</button>
                    <button type='button' onClick={handleDelete} className="deleteButton">Clear Event</button>
                </div>
            </form>
        </div>
    );
}

export default Counter;



