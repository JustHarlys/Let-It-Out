import { nanoid } from 'nanoid'
import React, { useState } from 'react'


function Suggestions(props) {

  const [suggestionSent, setSuggestionSent] = useState(false)
  const [suggestion, setSuggestion] = useState({
    id: props.id,
    suggestion: ''
  })

  function handleSuggestion(event) {
    const {name, value} = event.target
    setSuggestion(prevSuggestion => ({
      ...prevSuggestion,
      [name]: value
    }))
  }

  async function sendSuggestion(event) {
    event.preventDefault()
    setSuggestionSent(prevState => !prevState)
    try {
      const res = await fetch('http://localhost:3001/saveSuggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suggestion)
      })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.text();
      console.log(data)

      handleSuggestion({target : {name: 'id', value: nanoid()}})
      handleSuggestion({target : {name: 'suggestion', value: ''}})
    } catch (err) {
      console.log('Error during fetch: ', err)
    }
  }

  return (
    <>
    <main className='suggestions'>
        <h1 className='home-h1'>Let It Out</h1>

        <p>You can use this space to submit your suggestions to the creator</p>
        <p>Be respectful and get to the point, we will make sure to add your feature asap!</p>

        {suggestionSent ? 'Suggestion Sent!' : 
        <form onSubmit={sendSuggestion}>

        <div className='input-container'>
          
        <p>What are your suggestions?</p>
        <input type="text" name='suggestion' value={suggestion.suggestion} onChange={handleSuggestion} required/>
        <button className='home-button'>Submit Suggestion</button>
        </div>
        </form>
        }


    </main>
    </>
  )
}

export default Suggestions