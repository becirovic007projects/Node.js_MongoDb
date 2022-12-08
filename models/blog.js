const mongoose = require("mongoose");

// -> declaring Schema into variable.
const Sema = mongoose.Schema;

const blogSchema = new Sema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// -> creating "Blog" model based on Schema variable.
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
