import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000
const entries = []


 //to delete the entry in the array
app.use(express.json()); // Middleware to parse JSON bodies, this is handled differently from the other request. the request is managed in another js file 
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

app.post("/delete-entry", (req, res) => {
    const { entry } = req.body;
    const index = parseInt(entry);
    entries.splice(index, 1) 
    console.log(`Entry ${entry} deleted successfully!`);
    res.send("success") //  The res.redirect() method on the server side doesn’t automatically trigger a client-side redirect when using fetch. If I use fetch theeen I need to handle the redirection on the Js file for front-end
  });

//we received url with the index of the data in the array so we can fetch it and send it. 
app.get("/entries/:id", (req, res)=>{//url have the index where that entry is located in the array 
    const index = parseInt(req.params.id)//getting the index and as it comes in a string I pass it to a number
    const entryObj = entries[index] //we assign the entry
    res.render("entries.ejs",  {
        index : index, //we will need the index to put it in the url so when someone wants to delete it we will know what entry
        entries : entryObj 
    })
    console.log(entryObj)
})

//to edit the entry in the array
app.post("/entries/:id", (req, res)=>{//url have the index where that entry is located in the array 
    const index = parseInt(req.params.id);//getting the index and as it comes in a string I pass it to a number
    const updatedEntry = { //new object with the updated information. 
        title: req.body.title,
        content: req.body.content
    };
    entries[index] = updatedEntry
    res.redirect("/")

})


app.listen(port, () =>{
    console.log("Server is running in port 3000")
} )

