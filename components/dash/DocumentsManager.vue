<template>
  <div>
    <a-card style="width: auto;height:auto;">
      <a-divider>New Document</a-divider>
      <a-row>
        <a-col :span="12">
          <p>
            Academic Year
            <br />
              <a-select style="margin-top:5px;width: 300px" v-model="selected_year">
                    <a-select-option value="2023">2023</a-select-option>
                    <a-select-option value="2024">2024</a-select-option>
                    <a-select-option value="2025">2025</a-select-option>
              </a-select>
          </p>
            <p>
            Type
            <br />
            <a-select  style="margin-top:5px;width:300px" placeholder="Types" v-model="selected_type">
                    <a-select-option value="TimeTable">TimeTable</a-select-option>
                    <a-select-option value="Fees Statements">Fees Statements</a-select-option>
                    <a-select-option value="Fee Structure">Fee Structure</a-select-option>
                    <a-select-option value="Asignments">Asignments</a-select-option>
            </a-select>
          </p>
          <p>
            Course
            <br />
                <a-select  style="margin-top:5px;width:300px" placeholder="Courses" v-model="selected_course" :options="courses">
                 </a-select>
          </p>
          <p>
            Class
            <br />
                <a-select  style="margin-top:5px;width:300px" placeholder="Courses" v-model="selected_class" :options="classes">
                 </a-select>
          </p>
          <p>
          <a-input placeholder="Description or Link url e.g google drive" v-model="link_url">
          <a-icon slot="prefix" type="text" style="color: rgba(0,0,0,.25)" />
        </a-input>
          </p>
        </a-col>
        <a-col :span="12">
          Add Documents (pdf,images,word,excel)
          <br />
          <div class="clearfix">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
              :file-list="fileList"
              :max-count="1"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length <1">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-col>
      </a-row>
      <a-button size="size" type="primary" @click="submitDocument">Add Document</a-button>

      <a-divider>Created Documents</a-divider>
      <div class="table-operations"></div>
      <br />
      <div v-if="datatables.length>0">
      <a-table :columns="columns" :data-source="datatables" bordered small>
        <a slot="type" slot-scope="text">{{ text }}</a>
        <span slot="year" slot-scope="tag">
            <a-tag
              :color="'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>

        <span slot="filelink" slot-scope="text,record"><a :href="text" target="_new"> Open Link/File </a></span>
        <span slot="status" slot-scope="text, record">
            <a-popconfirm
                    title="Are you sure delete this document?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteDoc(text)"
                    @cancel="null"
                  >
                      <a-button size='small' type="danger">
                        Remove
                      </a-button>
                </a-popconfirm>
        </span>
      </a-table>
      </div>
      <div v-else>
       <span style="text-color:red" >
          No Records Found!
        </span>
      </div>
    </a-card>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  data() {
    return {
      selected_type:'',
      types:[],
      selected_class:'',
      classes:[],
      link_url:'',
      title: "",
      cost: "",
      description: "",
      images: [],
      author: "",
      datatables: [],
      columns: [],
      professions: [],
      previewVisible: false,
      previewImage: "",
      selected_course:'',
      course:'',
      courses:[],
      selected_year:'',
      fileList: [

      ],
    };
  },
  methods: {
     async deleteDoc(item) {
      var db = firebase.firestore();
      const res = await db.collection('documents').doc(item.id).delete();
      this.$message.success('Deleted Document Successfully!');
      this.fetch();
    },
    submitDocument() {
      let file =  this.fileList[0];
      const metadata = {
        contentType: file.type
      }
      // Create a reference to the destination where we're uploading
      // the file.
      const storage = firebase.storage()
      const imageRef =   storage.ref(`documents/${file.name}`)
      const uploadTask = imageRef.put(file.originFileObj, metadata).then((snapshot) => {
        // Once the image is uploaded, obtain the download URL, which
        // is the publicly accessible URL of the image.
        snapshot.ref.getDownloadURL().then((url) => {
          //create the doc
          if(url){
            console.log(url);
             this.createDocument(url);
          }
        })
        }).catch((error) => {
          console.error('Error uploading image', error);
          this.createDocument('');
        });
    },
    createDocument(downloadLink){
    var db = firebase.firestore();
        //client details
        db.collection("documents")
          .add({
            year: this.selected_year,
            type: this.selected_type,
            course: this.selected_course,
            class: this.selected_class,
            linkurl: this.link_url,
            filelink:downloadLink
          })
          .then(function (docRef) {
            //console.log("Client Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            //console.error("Error adding document: ", error);
          });
      this.fetch();
      this.$message.success("Plan submitted  successfully.");
    },
    fetch() {
      var list = [];
      //clear columns first
      this.columns = [];
      //load column names
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
         {
          title: "Description",
          dataIndex: "description",
          key: "description",
          scopedSlots: { customRender: 'description' },

        },

        {
          title: "Status",
          key: "status",
          scopedSlots: { customRender: "status" },
        },
      ];
      this.data = [];
      var db = firebase.firestore();
      var mem = db
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
              filelink: doc.data().filelink,
              description: doc.data().linkurl,
              status: doc.data().status,
            });
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
      this.datatables = list;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
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
              this.courses.push({value:doc.data().name,label:doc.data().name});
            });
          })
         .finally(() => console.log('Çompleted loading ...'));
    },
     fetchClasses(){
       this.classes = [];
       var db = firebase.firestore();
        db
        .collection("classes")
        .get()
        .then((querySnapshot) =>
        {
            querySnapshot.forEach((doc)=>
            {
              this.classes.push({value:doc.data().name,label:doc.data().name});
            });
          })
         .finally(() => console.log('Completed loading ...'));
    }
  },
  created() {
    this.fetch();
    this.fetchCourses();
    this.fetchClasses();
  },
};
</script>

<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
