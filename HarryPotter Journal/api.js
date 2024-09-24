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

    }, 
    {
        id : 1, 
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
app.get("/", (req, res) => {
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




