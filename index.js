import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
import { render } from "ejs";
import { error } from "console";
import { title } from "process";

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
    const bookEntryApiUrl = internalApi + "entries/" + bookId
    debugger
    try{
        console.log(bookId)
        const [book, chapters, bookEntry] = await Promise.all([
            axios.get(bookApiUrl),
            axios.get(chaptersApiUrl),
            axios.get(bookEntryApiUrl).catch(error => {
                if (error.message && error.status === 404){
                    console.log("Book entry not found")
                } else {
                    console.error("Failed to fetch book entry:", error.message)
                }
            })
        ])
        console.log(bookEntry)
        res.render("chapters.ejs", {
            bookId : bookId,
            bookInfo : book.data.data.attributes,
            bookEntry : bookEntry ? bookEntry.data.content : null,
            bookImg : `/img/book${imgSuffix}.jpg`,
            chapters : chapters.data.data,
        })
        
    }catch(error){
        console.log("failed request: ", error.message)
    }
})

//TO RENDER THE EDIT PAGE 

app.get("/edit/:id", async (req, res) => {
    const bookId = req.params.id;
    try{
        const response = await axios.get(internalApi + "entries/" + bookId)
        console.log(response.data)
        res.render("edit.ejs", {
            bookId : bookId,
            bookInfo : response.data
        })

    } catch(error){
        if(error.status == 404){
            res.render("edit.ejs", {
                bookId : bookId
            })
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
        console.log(response.data)
        res.redirect("/chapters/" + bookId)
    } catch (error){
        console.log(error.message)
    }
})

//TO DELETE BOOK ENTRY 
app.get("/edit/:id/delete", async (req, res) => {
    const bookId = req.params.id; 
    try{
        const response = await axios.delete(internalApi + "entries/" + bookId)
        res.redirect("/chapters/" + bookId)
    }catch(error){
        console.log(error.message)
        res.redirect("/chapters/" + bookId)
    }
})

//TO RENDER THE EDIT PAGE FOR CHAPTERS
app.get("/edit/:bookId/chapters/:chapterId", async (req, res) => {
    const bookId = req.params.bookId;
    const chapterId = req.params.chapterId;
    try{
        const response = await axios.get(internalApi + "entries/" + bookId + "/chapters/" + chapterId)
        console.log(response.data)
        res.render("editChapters.ejs", {
            bookId : bookId,
            chapterInfo : response.data,
            chapterId : chapterId,
        })
    } catch (error){
        if( error.status === 404) {
            res.render("editChapters.ejs", {
                bookId : bookId,
                chapterId : chapterId,
            })
            console.log(error.message)
            } else {
            console.log(error.message)
        }
    }

})

//To post a chapter 

app.post("/edit/:bookId/chapters/:chapterId", async (req, res) => {
    const bookId = req.params.bookId;
    const chapterId = req.params.chapterId;
    try{
        const response = await axios.post(internalApi + "entries/" + bookId + "/chapters/" + chapterId, {
            id : chapterId,
            title : req.body.title,
            content : req.body.content,
        })
        console.log(response.data)
        res.redirect("/chapters/" + bookId)
    }catch(error){
        console.log(error.message)
        res.redirect("/chapters/" + bookId)
    }
})

//TO DELETE A  CHAPTERS

app.get("/edit/:bookId/chapters/:chapterId/delete", async (req, res) => {
    const bookId = req.params.bookId;
    const chapterId = req.params.chapterId;
    try{
        const response = await axios.delete(internalApi + "entries/" + bookId + "/chapters/" + chapterId)
        res.redirect("/chapters/" + bookId)
    }catch(error){
        console.log(error.message)
        res.redirect("/chapters/" + bookId)
    }
})


app.listen(port, ()=>{
    console.log("Server is running in port 3000")
})