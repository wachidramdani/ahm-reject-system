(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[25],{1137:function(e,t,a){"use strict";a.r(t),a.d(t,"Signin",(function(){return y}));var r=a(24),n=a(25),i=a(27),o=a(26),s=a(0),_=a.n(s),p=a(9),l=a(59),c=a.n(l),d=a(792),m=a(793),u=a(474),v=a(475),g=a(794),b=a(795),y=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).componentDidMount=function(){"true"===localStorage.getItem("isLogin")&&n.props.history.push("/")},n.handleLogin=function(){if(n.handleValidation()){var e=n.state.fields.username,t=n.state.fields.password;if(e&&t){var a=0,r={};n.state.user.forEach((function(n){e===n.user&&t===n.password&&(r={level:n.level,job:n.job,dept:n.dept,name:n.name,id:n.employeeID},a++)})),a>0?c.a.fire({title:"Success!",icon:"success",text:"Login Success.",showConfirmButton:!1,timer:1500}).then((function(){if(localStorage.setItem("isLogin",!0),localStorage.setItem("dataUser",JSON.stringify(r)),null===localStorage.getItem("dataSubmission")){var e=JSON.stringify(m);localStorage.setItem("dataSubmission",e)}if(null===localStorage.getItem("dataSymptoms")){var t=JSON.stringify(u);localStorage.setItem("dataSymptoms",t)}if(null===localStorage.getItem("dataPartNumber")){var a=JSON.stringify(v);localStorage.setItem("dataPartNumber",a)}if(null===localStorage.getItem("dataRc")){var i=JSON.stringify(g);localStorage.setItem("dataRc",i)}if(null===localStorage.getItem("dataInspection")){var o=JSON.stringify(b);localStorage.setItem("dataInspection",o)}n.props.history.push("/")})):c.a.fire({title:"Warning",icon:"warning",text:"Username & password are incorrect"})}else c.a.fire({title:"Warning",icon:"warning",text:"Username & password are incorrect"})}else c.a.fire({title:"Warning",icon:"warning",text:"Username & password are incorrect"})},n.state={fields:{username:"",password:"",remember_me:!1},user:d},n}return Object(n.a)(a,[{key:"handleChange",value:function(e,t){var a=this.state.fields,r=this.state.errors;switch(t){case"remember_me":a[t]=e.target.checked;break;case"username":case"password":a[t]=e.target.value,this.setState({errors:r});break;default:a[t]=e.target.value}this.setState({fields:a})}},{key:"handleValidation",value:function(){var e=this.state.fields,t={},a=!0;return e.username||(a=!1,t.username=!0),e.password||(a=!1,t.password=!0),this.setState({errors:t}),a}},{key:"render",value:function(){var e=this;return _.a.createElement("div",{className:"bg-signin"},_.a.createElement("div",{className:"az-signin-wrapper"},_.a.createElement("div",{className:"az-card-signin"},_.a.createElement("div",{className:"az-signin-header"},_.a.createElement("h2",{style:{color:"#e4051c"}},"Welcome"),_.a.createElement("h4",null,"Please sign in to continue"),_.a.createElement("form",{action:"#/"},_.a.createElement("div",{className:"form-group"},_.a.createElement("label",null,"Username"),_.a.createElement("input",{type:"text",className:"form-control",placeholder:"Enter your username",name:"username",value:this.state.fields.username,onChange:function(t){return e.handleChange(t,"username")}})),_.a.createElement("div",{className:"form-group"},_.a.createElement("label",null,"Password"),_.a.createElement("input",{type:"password",className:"form-control",placeholder:"Enter your password",name:"password",value:this.state.fields.password,onChange:function(t){return e.handleChange(t,"password")}})),_.a.createElement(p.b,{to:"#/",onClick:this.handleLogin,className:"btn btn-az-primary btn-block",style:{backgroundColor:"#e4051c"}},"Sign In"))),_.a.createElement("div",{className:"az-signin-footer"},_.a.createElement("p",null,_.a.createElement("a",{href:"#/"},"Forgot password?"))))))}}]),a}(s.Component);t.default=y},474:function(e){e.exports=JSON.parse('[{"id":"000001","catSymptomp":"Logam","nameSymptomp":"Retak","vdf":"01/02/2022","vdt":"31/12/2022","status":"Active"},{"id":"000002","catSymptomp":"Logam","nameSymptomp":"Patah","vdf":"01/02/2022","vdt":"31/12/2022","status":"Active"},{"id":"000003","catSymptomp":"Plastik","nameSymptomp":"Pecah","vdf":"01/02/2022","vdt":"31/12/2022","status":"Active"},{"id":"000004","catSymptomp":"Plastik","nameSymptomp":"Patah","vdf":"01/02/2022","vdt":"31/12/2022","status":"Active"},{"id":"000005","catSymptomp":"Cairan","nameSymptomp":"Tercemar","vdf":"01/02/2022","vdt":"31/12/2022","status":"Active"},{"id":"000006","catSymptomp":"Electrical","nameSymptomp":"Konslet","vdf":"01/02/2022","vdt":"31/12/2022","status":"Active"}]')},475:function(e){e.exports=JSON.parse('[{"id":1,"part_number":"082300000MPX","part_number_desc":"MPX SJWA","part_number_parent":"","mrp_controller":"MXX 22","vendor_desc":"Vendor B","vendor_code":"VB","isActive":false,"isParent":true},{"id":1,"part_number":"082300000MPX","part_number_desc":"MPX SJWA","part_number_parent":"","mrp_controller":"MRP 04","vendor_desc":"Vendor A","vendor_code":"VA","isActive":true,"isParent":true},{"id":2,"part_number":"0823M02K8MPX","part_number_desc":"MPX 10W30 SJWA 0.1L FED","part_number_parent":"082300000MPX","mrp_controller":"MRP 04","vendor_desc":"Vendor A","vendor_code":"VA","isActive":true,"isParent":false},{"id":3,"part_number":"082300000SPX","part_number_desc":"SPX SJWA","part_number_parent":"","mrp_controller":"MRP 01","vendor_desc":"Vendor B","vendor_code":"VB","isActive":true,"isParent":true},{"id":4,"part_number":"0823M04K8SPX","part_number_desc":"SPX 10W30 SJWA 0.1L FED","part_number_parent":"082300000SPX","mrp_controller":"MRP 01","vendor_desc":"Vendor B","vendor_code":"VB","isActive":true,"isParent":false},{"id":5,"part_number":"0833M04K8SPX","part_number_desc":"SPX 15W30 SJWA 0.5L FED","part_number_parent":"082300000SPX","mrp_controller":"MRP 02","vendor_desc":"Vendor B","vendor_code":"VB","isActive":true,"isParent":false},{"id":6,"part_number":"0853M04K8SPX","part_number_desc":"SPX 20W30 SJWA 2L FED","part_number_parent":"082300000SPX","mrp_controller":"MRP 02","vendor_desc":"Vendor B","vendor_code":"VB","isActive":true,"isParent":false},{"id":7,"part_number":"0855M04K8SPX","part_number_desc":"SPX 25W30 SJWA 2.5L FED","part_number_parent":"082300000SPX","mrp_controller":"MRP 02","vendor_desc":"Vendor B","vendor_code":"VB","isActive":true,"isParent":false},{"id":8,"part_number":"188100000KLM","part_number_desc":"KLM SOHC","part_number_parent":"","mrp_controller":"MRP 11","vendor_desc":"Vendor C","vendor_code":"VC","isActive":true,"isParent":true},{"id":9,"part_number":"1881HC751KLM","part_number_desc":"KLM 75GS SOHC LED","part_number_parent":"188100000KLM","mrp_controller":"MRP 11","vendor_desc":"Vendor C","vendor_code":"VC","isActive":true,"isParent":false},{"id":10,"part_number":"1881HC901KLM","part_number_desc":"KLM 90GS SOHC LED","part_number_parent":"188100000KLM","mrp_controller":"MRP 11","vendor_desc":"Vendor C","vendor_code":"VC","isActive":true,"isParent":false}]')},792:function(e){e.exports=JSON.parse('[{"user":"cholis","password":"8888","job":"Operator","dept":"Manage Incoming Good","name":"Cholis Firmansyah","level":"operator","employeeID":"1902992489001"},{"user":"aji","password":"8888","job":"Operator","dept":"Manage Putaway","name":"Aji Siregar","level":"operator","employeeID":"1902001295000"},{"user":"anam","password":"8888","job":"Operator","dept":"Local Process","name":"Khoirul Anam","level":"operator","employeeID":"1908200102021"},{"user":"syifa","password":"8888","job":"Operator","dept":"Manage Replenishment","name":"Syifa","level":"operator","employeeID":"1900294012021"},{"user":"nur","password":"8888","job":"Operator","dept":"Manage Picking","name":"M. Nur Ragil","level":"operator","employeeID":"1902992489001"},{"user":"dedi","password":"8888","job":"Operator","dept":"Check & Pack","name":"Dedi","level":"operator","employeeID":"1902912423001"},{"user":"bagus","password":"8888","job":"Supervisor","dept":"Warehouse","name":"Bagus","level":"admin","employeeID":"1902998888001"},{"user":"dani","password":"8888","job":"Supervisor","dept":"Warehouse","name":"Dani","level":"admin","employeeID":"1902992489001"},{"user":"ahmad","password":"8888","job":"Operator","dept":"Vendor","name":"Ahmad","level":"supplier","employeeID":"1957668689001"},{"user":"faisal","password":"8888","job":"Operator","dept":"Vendor","name":"Faisal","level":"supplier","employeeID":"1902900980001"},{"user":"rohman","password":"8888","job":"Operator","dept":"Vendor","name":"Rohman","level":"supplier","employeeID":"1902989089001"}]')},793:function(e){e.exports=JSON.parse('[{"id":"19082001020211669449158","fullName":"Khoirul Anam","employeeId":"1908200102021","job":"Seismic Engineer","discipline":"Engineering","purpose":"Increase Production","abstract_title":"Explore and Utilize AI to Enhance Seismic Survey Data Results","abstract_desc":"Adopting AI Technology to enhance Seismic Data resulted from Survey and Combine with Data Analytics to Improve Results Accuracy","abstract_content":"<p style=\\"text-align:left;\\"><span style=\\"color: rgb(32,33,36);background-color: rgb(248,249,250);font-size: 14px;font-family: inherit;\\"><strong>The old machine has started to lag frequently</strong></span><span style=\\"font-size: 14px;\\"><strong> </strong></span></p>\\n<p><span style=\\"font-size: 14px;\\">need to buy a new machine to reduce time processing</span></p>\\n","novelty_type":"New","roi_value":"High | 15-20%","hse_value":"Contain Hazard","cost_saving_value":"Moderate Impact | 50 K - 100 K USD","hierarchy_level":"Equipment | Turbo Compressor Package Train A","change_level":"Medium | Applied Change to Existing Procewss or Introduce New Change - less than or at least 5 Steps/Processes","description":"No risk","status":"clustering"},{"id":"19029924890011669422296","fullName":"Aji Siregar","employeeId":"1902992489001","job":"Process Engineer","discipline":"Operations","purpose":"Reduce Cost","abstract_title":"Reduce Oil Sampling Test Time and Cost by Apply Digital Technology Sensing","abstract_desc":"Explore and Implement Digital Sensing technology for oil sampling and analysis to improve time and data accuracy","abstract_content":"<p>Abstract description <strong>here</strong></p>\\n","novelty_type":"New","roi_value":"Moderate | <10%","hse_value":"Contain Hazard","cost_saving_value":"Moderate High Impact | 100 - 500 K USD","hierarchy_level":"Facility | Train A","change_level":"Low | Applied Change to Existing Procewss or Introduce New Change - less than or at least 2 Steps/Processes","description":"Okay","status":"clustering"},{"id":"19029924890011669447589","fullName":"Syifa","employeeId":"1900294012021","job":"Process Engineer","discipline":"Safety","purpose":"Reduced Risk","abstract_title":"Infra Red Sensor Application for Detecting Smoke","abstract_desc":"To apply recent IR Smoke detector to enhace safety alarm and quick response to minimize hazards","abstract_content":"<p>Here is my abstract</p>\\n","novelty_type":"Improve Existing","roi_value":"Medium | 10-15%","hse_value":"Remove Hazard","cost_saving_value":"Very High Impact | 500 - 1 MM USD","hierarchy_level":"Sub Equipment | Train A LP Compressor","change_level":"Low | Applied Change to Existing Procewss or Introduce New Change - less than or at least 2 Steps/Processes","description":"No description","status":"clustering"},{"id":"19029924890011669447858370","fullName":"M. Nur Ragil","employeeId":"1902992489001","job":"Safety Engineer","discipline":"Engineering","purpose":"Reduced Risk","abstract_title":"Apply Asset Digital ID devices (including alert system) to trasmit digitally for any Failure Alarms","abstract_desc":"To prevent asset loss and also to be able quick react and mitigation response and to minimize any fatality ","abstract_content":"<p>Sample <strong>abstract</strong> must be here</p>\\n","novelty_type":"New","roi_value":"Very High | >20%","hse_value":"Minimize Hazard","cost_saving_value":"Extremely High Impact | > 1 MM USD","hierarchy_level":"Sub System | Compressor","change_level":"High/Radical | Applied Change to Existing Procewss or Introduce New Change - more than Steps/Process","description":"Write description here","status":"clustering"}]')},794:function(e){e.exports=JSON.parse('[{"id":"1","process":"Assign Pro to Pallet","sloc_asal":"M402","sloc_tujuan":"M407 Prov. To Vendor","bin":"","beban":"","no_rc":"RCC202300001","part_number_induk":"0823M99K8JZ2","part_induk_desc":"MPX 10W30 SJWA 0.8L FED","part_number_anak":"0823M99K8JZ2","part_anak_desc":"MPX 10W30 SJWA 0.8L FED","mrp_controller":"R04","jumlah":"2","quality_quantity":"Quantity","action":"Claim Goods","operator_id_create":"123xxx","vendor_repair":"PT Denso Sales Indonesia","status":"COMPLETE","alasan_reprint":"salah","operator_id_cancel":"","delivery_note_take_part":"12/09/2018/1100000","plat_number_reject_take":"B 8291 JS","estimated_date_take_project":"09/09/2018","estimated_time_take_project":"10.00 - 11.00","actual_date_give_project":"09/09/2018","actual_time_give_project":"10.55","operator_id_give_part":"123xxx","delivery_note_give_part":"12/09/2018/1100000","plat_number_reject_give":"B 8291 JS","estimated_date_give_part":"09/09/2018","estimated_time_give_part":"10.00 - 11.00","actual_date_receive_part":"09/09/2018","actual_time_receive_part":"10.55","operator_id_receiver_part":"123xxx","supplier_code":"SB","supplier_desc":"Supplier B","no_surat_jalan":"","symptom":[{"id":"00001","name":"tercemar","quantity":"2"},{"id":"00002","name":"patah","quantity":"3"}]},{"id":"2","process":"Receiving","sloc_asal":"M402","sloc_tujuan":"M407 Prov. To Vendor","bin":"","beban":"","no_rc":"RCA202300001","part_number_induk":"0823M99K8JZ2","part_induk_desc":"MPX 10W30 SJWA 0.8L FED","part_number_anak":"0823M99K8JZ2","part_anak_desc":"MPX 10W30 SJWA 0.8L FED","mrp_controller":"R04","jumlah":"2","quality_quantity":"Quantity","action":"Claim Goods","operator_id_create":"123xxx","vendor_repair":"PT Denso Sales Indonesia","status":"CREATED","alasan_reprint":"","operator_id_cancel":"","delivery_note_take_part":"","plat_number_reject_take":"","estimated_date_take_project":"","estimated_time_take_project":"","actual_date_give_project":"","actual_time_give_project":"","operator_id_give_part":"","delivery_note_give_part":"","plat_number_reject_give":"","estimated_date_give_part":"","estimated_time_give_part":"","actual_date_receive_part":"","actual_time_receive_part":"","operator_id_receiver_part":"","supplier_code":"SB","supplier_desc":"Supplier B","no_surat_jalan":"","symptom":[{"id":"00001","name":"tercemar","quantity":"2"}]},{"id":"3","process":"Assign Pro to Pallet","sloc_asal":"M402","bin":"","beban":"","no_rc":"RCC202300002","part_number_induk":"0823M99K8JZ2","part_induk_desc":"MPX 10W30 SJWA 0.8L FED","part_number_anak":"0823M99K8JZ2","part_anak_desc":"MPX 10W30 SJWA 0.8L FED","mrp_controller":"R04","jumlah":"2","quality_quantity":"Quantity","action":"Scrap","operator_id_create":"123xxx","vendor_repair":"PT Denso Sales Indonesia","status":"SUPPLIER","alasan_reprint":"","operator_id_cancel":"","delivery_note_take_part":"","plat_number_reject_take":"","estimated_date_take_project":"","estimated_time_take_project":"","actual_date_give_project":"","actual_time_give_project":"","operator_id_give_part":"","delivery_note_give_part":"","plat_number_reject_give":"","estimated_date_give_part":"","estimated_time_give_part":"","actual_date_receive_part":"","actual_time_receive_part":"","operator_id_receiver_part":"","supplier_code":"SA","supplier_desc":"Supplier A","no_surat_jalan":"","symptom":[{"id":"00001","name":"tercemar","quantity":"2"}]},{"id":"4","process":"Assign Pro to Pallet","sloc_asal":"M402","sloc_tujuan":"M407","bin":"","beban":"","no_rc":"RCC202300003","part_number_induk":"0823M99K8JZ2","part_induk_desc":"MPX 10W30 SJWA 0.8L FED","part_number_anak":"0823M99K8JZ2","part_anak_desc":"MPX 10W30 SJWA 0.8L FED","mrp_controller":"R04","jumlah":"2","quality_quantity":"Quality","action":"Claim Goods","operator_id_create":"123xxx","vendor_repair":"PT Denso Sales Indonesia","status":"DRAFT","alasan_reprint":"","operator_id_cancel":"","delivery_note_take_part":"","plat_number_reject_take":"","estimated_date_take_project":"","estimated_time_take_project":"","actual_date_give_project":"","actual_time_give_project":"","operator_id_give_part":"","delivery_note_give_part":"","plat_number_reject_give":"","estimated_date_give_part":"","estimated_time_give_part":"","actual_date_receive_part":"","actual_time_receive_part":"","operator_id_receiver_part":"","no_surat_jalan":"","symptom":[{"id":"00001","name":"tercemar","quantity":"2"}]},{"id":"5","process":"Receiving","sloc_tujuan":"M407 Prov. To Vendor","bin":"","beban":"","no_rc":"RCA2023000012","part_number_induk":"0823M99K8JZ2","part_induk_desc":"MPX 10W30 SJWA 0.8L FED","part_number_anak":"0823M99K8JZ2","part_anak_desc":"MPX 10W30 SJWA 0.8L FED","mrp_controller":"R04","jumlah":"2","quality_quantity":"Quality","action":"Claim Goods","operator_id_create":"123xxx","vendor_repair":"PT Denso Sales Indonesia","status":"GIVE PART","alasan_reprint":"","operator_id_cancel":"","delivery_note_take_part":"","plat_number_reject_take":"","estimated_date_take_project":"","estimated_time_take_project":"","actual_date_give_project":"","actual_time_give_project":"","operator_id_give_part":"","delivery_note_give_part":"","plat_number_reject_give":"","estimated_date_give_part":"","estimated_time_give_part":"","actual_date_receive_part":"","actual_time_receive_part":"","operator_id_receiver_part":"","no_surat_jalan":"","symptom":[{"id":"00001","name":"tercemar","quantity":"2"}]}]')},795:function(e){e.exports=JSON.parse('[{"id":"1","part_number":"0823M99K8JZ9","part_number_desc":"MPX 10W30 SJWA 0.8L FED","vdf":"01/02/2022","vdt":"31/12/2022","status":"Active"},{"id":"2","part_number":"082300000MPX","part_number_desc":"MPX 10W30 SJWA 1L FED","vdf":"01/02/2022","vdt":"31/12/2022","status":"Active"},{"id":"3","part_number":"0823M99K8JZ9","part_number_desc":"MPX 10W30 SJWA 0.8L FED","vdf":"01/02/2022","vdt":"31/12/2022","status":"Non Active"}]')}}]);
//# sourceMappingURL=25.1c1ef821.chunk.js.map