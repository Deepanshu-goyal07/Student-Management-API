const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const filePath = path.join(__dirname, "../data.json");


// Read Data
function getStudents() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Save Data
function saveStudents(students) {
    fs.writeFileSync(filePath, JSON.stringify(students));
}

// GET ALL STUDENTS
router.get("/students", (req, res) => {
    const students = getStudents();
    res.json(students);
});

// ADD STUDENT

router.post("/students", (req, res) => {
    const students = getStudents();
    const newStudent = {
        id: Date.now(),
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };

    students.push(newStudent);
    saveStudents(students);
    res.send("Student Added");
});

// UPDATE STUDENT

router.put("/students/:id", (req, res) => {
    const students = getStudents();
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.send("Student Not Found");
    }
    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;
    saveStudents(students);
    res.send("Student Updated");
});

// DELETE STUDENT
router.delete("/students/:id", (req, res) => {
    const students = getStudents();
    const id = Number(req.params.id);
    const filteredStudents =
        students.filter(s => s.id !== id);
    saveStudents(filteredStudents);
    res.send("Student Deleted");
});

module.exports = router;