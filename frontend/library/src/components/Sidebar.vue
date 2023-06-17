<template>
<aside id="Sidebar">
    <h2 id="SidebarH3">The OnLibrary</h2>
    <nav>
        <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/books">Books</RouterLink></li>
            <li><RouterLink to="/add">Add new book</RouterLink></li>
        </ul>
        
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
        background-color: aquamarine;
    }
    #SidebarH3{
        margin: 10%;
    }
    nav{
        white-space: pre;
        margin: 20%;
        align-items: center;
    }
    li{
        font-size: 18px;
        padding-bottom: 20px;
        padding-left: 10%;
    }
</style>
