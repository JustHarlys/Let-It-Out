import '../App.css'



function Walls(props) {


  const reversedEntries = [...props.wallsEntries].reverse()

  return (
    <main className='walls' > 
        {reversedEntries.map(entry => (
            <div key={entry.id} className='walls-container' id={props.darkMode ? 'darkWalls' : 'lightWalls'}>

            <div className='user-date'>

            <p className='walls-user' style={{color: props.darkMode ? '#181cf1' : 'rgba(59, 91, 206, 0.829)'}}>{entry.id}</p>
            <p className='date'>{entry.date}</p>
            </div>
            <p className='walls-text'>{entry.message}</p>
            </div>
        ))}
    </main>
  )
               
}

export default Walls