(this["webpackJsonptweet-me-web"]=this["webpackJsonptweet-me-web"]||[]).push([[0],{56:function(e,t,n){},57:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),i=n.n(r),o=n(10),s=n.n(o),c=(n(56),n(27)),u=n(13);n(57);var d=function(){return Object(a.jsx)("div",{children:"xxx"})};function l(e,t,n,a){var r=JSON.stringify(a),i=new XMLHttpRequest;i.responseType="json",i.open(e,"http://localhost:8000".concat(t)),i.setRequestHeader("Content-Type","application/json");var o=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var r=n[a].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}("csrftoken");o&&(i.setRequestHeader("HTTP_X_REQUESTED_WITH","XMLHttpRequest"),i.setRequestHeader("X-Requested-with","XMLHttpRequest"),i.setRequestHeader("X-CSRFToken",o)),i.onload=function(){n(i.response,i.status)},i.onerror=function(e){console.log(e),n({message:"The request was an error"},400)},i.send(r)}var j=n(34),b=n(24),p=n(4),h=n(91),f=n(88),m=n(89),O=n(90),x=n(92),g=n(93),v=n(64),w=n(31),k=n(41),y=n.n(k),S=n(42),T=n.n(S),R=n(43),q=n.n(R),C=n(40),H=n.n(C),E=n(87),L=n(95),P=n(29),X=n(44),D=n(38),F=n.n(D),I=(Object(X.a)({palette:{primary:F.a,secondary:{main:"#e57373"}}}),Object(E.a)((function(e){return Object(L.a)({root:{display:"flex",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(1)}},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:P.a[500]}})})));var N=function(e){var t=I(),n=e.item,r=i.a.useState(n.like),o=Object(u.a)(r,2),s=o[0],d=o[1];i.a.useEffect((function(){d(n.like)}),[n]);var j=i.a.useState(!1),k=Object(u.a)(j,2),S=k[0],R=k[1];return Object(a.jsxs)("div",{children:[Object(a.jsx)(f.a,{avatar:Object(a.jsx)(g.a,{"aria-label":"recipe",className:t.avatar}),title:n.user,subheader:Object(a.jsx)("a",{href:"".concat(window.location.origin,"/").concat(n.id),children:"September 14, 2016"})}),Object(a.jsx)(m.a,{children:Object(a.jsx)(w.a,{variant:"body2",color:"textSecondary",component:"p",children:n.content})}),Object(a.jsx)(O.a,{className:t.root,disableSpacing:!0,children:"undefined"!==typeof n.is_retweet&&Object(a.jsxs)(h.a,{color:"primary","aria-label":"outlined primary button group",children:[Object(a.jsx)(v.a,{"aria-label":"settings",children:Object(a.jsx)(H.a,{})}),Object(a.jsxs)(v.a,{onClick:function(e){l("POST","/posts/actions/",(function(e,t){200==t&&(d(e[0].like),console.log({object:e[0].like}))}),{action:"like",id:n.id})},"aria-label":"add to favorites",children:[s," ",Object(a.jsx)(y.a,{})]}),Object(a.jsx)(v.a,{onClick:function(t){l("POST","/posts/actions/",(function(t,n){t.content="parent post later you shoul be able to edit it befre retweeting and after retweeting",201==n&&e.setstate((function(e){return[t].concat(Object(c.a)(e))}))}),{action:"retweet",id:n.id})},"aria-label":"share",children:Object(a.jsx)(T.a,{})}),Object(a.jsx)(v.a,{className:Object(p.a)(t.expand,Object(b.a)({},t.expandOpen,S)),onClick:function(){R(!S)},"aria-expanded":S,"aria-label":"show more",children:Object(a.jsx)(q.a,{})})]})}),Object(a.jsx)(x.a,{in:S,timeout:"auto",unmountOnExit:!0,children:Object(a.jsxs)(m.a,{children:[Object(a.jsx)(w.a,{paragraph:!0,children:"Method:"}),Object(a.jsx)(w.a,{paragraph:!0,children:"Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."}),Object(a.jsx)(w.a,{paragraph:!0,children:"text herer."}),Object(a.jsx)(w.a,{paragraph:!0,children:"Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don\u2019t open.)"}),Object(a.jsx)(w.a,{children:"Set aside off of the heat to let rest for 10 minutes, and then serve."})]})})]})},M=n(94);var U=function(e,t){return(e.length>0?e:[e]).map((function(e,n){var r=Object(j.a)(Object(j.a)({},e.parent),{},{user:e.user});return Object(a.jsxs)(M.a,{style:{width:"50%",margin:"10px"},children:[e.parent&&Object(a.jsx)(M.a,{style:{margin:"50px",border:"red"},children:Object(a.jsx)(N,{setstate:t,item:r})}),Object(a.jsx)(N,{setstate:t,item:e},n)]},n)}))};var _=function(){var e=i.a.useState([]),t=Object(u.a)(e,2),n=t[0],r=t[1],o=i.a.useRef(),s=i.a.useState(""),j=Object(u.a)(s,2),b=j[0],p=j[1],h=i.a.useState(""),f=Object(u.a)(h,2),m=f[0],O=f[1];return i.a.useEffect((function(){var e=b.length>0?"?username="+b:"",t=m.length>0?"".concat(m):"";console.log(window.location.pathname),l("GET","/posts/".concat(window.location.pathname.slice(1))+t+e,(function(e,t){r(200===t?e:["There was an error"])}))}),[b,m]),Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("input",{onKeyUp:function(e){p(e.target.value)}}),Object(a.jsx)("input",{onKeyUp:function(e){O(e.target.value)}}),Object(a.jsxs)("form",{onSubmit:function(e){e.preventDefault(),l("POST","/create/",(function(e,t){201===t?(r((function(t){return[e].concat(Object(c.a)(t))})),o.current.value=""):(console.log(e,t),403===t&&(window.location.href="accounts/login"))}),{content:o.current.value})},children:[Object(a.jsx)("textarea",{ref:o,required:!0}),Object(a.jsx)("button",{type:"submit",children:"submit"})]}),Object(a.jsx)(d,{}),U(n,r)]})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,97)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),i(e),o(e)}))},A=document.getElementById("root");A&&s.a.render(Object(a.jsx)(_,{}),A),J()}},[[62,1,2]]]);
//# sourceMappingURL=main.6bc13ca8.chunk.js.map