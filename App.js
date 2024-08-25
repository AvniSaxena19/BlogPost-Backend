const express = require('express');
const app = express();
const port = 3099;
const mongoose = require('mongoose');
const BlogPost = require('./models/blogModel');


const cors=require('cors')
app.use(cors());

const USER_NAME = "avni";
const PASSWORD = "JBmR7KMiVtGrY4y9";
const DB_NAME = "merndb";

const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.cgkee.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=merncluster`

const promObj = mongoose.connect(dbURI);
promObj.then((result) => {
    app.listen(port, (req, res) => {
        console.log(`Server is listen on port no.: ${port}`);
    });
})
    .catch((error) => {
        console.log("Failed to connect to database", error);
        process.exit(1);
    })

app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/blogs', (req, res) => {
    BlogPost.find().sort({ _id: -1 })
        .then((blogs) => {
            res.send(blogs);
        })
        .catch((error) => {
            res.status(404).send("Error");
        })
});

app.get('/blogs/id/:id', (req, res) => {
    const blog = req.params.id;
    BlogPost.findById(blog)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(404).send("Can not find with this id");
        })
});

app.use(express.json());
app.post('/blogs', (req, res) => {
    const blog = req.body;
    BlogPost.create(blog)
        .then((blog) => {
            res.send("New blog added");
        })
        .catch((error) => {
            res.status(404).send(error);
        })
});

app.delete('/blogs/id/:id', (req, res) => {
    const blog = req.params.id; 
    BlogPost.findByIdAndDelete(blog)
    .then((result)=>{
        res.send("Blog Delete Successfully");
    })
    .catch((error)=>{
        res.send(404).send(error);
    })
});