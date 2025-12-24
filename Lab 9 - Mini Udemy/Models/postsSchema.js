import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    name: String,
    content: String
});

export default mongoose.model("posts", postsSchema);