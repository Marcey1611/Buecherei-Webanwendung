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
            <h3>{{ book.owner.firstName }}</h3>
            <h4>{{ book.owner.phoneNumber }}</h4>
            <h4>{{ book.owner.eMail }}</h4>
          </div>
        </v-tooltip>
      </v-btn>
    </div>
    <h2 id="bookAuthor">{{ book.author }}</h2>
    <h3 id="bookGenre">Genre: {{ book.genre }}</h3>
    <div id="moreInfosChevronButton">
      <v-icon :icon="showMoreInfos ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showMoreInfos = !showMoreInfos"></v-icon>
    </div>
  </div>


  <v-expand-transition>
  <div v-if="showMoreInfos" id="bookMoreInfos">
    <div id="bookMoreInfosYearPagesLang">
      <h3>Das Buch wurde {{ book.releaseYear }} mit {{ book.pages }} Seiten auf {{ book.language }} veröffentlicht.</h3>
    </div>
    <h3 id="bookSumTitle">Zusammenfassung: </h3>
    <div id="bookSummary">{{ book.description }}</div>


    <v-text-field class="bookListBorrowInputFirstName" v-if="book.available" type="text" placeholder="Vorname"
      v-model="book.firstName"></v-text-field>
    <v-text-field class="bookListBorrowInputLastName" v-if="book.available" type="text" placeholder="Nachname"
      v-model="book.lastName"></v-text-field>
    <v-btn id="bookListBorrowButton" v-if="book.available" @click="overlayBorrow = true">Ausleihen</v-btn>
    <v-overlay id="overlayBorrowOverlay" v-model="overlayBorrow" contained class="align-center justify-center">
      <div>
        <v-icon id="overlayBorrowClose" @click="overlayBorrow = false">mdi-close</v-icon>
        <div id="overlayBorrowText">
          <h3>Weiterse Vorgehen:</h3>
          <br>
          <h4>Herzlichen Glückwunsch!</h4>
          <p>Du hast soeben das Buch {{ book.title }} von {{ book.author }} ausgeliehen.</p>
          <p>Jetzt kannst du dich bei seinem Besitzer {{ book.owner.firstName }} {{ book.owner.lastName }} unter den folgenden Kontaktdaten melden.
          </p>
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
  </v-expand-transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      overlayBorrow: false,
      showMoreInfos: false
    };
  },
  props: ['book'],
  methods: {
    borrow: function (book) {
      this.overlayBorrow = false;
      this.$emit("borrow", this.book);
    },
    handback: function (book) {
      this.$emit("handback", this.book);
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
  padding-bottom: 3vh;
  display: grid;
  grid-template-columns: 15vw 55vw 5vw;
  grid-template-rows: 8vh 6vh 6vh;
  width: 82vw;
  height: max-content;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 1vh 1vh 0vh 0vh;
  border-bottom: #828282 1px solid;
}

#bookCoverspace {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
  width: 15vh;
  height: 20vh;
}

#bookTitle {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
}

#bookOwnerIcon {
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 2;
  background-color: #0E639C;
  color: white;

}

#bookAuthor {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
}

#bookGenre {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
}

#moreInfosChevronButton {
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 3;
  grid-row-end: 4;
  text-align: center;
  padding-right: 0.75vw;
  font-size: 3vh;
  color: white;
}

#bookMoreInfos {
  display: grid;
  grid-template-columns: 25vw 25vw 25vw;
  grid-template-rows: 5vh 5vh 10vh 10vh;
  width: 82vw;
  color: #828282;
  background-color: #2d2d2d;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-top: 3vh;
  padding-bottom: 1vh;
  border-radius: 0vh 0vh 1vh 1vh;
  
}

#bookMoreInfosYearPagesLang {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
}

#bookSumTitle {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
  margin-bottom: 10px;
}

#bookSummary {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
  white-space: pre-wrap;
  overflow-y: auto;
}

.bookListBorrowInputFirstName {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 5;
  padding-right: 2vw;
  padding-top: 3vh;
  height: 6vh;
  color: white;
}

.bookListBorrowInputLastName {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 5;
  padding-right: 2vw;
  padding-top: 3vh;
  height: 6vh;
  color: white;
}

#bookListBorrowButton {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 5;
  margin-top: 3vh;
  height: 6vh;
  background-color: #0E639C;
  color: white;
}

#overlayBorrowOverlay {
  position: fixed;
}

#overlayBorrowText {
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

#overlayBorrowClose {
  float: right;
  padding-top: 1vh;
  padding-right: 1vw;
}

#overlayBorrowButton {
  background-color: #0E639C;
  color: white;
  text-align: center;
}

#bookListHandBackButton {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 5;
  height: 6vh;
  background-color: #0E639C;
  color: white;
}
</style>