const app = require("express")();
const quotes = require("./quotes");
const qarr = quotes.quotes;
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
var port = process.env.PORT || 3000;
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose.connect("mongodb://localhost:27017/TheOfficeQuotes");
const password = process.env.PASSWORD;

mongoose.connect(
  "mongodb+srv://aloneMusk:" +
    password +
    "@theofficeapi.if7dr.mongodb.net/?retryWrites=true&w=majority"
);

const quoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
  type: String,
});

const Quotes = mongoose.model("quotes", quoteSchema);

var q_all = [];

Quotes.find({}, (err, items) => {
  q_all = items;
});

app.use(
  cors({
    origin: "*",
  })
);

function addAll(quotes) {
  let all = [];
  Quotes.insertMany(quotes, (err) => {
    if (!err) {
      console.log("ADDED ALL");
    }
  });
}

app.post("/add", (req, res) => {
  let content = { quote: req.body.quote, author: req.body.author };
  if (req.body.type) {
    content = {
      quote: req.body.quote,
      author: req.body.author,
      type: req.body.type,
    };
  }
  console.log(req.body.author);
  Quotes.insertMany([content], (err) => {
    if (!err) {
      Quotes.find({}, (err, items) => {
        console.log(items.length);
      });

      res.send("Added Successsfully!");
    }
  });
});

app.get("/quotes/random", (req, res) => {
  const len = q_all.length;
  let obj = q_all[Math.floor(Math.random() * len)];
  obj = { quote: obj.quote, author: obj.author };

  res.json(obj);
});

app.get("/all", (req, res) => {
  Quotes.find((err, items) => {
    if (!err) res.send(items);
  });
});

app.delete("/delete", (req, res) => {
  const ob = req.body.object;
  console.log(ob);
  Quotes.deleteOne({ _id: ob }, (err) => res.send("Deleted!"));
});

app.get("/quotes/:n", (req, res) => {
  const len = q_all.length;
  var n = req.params.n;

  // let qarr = quotes.quotes;
  console.log(len);

  n = n > len ? len : n;

  var random = Math.floor(Math.random() * len);
  var array = [];
  for (var i = 0; i < n; i++) {
    const obj = q_all[Math.floor(Math.random() * len)];
    if (obj.type) {
      array.push({ quote: obj.quote, author: obj.author, type: obj.type });
    } else {
      array.push({ quote: obj.quote, author: obj.author });
    }
    random = (random + Math.floor(Math.random() * len)) % len;
  }
  res.json(array);
});

app.get("/twss", (req, res) => {
  let arr = q_all.filter((q) => q.type == `That's what she said`);
  arr = arr.map((obj) => {
    return { quote: obj.quote, author: obj.author, type: obj.type };
  });
  res.json(arr);
});

app.listen(port, (req, res) => {
  console.log("The server is running on port 3000");
});
