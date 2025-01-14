import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const initialRestaurantState = {
    name: "",
    type: "",
    location: "",
    rating: "",
    top_food: "",
  };

  const [restaurant, setRestaurant] = useState(initialRestaurantState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://restuarant-crud-operation-2.onrender.com/api/restaurants",
        restaurant
      );
      toast.success(res.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add restaurant!", { position: "top-right" });
    }
  };

  // Styles
  const styles = {
    container: {
      backgroundColor: "#f7f8fa",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      maxWidth: "900px",
      margin: "40px auto",
      backgroundImage: "url('https://www.transparenttextures.com/patterns/greytile.png')",
      backgroundSize: "cover",
    },
    header: {
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      fontSize: "2.8rem",
      fontWeight: "bold",
      color: "#2a2a2a",
      marginBottom: "20px",
      textTransform: "uppercase",
    },
    backButton: {
      fontSize: "1.1rem",
      backgroundColor: "#6c757d",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      color: "white",
      textDecoration: "none",
      marginBottom: "30px",
      display: "inline-block",
    },
    backButtonHover: {
      backgroundColor: "#5a6268",
    },
    formLabel: {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "#333",
      marginBottom: "8px",
      display: "inline-block",
    },
    formControl: {
      borderRadius: "8px",
      padding: "12px 15px",
      fontSize: "1rem",
      backgroundColor: "#fff",
      border: "1px solid #d1d1d1",
      boxShadow: "inset 0px 2px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
      transition: "all 0.3s ease-in-out",
    },
    formControlFocus: {
      borderColor: "#007bff",
      outline: "none",
      boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
    },
    submitButton: {
      fontSize: "1.2rem",
      padding: "12px 20px",
      borderRadius: "8px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      cursor: "pointer",
      display: "block",
      width: "100%",
      transition: "all 0.3s ease-in-out",
    },
    submitButtonHover: {
      backgroundColor: "#218838",
    },
  };

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backButton}>
        Back
      </Link>
      <h1 style={styles.header}>Add New Restaurant</h1>
      <form onSubmit={submitForm}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name" style={styles.formLabel}>
            Restaurant Name
          </label>
          <input
            type="text"
            style={styles.formControl}
            onChange={inputHandler}
            id="name"
            name="name"
            placeholder="Enter restaurant name"
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="type" style={styles.formLabel}>
            Restaurant Type
          </label>
          <input
            type="text"
            style={styles.formControl}
            onChange={inputHandler}
            id="type"
            name="type"
            placeholder="Enter restaurant type"
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="location" style={styles.formLabel}>
            Restaurant Location
          </label>
          <input
            type="text"
            style={styles.formControl}
            onChange={inputHandler}
            id="location"
            name="location"
            placeholder="Enter restaurant location"
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="rating" style={styles.formLabel}>
            Restaurant Rating
          </label>
          <input
            type="number"
            style={styles.formControl}
            onChange={inputHandler}
            id="rating"
            name="rating"
            placeholder="Enter restaurant rating"
            min="1"
            max="5"
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="top_food" style={styles.formLabel}>
            Top Food
          </label>
          <input
            type="text"
            style={styles.formControl}
            onChange={inputHandler}
            id="top_food"
            name="top_food"
            placeholder="Enter top food"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
          >
            Add Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
