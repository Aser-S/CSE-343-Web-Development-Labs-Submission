import mongoose from "mongoose";


const CoursesSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructorName: String,
    price: Number,
    category: String,
    numberOfErolledStudents: {type: Number, default: 0} 
});


export default mongoose.model("Courses", CoursesSchema);