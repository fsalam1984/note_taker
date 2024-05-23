const express = require("express");
const path = require("path");
const fs = require("fs");
let randomUUID = crypto.randomUUID();
const { v4: uuidv4 } = require('uuid');
// const readAndAppend  = require('../helpers/fsUtils');

// require("v4 as uuidv4")
const app = express();
const id = randomUUID

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {

        if(err) {
            res.send("Sorry, there's an error!")
        } else {
            const notes = JSON.parse(data);
        
            res.json(notes)
        }
    })
})

app.post("/api/notes", (req, res) => {
    // const id = uuidv4();/

    // const newNote = req.body 
    const {title, text, id} = req.body;
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            res.send("Sorry, there's an error!")
        } else  {
            // if(title && text && id){
            const notes = JSON.parse(data);
        
        // If all the required properties are present
      
            
            const newNote = {
                title,
                text,
                id: uuidv4(),
                }
           
            // readAndAppend(newNote, './db/db.json');
            notes.push(newNote)
            
            fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4) , () => {
                console.log(notes)
                res.json(newNote)
            })
        // }
        }
    })
    })





//Get *
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})



app.listen(3001, () => {
    console.log("Server is now running!")
})