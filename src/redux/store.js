import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducers/cityReducers';
import itinerariesReducer from './reducers/itinerariesReducers';


const store = configureStore({
    reducer: {
        cities: citiesReducer,
        itineraries: itinerariesReducer
    }
});


export default store;