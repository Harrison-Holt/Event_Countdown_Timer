import React from 'react'; 

function Header() {
    return (
        <header style={Header_Style}>
            <p>My First React App</p>
        </header>
    ); 
}

const Header_Style = {
    padding: '15px', 
    textAlign: 'center', 
    width: '100%', 
    position: 'sticky', 
    zIndex: 1000, 
    margin: '0', 
    top: '0', 
    left: '0',
    backgroundColor: '#4a76a8', 
    color: 'white'
}

export default Header; 
