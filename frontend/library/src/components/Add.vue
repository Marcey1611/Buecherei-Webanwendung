<template>
    <h1 id="AddH1">Add a new book to our libraray</h1>
    <v-form id="Add">  
      <v-text-field v-model="isbn" id="AddISBN" type="text" placeholder="ISBN"></v-text-field>
      <v-text-field v-model="title" id="AddTitle" type="text" placeholder="Titel"></v-text-field>
      <v-text-field v-model="author" id="AddAuthor" type="text" placeholder="Autor"></v-text-field>
      <v-text-field v-model="releaseYear" id="AddReleaseYear" type="text" placeholder="Veröffentlichungsjahr"></v-text-field>
      <v-text-field v-model="genre" id="AddGenre" type="text" placeholder="Genre"></v-text-field>
      <v-text-field v-model="language" id="AddLanguage" type="text" placeholder="Sprache"></v-text-field>
      <v-text-field v-model="pages" id="AddPAges" type="text" placeholder="Seitenanzahl"></v-text-field>
      <v-text-field v-model="cover" id="AddCover" type="text" placeholder="Cover URL"></v-text-field>
      <v-text-field v-model="description" id="AddDescription" type="text" placeholder="Beschreibung/Zusammenfassung"></v-text-field>
      
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
            lastName: ''
        };
    },
    methods: {
        addBook() {
            const newBook={
                isbn:parseInt(this.isbn),
                title:this.title,
                author:this.author,
                releaseYear:parseInt(this.releaseYear),
                genre:this.genre,
                language:this.language,
                pages:parseInt(this.pages),
                description:this.description,
                cover:this.cover,
                firstName:this.firstName,
                lastName:this.lastName
            };
            axios.post('http://localhost:8080/books/', newBook)
                .then(response => {
                    this.newBook = response.data;
                })
        }
    }
  }
  
 
  </script>
  
  
  <style>
  #AddH1{
    white-space: pre;
    padding: 3vw;
  }
    #Add{
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
    #AddDescription{
        grid-column-start: 1;
        grid-column-end: 3;
        white-space: pre-wrap;
        overflow-y: auto;
    }
  
  </style>