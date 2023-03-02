
<template>
<div>
    <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Update Your Profile"
    sub-title=""
  />

  <div>
   <a-form
      id="register"
      class="register-form2"
      :model="form"
      @submit="updateProfile"
      @submit.native.prevent
    >
      <br>
        <a-form-item>
        <a-input placeholder="Student/NO" disabled v-model="form.stdnumber">
          <a-icon slot="prefix" type="number" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

       <a-form-item>
        <a-input placeholder="Email" disabled  v-model="form.email">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input placeholder="Phone" v-model="form.phone">
          <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input placeholder="FirstName" v-model="form.firstname">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

       <a-form-item>
        <a-input placeholder="LastName" v-model="form.lastname">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
          <a-select placeholder="Gender" disabled v-model="form.gender">
              <a-select-option value="Architect">Male</a-select-option>
              <a-select-option value="Artisan">Female</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="Date of Birth" disabled v-model="form.dob">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
       <a-form-item>
        <a-input placeholder="Address" v-model="form.address">
          <a-icon slot="prefix" type="pull-request"   style="color: rgba(0,0,0,.25)"/>
           </a-input>
      </a-form-item>
       <a-form-item>
        <a-select placeholder="Courses"  v-model="form.course" :options="this.items">
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary"  @click="updateProfile">Update Record</a-button> <br>
        <br />
        <p>
          <a-alert message="" v-if="errors.length" closable type="error">
          <p slot="description">
            <span style="color: red">
             Errors
               <ul>
        <li v-for="error in errors" v-bind:key="error">{{error}}</li>
      </ul>
            </span>
          </p>
             </a-alert>
        </p>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
      data() {
      return {
        //error variable
        error: "",
        errors:[],
        //error visibility state
        visible: false,
        selectedUser:null,
          form:
          {
            firstname: "",
            lastname:"",
            stdnumber:"",
            address:"",
            email:"",
            phone:"",
            gender:"",
            dob:"",
            course:""
          },
          course:'',
          items : [],
          documentId:''
      }
     },
    methods:{
      updateProfile()
       {
        //get document id
        //validate bsic
        this.errors = [];
        var  firstname = this.form.firstname;
        var  lastname = this.form.lastname;
        var  address = this.form.address;
        var  phone =  this.form.phone;
        var  course =  this.form.course;

        if(firstname==="")
        {
          this.errors.push('FirstName field cannot be empty');
        }
          if(lastname==="")
        {
          this.errors.push('LastName field cannot be empty');
        }
        if(phone==="")
        {
          this.errors.push('Phone field cannot be empty');
        }

        if(address==="")
        {
          this.errors.push('Address field cannot be empty');
        }

        if(this.errors.length>0)
        {
            return;
        }

      var client = firebase.firestore();
      //client details
        client.collection("students").doc(this.documentId)
        .update({
              firstname: firstname,
              lastname: lastname,
              address: address,
              phone: phone,
              course:course
            });
       this.$message.info("Profile succefully updated.");
      },
      fetchCourses(){
        this.items = [];
        var db = firebase.firestore();
        db
        .collection("courses")
        .get()
        .then((querySnapshot) =>
        {
            querySnapshot.forEach((doc)=>
            {
              this.items.push({value:doc.data().name,label:doc.data().name});
            });
          })
          .finally(() => console.log('Çompleted loading ...'));
      }
     },
     async created(){
      this.fetchCourses();
       var loggedIn =   localStorage.getItem("user");
        if(loggedIn){
        let currentUser = JSON.parse(loggedIn);
        var storeDb = firebase.firestore();
         storeDb.collection("students").where("user_id", "==", currentUser.id)
          .get()
          .then((querySnapshot) => {
              var docId = "";
              querySnapshot.forEach((doc) => {
                  docId = doc.id;
                  let selectedUser = doc.data();
                  this.form.firstname = selectedUser.firstname;
                  this.form.lastname = selectedUser.lastname;
                  this.form.address = selectedUser.address;
                  this.form.phone = selectedUser.phone;
                  this.form.stdnumber = selectedUser.studentnumber;
                  this.form.course = selectedUser.course;
                  this.form.email = currentUser.email;
                  this.form.dob = currentUser.dob;
                  this.form.gender = currentUser.gender;
              });
              this.documentId = docId;

          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
          }
     }
}
</script>
<style>
.register_div {
  position: absolute;

  width: 400px;
  height: 400px;

  /* Center form on page horizontally & vertically */
  top: 20%;
  left: 50%;
  margin-top: -180px;
  margin-left: -150px;
}

.register_form2 {
  width: 400px;
  height: 400px;

  background: gray;
  border-radius: 10px;

  margin: 0;
  padding: 0;
}
</style>
