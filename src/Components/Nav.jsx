import '../App.css'

function Nav({handleWindowsHome, handleWindowsSuggestions, windows}) {

  let windowsContrary = !windows
  return (
    <>
        <nav className="nav-container">
            <h1>Let It Out</h1>

            <ul className='nav-items'>
                <li className='nav-item' onClick={handleWindowsHome} style={{color: windows ? "rgba(28, 42, 92, 0.829)" : "white"}}>Home</li>
                <li className='nav-item' onClick={handleWindowsSuggestions} style={{color: windowsContrary ? "rgba(28, 42, 92, 0.829)" : "white"}}>Suggestions</li>
            </ul>
        </nav>
    </>
  )
}

export default Nav