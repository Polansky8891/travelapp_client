import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddCityForm = () => {
  const [formData, setFormData] = useState({ city: "", country: "" });
  const [errors, setErrors] = useState({ city: "", country: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpiar errores cuando el usuario escriba
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { city: "", country: "" };

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      valid = false;
    } else if (formData.city.length < 2) {
      newErrors.city = "City must be at least 2 characters";
      valid = false;
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
      valid = false;
    } else if (formData.country.length < 2) {
      newErrors.country = "Country must be at least 2 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/cities/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.city, // <-- Cambia `city` por `name`
            country: formData.country,
          }),
        });

        const data = await response.json();
        console.log("Response from server:", data);

        if (response.ok) {
          alert("City added successfully!");
          setFormData({ city: "", country: "" }); // Limpiar formulario
        } else {
          alert("Error adding city: " + data.details);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to server");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add a New City</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.city && <p style={styles.error}>{errors.city}</p>}
        </div>

        <div style={styles.inputGroup}>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.country && <p style={styles.error}>{errors.country}</p>}
        </div>

        <button type="submit" style={styles.button}>Add City</button>
      </form>

      {/* 🔵 Botón para volver a la lista de ciudades */}
      <div style={{ marginTop: "30px" }}>
        <button onClick={() => navigate("/cities")} style={styles.backButton}>
          ⬅ Back to Cities
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#09B6EB",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  backButton: {
    padding: "8px",
    width: "100%",
    maxWidth: "250px",
    fontSize: "10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#FFD700",
    color: "#000",
    transition: "all 0.3s ease",
    '&:hover': {
      backgroundColor: "#FFC107",
    },
  },
};

  
  export default AddCityForm;