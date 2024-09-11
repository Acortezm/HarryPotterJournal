import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000
const entries = []

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index.ejs", {entries : entries})
})

app.get("/entries", (req, res) => {
    res.render("entries.ejs")
})

//saving the form data into an array
app.post("/", (req, res) => {
    entries.push(req.body)
    res.redirect("/")

})

//we received url with the index of the data in the array so we can fetch it and send it. 
app.get("/entries/:id", (req, res)=>{
    const index = parseInt(req.params.id)
    const entryObj = entries[index]
    res.render("entries.ejs",  {
        index : index,
        entries : entryObj
    })
    console.log(entryObj)
})

//to edit the entry in the array
app.post("/entries/:id", (req, res)=>{
    const index = parseInt(req.params.id);
    const updatedEntry = {
        title: req.body.title,
        content: req.body.content
    };
    entries[index] = updatedEntry
    res.redirect("/")

})

app.post("/entries/:id", (req, res)=>{
    const index = parseInt(req.params.id);
    entries.splice(index, 1)
    res.redirect("/")

})





app.listen(port, () =>{
    console.log("Server is running in port 3000")
} )

