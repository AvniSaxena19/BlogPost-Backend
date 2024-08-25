const mongoose = require("mongoose");
const { type } = require("os");
const { title } = require("process");
const Schema = mongoose.Schema;

const blogpost = new Schema(
  {
    title: { type: String, require: true },
    summery: { type: String, require: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", blogpost, "blogposts");
// for (let i = 1; i <= 20; i++) {
//     const newBlog = new BlogPost({
//         title: `title ${i}`,
//         summery: `summary ${i}`,
//         content: `content ${i}`,
//         author: `Author ${i}`
//     })
//     //save the blog post to the database
//     newBlog.save()
//         .then((result) => {
//             console.log(`saving the blog post${i}  `)
//             // console.log(result)
//         })
//         .catch((err) => {
//             console.log("error saving the blog post")
//             console.log(err)
//         })
// }

module.exports = BlogPost;
