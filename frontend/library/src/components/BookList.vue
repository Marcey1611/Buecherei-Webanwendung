<template>
  <div id="BookList">  
    <h1>BookList.vue</h1>

    <div class="Books" v-for="book in books" :key="book.isbn">
      <Book :book="book" />
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
      books: []
    };
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
  
</style>