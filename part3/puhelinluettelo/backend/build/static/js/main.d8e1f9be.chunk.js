(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},20:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(14),c=n.n(u),o=(n(20),n(2)),l=n(4),i=n(3),m=n.n(i),d="/api/persons",f=function(){return m.a.get(d)},s=function(e){var t=e.message,n=e.isError;return null===t?null:r.a.createElement("div",{style:Object(l.a)({},{background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},{color:n?"red":"green"})},t)},h=function(e){var t=e.name,n=e.number,a=e.handleNameChange,u=e.handleNumberChange,c=e.submitNewPerson;return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:n,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:c},"add")))},b=function(e){var t=e.persons,n=e.deletePerson;return t.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return n(e)}},"delete"))}))},p=function(e){var t=e.filterValue,n=e.handleFilterChange;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:t,onChange:n})))},v=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),i=Object(o.a)(c,2),v=i[0],E=i[1],g=Object(a.useState)(""),w=Object(o.a)(g,2),j=w[0],O=w[1],C=Object(a.useState)(""),S=Object(o.a)(C,2),k=S[0],y=S[1],N=Object(a.useState)(n),D=Object(o.a)(N,2),L=D[0],P=D[1],x=Object(a.useState)(null),A=Object(o.a)(x,2),B=A[0],F=A[1],I=Object(a.useState)(!1),J=Object(o.a)(I,2),M=J[0],R=J[1];Object(a.useEffect)((function(){f().then((function(e){return u(e.data)}))}),[]),Object(a.useEffect)((function(){var e=[];n.forEach((function(t){t&&t.name&&(t.name.toLowerCase().substring(0,k.length)!==k.toLowerCase()&&""!==k||e.push(t))})),P(e)}),[k,n]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{message:B,isError:M}),r.a.createElement(p,{filterValue:k,handleFilterChange:function(e){e.preventDefault(),y(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(h,{name:v,number:j,handleNameChange:function(e){e.preventDefault(),E(e.target.value)},handleNumberChange:function(e){e.preventDefault(),O(e.target.value)},submitNewPerson:function(e){if(e.preventDefault(),n.map((function(e){return e.name.toLowerCase()})).includes(v.toLowerCase())){if(window.confirm("".concat(v," is already added to phonebook. Replace the old number with a new one?"))){var t=n.find((function(e){return e.name.toLowerCase()===v.toLowerCase()}));(a=t.id,r=Object(l.a)({},t,{number:j}),m.a.put("".concat(d,"/").concat(a),r)).then((function(e){u(n.map((function(n){return n.id===t.id?e.data:n}))),F("Updated ".concat(v)),R(!1),E(""),O("")})).catch((function(e){F(e),R(!0)}))}}else if(""!==v&&""!==j){Math.max(n.map((function(e){return e.id})));(function(e){return m.a.post(d,e)})({name:v,number:j}).then((function(){f().then((function(e){return u(e.data)})),F("Added ".concat(v)),R(!1),E(""),O("")}))}var a,r}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(b,{persons:L,deletePerson:function(e){var t;window.confirm("Delete ".concat(e.name))&&(t=e.id,m.a.delete("".concat(d,"/").concat(t))).then((function(){var t=n.filter((function(t){return t.id!==e.id}));F("Deleted ".concat(e.name)),u(t)})).catch((function(){F("Information of ".concat(e.name," has already been removed from the server.")),R(!0)}))}}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d8e1f9be.chunk.js.map