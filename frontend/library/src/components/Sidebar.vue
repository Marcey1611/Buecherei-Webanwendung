<template>
<aside id="Sidebar">
    <h1>Sidebar.vue</h1>

    <nav>
        <RouterLink to="/">Home</RouterLink>
        <br>
        <RouterLink to="/books">Books</RouterLink>
        <br>
        <RouterLink to="/add">Add new book</RouterLink>
        <br>
        <RouterLink to="/otherside">Other</RouterLink>
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
</style>
