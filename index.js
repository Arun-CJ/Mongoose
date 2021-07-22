const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/usermodel");
const Posts = require("./models/posts");

mongoose
  .connect("mongodb://localhost:27017/nodemongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("something went wrong", err);
  });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.post("/adduser", (req, res) => {
  const userdata = req.body;
  console.log(req.body);
  const data = new User(userdata);
  data
    .save()
    .then((data) => {
      res.send({ message: "User added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Failed to insert in db" });
    });
});

app.post("/addposts", (req, res) => {
  const postdata = req.body;
  const data = new Posts(postdata);
  data
    .save()
    .then((data) => {
      res.send({ message: "Post saved successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Failed to insert in db" });
    });
});

app.get("/getallposts", (req, res) => {
  Posts.find({})
    .populate({
      path: "userId",
      model: "users",
      select: "name",
    })
    .then((data) => {
      res.send({ message: "posts data retrieved successfully", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Failed to insert in db" });
    });
});

app.get("/getallusers", (req, res) => {
  User.find({})
    .sort({ age: -1 })
    .then((data) => {
      res.send({ message: "user data retrieved successfully", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Failed to insert in db" });
    });
});

app.get("/getuser/:id", (req, res) => {
  const userId = req.params.id;
  User.findById({ _id: userId })
    .then((data) => {
      res.send({ message: "user data retrieved successfully", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Failed to insert in db" });
    });
});

app.put("/updateuser", (req, res) => {
  // const userId = req.params.id;
  const data = req.body;
  User.findOneAndUpdate({ _id: data.userId }, { age: data.age }, { new: true })
    .then((data) => {
      res.send({ message: "user data updated successfully", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Failed to update in db" });
    });
});

app.delete("/deleteuser", (req, res) => {
  // const userId = req.params.id;
  const data = req.body;
  User.findByIdAndRemove({ _id: data.userId })
    .then((data) => {
      res.send({ message: "user data deleted successfully", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Failed to delete in db" });
    });
});

app.get("/", (req, res) => {
  res.send({ message: "connected" });
});

app.listen(6666, () => {
  console.log("server is running in port 6666");
});
