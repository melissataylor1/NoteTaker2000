//dependencies
const express = require("express");
const path = require("path");
const api = require("./lib/delete.js");
const PORT = process.env.PORT || 3001;
const app = express();

//middleware for accessibility 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 


// indexhtml GETroute 
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//noteshtml GETroute
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);




//API Routing

app.post('/api/notes', (req, res) => {
  console.log(req.body);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
  
// return and parse
      const oldNotes = JSON.parse(data);
      oldNotes.push({
        title:req.body.title,
        text:req.body.text, 
        id:uuidv4()
      });
    fs.writeFile('db/db.json', JSON.stringify(oldNotes, null, 4), (err)=>{
      if (err) throw err; 
      res.json(oldNotes);
    })
    });
});

// trying to add delete
app.delete('/api/notes/:id', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let newNotes = notes.filter(note => note.id !== req.params.id);
  fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
  res.send('Note deleted!');
});

//app listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);