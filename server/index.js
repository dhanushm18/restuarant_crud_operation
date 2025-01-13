import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
import router from './routes/restaurantRoutes.js';

// CORS configuration to allow requests from your frontend domain
const allowedOrigins = ['https://restuarant-crud-operation-4.onrender.com', 'http://localhost:3000']; // Frontend URL and localhost for development

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;

const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api", router);
