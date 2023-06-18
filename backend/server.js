const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;
const filename = __dirname + "/books.json";
const { promisify } = require('util');
const { readFile } = require("fs/promises");
const { error } = require("console");

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
app.get('/books/search/', (req, res) => {
    const searchText = req.query.searchText.toLowerCase();
    console.log(req.query);
    const languages=req.query.languages;
    
    console.log(languages);
    const readFile = promisify(fs.readFile)
    readFile(filename, "utf8").then((data) => {
        const books = JSON.parse(data);
        const tmp = [];
        for (const item of books) {
            let tmpTitel = item.title.toLowerCase();
            let tmpAuthor = item.author.toLowerCase();

            if (tmpTitel.includes(searchText)) {
                for (const itemLang of languages) {
                    if (item.language == itemLang) {
                        tmp.push(item)
                    }
                }
            } else {
                if (tmpAuthor.includes(searchText)) {
                    for (const itemLang of languages) {
                        if (item.language == itemLang) {
                            tmp.push(item)
                        }
                    }
                }
            }
        };
        res.json(tmp)
    }).catch((error) =>
        console.log(error)
    )


});
app.put("/books/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
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
app.post("/books", function (req, res) {
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