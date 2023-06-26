<template>

    <h1 id="AddH1">Füge ein neues Buch zur Bibliothek hinzu!</h1>
    <div id="idDivclearAdd">
        <v-icon id="idclearAdd" @click="this.reset()">mdi-close</v-icon>
        <p id="kleinerTippAddSeite">Kleiner Tipp, wenn du den genauen Titel und Autor deines Buches kennst, können wir den Rest autovervollständigen.</p>
        <v-form id="Add" ref="addForm">
            <div id="idBuch">
                
                <v-text-field v-model="this.title" label="Titel" @blur="getBook()" id="AddTitle" :rules="[v=>!!v|| 'Title ist ein Pflichtfeld']" type="text" required></v-text-field>
            <div id="idImgDiv">
                <img :src="this.cover" id="idImg">
            </div>
            <v-text-field v-model="this.author" label="Author" @blur="getBook()" id="AddAuthor" :rules="[v=>!!v|| 'Autor ist ein Pflichtfeld']" type="text" required></v-text-field>
            <v-text-field v-model="this.genre" label="Genre" id="Genre" :rules="[v=>!!v|| 'Genre ist ein Pflichtfeld']" type="text"  required></v-text-field>
            <v-text-field v-model="this.language" label="Sprache" @blur="this.resolveAbbreviation()" id="Sprache" :rules="[v=>!!v|| 'Title ist ein Pflichtfeld']" type="text"  required></v-text-field>
            <v-text-field v-model="this.isbn" label="ISBN" @blur="getCoverByISBN()" id="ISBN" :rules="[v=>!!v|| 'ISBN ist ein Pflichtfeld']" type="number" min="0" step="1" required></v-text-field>
            <v-text-field v-model="this.releaseYear" label="Erscheinungsjahr" id="Erscheinungsjahr" :rules="[v=>!!v|| 'Title ist ein Pflichtfeld']" type="number" min="0" step="1" required></v-text-field>
            <v-textarea v-model="this.description" label="Beschreibung" id="Beschreibung" :rules="[v=>!!v|| 'Beschreibung ist ein Pflichtfeld']" type="text"  required></v-textarea>
        <v-text-field v-model="this.pages" label="Seitenzahl" id="Seitenzahl" :rules="[v=>!!v|| 'Title ist ein Pflichtfeld']" type="number" min="0" step="1" ></v-text-field>
            </div><!-- Buch bis Hier-->
            <div id="idOwner">
            <v-text-field v-model="this.owner.firstName" label="Vorname" id="Sprache" :rules="[v=>!!v|| 'Vorname ist ein Pflichtfeld']" type="text"></v-text-field>
            <v-text-field v-model="this.owner.lastName" label="Nachname" id="Sprache" :rules="[v=>!!v|| 'Nachname ist ein Pflichtfeld']" type="text" ></v-text-field>
            <v-text-field v-model="this.owner.phoneNumber" label="Handynummer" id="Sprache" :rules="[v=>!!v|| 'Handynummer ist ein Pflichtfeld']" type="text" ></v-text-field>
            <v-text-field v-model="this.owner.eMail" label="E-Mail" id="Sprache" :rules="[v=>!!v|| 'Email ist ein Pflichtfeld']" type="text" ></v-text-field>
            </div><!-- Owner bis Hier-->
            <v-btn type="submit" @click="validate()" id="idButton">Buch hinzufügen</v-btn>
        </v-form>
    </div>

</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            isbn: 0,
            title: '',
            author: '',
            releaseYear: 0,
            genre: '',
            language: '',
            pages: 0,
            description: '',
            cover: this.nopic,
            owner:{
                firstName:'',
                lastName:'',
                phoneNumber:'',
                eMail:''
            },
            errorLable: '',
            errorShow: '',
            showUpload: true,
            nopic: ''
        };
    },
    methods: {
        addBook() {
                    try {
                        const newBook = {
                            isbn: this.isbn,
                            title: this.title,
                            author: this.author,
                            releaseYear: this.releaseYear,
                            genre: this.genre,
                            language: this.language,
                            pages: parseInt(this.pages),
                            description: this.description,
                            cover: this.cover,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            owner: this.owner,
                            borrowCount:0,
                            available: true
                        }
                        try {
                            console.log("Try to send Data")
                            axios.post('http://localhost:8080/books/', newBook)
                                .then(response => {
                                    this.newBook = response.data
                                })
                        } catch (error) {console.log('Failed to export Book')}
                    } catch (err) {console.log('Error')}
                    alert("Vielen Dank fürs hinzufügen")
        },
        getBook() {
            if (this.title != '' && this.author != '' && this.isbn == 0 ) {
                try {
                    axios.get('https://www.googleapis.com/books/v1/volumes', {
                        params: {
                            q: 'intitle:' + this.title + '+ inauthor:' + this.author,
                            maxResults: 1,
                            key: 'AIzaSyA8Dvs5T5N5GphcuRKPx2ilCcRJWSIvU1A'
                        }
                    }).then(response => {
                        let tmpISBN
                        let respInfo = response.data.items[0].volumeInfo
                        try {
                            respInfo.industryIdentifiers.forEach(element => {
                                if (element.type == "ISBN_13") {
                                    tmpISBN = parseInt(element.identifier)
                                }
                            })
                            this.resolveAbbreviation()
                            let tmpYear = respInfo.publishedDate.substring(0, 4)
                            try{this.isbn = tmpISBN}catch{console.log("ISBN Is not available")}
                            try{this.title = respInfo.title}catch{console.log("Title Is not available")}
                            try{this.releaseYear = parseInt(tmpYear)}catch{console.log("releaseYear Is not available")}
                            try{this.author = respInfo.authors[0]}catch{console.log("Author Is not available")}
                            try{this.language = respInfo.language}catch{console.log("language Is not available")}
                            this.resolveAbbreviation()
                            try{this.genre = respInfo.categories[0]}catch{console.log("Categories Is not available")}
                            try{this.pages = respInfo.pageCount}catch{console.log("pagecount Is not available")}
                            try{this.description = respInfo.description}catch{console.log("Description Is not available")}
                            try{this.cover = respInfo.imageLinks.thumbnail}catch{console.log("Cover Is not available")}
                        } catch (error) {console.log('Error2')}
                    })
                } catch (err) {console.log('Error')}
            }
            if ((this.title == '' && this.cover != this.nopic) || (this.author == '' && this.cover != this.nopic)) {
                this.cover = this.nopic
            }
        },
        realNewBook(tmpISBN) {
        return new Promise(function(resolve,reject){   
            axios.get("http://localhost:8080/books/").then(response => {
                console.log(response.data)
                    response.data.forEach(element => {
                        console.log(element.isbn)
                        if (element.isbn == tmpISBN){
                            reject();
                        }
                    })
                    resolve(true);})})
        },
        resolveAbbreviation(){
           if(this.language.length<=2){
            console.log(this.language)
                this.translateText(this.language).then(response => {
                    console.log(response);
                    this.language = response;
                }).catch(()=>{
                    this.language = tags.language(this.language);
                })
           }
        },
        getCoverByISBN() {
            if (this.isbn != '' && this.cover == this.nopic) {
                try {
                    this.cover = 'https://covers.openlibrary.org/b/isbn/' + this.isbn + '-L.jpg'
                    this.showUpload = false
                } catch (error) {console.log('Error while downloading img')}
            } if (this.isbn == '' && this.cover != this.nopic) {
                this.cover = this.nopic
                this.showUpload = true
            }
        },
        async validate(){
            const { valid } =  await this.$refs.addForm.validate()
                if(valid){
                    this.realNewBook(this.isbn).then(()=>
                    this.addBook()
                    ).catch(()=>
                    alert("Das Buch ist bereits Vorhanden")
                    )
                }
        },
        reset(){
            try {
            this.cover = this.nopic;
            this.isbn= 0,
            this.title= '',
            this.author= '',
            this.releaseYear= 0,
            this.genre= '',
            this.language= '',
            this.pages= 0,
            this.description= '',
            this.cover= this.nopic,
            this.owner={
                firstName:'',
                lastName:'',
                phoneNumber:'',
                eMail:''
            } 
            } catch (error) {
               console.log(error) 
            }
        },
        async translateText(text){
            return new Promise(function(resolve,reject){
            axios.get("http://localhost:8080/books/resolveLanguage", {
                params:{
                    reqText: text
                }
            }).then(response =>{
                console.log(response.data)
                if (response.data != "") {
                    resolve(response.data)
                }
                reject();
                
            }
            )})
        }
    },
    mounted() {
        import('@/assets/pictures/nopic.jpg')
            .then((image) => {
                this.nopic = image.default;
                this.cover = this.nopic;
            })
    },
}
</script>

<style>
@import "../assets/add.module.css";
</style>