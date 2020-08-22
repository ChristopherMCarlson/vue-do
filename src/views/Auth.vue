<template>
    <v-card
    style="width: 25vw; margin-left: 37.5vw"
    outlined
    >
    <div id="signUpForm" v-if="signUp && !verify">
      <form @submit="signUpUser">
        <v-text-field
          v-model="username"
          :error-messages="nameErrors"
          :counter="10"
          label="Username"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn class="mr-4" @click="signUpUser">Register</v-btn>
      <p>Already have an account? <a @click="switchForm" class="white--text">Click here to login.</a></p>
      </form>
    </div>
    <div id="verifySignUp" v-if="signUp && verify">
        <form @submit="verifySignUpUser">
          <v-text-field
            v-model="confirmationCode"
            :error-messages="nameErrors"
            :counter="10"
            label="Confirmation Code"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
        <v-btn class="mr-4" @click="verifySignUpUser">Confirm Sign Up</v-btn>
        </form>
      </div>
    <div id="signInForm" v-if="!signUp">
        <form @submit="signIn">
          <v-text-field
            v-model="usernamesignIn"
            :error-messages="nameErrors"
            :counter="10"
            label="Username"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
          v-model="passwordsignIn"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Normal with hint text"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn class="mr-4" @click="signIn">Login</v-btn>
        <p>Don't have an account? <a @click="switchForm" class="white--text">Click here to sign up.</a></p>
        </form>
      </div>
  </v-card>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
name: 'auth',
mixins: [validationMixin],
validations: {
  name: { required, maxLength: maxLength(10) },
  email: { required, email },
},
async beforeCreate() {
  try {
    const user = await Auth.currentAuthenticatedUser()
    this.signedIn = true
    this.$router.push('/')
  } catch (err) {
    this.signedIn = false
  }
  AmplifyEventBus.$on('authState', info => {
    if (info === 'signedIn') {
      this.signedIn = true
      this.$router.push('/')
    } else {
      this.signedIn = false
    }
  });
},
data () {
  return {
    signedIn: false,
    username: '',
    email: '',
    password: '',
    usernamesignIn: '',
    passwordsignIn: '',
    confirmationCode: '',
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    signUp: true,
    verify: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match'),
    },
  }
},
computed: {
  nameErrors () {
    const errors = []
    if (!this.$v.name.$dirty) return errors
    !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
    !this.$v.name.required && errors.push('Name is required.')
    return errors
  },
  emailErrors () {
    const errors = []
    if (!this.$v.email.$dirty) return errors
    !this.$v.email.email && errors.push('Must be valid e-mail')
    !this.$v.email.required && errors.push('E-mail is required')
    return errors
  },
},
methods: {
  submit () {
    this.$v.$touch()
  },
  clear () {
    this.$v.$reset()
    this.name = ''
    this.email = ''
    this.password = ''
  },
  switchForm () {
    this.signUp = !this.signUp;
  },
  async signUpUser () {
    let username = this.username;
    let password = this.password;
    let email = this.email;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
    this.verify = true;
    } catch (error) {
      console.log('error signing up:', error);
    }
  },
  async signIn () {
    let username = this.usernamesignIn;
    let password = this.passwordsignIn;
    try {
      const user = await Auth.signIn(username, password);
      this.$router.push('home')
    } catch (error) {
      console.log('error signing in', error);
    }
  },
  async verifySignUpUser () {
    try {
      await Auth.confirmSignUp(username, code);
      this.$router.push('home');
    } catch (error) {
        console.log('error confirming sign up', error);
    }
  }
},
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