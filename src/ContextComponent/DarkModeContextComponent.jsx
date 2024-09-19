import Home from '../Components/Home';
import Nav from '../Components/Nav';
import Walls from '../Components/Walls';
import Suggestions from '../Components/Suggestions';
import { nanoid } from 'nanoid';
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../Context/DarkModeToggle';

export function DarkModeContextComponent(){

  const {darkMode} = useContext(DarkModeContext)

  const date = new Date()
  const year = date.getFullYear()
  const day = date.getDate()
  const month = date.getMonth() + 1

  const fullDate = `${month}/${day}/${year}`


  const [windows, setWindows] = useState(true);
  const [wallsEntries, setWallsEntries] = useState([]);
  const [message, setMessage] = useState({
    id: nanoid(),
    message: '',
    date: fullDate
  });
  


  function handleWindowsSuggestions() {
    setWindows(false);
  }

  function handleWindowsHome() {
    setWindows(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMessage(prevMessage => ({
      ...prevMessage,
      [name]: value
    }));
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('darkHome')
    } else {
      document.body.classList.remove('darkHome')
    }
  }, [darkMode])

  useEffect(() => {
    fetch('https://let-it-out-production.up.railway.app/getEntries') 
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok' + res.statusText);
        }
        return res.json();
      })
      .then(data => setWallsEntries(data))
      .catch(err => console.log('Fetch error: ', err));
  }, []);

  return (
    <div className='whole-app' id={darkMode ? 'darkHome' : 'lightHome'}>
      <Nav handleWindowsSuggestions={handleWindowsSuggestions} handleWindowsHome={handleWindowsHome} windows={windows}/>
      {windows ? <Home id={message.id} message={message.message} handleChange={handleChange} messageObj={message}/> : <Suggestions id={message.id}/>}
      {windows && <Walls wallsEntries={wallsEntries} windows={windows}/>}
    </div>
  );
}