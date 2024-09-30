import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 4000;

app.listen(port, () => {
    console.log("Server is running in port ", port)
})

//////////////////////////////THIS API LACKS SECURITY PLEASE ADD /////////////////////////////////////
//!Add in documentation examples of response and id is a string
///In-memory data store 

const bookEntries = [
    {
        id : "0fef89ab-87f0-4e75-ae6c-67398354c723", 
        title : "book1 title",
        content: "book1 content",
        chapters: []

    }, 
    {
        id : "2", 
        title : "book1 title",
        content: "book1 content",
        chapters: [
            {
                id : "1", 
                content : "chapter1 content"
            },
            {
                id : "2", 
                content : "chapter1 content"
            },
            {
                id : "3", 
                content : "chapter1 content"
            },
            {
                id : "4", 
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
    const id = req.params.id;
    const entry = bookEntries.find((entry) => entry.id === id);
    if(!entry) return res.status(404).json({message : "Book not found"});
    res.json(entry)
})

//all chapters
app.get("/entries/:id/chapters", (req, res) => {
    const id = req.params.id;
    const entry = bookEntries.find((entry) => entry.id === id);
    if (!entry) return res.status(404).json({message : "Book not found"});
    res.json(entry.chapters)
})


//chapter by id 
app.get("/entries/:id/chapters/:chapterId", (req, res) => {
    const id = req.params.id;
    const chapterId = req.params.chapterId;

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

app.post("/entries/:id", (req, res) => {
    //before adding an entry for a book, we need to make sure that we still don't have one entry for that specific book
    const currentEntryIndex = bookEntries.findIndex((entry) => entry.id === req.params.id) //if exist, we need the index to later replace it
    const currentEntry = bookEntries.find((entry) => entry.id === req.params.id) //we also need the book object, if there is only parcial changes
    const newEntry = { //we arrange the user input in a object 
        id : req.params.id, // the user can choose the id, but this will be unique and won't be replaced 
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
        res.json(bookEntries[currentEntryIndex])
        res.status(204);
    } else {
        bookEntries.push(newEntry) //if it doesn't exist, then we add it as new. 
        res.status(201);
        res.json([{message : "Book Id not found. New entry was created"}, newEntry])
    }
})

/* ADDING NEW CHAPTER ENTRY */

app.post("/entries/:id/chapters/:chapterId", (req, res) => {
    const book = bookEntries.find((entry) => entry.id === req.params.id)
    const chapter = book.chapters.find((chapter) => chapter.id === req.params.chapterId)
    const chapterIndex = book.chapters.findIndex((chapter) => chapter.id === req.params.chapterId)
    const newChapterEntry = {
        id : req.params.id, // the user can choose the id, but this will be unique and won't be replaced 
        content : req.body.content 
    }

    if(!chapter){
        book.chapters.push(newChapterEntry)
        res.json([{message: "New chapter entry created"}, newChapterEntry])
        res.status(201) //Created
    } else {
        book.chapters[chapterIndex].content = req.body.content 
        res.json(book.chapters[chapterIndex])
        res.status(204) //Updated
    }
})

//////////////// DELETE HANDLERS //////////////////

///Delete everything
app.delete("/entries", (req, res) => {
    bookEntries = []
    res.status(200)
    res.json({message : "All entries were deleted successfully"})
})


///Delete content of a book
app.delete("/entries/:id", (req, res) => {
    const bookEntry = bookEntries.find((entry) => entry.id === req.params.id)
    const bookEntryIndex = bookEntries.findIndex((entry) => entry.id === req.params.id)
    if (!bookEntry) return res.status(404).json({message : "Book not found"});
    bookEntry? bookEntries.splice(bookEntryIndex, 1) : null;
    res.status(202).json([{message : "Book entry was deleted"}, bookEntries])
})


///Delete chapters of a book
app.delete("/entries/:id/chapters", (req, res) => {
    const bookEntry = bookEntries.find((entry) => entry.id === req.params.id);
    if (!bookEntry) return res.status(404).json({message : "Book not found"});
    bookEntry? bookEntry.chapters = [] : null;
    res.status(202).json([{message : "All chapter entries were deleted"}, bookEntry])
})

//Delete specific chapter
app.delete("/entries/:id/chapters/:chapterId", (req, res) => {
    const bookEntry = bookEntries.find((entry) => entry.id === req.params.id);
    const chapterEntry = bookEntry.chapters.find((entry) => entry.id === req.params.chapterId);
    const chapterEntryIndex = bookEntry.chapters.findIndex((entry) => entry.id === req.params.chapterId)
    if (!chapterEntry) return res.status(404).json({message : "Chapter not found"});
    chapterEntry? bookEntry.chapters.splice([chapterEntryIndex], 1): null;
    res.status(202).json([{message : "Chapter entry was deleted"}, bookEntry.chapters])
})

