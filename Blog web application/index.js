import express from "express"
import bodyParser from "body-parser"
import { render } from "ejs";

const app = express()
const port = 3000
const entries = []

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/submit", (req, res) => {
    res.render("submit.ejs")
})

app.post("/submit", (req, res) => {
    entries.push(req.body)
    res.render("submit.ejs")
    console.log(entries)

})



app.listen(port, () =>{
    console.log("Server is running in port 3000")
} )

