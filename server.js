
const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('./helpers/uuid');

const port = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

function getDBContent() {
  const dbStr = fs.readFileSync('./db/db.json', 'utf8');
  return JSON.parse(dbStr);
}

app.get('/api/notes', (req, res) => {
    const notes = getDBContent();
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
  console.log(req.body);
  let notes = getDBContent() 
    notes.push({
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    });
    fs.writeFile('db/db.json', JSON.stringify(notes, null, 4), (err) => {
      if (err) throw err;
      res.json(notes);
    })
});

app.delete('/api/notes/:id', (req, res) => {
  const noteID = req.params.id;

   let notes = getDBContent()
   
    notes = notes.filter((note) => note.id !== noteID);

    fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    })
});

app.listen(port, () => console.log(`Server started at port ${port}`));