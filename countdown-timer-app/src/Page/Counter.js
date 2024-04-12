import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../Logic/Timer_Logic';

function Counter() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [timeLeft, setTimeLeft] = useState({});
    const [showDetails, setShowDetails] = useState(false);  // State to control visibility of the timer and event details

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
        setShowDetails(true);  // Set visibility to true when form is submitted
    };

    return (
        <div style={styles.parentContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label htmlFor='event_name' style={styles.label}>Event Name:</label>
                <input type='text' onChange={e => setEventName(e.target.value)} required style={styles.input}/>
                <label htmlFor='event_date' style={styles.label}>Event Date:</label>
                <input type='date' onChange={e => setEventDate(e.target.value)} required style={styles.input}/>
                <label htmlFor='event_time' style={styles.label}>Event Time:</label>
                <input type='time' onChange={e => setEventTime(e.target.value)} required style={styles.input}/>
                <button type='submit' style={styles.button}>Submit</button>
            </form>
            {showDetails && (
                <section style={styles.counter}>
                    <h1 style={styles.eventName}>{eventName}</h1>
                    <p style={styles.eventDateTime}>{eventDate} at {eventTime}</p>
                    <div style={styles.timeLeft}>
                        Time Left:
                        {timeLeft.weeks_left > 0 && <span>{timeLeft.weeks_left} weeks </span>}
                        {timeLeft.days_left > 0 && <span>{timeLeft.days_left} days </span>}
                        {timeLeft.hours_left > 0 && <span>{timeLeft.hours_left} hours </span>}
                        {timeLeft.minutes_left > 0 && <span>{timeLeft.minutes_left} minutes </span>}
                        {timeLeft.seconds_left > 0 && <span>{timeLeft.seconds_left} seconds</span>}
                    </div>
                </section>
            )}
        </div>
    ); 
}

export default Counter;



