const calculateTimeLeft = (event_date, event_time) => {
    let current_time = new Date(); 
    let event_full_date_string =  event_date + 'T' + event_time; 
    let event_full_event = new Date(event_full_date_string); 
    let difference = event_full_event - current_time; 

    let seconds_left = Math.floor(difference / 1000);
    let minutes_left = Math.floor(seconds_left / 60); 
    seconds_left = seconds_left % 60; // Remainder seconds after converting to minutes
    let hours_left = Math.floor(minutes_left / 60);
    minutes_left = minutes_left % 60; // Remainder minutes after converting to hours
    let days_left = Math.floor(hours_left / 24);
    hours_left = hours_left % 24; // Remainder hours after converting to days
    let weeks_left = Math.floor(days_left / 7);
    days_left = days_left % 7; // Remainder days after converting to weeks


    const formatted_time_left = {
        seconds_left, 
        minutes_left, 
        hours_left, 
        days_left, 
        weeks_left    
};

    return formatted_time_left; 
}


export {calculateTimeLeft}; 
