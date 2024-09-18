import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000
const apiUrl = "https://api.potterdb.com/v1/"

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

//TO RENDER ALL THE BOOKS
app.get("/", async (req, res) => {
    try{
        const response = await axios.get(apiUrl + "/books")
        res.render("index.ejs", {
            books : response.data.data
        })
    }catch(error){
        console.log("failed request: ", error)
    }
})

//TO RENDER THE CHAPTERS WITHIN A BOOK
app.get("/chapters/:index", async (req, res) => {
    const bookId = req.query.bookId //array of all book IDs
    const index = parseInt(req.params.index) //the index of the book that was clicked
    try{
        const response = await axios.get(apiUrl + "/books/" + bookId[index] + "/chapters")
        res.render("chapters.ejs", {
            chapters : response.data.data //array of all the chapters. 
        })
        
    }catch(error){
        console.log("failed request: ", error.message)
    }
})

app.listen(port, ()=>{
    console.log("Server is running in port 3000")
})