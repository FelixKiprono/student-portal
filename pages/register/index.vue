
<template>
<div>
    <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Student Registration"
    sub-title=""
  />

  <div class="register_div">
     <a-form
      class="register-form2"
    >
        <a-form-item>
        <a-input placeholder="Student/NO" v-model="studentnumber">
          <a-icon slot="prefix" type="number" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

       <a-form-item>
        <a-input placeholder="Email" v-model="email">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input placeholder="Phone" v-model="phone">
          <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input placeholder="FirstName" v-model="firstname">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

       <a-form-item>
        <a-input placeholder="LastName" v-model="lastname">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
          <a-select placeholder="Gender" v-model="gender">
              <a-select-option value="Male">Male</a-select-option>
              <a-select-option value="Female">Female</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="Date of Birth" v-model="dob">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
       <a-form-item>
        <a-input placeholder="Address" v-model="address">
          <a-icon slot="prefix" type="pull-request"   style="color: rgba(0,0,0,.25)"/>
           </a-input>
      </a-form-item>
       <a-form-item>
        <a-select placeholder="Courses" v-model="course" :options="this.items">
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-input type="password"  placeholder="Password" v-model="password">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button type="primary"  @click="saveClient">Save Record</a-button> <br>
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
export default {
  created(){
    this.fetchCourses();
  },
  data() {
      return {
        //error variable
        current:'',
        error: "",
        errors:[],
        //error visibility state
        visible: false,
        //register form model
           firstname: "",
          lastname:"",
          studentnumber:"",
          address:"",
          email:"",
          phone:"",
          password: "",
          gender:"",
          dob:"",
          course:"",
        form:
        {
          firstname: "",
          lastname:"",
          studentnumber:"",
          address:"",
          email:"",
          phone:"",
          password: "",
          gender:"",
          dob:"",
          course:""
        },
        courses: [],
        items : []
      }
    },
    methods:{
      saveClient()
      {
        var  studentnumber = this.studentnumber;
        var  firstname = this.firstname;
        var  gender = this.gender;
        var  dob = this.dob;
        var  lastname = this.lastname;
        var  email = this.email;
        var  address = this.address;
        var  password =  this.password;
        var  phone =  this.phone;
        var  course =  this.course;

          //validate bsic
        this.errors = [];
        //check the common errors if empty
      if(studentnumber==="")
      {
        this.errors.push('Student Number field cannot be empty');
      }
      if(firstname==="")
      {
        this.errors.push('FirstName field cannot be empty');
      }
        if(lastname==="")
      {
        this.errors.push('LastName field cannot be empty');
      }
      if(email==="")
      {
        this.errors.push('Email field cannot be empty');
      }
      if(phone==="")
      {
        this.errors.push('Phone field cannot be empty');
      }

      if(address==="")
      {
        this.errors.push('Address field cannot be empty');
      }
      if(course==="")
      {
        this.errors.push('Course field cannot be empty');
      }

      if(this.errors.length>0)
      {
          return;
      }

      //add user first
      var StoreDB = firebase.firestore();
      //user details
      StoreDB.collection("users")
              .add({
                email: email,
                type: 'STUDENT',
                password: password,
                meta:course
              }).then(function(docRef)
              {
                var client = firebase.firestore();
              //add student details
              client.collection("students")
                    .add({
                      user_id:docRef.id,
                      firstname: firstname,
                      lastname: lastname,
                      email: email,
                      dob:dob,
                      gender: gender,
                      address: address,
                      studentnumber: studentnumber,
                      phone: phone,
                      course:course
                    })
                    .then(function(docRef)
                    {
                      // console.log("Student Document written with ID: ", docRef.id);

                    })
                    .catch(function(error)
                    {
                      // console.error("Error adding document: ", error);
                      this.$message.error("Error Adding Student Record.");
                    });
              })
              .catch(function(error)
              {
                console.error("Error adding documents: ", error);
                this.$message.error("Error Adding Student Record.");
              });
              this.$message.info("New Student Record Saved.");
              this.$router.push("/");
      },
      fetchCourses(){
      this.courses = [];
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
    }
}


</script>

<style>
.register_div {
  position: absolute;

  width: 400px;
  height: 400px;

  /* Center form on page horizontally & vertically */
  top: 40%;
  left: 50%;
  margin-top: -180px;
  margin-left: -150px;
}

.register_form2 {
  width: 400px;
  height: 400px;

  background: gray;
  border-radius: 10px;

  margin: 10;
  padding: 0;
}
</style>
