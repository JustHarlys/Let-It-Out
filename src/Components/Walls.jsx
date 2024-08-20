import '../App.css'

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const day = now.getDate()

const fullDate = `${month}/${day}/${year}`

function Walls(props) {
  const reversedEntries = [...props.wallsEntries].reverse()

  return (
    <main className='walls' > 
        {reversedEntries.map(entry => (
            <div key={entry.id} className='walls-container' id={props.darkMode ? 'darkWalls' : 'lightWalls'}>

            <div className='user-date'>

            <p className='walls-user' style={{color: props.darkMode ? '#181cf1' : 'rgba(59, 91, 206, 0.829)'}}>{entry.id}</p>
            <p className='date'>{fullDate}</p>
            </div>
            <p className='walls-text'>{entry.message}</p>
            </div>
        ))}
    </main>
  )
               
}

export default Walls