<template>
  <v-container grid-list-xs>
    <!-- <v-form> -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title primary-title>LOGIN</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="id" name="input-10-1" label="ID"></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 4 characters"
                counter
                @click:append="show1 = !show1"
                @keyup.enter="onSubmit"
              ></v-text-field>
            </v-form>
            <v-alert type="error" :value="showError">LOGIN DENIED</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="onSubmit" color="success">login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-form> -->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    id: "",
    password: "",
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 4 || "Min 4 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    showError: false
  }),
  methods: {
    onSubmit() {
      let id = this.id
      let password = this.password
      this.$store.dispatch('LOGIN', {id, password})
        .then(() => this.redirect())
        .catch(({message}) => this.msg = message)
    },
    redirect() {
      const {search} = window.location
      const tokens = search.replace(/^\?/, '').split('&')
      const {returnPath} = tokens.reduce((qs, tkn) => {
        const pair = tkn.split('=')
        qs[pair[0]] = decodeURIComponent(pair[1])
        return qs
      }, {})
      this.$router.push(returnPath)
    }
  }
};
</script>