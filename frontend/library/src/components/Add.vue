<template>
    <h1 id="AddH1">Add a new book to our libraray</h1>
    <v-form id="Add">
        <v-text-field v-model="title" @blur="getISBN()" id="AddTitle" type="text" placeholder="Titel"></v-text-field>
        <v-text-field v-model="author" @blur="getISBN()" id="AddAuthor" type="text" placeholder="Autor"></v-text-field>
        <img :src="tmpImgurl">
        <v-btn @click="addBook">Buch hinzufügen</v-btn>
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
            cover: '',
            firstName: '',
            lastName: '',
            tmpImgurl: ''
        };
    },
    methods: {

        addBook() {
            try {
                axios.get('https://www.googleapis.com/books/v1/volumes', {
                    params: {
                        q: 'intitle:' + this.title + '+ inauthor:' + this.author,
                        maxResults: 1,
                        key: 'AIzaSyA8Dvs5T5N5GphcuRKPx2ilCcRJWSIvU1A'
                    }
                }).then(response => {
                    console.log(response)
                    let respInfo = response.data.items[0].volumeInfo
                    let tmpISBN = ''
                    let tmpYear = ''
                    console.log(response.data.items)
                    try {
                        respInfo.industryIdentifiers.forEach(element=>{
                            if (element.type =="ISBN_13") {
                                tmpISBN = parseInt(element.identifier)
                                console.log(tmpISBN)
                            }
                        })
                        tmpYear = respInfo.publishedDate.substring(0,4);
                        console.log(tmpYear)

                        const newBook = {
                            isbn: tmpISBN,
                            title: respInfo.title,
                            author: respInfo.authors[0],
                            releaseYear: parseInt(tmpYear),
                            genre: respInfo.categories[0],
                            language: respInfo.language,
                            pages: respInfo.pagecount,
                            description: respInfo.description,
                            cover: respInfo.imageLinks.thumbnail,
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
                        console.log(newBook)
                        
                    } catch (err) {
                        console.log('Failed to create Book')
                    }
                })
            } catch (err) {
                console.log('Error')
            }

        },

        getISBN() {
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

                        response.data.items.forEach(element => {
                            try {
                                console.log(element.volumeInfo.imageLinks.thumbnail)
                                this.tmpImgurl = element.volumeInfo.imageLinks.thumbnail
                            } catch (error) {
                                console.log('Error')
                            }

                        });
                    })
                } catch (err) {
                    console.log('Error')
                }

            }
            if (this.title == '' || this.author == '') {
                this.tmpImgurl = ''
            }


        }

    },
    mounted() {

    }
}


</script>
  
  
<style>
#AddH1 {
    white-space: pre;
    padding: 3vw;
}

#Add {
    display: grid;
    grid-template-columns: 40vw 40vw;
    grid-template-rows: 5vh 5vh 5vh 5vh 5vh 5vh;
    grid-gap: 20px;
    width: 70vw;
    height: 30vh;
    padding-bottom: 1vh;
    margin-left: 3vw;
    justify-content: left;
}

#AddDescription {
    grid-column-start: 1;
    grid-column-end: 3;
    white-space: pre-wrap;
    overflow-y: auto;
}
</style>