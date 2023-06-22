const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;
const filename = __dirname + "/books.json";
const { promisify } = require('util');
const { readFile } = require("fs/promises");
const { error } = require("console");
const axios = require("axios");

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
app.get('/books/search', (req, res) => {
    const searchText = req.query.searchText.toLowerCase();
    console.log(req.query);
    const filterLanguages=req.query.languages;
    const minPages=req.query.pages[0];
    const maxPages=req.query.pages[1];    
    const filterAvailable=req.query.available;
    const filterYear=req.query.year;
    const filterGenre=req.query.genre;
    const readFile = promisify(fs.readFile)
    readFile(filename, "utf8").then((data) => {
        const books = JSON.parse(data);
        const tmp = [];
        for (const item of books) {
            let tmpTitel = item.title.toLowerCase();
            let tmpAuthor = item.author.toLowerCase();
            if((tmpTitel.includes(searchText) || tmpAuthor.includes(searchText)) && item.genre.includes(filterGenre) && item.pages<=maxPages && item.pages>=minPages && item.available.toString()==filterAvailable && item.releaseYear>=filterYear[0] && item.releaseYear<=filterYear[1]){
                if(filterLanguages!=null){
                    for(const itemLang of filterLanguages){
                        if(item.language==itemLang){
                            tmp.push(item);
                        }
                    }
                }else{
                    tmp.push(item);
                }
                    
            };
        };
        res.json(tmp)
    }).catch((error) =>
        console.log(error)
    )

});
app.get('/books/genre', (req,res) => {
    readFile(filename, "utf8").then((data) => {
        const books=JSON.parse(data);
        const genre=[];
        for(const item of books){
            if(!genre.includes(item.genre)){
                genre.push(item.genre);   
            }
        };
        res.json(genre);
    }).catch((error) =>
    console.log(error)
)
});
app.get('/books/language', (req,res) => {
    readFile(filename, "utf8").then((data) => {
        const books=JSON.parse(data);
        const lang=[];
        for(const item of books){
            if(!lang.includes(item.language)){
                lang.push(item.language);   
            }
        };
        console.log(lang);
        res.json(lang);
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
            lastName: req.body.lastName,
            owner:req.body.owner,
            borrowCount:0
        });
        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
    getGoogleBooks()
});
function getGoogleBooks() {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataArray = JSON.parse(data);
        //console.log(dataArray);
        let promises = [];

        dataArray.forEach(element => {
            try {
                let promise = axios.get('https://www.googleapis.com/books/v1/volumes', {
                    params: {
                        q: 'isbn:' + element.isbn,
                        maxResults: 1,
                        key: 'AIzaSyA8Dvs5T5N5GphcuRKPx2ilCcRJWSIvU1A'
                    }
                }).then(response => {
                    element.img = response.data.items[0].volumeInfo.imageLinks.thumbnail;
                    element.description = response.data.items[0].volumeInfo.description;
                    element.borrowCount = Math.floor((Math.random() * 10)) + 1
                    //console.log(element);
                    console.log('Success');
                }).catch(error => {
                    console.log('Error');
                    console.log('Error from Google or Exhausted');
                    try {
                        element.img = 'https://covers.openlibrary.org/b/isbn/'+ element.isbn+'-L.jpg'
                    } catch (error) {
                        console.log('Error from 2. Api')
                    }
                });

                promises.push(promise);
            } catch (err) {
                console.log('Error');
                console.log(err);
            }
        });

        Promise.all(promises)
            .then(() => {
                console.log('All requests completed');
                fs.writeFile(filename, JSON.stringify(dataArray), (err) => {
                    if (err) {
                        console.error('Fehler beim Schreiben der Datei:', err);
                    } else {
                        console.log('Datei erfolgreich geschrieben.');
                    }
                });
            })
            .catch(error => {
                console.log('Error');
                console.log(error);
            });
    });
}
