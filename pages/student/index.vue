<template>
  <div>
<a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu

         @click="handleClick"
        theme="dark"
        mode="horizontal"
        v-model="current"
        :style="{ lineHeight: '64px' }"
      >

      <a-menu-item  key="documents">
        <a-icon type="folder" />Documents</a-menu-item>
        <a-sub-menu>
        <span slot="title"  class="submenu-title-wrapper">
          <a-icon type="user" />Myaccount
        </span>
        <a-menu-item-group title >
          <a-menu-item key="profile">Edit Profile</a-menu-item>
          <a-menu-item key="logout" @click="logOut()" >Logout</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>

      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '500px' }">
         <component v-bind:is="component"> </component>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Copyright  2023
    </a-layout-footer>
  </a-layout>

  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";
import Documents from '~/components/Documents';
import Profile from '~/components/Profile';

export default {
  components:{documents:Documents,profile:Profile},
  data() {
    return{

      component:'',
      Title:'',
      current:'documents',
      //error variable
      error: "",
      //error visibility state
      visible: false,
      errors: [],
      currentUser:null

    };
  },
  methods: {
    logOut()
    {
      localStorage.removeItem("user");
      this.$router.push('/');
    },

    handleClick(menu)
    {
      //load page based on the menu clicked
     switch(menu.key)
     {
        case 'documents':
          this.component = 'documents';
         break;

         case 'messages':
          this.component = '';
         break;

          case 'profile':
          this.component = 'profile';
         break;
     }
     },

  },
  created()
  {
   var loggedIn =   localStorage.getItem("user");
   if(loggedIn){
    let currentUser = JSON.parse(loggedIn)
      if(currentUser && currentUser.type === 'STUDENT'){
        this.currentUser = currentUser;
      }
      else{
         this.$router.push('/');
      }
   }
   else{
    this.$router.push('/');
   }
  },
};
</script>

<style scoped>
</style>
