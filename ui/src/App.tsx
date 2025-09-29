import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import './App.css'

function App() {
 //const [isAuthed, setIsAuthed] = useState(false);
  return (
    <>
      <Navbar isAuthed={false} initials=""/>
      <LoginPage/>
    </>
  )
}

export default App
