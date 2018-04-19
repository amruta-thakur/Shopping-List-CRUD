// Importing Modules

var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
const route = require("./route/routes");

var app = express();



//Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/shoppinglist");

//On Connection
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected to port 27017");
});

//on connection Error
mongoose.connection.on("error", (err) => {
  console.log(err);
});
 
const PORT = 3000;

//adding middlewares - cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//Divert all the routing to route.js file
app.use('/api', route); 

app.get("/", (req, res) => {
  res.send("foobar");
});

app.listen(PORT, () => {
  console.log("Server has been started at: " + PORT);
});
