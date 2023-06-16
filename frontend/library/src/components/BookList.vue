<template>
  <div id="BookList">  
    <div class="Books" v-for="book in books" :key="id">
      <Book :book="book"/>
      <div id="borrow">
        <input v-if="book.available" type="text" placeholder="First name" v-model="book.firstName">
        <input v-if="book.available" type="text" placeholder="Last name" v-model="book.lastName">
        <button v-if="book.available" @click="borrow(book)">Borrow</button>
        <button v-if="!book.available" @click="handback(book)">Hand back</button>
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
      books: []
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
        });
    }
  },
  mounted() {
    axios.get("http://localhost:8080/books/").then(response => {
      this.books = response.data;
    });
  }
};
</script>

<style>
  #BookList{
    background-color: bisque;
    white-space: pre;
  }
  .Books{
    margin-top: 20px;
    margin-bottom: 20px;

  }
  #borrow{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 70vw;
    height: 5vh;
    padding-bottom: 1vh;
    margin-left: 3vw;
    padding-left: 1vw;
    justify-content: left;
    border-bottom: black 1px solid;
  }

</style>