const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;
const filename = __dirname + "/books.json";

//Middleware
app.use(express.json());
app.use(cors());
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);