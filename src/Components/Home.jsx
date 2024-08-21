import { nanoid } from 'nanoid';
import '../App.css'

function Home(props) {

  async function sendMessage() {

    try {
      const response = await fetch(`https://let-it-out-production.up.railway.app/saveEntry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props.messageObj)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      
      const data = await response.text();
      console.log(data);
      
      props.handleChange({ target: { name: 'id', value: nanoid() } });
      props.handleChange({ target: { name: 'message', value: '' } });
    } catch (err) {
      console.log('Error during fetch: ', err);
    }
  }

  return (
    <>
      <main className='home' id={props.darkMode ? 'darkHome' : 'lightHome'}>
        <div className='main-text'>
          <h1 className='home-h1' style={{color: props.darkMode ? 'white' : 'rgba(59, 91, 206, 0.829)'}}>Let It Out</h1>
          <p>You can use this platform anonymously to vent out </p>
          <p>No one can, should nor will know who you are</p>
          <p>Beware of sensitive information being shared.</p>
          <p>Each entry your user changes</p>
        </div>

        <form onSubmit={sendMessage}>
          <div className='input-container'>
            <p>What are you going through?</p>

            <input 
              type="text" 
              name="message" 
              value={props.message}
              onChange={props.handleChange}
              className='input'
            />
            <button type="submit" className='home-button'>Click</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default Home;
