<template>
    <!-- Top 10 Bücher Cover -->
    <h1 id="title">Top 10 Bücher</h1>
    <div id="top10Books">
        <v-sheet class="mx-auto" width="87vw" height="50vh" color="#2d2d2d">
            <v-slide-group v-model="model" class="pa-4" center-active>
                <v-slide-group-item v-for="book in this.top10books" :key="book" 
                    v-slot="{ isSelected, toggle }">
                    <v-card :color="isSelected ? '#0E639C' : '#828282'" class="ma-4" 
                        height="350px" width="200px" @click="toggle">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-scale-transition>
                                <img id="cover" :src="book.img" alt="Werbung" 
                                    @click="showMoreInfos(book)">
                            </v-scale-transition>
                        </div>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
    </div>
    <br>
    <!-- Ausgewähltes Buch -->
    <div v-if="showMoreInfosBool" id="top10BooksSelectedBooks">
        <Book :book="this.selectedBook" @borrow="borrow" @handback="handback" />
    </div>
    <br>
    <!-- Weitere Infos -->
    <div id="generalInfos">
        <h1>Wie es funktioniert!?</h1>
        <br>
        <p>Hi, du bist wahrscheinlich neu hier und willt wissen wie "The OnLibrary" 
            funktioniert.</p>
        <br>
        <p>Das Grundprinzip hinter dieser Website ist eine einfach Bücherei nur moderner 
            und innovativer. Eigentlich ist es ganz einfach:</p>
        <br>
        <p>Jeder der möchte kann bei uns, über die Add-Seite, seine Bücher hochladen, um 
            diese anderen ausleihen zu können. Auf der Books-Seite siehst du alle Bücher 
            der Community, über die Filter-und Such-Bar kannst du die Liste nach belieben 
            filtern und durchsuchen. Wenn du ein Buch gefunden hast welches du bei einem 
            anderen ausleihen möchtest kannst du unterhalb der Buchinfos, falls das Buch 
            verfügbar ist, dein Name angeben und dich bei seinem Besitzer melden. Viel 
            Spaß!</p>
    </div>
    <br>
</template>

<script>
import axios from 'axios';
import Book from './Book.vue';

export default {
    components: {
        Book
    },
    data: () => ({
        selectedBook: null,
        showMoreInfosBool: false,
        books: [],
        top10books: []
    }),
    methods: {
        borrow: function (e) {
            axios
                .put("http://localhost:8080/books/" + e.id, {
                    firstName: e.firstName,
                    lastName: e.lastName,
                    available: false
                })
                .then(response => {
                    window.location.reload();
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
                    window.location.reload();
                });
        },
        showMoreInfos(book) {
            this.showMoreInfosBool = true;
            this.selectedBook = book;
        },
        async getBookCover() {
            const response = await axios.get('http://localhost:8080/books');
            this.books = response.data;
            let length = this.books.length;
            let pos = 0;
            let len = 10;
            if (length < 10) {
                len = length;
            }
            for (let i = 0; i < len; i++) {
                for (let n = 0; n < length; n++) {
                    if (this.books[n].borrowCount > this.books[pos].borrowCount) {
                        pos = n;
                    }
                }
                this.top10books.push(this.books[pos]);
                this.books.splice(pos, 1);
                pos = 0;
                length--;
            }
            console.log(this.topanzeige)
        }
    },
    mounted() {
        this.getBookCover()
    }
}
</script>

<style>
#cover {
    width: 200px;
    height: 350px;
}

#top10Books {
    background-color: #2d2d2d;
    width: 95%;
    border-radius: 1vh 1vh 1vh 1vh;
}

#top10BooksSelectedBooks {
    width: 95%;
}

#generalInfos {
    background-color: #2d2d2d;
    width: 95%;
    border-radius: 1vh 1vh 1vh 1vh;
    padding-left: 10vw;
    padding-right: 10vw;
    padding-top: 1vh;
    padding-bottom: 3vh;
    text-align: center;
    margin-bottom: 100px;
}
</style>