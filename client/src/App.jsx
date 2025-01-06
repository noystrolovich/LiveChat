import Login from'./Login'
import Messenger from './Messenger'
import Register from './register'
import{Routes, Route} from 'react-router-dom';


function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/chat" element={<Messenger/>} />
    </Routes>
    </>
  )
}

export default App
