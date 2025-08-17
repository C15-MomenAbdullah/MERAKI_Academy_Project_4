require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Server is running");
});
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);
const propertyRoutes = require("./routes/properties");
app.use("/properties", propertyRoutes);

app.use("*", (req, res) => res.status(404).json("NO content at this path"));


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
