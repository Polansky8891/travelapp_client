import { FETCH_ITINERARIES_REQUEST, FETCH_ITINERARIES_SUCCESS, FETCH_ITINERARIES_FAILURE } from "../actions/itineraryActions";

const initialState = {
    loading: false,
    cities: [],
    error: ''
};

export const itinerariesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITINERARIES_REQUEST:
            return {...state, loading: true, error: ''};
        case FETCH_ITINERARIES_SUCCESS:
            return {...state, loading: false, itineraries: action.payload};
        case FETCH_ITINERARIES_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default itinerariesReducer;