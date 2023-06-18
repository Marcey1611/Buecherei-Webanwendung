<template>
  <div id="BookList">
    <div id="SearchFilterBar">
      <v-text-field id="SearchField" @input="handleInput()" v-model="searchInput"  placeholder="Search"></v-text-field>
      <p>eiqhnogijewiogaekgmnqeogmnoe</p>
    </div>
    <div class="Books" v-for="book in books" :key="id">
      <Book :book="book" />
      <div id="borrow">
        <v-text-field class="BookListBorrowInput" v-if="book.available" type="text" placeholder="First name" v-model="book.firstName" ></v-text-field>
        <v-text-field class="BookListBorrowInput" v-if="book.available" type="text" placeholder="Last name" v-model="book.lastName"></v-text-field>
        <v-btn id="BookListBorrowButton" v-if="book.available" @click="borrow(book)" >Borrow</v-btn>
        <v-btn id="BookListHandBackButton" v-if="!book.available" @click="handback(book)">Hand back</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Book from './Book.vue';
import axios from 'axios';

export default {
  components: {
    Book
  },
  data: function() {
    return {
      anzeigen: false,
      books: [],
      searchInput: '',
    };
  },
  methods: {
    borrow: function(book) {
      axios
        .put("http://localhost:8080/books/"+book.id,{
          firstName: book.firstName,
          lastName: book.lastName,
          available: false
          
        })
        .then(response => {
          this.books = response.data;
          this.getImgUrl();
        });
    },
    handback: function(book) {
      axios
        .put("http://localhost:8080/books/"+book.id,{
          firstName: '',
          lastName: '',
          available: true
          
        })
        .then(response => {
          this.books = response.data;
          this.getImgUrl();
        });
    },
      async handleInput() {
      try {
        const response = await axios.get('http://localhost:8080/books/search/', {
          params: { searchText:this.searchInput }
        });
        this.books = response.data;
        this.getImgUrl();
      } catch (error) {
        console.error(error);
      }    },
    getImgUrl(){
      for (let i = 0; i < this.books.length; i++){
        this.books[i].img='https://covers.openlibrary.org/b/isbn/' + this.books[i].isbn + '-L.jpg'
      }
    }

  },
  mounted() {
    axios.get("http://localhost:8080/books/").then(response => {
      this.books = response.data;
      this.getImgUrl()
    });
  }
};
</script>

<style>
  #BookList{
  }
  .Books{
    margin-top: 20px;
    margin-bottom: 20px;

  }
  #borrow{
    background-color: #2d2d2d;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 82vw;
    height: 11vh;
    padding-top: 3vh;
    padding-bottom: 1vh;
    padding-left: 1vw;
    padding-right: 1vw;
    justify-content: left;
    border-bottom: #616161 1px solid;
  }
  .BookListBorrowInput{
    margin-right: 1vw;
    height: 6vh; 
    color: #a6a6a6;
    background-color: #3c3c3c;
  }
  #BookListBorrowButton{
    height: 6vh;
    background-color: #0E639C;
    color: white;
  }
  #BookListHandBackButton{
    height: 6vh;
    background-color: #0E639C;
    color: white;
  }
  #SearchFilterBar{
    padding-top: 1vh;
    padding-bottom: 1vh;
    padding-left: 1vw;
    margin-right: 50vw;
    background-color: #2d2d2d;
    width: 82vw;
    display: grid;
    grid-template-columns: 5fr 1fr 1fr ;
    

  }
  #SearchField{
    width: max-content;
    padding-left: 1vw;
    background-color: #3c3c3c;
    color: #a6a6a6;
    
  }
</style>