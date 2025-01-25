import React, { useState } from 'react'

const AddItineraryForm = () => {
    const [formData, setFormData] = useState({ 
        name: "",
        imageUrl: "",
        city: [],
        coountry: "",
        days: "" ,
        type: "",
        difficulty: "",
        price: "",    
    });

    const [errors, setErrors] = useState({
        name: "",
        imageUrl: "",
        city: [],
        country: "",
        days: "" ,
        type: "",
        difficulty: "",
        price: "", 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
        setErrors({ ...errors, [e.target.name]: ""}); // limpiar errores cuando el usuario escribe
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {
        name: "",
        imageUrl: "",
        city: [],
        country: "",
        days: "" ,
        type: "",
        difficulty: "",
        price: "", 
        };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            valid = false;
        } else if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            valid = false;
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = "Image URL is required";
            valid = false;
        } 

        if (formData.city.length === 0 || formData.city[0] === "") {
            newErrors.city = "At least one city is required";
            valid = false;
        }

        if (!formData.countryuntry.trim()) {
            newErrors.country = "Country is required";
            valid = false;
        }

        if (!formData.days || isNaN(formData.days) || Number(formData.days) <= 0) {
            newErrors.days = "Days must be a positive number";
            valid = false;
        }

        if (!formData.type.trim()) {
            newErrors.type = "Type is required";
            valid = false;
        }

        if (!formData.difficulty || isNaN(formData.difficulty) || formData.difficulty < 1 || formData.difficulty > 5) {
            newErrors.difficulty = " Difficulty must be between 1 and 5";
            valid = false;
        }

        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = "Price must be a positive number";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Form submitted:", formData);
            alert("Itinerary added successfully!");
            setFormData({
                name: "",
                imageUrl: "",
                city: [],
                country: "",
                 days: "" ,
                 type: "",
                difficulty: "",
                price: "", 

            });
        }
    };

  return (
    <div style={styles.container}>
        <h2>Add a new itinerary</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
                {errors.name && <p style={styles.error}>{errors.name}</p>}
            </div>

            <div style={styles.inputGroup}>
                <label>Image URL:</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} style={styles.input} />
                {errors.imageUrl && <p style={styles.error}>{errors.imageUrl}</p>}
            </div>

            <div style={styles.inputGroup}>
                <label>City (comma separated):</label>
                <input type="text" name="city" value={formData.city.join(", ")} onChange={handleChange} style={styles.input} />
                {errors.city && <p style={styles.error}>{errors.city}</p>}
            </div>

            <div style={styles.inputGroup}>
                <label>Country:</label>
                <input type="text" name="country" value={formData.country}  onChange={handleChange} style={styles.input} />
                {errors.country && <p style={styles.error}>{errors.type}</p>}
            </div>

            <div style={styles.inputGroup}>
                <label>Days:</label>
                <input type="number" name="days" value={formData.days} onChange={handleChange} style={styles.input} />
                {errors.days && <p style={styles.error}>{errors.days}</p>}
            </div>

            <div style={styles.inputGroup}>
                <label>Type:</label>
                <input type="text" name="type" value={formData.type} onChange={handleChange} style={styles.input} />
                {errors.type && <p style={styles.error}>{errors.type}</p>}
            </div>

            <div style={styles.inputGroup}>
                <label>Difficulty (1-5):</label>
                <input type="number" name="difficulty" value={formData.difficulty} onChange={handleChange} style={styles.input} />
                {errors.difficulty && <p style={styles.error}>{errors.difficulty}</p>}
            </div>

            <div style={styles.inputGroup}>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} style={styles.input} />
                {errors.price && <p style={styles.error}>{errors.price}</p>}
            </div>

            <button type="submit" style={styles.button}>Add itinerary</button>

        </form>
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
  };
  
  export default AddItineraryForm;