import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCities } from '../redux/actions/cityActions';
import { Link } from "react-router-dom";
import Itineraries from './Itineraries';
import { useNavigate } from 'react-router-dom';

function CitiesList({ cities, loading, error, fetchCities }) {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // Fetch data from Redux when the component mounts
  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  // Filter cities based on user input
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredCities = filter
    ? cities.filter((city) =>
        city.name.toLowerCase().startsWith(filter)
      )
    : cities; // Show all cities if no filter is applied

  // Render loading, error, or filtered data
  if (loading) return <p>Loading cities...</p>;
  if (error) return <p>Error fetching cities: {error}</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Look for your dream city</h2>

      <div style={{ 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  gap: "10px", 
  marginBottom: "20px" 
}}>
  
  {/* Filter Input */}
  <input
    type="text"
    placeholder="Type a letter..."
    value={filter}
    onChange={handleFilterChange}
    style={{
      padding: "8px",
      width: "100%",
      maxWidth: "250px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  />

  {/* Botón para añadir una nueva ciudad */}
  <button  
    onClick={() => navigate("/addcity")} // Redirige a la página de formulario
    style={{ 
      fontFamily: 'Arial Rounded MT Bold',
      fontWeight: 'bold',
      fontSize: '12px', 
      padding: '8px 12px', 
      backgroundColor: '#09B6EB', 
      color: "white", 
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: 'all 0.2s ease',
    }}
  >
    + Add City
  </button>
</div>

      {/* Cities List */}
      {filteredCities.length > 0 ? (
        <div style={styles.gridContainer}>
          {filteredCities.map((city, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.cityName}>{city.name}</h3>
              <p style={styles.country}>
                Country:{" "}
                <Link 
                  to={`/country/${encodeURIComponent(city.country)}`} 
                  style={styles.link}
                >
                  {city.country}
                </Link>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          No cities match your search.
        </p>
      )};
    </div>
    
    
  );
}

const styles = {
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    justifyContent: "center",
    marginTop: "30px", 
  },
  card: {
    width: "200px",
    padding: "10px",
    backgroundColor: "#000", 
    border: "1px solid #444", 
    borderRadius: "8px",
    boxShadow: "0px 3px 5px rgba(0,0,0,0.5)", 
    textAlign: "center",
  },
  cityName: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#CBF2D4", 
  },
  country: {
    fontSize: "14px",
    color: "#FFF", 
  },
  link: {
    color: "#09B6EB", 
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "color 0.3s ease",
    '&:hover': {
      color: "#BDF048", 
    },
  },
};



// connecting the component to the Redux store
const mapStateToProps = (state) => ({
  cities: state.cities.cities,
  loading: state.cities.loading,
  error: state.cities.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCities: () => dispatch(fetchCities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);


