<template>

  <v-card>
    <v-layout>
      <v-navigation-drawer
        id="navigation-drawer"
        v-model="drawer"
        :rail="rail"
        permanent
      >
        <v-list-item
            class="text"
            title="The OnLibrary"
            nav
        >
          <template v-slot:append>
            <v-btn
                v-if="!rail"
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
            ></v-btn>
            <v-btn
                v-if="rail"
                variant="text"
                icon="mdi-chevron-right"
                @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item 
                class="text"
                :class="{ 'active-item': activeItem === 'home' }"
                prepend-icon="mdi-home-city" 
                title="Home" 
                value="home"
                to="/"
            />  
            <v-list-item 
                class="text"
                :class="{ 'active-item': activeItem === 'books' }"
                prepend-icon="mdi-book" 
                title="Books" 
                value="books"
                to="/books"
            />
            <v-list-item 
                class="text"
                :class="{ 'active-item': activeItem === 'add' }"
                prepend-icon="mdi-plus" 
                title="Add book" 
                value="add"
                to="/add"
            />
        </v-list>
      </v-navigation-drawer>
      <!--<v-main style="height: 250px"></v-main>-->
    </v-layout>
  </v-card>

</template>

<script>
    import { RouterLink, RouterView } from 'vue-router'

    export default {
        data () {
            return {
                drawer: true,
                rail: true,
                activeItem: 'home',
            }
        },
    }
</script>

<style>
    #navigation-drawer{
        background-color: #3c3c3c;
        color: #a6a6a6;
    }
    
    .text{
        color: #a6a6a6; 
    }
    .active-item{
      background-color: #0E639C;
      color: white;
    }
</style>
