(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1126:function(e,t,r){var content=r(1134);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(123).default)("68638dcf",content,!0,{sourceMap:!1})},1133:function(e,t,r){"use strict";var o=r(1126);r.n(o).a},1134:function(e,t,r){(t=r(122)(!1)).push([e.i,".register_div{position:absolute;width:400px;height:400px;top:40%;left:50%;margin-top:-180px;margin-left:-150px}.register_form2{width:400px;height:400px;background:grey;border-radius:10px;margin:10;padding:0}",""]),e.exports=t},1142:function(e,t,r){"use strict";r.r(t);r(93),r(49);var o=r(70),n=(r(582),{created:function(){this.fetchCourses()},data:function(){return{current:"",error:"",errors:[],visible:!1,firstname:"",lastname:"",studentnumber:"",address:"",email:"",phone:"",password:"",gender:"",dob:"",course:"",form:{firstname:"",lastname:"",studentnumber:"",address:"",email:"",phone:"",password:"",gender:"",dob:"",course:""},courses:[],items:[]}},methods:{saveClient:function(){var e=this.studentnumber,t=this.firstname,r=this.gender,n=this.dob,l=this.lastname,c=this.email,address=this.address,d=this.password,m=this.phone,f=this.course;(this.errors=[],""===e&&this.errors.push("Student Number field cannot be empty"),""===t&&this.errors.push("FirstName field cannot be empty"),""===l&&this.errors.push("LastName field cannot be empty"),""===c&&this.errors.push("Email field cannot be empty"),""===m&&this.errors.push("Phone field cannot be empty"),""===address&&this.errors.push("Address field cannot be empty"),""===f&&this.errors.push("Course field cannot be empty"),this.errors.length>0)||(o.firestore().collection("users").add({email:c,type:"STUDENT",password:d,meta:f}).then((function(d){o.firestore().collection("students").add({user_id:d.id,firstname:t,lastname:l,email:c,dob:n,gender:r,address:address,studentnumber:e,phone:m,course:f}).then((function(e){})).catch((function(e){this.$message.error("Error Adding Student Record.")}))})).catch((function(e){console.error("Error adding documents: ",e),this.$message.error("Error Adding Student Record.")})),this.$message.info("New Student Record Saved."),this.$router.push("/"))},fetchCourses:function(){var e=this;this.courses=[],o.firestore().collection("courses").get().then((function(t){t.forEach((function(t){e.items.push({value:t.data().name,label:t.data().name})}))})).finally((function(){return console.log("Çompleted loading ...")}))}}}),l=(r(1133),r(69)),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("a-page-header",{staticStyle:{border:"1px solid rgb(235, 237, 240)"},attrs:{title:"Student Registration","sub-title":""}}),e._v(" "),r("div",{staticClass:"register_div"},[r("a-form",{staticClass:"register-form2"},[r("a-form-item",[r("a-input",{attrs:{placeholder:"Student/NO"},model:{value:e.studentnumber,callback:function(t){e.studentnumber=t},expression:"studentnumber"}},[r("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"number"},slot:"prefix"})],1)],1),e._v(" "),r("a-form-item",[r("a-input",{attrs:{placeholder:"Email"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}},[r("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),e._v(" "),r("a-form-item",[r("a-input",{attrs:{placeholder:"Phone"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}},[r("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"phone"},slot:"prefix"})],1)],1),e._v(" "),r("a-form-item",[r("a-input",{attrs:{placeholder:"FirstName"},model:{value:e.firstname,callback:function(t){e.firstname=t},expression:"firstname"}},[r("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),e._v(" "),r("a-form-item",[r("a-input",{attrs:{placeholder:"LastName"},model:{value:e.lastname,callback:function(t){e.lastname=t},expression:"lastname"}},[r("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),e._v(" "),r("a-form-item",[r("a-select",{attrs:{placeholder:"Gender"},model:{value:e.gender,callback:function(t){e.gender=t},expression:"gender"}},[r("a-select-option",{attrs:{value:"Male"}},[e._v("Male")]),e._v(" "),r("a-select-option",{attrs:{value:"Female"}},[e._v("Female")])],1)],1),e._v(" "),r("a-form-item",[r("a-input",{attrs:{placeholder:"Date of Birth"},model:{value:e.dob,callback:function(t){e.dob=t},expression:"dob"}},[r("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),e._v(" "),r("a-form-item",[r("a-input",{attrs:{placeholder:"Address"},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}},[r("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"pull-request"},slot:"prefix"})],1)],1),e._v(" "),r("a-form-item",[r("a-select",{attrs:{placeholder:"Courses",options:this.items},model:{value:e.course,callback:function(t){e.course=t},expression:"course"}})],1),e._v(" "),r("a-form-item",[r("a-input",{attrs:{type:"password",placeholder:"Password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}},[r("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1),e._v(" "),r("a-form-item",[r("a-button",{attrs:{type:"primary"},on:{click:e.saveClient}},[e._v("Save Record")]),e._v(" "),r("br"),e._v(" "),r("br"),e._v(" "),r("p",[e.errors.length?r("a-alert",{attrs:{message:"",closable:"",type:"error"}},[r("p",{attrs:{slot:"description"},slot:"description"},[r("span",{staticStyle:{color:"red"}},[e._v("\n             Errors\n               "),r("ul",e._l(e.errors,(function(t){return r("li",{key:t},[e._v(e._s(t))])})),0)])])]):e._e()],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);