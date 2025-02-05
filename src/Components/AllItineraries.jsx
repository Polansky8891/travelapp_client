import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItineraries } from '../redux/actions/itineraryActions';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utilities/firebase';


function AllItineraries({ itineraries, loading, error, fetchItineraries }) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

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

  // Mostrar todos los itinerarios sin filtrar por país
  const allItineraries = localItineraries && Array.isArray(localItineraries) ? localItineraries : [];

  // Renderizar loading, error o itinerarios
  if (loading) return <p>Loading itineraries...</p>;
  if (error) return <p>Error fetching itineraries: {error}</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>All Itineraries</h2>

      {allItineraries.length > 0 ? (
        <div style={styles.gridContainer}>
          {allItineraries.map((itinerary, index) => (
            <div key={index} style={styles.card}>
              <img
                src={itinerary.imageUrl}
                alt={itinerary.name}
                style={styles.image}
                onError={(e) => e.target.style.display = 'none'}
              />
              <div style={styles.cardContent}>
                <h3>{itinerary.name}</h3>
                <p><strong>Country:</strong> {itinerary.country}</p>
                <p><strong>City:</strong> {Array.isArray(itinerary.city) ? itinerary.city.join(", ") : itinerary.city}</p>
                <p><strong>Days:</strong> {itinerary.days}</p>
                <p><strong>Type:</strong> {itinerary.type}</p>
                <p><strong>Difficulty:</strong> {itinerary.difficulty}</p>
                <p><strong>Price:</strong> ${itinerary.price}</p>

                {/* Botón para eliminar itinerario */}
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <button onClick={() => handleDelete(itinerary._id)} style={styles.deleteButton}>
                    🗑 Delete Itinerary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: "18px" }}>No itineraries available.</p>
      )}

      {/* Botón para añadir un nuevo itinerario SIEMPRE visible */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {user && (
          <button onClick={() => navigate("/additinerary")} style={styles.addButton}>
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

    



export default AllItineraries;