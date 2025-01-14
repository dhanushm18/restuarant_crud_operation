import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch all restaurants
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restuarant-crud-operation-2.onrender.com/api/restaurants");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        toast.error("Failed to fetch restaurants.", { position: "top-right" });
      }
    };

    fetchData();
  }, []);

  // Delete a restaurant
  const deleteRestaurant = async (restaurantId) => {
    try {
      const response = await axios.delete(
        `https://restuarant-crud-operation-2.onrender.com/api/restaurants/${restaurantId}`
      );
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant._id !== restaurantId)
      );
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      toast.error("Failed to delete restaurant.", { position: "top-right" });
    }
  };

  // Styles
  const styles = {
    container: {
      margin: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      fontSize: "2rem",
      color: "#333",
    },
    addButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      textDecoration: "none",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
    },
    addButtonHover: {
      backgroundColor: "#45a049",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#f9f9f9",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    thead: {
      backgroundColor: "#333",
      color: "#fff",
    },
    th: {
      padding: "15px",
      textAlign: "left",
    },
    td: {
      padding: "15px",
    },
    evenRow: {
      backgroundColor: "#f2f2f2",
    },
    hoverRow: {
      backgroundColor: "#ddd",
    },
    actions: {
      display: "flex",
      gap: "10px",
    },
    deleteButton: {
      backgroundColor: "#f44336",
      color: "white",
      padding: "8px 15px",
      borderRadius: "5px",
      fontSize: "0.9rem",
      cursor: "pointer",
      border: "none",
    },
    deleteButtonHover: {
      backgroundColor: "#e53935",
    },
    editButton: {
      backgroundColor: "#ff9800",
      color: "white",
      padding: "8px 15px",
      borderRadius: "5px",
      fontSize: "0.9rem",
      textDecoration: "none",
      border: "none",
    },
    editButtonHover: {
      backgroundColor: "#fb8c00",
    },
    noData: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#777",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Restaurant List</h2>
        <Link
          to="/add"
          style={styles.addButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.addButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.addButton.backgroundColor)}
        >
          Add Restaurant
        </Link>
      </div>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>S.No.</th>
            <th style={styles.th}>Restaurant Name</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Top Food</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <tr
                key={restaurant._id}
                style={index % 2 === 0 ? styles.evenRow : null}
              >
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{restaurant.name}</td>
                <td style={styles.td}>{restaurant.type}</td>
                <td style={styles.td}>{restaurant.location}</td>
                <td style={styles.td}>{restaurant.rating}</td>
                <td style={styles.td}>{restaurant.top_food}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      style={styles.deleteButton}
                      onMouseOver={(e) => (e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
                      onMouseOut={(e) => (e.target.style.backgroundColor = styles.deleteButton.backgroundColor)}
                      onClick={() => deleteRestaurant(restaurant._id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit/${restaurant._id}`}
                      style={styles.editButton}
                      onMouseOver={(e) => (e.target.style.backgroundColor = styles.editButtonHover.backgroundColor)}
                      onMouseOut={(e) => (e.target.style.backgroundColor = styles.editButton.backgroundColor)}
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={styles.noData}>
                No restaurants found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Restaurant;
