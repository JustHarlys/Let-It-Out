/* eslint-disable react/prop-types */
import '../App.css'
import { DarkModeContext } from '../Context/DarkModeToggle';
import { useContext } from 'react';


function Walls(props) {

  const {darkMode} = useContext(DarkModeContext)

  const reversedEntries = [...props.wallsEntries].reverse()

  return (
    <main className='walls' > 
        {reversedEntries.map(entry => (
            <div key={entry.id} className='walls-container' id={darkMode ? 'darkWalls' : 'lightWalls'}>

            <div className='user-date'>

            <p className='walls-user' style={{color: darkMode ? '#181cf1' : 'rgba(59, 91, 206, 0.829)'}}>{entry.id}</p>
            <p className='date'>{entry.date}</p>
            </div>
            <p className='walls-text'>{entry.message}</p>
            </div>
        ))}
    </main>
  )
               
}

export default Walls