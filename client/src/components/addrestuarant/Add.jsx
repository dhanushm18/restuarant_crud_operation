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
      const res = await axios.post("https://restuarant-crud-operation-2.onrender.com/api/restaurants", restaurant);
      toast.success(res.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add restaurant!", { position: "top-right" });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f7f8fa",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "900px",
        margin: "40px auto",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/greytile.png')",
        backgroundSize: "cover",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "1.1rem",
          backgroundColor: "#6c757d",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          color: "white",
          textDecoration: "none",
          marginBottom: "30px",
          display: "inline-block",
        }}
      >
        Back
      </Link>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "'Arial', sans-serif",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#2a2a2a",
          marginBottom: "20px",
          textTransform: "uppercase",
        }}
      >
        Add New Restaurant
      </h1>
      <form onSubmit={submitForm}>
        {[
          { id: "name", label: "Restaurant Name", type: "text", placeholder: "Enter restaurant name" },
          { id: "type", label: "Restaurant Type", type: "text", placeholder: "Enter restaurant type" },
          { id: "location", label: "Restaurant Location", type: "text", placeholder: "Enter restaurant location" },
          { id: "rating", label: "Restaurant Rating", type: "number", placeholder: "Enter restaurant rating", min: "1", max: "5" },
          { id: "top_food", label: "Top Food", type: "text", placeholder: "Enter top food" },
        ].map(({ id, label, ...rest }) => (
          <div style={{ marginBottom: "20px" }} key={id}>
            <label
              htmlFor={id}
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "8px",
                display: "inline-block",
              }}
            >
              {label}
            </label>
            <input
              id={id}
              name={id}
              onChange={inputHandler}
              value={restaurant[id]}
              style={{
                borderRadius: "8px",
                padding: "12px 15px",
                fontSize: "1rem",
                backgroundColor: "#fff",
                border: "1px solid #d1d1d1",
                boxShadow: "inset 0px 2px 6px rgba(0, 0, 0, 0.1)",
                width: "100%",
                marginBottom: "20px",
                transition: "all 0.3s ease-in-out",
              }}
              {...rest}
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            fontSize: "1.2rem",
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default Add;
