<template>
  <v-app>
    <div id="app">
        <v-app-bar
        color="black accent-4"
        dense
        dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" style="color: white; text-decoration: none;">
            Vue-Builder
          </router-link>
        </v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <div v-if='signedIn'>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
    
          <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon @click="signOut">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >mdi-logout</v-icon>
                </v-btn>
              </template>
              <span>Tooltip</span>
            </v-tooltip>
    
          <v-menu
            left
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
    
            <v-list>
              <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
              >
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>
      <v-row>
        <v-col cols='12'>
          <router-view v-on:signedInSuccessful="signedIn = true"></router-view>
        </v-col>
      </v-row>
      <!-- <div v-if="!signedIn">
         <amplify-authenticator></amplify-authenticator>
      </div>
      <div v-if="signedIn">
        <amplify-sign-out class="signout"></amplify-sign-out>
        <div class="container">
          <amplify-photo-picker
            v-bind:photoPickerConfig="photoPickerConfig"
          ></amplify-photo-picker>
          <amplify-s3-album path="images/"></amplify-s3-album>
        </div>
      </div> -->
    </div>
  </v-app>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import { Storage } from 'aws-amplify'
Storage.list('images/')
  .then(data => console.log('images from S3: ', data))
  .catch(err => console.log('error', err))
const photoPickerConfig = {
path: 'images/',
}
export default {
name: 'app',
async beforeCreate() {
  try {
    const user = await Auth.currentAuthenticatedUser()
    this.signedIn = true
  } catch (err) {
    this.signedIn = false
  }
  AmplifyEventBus.$on('authState', info => {
    if (info === 'signedIn') {
      this.signedIn = true
    } else {
      this.signedIn = false
    }
  });
},
  data () {
    return {
      photoPickerConfig,
      signedIn: false
    }
  },
  methods: {
    async signOut(){
      try {
        await Auth.signOut();
        this.signedIn = false;
        this.$router.push('auth')
      } catch (error) {
        console.log('error signing out: ', error);
      }
    },
  }
}
</script>

<style>
body {
margin: 0
}
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}
.container {
padding: 40px;
}
.signout {
background-color: #ededed;
margin: 0;
padding: 11px 0px 1px;
}
</style>