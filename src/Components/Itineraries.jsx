import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItineraries } from '../redux/actions/itineraryActions';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utilities/firebase';

function ItinerariesList({ itineraries, loading, error, fetchItineraries }) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { countryName } = useParams();

  // Estado local para manejar la lista después de eliminar
  const [localItineraries, setLocalItineraries] = useState(itineraries);

  // fetch data from Redux when the component mounts
  useEffect(() => {
    fetchItineraries();
  }, [fetchItineraries]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this itinerary?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/itineraries/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Filtrar la lista y quitar el itinerario eliminado
        setLocalItineraries(prevItineraries => prevItineraries.filter(itinerary => itinerary._id !== id));

        alert("Itinerary deleted successfully");
      } else {
        const data = await response.json();
        alert("Error deleting itinerary: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to server");
    }
  };

  // Filtrar itinerarios por país
  const filteredItineraries = localItineraries && Array.isArray(localItineraries)
    ? localItineraries.filter(itinerary =>
        itinerary.country &&
        countryName &&
        itinerary.country.trim().toLowerCase() === countryName.trim().toLowerCase()
      )
    : [];

  // Renderizar loading, error o itinerarios
  if (loading) return <p>Loading itineraries...</p>;
  if (error) return <p>Error fetching itineraries: {error}</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
    <h2 style={{ marginBottom: "20px" }}>
      Itinerary for {countryName}
    </h2>

    {filteredItineraries.length > 0 ? (
      <div style={styles.gridContainer}>
        {filteredItineraries.map((itinerary, index) => (
          <div key={index} style={styles.card}>
            <img 
              src={itinerary.imageUrl} 
              alt={itinerary.name} 
              style={styles.image} 
              onError={(e) => e.target.style.display = 'none'} 
            />
            <div style={styles.cardContent}>
              <h3>{itinerary.name}</h3>
              <p><strong>City:</strong> {Array.isArray(itinerary.city) ? itinerary.city.join(", ") : itinerary.city}</p>
              <p><strong>Days:</strong> {itinerary.days}</p>
              <p><strong>Type:</strong> {itinerary.type}</p>
              <p><strong>Difficulty:</strong> {itinerary.difficulty}</p>
              <p><strong>Price:</strong> ${itinerary.price}</p>

              {/* Botón para eliminar itinerario */}
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button  
                  onClick={() => handleDelete(itinerary._id)} 
                  style={styles.deleteButton}
                >
                  🗑 Delete Itinerary
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p style={{ fontSize: "18px" }}>No itineraries available for {countryName}.</p>
    )}

    {/* 🔵 Botón para añadir un nuevo itinerario SIEMPRE visible */}
    <div style={{ textAlign: "center", marginTop: "10px" }}>
    { user && (
      <button  
        onClick={() => navigate("/additinerary")}
        style={styles.addButton}
      >
        ➕ Add Itinerary
      </button>
      )} 
    </div>

    {/* Botón para volver a la lista de ciudades */}
    <div style={{ marginTop: "30px" }}>
      <button onClick={() => navigate("/cities")} style={styles.backButton}>
        ⬅ Back to Cities
      </button>
    </div>
  </div>
);
}


const styles = {
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    width: "300px",
    border: "1px solid #444", 
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.5)", 
    backgroundColor: "#000", 
    textAlign: "center",
    color: "#FFFFFF", 
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "15px",
  },
  cityName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "inherit", 
  },
  text: {
    fontSize: "14px",
    color: "inherit", 
  },
  backButton: {
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#FFD700", 
    color: "#000", 
    transition: "all 0.3s ease",
    '&:hover': {
      backgroundColor: "#FFC107", 
    },
  },
};


// connecting the component to the Redux store
const mapStateToProps = (state) => ({
  itineraries: state.itineraries.itineraries,
  loading: state.itineraries.loading,
  error: state.itineraries.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItineraries: () => dispatch(fetchItineraries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItinerariesList);