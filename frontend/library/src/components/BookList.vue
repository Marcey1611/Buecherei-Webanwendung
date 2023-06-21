<template>
  <div id="BookList">
    <div id="SearchFilterBar">
      <div id="SearchField"><v-text-field @clear="handleInput" @input="handleInput" v-model="searchInput"
          placeholder="Suche" clearable prepend-icon="mdi-magnify"></v-text-field></div>
      <div id="filterChevronButton"><v-icon :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"></v-icon></div>
      <br>
      <v-expand-transition>
        <div v-show="show" id="filterBar">
          <div id="filterLanguages"><v-select @blur="handleInput" clearable chips label="Sprache"
              v-model="selectedLanguages" :items="languages" multiple></v-select>
          </div>
          <div id="filterGenre">
            <v-autocomplete v-model="filterGenreValue" label="Genre" :items="genres" @click="getFilterGenreValues" @blur="handleInput"></v-autocomplete>
          </div>
          <div id="filterYearFrom">
            <v-text-field type="number" v-model="filterYearValue[0]" @blur="handleInput"
              label="Jahr: von "></v-text-field>
          </div>
          <div id="filterYearTo">
            <v-text-field type="number" v-model="filterYearValue[1]" @blur="handleInput" label=" bis "></v-text-field>
          </div>
          <div id="filterAvailable">
            <v-switch v-model="filterAvailableValue" label="Verfügbar"
              :class="{ 'switch-on': filterAvailableValue, 'switch-off': !filterAvailableValue }"
              @change="handleInput"></v-switch>
          </div>
          <div id="filterPages">
            <v-range-slider @click="handleInput" max="1000" label="Seitenzahl" color="#616161" track-fill-color="#0E639C"
              thumb-color="#0E639C" v-model="filterPagesValue" step="1" thumb-label="always"></v-range-slider>
          </div>
        </div>
      </v-expand-transition>
    </div>
    <transition-group name="fade" tag="div">
      <div class="Books" v-for="book in books" :key="book.id">
        <Book :book="book" />
        <div id="borrow">
          <v-text-field class="BookListBorrowInput" v-if="book.available" type="text" placeholder="Vorname"
            v-model="book.firstName"></v-text-field>
          <v-text-field class="BookListBorrowInput" v-if="book.available" type="text" placeholder="Nachname"
            v-model="book.lastName"></v-text-field>
          <v-btn id="BookListBorrowButton" v-if="book.available" @click="borrow(book)">Ausleihen</v-btn>
          <v-btn id="BookListHandBackButton" v-if="!book.available" @click="handback(book)">Zurückgeben</v-btn>
        </div>
      </div>
    </transition-group>



  </div>
</template>

<script>
import Book from './Book.vue';
import axios from 'axios';
var date = new Date();
export default {
  components: {
    Book
  },
  data: function () {
    return {
      filterGenreValue: '',
      genres: [],
      filterYearValue: [0, date.getFullYear()],
      filterAvailableValue: true,
      filterPagesValue: [0, 1000],
      show: false,
      languages: ['English', 'German', 'French', 'Italian'],
      selectedLanguages: [],
      books: [],
      searchInput: '',
    };
  },
  methods: {
    borrow: function (book) {
      axios
        .put("http://localhost:8080/books/" + book.id, {
          firstName: book.firstName,
          lastName: book.lastName,
          available: false,
          borrowCount: book.borrowCount + 1

        })
        .then(response => {
          this.books = response.data;
          this.handleInput();
        });
    },
    handback: function (book) {
      axios
        .put("http://localhost:8080/books/" + book.id, {
          firstName: '',
          lastName: '',
          available: true

        })
        .then(response => {
          this.books = response.data;
          this.handleInput();
        });
    },
    getFilterGenreValues() {
      axios.get("http://localhost:8080/books/genre").then(response => {
          this.genres = response.data;
        });
    },
    async handleInput() {
      try {
        const response = await axios.get('http://localhost:8080/books/search', {
          params: {
            searchText: this.searchInput,
            languages: this.selectedLanguages,
            pages: this.filterPagesValue,
            available: this.filterAvailableValue,
            year: this.filterYearValue,
            genre: this.filterGenreValue,
          }
        });
        this.books = response.data;
        console.log(this.books)
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.handleInput();
  }
};
</script>

<style>
.Books {
  margin-top: 3vh;
  margin-bottom: 3vh;

}

#borrow {
  background-color: #2d2d2d;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 82vw;
  height: 11vh;
  padding-top: 3vh;
  padding-bottom: 1vh;
  padding-left: 1vw;
  padding-right: 1vw;
  justify-content: left;
  border-bottom: #616161 1px solid;
  color: white;
}

.BookListBorrowInput {
  margin-right: 1vw;
  height: 6vh;
}

#BookListBorrowButton {
  height: 6vh;
  background-color: #0E639C;
}

#BookListHandBackButton {
  height: 6vh;
  background-color: #0E639C;
}

#SearchFilterBar {
  padding-top: 1vh;
  padding-left: 1vw;
  background-color: #2d2d2d;
  width: 82vw;
  display: grid;
  grid-template-columns: 5fr 1fr 1fr;


}

#SearchField {
  width: 75vw;
  color: white;
}

#filterChevronButton {
  margin-left: 1vw;
  padding-top: 1vh;
  font-size: 3vh;
  height: 4vh;
  width: 4vh;
  text-align: center;
  color: white;
  text-align: center;
}

#filterBar {
  padding-top: 2vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 35vh;
  margin-left: 3vw;
  margin-right: 3vw;
  color: white;
}

#filterLanguages {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 2;
}

#filterGenre{
  grid-column-start: 6;
  grid-column-end: 10;
  grid-row-start: 1;
  grid-row-end: 2;
}

#filterAvailable {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
}

#filterYearFrom {
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 3;
}

#filterYearTo {
  grid-column-start: 8;
  grid-column-end: 10;
  grid-row-start: 2;
  grid-row-end: 3;
}

#filterPages {
  margin-top: 1vh;
  grid-column-start: 1;
  grid-column-end: 9;
  grid-row-start: 3;
  grid-row-end: 4;
}

.switch-on {
  color: #0E639C;
}

.switch-off {
  color: #a6a6a6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>