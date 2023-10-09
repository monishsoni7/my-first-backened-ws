const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { log } = require("console");

mongoose
  .connect("mongodb://127.0.0.1:27017/contactdance", { useNewUrlParser: true, serverSelectionTimeoutMS :3000 })
  .then(() => console.log("Connnected to mongo successfully"))
  .catch((err) => console.error({ err:err.reason }));

const port = 3000;

var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
});

var contact = mongoose.model("contact", contactSchema);

app.use("/static", express.static("static"));
app.use(express.urlencoded());

app.set("view-engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});
app.post("/contact", (req, res) => {
  var mydata = new contact(req.body);
  mydata
    .save()
    .then(() => {
      res.json([{ message: "This item has been saved" }]);
    })
    .catch((err) => {
      res.status(400).send(err.msg);
    });

  // res.status(200).render('contact.pug',params);
});

app.listen(port, () => {
  console.log(`The application is started successfully on port ${port}`);
});
