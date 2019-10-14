<template>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span @click="toHomePage">ChatWebApp</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="toLoginPage">
        <span class="mr-2">LOGIN</span>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  methods: {
    toHomePage () {
      this.$router.push('/')
    },
    toLoginPage () {
      this.$router.push('/login')
    }
  }
}
</script>