import express from "express";
import Courses from "../Models/coursesSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const courses = await Courses.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses" });
    }   
});

router.post("/create", async (req, res) => {
    try {
        const newCourse = new Courses({
            title: req.body.title,
            description: req.body.description,
            instructorName: req.body.instructorName,
            price: req.body.price,
            category: req.body.category
        });
        await newCourse.save();
        res.json(newCourse);
    } catch (error) {
        res.status(500).json({ message: "Error creating course" });
    }
});

// Update price of a course by title -> Typically what Patch does
router.put("/update", async (req, res) => {
    try {
        const updatedCourse = await Courses.updateOne({title: req.query.title}, {$set: {price: req.body.price}});
        res.json(updatedCourse);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating course" });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        await Courses.findOneAndDelete({ title: req.query.title });
        res.json({ message: "Course deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting course" });
    }
});


export default router;