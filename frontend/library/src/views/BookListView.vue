<template>
    <main id="HomeView">  
      <BookList />
    </main>
  </template>
  
  <script>
  import BookList from '../components/BookList.vue';
  
  export default {
    components: {
      BookList
    }
  };
  </script>
  
  <style>
    #HomeView{
      background-color: blueviolet;
    }
  </style>