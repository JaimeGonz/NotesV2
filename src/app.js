const { response } = require("express");
const express = require("express")
const notes = require("./notes.js")

// Permite crear el servidor web
// Crea un objeto app que representa mi app web mediante un servidor
const app = express();

// Definir puerto de escucha
const port = 3000;

// Definir motor de plantillas
app.set("view engine", "ejs")
// app.use(express.static(__dirname+"/views"))

app.use(express.static("public"))

app.get("/" , function(request, response){
    // response.send("¡Hola mundo!")
    response.render("index", {
        message : "Welcome to App Notes"
    })
})

// Middleware de express para extraer valores del body de petición HTML.
app.use(express.urlencoded({
    extended : true 
}));

app.post("/add_note", function(request, response){
    const title = request.body.title
    const body = request.body.body
    notes.addNote(title, body)
    response.redirect("/notes_created")
})

app.get("/notes_created", function(request, response){
    response.render("notes_created.ejs")
    // response.render("notes_created")
})

app.listen(port, function(){
    console.log("Listening at http://localhost:3000")
})