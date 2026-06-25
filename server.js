const express = require("express");
const path = require("path");
const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));
app.use(studentRoutes);

// Export app for Vercel serverless environment
module.exports = app;

// Start the server locally only if executed directly
if (require.main === module) {
    app.listen(3000, () => {
        console.log("Server Running On Port 3000");
    });
}

// http://localhost:3000/add.html
// http://localhost:3000/students
// http://localhost:3000/update.html
// http://localhost:3000/delete.html
