const express = require("express");
const fs = require("fs");
const path = require("path");
const os = require("os");
const router = express.Router();

const templatePath = path.join(__dirname, "../data.json");
const filePath = path.join(os.tmpdir(), "student_data.json");

// Read Data
function getStudents() {
    try {
        if (!fs.existsSync(filePath)) {
            const data = fs.readFileSync(templatePath, "utf8");
            fs.writeFileSync(filePath, data);
        }
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading students data from temp:", error);
        try {
            const data = fs.readFileSync(templatePath, "utf8");
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }
}

// Save Data
function saveStudents(students) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
    } catch (error) {
        console.error("Error saving students data to temp file:", error);
    }
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