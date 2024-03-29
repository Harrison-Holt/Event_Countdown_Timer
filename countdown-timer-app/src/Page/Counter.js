import React, { useState, useEffect } from 'react';
import timerLogic from '../Logic/Timer_Logic';

function Timer() {
    const { calculateTimeLeft, handleSubmit } = timerLogic;

    const [eventDetails, setEventDetails] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventEnded: false,
    });

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Corrected: Load saved data from localStorage using the right keys and setting them in eventDetails
        const savedEventName = localStorage.getItem('event_name');
        const savedEventDate = localStorage.getItem('event_date');
        const savedEventTime = localStorage.getItem('event_time');
        const savedEventEnded = localStorage.getItem('event_ended') === 'true';

        setEventDetails({
            eventName: savedEventName || '',
            eventDate: savedEventDate || '',
            eventTime: savedEventTime || '',
            eventEnded: savedEventEnded,
        });
    }, []);

    useEffect(() => {
        // Corrected: Save to localStorage using eventDetails values
        localStorage.setItem('event_name', eventDetails.eventName);
        localStorage.setItem('event_date', eventDetails.eventDate);
        localStorage.setItem('event_time', eventDetails.eventTime);
        localStorage.setItem('event_ended', eventDetails.eventEnded.toString());
    }, [eventDetails]);

    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        // Corrected: Use eventDetails values for the calculation
        const fullDateTime = `${eventDetails.eventDate}T${eventDetails.eventTime}`;
        const timer = setTimeout(() => {
            const newTimeLeft = calculateTimeLeft(fullDateTime);
            setTimeLeft(newTimeLeft);

            // Auto-update eventEnded based on newTimeLeft
            const hasEventEnded = Object.keys(newTimeLeft).length === 0 || new Date(fullDateTime) <= new Date();
            setEventDetails(prev => ({ ...prev, eventEnded: hasEventEnded }));
        }, 1000);

        return () => clearTimeout(timer);
    }, [eventDetails, calculateTimeLeft]);

    const handleEventNameChange = (e) => {
        setEventDetails(prev => ({ ...prev, eventName: e.target.value }));
    };

    const handleEventDateChange = (e) => {
        setEventDetails(prev => ({ ...prev, eventDate: e.target.value }));
    };

    const handleEventTimeChange = (e) => {
        setEventDetails(prev => ({ ...prev, eventTime: e.target.value }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit(eventDetails); // Pass eventDetails directly
    };

    const formatTimeComponent = (value, unit) => {
        if (!value && value !== 0) {
            return "00 " + unit + (unit === "second" ? "s" : "");
        }
        const safeValue = value || 0;
        const unitPlural = `${unit}${safeValue !== 1 ? 's' : ''}`;
        return `${safeValue.toString().padStart(2, '0')} ${unitPlural} `;
    };

    // Omitting the styles for brevity

    return (
        <div style={styles.body}>
            <section style={styles.timerContainer}>
                {eventDetails.eventDate ? (
                    <>
                        <span style={styles.counterStyle}>{eventDetails.eventName}</span>
                        {eventDetails.eventEnded ? (
                            <span style={styles.counterStyle}>The event is here!</span>
                        ) : (
                            <span style={styles.counterStyle}>
                                {formatTimeComponent(timeLeft.days, 'day')}
                                {formatTimeComponent(timeLeft.hours, 'hour')}
                                {formatTimeComponent(timeLeft.minutes, 'minute')}
                                {formatTimeComponent(timeLeft.seconds, 'second')}
                            </span>
                        )}
                        <span style={styles.counterStyle}>{eventDetails.eventDate} at {eventDetails.eventTime}</span>
                    </>
                ) : (
                    <span style={styles.counterStyle}>Set an event date and time to start the countdown.</span>
                )}
            </section>
            <section style={styles.formContainer}>
                <form onSubmit={handleFormSubmit} style={{width: '100%'}}>
                    <label htmlFor='event_name' style={styles.label}>Enter Name for the Event: </label>
                    <input type='text' style={styles.input} value={eventDetails.eventName} onChange={handleEventNameChange} required /><br/><br/>
                    <label htmlFor='event_date' style={styles.label}>Enter Event Date: </label>
                    <input type='date' style={styles.input} value={eventDetails.eventDate} onChange={handleEventDateChange} required /><br/><br/>
                    <label htmlFor='event_time' style={styles.label}>Enter Event Time: </label>
                    <input type='time' style={styles.input} value={eventDetails.eventTime} onChange={handleEventTimeChange} required /><br/><br/>
                </form>
            </section>
        </div>
    );
}
 // Styles
 const styles = {
    body: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f0f2f5',
        color: '#333',
        padding: '20px',
    },
    timerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '60vh',
        backgroundColor: '#ffffff',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '80%',
    },
    counterStyle: {
        fontSize: '3em',
        fontWeight: 'bold',
        color: '#4a76a8',
        margin: '10px 0',
        letterSpacing: '1.2px',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        padding: '20px',
        margin: '20px auto 100px', 
        maxWidth: '500px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: 'calc(100% - 22px)',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        display: 'block',
    },
    label: {
        fontWeight: 'bold',
        display: 'block', 
        marginTop: '10px', 
    },
    button: {
        backgroundColor: '#4a76a8',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1em',
        marginTop: '20px', 
    }
};

export default Timer;
