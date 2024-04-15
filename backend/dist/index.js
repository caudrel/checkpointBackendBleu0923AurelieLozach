import "reflect-metadata";
import db from "./db";
import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("hello world");
});
app.listen(port, () => {
    db.initialize();
    console.log(`Checkpoint Backend Aurélie app listening on port ${port}`);
});
