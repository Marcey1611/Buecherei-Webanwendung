<template>
  <div id="Book">
    <div id="BookCoverspace">
      <img id="BookCover" :src="book.img" alt="" style="max-width: 100%;max-height: 100%;">
    </div>
    <h2 id="BookTitle">Title: {{ book.title }}</h2>
    <h3 id="BookAuthor">Autor: {{ book.author }}</h3>
    <h3 id="BookReleaseYear">Erscheinungsjahr: {{ book.releaseYear }}</h3>
    <h3 id="BookSumTitle">Zusammenfassung: </h3>
    <div id="BookSummary">{{ book.description }}</div>
  </div>
</template>

<script>
export default {
  props: ['book'],
  /*data() {
    return {
      resImgURL: ''
    }
  },
  methods: {
    checkImage:  function (url) {
      var img = new Image();
      img.src = url
      img.addEventListener('load', function () {
        if (img.naturalWidth >= 2 && img.naturalHeight >= 2) {
          console.log("Image has the right resulution") 
          return false
        } else {
          console.log("doesnot have the right resulution")
          return true
        }
      })
    },
    getImgUrl(event){
      //this.book.img='https://covers.openlibrary.org/b/isbn/' + this.book.isbn + '-L.jpg'
      /* try {
        this.resImgURL = 'https://covers.openlibrary.org/b/isbn/' + this.book.isbn + '-L.jpg'
        if (this.checkImage(this.resImgURL)) {
        }
      } catch {
      } 
    }

  },
    mounted() {
      document.addEventListener('resize',this.getImgUrl())
  } */

};
</script>

<style>
#Book {
  display: grid;
  grid-template-columns: 20vw 50vw;
  grid-template-rows: 5vh 5vh 5vh 5vh 5vh 5vh 5vh;
  width: 70vw;
  height: 30vh;
  padding-bottom: 1vh;
  margin-left: 3vw;
  justify-content: left;
  /*border-bottom: black 1px solid;*/

}

#BookCoverspace {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 7;
  width: 20vw;
  height: 30vh;
}

/*#BookCover {
  width: 18vw;
  height: 28vh;
  margin-top: 1vh;
  margin-left: 1vw;
}*/

/*#BookStatusSpace{
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
  }*/

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
  width: 50vw;
  padding-left: 1vw;
  white-space: pre-wrap;
  overflow-y: auto;
}
</style>