<template>

<div v-if="datatables.length>0">
    <a-table :columns="columns" :data-source="datatables">
      <a slot="type" slot-scope="text">{{ text }}</a>
      <span slot="year" slot-scope="tag">
            <a-tag
              :color="'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
       <span slot="Document" slot-scope="text, record">
            <a-button type="primary" size="small">View Documents</a-button>
        </span>
      <span slot="filelink" slot-scope="text"><a :href="text" target="_new"> Open Link/File </a></span>


    </a-table>
  </div>
<div v-else>
  <span style="text-color:red" >
    No Records Found!
  </span>
</div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/firestore";
export default{
  async created(){
    var loggedIn =   localStorage.getItem("user");
    let currentUser = JSON.parse(loggedIn);
    this.user = currentUser;
    if(currentUser.type==="STUDENT"){
      if(currentUser.meta!=null || currentUser.meta!=""){
         this.fetchStudentDocuments(currentUser.meta);
      }
    }
    else{
      this.fetchAllDocuments();
    }
  },
    data() {
      return {
        course:'',
        items:[],
        data: [],
        columns:[],
        datatables:[],
        user:null

      }
    },
   methods:{
    async fetchStudentDocuments(course) {
      var list = [];
      this.columns = [];
      this.columns = [
         {
          title: "Type",
          dataIndex: "type",
          key: "type",
          scopedSlots: { customRender: 'type' },
        },
        {
          title: "Class",
          dataIndex: "class",
          key: "class",
          scopedSlots: { customRender: 'class' },
        },
        {
          title: "Year",
          dataIndex: "year",
          key: "year",
          scopedSlots: { customRender: 'year' },
        },
        {
          title: "Course",
          dataIndex: "course",
          key: "course",
          scopedSlots: { customRender: 'course' },
        },

         {
          title: "Document",
          dataIndex: "filelink",
          key: "filelink",
          scopedSlots: { customRender: 'filelink' },

        },

      ];

      this.data = [];
      var db = firebase.firestore();
       db
        .collection("documents")
        .where('course','==',course)
        .get()
        .then( (querySnapshot)=> {
          querySnapshot.forEach(function (doc) {
            list.push({
              id: doc.id,
              type: doc.data().type,
              class: doc.data().class,
              year: doc.data().year,
              course: doc.data().course,
              linkurl: doc.data().linkurl,
              filelink: doc.data().filelink,
              status: doc.data().status,
            });
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
      this.datatables = list;
    },
    async fetchAllDocuments() {
      var list = [];
      this.columns = [];
     this.columns = [
         {
          title: "Type",
          dataIndex: "type",
          key: "type",
          scopedSlots: { customRender: 'type' },
        },
        {
          title: "Class",
          dataIndex: "class",
          key: "class",
          scopedSlots: { customRender: 'class' },
        },
        {
          title: "Year",
          dataIndex: "year",
          key: "year",
          scopedSlots: { customRender: 'year' },
        },
        {
          title: "Course",
          dataIndex: "course",
          key: "course",
          scopedSlots: { customRender: 'course' },
        },

         {
          title: "Document",
          dataIndex: "filelink",
          key: "filelink",
          scopedSlots: { customRender: 'filelink' },

        },

      ];
      this.data = [];
      var db = firebase.firestore();
       db
        .collection("documents")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            list.push({
              id: doc.id,
              type: doc.data().type,
              class: doc.data().class,
              year: doc.data().year,
              course: doc.data().course,
              linkurl: doc.data().linkurl,
              filelink: doc.data().filelink,
              status: doc.data().status,
            });
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
      this.datatables = list;
    },
  }

};

</script>

