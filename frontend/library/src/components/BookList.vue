<template>
  <div id="BookList">  
    <h1>BookList.vue</h1>

    <Book v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>

<script>
import Book from './Book.vue';

export default {
  components: {
    Book
  },
  data() {
    return {
      books: ['']
    };
  }
};
</script>

<style>
  #BookList{
    background-color: bisque;
  }
</style>