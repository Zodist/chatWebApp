<template>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span @click="toHomePage">ChatWebApp</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="toLoginPage">
        <span class="mr-2">LOGIN</span>
      </v-btn>
      <v-btn href="/logout">
        <span class="mr-2">LOGOUT</span>
      </v-btn>
      <v-btn @click="toChatPage">
        <span class="mr-2">CHATROOMS</span>
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
    },
    toChatPage () {
      this.$router.push('/ChatRoomList')
    }
  }
}
</script>