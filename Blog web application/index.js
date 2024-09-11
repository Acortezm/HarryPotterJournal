import express from "express"
import bodyParser from "body-parser"
import { render } from "ejs";

const app = express()
const port = 3000
const entries = []

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index.ejs", {entries : entries})
    console.log("get/")
})

app.get("/submit", (req, res) => {
    res.render("submit.ejs")
})

app.post("/", (req, res) => {
    entries.push(req.body)
    res.render("submit.ejs")
    console.log(req.body, entries)

})

app.get("/entries/:id", (req, res)=>{
    res.send("working on it")
})


app.listen(port, () =>{
    console.log("Server is running in port 3000")
} )

