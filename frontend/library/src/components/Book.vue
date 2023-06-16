<template>
  <div id="Book">
    <div id="BookCoverspace">
      <img id="BookCover" :src="book.img" alt="">
    </div>
    <h2 id="BookTitle">Title: {{ book.title }}</h2>
    <h3 id="BookAuthor">Autor: {{ book.author }}</h3>
    <h3 id="BookReleaseYear">Erscheinungsjahr: {{ book.releaseYear }}</h3>
    <h3 id="BookSumTitle">Zusammenfassung: </h3>
    <div id="BookSummary">{{ book.description }}</div>
    <div id="BookStatusSpace">
      <h2 id="BookStatus">Verfügbar</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ['book']
};
</script>

<style>
  #Book{
    display: grid;
    grid-template-columns: 20vw 50vw;
    grid-template-rows: 5vh 5vh 5vh 5vh 5vh 5vh 5vh;
    width: 70vw;
    height: 35vh;
    padding-bottom: 1vh;
    margin-left: 3vw;
    justify-content: left;
    border-bottom: black 1px solid;

  }

  #BookCoverspace{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 7;
    width: 20vw;
    height: 30vh;   
  }

  #BookCover{
    width: 18vw;
    height: 28vh;
    margin-top: 1vh; 
    margin-left: 1vw;
  }

  #BookStatusSpace{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 7;
    grid-row-end: 8;
    width: 20vw;
    height: 5vh;
  }

  #BookStatus{
    width: 18vw;
    height: 5vh;
    margin-top: 1vh; 
    margin-left: 1vw;
    text-align: center;
  }

  #BookTitle{
    grid-column-start:2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2; 
    padding-top: 1vh;
    padding-left: 1vw;
  }

  #BookAuthor{
    grid-column-start:2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    padding-top: 1vh;
    padding-left: 1vw;
  }

  #BookReleaseYear{
    grid-column-start:2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
    padding-top: 1vh;
    padding-left: 1vw;
  }

  #BookSumTitle{
    grid-column-start:2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
    padding-top: 1vh;
    padding-left: 1vw;
  }
  
  #BookSummary{
    grid-column-start:2;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 7;
    width: 50vw;
    padding-left: 1vw;
    white-space: pre-wrap;
    overflow-y: auto;
  }

</style>