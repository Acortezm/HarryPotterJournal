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
const internalApi = "http://localhost:4000/"

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
app.get("/chapters/:id", async (req, res) => {
    const bookId = req.params.id//array of all book IDs
    const imgSuffix =  bookId.slice(-4, -1)//the index of the book that was clicked
    const bookApiUrl = apiUrl + "/books/" + bookId //I need info from the book to render title and summary
    const chaptersApiUrl = apiUrl + "/books/" + bookId + "/chapters" //To render all chapters
    try{
        console.log(imgSuffix)
        const response = await Promise.all([
            axios.get(bookApiUrl),
            axios.get(chaptersApiUrl)
        ])

        res.render("chapters.ejs", {
            bookId : bookId,
            bookInfo : response[0].data.data.attributes,
            bookImg : `/img/book${imgSuffix}.jpg`,
            chapters : response[1].data.data //array of all the chapters. 
        })
        
    }catch(error){
        console.log("failed request: ", error.message)
    }
})

//TO RENDER THE EDIT PAGE 

/*TODO LIST: 

1)we need to check what book clicked on it needs to send the book id
2)We need to ask if that book id has an entry
3) if it does have an entry we need to auto-fill the form
    a) if save btn is clicked send a post request with the book id to update info
4) if it doesn't exist, just render an empty form
    a) when save button is clicked we need send a post request with the book id to identify it later
6) add delete button 
7) when delete button is clicked it needs to send the id of book we want to delete
8) send delete request

*/

app.get("/edit/:id", async (req, res) => {
    const bookId = req.params.id;
    try{
        const response = await axios.get(internalApi + "entries/" + bookId)
        console.log(response.data)
        res.render("edit.ejs", {
            bookInfo : response.data
        })

    } catch(error){
        if(error.status == 404){
            res.render("edit.ejs")
        } else {
            console.log(error.message)
        }
    }
})

app.post("/edit/:id", async (req, res) => {
    const bookId = req.params.id;
    try{
        const response = await axios.post(internalApi + "entries/" + bookId, {
            id : bookId,
            title : req.body.title,
            content : req.body.content,
        })
        res.redirect("/")
    } catch (error){
        console.log(error.message)
    }
})


app.listen(port, ()=>{
    console.log("Server is running in port 3000")
})