import React from 'react';
import './Header.css';
import logo from './assets/LogoBridge.png'; 

const Header = () => (
    <header className="header">
        <div className="container">
            <img className="logo" src={logo} alt="Logo" />
        </div>
    </header>
);

export default Header;
