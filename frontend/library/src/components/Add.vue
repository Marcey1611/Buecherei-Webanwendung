<template>
    <h1 id="AddH1">Add a new book to our libraray</h1>
    <label v-show="errorShow" id="errLable">{{ errorLable }}</label>
    <v-form id="Add">
        <v-text-field v-model="this.title" @blur="getBook()" id="AddTitle" type="text" placeholder="Titel"></v-text-field>
        <div id="idImgDiv">
            <img  :src="this.cover" id="idImg">
        </div>
       
        <v-text-field v-model="this.author" @blur="getBook()" id="AddAuthor" type="text" placeholder="Autor"></v-text-field>
        <v-text-field v-model="this.genre" id="Genre" type="text" placeholder="Genre"></v-text-field>
        <v-text-field v-model="this.language" id="Sprache" type="text" placeholder="Sprache"></v-text-field>
        
        
        <form action="upload" id="Bild">
            <v-file-input label="Bild Hochladen" prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/bmp" variant="underlined" :disabled="this.showUpload"></v-file-input>
        </form>
        <v-text-field v-model="this.isbn" @blur="getCoverByISBN()" id="ISBN" type="number" placeholder="ISBN-13"></v-text-field>
        <v-text-field v-model="this.releaseYear" id="Erscheinungsjahr" type="number" min="0" step="1" placeholder="Erscheinungsjahr"></v-text-field>
        <v-textarea v-model="this.description" id="Beschreibung" type="text" placeholder="Beschreibung"></v-textarea>
        <v-text-field v-model="this.pages" id="Seitenzahl" type="number" min="0" step="1" placeholder="Seitenanzahn"></v-text-field>
        <div></div>
        <v-btn @click="addBook" id="idButton">Buch hinzufügen</v-btn>
    </v-form>
</template>
  
<script>
import axios from 'axios';


export default {
    data() {
        return {
            isbn: '',
            title: '',
            author: '',
            releaseYear: '',
            genre: '',
            language: '',
            pages: '',
            description: '',
            cover: this.nopic,
            errorLable: '',
            errorShow: '',
            showUpload : true,
            nopic : ''
            
        };
    },
    methods: {
        addBook() {
            if (this.realNewBook() == true) {
                if (condition) {
                    try {
                    const newBook = {
                        isbn: this.isbn,
                        title: this.title,
                        author: this.author,
                        releaseYear: this.releaseYear,
                        genre: this.genre,
                        language: this.language,
                        pages: this.pages,
                        description: this.description,
                        cover: this.cover,
                        firstName: this.firstName,
                        lastName: this.lastName
                    };
                    console.log(newBook)
                    try {
                        axios.post('http://localhost:8080/books/', newBook)
                            .then(response => {
                                this.newBook = response.data;
                            })
                    } catch (error) {
                        console.log('Failed to export Book')
                    }
                } catch (err) {
                    console.log('Error')
                }  
                }
                
            } else {
                console.log('Buch ist bereits in der Datenbank')
                this.errorLable = 'Buch ist bereits in der Datenbank'
                this.errorShow = true
            }

        },

        getBook() {
            if (this.title != '' && this.author != '' && this.isbn == '') {
                try {
                    axios.get('https://www.googleapis.com/books/v1/volumes', {
                        params: {
                            q: 'intitle:' + this.title + '+ inauthor:' + this.author,
                            maxResults: 1,
                            key: 'AIzaSyA8Dvs5T5N5GphcuRKPx2ilCcRJWSIvU1A'
                        }
                    }).then(response => {
                        console.log(response)
                        //console.log(response.data.items)
                        try {
                            let respInfo = response.data.items[0].volumeInfo
                            respInfo.industryIdentifiers.forEach(element => {
                                if (element.type == "ISBN_13") {
                                    tmpISBN = parseInt(element.identifier)
                                    console.log(tmpISBN)
                                }
                            })
                            tmpYear = respInfo.publishedDate.substring(0, 4);
                                this.isbn = tmpISBN,
                                this.title = respInfo.title,
                                this.author = respInfo.authors[0],
                                this.releaseYear = parseInt(tmpYear),
                                this.genre = respInfo.categories[0],
                                this.language = respInfo.language,
                                this.pages = respInfo.pagecount,
                                this.description = respInfo.description,
                                this.cover = respInfo.imageLinks.thumbnail
                        } catch (error) {
                            console.log('Error2')
                        }
                    })
                } catch (err) {
                    console.log('Error')
                }
            }
            if ((this.title == ''&& this.cover !=this.nopic) || (this.author == '' && this.cover !=this.nopic)) {
                this.cover = this.nopic
            }
        },
        realNewBook() {
            try {
                axios.get("http://localhost:8080/books/").then(response => {
                    response.data.forEach(element => {
                        if (element.title.includes(this.title)) {
                            return false;
                        }
                    })
                    return true
                })
            } catch (error) {
                console.log("Error")
            }
        },
        getCoverByISBN(){
            if (this.isbn!= '' && this.cover == this.nopic) {
                try {
                    this.cover = 'https://covers.openlibrary.org/b/isbn/' + this.isbn + '-L.jpg'
                    console.log(this.cover)
                    this.showUpload = false
                } catch (error) {
                    console.log('Error while downloading img')
                }
            }if (this.isbn== '' && this.cover != this.nopic) {
                this.cover = this.nopic
                this.showUpload = true
            }
        },
        titlecorrespondstoISBN(){
            try {
                
            } catch (error) {
                
            }
        }
    },
    mounted() {
        import('@/assets/pictures/nopic.jpg')
      .then((image) => {
        this.nopic = image.default;
        this.cover = this.nopic;
      })
    }
}


</script>
  
  
<style>
#AddH1 {
    white-space: pre;
    padding: 3vw;
}

#Add {
    background-color: #2d2d2d;
    color: #828282;
    display: grid;
    grid-template-columns: 40vw 40vw;
    grid-template-rows: 5vh 5vh 5vh 5vh 5vh 5vh 5vh;
    grid-gap: 20px;
    width: auto;
    height: auto;
    padding-bottom: 1vh;
    margin-left: 3vw;
    justify-content: left;
}
#idImgDiv{
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    height: 100%;
    grid-row: 1/4;
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
#idImg {
    max-height: 100%;
    max-width: 100%;
    align-self: center;
}

#Beschreibung {
    grid-row: 4/ 7;
    grid-column: 2;
    max-height: 120;
}

#errLable {
    color: red;

}

#Seitenzahl {
    grid-column: 1;
}

#AddDescription {
    grid-column-start: 1;
    grid-column-end: 3;
    white-space: pre-wrap;
    overflow-y: auto;
}
#idButton{
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    width: 100%;
}
</style>