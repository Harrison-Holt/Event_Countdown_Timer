import React from 'react'; 

function Footer() {
    return (
        <footer style={Footer_Style}>
            <p>Last Updated on March 18, 2024</p>
        </footer>
    ); 
}


const Footer_Style = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#4a76a8',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
}
export default Footer; 

