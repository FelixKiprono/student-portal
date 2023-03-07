<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
    v-model="collapsed"
    :mode="mode"
    :theme="theme"
    collapsible>
      <div class="logo"></div>


      <a-menu @click="handleClick" :mode="mode" :theme="theme" :default-selected-keys="['students']">

        <a-menu-item  key="documents">
         <a-icon type="menu-unfold" />
          <span>Documents</span>
        </a-menu-item>

        <a-menu-item  key="students">
        <a-icon type="menu-unfold" />
          <span>Students</span>
        </a-menu-item>

         <a-menu-item  key="settings">
          <a-icon type="setting" />
          <span>Settings</span>
        </a-menu-item>

         <a-menu-item key="logout">
          <a-icon type="logout" />
          <span>Logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding:0">

        <h2 v-if="type==='admin'" style="margin-left:25px;"> Admin  dashboard </h2>
        <h2 v-else style="margin-left:25px;">Admin Dashboard </h2>

      </a-layout-header>

      <a-layout-content style="margin: 0 16px;">
        <a-breadcrumb style="margin: 16px 0"> </a-breadcrumb>
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            height: '100%',
            width: '100%'
          }"
        >
        <component v-bind:is="component"> </component>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        All rights reserved copyright Student Management Portal ©2023
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>

import * as firebase from 'firebase/app'
import Students from '~/components/Students'
import Settings from '~/components/dash/Settings';
import DocumentsManager from '~/components/dash/DocumentsManager'

export default {
components:
{
  students:Students,
  settings:Settings,
  documents:DocumentsManager,
},
   data() {
    return {
      component: "",
      collapsed: false,
      IsAdmin:false,
      //global title
      Title: "",
      // theming
      mode: "inline",
      theme: "dark",
      type:''
    };
  },
  methods: {

    logout()
    {
      console.log(this.currentUser);
       localStorage.removeItem("user");
       this.$router.push('/');
    },
    handleClick(menu)
    {
      //load page based on the menu clicked
     switch(menu.key)
     {

        case 'students':
          this.component = 'students';
         break;

          case 'documents':
          this.component = 'documents';
         break;

         case 'clients':
          this.component = 'viewclients';
          break;

          case 'plans':
          this.component = 'plan';
          break;

          case 'projectsplan':
              this.component = 'projectplan';
         break;
          case 'proffession':
          this.component = 'viewproffessions';
         break;

          case 'training':
          this.component = 'applicants';
         break;

          case 'settings':
          this.component = 'settings';
         break;
         case 'logout':
           localStorage.removeItem("user");
           this.$router.push('/');
         break;




     }
      //console.log('click ', menu);
     },
    changeMode(checked)
    {
      this.mode = checked ? "vertical" : "inline";
    },
    changeTheme(checked)
    {
      this.theme = checked ? "light" : "dark";
    },

  },
  created()
  {
   var loggedIn =   localStorage.getItem("user");
   if(loggedIn){
    let currentUser = JSON.parse(loggedIn)
      if(currentUser && currentUser.type == 'ADMIN'){
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
  mounted(){
    this.type = localStorage.getItem('type');
  }
};
</script>
<style>
    #components-layout-demo-side .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
      }
</style>
