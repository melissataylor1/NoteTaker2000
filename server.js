//dependencies
const express = require("express");
const path = require("path");
const api = require("./lib/index.js");
const PORT = process.env.PORT || 3001;
const app = express();

//middleware for accessibility 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

//HTML GET ROUTES

// indexhtml GETroute 
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//noteshtml GETroute
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

