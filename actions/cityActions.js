export const FETCH_CITIES_REQUEST = "FETCH_CITIES_REQUEST";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FETCH_CITIES_FAILURE = "FETCH_CITIES_FAILURE";

// Sync actions
export const fetchCitiesRequest = () => ({ type: FETCH_CITIES_REQUEST });
export const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: cities,
});
export const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: error,
});

// Async action with fetch
export const fetchCities = () => async (dispatch) => {
  dispatch(fetchCitiesRequest());
  try {
    const response = await fetch("http://localhost:5000/cities/all");
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    const cities = await response.json();
    dispatch(fetchCitiesSuccess(cities));
  } catch (error) {
    dispatch(fetchCitiesFailure(error.message));
  }
};
