import './App.css';
import { DarkModeProvider } from './Context/DarkModeToggle';
import { DarkModeContextComponent } from './ContextComponent/DarkModeContextComponent';



function App() {

  return (
    <DarkModeProvider>
      <DarkModeContextComponent />
    </DarkModeProvider>
  )
 
}

export default App;
