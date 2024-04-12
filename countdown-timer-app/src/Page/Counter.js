import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../Logic/Timer_Logic';
import './counter.css';

function Counter() {
    const [eventName, setEventName] = useState(localStorage.getItem('eventName') || '');
    const [eventDate, setEventDate] = useState(localStorage.getItem('eventDate') || '');
    const [eventTime, setEventTime] = useState(localStorage.getItem('eventTime') || '');
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const updateTimer = () => {
            if (eventDate && eventTime) {
                const newTimeLeft = calculateTimeLeft(eventDate, eventTime);
                setTimeLeft(newTimeLeft);
            }
        };

        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [eventDate, eventTime]);

    useEffect(() => {
        localStorage.setItem('eventName', eventName);
        localStorage.setItem('eventDate', eventDate);
        localStorage.setItem('eventTime', eventTime);
    }, [eventName, eventDate, eventTime]);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleDelete = () => {
        // Clear state and localStorage
        setEventName('');
        setEventDate('');
        setEventTime('');
        localStorage.removeItem('eventName');
        localStorage.removeItem('eventDate');
        localStorage.removeItem('eventTime');
    };

    return (
        <div className="parentContainer">
            <section className="counter">
                <h1 className="eventName">{eventName || "No Event Selected"}</h1>
                <p className="eventDateTime">{eventDate && eventTime ? `${eventDate} at ${eventTime}` : "Date and Time not set"}</p>
                <div className="timeLeft">
                    Time Left:
                    {Object.keys(timeLeft).map((unit) => (
                        timeLeft[unit] > 0 && <span key={unit}>{timeLeft[unit]} {unit.replace('_left', '')} </span>
                    ))}
                </div>
            </section>
            <section>
                <form onSubmit={handleSubmit} className="form">
                    <input type='text' id='event_name' value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Event Name" required className="input"/>
                    <input type='date' id='event_date' value={eventDate} onChange={e => setEventDate(e.target.value)} required className="input"/>
                    <input type='time' id='event_time' value={eventTime} onChange={e => setEventTime(e.target.value)} required className="input"/>
                    <div className="buttonGroup">
                        <button type='submit' className="button">Set Event</button>
                        <button type='button' onClick={handleDelete} className="deleteButton">Clear Event</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Counter;





