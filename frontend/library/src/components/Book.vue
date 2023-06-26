<!--$4&AaLk#3@jG6y]xW~2mBd[0Cn^vZp(l1N`9O)bTfV}I?XrU{5]!Qq7eY+K;:S]8Dh,c.Mi<Ft*Rg>zHsE/-->
<template>
  <!-- Buch normale Ansicht -->
  <div id="book">
    <div id="bookCoverspace">
      <div>
        <v-chip class="borrowCountChip" color="#ffffff" :style="{ backgroundColor: '#0E639C' }"
          v-tooltip="{ content: text }" @mouseover="showFullText = true" 
          @mouseout="showFullText = false"> {{ showFullText ? text : truncatedText }}
        </v-chip>
      </div>
      <img id="bookCover" :src="book.img" alt="" style="max-width: 100%;max-height: 100%;">
    </div>
    <h1 id="bookTitle">{{ book.title }}</h1>
    <div>
      <v-btn id="bookOwnerIcon">
        <v-icon>mdi-account</v-icon>
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
  <!-- Buch Weitere Infos Bereich -->
  <v-expand-transition>
    <div v-if="showMoreInfos" id="bookMoreInfos">
      <div id="bookMoreInfosYearPagesLang">
        <h3>Das Buch wurde {{ book.releaseYear }} mit {{ book.pages }} Seiten auf
          {{ book.language }} veröffentlicht.</h3>
      </div>
      <h3 id="bookSumTitle">Zusammenfassung: </h3>
      <div id="bookSummary">{{ book.description }}</div>
      <!-- Ausleihen Leiste -->
      <v-text-field class="bookListBorrowInputFirstName" v-if="book.available" type="text" label="Vorname"
        v-model="book.firstName"></v-text-field>
      <v-text-field class="bookListBorrowInputLastName" v-if="book.available" type="text" label="Nachname"
        v-model="book.lastName"></v-text-field>
      <v-btn id="bookListBorrowButton" v-if="book.available" @click="validateBorrowData()">Ausleihen</v-btn>
      <v-overlay id="overlayBorrowOverlay" v-model="overlayBorrowError" contained class="align-center justify-center">
        <div>
          <v-icon class="overlayBorrowClose" @click="overlayBorrowError = false">mdi-close
          </v-icon>
          <div class="overlayBorrowText">
            <h3 id="overlayBorrorErrorMessage">Bitte gib eine gültigen Vorname und Nachnamen ein!</h3>
          </div>
        </div>
      </v-overlay>
      <v-overlay id="overlayBorrowOverlay" v-model="overlayBorrow" contained class="align-center justify-center">
        <div>
          <v-icon class="overlayBorrowClose" @click="overlayBorrow = false">mdi-close</v-icon>
          <div class="overlayBorrowText">
            <h3>Weiterse Vorgehen:</h3>
            <br>
            <h4>Herzlichen Glückwunsch!</h4>
            <p>Du hast soeben das Buch {{ book.title }} von {{ book.author }} ausgeliehen.</p>
            <p>Jetzt kannst du dich bei seinem Besitzer {{ book.owner.firstName }}
              {{ book.owner.lastName }} unter den folgenden Kontaktdaten melden.</p>
            <br>
            <p>Kontaktdaten:</p>
            <p>Handynummer des Besitzers: {{ book.owner.phoneNumber }}</p>
            <p>E-Mail des Besitzers: {{ book.owner.eMail }}</p>
            <br>
            <h4>Um den Vorgang abzuschließen und um zu bestätigen das du das Buch sicher
              ausleihen möchtest,</h4>
            <h4>klicke auf den Button unten, du gelangst so zur Bücherliste zurück</h4>
            <br>
            <v-btn id="overlayBorrowButton" @click="borrow(book)">Bestätigen</v-btn>
          </div>
        </div>
      </v-overlay>
      <v-btn id="bookListHandBackButton" v-if="!book.available" @click="handback(book)">Zurückgeben</v-btn>
    </div>
  </v-expand-transition>
</template>

<script>
var buchstabenRegEx = /^[A-Za-z]+$/;

export default {
  data() {
    return {
      overlayBorrow: false,
      overlayBorrowError: false,
      showMoreInfos: false,
      showFullText: false
    };
  },
  emits: ['borrow', 'handback'],
  props: ['book'],

  computed: {
    text() {
      return this.book.borrowCount + 'x ausgeliehen';
    },
    truncatedText() {
      return this.book.borrowCount + 'x';
    }
  },
  methods: {
    borrow() {
      this.overlayBorrow = false;
      this.$emit("borrow", this.book);
    },

    handback() {
      this.$emit("handback", this.book);
    },
    
    validateBorrowData() {
      console.log(this.book.firstName);
      if (buchstabenRegEx.test(this.book.firstName)) {
        this.overlayBorrow = true;
      } else {
        this.overlayBorrowError = true;
      }
    }
  },
};
</script>

<style>
@import "../assets/book.module.css";
</style>