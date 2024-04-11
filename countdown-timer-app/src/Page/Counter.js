import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../Logic/Timer_Logic';

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
        <div style={styles.parentContainer}>
            <section style={styles.counter}>
                <span> 
                    <p>{eventName} <br />
                    {eventDate} {eventTime}</p>
                    <p>
                        Time Left:
                        {timeLeft.weeks_left > 0 && `${timeLeft.weeks_left} weeks `}
                        {timeLeft.days_left > 0 && `${timeLeft.days_left} days `}
                        {timeLeft.hours_left > 0 && `${timeLeft.hours_left} hours `}
                        {timeLeft.minutes_left > 0 && `${timeLeft.minutes_left} minutes `}
                        {timeLeft.seconds_left > 0 && `${timeLeft.seconds_left} seconds`}
                    </p>
                </span>
            </section>
            <section>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label htmlFor='event_name'>Event Name: </label>
                    <input type='text' onChange={event => setEventName(event.target.value)} required />
                    <label htmlFor='event_date'>Event Date: </label>
                    <input type='date' onChange={event => setEventDate(event.target.value)} required />
                    <label htmlFor='event_time'>Event Time: </label>
                    <input type='time' onChange={event => setEventTime(event.target.value)} required />
                    <button style={styles.button} type='submit'>Submit</button>
                </form>
            </section>
        </div>
    ); 
}

const styles = {
    parentContainer: {
        display: 'flex',  
        flexDirection: 'column', 
        justifyContent: 'center', 
        minHeight: '100vh',
        alignItems: 'center',  // Align items centrally for better visual layout
    },
    counter: {
        backgroundColor: '#CEE0DC',
        padding: '15px', 
        minHeight: '50vh', 
        display: 'flex',  
        flexDirection: 'column', 
        justifyContent: 'center', 
        width: '80%', // Makes the counter width responsive
        maxWidth: '600px', // Ensures the container does not stretch too wide on larger screens
    },
    form: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        backgroundColor: '#B4BDC7', 
        padding: '15px', 
        minHeight: '50vh', 
        width: '80%', // Consistent with counter for a balanced look
        maxWidth: '600px', // Limiting max width for better aesthetics
    },
    button: {
        backgroundColor: '#A93C52', 
        border: 'none', 
        borderRadius: '25px',
        color: 'white', 
        padding: '15px',  
        marginTop: '15px', // Adds space above the button for better spacing
        cursor: 'pointer', // Indicates that the button is clickable
    }
};

export default Counter;
