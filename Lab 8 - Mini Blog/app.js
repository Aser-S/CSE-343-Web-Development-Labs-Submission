import express from 'express';

const app = express();
app.use(express.json());

let posts = [
    { id: 1, title: "First Post", content: "This is the first post." },
    { id: 2, title: "Second Post", content: "This is the second post." },
    { id: 3, title: "Third Post", content: "This is the third post." }
];


app.get("/posts/", (req, res) => {
        res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(pArray => pArray.id === postId);

    if(post){
        res.json(post);
    }
    else{
        res.json({ message: "Post not found" });
    }
});


app.post("/posts/create", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);

    res.json(posts);
});


app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000/');
});




// getPostDetails -> /posts/postId/
// createNewPost -> /posts/new/