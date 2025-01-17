import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditRestaurant = () => {
  const defaultRestaurant = {
    name: "",
    type: "",
    location: "",
    rating: "",
    top_food: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(defaultRestaurant);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`https://restuarant-crud-operation-2.onrender.com/api/restaurants/${id}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://restuarant-crud-operation-2.onrender.com/api/restaurants/${id}`, restaurant)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <style>{`
        .container {
          background-color: #f7f8fa;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 900px;
          margin: 40px auto;
          background-image: url('https://www.transparenttextures.com/patterns/greytile.png');
          background-size: cover;
        }

        h3 {
          text-align: center;
          font-family: 'Arial', sans-serif;
          font-size: 2.5rem;
          font-weight: bold;
          color: #2a2a2a;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .btn-secondary {
          font-size: 1.1rem;
          background-color: #6c757d;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          color: white;
          text-decoration: none;
          margin-bottom: 30px;
          display: inline-block;
        }

        .btn-secondary:hover {
          background-color: #5a6268;
        }

        .form-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          display: inline-block;
        }

        .form-control {
          border-radius: 8px;
          padding: 12px 15px;
          font-size: 1rem;
          background-color: #fff;
          border: 1px solid #d1d1d1;
          box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          transition: all 0.3s ease-in-out;
        }

        .form-control:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        .btn-primary {
          font-size: 1.2rem;
          padding: 12px 20px;
          border-radius: 8px;
          background-color: #28a745;
          color: white;
          border: none;
          cursor: pointer;
          display: block;
          width: 100%;
          transition: all 0.3s ease-in-out;
        }

        .btn-primary:hover {
          background-color: #218838;
        }

        .mb-3 {
          margin-bottom: 2rem;
        }

        input::placeholder {
          color: #888;
        }

        input[type='text'], input[type='number'] {
          background-color: #f8f9fa;
          border: 1px solid #ddd;
        }

        input {
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .container {
            padding: 25px;
            margin: 20px;
          }

          h3 {
            font-size: 2rem;
          }

          .form-control {
            padding: 10px;
            font-size: 1rem;
          }
        }
      `}</style>
      <div className="container mt-4">
        <Link to="/" className="btn btn-secondary mb-3">
          Back
        </Link>
        <h3 className="mb-4">Update Restaurant</h3>
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Restaurant Name
            </label>
            <input
              type="text"
              className="form-control"
              value={restaurant.name}
              onChange={inputChangeHandler}
              id="name"
              name="name"
              placeholder="Enter restaurant name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <input
              type="text"
              className="form-control"
              value={restaurant.type}
              onChange={inputChangeHandler}
              id="type"
              name="type"
              placeholder="Type (e.g., Cafe, Dine-In, etc.)"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              value={restaurant.location}
              onChange={inputChangeHandler}
              id="location"
              name="location"
              placeholder="Enter restaurant location"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="number"
              className="form-control"
              value={restaurant.rating}
              onChange={inputChangeHandler}
              id="rating"
              name="rating"
              placeholder="Rating (out of 5)"
              min="1"
              max="5"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="top_food" className="form-label">
              Top Food
            </label>
            <input
              type="text"
              className="form-control"
              value={restaurant.top_food}
              onChange={inputChangeHandler}
              id="top_food"
              name="top_food"
              placeholder="Top Food (e.g., Pizza, Burger, etc.)"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Restaurant
          </button>
        </form>
      </div>
    </>
  );
};

export default EditRestaurant;
