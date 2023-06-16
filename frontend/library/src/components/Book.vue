<template>
  <div id="Book">
    <h2 id="BookTitle">{{ book.title }}</h2>
    <h3 id="BookAuthor">{{ book.author }}</h3>
    <h3 id="BookReleaseYear">{{ book.releaseYear }}</h3>
    <img :src="book.img" alt="">
  </div>
</template>

<script>
export default {
  props: ['book']
};
</script>

<style>
  #Book{
    display: flex;
    
    justify-content: center;
    align-items: center;
    padding-left: 50vh;
    /*border: black 2px solid;*/

  }
  #BookTitle{
    /* grid-column-start:1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2; 
    padding: 10px;
    border: black 2px solid;*/

  }
  #BookAuthor{
    /*grid-column-start:1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 2;
    border: black 2px solid;*/
  }
  #BookReleaseYear{
    /*grid-column-start:1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    border: black 2px solid;*/

  }

</style>