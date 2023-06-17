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

app.get("/books", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    });
});
app.put("/books/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        console.log(dataAsObject[0]);
        console.log(dataAsObject[req.params.id]);
        dataAsObject[req.params.id].firstName = req.body.firstName;
        dataAsObject[req.params.id].lastName = req.body.lastName;
        dataAsObject[req.params.id].available = req.body.available;
        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});
app.post("/books", function(req,res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject.push({
            id: dataAsObject.length,
            img: req.body.cover,
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            releaseYear: req.body.releaseYear,
            genre: req.body.genre,
            language: req.body.language,
            pages: req.body.pages,
            available: true,
            description: req.body.description,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
})
app.listen(port, () => console.log(`Server listening on port ${port}!`));