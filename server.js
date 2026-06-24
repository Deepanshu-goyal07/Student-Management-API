const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use(express.static("public"));
app.use(studentRoutes);

app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});

// http://localhost:3000/add.html
// http://localhost:3000/students
// http://localhost:3000/update.html
// http://localhost:3000/delete.html
