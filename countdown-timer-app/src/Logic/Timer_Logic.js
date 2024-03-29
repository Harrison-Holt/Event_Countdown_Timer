function time_logic() {
    // Function to handle form submission
    const handleSubmit = (form_data) => {
        // Process formData
        console.log(form_data);
    };

    const calculateTimeLeft = (event_date) => {
        let time_left = {}; 
        const difference = +new Date(event_date) - +new Date(); 

        if(difference > 0) {
            time_left = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),        
            }; 
        }
        return time_left; 
    };

    return { handleSubmit, calculateTimeLeft }; // Return an object containing both functions
}

export default time_logic(); // Immediately invoke time_logic to export the object
