<template>
  <div>
    <a-card style="width: auto;height:auto;">
      <h2>Students list</h2>
      <a-divider />
       <div class="table-operations">

      <!-- <a-input placeholder="Search by name" style="width: 300px"> -->
      <!-- </a-input/> -->
       <a-select placeholder="Courses"  style="width: 300px " v-model="course" :options="this.items" @change="(val)=>{loadStudents(val)}">
        </a-select>
    </div>
      <br>
      <a-table :columns="columns" :data-source="datatables" bordered small>
        <span slot="action" slot-scope="text, record">
          <a-button type="danger" >
            Deactivate
          </a-button>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  data() {
    return {
      datatables: [],
      columns: [],
      items:[],
      course:''
    };
  },
  methods: {
    loadStudents(filter) {
      var list = [];
      //clear columns first
      this.columns = [];
      //load column names
      this.columns = [
        {
          title: "Student No",
          dataIndex: "studentnumber",
          key: "studentno"
        },
        {
          title: "First Name",
          dataIndex: "firstname",
          key: "firstname"
        },
        {
          title: "Last Name",
          dataIndex: "lastname",
          key: "lastname"
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender"
        },
        {
          title: "D.O.B",
          key: "dob",
          dataIndex: "dob"
        },
        {
          title: "Email",
          key: "emai;",
          dataIndex: "email"
        },
         {
          title: "Phone",
          key: "phone",
          dataIndex: "phone"
        },
        {
          title: "Address",
          key: "address",
          dataIndex: "address"
        },
        {
          title: "Course",
          key: "course",
          dataIndex: "course"
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ];
      this.data = [];
      var db = firebase.firestore();
      if(!filter || filter == 'NONE'){
        db
          .collection("students")
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

              var firstname = doc.data().firstname;
              var lastname = doc.data().lastname;
              var studentnumber = doc.data().studentnumber;
              var address = doc.data().address;
              var phone = doc.data().phone;
              var course = doc.data().course;
              var gender=doc.data().gender;
              var dob=doc.data().dob;
              var email=doc.data().email;

              list.push({
                id: doc.id,
                studentnumber: studentnumber,
                firstname: firstname,
                lastname:lastname,
                gender:gender,
                dob:dob,
                email: email,
                phone: phone,
                address: address,
                course: course,
                address: address,
              });
            });
          })
          .catch(function(error) {
            console.log("Error getting student documents: ", error);
          });
      }
      else{
          db
          .collection("students")
          .where('course','==',filter)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

              var firstname = doc.data().firstname;
              var lastname = doc.data().lastname;
              var studentnumber = doc.data().studentnumber;
              var address = doc.data().address;
              var phone = doc.data().phone;
              var course = doc.data().course;
              var gender=doc.data().gender;
              var dob=doc.data().dob;
              var email=doc.data().email;

              list.push({
                id: doc.id,
                studentnumber: studentnumber,
                firstname: firstname,
                lastname:lastname,
                gender:gender,
                dob:dob,
                email: email,
                phone: phone,
                address: address,
                course: course,
                address: address,
              });
            });
          })
          .catch(function(error) {
            console.log("Error getting student documents: ", error);
          });
      }

      this.datatables = list;
    },
     fetchCourses(){
        this.items = [];
          this.items.push({value:"NONE",label:"NONE"});
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
  created() {
    this.loadStudents();
    this.fetchCourses();
  }
};
</script>

<style scoped></style>
