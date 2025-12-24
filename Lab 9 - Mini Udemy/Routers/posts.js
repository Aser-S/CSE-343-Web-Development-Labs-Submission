import express from "express";
import Posts from "../Models/postsSchema.js";

const router = express.Router();

let posts = [
    { id: 1, title: "First Post", content: "This is the first post." },
    { id: 2, title: "Second Post", content: "This is the second post." },
    { id: 3, title: "Third Post", content: "This is the third post." }
];


router.get("/", (req, res) => {
        res.json(posts);
});

router.get("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(pArray => pArray.id === postId);

    if(post){
        res.json(post);
    }
    else{
        res.json({ message: "Post not found" });
    }
});


router.post("/create", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);

    res.json(posts);
});


export default router;