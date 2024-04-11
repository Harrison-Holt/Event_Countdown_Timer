import React from 'react'; 

function Header() {
    return (
        <header style={Header_Style}>
            <h1>Event Countdown Timer</h1>
            <a href="https://personal-blog-website-kappa.vercel.app/" style="font-size:24px;">Home Page</a>
        </header>
    ); 
}

const Header_Style = {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: '15px', 
    width: '100%', 
    position: 'sticky', 
    zIndex: 1000, 
    margin: '0', 
    top: '0', 
    left: '0',
    backgroundColor: '#4a76a8', 
    color: 'white',
    textDecoration: 'none'

}

export default Header; 
