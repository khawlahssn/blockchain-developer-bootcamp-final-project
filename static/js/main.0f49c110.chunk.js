(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{213:function(e,t,n){},228:function(e,t){},230:function(e,t){},232:function(e,t){},236:function(e,t){},263:function(e,t){},265:function(e,t){},274:function(e,t){},276:function(e,t){},286:function(e,t){},288:function(e,t){},406:function(e,t){},408:function(e,t){},415:function(e,t){},416:function(e,t){},434:function(e,t){},508:function(e,t,n){},510:function(e,t,n){"use strict";n.r(t);var a=n(13),c=n.n(a),r=n(203),s=n.n(r),i=(n(213),n(12)),u=n.n(i),l=n(22),d=n(14),o=n(204),j=n.n(o),b=n(205),p=n.n(b),h=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,e.next=3,j()({mustBeMetaMask:!0});case 3:return(n=e.sent)?(console.log("MetaMask Ethereum provider successfully detected!"),a=window,c=a.ethereum,t=new p.a(n),c.on("chainChanged",(function(e){window.location.reload()})),c.on("disconnect",(function(e){window.location.reload()}))):console.log("Please install MetaMask!"),e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m="0xF6d7133c6f2eCd081542198394594fDfEa1B10b7",O=[{inputs:[{internalType:"address",name:"_collector",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"recycler",type:"address"},{indexed:!1,internalType:"uint256",name:"balanceOfRecipient",type:"uint256"},{indexed:!1,internalType:"uint256",name:"weightInKG",type:"uint256"},{indexed:!1,internalType:"uint256",name:"rewardAmount",type:"uint256"},{indexed:!1,internalType:"enum Recycle.State",name:"statusOfRecyclable",type:"uint8"}],name:"LogRecieved",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"string",name:"descrp",type:"string"},{indexed:!1,internalType:"uint256",name:"weightInKG",type:"uint256"},{indexed:!1,internalType:"enum Recycle.State",name:"statusOfRecyclable",type:"uint8"}],name:"LogRecyclableAdded",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"recipient",type:"address"},{indexed:!1,internalType:"uint256",name:"balanceOfRecipient",type:"uint256"},{indexed:!1,internalType:"enum Recycle.State",name:"statusOfRecyclable",type:"uint8"}],name:"LogRewarded",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function",constant:!0},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"wasteCollector",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function",constant:!0},{inputs:[{internalType:"string",name:"_itemDescription",type:"string"},{internalType:"string",name:"_cityCode",type:"string"},{internalType:"uint256",name:"_weight",type:"uint256"}],name:"addRecyclable",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_recycler",type:"address"},{internalType:"uint256",name:"_weight",type:"uint256"}],name:"requestReward",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_recycler",type:"address"}],name:"awardRecycler",outputs:[],stateMutability:"payable",type:"function",payable:!0}],x=["\u274c You MUST fill the required fields!","\u23f3 Waiting on transaction success...","\u2705 Your item submission is successful","The weight must be AT LEAST 1 KG!","\u2705 Your request is successful","\u2705 Reward has been successfully transfered"],f=["Bee'ah Waste Management Complex, Industrial Area, Sharjah","Municipality Department, Masfoot Road, Ajman","Dubai Industrial Park, Sheikh Mohammed Bin Zayed Rd, Dubai","Tadweer, Delma Street, Abu Dhabi","Municipality Department, Hamad Bin Abdullah Street, Fujairah","RAK Waste Management Authority, Al Qusaidat Street, Ras Al Khaimah","Municipality Department, Sheikh Ahmed Bin Rashid Al Mualla Rd, Umm Al Quwain"],y=(n(508),n(1)),v=window.ethereum;var w=function(){var e=Object(a.useRef)(null),t=Object(a.useState)(null),n=Object(d.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!1),i=Object(d.a)(s,2),o=i[0],j=i[1],b=Object(a.useState)(!1),p=Object(d.a)(b,2),w=p[0],g=p[1],k=Object(a.useState)(!1),A=Object(d.a)(k,2),N=A[0],S=A[1],R=Object(a.useState)(!1),M=Object(d.a)(R,2),C=M[0],T=M[1],D=Object(a.useState)(""),E=Object(d.a)(D,2),L=E[0],B=E[1],q=Object(a.useState)(""),F=Object(d.a)(q,2),U=F[0],K=F[1],W=Object(a.useState)(""),_=Object(d.a)(W,2),Y=_[0],I=_[1],P=Object(a.useState)(""),G=Object(d.a)(P,2),Q=G[0],J=G[1],H=Object(a.useState)(""),Z=Object(d.a)(H,2),z=Z[0],V=Z[1],X=Object(a.useState)(""),$=Object(d.a)(X,2),ee=$[0],te=$[1],ne=Object(a.useState)(""),ae=Object(d.a)(ne,2),ce=ae[0],re=ae[1],se=Object(a.useState)(""),ie=Object(d.a)(se,2),ue=ie[0],le=ie[1],de=Object(a.useState)(""),oe=Object(d.a)(de,2),je=oe[0],be=oe[1],pe=Object(a.useState)(""),he=Object(d.a)(pe,2),me=he[0],Oe=he[1],xe=Object(a.useState)(!1),fe=Object(d.a)(xe,2),ye=fe[0],ve=fe[1],we=Object(a.useState)(!1),ge=Object(d.a)(we,2),ke=ge[0],Ae=ge[1],Ne=Object(a.useState)(!1),Se=Object(d.a)(Ne,2),Re=Se[0],Me=Se[1];Object(a.useEffect)((function(){var t=!1;function n(){return(n=Object(l.a)(u.a.mark((function n(){var a;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(null!==c){n.next=25;break}if(t){n.next=25;break}return j(!1),n.next=5,h();case 5:return a=n.sent,r(a),n.next=9,v.request({method:"eth_chainId"});case 9:if("0x4"===n.sent&&T(!0),j(!0),null===a){n.next=25;break}return e.current=new a.eth.Contract(O,m),n.prev=14,n.next=17,v.request({method:"eth_accounts"});case 17:n.sent.length>0&&v.isConnected()&&g(!0),n.next=24;break;case 21:n.prev=21,n.t0=n.catch(14),console.error(n.t0);case 24:v.on("accountsChanged",Te);case 25:case"end":return n.stop()}}),n,null,[[14,21]])})))).apply(this,arguments)}return function(){n.apply(this,arguments)}(),function(){t=!0}}),[]),Object(a.useEffect)((function(){var t=!1;if(w){function n(){return(n=Object(l.a)(u.a.mark((function n(){var a,c;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.current.methods.owner().call();case 2:return a=n.sent,n.next=5,e.current.methods.wasteCollector().call();case 5:if(c=n.sent,t){n.next=11;break}return K(a),n.next=10,Be();case 10:re(c);case 11:case"end":return n.stop()}}),n)})))).apply(this,arguments)}!function(){n.apply(this,arguments)}()}return function(){t=!0}}),[w]);var Ce=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S(!0),e.prev=1,e.next=4,v.request({method:"eth_requestAccounts"});case 4:e.next=8;break;case 6:e.prev=6,e.t0=e.catch(1);case 8:S(!1);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}(),Te=function(e){window.location.reload()},De=function(){var t=Object(l.a)(u.a.mark((function t(n){var a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),""!==Y&&""!==Q&&""!==z){t.next=5;break}qe(x[0]),t.next=18;break;case 5:if(!(z<1)){t.next=9;break}qe(x[3]),t.next=18;break;case 9:return ve(!0),t.next=12,c.eth.getAccounts();case 12:return a=t.sent,qe(x[1]),t.next=16,e.current.methods.addRecyclable(Y,Q,Math.round(z)).send({from:a[0]});case 16:qe(x[2]),ve(!1);case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Ee=function(){var t=Object(l.a)(u.a.mark((function t(n){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),""!==ue&&""!==je){t.next=5;break}qe(x[0]),t.next=15;break;case 5:if(!(je<1)){t.next=9;break}qe(x[3]),t.next=15;break;case 9:return Me(!0),qe(x[1]),t.next=13,e.current.methods.requestReward(ue,Math.round(je)).send({from:ce});case 13:qe(x[4]),Me(!1);case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Le=function(){var t=Object(l.a)(u.a.mark((function t(n){var a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),""!==ee){t.next=5;break}qe(x[0]),t.next=12;break;case 5:return Ae(!0),qe(x[1]),a=c.utils.toWei("0.002","ether"),t.next=10,e.current.methods.awardRecycler(ee).send({from:U,value:a});case 10:qe(x[5]),Ae(!1);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Be=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.eth.getAccounts();case 2:return t=e.sent,e.next=5,c.eth.getBalance(t[0]);case 5:n=e.sent,a=c.utils.fromWei(n,"ether"),B(a);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),qe=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Oe(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(y.jsxs)("div",{className:"App",children:[null===c&&!o&&Object(y.jsx)("div",{className:"page-center",children:Object(y.jsxs)("div",{className:"alert info",children:[Object(y.jsx)("h1",{className:"no-margin-top",children:"Recycle Contract"}),Object(y.jsx)("p",{className:"no-margin",children:"Checking for MetaMask Ethereum Provider..."})]})}),null===c&&o&&Object(y.jsx)("div",{className:"page-center",children:Object(y.jsxs)("div",{className:"alert error",children:[Object(y.jsx)("h1",{className:"no-margin-top",children:"Recycle Contract"}),Object(y.jsx)("p",{className:"no-margin",children:"MetaMask is required to run this app! Please install MetaMask and then refresh this page."})]})}),null!==c&&o&&!C&&Object(y.jsx)("div",{className:"page-center",children:Object(y.jsxs)("div",{className:"alert error",children:[Object(y.jsx)("h1",{className:"no-margin-top",children:"Recycle Contract"}),Object(y.jsxs)("p",{className:"no-margin",children:["You must be connected to the ",Object(y.jsx)("strong",{children:"Rinkeby test network"})," ","for Ether transactions made via this app."]})]})}),null!==c&&!w&&C&&Object(y.jsx)("div",{className:"page-center",children:Object(y.jsxs)("section",{className:"card",children:[Object(y.jsx)("h1",{className:"no-margin-top",children:"Recycle Contract"}),Object(y.jsx)("p",{children:"Connect with MetaMask and start recycling!"}),Object(y.jsx)("div",{className:"center",children:Object(y.jsx)("button",{className:"btn primaryBtn",type:"button",onClick:Ce,disabled:N,children:"Connect with MetaMask"})})]})}),null!==c&&w&&C&&Object(y.jsxs)("div",{className:"page-center",children:[Object(y.jsxs)("section",{className:"card",children:[Object(y.jsx)("h1",{className:"no-margin-top",children:"Your Portal to E-waste Recycling"}),Object(y.jsxs)("p",{children:["This contract is managed by ",U,"."]}),Object(y.jsxs)("p",{children:["The assigned e-waste collector is ",ce,"."]}),Object(y.jsx)("div",{className:"user-info",children:Object(y.jsxs)("p",{children:["\ud83d\udd10 Your Address is ",v.selectedAddress," ",Object(y.jsx)("br",{}),"\ud83d\udce9 Your Balance is ",L," \u039e"]})}),U.toLowerCase()!==v.selectedAddress&&ce.toLowerCase()!==v.selectedAddress&&Object(y.jsx)("div",{children:Object(y.jsxs)("form",{onSubmit:De,children:[Object(y.jsx)("h4",{children:"Want to recycle?"}),Object(y.jsxs)("div",{className:"input-area",children:[Object(y.jsx)("label",{children:"Enter item description:"})," ",Object(y.jsx)("input",{value:Y,onChange:function(e){return I(e.target.value)}})," "]}),Object(y.jsxs)("div",{className:"input-area",children:[Object(y.jsx)("label",{children:"Enter city:"})," ",Object(y.jsxs)("select",{name:"cities",onChange:function(e){var t=e.target.value;J("DEFAULT"===t?"":e.target.value)},children:[Object(y.jsx)("option",{value:"DEFAULT",children:"-- Select an option --"}),Object(y.jsx)("option",{value:"SH",children:"Sharjah"}),Object(y.jsx)("option",{value:"AJ",children:"Ajman"}),Object(y.jsx)("option",{value:"DU",children:"Dubai"}),Object(y.jsx)("option",{value:"AD",children:"Abu Dhabi"}),Object(y.jsx)("option",{value:"FU",children:"Fujairah"}),Object(y.jsx)("option",{value:"RK",children:"Ras Al Khaimah"}),Object(y.jsx)("option",{value:"UQ",children:"Umm Al Quwain"})]})]}),Object(y.jsxs)("div",{className:"input-area",children:[Object(y.jsx)("label",{children:"Enter weight (in KGs):"})," ",Object(y.jsx)("input",{value:z,onChange:function(e){return V(e.target.value)}})," "]}),Object(y.jsx)("button",{className:"btn primaryBtn",type:"submit",disabled:ye,children:"Enter"})]})}),ce.toLowerCase()===v.selectedAddress&&Object(y.jsx)("div",{children:Object(y.jsxs)("form",{onSubmit:Ee,children:[Object(y.jsx)("h4",{children:"Want to request a reward?"}),Object(y.jsxs)("div",{className:"input-area",children:[Object(y.jsx)("label",{children:"Enter address to be rewarded:"})," ",Object(y.jsx)("input",{value:ue,onChange:function(e){return le(e.target.value)}})," "]}),Object(y.jsxs)("div",{className:"input-area",children:[Object(y.jsx)("label",{children:"Enter total weight (in KGs):"})," ",Object(y.jsx)("input",{value:je,onChange:function(e){return be(e.target.value)}})," "]}),Object(y.jsx)("div",{className:"input-area",children:Object(y.jsx)("button",{className:"btn primaryBtn",type:"submit",disabled:Re,children:"Submit Request"})})]})}),U.toLowerCase()===v.selectedAddress&&Object(y.jsxs)("div",{children:[Object(y.jsx)("h4",{children:"Approve the following request:"}),Object(y.jsxs)("form",{onSubmit:Le,children:[Object(y.jsx)("h4",{children:"Want to reward?"}),Object(y.jsxs)("div",{className:"input-area",children:[Object(y.jsx)("label",{children:"Enter address to be rewarded:"})," ",Object(y.jsx)("input",{value:ee,onChange:function(e){return te(e.target.value)}})," "]}),Object(y.jsx)("div",{className:"input-area",children:Object(y.jsx)("button",{className:"btn primaryBtn",type:"submit",disabled:ke,children:"Go Forth & Reward"})})]})]}),Object(y.jsx)("h2",{children:me}),v.selectedAddress!==U.toLowerCase()&&v.selectedAddress!==ce.toLowerCase()&&Object(y.jsx)("div",{className:"txn-details",children:Object(y.jsx)("div",{className:"row",children:Object(y.jsx)("div",{className:"column",children:Object(y.jsxs)("table",{children:[Object(y.jsx)("caption",{children:"\ud83e\uddfe\ud83d\udc47 Your transaction details:"}),Object(y.jsxs)("tbody",{children:[Object(y.jsxs)("tr",{children:[Object(y.jsx)("th",{children:"Description"}),Object(y.jsx)("th",{children:"City"}),Object(y.jsx)("th",{children:"Weight"}),Object(y.jsx)("th",{children:"Drop-off Location"})]}),Object(y.jsxs)("tr",{children:[Object(y.jsx)("td",{children:Y}),Object(y.jsx)("td",{children:Q}),Object(y.jsx)("td",{children:z}),Object(y.jsx)("td",{children:function(e){switch(e){case"SH":return f[0];case"AJ":return f[1];case"DU":return f[2];case"AD":return f[3];case"FU":return f[4];case"RK":return f[5];case"UQ":return f[6]}}(Q)})]})]})]})})})}),v.selectedAddress===ce.toLowerCase()&&Object(y.jsx)("div",{className:"txn-details",children:Object(y.jsx)("div",{className:"row",children:Object(y.jsx)("div",{className:"column",children:Object(y.jsxs)("table",{children:[Object(y.jsx)("caption",{children:"\ud83e\uddfe\ud83d\udc47 Your reward request details:"}),Object(y.jsxs)("tbody",{children:[Object(y.jsxs)("tr",{children:[Object(y.jsx)("th",{children:"Recycler's Address"}),Object(y.jsx)("th",{children:"Weight"})]}),Object(y.jsxs)("tr",{children:[Object(y.jsx)("td",{children:ue}),Object(y.jsx)("td",{children:je})]})]})]})})})})]}),Object(y.jsx)("footer",{children:"\xa9 Copyright 2021 E-Recycle"})]})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,514)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(y.jsx)(c.a.StrictMode,{children:Object(y.jsx)(w,{})}),document.getElementById("root")),g()}},[[510,1,2]]]);
//# sourceMappingURL=main.0f49c110.chunk.js.map