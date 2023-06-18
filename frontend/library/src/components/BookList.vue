<template>
  <div id="BookList">
    <div id="SearchBar">
      <v-text-field @input="handleInput()" v-model="searchInput" id="SearchField"></v-text-field>
    </div>
    <div class="Books" v-for="book in books" :key="id">
      <Book :book="book" />
      <div id="borrow">
        <input v-if="book.available" type="text" placeholder="First name" v-model="book.firstName">
        <input v-if="book.available" type="text" placeholder="Last name" v-model="book.lastName">
        <v-btn v-if="book.available" @click="borrow(book)">Borrow</v-btn>
        <v-btn v-if="!book.available" @click="handback(book)">Hand back</v-btn>
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
      anzeigen: false,
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
        });
    },
    async handleInput() {
      try {
        const response = await axios.get('http://localhost:8080/books/search/', {
          params: { searchText: this.searchInput }
        });
        this.books = response.data;
        this.getImgUrl();
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
          console.log(element.isbn)
          console.log(response)
          try {
            imgresp = response.data.items[0].volumeInfo.imageLinks.thumbnail
            element.img = imgresp
            console.log(imgresp)
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
#BookList {
  background-color: bisque;
  white-space: pre;
}

.Books {
  margin-top: 20px;
  margin-bottom: 20px;

}

#borrow {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 70vw;
  height: 5vh;
  padding-bottom: 1vh;
  margin-left: 3vw;
  padding-left: 1vw;
  justify-content: left;
  border-bottom: black 1px solid;
}

#SearchBar {
  background-color: grey;
  margin-right: 50vw;

}

#SearchField {
  background-color: aqua;
  width: 50vw;

}</style>