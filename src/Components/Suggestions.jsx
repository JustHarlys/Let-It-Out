import { nanoid } from 'nanoid';
import { useState } from 'react';

function Suggestions(props) {
  const [suggestionSent, setSuggestionSent] = useState(false);
  const [suggestion, setSuggestion] = useState({
    id: props.id,
    suggestion: ''
  });

  function handleSuggestion(event) {
    const { name, value } = event.target;
    setSuggestion(prevSuggestion => ({
      ...prevSuggestion,
      [name]: value
    }));
  }

  async function sendSuggestion(event) {
    event.preventDefault();
    setSuggestionSent(true); 
    try {
      const res = await fetch('https://let-it-out-production.up.railway.app/saveSuggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suggestion)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.text();
      console.log(data);

 
      setSuggestion({
        id: nanoid(), 
        suggestion: ''
      });
    } catch (err) {
      console.log('Error during fetch: ', err);
    }
  }

  return (
    <>
      <main className='suggestions' id={props.darkMode ? 'darkHome' : 'lightHome'}>
        <h1 className='home-h1' style={{color: props.darkMode ? 'white' : 'rgba(59, 91, 206, 0.829)'}}>Let It Out</h1>

        <p>You can use this space to submit your suggestions</p>
        <p>Be respectful and get to the point, thanks!</p>

        {suggestionSent ? 'Suggestion Sent!' : 
          <form onSubmit={sendSuggestion}>
            <div className='input-container'>
              <p>What are your suggestions?</p>
              <input
                type="text"
                name='suggestion'
                value={suggestion.suggestion}
                onChange={handleSuggestion}
                className='input'
                required
              />
              <button type='submit' className='home-button'>Submit Suggestion</button>
            </div>
          </form>
        }
      </main>
    </>
  );
}

export default Suggestions;
