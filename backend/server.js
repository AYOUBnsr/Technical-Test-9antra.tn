const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/LandingPage", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Routes
app.use("/api/courses", require("./routes/courseRoutes"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
