import express from "express";
import axios from "axios";

const app=express();
const port=3000;

app.use(express.static("public"));

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

app.get("/",(req,res)=>{
    res.render("index.ejs");
})