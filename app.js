var $=function(s){return document.querySelector(s)};
function h(t,a,k){var e=document.createElement(t);for(var x in(a||{})){var v=a[x];if(v==null)continue;if(x==="class")e.className=v;else if(x==="text")e.textContent=v;else e.setAttribute(x,v)}(k||[]).forEach(function(c){if(c!=null)e.appendChild(typeof c==="string"?document.createTextNode(c):c)});return e}
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function count(n,to,dec,suf){var t0=null,d=reduce?0:800;function f(ts){if(t0===null)t0=ts;var p=d?Math.min((ts-t0)/d,1):1,e=1-Math.pow(1-p,3);n.textContent=(to*e).toFixed(dec)+(suf||"");if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
function head(t,s,jd){return h("div",{class:"rise"},[h("h2",{text:t}),h("p",{class:"sub",text:s}),h("span",{class:"jd",text:"Job responsibility: "+jd})])}
var MENU=[["taxonomy","Taxonomy"],["standards","Standards"],["roles","Roles and ownership"],["governance","Governance"],["adoption","Adoption and tracking"],["community","Community"],["alignment","Alignment and metrics"]];
/* ---------- data ---------- */
var T=[["Businesses",[["Client onboarding",[["Account opening",[["Perform due diligence",["Collect client documents","Screen sanctions list","Verify client identity"]],["Open account",["Create client record","Activate account"]]]]]],["Lending",[["Credit risk mitigation",[["Manage guarantees",["Billing","Monitoring","Claims","Recovery"]]]],["Loan origination",[["Assess credit application",["Review financials","Approve loan"]]]]]],["Payments",[["Cash management",[["Process payments",["Validate instruction","Settle payment"]]]]]]]],
["Control and assurance",[["Compliance",[["Regulatory compliance",[["Monitor regulatory change",["Log new regulations","Assess impact"]]]]]],["Risk management",[["Operational risk",[["Report operational incidents",["Record incident","Escalate incident"]]]]]]]],
["Enabling",[["Finance",[["Financial reporting",[["Close monthly books",["Reconcile accounts","Post adjustments"]]]]]],["Human resources",[["Talent acquisition",[["Recruit employees",["Screen candidates","Issue offer"]]]]]]]]];
function nd(x){return typeof x==="string"?[x,[]]:x}
var LV=["Grouping","L1 Domain","L2 Process group","L3 Process","L4 Sub-process"],OW=["Global Process Owner","Global Process Owner","Domain Owner","Process Element Owner","Process Element Owner"],DOC=["Framework and policy","Policy and framework","Departmental manual","Procedure, forms and templates","Work instruction"];
function flat(){var o=[];(function w(a,pre,d){a.forEach(function(r){var n=nd(r),p=pre?pre+" > "+n[0]:n[0];if(d>=1&&d<=3)o.push(p);w(n[1],p,d+1)})})(T,"",0);return o}
/* ---------- pages ---------- */
var PAGES={};
PAGES.taxonomy=function(){
  var v=h("div"),open={"0":1,"0.1":1,"0.1.0":1,"0.1.0.0":1},sel="0.1.0.0";
  v.appendChild(head("Taxonomy","One bank-wide tree. Every process has one name, one place and one owner. Click a node to open it and see its details.","Define and maintain the Process Universe taxonomy"));
  var s=h("div",{class:"split rise"}),tree=h("div",{class:"card tree"}),det=h("div",{class:"card"});s.appendChild(tree);s.appendChild(det);v.appendChild(s);
  function at(p){var i=p.split(".").map(Number),n=T[i[0]],names=[n[0]];for(var k=1;k<i.length;k++){n=nd(n[1][i[k]]);names.push(n[0])}return{n:n,names:names}}
  function list(arr,pre){var ul=h("ul");arr.forEach(function(r,i){var n=nd(r),p=pre===""?""+i:pre+"."+i,has=n[1].length>0,b=h("button",{class:"tn"+(p===sel?" sel":""),"aria-expanded":has?String(!!open[p]):null,text:(has?(open[p]?"▾ ":"▸ "):"• ")+n[0]});
    b.onclick=function(){sel=p;if(has)open[p]=!open[p];draw()};var li=h("li",null,[b]);if(has&&open[p])li.appendChild(list(n[1],p));ul.appendChild(li)});return ul}
  function draw(){tree.textContent="";tree.appendChild(list(T,""));var a=at(sel),d=a.names.length-1;det.textContent="";
    det.appendChild(h("h3",{text:a.n[0]}));var dl=h("dl");[["Level",LV[d]],["Path",a.names.join(" > ")],["Owner role (sample)",OW[d]],["Linked documents",DOC[d]],["Children",String(a.n[1].length)]].forEach(function(r){dl.appendChild(h("dt",{text:r[0]}));dl.appendChild(h("dd",{text:r[1]}))});det.appendChild(dl)}
  draw();return v};
PAGES.standards=function(){
  var v=h("div");v.appendChild(head("Standards","Common rules for what each level means and how things are named, so the same process is never described two ways.","Define and maintain standards and design principles"));
  var rows=[["L1 Domain","Broad area of work","Noun phrase","Lending"],["L2 Process group","Related processes","Noun phrase","Credit risk mitigation"],["L3 Process","One owner, clear start and end, measurable result","Verb + object","Manage guarantees"],["L4 Sub-process","Main step inside a process","Verb + object","Screen sanctions list"]];
  var t=h("table"),hd=h("tr");["Level","Test","Naming","Example"].forEach(function(x){hd.appendChild(h("th",{text:x}))});t.appendChild(hd);rows.forEach(function(r){var tr=h("tr");r.forEach(function(x){tr.appendChild(h("td",{text:x}))});t.appendChild(tr)});
  v.appendChild(h("div",{class:"card rise"},[h("h3",{text:"Levels and naming"}),h("div",{class:"wrap"},[t])]));
  var prin=h("div",{class:"card rise",style:"margin-top:16px"},[h("h3",{text:"Design principles"}),h("ul",null,["Organise by the work, not by the org chart.","Same level means same size: keep granularity consistent.","One process, one home. Link to other places, do not duplicate.","Plain business language: no team names, system names or abbreviations as the main name.","Every node has a named owner."].map(function(x){return h("li",{text:x})}))]);v.appendChild(prin);
  var VB="manage perform process issue verify receive assess approve open review screen monitor report reconcile collect resolve maintain execute prepare submit close record escalate validate settle create activate log post recruit billing".split(" ");
  var c=h("div",{class:"card rise",style:"margin-top:16px"}),inp=h("input",{id:"nm",type:"text",placeholder:"Type a process name, for example Perform due diligence","aria-label":"Process name"}),sel=h("select",{id:"lv","aria-label":"Level"},[1,2,3,4].map(function(i){return h("option",{value:i,text:LV[i]})})),out=h("ul",{"aria-live":"polite"});sel.value="3";
  c.appendChild(h("h3",{text:"Check a process name"}));c.appendChild(inp);c.appendChild(h("label",{text:"Level",for:"lv"}));c.appendChild(sel);c.appendChild(out);v.appendChild(c);
  function run(){out.textContent="";var s=inp.value.trim();if(!s)return;var w=s.split(/\s+/),vl=VB.indexOf(w[0].toLowerCase())>=0,lv=+sel.value;
    var ck=[[lv>=3?(vl&&w.length>=2):!vl,lv>=3?"Starts with a verb and has an object":"Reads as a noun phrase, not an action"],[w.length<=6,"Six words or fewer"],[!/\b(team|dept|department|unit|division)\b/i.test(s),"No team or department words"],[!/\b[A-Z]{3,}\b/.test(s),"No abbreviations"],[!/[&\/]/.test(s),"No symbols such as & or /"]];
    ck.forEach(function(r){out.appendChild(h("li",{class:r[0]?"ok":"wn",text:(r[0]?"✓ ":"! ")+r[1]}))})}
  inp.oninput=run;sel.onchange=run;return v};
PAGES.roles=function(){
  var R=[["Global Process Owner","Owns a broad area end to end.","Direction for the area; approves major changes in it.","Domain Owners, executives, the Process Universe lead"],["Domain Owner","Owns a domain or process group.","Keeps structure consistent; resolves overlaps between processes.","Process Element Owners, Product Owners"],["Process Element Owner","Owns one process.","Keeps the description, steps and linked documents current.","Teams who run the process, Champions"],["Product Owner","Represents a product’s processes.","Raises a change when a product changes; links products to the right nodes.","Domain Owners, Champions"],["PU Champion","Local contact in a Business or Function.","Promotes use, collects feedback, raises issues.","Everyone in their area, the Process Universe lead"]];
  var v=h("div");v.appendChild(head("Roles and ownership","Who owns what. Select a role to see what it owns, decides and works with. These are sample responsibilities.","Operationalise the Process Universe roles and embed ownership"));
  var s=h("div",{class:"split rise"}),l=h("div",{class:"card"}),d=h("div",{class:"card"});s.appendChild(l);s.appendChild(d);v.appendChild(s);var cur=0;
  function draw(){l.textContent="";R.forEach(function(r,i){var b=h("button",{class:"chip","aria-pressed":String(i===cur),text:r[0],style:"display:block;width:100%;text-align:left;border-radius:10px"});b.onclick=function(){cur=i;draw()};l.appendChild(b)});
    d.textContent="";var r=R[cur];d.appendChild(h("h3",{text:r[0]}));var dl=h("dl");[["Owns",r[1]],["Decides",r[2]],["Works with",r[3]]].forEach(function(x){dl.appendChild(h("dt",{text:x[0]}));dl.appendChild(h("dd",{text:x[1]}))});d.appendChild(dl)}
  draw();return v};
PAGES.governance=function(){
  var v=h("div");v.appendChild(head("Governance","How the Process Universe stays accurate in business as usual: routines, controls and a change request process.","Establish governance routines, controls and change management processes"));
  var g=h("div",{class:"grid g2 rise"});
  g.appendChild(h("div",{class:"card"},[h("h3",{text:"Routines (sample cadence)"}),h("ul",null,["Monthly: change request review forum","Quarterly: owner attestation and naming quality check","Annually: taxonomy design review"].map(function(x){return h("li",{text:x})}))]));
  g.appendChild(h("div",{class:"card"},[h("h3",{text:"Controls"}),h("ul",null,["One golden source for the taxonomy","No change without an approved request","Every node has a named owner","Names checked against the standard"].map(function(x){return h("li",{text:x})}))]));v.appendChild(g);
  var box=h("div",{class:"card rise",style:"margin-top:16px"});v.appendChild(box);var n=0;
  var ST=[["Submitted","Request logged with a reference number."],["Triage","Completeness and naming checked."],["Impact assessment","Effect on owners, documents, metrics and tools reviewed."],["Owner and forum decision","Approved, rejected or sent back."],["Golden source updated","Change published and owners notified."]];
  function form(){box.textContent="";box.appendChild(h("h3",{text:"Change request form (demo)"}));box.appendChild(h("p",{class:"sub",text:"Try it. Nothing is sent anywhere."}));
    var f=h("div"),F={};function add(id,l,el){f.appendChild(h("label",{for:id,text:l}));F[id]=el;el.id=id;f.appendChild(el);var e=h("p",{class:"err",id:id+"e"});f.appendChild(e)}
    function sl(a){return h("select",null,[h("option",{value:"",text:"Select"})].concat(a.map(function(x){return h("option",{value:x,text:x})})))}
    add("unit","Business or Function",sl(["Corporate and Investment","Retail and Wealth","Risk","Compliance","Finance","Human resources","Technology","Operations"]));
    add("type","Type of change",sl(["Add a process","Rename a process","Move a process","Retire a process"]));
    add("node","Where in the taxonomy",sl(flat()));
    add("prop","Proposed change",h("textarea",{placeholder:"For example: rename ‘Manage guarantees’ to ‘Administer guarantees’"}));
    add("why","Reason",h("textarea",{placeholder:"Why is the change needed?"}));
    f.appendChild(h("label",{text:"Likely impact"}));var ch=h("div",{class:"chk"});["Owners","Documents and SOPs","Metrics and reports","Systems and tools","Other taxonomies"].forEach(function(x){ch.appendChild(h("label",null,[h("input",{type:"checkbox",value:x}),x]))});f.appendChild(ch);
    add("urg","Urgency",sl(["Standard","Expedited"]));F.urg.value="Standard";
    var b=h("button",{class:"btn",style:"margin-top:18px",text:"Submit request"});
    b.onclick=function(){var ok=true;[["unit","Choose a Business or Function"],["type","Choose a type of change"],["node","Choose where it sits"],["prop","Describe the change (at least 10 characters)"],["why","Give a reason (at least 10 characters)"]].forEach(function(r){var el=F[r[0]],bad=(r[0]==="prop"||r[0]==="why")?el.value.trim().length<10:!el.value;$("#"+r[0]+"e").textContent=bad?r[1]:"";if(bad)ok=false});
      if(ok)done({unit:F.unit.value,type:F.type.value,node:F.node.value,prop:F.prop.value.trim(),urg:F.urg.value,imp:[].slice.call(ch.querySelectorAll("input:checked")).map(function(i){return i.value}).join(", ")||"None selected"})};
    f.appendChild(b);box.appendChild(f)}
  function done(r){n++;box.textContent="";var ref="CR-"+(1000+n);box.appendChild(h("h3",{text:"Request "+ref+" submitted"}));var dl=h("dl");[["From",r.unit],["Change",r.type+": "+r.node],["Proposal",r.prop],["Impact",r.imp],["Urgency",r.urg]].forEach(function(x){dl.appendChild(h("dt",{text:x[0]}));dl.appendChild(h("dd",{text:x[1]}))});box.appendChild(dl);
    var ol=h("ol",{class:"steps","aria-live":"polite"}),lis=ST.map(function(s){var li=h("li",null,[h("div",null,[h("b",{text:s[0]}),h("span",{text:s[1]})])]);ol.appendChild(li);return li});box.appendChild(ol);
    var i=0;(function tick(){if(i<lis.length){lis[i].className="on";i++;if(location.hash==="#governance")setTimeout(tick,reduce?0:900)}})();
    var b=h("button",{class:"btn o",text:"Submit another request"});b.onclick=form;box.appendChild(b)}
  form();return v};
PAGES.adoption=function(){
  var U=[["Corporate and Investment",86],["Retail and Wealth",71],["Risk",92],["Compliance",88],["Finance",79],["Human resources",64],["Technology",58],["Operations",67]];
  var RD=[["Risk","Technology","Tool refresh not yet scheduled","Yes"],["Issue","Human resources","Several owners not yet named","No"],["Dependency","Retail and Wealth","Awaiting product taxonomy update","No"],["Risk","Operations","Local naming conflicts with the standard","No"],["Issue","Technology","Low Champion coverage","Yes"],["Dependency","Finance","Reporting template change","No"]];
  function st(x){return x>=75?["On track","ok"]:x>=60?["Watch","wn"]:["At risk","bd"]}
  var v=h("div");v.appendChild(head("Adoption and tracking","Sample figures: share of each area’s processes with a named owner and in active use. Filter by status.","Track adoption progress, risks, issues and dependencies, escalating where required"));
  var top=h("div",{class:"grid g4 rise"}),bars=h("div",{class:"card rise",style:"margin-top:16px"}),fl=h("div"),tb=h("div",{class:"card rise wrap",style:"margin-top:16px"}),f="All",rf="All";
  var avg=U.reduce(function(a,u){return a+u[1]},0)/U.length,risk=U.filter(function(u){return u[1]<60}).length,esc=RD.filter(function(r){return r[3]==="Yes"}).length;
  [[avg,0,"%","Average adoption"],[risk,0,"","Areas at risk"],[RD.length,0,"","Open items"],[esc,0,"","Escalated"]].forEach(function(s){var c=h("div",{class:"card"}),n=h("div",{class:"big",text:"0"});c.appendChild(n);c.appendChild(h("p",{class:"lab",text:s[3]}));top.appendChild(c);count(n,s[0],s[1],s[2])});
  v.appendChild(top);v.appendChild(bars);v.appendChild(tb);
  function drawB(){bars.textContent="";bars.appendChild(h("h3",{text:"Adoption by area"}));var fw=h("div");["All","On track","Watch","At risk"].forEach(function(x){var b=h("button",{class:"chip","aria-pressed":String(f===x),text:x});b.onclick=function(){f=x;drawB()};fw.appendChild(b)});bars.appendChild(fw);
    U.filter(function(u){return f==="All"||st(u[1])[0]===f}).forEach(function(u){var s=st(u[1]),w=h("div",{style:"margin:12px 0"}),i=h("i",{style:"background:var(--"+(s[1]==="ok"?"ok":s[1]==="wn"?"warn":"bad")+")"});w.appendChild(h("div",{style:"display:flex;justify-content:space-between"},[h("span",{text:u[0]}),h("span",{class:s[1],text:u[1]+"% · "+s[0]})]));w.appendChild(h("div",{class:"bar"},[i]));bars.appendChild(w);requestAnimationFrame(function(){requestAnimationFrame(function(){i.style.width=u[1]+"%"})})})}
  function drawT(){tb.textContent="";tb.appendChild(h("h3",{text:"Risks, issues and dependencies"}));var fw=h("div");["All","Risk","Issue","Dependency"].forEach(function(x){var b=h("button",{class:"chip","aria-pressed":String(rf===x),text:x});b.onclick=function(){rf=x;drawT()};fw.appendChild(b)});tb.appendChild(fw);
    var t=h("table"),hd=h("tr");["Type","Area","Description","Escalated"].forEach(function(x){hd.appendChild(h("th",{text:x}))});t.appendChild(hd);RD.filter(function(r){return rf==="All"||r[0]===rf}).forEach(function(r){var tr=h("tr");r.forEach(function(x){tr.appendChild(h("td",{text:x}))});t.appendChild(tr)});tb.appendChild(t)}
  drawB();drawT();return v};
PAGES.community=function(){
  var v=h("div");v.appendChild(head("Community","Guidance, communications and engagement for Champions and owners.","Build and engage the Process Universe community"));
  var g=h("div",{class:"grid g2 rise"}),a=h("div",{class:"card"}),b=h("div",{class:"card"});
  a.appendChild(h("h3",{text:"Guidance"}));[["How do I find my process?","Search the taxonomy by name or browse from your domain. Each process shows its owner and linked documents."],["How do I raise a change?","Use the change request form on the Governance page. Choose the type of change and where it sits."],["How should I name a process?","Use a verb and an object for processes, for example ‘Perform due diligence’. Avoid team names and abbreviations."]].forEach(function(x){a.appendChild(h("details",null,[h("summary",{text:x[0]}),h("p",{text:x[1]})]))});
  b.appendChild(h("h3",{text:"Communications (sample plan)"}));var t=h("table");[["Monthly","Update to owners and Champions"],["Quarterly","Open forum and Q&A"],["On release","Short note on what changed"],["On request","Onboarding session for a new area"]].forEach(function(r){var tr=h("tr");r.forEach(function(x){tr.appendChild(h("td",{text:x}))});t.appendChild(tr)});b.appendChild(t);
  g.appendChild(a);g.appendChild(b);v.appendChild(g);
  v.appendChild(h("div",{class:"card rise",style:"margin-top:16px"},[h("h3",{text:"Champion starter kit"}),h("ul",null,["One-page overview of the Process Universe","Quick reference to the levels and naming rules","Template message to introduce it to your team","List of owners in your area","Where to send feedback and questions"].map(function(x){return h("li",{text:x})}))]));return v};
PAGES.alignment=function(){
  var P=["Simplify","Digitise","Standardise"],D=[["Client onboarding",[0,1,2]],["Lending",[1,0]],["Payments",[1,2]],["Compliance",[2]],["Risk management",[2,0]],["Finance",[0,2]],["Human resources",[1]],["Technology",[1,2]]];
  var v=h("div");v.appendChild(head("Alignment and metrics","See which domains support which transformation priorities, and how consistent metrics are defined.","Stay aligned to transformation priorities; embed consistent metrics and accountability"));
  var c=h("div",{class:"card rise"}),sel=-1;v.appendChild(c);
  function draw(){c.textContent="";c.appendChild(h("h3",{text:"Domains by priority (sample)"}));var fw=h("div");P.forEach(function(p,i){var b=h("button",{class:"chip","aria-pressed":String(sel===i),text:p});b.onclick=function(){sel=sel===i?-1:i;draw()};fw.appendChild(b)});c.appendChild(fw);
    var gr=h("div",{class:"grid g4"});D.forEach(function(d){var on=sel<0||d[1].indexOf(sel)>=0,e=h("div",{class:"card"+(sel>=0&&on?" hi":""),style:"padding:14px;opacity:"+(on?1:.35)},[h("b",{text:d[0]}),h("p",{class:"lab",text:d[1].map(function(i){return P[i]}).join(", ")})]);gr.appendChild(e)});c.appendChild(gr)}
  draw();
  var m=h("div",{class:"grid g4 rise",style:"margin-top:16px"});[[78,"%","Owner coverage","Processes with a named owner"],[71,"%","Adoption rate","Areas actively using it"],[12,"","Change cycle (days)","Request to decision"],[94,"%","Naming quality","Names meeting the standard"]].forEach(function(r){var k=h("div",{class:"card"}),n=h("div",{class:"big",text:"0"});k.appendChild(n);k.appendChild(h("b",{text:r[2]}));k.appendChild(h("p",{class:"lab",text:r[3]+" (sample)"}));m.appendChild(k);count(n,r[0],0,r[1])});v.appendChild(m);return v};
/* ---------- router ---------- */
var nav=$("#nav");MENU.forEach(function(m){nav.appendChild(h("a",{href:"#"+m[0],id:"n-"+m[0],text:m[1]}))});
function route(){var k=location.hash.replace("#","");if(!PAGES[k])k="taxonomy";MENU.forEach(function(m){var a=$("#n-"+m[0]);if(m[0]===k)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});var vw=$("#view");vw.textContent="";vw.appendChild(PAGES[k]())}
window.addEventListener("hashchange",route);route();
