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
        <div style={parent_container}>
            <section style={counter}>
                <span> 
                    <p>{eventName} <br/>
                    {eventDate} {eventTime}</p><br/><br/>
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
            <form onSubmit={handleSubmit} style={form}>
                    <label htmlFor='event_name'>Event Name: </label>
                    <input type='text' onChange={event => setEventName(event.target.value)} required/>
                    <label htmlFor='event_date'>Event Date: </label>
                    <input type='date' onChange={event => setEventDate(event.target.value)} required/>
                    <label htmlFor='event_time'>Event Time: </label>
                    <input type='time' onChange={event => setEventTime(event.target.value)} required/>
                    <button style={button} type='submit'>Submit</button>
                </form>
            </section>
        </div>
    ); 
}

const parent_container = {
    display: 'flex',  
    flexDirection: 'column', 
    justifyContent: 'center', 
    minHeight: '100vh',
}

const counter = {
    backgroundColor:'#CEE0DC',
    padding: '15px', 
    minHeight: '50vh', 
    display: 'flex',  
    flexDirection: 'column', 
    justifyContent: 'center', 
}
const form = {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    backgroundColor: ' #B4BDC7', 
    padding: '15px', 
    minHeight: '50vh', 
}
const button = {
    backgroundColor: '#A93C52', 
    border: 'none', 
    borderRadius: '25px',
    color: 'white', 
    padding: '15px',  
}
export default Counter; 
