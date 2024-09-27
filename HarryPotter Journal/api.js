import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 4000;

app.listen(port, () => {
    console.log("Server is running in port ", port)
})

///In-memory data store 

const bookEntries = [
    {
        id : 1, 
        title : "book1 title",
        content: "book1 content",
        chapters: []

    }, 
    {
        id : 2, 
        title : "book1 title",
        content: "book1 content",
        chapters: [
            {
                id : 1, 
                content : "chapter1 content"
            },
            {
                id : 2, 
                content : "chapter1 content"
            },
            {
                id : 3, 
                content : "chapter1 content"
            },
            {
                id : 4, 
                content : "chapter1 content"
            }
        ]

    }
]

//////////////// MIDLEWARE //////////////////

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

//////////////// GET HANDLERS //////////////////


//all entries 
app.get("/entries", (req, res) => {
    res.status(200)
    res.json(bookEntries)
})

//book by id 
app.get("/entries/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const entry = bookEntries.find((entry) => entry.id === id);
    if(!entry) return res.status(404).json({message : "Book not found"});
    res.json(entry)
})

//all chapters
app.get("/entries/:id/chapters", (req, res) => {
    const id = parseInt(req.params.id);
    const entry = bookEntries.find((entry) => entry.id === id);
    if (!entry) return res.status(404).json({message : "Book not found"});
    res.json(entry.chapters)
})


//chapter by id 
app.get("/entries/:id/chapters/:chapterId", (req, res) => {
    const id = parseInt(req.params.id);
    const chapterId = parseInt(req.params.chapterId);

    const entry = bookEntries.find((entry) => entry.id === id);
    const chapter = entry?.chapters.find((chapter) => chapter.id === chapterId);

    if (!entry) {
        return res.status(404).json({ message: "book id not valid" });
    } else if (!chapter) {
        return res.status(404).json({ message: "chapter entry not found" });
    } else {
        res.json(chapter)
    }

})

//////////////// POST HANDLERS //////////////////

/* ADDING AND UPDATING NEW BOOK ENTRY    
The API won't allow create multiple entries for the same book. If the book id doesn't exist, it will add the new entry as new
But, if the book is already in the array, it will update the information partially.*/

app.post("/", (req, res) => {
    //before adding an entry for a book, we need to make sure that we still don't have one entry for that specific book
    const currentEntryIndex = bookEntries.findIndex((entry) => entry.id === parseInt(req.body.id)) //if exist, we need the index to later replace it
    const currentEntry = bookEntries.find((entry) => entry.id === parseInt(req.body.id)) //we also need the book object, if there is only parcial changes
    const newEntry = { //we arrange the user input in a object 
        id : req.body.id, // the user can choose the id, but this will be unique and won't be replaced 
        title : req.body.title,
        content : req.body.content,
        chapters : []
    }

    if(bookEntries[currentEntryIndex]){ //if the entry exist then we replace the old data
        bookEntries[currentEntryIndex] = {
            id : currentEntry.id, //we cannot replace the id
            title : newEntry.title || currentEntry.title,
            content : newEntry.content || currentEntry.content,
            chapters : currentEntry.chapters // we cannot replace the chapters. 
        };
        res.status(200);
        res.json(bookEntries[currentEntryIndex])
    } else {
        bookEntries.push(newEntry) //if it doesn't exist, then we add it as new. 
        res.status(200);
        res.json([{message : "Book Id not found. New entry was created"}, newEntry])
    }
})

/* ADDING NEW CHAPTER ENTRY */

app.post("/entries/:id/chapters/:chapterId", (req, res) => {
    const book = bookEntries.find((entry) => entry.id === parseInt(req.params.id))
    const chapter = book.chapters.find((chapter) => chapter.id === parseInt(req.params.chapterId))
    const chapterIndex = book.chapters.findIndex((chapter) => chapter.id === parseInt(req.params.chapterId))
    const newChapterEntry = {
        id : req.body.id, // the user can choose the id, but this will be unique and won't be replaced 
        content : req.body.content 
    }

    if(!chapter){
        book.chapters.push(newChapterEntry)
        res.json([{message: "New chapter entry created"}, newChapterEntry])
        res.status(200)
    } else {
        book.chapters[chapterIndex].content = req.body.content 
        res.json(book.chapters[chapterIndex])
        res.status(200)
    }
})

//////////////// DELETE HANDLERS //////////////////


