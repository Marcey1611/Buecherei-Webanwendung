<template>
  <div id="Book">
    <div id="BookCoverspace">
      <img id="BookCover" :src="book.img" alt="" style="max-width: 100%;max-height: 100%;">
    </div>
    <h2 id="BookTitle">{{ book.title }}</h2>
    <h3 id="BookAuthor">{{ book.author }}</h3>
    <h3 id="BookReleaseYear">Erscheinungsjahr: {{ book.releaseYear }}</h3>
    <h3 id="BookSumTitle">Zusammenfassung: </h3>
    <div id="BookSummary">{{ book.description }}</div>
  </div>
</template>

<script>
export default {
  props: ['book'],
};
</script>

<style>
#Book {
  background-color: #2d2d2d;
  color: #828282;
  padding-left: 1vw;
  padding-top: 1vh;
  display: grid;
  grid-template-columns: 20vw 50vw;
  grid-template-rows: 5vh 5vh 5vh 5vh 5vh 5vh 5vh;
  width: 82vw;
  height: 32vh;
  justify-content: left;
}

#BookCoverspace {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 7;
  width: 20vw;
  height: 30vh;
}

#BookTitle {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  padding-top: 1vh;
  padding-left: 1vw;
}

#BookAuthor {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  padding-top: 1vh;
  padding-left: 1vw;
}

#BookReleaseYear {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
  padding-top: 1vh;
  padding-left: 1vw;
}

#BookSumTitle {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 5;
  padding-top: 1vh;
  padding-left: 1vw;
}

#BookSummary {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 7;
  width: 60vw;
  padding-left: 1vw;
  white-space: pre-wrap;
  overflow-y: auto;
}
</style>