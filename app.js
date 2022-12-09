const express = require("express");
const morgan = require("morgan");
const { result } = require("lodash");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const Blog = require("./models/blog");

const app = express();

//connecting to MongoDataBase.
const dataBaseLink =
  "mongodb+srv://agent:test@cluster01.ilk5lnc.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dataBaseLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    console.log("konektovano na mongo data base server.");
  })
  .catch((error) => {
    console.log(error);
  });

//registracija view engina. Welcome.
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;

  //res.status(404).render("404", { title: "error" });
  // console.log("GRESKA");
  // console.log("koji je host?", req.hostname, req.path, req.method);
  next();
});

//routes

app.get("/", (req, res) => {
  res.redirect("/blogs");

  // const blogs = [
  //   {
  //     title: "Jesen u mom sokaku",
  //     snippet: "lorem ipsum ipsumarum ipsiparius. ",
  //   },
  //   {
  //     title: "Danas brzo prolazi",
  //     snippet:
  //       "Ipsurim surem lorem dorem epsum expesorius expecare. lorem ipsum ipsumarum ipsiparius. lorem ipsum ipsumarum ipsiparius.",
  //   },
  // ];

  res.render("index", { title: "home", blogs: blogs });
  console.log("poslano index ejss");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
  console.log("poslato about");
});

// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
//   console.log("redirektovano ali opet je about");
// });

app.get("/add-blog", (req, res) => {
  const instance = new Blog({
    title: "Ultraliberalizam",
    snippet: "liberate libertius no mone est.",
    body: "orlen deventius vinicius.",
  });

  instance
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("634fcd9a7c6e057b7a28200d")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//blog routes
app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
