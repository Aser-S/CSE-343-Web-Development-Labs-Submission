import express from 'express';
import mongoose from "mongoose";
import postRouter from './Routers/posts.js';
import CoursesRouter from './Routers/courses.js';

const app = express();

app.use(express.json());
app.use('/post', postRouter);
app.use('/courses', CoursesRouter);

await mongoose.connect('mongodb://localhost:27017/Posts');


app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000/');
});




// getPostDetails -> /posts/postId/
// createNewPost -> /posts/new/