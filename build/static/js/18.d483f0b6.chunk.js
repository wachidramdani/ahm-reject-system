(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[18],{1036:function(e,a,t){"use strict";var n=t(2),l=t(1153),r=t(407);a.a=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(l.a)(e,Object(n.a)({defaultTheme:r.a},a))}},1037:function(e,a,t){e.exports=t.p+"static/media/img1.c1f50082.jpg"},1038:function(e,a,t){e.exports=t.p+"static/media/img2.60ce71e5.jpg"},1039:function(e,a,t){e.exports=t.p+"static/media/img3.d6c651bb.jpg"},1155:function(e,a,t){"use strict";t.r(a);var n=t(58),l=t(0),r=t.n(l),c=t(93),i=t(179),s=t(278),o=t(1165),m=t(170),u=t(406),d=t(203),b=t(131),f=t(1036),p=t(229),v=t(59),h=t.n(v),E=(t(96),Object(f.a)((function(){return{label:{width:170,fontWeight:700,fontStyle:"italic"},flexForm:{display:"flex",marginBottom:10},w30:{width:"30%"},titleTabel:{width:"100%",marginTop:10,marginBottom:10,fontWeight:500}}})));var N=function(e){var a=e.open,t=e.onClose,i=E(),s=Object(l.useState)(null),o=Object(n.a)(s,2),f=o[0],v=o[1],N=Object(l.useState)(1),g=Object(n.a)(N,2),x=g[0],y=g[1],O=Object(l.useState)(5),j=Object(n.a)(O,2),w=j[0],C=j[1],S=Object(l.useState)([]),P=Object(n.a)(S,2),k=P[0],I=P[1],F=Object(l.useState)([]),T=Object(n.a)(F,2),R=T[0],z=T[1],A=Object(l.useRef)(null),D=[{dataField:"#",text:"#",headerAlign:"center",align:"center",formatter:function(e,a,t){var n=(x-1)*w+(t+1);return r.a.createElement("span",null,n)},headerStyle:function(e,a){return{width:"50px"}}},{dataField:"nameFile",text:"Name File",headerAlign:"center",align:"left",editable:!1,headerStyle:function(e,a){return{width:"270px"}}}],H=function(e,a){if("partNumber"===a&&v(e.target.value),"pict"===a){var t={id:R.length+1,nameFile:e.target.files[0].name};t&&(z(R.concat(t)),A&&(A.current.value=null))}},L=function(e,a,t){if(!0===t&&"single"===e)I([].concat(Object(m.a)(k),[a]));else if(!0===t&&"all"===e)I(a);else if("single"===e){var n=k,l=n.findIndex((function(e){return e.id===a.id}));-1!==l&&(n.splice(l,1),I(n))}else I([])};return r.a.createElement(u.a,{show:a,onHide:t,dialogClassName:"custom-modal"},r.a.createElement(u.a.Header,{closeButton:!0},r.a.createElement(u.a.Title,null,r.a.createElement("div",{className:"div-icon"},r.a.createElement("i",{className:"typcn typcn-plus"}))," Standard Picture")),r.a.createElement(u.a.Body,null,r.a.createElement("div",{className:"row row-sm"},r.a.createElement("div",{className:"col-lg-12 mg-t-15"},r.a.createElement("div",{className:i.flexForm},r.a.createElement("span",{className:i.label},"Part Number",r.a.createElement("span",{style:{color:"red"}},"*")),r.a.createElement("div",{className:i.w30},r.a.createElement(d.a.Control,{type:"text",name:"partNumber",value:f,onChange:function(e){return H(e,"partNumber")}}))),r.a.createElement("div",{className:i.flexForm},r.a.createElement("span",{className:i.label},"Part Desc."),r.a.createElement("div",{className:i.w30},r.a.createElement(d.a.Control,{type:"text",name:"partNumber",value:f,onChange:function(e){return H(e,"partNumber")},disabled:!0}))),r.a.createElement("div",{className:i.flexForm},r.a.createElement("span",{className:i.label},"Valid Date From",r.a.createElement("span",{style:{color:"red"}},"*")),r.a.createElement("div",{className:i.w30},r.a.createElement(d.a.Control,{type:"date",name:"partNumber",value:f,onChange:function(e){return H(e,"partNumber")}}))),r.a.createElement("div",{className:i.flexForm},r.a.createElement("span",{className:i.label},"Valid Date To",r.a.createElement("span",{style:{color:"red"}},"*")),r.a.createElement("div",{className:i.w30},r.a.createElement(d.a.Control,{type:"date",name:"partNumber",value:f,onChange:function(e){return H(e,"partNumber")}}))),r.a.createElement("div",{className:i.flexForm},r.a.createElement("span",{className:i.label},"Standard Picture",r.a.createElement("span",{style:{color:"red"}},"*")),r.a.createElement("div",{className:i.w30},r.a.createElement(d.a.Control,{type:"file",name:"pict",onChange:function(e){return H(e,"pict")},ref:A})))),r.a.createElement(b.a.Divider,{style:{width:"100%"}}),r.a.createElement("div",{className:"col-sm-12"},r.a.createElement("div",{className:i.titleTabel},"List File Attachment"),r.a.createElement("div",{className:"az-content-label mg-b-5"},r.a.createElement("div",{className:"az-dashboard-nav",style:{borderBottom:"none",marginBottom:0}},r.a.createElement("nav",{className:"nav"},r.a.createElement("a",{className:"nav-link",href:"javascript:;"},r.a.createElement(c.a,{variant:"success btn-block",className:"btn-info btn-brand btn-sm icon mg-r-2",style:{lineHeight:"28px",display:"flex"},disabled:0===R.length},r.a.createElement("i",{className:"typcn typcn-download",style:{fontSize:"18px",lineHeight:"28px"}})," ","Download")),r.a.createElement("a",{className:"nav-link",href:"javascript:;"},r.a.createElement(c.a,{variant:"danger btn-block",className:"btn-danger btn-brand btn-sm icon mg-r-2",style:{lineHeight:"28px",display:"flex"},onClick:function(){k.length>0&&h.a.fire({title:"Warning",text:"Are you sure you want to delete this data?",icon:"warning",cancelButtonText:"Cancel!",cancelButtonColor:"#d33",confirmButtonText:"Yes!",confirmButtonColor:"#3085d6",showCancelButton:!0}).then((function(e){if(e.value){var a=R.filter((function(e){return!k.includes(e)}));z(a),L("all",null,!1)}}))},disabled:0===R.length},r.a.createElement("i",{className:"typcn typcn-trash",style:{fontSize:"18px",lineHeight:"28px"}})," ","Delete")),r.a.createElement("a",{className:"nav-link",href:"#/"},r.a.createElement("i",{className:"fas fa-ellipsis-h"})))))),r.a.createElement("div",{className:"az-content-label mg-b-5",style:{width:"50%"}},r.a.createElement(p.a,{caption:"",tableHead:D,datas:R,handlePageChange:function(e,a){y(e),C(a)},handleSelectRow:L})),r.a.createElement("div",{className:"row row-sm w-100",style:{padding:"0 0 0 20px",justifyContent:"center"}},r.a.createElement("div",{className:"col-lg-2"},r.a.createElement(c.a,{variant:"success btn-block",onClick:t},r.a.createElement("i",{className:"typcn typcn-tick",style:{fontSize:"18px"}})," Save")),r.a.createElement("div",{className:"col-lg-2"},r.a.createElement(c.a,{variant:"danger btn-block",onClick:t},r.a.createElement("i",{className:"typcn typcn-times",style:{fontSize:"18px"}})," Back"))))))},g=t(2),x=t(5),y=t(18);var O=function(e,a){var t=Object(l.useRef)(!0);Object(l.useEffect)((function(){if(!t.current)return e();t.current=!1}),a)},j=t(80),w=t(74),C=t(619),S=Math.pow(2,31)-1;function P(e,a,t){var n=t-Date.now();e.current=n<=S?setTimeout(a,n):setTimeout((function(){return P(e,a,t)}),S)}var k=t(17),I=t.n(k),F=t(618),T=t(4),R=t.n(T),z=t(43),A=t(42),D=Object(A.a)("carousel-caption"),H=t(12),L=["as","bsPrefix","children","className"],V=r.a.forwardRef((function(e,a){var t=e.as,n=void 0===t?"div":t,l=e.bsPrefix,c=e.children,i=e.className,s=Object(x.a)(e,L),o=I()(i,Object(H.a)(l,"carousel-item"));return r.a.createElement(n,Object(g.a)({ref:a},s,{className:o}),c)}));V.displayName="CarouselItem";var B=V,M=t(216),W=t(44),J=t(670),K=t(669),_=["as","bsPrefix","slide","fade","controls","indicators","activeIndex","onSelect","onSlide","onSlid","interval","keyboard","onKeyDown","pause","onMouseOver","onMouseOut","wrap","touch","onTouchStart","onTouchMove","onTouchEnd","prevIcon","prevLabel","nextIcon","nextLabel","className","children"],G={bsPrefix:R.a.string,as:R.a.elementType,slide:R.a.bool,fade:R.a.bool,controls:R.a.bool,indicators:R.a.bool,activeIndex:R.a.number,onSelect:R.a.func,onSlide:R.a.func,onSlid:R.a.func,interval:R.a.number,keyboard:R.a.bool,pause:R.a.oneOf(["hover",!1]),wrap:R.a.bool,touch:R.a.bool,prevIcon:R.a.node,prevLabel:R.a.string,nextIcon:R.a.node,nextLabel:R.a.string},X={slide:!0,fade:!1,controls:!0,indicators:!0,defaultActiveIndex:0,interval:5e3,keyboard:!0,pause:"hover",wrap:!0,touch:!0,prevIcon:r.a.createElement("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),prevLabel:"Previous",nextIcon:r.a.createElement("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),nextLabel:"Next"};function Y(e,a){var t=Object(z.a)(e,{activeIndex:"onSelect"}),n=t.as,c=void 0===n?"div":n,i=t.bsPrefix,s=t.slide,o=t.fade,m=t.controls,u=t.indicators,d=t.activeIndex,b=t.onSelect,f=t.onSlide,p=t.onSlid,v=t.interval,h=t.keyboard,E=t.onKeyDown,N=t.pause,k=t.onMouseOver,T=t.onMouseOut,R=t.wrap,A=t.touch,D=t.onTouchStart,L=t.onTouchMove,V=t.onTouchEnd,B=t.prevIcon,G=t.prevLabel,X=t.nextIcon,Y=t.nextLabel,q=t.className,Q=t.children,U=Object(x.a)(t,_),Z=Object(H.a)(i,"carousel"),$=Object(l.useRef)(null),ee=Object(l.useState)("next"),ae=ee[0],te=ee[1],ne=Object(l.useState)(!1),le=ne[0],re=ne[1],ce=Object(l.useState)(!1),ie=ce[0],se=ce[1],oe=Object(l.useState)(d||0),me=oe[0],ue=oe[1];ie||d===me||($.current?te($.current):te((d||0)>me?"next":"prev"),s&&se(!0),ue(d||0)),Object(l.useEffect)((function(){$.current&&($.current=null)}));var de,be=0;Object(M.a)(Q,(function(e,a){++be,a===d&&(de=e.props.interval)}));var fe=Object(j.a)(de),pe=Object(l.useCallback)((function(e){if(!ie){var a=me-1;if(a<0){if(!R)return;a=be-1}$.current="prev",b&&b(a,e)}}),[ie,me,b,R,be]),ve=Object(y.a)((function(e){if(!ie){var a=me+1;if(a>=be){if(!R)return;a=0}$.current="next",b&&b(a,e)}})),he=Object(l.useRef)();Object(l.useImperativeHandle)(a,(function(){return{element:he.current,prev:pe,next:ve}}));var Ee=Object(y.a)((function(){!document.hidden&&function(e){if(!e||!e.style||!e.parentNode||!e.parentNode.style)return!1;var a=getComputedStyle(e);return"none"!==a.display&&"hidden"!==a.visibility&&"none"!==getComputedStyle(e.parentNode).display}(he.current)&&ve()})),Ne="next"===ae?"left":"right";O((function(){s||(f&&f(me,Ne),p&&p(me,Ne))}),[me]);var ge=Z+"-item-"+ae,xe=Z+"-item-"+Ne,ye=Object(l.useCallback)((function(e){Object(K.a)(e),f&&f(me,Ne)}),[f,me,Ne]),Oe=Object(l.useCallback)((function(){se(!1),p&&p(me,Ne)}),[p,me,Ne]),je=Object(l.useCallback)((function(e){if(h&&!/input|textarea/i.test(e.target.tagName))switch(e.key){case"ArrowLeft":return e.preventDefault(),void pe(e);case"ArrowRight":return e.preventDefault(),void ve(e)}E&&E(e)}),[h,E,pe,ve]),we=Object(l.useCallback)((function(e){"hover"===N&&re(!0),k&&k(e)}),[N,k]),Ce=Object(l.useCallback)((function(e){re(!1),T&&T(e)}),[T]),Se=Object(l.useRef)(0),Pe=Object(l.useRef)(0),ke=function(){var e=Object(w.a)(),a=Object(l.useRef)();return Object(C.a)((function(){return clearTimeout(a.current)})),Object(l.useMemo)((function(){var t=function(){return clearTimeout(a.current)};return{set:function(n){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;e()&&(t(),l<=S?a.current=setTimeout(n,l):P(a,n,Date.now()+l))},clear:t}}),[])}(),Ie=Object(l.useCallback)((function(e){Se.current=e.touches[0].clientX,Pe.current=0,"hover"===N&&re(!0),D&&D(e)}),[N,D]),Fe=Object(l.useCallback)((function(e){e.touches&&e.touches.length>1?Pe.current=0:Pe.current=e.touches[0].clientX-Se.current,L&&L(e)}),[L]),Te=Object(l.useCallback)((function(e){if(A){var a=Pe.current;Math.abs(a)>40&&(a>0?pe(e):ve(e))}"hover"===N&&ke.set((function(){re(!1)}),v||void 0),V&&V(e)}),[A,N,pe,ve,ke,v,V]),Re=null!=v&&!le&&!ie,ze=Object(l.useRef)();Object(l.useEffect)((function(){var e,a;if(Re)return ze.current=window.setInterval(document.visibilityState?Ee:ve,null!=(e=null!=(a=fe.current)?a:v)?e:void 0),function(){null!==ze.current&&clearInterval(ze.current)}}),[Re,ve,fe,v,Ee]);var Ae=Object(l.useMemo)((function(){return u&&Array.from({length:be},(function(e,a){return function(e){b&&b(a,e)}}))}),[u,be,b]);return r.a.createElement(c,Object(g.a)({ref:he},U,{onKeyDown:je,onMouseOver:we,onMouseOut:Ce,onTouchStart:Ie,onTouchMove:Fe,onTouchEnd:Te,className:I()(q,Z,s&&"slide",o&&Z+"-fade")}),u&&r.a.createElement("ol",{className:Z+"-indicators"},Object(M.b)(Q,(function(e,a){return r.a.createElement("li",{key:a,className:a===me?"active":void 0,onClick:Ae?Ae[a]:void 0})}))),r.a.createElement("div",{className:Z+"-inner"},Object(M.b)(Q,(function(e,a){var t=a===me;return s?r.a.createElement(F.c,{in:t,onEnter:t?ye:void 0,onEntered:t?Oe:void 0,addEndListener:J.a},(function(a){return r.a.cloneElement(e,{className:I()(e.props.className,t&&"entered"!==a&&ge,("entered"===a||"exiting"===a)&&"active",("entering"===a||"exiting"===a)&&xe)})})):r.a.cloneElement(e,{className:I()(e.props.className,t&&"active")})}))),m&&r.a.createElement(r.a.Fragment,null,(R||0!==d)&&r.a.createElement(W.a,{className:Z+"-control-prev",onClick:pe},B,G&&r.a.createElement("span",{className:"sr-only"},G)),(R||d!==be-1)&&r.a.createElement(W.a,{className:Z+"-control-next",onClick:ve},X,Y&&r.a.createElement("span",{className:"sr-only"},Y))))}var q=r.a.forwardRef(Y);q.displayName="Carousel",q.propTypes=G,q.defaultProps=X,q.Caption=D,q.Item=B;var Q=q,U=t(1037),Z=t.n(U),$=t(1038),ee=t.n($),ae=t(1039),te=t.n(ae),ne=Object(f.a)((function(){return{label:{width:170,fontWeight:700,fontStyle:"italic"},flexForm:{display:"flex",marginBottom:10,justifyContent:"center"},w20:{width:"20%"}}}));var le=function(e){var a=e.open,t=e.onClose,n=ne(),l=function(e,a){console.log(a,"name")};return r.a.createElement(u.a,{show:a,onHide:t,dialogClassName:"custom-modal"},r.a.createElement(u.a.Header,{closeButton:!0},r.a.createElement(u.a.Title,null,r.a.createElement("div",{className:"div-icon"},r.a.createElement("i",{className:"typcn typcn-plus"}))," Standar Inspection Parts")),r.a.createElement(u.a.Body,null,r.a.createElement("div",null,r.a.createElement("div",{className:n.flexForm},r.a.createElement("span",{className:n.label},"Part Number",r.a.createElement("span",{style:{color:"red"}},"*")),r.a.createElement("div",{className:n.w20},r.a.createElement(d.a.Control,{type:"text",name:"partNumber",value:"",onChange:function(e){return l(0,"partNumber")}}))),r.a.createElement("div",{className:n.flexForm},r.a.createElement("span",{className:n.label},"Part Desc."),r.a.createElement("div",{className:n.w20},r.a.createElement(d.a.Control,{type:"text",name:"partNumber",value:"",onChange:function(e){return l(0,"partNumber")}}))),r.a.createElement("section",{className:"slider container mb-3",style:{width:"50%"}},r.a.createElement(Q,{"data-bs-theme":"dark"},r.a.createElement(Q.Item,{className:"slide"},r.a.createElement("img",{className:"d-block w-100",src:Z.a,alt:"First slide"})),r.a.createElement(Q.Item,{className:"slide"},r.a.createElement("img",{className:"d-block w-100",src:ee.a,alt:"Second slide"})),r.a.createElement(Q.Item,{className:"slide"},r.a.createElement("img",{className:"d-block w-100",src:te.a,alt:"Third slide"})))))))},re=t(1154),ce=t(1156),ie=t(1157),se=t(1150),oe=t(1151);a.default=function(){var e=Object(l.useState)(!0),a=Object(n.a)(e,2),t=a[0],m=a[1],u=Object(l.useState)(null),d=Object(n.a)(u,2),b=d[0],f=d[1],p=Object(l.useState)(""),v=Object(n.a)(p,2),h=v[0],E=v[1],g=Object(l.useState)(""),x=Object(n.a)(g,2),y=x[0],O=x[1],j=Object(l.useState)(null),w=Object(n.a)(j,2),C=w[0],S=w[1],P=Object(l.useState)(1),k=Object(n.a)(P,2),I=k[0],F=k[1],T=Object(l.useState)(2),R=Object(n.a)(T,2),z=R[0],A=R[1],D=Object(l.useState)(!1),H=Object(n.a)(D,2),L=H[0],V=H[1],B=Object(l.useState)(!1),M=Object(n.a)(B,2),W=M[0],J=M[1],K=Object(l.useState)(JSON.parse(localStorage.getItem("dataInspection"))),_=Object(n.a)(K,2),G=_[0],X=(_[1],[{dataField:"#",text:"#",headerAlign:"center",align:"center",formatter:function(e,a,t){var n=(I-1)*z+(t+1);return r.a.createElement("span",null,n)},headerStyle:function(e,a){return{width:"40px"}}},{dataField:"part_number",text:"Part Number",headerAlign:"center",align:"left",editable:!1,headerStyle:function(e,a){return{width:"100px"}}},{dataField:"part_number_desc",text:"Part Description",headerAlign:"center",align:"left",editable:!1,headerStyle:function(e,a){return{width:"190px"}}},{dataField:"vdf",text:"Valid Date From",headerAlign:"center",align:"center",editable:!1,headerStyle:function(e,a){return{width:"100px"}}},{dataField:"vdt",text:"Valid Date To",headerAlign:"center",align:"center",editable:!1,headerStyle:function(e,a){return{width:"100px"}}},{dataField:"status",text:"Status",headerAlign:"center",align:"center",editable:!1,headerStyle:function(e,a){return{width:"80px"}}},{dataField:"id",text:"Action",headerAlign:"center",align:"center",editable:!1,isDummyField:!0,headerStyle:function(e,a){return{width:"70px"}},formatter:function(e,a){return r.a.createElement("div",null,r.a.createElement("span",{className:"btnInTable"},r.a.createElement(c.a,{className:"btn-success btn-brand btn-sm icon mg-r-2",onClick:function(e){return Y(e,a)}},r.a.createElement("i",{className:"typcn typcn-eye"}," ")),r.a.createElement(c.a,{className:"btn-facebook btn-brand btn-sm icon"},r.a.createElement("i",{className:"typcn typcn-pencil"}," "))))}}]),Y=function(e,a){J(!0)},q=function(e,a){e&&("pn"===a?f(e):"status"===a&&S(e))},Q=function(e,a){"vdf"===a?E(e.target.value):"vdt"===a&&O(e.target.value)};return r.a.createElement("div",null,r.a.createElement("div",{className:"container d-flex p-md-0"},r.a.createElement("div",{className:"az-content-body pd-lg-l-40 d-flex flex-column"},r.a.createElement("div",{className:"az-content-breadcrumb"},r.a.createElement("span",null,"Master"),r.a.createElement("span",null,"Inspection")),r.a.createElement("h2",{className:"az-content-title"},"Master Inspection"),r.a.createElement(re.a,{sx:{width:"100%"}},r.a.createElement(ce.a,{expanded:t,onChange:function(){return m(!t)},className:"accordionRoot"},r.a.createElement(ie.a,{className:"panelSummary",expandIcon:r.a.createElement(o.a,{sx:{color:"#fff"}}),"aria-controls":"panel1a-content",id:"panel1a-header",sx:{backgroundColor:"#fafafa",borderBottom:"1px solid #ececec"}},r.a.createElement(se.a,{style:{fontSize:"1rem",fontWeight:"bold"}},"Filter")),r.a.createElement(oe.a,null,r.a.createElement("div",{className:"row row-sm mg-b-4 w-100"},r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("div",{className:"row mg-b-4"},r.a.createElement("div",{className:"col-lg-5"},r.a.createElement("span",{className:"font-weight-bold font-italic"},"Part Number"),r.a.createElement(i.a,{name:"pn",value:b,options:[{value:"1",label:"1234"},{value:"2",label:"5678"}],onChange:function(e){return q(e,"pn")},isClearable:!0})),r.a.createElement("div",{className:"col-lg-5"},r.a.createElement("span",{className:"font-weight-bold font-italic"},"Valid  Date From"),r.a.createElement("input",{type:"date",className:"form-control",name:"vdf",value:h,onChange:function(e){return Q(e,"vdf")}}))),r.a.createElement("div",{className:"row mg-b-4 mt-2"},r.a.createElement("div",{className:"col-lg-5"},r.a.createElement("span",{className:"font-weight-bold font-italic"},"Status"),r.a.createElement(i.a,{name:"status",value:C,options:[{value:"1",label:"All"},{value:"2",label:"Active"},{value:"3",label:"Non-Active"}],onChange:function(e){return q(e,"status")},isClearable:!0})),r.a.createElement("div",{className:"col-lg-5"},r.a.createElement("span",{className:"font-weight-bold font-italic"},"Valid  Date To"),r.a.createElement("input",{type:"date",className:"form-control",name:"vdt",value:y,onChange:function(e){return Q(e,"vdt")}}))))))),r.a.createElement("div",{className:"az-dashboard-nav",style:{marginTop:20}},r.a.createElement("nav",{className:"nav"},r.a.createElement("a",{className:"nav-link",href:"#/"},r.a.createElement(c.a,{variant:"success btn-block",className:"btn-info btn-brand btn-sm icon mg-r-2",style:{lineHeight:"28px",display:"flex"}},r.a.createElement("i",{className:"typcn typcn-zoom-outline",style:{fontSize:"18px",lineHeight:"28px"}})," Search")),r.a.createElement("a",{className:"nav-link",href:"#/"},r.a.createElement(c.a,{variant:"danger btn-block",className:"btn-danger btn-brand btn-sm icon mg-r-2",style:{lineHeight:"28px",display:"flex"},onClick:function(){f(null),E(""),O(""),S(null)}},r.a.createElement("i",{className:"typcn typcn-arrow-sync",style:{fontSize:"18px",lineHeight:"28px"}})," Reset")),r.a.createElement("a",{className:"nav-link",href:"#/"},r.a.createElement(c.a,{variant:"primary btn-block",className:"btn-primary btn-brand btn-sm icon mg-r-2",style:{lineHeight:"28px",display:"flex"},onClick:function(){V(!0)}},r.a.createElement("i",{className:"typcn typcn-plus",style:{fontSize:"18px",lineHeight:"28px"}})," Add Standard Picture")),r.a.createElement("a",{className:"nav-link",href:"#/"},r.a.createElement(c.a,{variant:"primary btn-block",className:"btn-success btn-brand btn-sm icon mg-r-2",style:{lineHeight:"28px",display:"flex"}},r.a.createElement("i",{className:"typcn typcn-upload",style:{fontSize:"18px",lineHeight:"28px"}})," Export Excel")),r.a.createElement("a",{className:"nav-link",href:"#/"},r.a.createElement("i",{className:"fas fa-ellipsis-h"})))),r.a.createElement("div",{className:"az-content-label mg-b-5"},r.a.createElement(s.a,{caption:"",tableHead:X,datas:G,handlePageChange:function(e,a){F(e),A(a)}}))))),r.a.createElement(N,{open:L,onClose:function(){V(!1)}}),r.a.createElement(le,{open:W,onClose:function(){return J(!1)}}))}},135:function(e,a,t){"use strict";var n=t(0),l=t.n(n).a.createContext({controlId:void 0});a.a=l},149:function(e,a,t){"use strict";var n=t(2),l=t(5),r=t(17),c=t.n(r),i=t(0),s=t.n(i),o=t(4),m=t.n(o),u=["as","className","type","tooltip"],d={type:m.a.string,tooltip:m.a.bool,as:m.a.elementType},b=s.a.forwardRef((function(e,a){var t=e.as,r=void 0===t?"div":t,i=e.className,o=e.type,m=void 0===o?"valid":o,d=e.tooltip,b=void 0!==d&&d,f=Object(l.a)(e,u);return s.a.createElement(r,Object(n.a)({},f,{ref:a,className:c()(i,m+"-"+(b?"tooltip":"feedback"))}))}));b.displayName="Feedback",b.propTypes=d,a.a=b},160:function(e,a,t){"use strict";var n=t(2),l=t(5),r=t(17),c=t.n(r),i=t(0),s=t.n(i),o=t(12),m=["bsPrefix","className","as"],u=["xl","lg","md","sm","xs"],d=s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.className,i=e.as,d=void 0===i?"div":i,b=Object(l.a)(e,m),f=Object(o.a)(t,"col"),p=[],v=[];return u.forEach((function(e){var a,t,n,l=b[e];if(delete b[e],"object"===typeof l&&null!=l){var r=l.span;a=void 0===r||r,t=l.offset,n=l.order}else a=l;var c="xs"!==e?"-"+e:"";a&&p.push(!0===a?""+f+c:""+f+c+"-"+a),null!=n&&v.push("order"+c+"-"+n),null!=t&&v.push("offset"+c+"-"+t)})),p.length||p.push(f),s.a.createElement(d,Object(n.a)({},b,{ref:a,className:c.a.apply(void 0,[r].concat(p,v))}))}));d.displayName="Col",a.a=d},164:function(e,a,t){"use strict";var n=t(2),l=t(5),r=t(17),c=t.n(r),i=(t(150),t(0)),s=t.n(i),o=(t(53),t(149)),m=t(135),u=t(12),d=["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"],b=s.a.forwardRef((function(e,a){var t,r,o=e.bsPrefix,b=e.bsCustomPrefix,f=e.type,p=e.size,v=e.htmlSize,h=e.id,E=e.className,N=e.isValid,g=void 0!==N&&N,x=e.isInvalid,y=void 0!==x&&x,O=e.plaintext,j=e.readOnly,w=e.custom,C=e.as,S=void 0===C?"input":C,P=Object(l.a)(e,d),k=Object(i.useContext)(m.a).controlId,I=w?[b,"custom"]:[o,"form-control"],F=I[0],T=I[1];if(o=Object(u.a)(F,T),O)(r={})[o+"-plaintext"]=!0,t=r;else if("file"===f){var R;(R={})[o+"-file"]=!0,t=R}else if("range"===f){var z;(z={})[o+"-range"]=!0,t=z}else if("select"===S&&w){var A;(A={})[o+"-select"]=!0,A[o+"-select-"+p]=p,t=A}else{var D;(D={})[o]=!0,D[o+"-"+p]=p,t=D}return s.a.createElement(S,Object(n.a)({},P,{type:f,size:v,ref:a,readOnly:j,id:h||k,className:c()(E,t,g&&"is-valid",y&&"is-invalid")}))}));b.displayName="FormControl",a.a=Object.assign(b,{Feedback:o.a})},170:function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var n=t(55);var l=t(62);function r(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(l.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},203:function(e,a,t){"use strict";var n=t(2),l=t(5),r=t(17),c=t.n(r),i=t(0),s=t.n(i),o=(t(150),t(149)),m=t(135),u=t(12),d=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],b=s.a.forwardRef((function(e,a){var t=e.id,r=e.bsPrefix,o=e.bsCustomPrefix,b=e.className,f=e.type,p=void 0===f?"checkbox":f,v=e.isValid,h=void 0!==v&&v,E=e.isInvalid,N=void 0!==E&&E,g=e.isStatic,x=e.as,y=void 0===x?"input":x,O=Object(l.a)(e,d),j=Object(i.useContext)(m.a),w=j.controlId,C=j.custom?[o,"custom-control-input"]:[r,"form-check-input"],S=C[0],P=C[1];return r=Object(u.a)(S,P),s.a.createElement(y,Object(n.a)({},O,{ref:a,type:p,id:t||w,className:c()(b,r,h&&"is-valid",N&&"is-invalid",g&&"position-static")}))}));b.displayName="FormCheckInput";var f=b,p=["bsPrefix","bsCustomPrefix","className","htmlFor"],v=s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.bsCustomPrefix,o=e.className,d=e.htmlFor,b=Object(l.a)(e,p),f=Object(i.useContext)(m.a),v=f.controlId,h=f.custom?[r,"custom-control-label"]:[t,"form-check-label"],E=h[0],N=h[1];return t=Object(u.a)(E,N),s.a.createElement("label",Object(n.a)({},b,{ref:a,htmlFor:d||v,className:c()(o,t)}))}));v.displayName="FormCheckLabel";var h=v,E=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],N=s.a.forwardRef((function(e,a){var t=e.id,r=e.bsPrefix,d=e.bsCustomPrefix,b=e.inline,p=void 0!==b&&b,v=e.disabled,N=void 0!==v&&v,g=e.isValid,x=void 0!==g&&g,y=e.isInvalid,O=void 0!==y&&y,j=e.feedbackTooltip,w=void 0!==j&&j,C=e.feedback,S=e.className,P=e.style,k=e.title,I=void 0===k?"":k,F=e.type,T=void 0===F?"checkbox":F,R=e.label,z=e.children,A=e.custom,D=e.as,H=void 0===D?"input":D,L=Object(l.a)(e,E),V="switch"===T||A,B=V?[d,"custom-control"]:[r,"form-check"],M=B[0],W=B[1];r=Object(u.a)(M,W);var J=Object(i.useContext)(m.a).controlId,K=Object(i.useMemo)((function(){return{controlId:t||J,custom:V}}),[J,V,t]),_=V||null!=R&&!1!==R&&!z,G=s.a.createElement(f,Object(n.a)({},L,{type:"switch"===T?"checkbox":T,ref:a,isValid:x,isInvalid:O,isStatic:!_,disabled:N,as:H}));return s.a.createElement(m.a.Provider,{value:K},s.a.createElement("div",{style:P,className:c()(S,r,V&&"custom-"+T,p&&r+"-inline")},z||s.a.createElement(s.a.Fragment,null,G,_&&s.a.createElement(h,{title:I},R),(x||O)&&s.a.createElement(o.a,{type:x?"valid":"invalid",tooltip:w},C))))}));N.displayName="FormCheck",N.Input=f,N.Label=h;var g=N,x=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],y=s.a.forwardRef((function(e,a){var t=e.id,r=e.bsPrefix,o=e.bsCustomPrefix,d=e.className,b=e.isValid,f=e.isInvalid,p=e.lang,v=e.as,h=void 0===v?"input":v,E=Object(l.a)(e,x),N=Object(i.useContext)(m.a),g=N.controlId,y=N.custom?[o,"custom-file-input"]:[r,"form-control-file"],O=y[0],j=y[1];return r=Object(u.a)(O,j),s.a.createElement(h,Object(n.a)({},E,{ref:a,id:t||g,type:"file",lang:p,className:c()(d,r,b&&"is-valid",f&&"is-invalid")}))}));y.displayName="FormFileInput";var O=y,j=["bsPrefix","bsCustomPrefix","className","htmlFor"],w=s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.bsCustomPrefix,o=e.className,d=e.htmlFor,b=Object(l.a)(e,j),f=Object(i.useContext)(m.a),p=f.controlId,v=f.custom?[r,"custom-file-label"]:[t,"form-file-label"],h=v[0],E=v[1];return t=Object(u.a)(h,E),s.a.createElement("label",Object(n.a)({},b,{ref:a,htmlFor:d||p,className:c()(o,t),"data-browse":b["data-browse"]}))}));w.displayName="FormFileLabel";var C=w,S=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],P=s.a.forwardRef((function(e,a){var t=e.id,r=e.bsPrefix,d=e.bsCustomPrefix,b=e.disabled,f=void 0!==b&&b,p=e.isValid,v=void 0!==p&&p,h=e.isInvalid,E=void 0!==h&&h,N=e.feedbackTooltip,g=void 0!==N&&N,x=e.feedback,y=e.className,j=e.style,w=e.label,P=e.children,k=e.custom,I=e.lang,F=e["data-browse"],T=e.as,R=void 0===T?"div":T,z=e.inputAs,A=void 0===z?"input":z,D=Object(l.a)(e,S),H=k?[d,"custom"]:[r,"form-file"],L=H[0],V=H[1];r=Object(u.a)(L,V);var B=Object(i.useContext)(m.a).controlId,M=Object(i.useMemo)((function(){return{controlId:t||B,custom:k}}),[B,k,t]),W=null!=w&&!1!==w&&!P,J=s.a.createElement(O,Object(n.a)({},D,{ref:a,isValid:v,isInvalid:E,disabled:f,as:A,lang:I}));return s.a.createElement(m.a.Provider,{value:M},s.a.createElement(R,{style:j,className:c()(y,r,k&&"custom-file")},P||s.a.createElement(s.a.Fragment,null,k?s.a.createElement(s.a.Fragment,null,J,W&&s.a.createElement(C,{"data-browse":F},w)):s.a.createElement(s.a.Fragment,null,W&&s.a.createElement(C,null,w),J),(v||E)&&s.a.createElement(o.a,{type:v?"valid":"invalid",tooltip:g},x))))}));P.displayName="FormFile",P.Input=O,P.Label=C;var k=P,I=t(164),F=["bsPrefix","className","children","controlId","as"],T=s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.className,o=e.children,d=e.controlId,b=e.as,f=void 0===b?"div":b,p=Object(l.a)(e,F);t=Object(u.a)(t,"form-group");var v=Object(i.useMemo)((function(){return{controlId:d}}),[d]);return s.a.createElement(m.a.Provider,{value:v},s.a.createElement(f,Object(n.a)({},p,{ref:a,className:c()(r,t)}),o))}));T.displayName="FormGroup";var R=T,z=(t(53),t(160)),A=["as","bsPrefix","column","srOnly","className","htmlFor"],D=s.a.forwardRef((function(e,a){var t=e.as,r=void 0===t?"label":t,o=e.bsPrefix,d=e.column,b=e.srOnly,f=e.className,p=e.htmlFor,v=Object(l.a)(e,A),h=Object(i.useContext)(m.a).controlId;o=Object(u.a)(o,"form-label");var E="col-form-label";"string"===typeof d&&(E=E+" "+E+"-"+d);var N=c()(f,o,b&&"sr-only",d&&E);return p=p||h,d?s.a.createElement(z.a,Object(n.a)({ref:a,as:"label",className:N,htmlFor:p},v)):s.a.createElement(r,Object(n.a)({ref:a,className:N,htmlFor:p},v))}));D.displayName="FormLabel",D.defaultProps={column:!1,srOnly:!1};var H=D,L=["bsPrefix","className","as","muted"],V=s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.className,i=e.as,o=void 0===i?"small":i,m=e.muted,d=Object(l.a)(e,L);return t=Object(u.a)(t,"form-text"),s.a.createElement(o,Object(n.a)({},d,{ref:a,className:c()(r,t,m&&"text-muted")}))}));V.displayName="FormText";var B=V,M=s.a.forwardRef((function(e,a){return s.a.createElement(g,Object(n.a)({},e,{ref:a,type:"switch"}))}));M.displayName="Switch",M.Input=g.Input,M.Label=g.Label;var W=M,J=t(42),K=["bsPrefix","inline","className","validated","as"],_=Object(J.a)("form-row"),G=s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.inline,i=e.className,o=e.validated,m=e.as,d=void 0===m?"form":m,b=Object(l.a)(e,K);return t=Object(u.a)(t,"form"),s.a.createElement(d,Object(n.a)({},b,{ref:a,className:c()(i,o&&"was-validated",r&&t+"-inline")}))}));G.displayName="Form",G.defaultProps={inline:!1},G.Row=_,G.Group=R,G.Control=I.a,G.Check=g,G.File=k,G.Switch=W,G.Label=H,G.Text=B;a.a=G},216:function(e,a,t){"use strict";t.d(a,"b",(function(){return r})),t.d(a,"a",(function(){return c}));var n=t(0),l=t.n(n);function r(e,a){var t=0;return l.a.Children.map(e,(function(e){return l.a.isValidElement(e)?a(e,t++):e}))}function c(e,a){var t=0;l.a.Children.forEach(e,(function(e){l.a.isValidElement(e)&&a(e,t++)}))}},229:function(e,a,t){"use strict";var n=t(0),l=t.n(n),r=t(184),c=t.n(r),i=(t(186),t(187)),s=t.n(i),o=t(188),m=t.n(o);a.a=function(e){var a=function(){return"No Data to Display"},t={onPageChange:function(a,t){e.handlePageChange(a,t)},paginationSize:4,pageStartIndex:1,alwaysShowAllBtns:!1,hideSizePerPage:!0,firstPageText:"<<",prePageText:"<",nextPageText:">",lastPageText:">>",showTotal:!0,paginationTotalRenderer:function(e,a,t){return l.a.createElement("div",{className:"react-bootstrap-table-pagination-total",style:{position:"absolute",padding:"8px 4px",backgroundColor:"white"}},"Total ",l.a.createElement("b",null,t))},disablePageTitle:!0,sizePerPageList:[{text:"10",value:10},{text:"20",value:20},{text:"All",value:e.datas.length}]},n={mode:"checkbox",clickToSelect:!0,bgColor:"#e3e8e4",size:"10000px",onSelect:function(a,t,n,l){e.handleSelectRow("single",a,t)},onSelectAll:function(a,t,n){return a?e.handleSelectRow("all",t,a):(e.handleSelectRow("all",t,a),[])}};return l.a.createElement("div",null,l.a.createElement(m.a,{keyField:"id",data:e.datas,columns:e.tableHead,search:!1,caption:e.caption},(function(e){return l.a.createElement("div",null,l.a.createElement(c.a,Object.assign({},e.baseProps,{striped:!0,hover:!0,condensed:!0,wrapperClasses:"table-responsive",pagination:s()(t),selectRow:n,noDataIndication:a})))})))}},278:function(e,a,t){"use strict";var n=t(0),l=t.n(n),r=t(184),c=t.n(r),i=(t(186),t(187)),s=t.n(i),o=t(188),m=t.n(o);a.a=function(e){var a=function(){return"No Data to Display"},t={onPageChange:function(a,t){e.handlePageChange(a,t)},paginationSize:4,pageStartIndex:1,alwaysShowAllBtns:!1,hideSizePerPage:!0,firstPageText:"<<",prePageText:"<",nextPageText:">",lastPageText:">>",showTotal:!0,paginationTotalRenderer:function(e,a,t){return l.a.createElement("div",{className:"react-bootstrap-table-pagination-total",style:{position:"absolute",padding:"8px 4px",backgroundColor:"white"}},"Total ",l.a.createElement("b",null,t))},disablePageTitle:!0,sizePerPageList:[{text:"10",value:10},{text:"20",value:20},{text:"All",value:e.datas.length}]};return l.a.createElement("div",null,l.a.createElement(m.a,{keyField:"id",data:e.datas,columns:e.tableHead,search:!1,caption:e.caption},(function(e){return l.a.createElement("div",null,l.a.createElement(c.a,Object.assign({},e.baseProps,{striped:!0,hover:!0,condensed:!0,wrapperClasses:"table-responsive",pagination:s()(t),noDataIndication:a})))})))}}}]);
//# sourceMappingURL=18.d483f0b6.chunk.js.map