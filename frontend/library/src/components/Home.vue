<template>
        /*<v-sheet
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
                                <img :src="top10books.img" alt="Werbung">
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
            currentBorrowCounter: 0,
            model: null,
            books: [],
            top10books: [],
            count: 0,
        }),
        methods: {
            async getBookCover(){
                const response = await axios.get('http://localhost:8080/books');
                this.books = response.data;
                console.log(this.books);
                const length = this.books.length;
                console.log(length);
                for(let i=0; i<10; i++){
                    for(let n=0; n<length; n++){
                        console.log(this.books[n].borrowCount);
                        console.log(typeof(this.books[n].borrowCount));
                        this.count = this.books[n].borrowCount;
                        if(this.count > this.currentBorrowCounter){
                            this.bookPosition = n;
                            this.currentBorrowCounter = this.count;
                        }
                    }
                    this.currentBorrowCounter = 0;
                    this.top10books.push(this.books[this.bookPosition]);
                    this.books.splice(this.bookPosition, 1);
                }
                console.log("Top 10" + this.top10books);
            }
        },
        mounted() {
            this.getBookCover()
        }
    }
</script>

<style>
</style>