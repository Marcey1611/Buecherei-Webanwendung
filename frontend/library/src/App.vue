<!-- Test -->
<template>
  <div id="app">
    <div>
      <Sidebar id="sidebar"></Sidebar>
    </div>

    <div>
      <router-view id="main-content"/>
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
    height: 100vh;
  }
  #sidebar{
    z-index: 1;
  }
  #main-content {
    z-index: 0;
    margin-left: 50px;
    width: 100vw;
    animation: transitionIn 1s;
  }
  

</style>

