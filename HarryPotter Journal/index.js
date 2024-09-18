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

app.get("/chapters", async (req, res) => {
    try{
        const response = await axios.get(apiUrl + "/books")
        res.render("index.ejs", {
            books : response.data.data
        })
    }catch(error){
        console.log("failed request: ", error)
    }
})

app.listen(port, ()=>{
    console.log("Server is running in port 3000")
})