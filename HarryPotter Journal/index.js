import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
import { render } from "ejs";

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000
const apiUrl = "https://api.potterdb.com/v1/"

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

// app.get("/", (req, res) => {
//     res.render("edit.ejs")
// })

// app.post("/", (req, res) => {
//     res.render("edit.ejs")
// })


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
    const bookApiUrl = apiUrl + "/books/" + bookId[index] //I need info from the book to render title and summary
    const chaptersApiUrl = apiUrl + "/books/" + bookId[index] + "/chapters" //To render all chapters
    try{
        const response = await Promise.all([
            axios.get(bookApiUrl),
            axios.get(chaptersApiUrl)
        ])

        res.render("chapters.ejs", {
            bookInfo : response[0].data.data.attributes,
            bookImg : `/img/book${index+1}.jpg`,
            chapters : response[1].data.data //array of all the chapters. 
        })
        
    }catch(error){
        console.log("failed request: ", error.message)
    }
})

app.listen(port, ()=>{
    console.log("Server is running in port 3000")
})