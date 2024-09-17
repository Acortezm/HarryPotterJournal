import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000

app.use(express.static("/public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hi")
})

app.listen(3000, ()=>{
    console.log("Server is running in port 3000")
})