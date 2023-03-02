<template>
  <div>

        <!-- add user Modal -->
     <a-modal v-model="visible" title="Create user" @ok="handleOk">

         <a-form :form="accountform" @submit="accountsubmit">

     <p>
                    Account type
                    <br />
                    <a-select default-value="ADMIN"  v-model="accounttype" >
                      <a-select-option value="SUPERADMIN">Superadmin</a-select-option>
                      <a-select-option value="ADMIN">Admin</a-select-option>
                    </a-select>
                  </p>

                   <p>
                    Email
                    <br />
                    <a-input
                      placeholder="Account email"
                      v-model="accountemail"
                      allow-clear
                      style="margin-top:5px;"
                      required

                    />
                  </p>
                    <p>
                    Password
                    <br />
                    <a-input
                      placeholder="Account password"
                      type="password"
                      v-model="accountpassword"
                      allow-clear
                      style="margin-top:5px;"
                      required
                    />
              </p>
            </a-form>
     </a-modal>

        <a-tabs>
          <a-tab-pane key="accounts">
            <span slot="tab">
              <a-icon type="user" />System Accounts
            </span>


              <p>
              <div class="table-operations">
                <a-button type="primary" @click="showModal">Add user</a-button>
              </div>
              </p>
              <br />

              <a-table :columns="columns" :data-source="users">
                <span slot="status" slot-scope="text, record">
                  <div v-if="record.status === 'Active' ||record.status === 'active'">
                    <a-icon type="check-circle" theme="twoTone" two-tone-color="#3EF99C" />
                  </div>
                  <div v-else>
                    <a-icon type="exclamation-circle" theme="twoTone" two-tone-color="#F93E3E" />
                  </div>
                </span>

                <span slot="action" slot-scope="text, record">

                  <a-button
                    v-if="record.status === 'Active' ||record.status === 'active'"
                    type="danger"
                    @click="suspend(record)"
                  >Suspend</a-button>

                  <a-button v-else type="default" @click="unsuspend(record)">Activate</a-button>

                </span>
                <template slot="footer">
                  <h3>
                    <b>Total users count {{users.length}}</b>
                  </h3>
                </template>
              </a-table>
          </a-tab-pane>


          <a-tab-pane key="pricing">
            <span slot="tab">
              <a-icon type="menu" />Courses
            </span>
            <a-form :form="fareform" @submit="handleCourse">
              <a-alert message v-if="fareerrorstate" closable type="error">
                <p slot="description">
                  <span style="color: red">{{fareerror}}</span>
                </p>
              </a-alert>
              <a-row>
                <a-col>
                  <br />
                  <p>
                    Course Name
                    <br />
                    <a-input
                      placeholder="coursename"
                      v-model="coursename"
                      allow-clear
                      style="margin-top:5px;width:400px"
                    />
                  </p>
                </a-col>
              </a-row>



              <a-button type="primary" html-type="submit">Add</a-button>
            </a-form>
             <a-divider orientation="left">All Courses Offered</a-divider>

             <a-row>
                <!-- show checklist here -->
               <a-table :columns="coursescolumns" :data-source="courses" small>
                <span slot="action" slot-scope="text, record">
                  <a-popconfirm
                    title="Are you sure delete this course?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteCourse(text)"
                    @cancel="null"
                  >
                      <a-button size='small' type="danger">
                        Remove
                      </a-button>
                </a-popconfirm>

                </span>

                 </a-table>

              </a-row>
          </a-tab-pane>

          <a-tab-pane key="checklist">
            <span slot="tab">
              <a-icon type="book" />Classes
            </span>

              <a-alert message v-if="checkerrorstate" closable type="error">
                <p slot="description">
                  <span style="color: red">{{checkerror}}</span>
                </p>
              </a-alert>
              <br>
              <a-row>
                <a-col :span="8">
                  <p>
                    Class Name
                    <br />
                    <a-input
                      placeholder="Class Name"
                      v-model="name"
                      allow-clear
                      style="margin-top:5px;width:200px"
                    />
                    <br>
                     <a-button style="margin-top:15px;" type="primary" @click="addClass">Add</a-button>
                  </p>
                </a-col>

              </a-row>
              <a-divider />
              <!-- show checklist here -->
               <a-table :columns="checklistcols" :data-source="checklisttable" bordered small>
          <span slot="action" slot-scope="text, record">
           <a-popconfirm
                    title="Are you sure delete this class?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteClass(text)"
                    @cancel="null"
                  >
                      <a-button size='small' type="danger">
                        Remove
                      </a-button>
                </a-popconfirm>
          </span>
         <span slot="certificate" slot-scope="text, record">
           <div v-if="record.certificate">
           <a-avatar
            shape="square"
            size="small"
            :style="{ backgroundColor: '#52c41a', verticalAlign: 'middle' }"
          >
            Yes
          </a-avatar>
                </div>
                <div v-else>
                    <a-avatar
            shape="square"
            size="small"
            :style="{ backgroundColor: 'red', verticalAlign: 'middle' }"
          >
            No
          </a-avatar>

           </div>
        </span>
      </a-table>



          </a-tab-pane>

        </a-tabs>
  </div>
</template>
<script>
import moment from "moment";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { Modal } from "ant-design-vue";

export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),

      fareform: this.$form.createForm(this, { name: "coordinated" }),

      accountform: this.$form.createForm(this, { name: "coordinated" }),

      //

      //errors
      errors: [],
      errorstate: false,
      loading: false,

      //form values
      amount: 0,
      type: "company fee",

      //fare pricing form
      fareerrorstate: false,
      fareerrors: false,

      category: "Sample",
      cost: "11000",

      //account models
      accountemail: "",
      accounttype: "",
      accountstatus:"Active",
      accountpassword: "",

      users: [],
      columns: [],
      visible: false,

      name:'',
      certificate:false,

      checkerror:'',
      checkerrorstate:false,

      checklisttable:[],
      checklistcols:[],

      //categories costing
      courses:[],
      coursescolumns:[],

      coursename:''




    };
  },
  methods: {
    async deleteCourse(item) {
      var db = firebase.firestore();
      const res = await db.collection('courses').doc(item.id).delete();
      this.loadCourses();
      this.$message.success('Deleted Successfully!');
    },
     async deleteClass(item) {
      var db = firebase.firestore();
      const res = await db.collection('classes').doc(item.id).delete();
      this.loadClasses();
      this.$message.success('Deleted Successfully!');
    },
     async deleteUser(item) {
      var db = firebase.firestore();
      const res = await db.collection('users').doc(item.id).delete();
      this.loadusers();
      this.$message.success('Deleted Successfully!');
    },
    async removecheck(item)
    {
      var db = firebase.firestore();
      const res = await db.collection('checklist').doc(item.id).delete();
      this.loadchecklist();

    },
    async removecategory(item)
    {
      var db = firebase.firestore();
      const res = await db.collection('classes').doc(item.id).delete();
      this.loadcategories();
    },
    loadClasses()
    {
       //clear columns first
      this.checklistcols = [];
      this.checklisttable = [];
      //load column names
      this.checklistcols = [

        {
          dataIndex: "name",
          key: "name",
          title: "Name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ];
       var db = firebase.firestore();
       var myls = [];
      var mem = db
        .collection("classes")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (element) {
                myls.push({
            id: element.id,
            name: element.data().name,
            action: ""
          });
          });
          });

          this.checklisttable = myls;


    },
    loadCourses()
    {
      //clear columns first
      this.coursescolumns = [];
      this.courses = [];
      //load column names
      this.coursescolumns = [

        {
          dataIndex: "name",
          key: "name",
          title: "Name"
        },

        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ];
       var db = firebase.firestore();
       var myls = [];
        db
          .collection("courses")
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (element) {
                  myls.push({
                            id: element.id,
                            name: element.data().name,
                            action: ""
                          });
                   });
            });

            this.courses = myls;
    },
    addClass()
    {
      if(this.name === '')
      {
        this.checkerrorstate=true;
        this.checkerror='Class Name cannot be empty';
        return;

      }
        var check = firebase.firestore();
                //client details
                check.collection("classes")
                .add({
                  name: this.name
                })
                .then(function(docRef)
                {
                  this.loadClasses();
                  //console.log("Client Document written with ID: ", docRef.id);
                })
                .catch(function(error)
                {
                //console.error("Error adding document: ", error);
                });
      this.$message.success("Class  successfully added!");
    },
    accountsubmit(e) {},
    handleCourse(e) {
      e.preventDefault();
      //add client details
                 var client = firebase.firestore();
                //client details
                client.collection("courses")
                .add({
                  name: this.coursename,
                })
                .then(function(docRef)
                {
                  //console.log("Client Document written with ID: ", docRef.id);
                })
                .catch(function(error)
                {
                //console.error("Error adding document: ", error);
                });
                this.loadCourses();
      this.$message.success("Saved Course!");
    },

    edittype(row) {
      console.log(row);
       firebase
        .database()
        .ref("users/" + row.id + "/account/")
        .set(row.account, function(error) {
          if (error) {
            console.log(error);
            // The write failed...
          } else {
            console.log("changed successfully");
            // Data saved successfully!
          }
        });
      this.$message.success("Updated account type of "+row.username+" to "+row.account);
    //  this.loadusers();
    },
    async loadusers() {
      //clear columns first
      this.columns = [];
      //load column names
      this.columns = [

        {
          dataIndex: "account",
          key: "account",
          title: "Account Type",
          scopedSlots: { customRender: "account" }
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email"
        },
        {
          dataIndex: "status",
          key: "status",
          title: "Status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ];
       var users = [];
       var db = firebase.firestore();
      var mem = db
        .collection("users")
        .where('type','==','ADMIN')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (element) {
                users.push({
            id: element.id,
            email: element.data().email,
            account: element.data().type,
            status: element.data().status,
            action: ""
          });
          });
          });

          this.users = users;


    },
    async suspend(row) {
      var db = firebase.firestore();
      const res = await db.collection('users').doc(row.id).update({
        status:'Inactive'
});
      this.$message.success("Suspended " + row.name + " Account");
      this.loadusers();
    },
    async unsuspend(row) {
     var db = firebase.firestore();
      const res = await db.collection('users').doc(row.id).update({
        status:'Active'
});
      this.$message.success("Activated " + row.name + " Account");
     this.loadusers();
    },
    showModal()
    {
      this.visible = true;
    },
    handleOk(e) {
       e.preventDefault();
        if(this.accountemail==="")
       {
         this.$message.error("please provide email.");
         return;
       }
        if(this.accounttype==="")
       {
         this.$message.error("please provide account type.");
         return;
       }
        if(this.accountpassword==="")
       {
         this.$message.error("please provide password.");
         return;
       }



       var StoreDB = firebase.firestore();
        StoreDB.collection("users")
                .add({
               type:this.accounttype,
              email:this.accountemail,
              password:this.accountpassword,
              status:'Active'
                })
                .then(function(docRef)
                {
                })
                .catch(function(error)
                {
                console.error("Error adding  document: ", error);
                });

       //proceed to add the account to firebase

        this.loadusers();
        this.$message.success("New user added successfully.");

      this.visible = false;
    },
  },

  created() {
    this.loadusers();
    this.loadClasses();
    this.loadCourses();
  },
  mounted() {}
};
</script>
