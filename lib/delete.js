
notes.delete('/:id', (req, res) => {
    // Deconstruct the response body to get the id
    const id = req.params.id; 
    console.log('from notes.js: ' + id);
    if ( id ) {
        readAndDelete('./db/db.json', id);
        res.send(`Successfully deleted the note with the id: ${id}`);
    } else {
        res.status(404).send('ID not found')
    }
})



module.exports = notes;
