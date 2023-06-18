<template>
  <div id="BookList">
    <div id="SearchFilterBar">
      <v-text-field id="SearchField" @input="handleInput()" v-model="searchInput" placeholder="Search"></v-text-field>
      <h2 id="filterH3">Filter</h2>
      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show" id="filterChevronButton"></v-btn>
      <div v-show="show" id="filterBar">
        <div id="filterLanguages"><v-select @blur="handleInput" clearable chips label="Language"
            v-model="selectedLanguages" :items="languages" multiple></v-select></div>
        </div>
    </div>
    <div class="Books" v-for="book in books" :key="id">
      <Book :book="book" />
      <div id="borrow">
        <v-text-field class="BookListBorrowInput" v-if="book.available" type="text" placeholder="First name"
          v-model="book.firstName"></v-text-field>
        <v-text-field class="BookListBorrowInput" v-if="book.available" type="text" placeholder="Last name"
          v-model="book.lastName"></v-text-field>
        <v-btn id="BookListBorrowButton" v-if="book.available" @click="borrow(book)">Borrow</v-btn>
        <v-btn id="BookListHandBackButton" v-if="!book.available" @click="handback(book)">Hand back</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Book from './Book.vue';
import axios from 'axios';

export default {
  components: {
    Book
  },
  data: function () {
    return {
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
          available: false

        })
        .then(response => {
          this.books = response.data;
          this.getGoogleImg();
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
          this.getGoogleImg();
        });
    },
    async handleInput() {
      try {
        const response = await axios.get('http://localhost:8080/books/search/', {
          params: { searchText: this.searchInput,
                    languages: this.selectedLanguages }
        });
        this.books = response.data;
        this.getGoogleImg();
      } catch (error) {
        console.error(error);
      }
    },
    getGoogleImg() {
      let imgresp
      this.books.forEach(element => {
        axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: 'isbn:' + element.isbn,
            key: 'AIzaSyA8Dvs5T5N5GphcuRKPx2ilCcRJWSIvU1A'
          }
        }).then(response => {
          try {
            imgresp = response.data.items[0].volumeInfo.imageLinks.thumbnail
            element.img = imgresp
          } catch {
            console.log('Error')
          }
        })

      });

    }

  },
  mounted() {
    axios.get("http://localhost:8080/books/").then(response => {
      this.books = response.data;
      this.getGoogleImg()
    });
  }
};
</script>

<style>
#BookList {}

.Books {
  margin-top: 20px;
  margin-bottom: 20px;

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
}

.BookListBorrowInput {
  margin-right: 1vw;
  height: 6vh;
  color: #a6a6a6;
  background-color: #3c3c3c;
}

#BookListBorrowButton {
  height: 6vh;
  background-color: #0E639C;
  color: white;
}

#BookListHandBackButton {
  height: 6vh;
  background-color: #0E639C;
  color: white;
}

#SearchFilterBar {
  padding-top: 1vh;
  padding-left: 1vw;
  margin-right: 50vw;
  background-color: #2d2d2d;
  width: 82vw;
  display: grid;
  grid-template-columns: 5fr 1fr 1fr;


}

#SearchField {
  width: max-content;
  padding-left: 1vw;
  background-color: #3c3c3c;
  color: #a6a6a6;

}

#filterH3 {
  padding-top: 0.6vw;
  padding-left: 5vw;
  color: #a6a6a6;
  text-align: center;
}

#filterChevronButton {
  margin-top: 1vh;
  height: 4vh;
  width: 4vh;
  text-align: center;
}

#filterBar {
  height: 30vh;
}

#filterLanguages {
  background-color: #616161;
  color: white;
  height: 6vh;
  width: 30vw;}
</style>