(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},20:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),o=n.n(c),u=(n(20),n(2)),l=n(4),i=n(3),m=n.n(i),d="/api/persons",s=function(){return m.a.get(d)},f=function(e){var t=e.message,n=e.isError;return null===t?null:r.a.createElement("div",{style:Object(l.a)({},{background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},{color:n?"red":"green"})},t)},h=function(e){var t=e.name,n=e.number,a=e.handleNameChange,c=e.handleNumberChange,o=e.submitNewPerson;return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:n,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:o},"add")))},b=function(e){var t=e.persons,n=e.deletePerson;return t.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return n(e)}},"delete"))}))},p=function(e){var t=e.filterValue,n=e.handleFilterChange;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:t,onChange:n})))},v=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),i=Object(u.a)(o,2),v=i[0],E=i[1],g=Object(a.useState)(""),w=Object(u.a)(g,2),j=w[0],O=w[1],C=Object(a.useState)(""),S=Object(u.a)(C,2),k=S[0],y=S[1],N=Object(a.useState)(n),D=Object(u.a)(N,2),L=D[0],P=D[1],A=Object(a.useState)(null),B=Object(u.a)(A,2),F=B[0],I=B[1],J=Object(a.useState)(!1),R=Object(u.a)(J,2),V=R[0],x=R[1];Object(a.useEffect)((function(){s().then((function(e){return c(e.data)}))}),[]),Object(a.useEffect)((function(){var e=[];n.forEach((function(t){t&&t.name&&(t.name.toLowerCase().substring(0,k.length)!==k.toLowerCase()&&""!==k||e.push(t))})),P(e)}),[k,n]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(f,{message:F,isError:V}),r.a.createElement(p,{filterValue:k,handleFilterChange:function(e){e.preventDefault(),y(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(h,{name:v,number:j,handleNameChange:function(e){e.preventDefault(),E(e.target.value)},handleNumberChange:function(e){e.preventDefault(),O(e.target.value)},submitNewPerson:function(e){if(e.preventDefault(),n.map((function(e){return e.name.toLowerCase()})).includes(v.toLowerCase())){if(window.confirm("".concat(v," is already added to phonebook. Replace the old number with a new one?"))){var t=n.find((function(e){return e.name.toLowerCase()===v.toLowerCase()}));(a=t.id,r=Object(l.a)({},t,{number:j}),m.a.put("".concat(d,"/").concat(a),r)).then((function(e){c(n.map((function(n){return n.id===t.id?e.data:n}))),I("Updated ".concat(v)),x(!1),E(""),O("")})).catch((function(e){console.log(e),I(e),x(!0)}))}}else if(""!==v&&""!==j){(function(e){return m.a.post(d,e)})({name:v,number:j}).then((function(){s().then((function(e){return c(e.data)})),I("Added ".concat(v)),x(!1),E(""),O("")})).catch((function(e){console.log(e),I(e),x(!0)}))}var a,r}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(b,{persons:L,deletePerson:function(e){var t;window.confirm("Delete ".concat(e.name))&&(t=e.id,m.a.delete("".concat(d,"/").concat(t))).then((function(){var t=n.filter((function(t){return t.id!==e.id}));I("Deleted ".concat(e.name)),c(t)})).catch((function(){I("Information of ".concat(e.name," has already been removed from the server.")),x(!0)}))}}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3b050d04.chunk.js.map