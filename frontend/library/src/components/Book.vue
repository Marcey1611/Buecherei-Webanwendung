<template>
  <div id="book">
    <div id="bookCoverspace">
      <img id="bookCover" :src="book.img" alt="" style="max-width: 100%;max-height: 100%;">
    </div>
    <h1 id="bookTitle">{{ book.title }}</h1>
    <div>
      <v-btn id="bookOwnerIcon">
        <v-icon @click="show = !show">mdi-account</v-icon>
        <v-tooltip activator="parent" location="start">
          <div>
            <h3>{{ book.owner.name }}</h3>
            <h4>{{ book.owner.phoneNumber }}</h4>
            <h4>{{ book.owner.eMail }}</h4>
          </div>
        </v-tooltip>
      </v-btn>
    </div>
    <h2 id="bookAuthor">{{ book.author }}</h2>
    <h3 id="bookGenre">Genre: {{ book.genre }}</h3>
    <h3 id="bookReleaseYear">{{ book.releaseYear }} veröffentlicht</h3>
    <h3 id="bookPages">{{ book.pages }} Seiten</h3>
    <h3 id="bookLang">Sprache: {{ book.language }}</h3>
    <h3 id="bookSumTitle">Zusammenfassung: </h3>
    <div id="bookSummary">{{ book.description }}</div>
  </div>
  <div id="borrow">
    <v-text-field class="bookListBorrowInput" v-if="book.available" type="text" placeholder="Vorname"
      v-model="book.firstName"></v-text-field>
    <v-text-field class="bookListBorrowInput" v-if="book.available" type="text" placeholder="Nachname"
      v-model="book.lastName"></v-text-field>
    <v-btn id="bookListBorrowButton" v-if="book.available" @click="overlayBorrow = !overlayBorrow">Ausleihen</v-btn>
    <v-overlay id="overlayBorrowOverlay" v-model="overlayBorrow" contained class="align-center justify-center">
      <div >
        <v-icon id="overlayBorrowClose" @click="closeOverlayBorrow">mdi-close</v-icon>
        <div id="overlayBorrowText">
          <h3>Weiterse Vorgehen:</h3>
        <br>
        <h4>Herzlichen Glückwunsch!</h4>
        <p>Du hast soeben das Buch {{ book.title }} von {{ book.author }} ausgeliehen.</p>
        <p>Jetzt kannst du dich bei seinem Besitzer {{ book.owner.name }} unter den folgenden Kontaktdaten melden.</p>
        <br>
        <p>Kontaktdaten:</p>
        <p>Handynummer des Besitzers: {{ book.owner.phoneNumber }}</p>
        <p>E-Mail des Besitzers: {{ book.owner.eMail }}</p>
        <br>
        <h4>Um den Vorgang abzuschließen und um zu bestätigen das du das Buch sicher ausleihen möchtest,</h4>
        <h4>klicke auf den Button unten, du gelangst so zur Bücherliste zurück</h4>
        <br><v-btn id="overlayBorrowButton" @click="borrow(book)">Bestätigen</v-btn>
        </div>
        
        
      </div>
      
    </v-overlay>
    <v-btn id="bookListHandBackButton" v-if="!book.available" @click="handback(book)">Zurückgeben
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      overlayBorrow: false
    };
  },
  props: ['book'],
  methods: {
    borrow: function (book) {
      this.overlayBorrow = !this.overlayBorrow;
      this.$emit("borrow", this.book);
    },
    handback: function (book) {
      this.$emit("handback", this.book);
    },
    closeOverlayBorrow(){
      this.overlayBorrow=false;
    }
  }
};
</script>

<style>
#book {
  background-color: #2d2d2d;
  color: #828282;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  display: grid;
  grid-template-columns: 15vw 10vw 10vw 10vw 10vw 10vw 10vw 5vw;
  grid-template-rows: 6vh 6vh 6vh 6vh 10vh;
  width: 82vw;
  height: 34vh;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 1vh 1vh 0vh 0vh;
}

#bookCoverspace {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 7;
  width: 20vw;
  height: 30vh;
}

#bookTitle {
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 1;
  grid-row-end: 2;
}

#bookOwnerIcon {
  grid-column-start: 8;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 2;
  background-color: #0E639C;
  color: white;

}

#bookAuthor {
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
}

#bookGenre {
  grid-column-start: 5;
  grid-column-end: 8;
  grid-row-start: 2;
  grid-row-end: 3;
}

#bookReleaseYear {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
}

#bookPages {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 3;
  grid-row-end: 4;
}

#bookLang {
  grid-column-start: 6;
  grid-column-end: 8;
  grid-row-start: 3;
  grid-row-end: 4;
}

#bookSumTitle {
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 4;
  grid-row-end: 5;
}

#bookSummary {
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 5;
  grid-row-end: 6;
  width: 60vw;
  white-space: pre-wrap;
  overflow-y: auto;
}

#borrow {
  background-color: #2d2d2d;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 82vw;
  height: 13vh;
  padding-top: 5vh;
  padding-bottom: 1vh;
  padding-left: 1vw;
  padding-right: 1vw;
  justify-content: left;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  border-bottom: #616161 1px solid;
  border-radius: 0vh 0vh 1vh 1vh;
  color: white;
}

.bookListBorrowInput {
  margin-right: 1vw;
  height: 6vh;
}

#bookListBorrowButton {
  height: 6vh;
  background-color: #0E639C;
  color: white;
}
#overlayBorrowOverlay{
  position: fixed;
}
#overlayBorrowText{
  text-align: center;
  background-color: #2d2d2d;
  color: #828282;
  width: max-content;
  height: max-content;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 5vw;
  padding-right: 5vw;
  border-radius: 1vh 1vh 1vh 1vh;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
}
#overlayBorrowClose{
  float: right;
  padding-top: 1vh;
  padding-right: 1vw;
}
#overlayBorrowButton{
  background-color: #0E639C;
  color:white;
  text-align: center;
}
#bookListHandBackButton {
  height: 6vh;
  background-color: #0E639C;
  color: white;
}</style>