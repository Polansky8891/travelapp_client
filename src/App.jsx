import './App.css'
import { Landing } from './Components/Landing'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Components/Register';
import { colors, Container } from '@mui/material';



function App() {
  

  return (
    
    <Container sx={{ bgcolor: "white", height:"100vh"}}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </Container>
  )
}

export default App
