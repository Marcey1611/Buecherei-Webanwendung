<!--$4&AaLk#3@jG6y]xW~2mBd[0Cn^vZp(l1N`9O)bTfV}I?XrU{5]!Qq7eY+K;:S]8Dh,c.Mi<Ft*Rg>zHsE/-->
<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer id="navigation-drawer" v-model="drawer" :rail="rail" permanent>
        <v-list-item title="The OnLibrary" nav>
          <template v-slot:append>
            <v-btn v-if="!rail" variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
            <v-btn v-if="rail" variant="text" icon="mdi-chevron-right" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav id="navBar">
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/" />
          <v-list-item prepend-icon="mdi-book" title="Books" value="books" to="/books" />
          <v-list-item prepend-icon="mdi-plus" title="Add book" value="add" to="/add" />
          <v-divider></v-divider>
        </v-list>
        <div id="contact">
          <v-list-item title="Contact us:" nav />
          <v-list-item title="Mail: wahreailer@gmail.com" nav />
          <v-list-item title="Phone: 1234" nav />
        </div>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    }
  },
}
</script>

<style>
#navigation-drawer {
  background-color: #3c3c3c;
  color: #a6a6a6;
}
#contact {
  position: absolute;
  bottom: 0;
}
#navBar {
  position: relative;
}
</style>
