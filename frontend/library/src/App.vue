<template>
  <div id="app">  
        <Sidebar id="Sidebar"></Sidebar>
    <div id="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';


export default {
  components: {
    Sidebar
  }}
</script>

<style>
  #app{
    display: grid;
    grid-template-columns: 200px 1fr;
    height: 100vh;
    
  }
  #Sidebar{
    
    position: fixed; 
   
    height: 100%;
    width: 200px;

  }
  #main-content {
    margin-left: 200px;
    
  }
  

</style>

