<!--$4&AaLk#3@jG6y]xW~2mBd[0Cn^vZp(l1N`9O)bTfV}I?XrU{5]!Qq7eY+K;:S]8Dh,c.Mi<Ft*Rg>zHsE/-->
<template>
  <div id="BookList">
    <!-- Such- und Filterleiste -->
    <div id="SearchFilterBar">
      <div id="SearchField">
        <v-text-field @clear="handleInput" @input="handleInput" v-model="searchInput" 
          placeholder="Suche" clearable prepend-icon="mdi-magnify"></v-text-field>
      </div>
      <div id="filterChevronButton">
        <v-icon :icon="showFilterBar ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showFilterBar = !showFilterBar"></v-icon>
      </div>
    </div>
    <v-expand-transition>
      <div v-show="showFilterBar" id="filterBar">
        <div id="filterLanguages">
          <v-autocomplete class="filterLangGenreDropdown" chips @click="getFilterLangValues" 
            @blur="handleInput" clearable deletable-chips label="Sprache" 
            v-model="selectedLanguages" :items="languages" multiple 
            :menu-props="{ maxHeight: 250 }"></v-autocomplete>
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
            label=" bis "></v-text-field>
        </div>
        <div id="filterAvailable">
          <v-switch v-model="filterAvailableValue" label="Verfügbar"
            :class="{ 'switch-on': filterAvailableValue, 'switch-off': !filterAvailableValue }"
            @change="handleInput"></v-switch>
        </div>
        <div id="filterPages">
          <v-range-slider @click="handleInput" max="1000" label="Seitenzahl" 
            color="#616161" track-fill-color="#0E639C" thumb-color="#0E639C" 
            v-model="filterPagesValue" step="1" thumb-label="always"></v-range-slider>
        </div>
      </div>
    </v-expand-transition>
    <!-- Bücher -->
    <transition-group name="fade" tag="div">
      <div class="Books" v-for="book in books" :key="book.id">
        <Book :book="book" @borrow="borrow" @handback="handback" />
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
    getFilterGenreValues: function () {
      axios.get("http://localhost:8080/books/genre").then(response => {
        this.genres = response.data;
      });
    },
    getFilterLangValues: function () {
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
@import "../assets/bookList.module.css";
</style>