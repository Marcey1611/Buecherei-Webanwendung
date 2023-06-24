<template>
        <h1 id="title">Top 10 Bücher</h1>
        <v-sheet
            class="mx-auto"
            width="87vw"
            height="50vh"
            color="#1e1e1e"
        >
            <v-slide-group
                v-model="model"
                class="pa-4"
                center-active
            >
                <v-slide-group-item
                    v-for="book in this.top10books"
                    :key="book"
                    v-slot="{ isSelected, toggle }"
                >
                    <v-card
                        :color="isSelected ? '#0E639C' : '#828282'"
                        class="ma-4"
                        height="40vh"
                        width="15vw"
                        @click="toggle"
                    >
                        <div class="d-flex fill-height align-center justify-center">
                            <v-scale-transition>
                                <img id="cover" :src="book.img" alt="Werbung">
                                <h1>1</h1>
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
            model: null,
            topanzeige: [],
            books: [],
            top10books: [],
        }),
        methods: {
            async getBookCover(){
                const response = await axios.get('http://localhost:8080/books');
                this.books = response.data;
                let length = this.books.length;
                let pos = 0;
                let len = 10;
                if(length < 10){
                    len = length;
                }
                for(let i=0; i<len; i++){
                    this.topanzeige[i] = "Top"
                    for(let n=0; n<length; n++){
                        if(this.books[n].borrowCount > this.books[pos].borrowCount){
                            pos = n;
                        }
                    }
                    this.top10books.push(this.books[pos]);
                    this.books.splice(pos, 1);
                    pos = 0;
                    length--;
                }
            }
        },
        mounted() {
            this.getBookCover()
        }
    }
</script>

<style>
    #title{
        margin-left: 10vw;
        color: #828282;
    }
    #cover{
        width: 20vw;
        height: 40vh;
    }
</style>