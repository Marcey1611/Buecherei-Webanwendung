<template>
    <h1 id="AddH1">Füge ein neues Buch zur Bibliothek hinzu!</h1>
    <label v-show="errorShow" id="errLable">{{ errorLable }}</label>
    
    <div id="idDivclearAdd">
        <v-icon id="idclearAdd" @click="this.clearFields">mdi-close</v-icon>
    <v-form id="Add" ref="form">
        <div id="idBuch">
            <v-text-field v-model="this.title" @blur="getBook()" id="AddTitle" :rules="[v=>!!v|| 'Title ist ein Pflichtfeld']" type="text" placeholder="Titel" required></v-text-field>
        <div id="idImgDiv">
            <img :src="this.cover" id="idImg">
        </div>
        <v-text-field v-model="this.author" @blur="getBook()" id="AddAuthor" :rules="[v=>!!v|| 'Autor ist ein Pflichtfeld']" type="text" placeholder="Autor" required></v-text-field>
        <v-text-field v-model="this.genre" id="Genre" :rules="[v=>!!v|| 'Genre ist ein Pflichtfeld']" type="text" placeholder="Genre" required></v-text-field>
        <v-text-field v-model="this.language" id="Sprache" :rules="[v=>!!v|| 'Title ist ein Pflichtfeld']" type="text" placeholder="Sprache" required></v-text-field>
        <form action="upload" id="Bild">
            <v-file-input label="Bild Hochladen" prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/bmp"
                variant="underlined" :disabled="this.showUpload"></v-file-input>
        </form>
        <v-text-field v-model="this.isbn" @blur="getCoverByISBN()" id="ISBN" :rules="[v=>!!v|| 'ISBN ist ein Pflichtfeld']" type="number" min="0" step="1"
            placeholder="ISBN-13" required></v-text-field>
            <v-textarea v-model="this.description" id="Beschreibung" :rules="[v=>!!v|| 'Beschreibung ist ein Pflichtfeld']" type="text" placeholder="Beschreibung" required></v-textarea>
        <v-text-field v-model="this.releaseYear" id="Erscheinungsjahr" :rules="[v=>!!v|| 'Title ist ein Pflichtfeld']" type="number" min="0" step="1"
            placeholder="Erscheinungsjahr" required></v-text-field>
            <div></div>
     <v-text-field v-model="this.pages" id="Seitenzahl" :rules="[v=>!!v|| 'Title ist ein Pflichtfeld']" type="number" min="0" step="1" placeholder="Seitenanzahn"></v-text-field>

       
        </div><!-- Buch bis Hier-->
        <div id="idOwner">
        <v-text-field v-model="this.owner.firstName" id="Sprache" :rules="[v=>!!v|| 'Vorname ist ein Pflichtfeld']" type="text" placeholder="Vorname"></v-text-field>
        <v-text-field v-model="this.owner.lastName" id="Sprache" :rules="[v=>!!v|| 'Nachname ist ein Pflichtfeld']" type="text" placeholder="Nachname"></v-text-field>
        <v-text-field v-model="this.owner.phoneNumber" id="Sprache" :rules="[v=>!!v|| 'Handynummer ist ein Pflichtfeld']" type="text" placeholder="Handynummer"></v-text-field>
        <v-text-field v-model="this.owner.eMail" id="Sprache" :rules="[v=>!!v|| 'Email ist ein Pflichtfeld']" type="text" placeholder="E-Mail"></v-text-field>
        </div>
        



        <v-btn type="submit" @click="validate()" id="idButton">Buch hinzufügen</v-btn>
    </v-form>
</div>
</template>
  
<script>
import axios from 'axios';


export default {
    data() {
        return {
            isbn: null,
            title: '',
            author: '',
            releaseYear: null,
            genre: '',
            language: '',
            pages: null,
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
            nopic: '',
            boolRealBook: null
        };
    },
    methods: {
        addBook() {
            console.log("test")
            console.log(this.isbn)
            this.realNewBook(this.isbn).then(() => {
                console.log("Hallo")
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

                        };
                        console.log(newBook)
                        try {
                            console.log("Try to send Data")
                            axios.post('http://localhost:8080/books/', newBook)
                                .then(response => {
                                    this.newBook = response.data;
                                    console.log("recieved data")
                                })
                            
                        } catch (error) {
                            console.log('Failed to export Book')
                        }
                    } catch (err) {
                        console.log('Error')
                    }
            }).catch(() => {
                console.log('Buch ist bereits in der Datenbank')
                this.errorLable = 'Buch ist bereits in der Datenbank'
                this.errorShow = true
            })
        
        },

        getBook() {
            console.log("getBook enterd");
            this.disableErrorMSG()
            console.log("disable Messages");
            if (this.title != '' && this.author != '' && this.isbn == null ) {
                try {
                    axios.get('https://www.googleapis.com/books/v1/volumes', {
                        params: {
                            q: 'intitle:' + this.title + '+ inauthor:' + this.author,
                            maxResults: 1,
                            key: 'AIzaSyA8Dvs5T5N5GphcuRKPx2ilCcRJWSIvU1A'
                        }
                    }).then(response => {
                        let tmpISBN
                        console.log(response)
                        console.log(response.data.items[0].volumeInfo)
                        let respInfo = response.data.items[0].volumeInfo
                        try {
                            respInfo.industryIdentifiers.forEach(element => {
                                if (element.type == "ISBN_13") {
                                    tmpISBN = parseInt(element.identifier)
                                    console.log(tmpISBN)
                                }
                            })

                            let tmpYear = respInfo.publishedDate.substring(0, 4)
                            try{this.isbn = tmpISBN}catch{console.log("ISBN Is not available")}
                            try{this.title = respInfo.title}catch{console.log("Title Is not available")}
                            try{this.releaseYear = parseInt(tmpYear)}catch{console.log("releaseYear Is not available")}
                            try{this.author = respInfo.authors[0]}catch{console.log("Author Is not available")}
                            try{this.language = respInfo.language}catch{console.log("language Is not available")}
                            try{this.genre = respInfo.categories[0]}catch{console.log("Categories Is not available")}
                            try{this.pages = respInfo.pageCount}catch{console.log("pagecount Is not available")}
                            try{this.description = respInfo.description}catch{console.log("Description Is not available")}
                            try{this.cover = respInfo.imageLinks.thumbnail}catch{console.log("Cover Is not available")}
                        } catch (error) {
                            console.log('Error2')
                        }
                    })
                } catch (err) {
                    console.log('Error')
                }
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

        getCoverByISBN() {
            this.disableErrorMSG()
            if (this.isbn != '' && this.cover == this.nopic) {
                try {
                    this.cover = 'https://covers.openlibrary.org/b/isbn/' + this.isbn + '-L.jpg'
                    console.log(this.cover)
                    this.showUpload = false
                } catch (error) {
                    console.log('Error while downloading img')
                }
            } if (this.isbn == '' && this.cover != this.nopic) {
                this.cover = this.nopic
                this.showUpload = true
            }
        },
        disableErrorMSG() {
            this.errorLable = ''
            this.errorShow = true;
        },
        clearFields(){
            this.isbn= null,
            this.title= '',
            this.author= '',
            this.releaseYear= null,
            this.genre= '',
            this.language= '',
            this.pages= null,
            this.description= ''
            this.cover = this.nopic
        },
        async validate(){
            const { valid } =  await this.$refs.form.validate()
                if(valid){
                    this.addBook()
                }
            
        }
    },
    mounted() {
        import('@/assets/pictures/nopic.jpg')
            .then((image) => {
                this.nopic = image.default;
                this.cover = this.nopic;
            })
    }
}


</script>
<style>
#AddH1 {
    white-space: pre;
    padding: 3vw;
    color:#828282
}
#idDivclearAdd{
    background-color: #2d2d2d;
    width: 95%;
    border-radius: 2vh;
    margin: 1%;
    padding: 1%;
    
}

#Add {
    
    grid-template-rows: auto auto 8vh;
    
    justify-content: center;
    padding: 4%;
    
}
#idBuch, #idOwner{
    display: grid;
    grid-template-columns: 50% 50%;
    color: #828282;
    grid-gap: 2.5vh;
    width: auto;
    height: auto;
    justify-content: center;
}
#idBuch{
    grid-template-rows: 8vh 8vh 8vh 8vh 8vh 8vh 8vh;
    margin-bottom: 4%;
}
#idOwner{
    border-top: 0.125vh solid white;
    padding-top: 4%;
    grid-template-rows: 8vh 8vh;
    margin-bottom: 4%;
}
#idImgDiv {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    height: 100%;
    grid-row: 1/4;
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}
#idImg {
    max-height: 100%;
    max-width: 100%;
    align-self: center;
}

#Beschreibung {
    grid-row: 5/ 7;
    grid-column: 2;
   height: 29vh;
}

#errLable {
    color: red;

}
#AddDescription {
    grid-column-start: 1;
    grid-column-end: 3;
    white-space: pre-wrap;
    overflow-y: auto;
}
#idButton {
    height: 8vh;
    width: 100%;
    background-color: #0E639C;
}
#idclearAdd{
    float: right;
    background-color: #0E639C;
    border-radius: 1vh;
}
</style>