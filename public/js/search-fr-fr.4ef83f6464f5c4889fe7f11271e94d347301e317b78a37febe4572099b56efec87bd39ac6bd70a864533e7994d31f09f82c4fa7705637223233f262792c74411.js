(()=>{(()=>{var oe="/fr/index.json";function A(e){return Array.isArray?Array.isArray(e):G(e)==="[object Array]"}function F(e){return typeof e=="string"}function D(e){return typeof e=="number"}function ae(e){return e===!0||e===!1||function(t){return U(t)&&t!==null}(e)&&G(e)=="[object Boolean]"}function U(e){return typeof e=="object"}function S(e){return e!=null}function B(e){return!e.trim().length}function G(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}var Q=Object.prototype.hasOwnProperty,he=class{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach(s=>{let i=X(s);t+=i.weight,this._keys.push(i),this._keyMap[i.id]=i,t+=i.weight}),this._keys.forEach(s=>{s.weight/=t})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}};function X(e){let t=null,s=null,i=null,n=1;if(F(e)||A(e))i=e,t=Y(e),s=H(e);else{if(!Q.call(e,"name"))throw new Error((c=>`Missing ${c} property in key`)("name"));let r=e.name;if(i=r,Q.call(e,"weight")&&(n=e.weight,n<=0))throw new Error((c=>`Property 'weight' in key '${c}' must be a positive integer`)(r));t=Y(r),s=H(r)}return{path:t,id:s,weight:n,src:i}}function Y(e){return A(e)?e:e.split(".")}function H(e){return A(e)?e.join("."):e}var u={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(e,t){let s=[],i=!1,n=(r,c,o)=>{if(S(r))if(c[o]){let h=r[c[o]];if(!S(h))return;if(o===c.length-1&&(F(h)||D(h)||ae(h)))s.push(function(a){return a==null?"":function(l){if(typeof l=="string")return l;let d=l+"";return d=="0"&&1/l==-1/0?"-0":d}(a)}(h));else if(A(h)){i=!0;for(let a=0,l=h.length;a<l;a+=1)n(h[a],c,o+1)}else c.length&&n(h,c,o+1)}else s.push(r)};return n(e,F(t)?t.split("."):t,0),i?s:s[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1},le=/[^ ]+/g,K=class{constructor({getFn:e=u.getFn,fieldNormWeight:t=u.fieldNormWeight}={}){this.norm=function(s=1,i=3){let n=new Map,r=Math.pow(10,i);return{get(c){let o=c.match(le).length;if(n.has(o))return n.get(o);let h=1/Math.pow(o,.5*s),a=parseFloat(Math.round(h*r)/r);return n.set(o,a),a},clear(){n.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((t,s)=>{this._keysMap[t.id]=s})}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,F(this.docs[0])?this.docs.forEach((e,t)=>{this._addString(e,t)}):this.docs.forEach((e,t)=>{this._addObject(e,t)}),this.norm.clear())}add(e){let t=this.size();F(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,s=this.size();t<s;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!S(e)||B(e))return;let s={v:e,i:t,n:this.norm.get(e)};this.records.push(s)}_addObject(e,t){let s={i:t,$:{}};this.keys.forEach((i,n)=>{let r=this.getFn(e,i.path);if(S(r)){if(A(r)){let c=[],o=[{nestedArrIndex:-1,value:r}];for(;o.length;){let{nestedArrIndex:h,value:a}=o.pop();if(S(a))if(F(a)&&!B(a)){let l={v:a,i:h,n:this.norm.get(a)};c.push(l)}else A(a)&&a.forEach((l,d)=>{o.push({nestedArrIndex:d,value:l})})}s.$[n]=c}else if(!B(r)){let c={v:r,n:this.norm.get(r)};s.$[n]=c}}}),this.records.push(s)}toJSON(){return{keys:this.keys,records:this.records}}};function Z(e,t,{getFn:s=u.getFn,fieldNormWeight:i=u.fieldNormWeight}={}){let n=new K({getFn:s,fieldNormWeight:i});return n.setKeys(e.map(X)),n.setSources(t),n.create(),n}function z(e,{errors:t=0,currentLocation:s=0,expectedLocation:i=0,distance:n=u.distance,ignoreLocation:r=u.ignoreLocation}={}){let c=t/e.length;if(r)return c;let o=Math.abs(i-s);return n?c+o/n:o?1:c}function ue(e,t,s,{location:i=u.location,distance:n=u.distance,threshold:r=u.threshold,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,includeMatches:h=u.includeMatches,ignoreLocation:a=u.ignoreLocation}={}){if(t.length>32)throw new Error(`Pattern length exceeds max of ${32}.`);let l=t.length,d=e.length,g=Math.max(0,Math.min(i,d)),p=r,f=g,M=o>1||h,k=M?Array(d):[],x;for(;(x=e.indexOf(t,f))>-1;){let w=z(t,{currentLocation:x,expectedLocation:g,distance:n,ignoreLocation:a});if(p=Math.min(w,p),f=x+l,M){let v=0;for(;v<l;)k[x+v]=1,v+=1}}f=-1;let m=[],L=1,y=l+d,b=1<<l-1;for(let w=0;w<l;w+=1){let v=0,C=y;for(;v<C;)z(t,{errors:w,currentLocation:g+C,expectedLocation:g,distance:n,ignoreLocation:a})<=p?v=C:y=C,C=Math.floor((y-v)/2+v);y=C;let R=Math.max(1,g-C+1),E=c?d:Math.min(g+C,d)+l,$=Array(E+2);$[E+1]=(1<<w)-1;for(let _=E;_>=R;_-=1){let j=_-1,W=s[e.charAt(j)];if(M&&(k[j]=+!!W),$[_]=($[_+1]<<1|1)&W,w&&($[_]|=(m[_+1]|m[_])<<1|1|m[_+1]),$[_]&b&&(L=z(t,{errors:w,currentLocation:j,expectedLocation:g,distance:n,ignoreLocation:a}),L<=p)){if(p=L,f=j,f<=g)break;R=Math.max(1,2*g-f)}}if(z(t,{errors:w+1,currentLocation:g,expectedLocation:g,distance:n,ignoreLocation:a})>p)break;m=$}let I={isMatch:f>=0,score:Math.max(.001,L)};if(M){let w=function(v=[],C=u.minMatchCharLength){let R=[],E=-1,$=-1,_=0;for(let j=v.length;_<j;_+=1){let W=v[_];W&&E===-1?E=_:W||E===-1||($=_-1,$-E+1>=C&&R.push([E,$]),E=-1)}return v[_-1]&&_-E>=C&&R.push([E,_-1]),R}(k,o);w.length?h&&(I.indices=w):I.isMatch=!1}return I}function de(e){let t={};for(let s=0,i=e.length;s<i;s+=1){let n=e.charAt(s);t[n]=(t[n]||0)|1<<i-s-1}return t}var ee=class{constructor(e,{location:t=u.location,threshold:s=u.threshold,distance:i=u.distance,includeMatches:n=u.includeMatches,findAllMatches:r=u.findAllMatches,minMatchCharLength:c=u.minMatchCharLength,isCaseSensitive:o=u.isCaseSensitive,ignoreLocation:h=u.ignoreLocation}={}){if(this.options={location:t,threshold:s,distance:i,includeMatches:n,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:h},this.pattern=o?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;let a=(d,g)=>{this.chunks.push({pattern:d,alphabet:de(d),startIndex:g})},l=this.pattern.length;if(l>32){let d=0,g=l%32,p=l-g;for(;d<p;)a(this.pattern.substr(d,32),d),d+=32;if(g){let f=l-32;a(this.pattern.substr(f),f)}}else a(this.pattern,0)}searchIn(e){let{isCaseSensitive:t,includeMatches:s}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let p={isMatch:!0,score:0};return s&&(p.indices=[[0,e.length-1]]),p}let{location:i,distance:n,threshold:r,findAllMatches:c,minMatchCharLength:o,ignoreLocation:h}=this.options,a=[],l=0,d=!1;this.chunks.forEach(({pattern:p,alphabet:f,startIndex:M})=>{let{isMatch:k,score:x,indices:m}=ue(e,p,f,{location:i+M,distance:n,threshold:r,findAllMatches:c,minMatchCharLength:o,includeMatches:s,ignoreLocation:h});k&&(d=!0),l+=x,k&&m&&(a=[...a,...m])});let g={isMatch:d,score:d?l/this.chunks.length:1};return d&&s&&(g.indices=a),g}},N=class{constructor(e){this.pattern=e}static isMultiMatch(e){return te(e,this.multiRegex)}static isSingleMatch(e){return te(e,this.singleRegex)}search(){}};function te(e,t){let s=e.match(t);return s?s[1]:null}var ne=class extends N{constructor(e,{location:t=u.location,threshold:s=u.threshold,distance:i=u.distance,includeMatches:n=u.includeMatches,findAllMatches:r=u.findAllMatches,minMatchCharLength:c=u.minMatchCharLength,isCaseSensitive:o=u.isCaseSensitive,ignoreLocation:h=u.ignoreLocation}={}){super(e),this._bitapSearch=new ee(e,{location:t,threshold:s,distance:i,includeMatches:n,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:h})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}},se=class extends N{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,s=0,i=[],n=this.pattern.length;for(;(t=e.indexOf(this.pattern,s))>-1;)s=t+n,i.push([t,s-1]);let r=!!i.length;return{isMatch:r,score:r?0:1,indices:i}}},P=[class extends N{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){let t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},se,class extends N{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){let t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends N{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){let t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends N{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){let t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends N{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){let t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends N{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){let t=e.indexOf(this.pattern)===-1;return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},ne],ie=P.length,ge=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/,fe=new Set([ne.type,se.type]),pe=class{constructor(e,{isCaseSensitive:t=u.isCaseSensitive,includeMatches:s=u.includeMatches,minMatchCharLength:i=u.minMatchCharLength,ignoreLocation:n=u.ignoreLocation,findAllMatches:r=u.findAllMatches,location:c=u.location,threshold:o=u.threshold,distance:h=u.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:s,minMatchCharLength:i,findAllMatches:r,ignoreLocation:n,location:c,threshold:o,distance:h},this.pattern=t?e:e.toLowerCase(),this.query=function(a,l={}){return a.split("|").map(d=>{let g=d.trim().split(ge).filter(f=>f&&!!f.trim()),p=[];for(let f=0,M=g.length;f<M;f+=1){let k=g[f],x=!1,m=-1;for(;!x&&++m<ie;){let L=P[m],y=L.isMultiMatch(k);y&&(p.push(new L(y,l)),x=!0)}if(!x)for(m=-1;++m<ie;){let L=P[m],y=L.isSingleMatch(k);if(y){p.push(new L(y,l));break}}}return p})}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){let t=this.query;if(!t)return{isMatch:!1,score:1};let{includeMatches:s,isCaseSensitive:i}=this.options;e=i?e:e.toLowerCase();let n=0,r=[],c=0;for(let o=0,h=t.length;o<h;o+=1){let a=t[o];r.length=0,n=0;for(let l=0,d=a.length;l<d;l+=1){let g=a[l],{isMatch:p,indices:f,score:M}=g.search(e);if(!p){c=0,n=0,r.length=0;break}if(n+=1,c+=M,s){let k=g.constructor.type;fe.has(k)?r=[...r,...f]:r.push(f)}}if(n){let l={isMatch:!0,score:c/n};return s&&(l.indices=r),l}}return{isMatch:!1,score:1}}},q=[];function T(e,t){for(let s=0,i=q.length;s<i;s+=1){let n=q[s];if(n.condition(e,t))return new n(e,t)}return new ee(e,t)}var J="$and",me="$or",re="$path",Me="$val",V=e=>!(!e[J]&&!e[me]),ce=e=>({[J]:Object.keys(e).map(t=>({[t]:e[t]}))});function ye(e,t,{auto:s=!0}={}){let i=n=>{let r=Object.keys(n),c=(h=>!!h[re])(n);if(!c&&r.length>1&&!V(n))return i(ce(n));if((h=>!A(h)&&U(h)&&!V(h))(n)){let h=c?n[re]:r[0],a=c?n[Me]:n[h];if(!F(a))throw new Error((d=>`Invalid value for key ${d}`)(h));let l={keyId:H(h),pattern:a};return s&&(l.searcher=T(a,t)),l}let o={children:[],operator:r[0]};return r.forEach(h=>{let a=n[h];A(a)&&a.forEach(l=>{o.children.push(i(l))})}),o};return V(e)||(e=ce(e)),i(e)}function ve(e,t){let s=e.matches;t.matches=[],S(s)&&s.forEach(i=>{if(!S(i.indices)||!i.indices.length)return;let{indices:n,value:r}=i,c={indices:n,value:r};i.key&&(c.key=i.key.src),i.idx>-1&&(c.refIndex=i.idx),t.matches.push(c)})}function xe(e,t){t.score=e.score}var O=class{constructor(e,t={},s){this.options={...u,...t},this.options.useExtendedSearch,this._keyStore=new he(this.options.keys),this.setCollection(e,s)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof K))throw new Error("Incorrect 'index' type");this._myIndex=t||Z(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){S(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){let t=[];for(let s=0,i=this._docs.length;s<i;s+=1){let n=this._docs[s];e(n,s)&&(this.removeAt(s),s-=1,i-=1,t.push(n))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){let{includeMatches:s,includeScore:i,shouldSort:n,sortFn:r,ignoreFieldNorm:c}=this.options,o=F(e)?F(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(h,{ignoreFieldNorm:a=u.ignoreFieldNorm}){h.forEach(l=>{let d=1;l.matches.forEach(({key:g,norm:p,score:f})=>{let M=g?g.weight:null;d*=Math.pow(f===0&&M?Number.EPSILON:f,(M||1)*(a?1:p))}),l.score=d})}(o,{ignoreFieldNorm:c}),n&&o.sort(r),D(t)&&t>-1&&(o=o.slice(0,t)),function(h,a,{includeMatches:l=u.includeMatches,includeScore:d=u.includeScore}={}){let g=[];return l&&g.push(ve),d&&g.push(xe),h.map(p=>{let{idx:f}=p,M={item:a[f],refIndex:f};return g.length&&g.forEach(k=>{k(p,M)}),M})}(o,this._docs,{includeMatches:s,includeScore:i})}_searchStringList(e){let t=T(e,this.options),{records:s}=this._myIndex,i=[];return s.forEach(({v:n,i:r,n:c})=>{if(!S(n))return;let{isMatch:o,score:h,indices:a}=t.searchIn(n);o&&i.push({item:n,idx:r,matches:[{score:h,value:n,norm:c,indices:a}]})}),i}_searchLogical(e){let t=ye(e,this.options),s=(c,o,h)=>{if(!c.children){let{keyId:l,searcher:d}=c,g=this._findMatches({key:this._keyStore.get(l),value:this._myIndex.getValueForItemAtKeyId(o,l),searcher:d});return g&&g.length?[{idx:h,item:o,matches:g}]:[]}let a=[];for(let l=0,d=c.children.length;l<d;l+=1){let g=c.children[l],p=s(g,o,h);if(p.length)a.push(...p);else if(c.operator===J)return[]}return a},i=this._myIndex.records,n={},r=[];return i.forEach(({$:c,i:o})=>{if(S(c)){let h=s(t,c,o);h.length&&(n[o]||(n[o]={idx:o,item:c,matches:[]},r.push(n[o])),h.forEach(({matches:a})=>{n[o].matches.push(...a)}))}}),r}_searchObjectList(e){let t=T(e,this.options),{keys:s,records:i}=this._myIndex,n=[];return i.forEach(({$:r,i:c})=>{if(!S(r))return;let o=[];s.forEach((h,a)=>{o.push(...this._findMatches({key:h,value:r[a],searcher:t}))}),o.length&&n.push({idx:c,item:r,matches:o})}),n}_findMatches({key:e,value:t,searcher:s}){if(!S(t))return[];let i=[];if(A(t))t.forEach(({v:n,i:r,n:c})=>{if(!S(n))return;let{isMatch:o,score:h,indices:a}=s.searchIn(n);o&&i.push({score:h,key:e,value:n,idx:r,norm:c,indices:a})});else{let{v:n,n:r}=t,{isMatch:c,score:o,indices:h}=s.searchIn(n);c&&i.push({score:o,key:e,value:n,norm:r,indices:h})}return i}};O.version="6.5.3",O.createIndex=Z,O.parseIndex=function(e,{getFn:t=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){let{keys:i,records:n}=e,r=new K({getFn:t,fieldNormWeight:s});return r.setKeys(i),r.setIndexRecords(n),r},O.config=u,function(...e){q.push(...e)}(pe);async function Le(){let e=fetch(oe),t=document.getElementById("search_btn"),s=document.getElementById("search_menu_wrapper"),i=document.getElementById("search_menu_close_btn"),n=document.getElementById("search_menu_input"),r=document.getElementById("search_menu_results");t.addEventListener("click",function(){s.classList.remove("hidden"),n.focus()}),i.addEventListener("click",function(){s.classList.add("hidden")});let c=await(await e).json(),o={distance:100,threshold:.3,ignoreLocation:!0,minMatchCharLength:2,keys:["title","permalink","content"],includeMatches:!0},h=new O(c,o),a=(p,f,M)=>`<a href="${f}">
                    <div class="search-menu-result-item">
                        <div class="search-menu-result-item-title">${p}</div>
                        <div class="search-menu-result-item-content">${M}</div>
                    </div>
                </a>`,l=(p,f)=>{let M=(m,L)=>{let y="",b=0;return L.forEach(I=>{b<I[0]&&(y+=m.substring(b,I[0])),y+="<mark>"+m.substring(I[0],I[1]+1)+"</mark>",b=I[1]+1}),y+=m.substring(b,m.length),y},k=(m,L)=>{let y="<mark>"+m.substring(L[0][0],L[0][1]+1)+"</mark>",b=L[0][1]+1,I=L[0][1]+1-L[0][0];L[0][0]>0&&(y="..."+y);for(let w=1;w<L.length;w++){let v=L[w];if(b<v[0]&&I+v[0]-b>=100){y+=m.substring(b,b+(100-I+1))+"...",I=100;break}if(b<v[0]&&(y+=m.substring(b,v[0]),I+=v[0]-b),y+="<mark>"+m.substring(v[0],v[1]+1)+"</mark>",I+=v[1]+1-v[0],b=v[1]+1,I>=100)break}return I<100&&(y+=m.substring(b,b+(100-I))),b<=m.length&&(y+="..."),y},x={title:void 0,permalink:p.permalink,content:void 0};return f.forEach(m=>{m.key=="title"?x.title=M(p.title,m.indices):m.key=="content"&&(x.content=k(p.content,m.indices))}),x.title===void 0&&(x.title=p.title),x.content===void 0&&(x.content=p.content),x},d=()=>{r.innerHTML=c.reduce((p,f)=>{let M=f.content.length>100?f.content.substring(0,100)+"...":f.content;return p+a(f.title,f.permalink,M)},"")},g=p=>{let f=h.search(p);f.length==0?r.innerHTML="":r.innerHTML=f.reduce((M,k)=>{let x=l(k.item,k.matches);return M+a(x.title,x.permalink,x.content)},"")};n.addEventListener("input",function(){this.value===""?d():g(this.value.trim())}),d()}window.addEventListener("DOMContentLoaded",Le)})();})();
