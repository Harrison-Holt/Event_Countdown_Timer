import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../Logic/Timer_Logic';
import './Counter.css';  // Assuming you move styles to an external stylesheet

function Counter() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState(''); 
    const [eventTime, setEventTime] = useState(''); 
    const [timeLeft, setTimeLeft] = useState({}); 

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
    };

    return (
        <div className="parentContainer">
            <section className="counter">
                <h1 className="eventName">{eventName || "No Event Selected"}</h1>
                <p className="eventDateTime">{eventDate} at {eventTime}</p>
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
                    <input type='text' onChange={e => setEventName(e.target.value)} required className="input"/>
                    <label htmlFor='event_date' className="label">Event Date:</label>
                    <input type='date' onChange={e => setEventDate(e.target.value)} required className="input"/>
                    <label htmlFor='event_time' className="label">Event Time:</label>
                    <input type='time' onChange={e => setEventTime(e.target.value)} required className="input"/>
                    <button type='submit' className="button">Submit</button>
                </form>
            </section>
        </div>
    ); 
}

export default Counter;

