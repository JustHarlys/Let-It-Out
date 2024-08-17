import { nanoid } from 'nanoid';
import '../App.css'

function Home(props) {

  async function sendMessage() {


    try {
      const response = await fetch(`http://localhost:3001/saveEntry`, {
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

      handleChange({ target: { name: 'id', value: nanoid()}})
      handleChange({ target: {name: 'message', value: ''}})
    } catch (err) {
      console.log('Error during fetch: ', err);
    }
  }

  return (
    <>
    <main className='home'>
        <div className='main-text'>
        <h1 className='home-h1'>Let It Out</h1>
        <p>You can use this platform anonimally to vent out whatever you need to</p>
        <p>No one can, should nor will know who you  are (unless you tell them which is completely up to you)</p>
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
        />
        <button className='home-button'>Click</button>
        </div>
        </form>
    </main>

    </>
  )
}

export default Home