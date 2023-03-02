<template>
  <!-- plain simple antd form -->
  <div class="login_div">
    <a-form
      id="login"
      class="login-form2"
      :model="form"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-divider>Account Login</a-divider>
      <a-form-item>
        <a-input placeholder="Email" v-model="form.email">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input type="password" v-model="form.password" placeholder="Password">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>
        <br />

        <a @click="register()">Register now!</a> only <B>STUDENTS </B> you dont have account.

        <a-alert message v-if="visible" closable type="error">
          <p slot="description">
            <span style="color: red">{{ error }}</span>
          </p>
        </a-alert>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  data() {
    return {
      //error variable
      error: "",
      errors: [],
      //error visibility state
      visible: false,
      logged:null,

      //login form model
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {

    login() {
      this.$router.push("/dashboard");
    },
    register() {
      this.$router.push("/register");
    },
    //this is the method that the login button submits to
    async handleSubmit(e) {
      console.log(this.form);
      //check if its empty
      //validate bsic
      //check the common errors if empty
      if (this.form.email === "") {
        this.visible = true;
        this.error = "Email cannot be empty";
        return;
      }
      if (this.form.password === "") {
        this.visible = true;
        this.error = "Password cannot be empty";
        return;
      }
      this.error = "";
      this.visible = false;

      let email = this.form.email;
      let password = this.form.password;
      //create the firebase instance object
      var StoreDB = firebase.firestore();
      const users = StoreDB.collection('users');

      const snapshot = await users.where('email', '==', email).get();

      if (snapshot.empty)
      {
        this.error = 'Sorry you cant login with '+email+' !';
        this.visible=true;
        return;
      }
      this.error = "";
      this.visible = false;
      var user = [];
      snapshot.forEach(doc =>
      {
        user.push(
          {
            id:doc.id,email:doc.data().email,
            password:doc.data().password,
            type:doc.data().type,
            email:doc.data().email,
            dob:doc.data().dob,
            gender:doc.data().gender,
            meta:doc.data().meta
          });
      });
      var lg = user.filter(function(dt)
      {
        if(dt.email===email && dt.password===password){
        return dt;
      }
      });
      if(lg.empty)
      {
        this.error = 'Sorry we cant logg you in!';
        this.visible=true;
        return;
      }
      else
      {
        switch(lg[0].type)
        {
          case 'ADMIN':
            var info = {id:lg[0].id,type:'ADMIN',email:lg[0].email};
            console.log(info);
            localStorage.setItem("user",JSON.stringify(info) );
            this.$router.push('/dashboard');
            break;
          case 'STUDENT':
            var info = {id:lg[0].id,type:'STUDENT',email:lg[0].email,gender:lg[0].gender,dob:lg[0].dob,meta:lg[0].meta};
            localStorage.setItem("user",JSON.stringify(info) );
            this.$router.push('/student');
            break;
        }
      }
      e.preventDefault();
    },
  },
  async created() {
  },
};
</script>


<style>
.login_div {
  position: absolute;

  width: 400px;
  height: 400px;

  /* Center form on page horizontally & vertically */
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -150px;
}

.login_form2 {
  width: 400px;
  height: 400px;

  background: gray;
  border-radius: 10px;

  margin: 0;
  padding: 0;
}
</style>
