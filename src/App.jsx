import { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Walls from './Components/Walls';
import Suggestions from './Components/Suggestions';
import { nanoid } from 'nanoid';

function App() {
  const [windows, setWindows] = useState(true);
  const [wallsEntries, setWallsEntries] = useState([]);
  const [message, setMessage] = useState({
    id: nanoid(),
    message: ''
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
    fetch('https://let-it-out-production.up.railway.app/getEntries') // Cambia la URL aquí
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
    <>
      <Nav handleWindowsSuggestions={handleWindowsSuggestions} handleWindowsHome={handleWindowsHome} windows={windows} />
      {windows ? <Home id={message.id} message={message.message} handleChange={handleChange} messageObj={message} /> : <Suggestions id={message.id} />}
      {windows && <Walls wallsEntries={wallsEntries} />}
    </>
  );
}

export default App;
