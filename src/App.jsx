
import { Landing } from './Components/Landing'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CitiesList from './Components/Cities';
import { colors, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './redux/store';
import ItinerariesList from './Components/Itineraries';
import AddCityForm from './Components/CityFormulari';


function App() {

  
  

  return (
    <Provider store={store}>
    <Container sx={{ bgcolor: "white", height:"100vh"}}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cities" element={<CitiesList />} />
        <Route path="/country/:countryName" element={<ItinerariesList/>} />
        <Route path="/addcity" element={<AddCityForm/>} />
      </Routes>
    </Router>
    </Container>
    </Provider>
  )
}

export default App;
