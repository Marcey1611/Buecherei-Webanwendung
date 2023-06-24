<template>
        <v-sheet
            class="mx-auto"
            width="87vw"
            height="43vh"
            color="#1e1e1e"
        >
            <v-slide-group
                v-model="model"
                class="pa-4"
                center-active
            >
                <v-slide-group-item
                    v-for="n in 10"
                    :key="n"
                    v-slot="{ isSelected, toggle }"
                >
                    <v-card
                        :color="isSelected ? '#0E639C' : '#828282'"
                        class="ma-4"
                        height="35vh"
                        width="15vw"
                        @click="toggle"
                    >
                        <div class="d-flex fill-height align-center justify-center">
                            <v-scale-transition>
                                <img :src="books.img" alt="">
                            </v-scale-transition>
                        </div>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
</template>

<script>
    import axios from 'axios';
    export default {
        data: () => ({
            bookPosition: 0,
            counter: 0,
            currentBorrowCounter: 0,
            model: null,
            books: [],
            top10books: [],
        }),
        methods: {
            async getBookCover(){
                const response = await axios.get('http://localhost:8080/books')
                this.books = response.data
                console.log("Books Array" + this.books)
                for(n in 10){
                    for(book in books){
                        if(book.borrowCounter > this.currentBorrowCounter){
                            this.bookPosition = counter
                        }
                        counter++
                    }
                    this.currentBorrowCounter = 0
                    this.top10books.push(books[this.bookPosition])
                    this.books.splice(this.bookPosition, 1)
                }
                console.log("Top 10" + this.top10books)

            }
        },
        mounted() {
            this.getBookCover()
        }
    }
</script>

<style>
</style>