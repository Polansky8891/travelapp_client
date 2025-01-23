export const FETCH_ITINERARIES_REQUEST = 'FETCH_ITINERARIES_REQUEST';
export const FETCH_ITINERARIES_SUCCESS = 'FETCH_ITINERARIES_SUCCESS';
export const FETCH_ITINERARIES_FAILURE = 'FETCH_ITINERARIES_FAILURE';

//sync actions

export const fetchItinerariesRequest = () => ({ type: FETCH_ITINERARIES_REQUEST});
export const fetchItinerariesSuccess = (itineraries) => ({ type: FETCH_ITINERARIES_SUCCESS, payload: itineraries});
export const fetchItinerariesFailure = (error) => ({ type: FETCH_ITINERARIES_FAILURE, payload: error});

//asycn action with fetch
export const fetchItineraries = () => async (dispatch) => {
    dispatch(fetchItinerariesRequest());
    try {
        const response = await fetch('http://localhost:5000/itineraries/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch itineraries');
        }
        const itineraries = await response.json();
        dispatch(fetchItinerariesSuccess(itineraries));
    } catch (error) {
        dispatch(fetchItinerariesFailure(error.message));
    }
}