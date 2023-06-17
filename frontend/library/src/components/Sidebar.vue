<template>
<aside id="Sidebar">
    <h2 id="SidebarH3">The OnLibrary</h2>
    <nav>
            <v-btn class="SideNavBarItems"><RouterLink to="/" class="RouterLink"><span class="material-symbols-outlined">home</span><br>Home</RouterLink></v-btn><br>
            <v-btn  class="SideNavBarItems"><RouterLink to="/books" class="RouterLink"><span class="material-symbols-outlined">book</span><br>Books</RouterLink></v-btn><br>
            <v-btn  class="SideNavBarItems"><RouterLink to="/add" class="RouterLink"><span class="material-symbols-outlined">library_add</span><br>Add new book</RouterLink></v-btn>
        
        <br>
        
        <br>
        
      </nav>
</aside>
</template>

<script>
    import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
    #Sidebar{
        background-color: #333333;
    }
    #SidebarH3{
        padding-top: 10%;
        padding-bottom: 10%;
        text-align: center;
        width: 100%;
        background-color: black;
        color: white;
           
    }
    nav{
        white-space: pre;
        align-items: center;
        text-align: center;
    }
    .SideNavBarItems{
        margin-top: 10px;
        width: 90%;
        font-size: 18px;
        padding-bottom: 90px;
    }
    .RouterLink{
        color: #818181;
        text-decoration: none;
    }
    span{
        font-size: 50px;
    }
</style>
