import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../Logic/Timer_Logic';
import './counter.css';  

function Counter() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [timeLeft, setTimeLeft] = useState({});
    
    useEffect(() => {
        const storedEvent = JSON.parse(localStorage.getItem('eventData'));
        if (storedEvent) {
            setEventName(storedEvent.eventName);
            setEventDate(storedEvent.eventDate);
            setEventTime(storedEvent.eventTime);
        }
    }, []);
    
    useEffect(() => {
        const updateTimer = () => {
            const newTimeLeft = calculateTimeLeft(eventDate, eventTime); 
            setTimeLeft(newTimeLeft); 
        };

        updateTimer(); 
        const intervalId = setInterval(updateTimer, 1000); 

        return () => clearInterval(intervalId); 
    }, [eventDate, eventTime]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const eventData = {
            eventName,
            eventDate,
            eventTime
        };
        localStorage.setItem('eventData', JSON.stringify(eventData));
    };

    const handleDelete = () => {
        localStorage.removeItem('eventData');
        setEventName('');
        setEventDate('');
        setEventTime('');
    };

    return (
        <div className="parentContainer">
            <section className="counter">
                <h1 className="eventName">{eventName || "No Event Selected"}</h1>
                <p className="eventDateTime">{eventDate} at {eventTime}</p>
                {eventName && (
                    <button onClick={handleDelete} className="deleteButton">Delete</button>
                )}
                <div className="timeLeft">
                    Time Left:
                    {timeLeft.weeks_left > 0 && <span>{timeLeft.weeks_left} weeks </span>}
                    {timeLeft.days_left > 0 && <span>{timeLeft.days_left} days </span>}
                    {timeLeft.hours_left > 0 && <span>{timeLeft.hours_left} hours </span>}
                    {timeLeft.minutes_left > 0 && <span>{timeLeft.minutes_left} minutes </span>}
                    {timeLeft.seconds_left > 0 && <span>{timeLeft.seconds_left} seconds</span>}
                </div>
            </section>
            <section>
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor='event_name' className="label">Event Name:</label>
                    <input type='text' value={eventName} onChange={e => setEventName(e.target.value)} required className="input"/>
                    <label htmlFor='event_date' className="label">Event Date:</label>
                    <input type='date' value={eventDate} onChange={e => setEventDate(e.target.value)} required className="input"/>
                    <label htmlFor='event_time' className="label">Event Time:</label>
                    <input type='time' value={eventTime} onChange={e => setEventTime(e.target.value)} required className="input"/>
                    <button type='submit' className="button">Submit</button>
                </form>
            </section>
        </div>
    ); 
}

export default Counter;


