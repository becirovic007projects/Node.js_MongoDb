const Blog = require("../models/blog");

//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res
      .render("blogs/details", { imeObicno: result, title: "Blog Details" })
      .catch((err) => {
        console.log(err);
      });
  });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "kreiraj" });
};

const blog_create_post = (req, res) => {
  // console.log(req.body);
  const slucaj = new Blog(req.body);
  slucaj
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: "/blogs" }).catch((err) => {
      console.log(err);
    });
  });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
