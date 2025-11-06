const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai_routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/ai", aiRoutes);

// Export app
module.exports = app;




