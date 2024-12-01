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
        const response = await axios.get("http://localhost:8000/api/restaurants");
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
        `http://localhost:8000/api/restaurants/${restaurantId}`
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

  return (
    <div className="restaurantTable">
      <Link to={"/add"} className="btn btn-primary mb-3">
        Add Restaurant
      </Link>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>S.No.</th>
            <th>Restaurant Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Top Food</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <tr key={restaurant._id}>
                <td>{index + 1}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.type}</td>
                <td>{restaurant.location}</td>
                <td>{restaurant.rating}</td>
                <td>{restaurant.top_food}</td>
                <td className="actionButtons">
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => deleteRestaurant(restaurant._id)}
                  >
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                  <Link
                    to={`/edit/${restaurant._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
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
