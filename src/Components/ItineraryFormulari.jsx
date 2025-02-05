import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddItineraryForm = () => {
    const navigate = useNavigate();
  
    const handleBackToCities = () => {
      console.log("Navigating to /cities"); // Depuración
      navigate("/cities");
    };
  
    const [formData, setFormData] = useState({
      name: "",
      imageUrl: "",
      city: "",
      country: "",
      days: "",
      type: "",
      difficulty: "",
      price: "",
    });
  
    const [errors, setErrors] = useState({
      name: "",
      imageUrl: "",
      city: "",
      country: "",
      days: "",
      type: "",
      difficulty: "",
      price: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "city") {
        setFormData({ ...formData, city: value.split(",").map((city) => city.trim()) });
      } else {
        setFormData({ ...formData, [name]: value });
      }
      setErrors({ ...errors, [name]: "" });
    };
  
    const validateForm = () => {
      let valid = true;
      let newErrors = {
        name: "",
        imageUrl: "",
        city: "",
        country: "",
        days: "",
        type: "",
        difficulty: "",
        price: "",
      };
  
      if (!formData.name.trim()) newErrors.name = "Name is required", valid = false;
      if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required", valid = false;
      if (!formData.city.length || formData.city[0] === "") newErrors.city = "At least one city is required", valid = false;
      if (!formData.country.trim()) newErrors.country = "Country is required", valid = false;
      if (!formData.days || isNaN(formData.days) || Number(formData.days) <= 0) newErrors.days = "Days must be a positive number", valid = false;
      if (!formData.type.trim()) newErrors.type = "Type is required", valid = false;
      if (!formData.difficulty || isNaN(formData.difficulty) || formData.difficulty < 1 || formData.difficulty > 5) newErrors.difficulty = "Difficulty must be between 1 and 5", valid = false;
      if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = "Price must be a positive number", valid = false;
  
      setErrors(newErrors);
      return valid;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const itineraryData = {
            ...formData,
            days: Number(formData.days),
            difficulty: Number(formData.difficulty),
            price: Number(formData.price),
          };
  
          const response = await fetch("http://localhost:5000/itineraries/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itineraryData),
          });
  
          const data = await response.json();
          console.log("Response from server:", data);
  
          if (response.ok) {
            alert("Itinerary added successfully");
            setFormData({ name: "", imageUrl: "", city: "", country: "", days: "", type: "", difficulty: "", price: "" });
          } else {
            alert("Error adding itinerary: " + data.details);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to connect to server");
        }
      }
    };
  
    return (
      <div style={styles.container}>
        <h2>Add a new itinerary</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={styles.inputGroup}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type={key === "days" || key === "difficulty" || key === "price" ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={styles.input}
              />
              {errors[key] && <p style={styles.error}>{errors[key]}</p>}
            </div>
          ))}
          <button type="submit" style={styles.button}>Add itinerary</button>
        </form>
        <div style={{ marginTop: "30px" }}>
          <button onClick={handleBackToCities} style={styles.backButton}>
            ⬅ Back to Cities
          </button>
        </div>
      </div>
    );
  };
  
  const styles = {
    container: { maxWidth: "400px", margin: "0 auto", padding: "20px", textAlign: "center", backgroundColor: "#f8f8f8", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
    form: { display: "flex", flexDirection: "column", alignItems: "center" },
    inputGroup: { marginBottom: "15px", width: "100%", textAlign: "left" },
    input: { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" },
    button: { padding: "10px 15px", backgroundColor: "#09B6EB", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "background 0.2s ease" },
    error: { color: "red", fontSize: "12px", marginTop: "5px" },
    backButton: { padding: "6px 12px", fontSize: "10px", cursor: "pointer", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#FFD700", color: "#000", transition: "all 0.3s ease" },
  };
  





export default AddItineraryForm;

