<template>
  <div id="BookList">
    <div id="SearchFilterBar">
      <div id="SearchField">
        <v-text-field @clear="handleInput" @input="handleInput" v-model="searchInput"
          placeholder="Suche" clearable prepend-icon="mdi-magnify"></v-text-field></div>
      <div id="filterChevronButton">
        <v-icon :icon="showFilterBar ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="showFilterBar = !showFilterBar"></v-icon>
      </div></div>
      <v-expand-transition>
        <div v-show="showFilterBar" id="filterBar">
          <div id="filterLanguages">
            <v-autocomplete class="filterLangGenreDropdown" chips @click="getFilterLangValues" @blur="handleInput" clearable deletable-chips label="Sprache" 
              v-model="selectedLanguages" :items="languages" multiple  :menu-props="{ maxHeight:  250}"></v-autocomplete>
          </div>
          <div id="filterGenre">
            <v-autocomplete v-model="filterGenreValue" label="Genre" :items="genres" 
              @click="getFilterGenreValues" @blur="handleInput"></v-autocomplete>
          </div>
          <div id="filterYearFrom">
            <v-text-field type="number" v-model="filterYearValue[0]" @blur="handleInput"
              label="Jahr: von "></v-text-field>
          </div>
          <div id="filterYearTo">
            <v-text-field type="number" v-model="filterYearValue[1]" @blur="handleInput" 
              label=" bis " ></v-text-field>
          </div>
          <div id="filterAvailable">
            <v-switch v-model="filterAvailableValue" label="Verfügbar"
              :class="{ 'switch-on': filterAvailableValue, 'switch-off': !filterAvailableValue }"
              @change="handleInput"></v-switch>
          </div>
          <div id="filterPages">
            <v-range-slider @click="handleInput" max="1000" label="Seitenzahl" color="#616161" 
              track-fill-color="#0E639C" thumb-color="#0E639C" v-model="filterPagesValue" step="1" 
              thumb-label="always"></v-range-slider>
          </div>
        </div>
      </v-expand-transition>
    
    <transition-group name="fade" tag="div">
      <div class="Books" v-for="book in books" :key="book.id">
        <Book :book="book" @borrow="borrow" @handback="handback"/>
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
      showFilterBar: false,
      languages: [],
      selectedLanguages: [],
      books: [],
      searchInput: '',
    };
  },
  methods: {
    borrow: function (e) {
      axios
        .put("http://localhost:8080/books/" + e.id, {
          firstName: e.firstName,
          lastName: e.lastName,
          available: false,
        })
        .then(response => {
          this.books = response.data;
          this.handleInput();
        });
    },
    handback: function (e) {
      axios
        .put("http://localhost:8080/books/" + e.id, {
          firstName: '',
          lastName: '',
          available: true
        })
        .then(response => {
          this.books = response.data;
          this.handleInput();
        });
    },
    getFilterGenreValues: function() {
      axios.get("http://localhost:8080/books/genre").then(response => {
          this.genres = response.data;
        });
    },
    getFilterLangValues: function() {
      axios.get("http://localhost:8080/books/language").then(response => {
          this.languages = response.data;
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
  width: 95%;
}
#SearchFilterBar {
  padding-top: 1vh;
  padding-left: 1vw;
  padding-bottom: 1vh;
  background-color: #2d2d2d;
  width: 95%;
  display: grid;
  grid-template-columns: 95% 5%;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 1vh 1vh 0vh 0vh;
}
#SearchField {
  padding-top: 1vh;
  padding-right: 1vw;
  width: 100%;
  color: white;
}
#filterChevronButton {
  grid-column-start: 2;
  grid-column-end: 3;
  padding-top: 2vh;
  
  font-size: 3vh;
  height: 4vh;
  width: 4vh;
  text-align: center;
  color: #828282;
}
#filterChevronButton:hover{
  color: white;
}
#filterChevronButton:active{
  color: #0E639C;
}
#filterBar {
  width: 95%;
  background-color: #2d2d2d;
  
  padding-left: 2vw;
  padding-right: 2vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  color: white;
  border-radius: 0vh 0vh 1vh 1vh;
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