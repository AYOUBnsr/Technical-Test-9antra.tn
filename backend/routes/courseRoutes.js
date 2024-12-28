const express = require("express");
const multer = require("multer");
const Course = require("../models/course");

const router = express.Router();

// file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// CREATE a course
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const course = new Course({
            title: req.body.title,
            price: req.body.price,
            image: req.file ? req.file.path : null,
        });
        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ all courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a course
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                price: req.body.price,
                image: req.file ? req.file.path : req.body.image,
            },
            { new: true }
        );
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a course
router.delete("/:id", async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
