import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../Logic/Timer_Logic';
import './counter.css';

function Counter() {
    const [eventName, setEventName] = useState(localStorage.getItem('eventName') || '');
    const [eventDate, setEventDate] = useState(localStorage.getItem('eventDate') || '');
    const [eventTime, setEventTime] = useState(localStorage.getItem('eventTime') || '');
    const [timeLeft, setTimeLeft] = useState({});
    const [showDetails, setShowDetails] = useState(localStorage.getItem('showDetails') === 'true');
    const [isFinished, setIsFinished] = useState(false);
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            if (showDetails && eventDate && eventTime) {
                const targetTime = new Date(`${eventDate}T${eventTime}`).getTime();
                const currentTime = new Date().getTime();
                
                if (targetTime > currentTime) {
                    const newTimeLeft = calculateTimeLeft(eventDate, eventTime);
                    setTimeLeft(newTimeLeft);
                    setIsFinished(false); // Timer is running
                    setAlertShown(false); // Reset alertShown when timer is running
                } else {
                    setTimeLeft({});
                    setIsFinished(true); // Timer has finished
                    if (!alertShown) {
                        alert('The event time has been reached!');
                        setAlertShown(true); // Set alertShown to true after showing alert
                    }
                }
            } else {
                setTimeLeft({});
            }
        };

        updateTimer(); // Run once on mount to set initial state
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [eventDate, eventTime, showDetails, alertShown]);

    useEffect(() => {
        localStorage.setItem('eventName', eventName);
        localStorage.setItem('eventDate', eventDate);
        localStorage.setItem('eventTime', eventTime);
        localStorage.setItem('showDetails', showDetails); // Store showDetails state
    }, [eventName, eventDate, eventTime, showDetails]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowDetails(true);  
    };

    const handleDelete = () => {
        setShowDetails(false);  
        setEventName('');
        setEventDate('');
        setEventTime('');
        setAlertShown(false); // Reset alertShown when event is cleared
        localStorage.removeItem('eventName');
        localStorage.removeItem('eventDate');
        localStorage.removeItem('eventTime');
        localStorage.setItem('showDetails', false);
    };

    function formatDate(dateString) {
        const parts = dateString.split('-');
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear().toString().slice(-2)}`;
        return formattedDate;
    }
    
    function formatTime(timeString) {
        const [hour, minute] = timeString.split(':');
        const hourInt = parseInt(hour, 10);
        const amPm = hourInt >= 12 ? 'PM' : 'AM';
        const formattedHour = ((hourInt % 12) || 12).toString().padStart(2, '0'); // Converts 0 to 12 for 12 AM
        return `${formattedHour}:${minute} ${amPm}`;
    }

    return (
        <div className="parentContainer">
            {showDetails && (
                <section className="counter">
                    <h1 className="eventName">{eventName || "No Event Selected"}</h1>
                    <p className="eventDateTime">{`${formatDate(eventDate)} at ${formatTime(eventTime)}`}</p>
                    <div className="timeLeft">
                        {isFinished ? (
                            <span>The event time has been reached!</span>
                        ) : (
                            <>
                                Time Left:<br/>
                                {timeLeft.weeks_left > 0 && <span>{timeLeft.weeks_left} weeks </span>}
                                {timeLeft.days_left > 0 && <span>{timeLeft.days_left} days </span>}
                                {timeLeft.hours_left > 0 && <span>{timeLeft.hours_left} hours </span>}
                                {timeLeft.minutes_left > 0 && <span>{timeLeft.minutes_left} minutes </span>}
                                {timeLeft.seconds_left > 0 && <span>{timeLeft.seconds_left} seconds </span>}
                            </>
                        )}
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
