/* eslint-disable react/prop-types */
import '../App.css'
import { DarkModeContext } from '../Context/DarkModeToggle';
import { useContext } from 'react';

function Nav({handleWindowsHome, handleWindowsSuggestions, windows}) {

  const {darkMode, toggleDark} = useContext(DarkModeContext) 

  let windowsContrary = !windows
  return (
    <>
        <nav className="nav-container" id={darkMode ? 'darkNav' : 'lightNav'}>
            <h1>Let It Out</h1>
            <ul className='nav-items'>
                <li className='nav-item' onClick={handleWindowsHome} style={
                  darkMode
                  ? {color: windows ? "#181cf1" : "white"}
                  : {color: windows ? "rgba(28, 42, 92, 0.829)" : "white"}
                }>
                  Home
                  </li>
                <li className='nav-item' onClick={handleWindowsSuggestions} style={
                  darkMode
                  ? {color: windowsContrary ? "#181cf1" : "white"}
                  : {color: windowsContrary ? "rgba(28, 42, 92, 0.829)" : "white"}  
                }>Suggestions</li>
                <button id={darkMode ? "darkModeToggle" : "lightModeToggle"} onClick={toggleDark} className='darkModeToggle'>
                  <i  className="fas fa-moon"></i>
                </button>
            </ul>
        </nav>
    </>
  )
}

export default Nav