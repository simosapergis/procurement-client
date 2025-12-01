(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ul(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const ke={},vs=[],hn=()=>{},Bp=()=>!1,ba=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Bl=t=>t.startsWith("onUpdate:"),st=Object.assign,jl=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Av=Object.prototype.hasOwnProperty,Se=(t,e)=>Av.call(t,e),le=Array.isArray,Es=t=>Ra(t)==="[object Map]",jp=t=>Ra(t)==="[object Set]",pe=t=>typeof t=="function",Je=t=>typeof t=="string",Un=t=>typeof t=="symbol",Ve=t=>t!==null&&typeof t=="object",$p=t=>(Ve(t)||pe(t))&&pe(t.then)&&pe(t.catch),qp=Object.prototype.toString,Ra=t=>qp.call(t),bv=t=>Ra(t).slice(8,-1),Hp=t=>Ra(t)==="[object Object]",Sa=t=>Je(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,_i=Ul(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ca=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Rv=/-\w/g,_r=Ca(t=>t.replace(Rv,e=>e.slice(1).toUpperCase())),Sv=/\B([A-Z])/g,Yr=Ca(t=>t.replace(Sv,"-$1").toLowerCase()),Wp=Ca(t=>t.charAt(0).toUpperCase()+t.slice(1)),yc=Ca(t=>t?`on${Wp(t)}`:""),cr=(t,e)=>!Object.is(t,e),Lo=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Gp=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},$l=t=>{const e=parseFloat(t);return isNaN(e)?t:e},Cv=t=>{const e=Je(t)?Number(t):NaN;return isNaN(e)?t:e};let Yh;const Pa=()=>Yh||(Yh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ql(t){if(le(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Je(r)?kv(r):ql(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Je(t)||Ve(t))return t}const Pv=/;(?![^(]*\))/g,xv=/:([^]+)/,Nv=/\/\*[^]*?\*\//g;function kv(t){const e={};return t.replace(Nv,"").split(Pv).forEach(n=>{if(n){const r=n.split(xv);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Yi(t){let e="";if(Je(t))e=t;else if(le(t))for(let n=0;n<t.length;n++){const r=Yi(t[n]);r&&(e+=r+" ")}else if(Ve(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Dv="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ov=Ul(Dv);function zp(t){return!!t||t===""}const Kp=t=>!!(t&&t.__v_isRef===!0),Be=t=>Je(t)?t:t==null?"":le(t)||Ve(t)&&(t.toString===qp||!pe(t.toString))?Kp(t)?Be(t.value):JSON.stringify(t,Qp,2):String(t),Qp=(t,e)=>Kp(e)?Qp(t,e.value):Es(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[vc(r,i)+" =>"]=s,n),{})}:jp(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>vc(n))}:Un(e)?vc(e):Ve(e)&&!le(e)&&!Hp(e)?String(e):e,vc=(t,e="")=>{var n;return Un(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _t;class Jp{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=_t,!e&&_t&&(this.index=(_t.scopes||(_t.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=_t;try{return _t=this,e()}finally{_t=n}}}on(){++this._on===1&&(this.prevScope=_t,_t=this)}off(){this._on>0&&--this._on===0&&(_t=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Yp(t){return new Jp(t)}function Xp(){return _t}function Vv(t,e=!1){_t&&_t.cleanups.push(t)}let Me;const Ec=new WeakSet;class Zp{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,_t&&_t.active&&_t.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ec.has(this)&&(Ec.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||tm(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Xh(this),nm(this);const e=Me,n=Zt;Me=this,Zt=!0;try{return this.fn()}finally{rm(this),Me=e,Zt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Gl(e);this.deps=this.depsTail=void 0,Xh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ec.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Kc(this)&&this.run()}get dirty(){return Kc(this)}}let em=0,yi,vi;function tm(t,e=!1){if(t.flags|=8,e){t.next=vi,vi=t;return}t.next=yi,yi=t}function Hl(){em++}function Wl(){if(--em>0)return;if(vi){let e=vi;for(vi=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;yi;){let e=yi;for(yi=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function nm(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function rm(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Gl(r),Mv(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function Kc(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(sm(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function sm(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===ki)||(t.globalVersion=ki,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Kc(t))))return;t.flags|=2;const e=t.dep,n=Me,r=Zt;Me=t,Zt=!0;try{nm(t);const s=t.fn(t._value);(e.version===0||cr(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{Me=n,Zt=r,rm(t),t.flags&=-3}}function Gl(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Gl(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Mv(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Zt=!0;const im=[];function kn(){im.push(Zt),Zt=!1}function Dn(){const t=im.pop();Zt=t===void 0?!0:t}function Xh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Me;Me=void 0;try{e()}finally{Me=n}}}let ki=0;class Lv{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class zl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Me||!Zt||Me===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Me)n=this.activeLink=new Lv(Me,this),Me.deps?(n.prevDep=Me.depsTail,Me.depsTail.nextDep=n,Me.depsTail=n):Me.deps=Me.depsTail=n,om(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Me.depsTail,n.nextDep=void 0,Me.depsTail.nextDep=n,Me.depsTail=n,Me.deps===n&&(Me.deps=r)}return n}trigger(e){this.version++,ki++,this.notify(e)}notify(e){Hl();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Wl()}}}function om(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)om(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Yo=new WeakMap,Br=Symbol(""),Qc=Symbol(""),Di=Symbol("");function vt(t,e,n){if(Zt&&Me){let r=Yo.get(t);r||Yo.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new zl),s.map=r,s.key=n),s.track()}}function Rn(t,e,n,r,s,i){const o=Yo.get(t);if(!o){ki++;return}const c=l=>{l&&l.trigger()};if(Hl(),e==="clear")o.forEach(c);else{const l=le(t),u=l&&Sa(n);if(l&&n==="length"){const f=Number(r);o.forEach((p,m)=>{(m==="length"||m===Di||!Un(m)&&m>=f)&&c(p)})}else switch((n!==void 0||o.has(void 0))&&c(o.get(n)),u&&c(o.get(Di)),e){case"add":l?u&&c(o.get("length")):(c(o.get(Br)),Es(t)&&c(o.get(Qc)));break;case"delete":l||(c(o.get(Br)),Es(t)&&c(o.get(Qc)));break;case"set":Es(t)&&c(o.get(Br));break}}Wl()}function Fv(t,e){const n=Yo.get(t);return n&&n.get(e)}function cs(t){const e=we(t);return e===t?e:(vt(e,"iterate",Di),Ft(t)?e:e.map(en))}function xa(t){return vt(t=we(t),"iterate",Di),t}function Xn(t,e){return On(t)?fn(t)?Ss(en(e)):Ss(e):en(e)}const Uv={__proto__:null,[Symbol.iterator](){return Ic(this,Symbol.iterator,t=>Xn(this,t))},concat(...t){return cs(this).concat(...t.map(e=>le(e)?cs(e):e))},entries(){return Ic(this,"entries",t=>(t[1]=Xn(this,t[1]),t))},every(t,e){return wn(this,"every",t,e,void 0,arguments)},filter(t,e){return wn(this,"filter",t,e,n=>n.map(r=>Xn(this,r)),arguments)},find(t,e){return wn(this,"find",t,e,n=>Xn(this,n),arguments)},findIndex(t,e){return wn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return wn(this,"findLast",t,e,n=>Xn(this,n),arguments)},findLastIndex(t,e){return wn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return wn(this,"forEach",t,e,void 0,arguments)},includes(...t){return Tc(this,"includes",t)},indexOf(...t){return Tc(this,"indexOf",t)},join(t){return cs(this).join(t)},lastIndexOf(...t){return Tc(this,"lastIndexOf",t)},map(t,e){return wn(this,"map",t,e,void 0,arguments)},pop(){return ai(this,"pop")},push(...t){return ai(this,"push",t)},reduce(t,...e){return Zh(this,"reduce",t,e)},reduceRight(t,...e){return Zh(this,"reduceRight",t,e)},shift(){return ai(this,"shift")},some(t,e){return wn(this,"some",t,e,void 0,arguments)},splice(...t){return ai(this,"splice",t)},toReversed(){return cs(this).toReversed()},toSorted(t){return cs(this).toSorted(t)},toSpliced(...t){return cs(this).toSpliced(...t)},unshift(...t){return ai(this,"unshift",t)},values(){return Ic(this,"values",t=>Xn(this,t))}};function Ic(t,e,n){const r=xa(t),s=r[e]();return r!==t&&!Ft(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const Bv=Array.prototype;function wn(t,e,n,r,s,i){const o=xa(t),c=o!==t&&!Ft(t),l=o[e];if(l!==Bv[e]){const p=l.apply(t,i);return c?en(p):p}let u=n;o!==t&&(c?u=function(p,m){return n.call(this,Xn(t,p),m,t)}:n.length>2&&(u=function(p,m){return n.call(this,p,m,t)}));const f=l.call(o,u,r);return c&&s?s(f):f}function Zh(t,e,n,r){const s=xa(t);let i=n;return s!==t&&(Ft(t)?n.length>3&&(i=function(o,c,l){return n.call(this,o,c,l,t)}):i=function(o,c,l){return n.call(this,o,Xn(t,c),l,t)}),s[e](i,...r)}function Tc(t,e,n){const r=we(t);vt(r,"iterate",Di);const s=r[e](...n);return(s===-1||s===!1)&&Na(n[0])?(n[0]=we(n[0]),r[e](...n)):s}function ai(t,e,n=[]){kn(),Hl();const r=we(t)[e].apply(t,n);return Wl(),Dn(),r}const jv=Ul("__proto__,__v_isRef,__isVue"),am=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Un));function $v(t){Un(t)||(t=String(t));const e=we(this);return vt(e,"has",t),e.hasOwnProperty(t)}class cm{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?Xv:fm:i?hm:um).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=le(e);if(!s){let l;if(o&&(l=Uv[n]))return l;if(n==="hasOwnProperty")return $v}const c=Reflect.get(e,n,$e(e)?e:r);if((Un(n)?am.has(n):jv(n))||(s||vt(e,"get",n),i))return c;if($e(c)){const l=o&&Sa(n)?c:c.value;return s&&Ve(l)?Yc(l):l}return Ve(c)?s?Yc(c):Fs(c):c}}class lm extends cm{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];const o=le(e)&&Sa(n);if(!this._isShallow){const u=On(i);if(!Ft(r)&&!On(r)&&(i=we(i),r=we(r)),!o&&$e(i)&&!$e(r))return u||(i.value=r),!0}const c=o?Number(n)<e.length:Se(e,n),l=Reflect.set(e,n,r,$e(e)?e:s);return e===we(s)&&(c?cr(r,i)&&Rn(e,"set",n,r):Rn(e,"add",n,r)),l}deleteProperty(e,n){const r=Se(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&Rn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!Un(n)||!am.has(n))&&vt(e,"has",n),r}ownKeys(e){return vt(e,"iterate",le(e)?"length":Br),Reflect.ownKeys(e)}}class qv extends cm{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Hv=new lm,Wv=new qv,Gv=new lm(!0);const Jc=t=>t,So=t=>Reflect.getPrototypeOf(t);function zv(t,e,n){return function(...r){const s=this.__v_raw,i=we(s),o=Es(i),c=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,u=s[t](...r),f=n?Jc:e?Ss:en;return!e&&vt(i,"iterate",l?Qc:Br),{next(){const{value:p,done:m}=u.next();return m?{value:p,done:m}:{value:c?[f(p[0]),f(p[1])]:f(p),done:m}},[Symbol.iterator](){return this}}}}function Co(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Kv(t,e){const n={get(s){const i=this.__v_raw,o=we(i),c=we(s);t||(cr(s,c)&&vt(o,"get",s),vt(o,"get",c));const{has:l}=So(o),u=e?Jc:t?Ss:en;if(l.call(o,s))return u(i.get(s));if(l.call(o,c))return u(i.get(c));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&vt(we(s),"iterate",Br),s.size},has(s){const i=this.__v_raw,o=we(i),c=we(s);return t||(cr(s,c)&&vt(o,"has",s),vt(o,"has",c)),s===c?i.has(s):i.has(s)||i.has(c)},forEach(s,i){const o=this,c=o.__v_raw,l=we(c),u=e?Jc:t?Ss:en;return!t&&vt(l,"iterate",Br),c.forEach((f,p)=>s.call(i,u(f),u(p),o))}};return st(n,t?{add:Co("add"),set:Co("set"),delete:Co("delete"),clear:Co("clear")}:{add(s){!e&&!Ft(s)&&!On(s)&&(s=we(s));const i=we(this);return So(i).has.call(i,s)||(i.add(s),Rn(i,"add",s,s)),this},set(s,i){!e&&!Ft(i)&&!On(i)&&(i=we(i));const o=we(this),{has:c,get:l}=So(o);let u=c.call(o,s);u||(s=we(s),u=c.call(o,s));const f=l.call(o,s);return o.set(s,i),u?cr(i,f)&&Rn(o,"set",s,i):Rn(o,"add",s,i),this},delete(s){const i=we(this),{has:o,get:c}=So(i);let l=o.call(i,s);l||(s=we(s),l=o.call(i,s)),c&&c.call(i,s);const u=i.delete(s);return l&&Rn(i,"delete",s,void 0),u},clear(){const s=we(this),i=s.size!==0,o=s.clear();return i&&Rn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=zv(s,t,e)}),n}function Kl(t,e){const n=Kv(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Se(n,s)&&s in r?n:r,s,i)}const Qv={get:Kl(!1,!1)},Jv={get:Kl(!1,!0)},Yv={get:Kl(!0,!1)};const um=new WeakMap,hm=new WeakMap,fm=new WeakMap,Xv=new WeakMap;function Zv(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function eE(t){return t.__v_skip||!Object.isExtensible(t)?0:Zv(bv(t))}function Fs(t){return On(t)?t:Ql(t,!1,Hv,Qv,um)}function dm(t){return Ql(t,!1,Gv,Jv,hm)}function Yc(t){return Ql(t,!0,Wv,Yv,fm)}function Ql(t,e,n,r,s){if(!Ve(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=eE(t);if(i===0)return t;const o=s.get(t);if(o)return o;const c=new Proxy(t,i===2?r:n);return s.set(t,c),c}function fn(t){return On(t)?fn(t.__v_raw):!!(t&&t.__v_isReactive)}function On(t){return!!(t&&t.__v_isReadonly)}function Ft(t){return!!(t&&t.__v_isShallow)}function Na(t){return t?!!t.__v_raw:!1}function we(t){const e=t&&t.__v_raw;return e?we(e):t}function Jl(t){return!Se(t,"__v_skip")&&Object.isExtensible(t)&&Gp(t,"__v_skip",!0),t}const en=t=>Ve(t)?Fs(t):t,Ss=t=>Ve(t)?Yc(t):t;function $e(t){return t?t.__v_isRef===!0:!1}function kt(t){return pm(t,!1)}function tE(t){return pm(t,!0)}function pm(t,e){return $e(t)?t:new nE(t,e)}class nE{constructor(e,n){this.dep=new zl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:we(e),this._value=n?e:en(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||Ft(e)||On(e);e=r?e:we(e),cr(e,n)&&(this._rawValue=e,this._value=r?e:en(e),this.dep.trigger())}}function De(t){return $e(t)?t.value:t}const rE={get:(t,e,n)=>e==="__v_raw"?t:De(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return $e(s)&&!$e(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function mm(t){return fn(t)?t:new Proxy(t,rE)}function sE(t){const e=le(t)?new Array(t.length):{};for(const n in t)e[n]=gm(t,n);return e}class iE{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0,this._raw=we(e);let s=!0,i=e;if(!le(e)||!Sa(String(n)))do s=!Na(i)||Ft(i);while(s&&(i=i.__v_raw));this._shallow=s}get value(){let e=this._object[this._key];return this._shallow&&(e=De(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&$e(this._raw[this._key])){const n=this._object[this._key];if($e(n)){n.value=e;return}}this._object[this._key]=e}get dep(){return Fv(this._raw,this._key)}}class oE{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function aE(t,e,n){return $e(t)?t:pe(t)?new oE(t):Ve(t)&&arguments.length>1?gm(t,e,n):kt(t)}function gm(t,e,n){return new iE(t,e,n)}class cE{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new zl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ki-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Me!==this)return tm(this,!0),!0}get value(){const e=this.dep.track();return sm(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function lE(t,e,n=!1){let r,s;return pe(t)?r=t:(r=t.get,s=t.set),new cE(r,s,n)}const Po={},Xo=new WeakMap;let Or;function uE(t,e=!1,n=Or){if(n){let r=Xo.get(n);r||Xo.set(n,r=[]),r.push(t)}}function hE(t,e,n=ke){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:c,call:l}=n,u=q=>s?q:Ft(q)||s===!1||s===0?Sn(q,1):Sn(q);let f,p,m,v,C=!1,x=!1;if($e(t)?(p=()=>t.value,C=Ft(t)):fn(t)?(p=()=>u(t),C=!0):le(t)?(x=!0,C=t.some(q=>fn(q)||Ft(q)),p=()=>t.map(q=>{if($e(q))return q.value;if(fn(q))return u(q);if(pe(q))return l?l(q,2):q()})):pe(t)?e?p=l?()=>l(t,2):t:p=()=>{if(m){kn();try{m()}finally{Dn()}}const q=Or;Or=f;try{return l?l(t,3,[v]):t(v)}finally{Or=q}}:p=hn,e&&s){const q=p,ee=s===!0?1/0:s;p=()=>Sn(q(),ee)}const k=Xp(),j=()=>{f.stop(),k&&k.active&&jl(k.effects,f)};if(i&&e){const q=e;e=(...ee)=>{q(...ee),j()}}let U=x?new Array(t.length).fill(Po):Po;const $=q=>{if(!(!(f.flags&1)||!f.dirty&&!q))if(e){const ee=f.run();if(s||C||(x?ee.some((oe,b)=>cr(oe,U[b])):cr(ee,U))){m&&m();const oe=Or;Or=f;try{const b=[ee,U===Po?void 0:x&&U[0]===Po?[]:U,v];U=ee,l?l(e,3,b):e(...b)}finally{Or=oe}}}else f.run()};return c&&c($),f=new Zp(p),f.scheduler=o?()=>o($,!1):$,v=q=>uE(q,!1,f),m=f.onStop=()=>{const q=Xo.get(f);if(q){if(l)l(q,4);else for(const ee of q)ee();Xo.delete(f)}},e?r?$(!0):U=f.run():o?o($.bind(null,!0),!0):f.run(),j.pause=f.pause.bind(f),j.resume=f.resume.bind(f),j.stop=j,j}function Sn(t,e=1/0,n){if(e<=0||!Ve(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,$e(t))Sn(t.value,e,n);else if(le(t))for(let r=0;r<t.length;r++)Sn(t[r],e,n);else if(jp(t)||Es(t))t.forEach(r=>{Sn(r,e,n)});else if(Hp(t)){for(const r in t)Sn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Sn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Xi(t,e,n,r){try{return r?t(...r):t()}catch(s){ka(s,e,n)}}function tn(t,e,n,r){if(pe(t)){const s=Xi(t,e,n,r);return s&&$p(s)&&s.catch(i=>{ka(i,e,n)}),s}if(le(t)){const s=[];for(let i=0;i<t.length;i++)s.push(tn(t[i],e,n,r));return s}}function ka(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ke;if(e){let c=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const f=c.ec;if(f){for(let p=0;p<f.length;p++)if(f[p](t,l,u)===!1)return}c=c.parent}if(i){kn(),Xi(i,null,10,[t,l,u]),Dn();return}}fE(t,n,s,r,o)}function fE(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const Ct=[];let cn=-1;const Is=[];let Zn=null,us=0;const _m=Promise.resolve();let Zo=null;function Yl(t){const e=Zo||_m;return t?e.then(this?t.bind(this):t):e}function dE(t){let e=cn+1,n=Ct.length;for(;e<n;){const r=e+n>>>1,s=Ct[r],i=Oi(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function Xl(t){if(!(t.flags&1)){const e=Oi(t),n=Ct[Ct.length-1];!n||!(t.flags&2)&&e>=Oi(n)?Ct.push(t):Ct.splice(dE(e),0,t),t.flags|=1,ym()}}function ym(){Zo||(Zo=_m.then(Em))}function pE(t){le(t)?Is.push(...t):Zn&&t.id===-1?Zn.splice(us+1,0,t):t.flags&1||(Is.push(t),t.flags|=1),ym()}function ef(t,e,n=cn+1){for(;n<Ct.length;n++){const r=Ct[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;Ct.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function vm(t){if(Is.length){const e=[...new Set(Is)].sort((n,r)=>Oi(n)-Oi(r));if(Is.length=0,Zn){Zn.push(...e);return}for(Zn=e,us=0;us<Zn.length;us++){const n=Zn[us];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Zn=null,us=0}}const Oi=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Em(t){try{for(cn=0;cn<Ct.length;cn++){const e=Ct[cn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Xi(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;cn<Ct.length;cn++){const e=Ct[cn];e&&(e.flags&=-2)}cn=-1,Ct.length=0,vm(),Zo=null,(Ct.length||Is.length)&&Em()}}let Tt=null,Im=null;function ea(t){const e=Tt;return Tt=t,Im=t&&t.type.__scopeId||null,e}function Cn(t,e=Tt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&ra(-1);const i=ea(e);let o;try{o=t(...s)}finally{ea(i),r._d&&ra(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function tf(t,e){if(Tt===null)return t;const n=Ma(Tt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,c,l=ke]=e[s];i&&(pe(i)&&(i={mounted:i,updated:i}),i.deep&&Sn(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:c,modifiers:l}))}return t}function Nr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const c=s[o];i&&(c.oldValue=i[o].value);let l=c.dir[r];l&&(kn(),tn(l,n,8,[t.el,c,t,e]),Dn())}}const mE=Symbol("_vte"),gE=t=>t.__isTeleport,Vr=Symbol("_leaveCb"),xo=Symbol("_enterCb");function _E(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Zl(()=>{t.isMounted=!0}),Sm(()=>{t.isUnmounting=!0}),t}const $t=[Function,Array],yE={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:$t,onEnter:$t,onAfterEnter:$t,onEnterCancelled:$t,onBeforeLeave:$t,onLeave:$t,onAfterLeave:$t,onLeaveCancelled:$t,onBeforeAppear:$t,onAppear:$t,onAfterAppear:$t,onAppearCancelled:$t};function vE(t,e){const{leavingVNodes:n}=t;let r=n.get(e.type);return r||(r=Object.create(null),n.set(e.type,r)),r}function Xc(t,e,n,r,s){const{appear:i,mode:o,persisted:c=!1,onBeforeEnter:l,onEnter:u,onAfterEnter:f,onEnterCancelled:p,onBeforeLeave:m,onLeave:v,onAfterLeave:C,onLeaveCancelled:x,onBeforeAppear:k,onAppear:j,onAfterAppear:U,onAppearCancelled:$}=e,q=String(t.key),ee=vE(n,t),oe=(_,T)=>{_&&tn(_,r,9,T)},b=(_,T)=>{const R=T[1];oe(_,T),le(_)?_.every(w=>w.length<=1)&&R():_.length<=1&&R()},y={mode:o,persisted:c,beforeEnter(_){let T=l;if(!n.isMounted)if(i)T=k||l;else return;_[Vr]&&_[Vr](!0);const R=ee[q];R&&hs(t,R)&&R.el[Vr]&&R.el[Vr](),oe(T,[_])},enter(_){let T=u,R=f,w=p;if(!n.isMounted)if(i)T=j||u,R=U||f,w=$||p;else return;let E=!1;const be=_[xo]=Ke=>{E||(E=!0,Ke?oe(w,[_]):oe(R,[_]),y.delayedLeave&&y.delayedLeave(),_[xo]=void 0)};T?b(T,[_,be]):be()},leave(_,T){const R=String(t.key);if(_[xo]&&_[xo](!0),n.isUnmounting)return T();oe(m,[_]);let w=!1;const E=_[Vr]=be=>{w||(w=!0,T(),be?oe(x,[_]):oe(C,[_]),_[Vr]=void 0,ee[R]===t&&delete ee[R])};ee[R]=t,v?b(v,[_,E]):E()},clone(_){return Xc(_,e,n,r)}};return y}function Vi(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Vi(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Tm(t,e=!1,n){let r=[],s=0;for(let i=0;i<t.length;i++){let o=t[i];const c=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===Et?(o.patchFlag&128&&s++,r=r.concat(Tm(o.children,e,c))):(e||o.type!==vn)&&r.push(c!=null?Wr(o,{key:c}):o)}if(s>1)for(let i=0;i<r.length;i++)r[i].patchFlag=-2;return r}function Gt(t,e){return pe(t)?st({name:t.name},e,{setup:t}):t}function wm(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const ta=new WeakMap;function Ei(t,e,n,r,s=!1){if(le(t)){t.forEach((C,x)=>Ei(C,e&&(le(e)?e[x]:e),n,r,s));return}if(Ts(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Ei(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?Ma(r.component):r.el,o=s?null:i,{i:c,r:l}=t,u=e&&e.r,f=c.refs===ke?c.refs={}:c.refs,p=c.setupState,m=we(p),v=p===ke?Bp:C=>Se(m,C);if(u!=null&&u!==l){if(nf(e),Je(u))f[u]=null,v(u)&&(p[u]=null);else if($e(u)){u.value=null;const C=e;C.k&&(f[C.k]=null)}}if(pe(l))Xi(l,c,12,[o,f]);else{const C=Je(l),x=$e(l);if(C||x){const k=()=>{if(t.f){const j=C?v(l)?p[l]:f[l]:l.value;if(s)le(j)&&jl(j,i);else if(le(j))j.includes(i)||j.push(i);else if(C)f[l]=[i],v(l)&&(p[l]=f[l]);else{const U=[i];l.value=U,t.k&&(f[t.k]=U)}}else C?(f[l]=o,v(l)&&(p[l]=o)):x&&(l.value=o,t.k&&(f[t.k]=o))};if(o){const j=()=>{k(),ta.delete(t)};j.id=-1,ta.set(t,j),Mt(j,n)}else nf(t),k()}}}function nf(t){const e=ta.get(t);e&&(e.flags|=8,ta.delete(t))}Pa().requestIdleCallback;Pa().cancelIdleCallback;const Ts=t=>!!t.type.__asyncLoader,Am=t=>t.type.__isKeepAlive;function EE(t,e){bm(t,"a",e)}function IE(t,e){bm(t,"da",e)}function bm(t,e,n=Pt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(Da(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Am(s.parent.vnode)&&TE(r,e,n,s),s=s.parent}}function TE(t,e,n,r){const s=Da(e,t,r,!0);eu(()=>{jl(r[e],s)},n)}function Da(t,e,n=Pt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{kn();const c=Zi(n),l=tn(e,n,t,o);return c(),Dn(),l});return r?s.unshift(i):s.push(i),i}}const Bn=t=>(e,n=Pt)=>{(!Fi||t==="sp")&&Da(t,(...r)=>e(...r),n)},wE=Bn("bm"),Zl=Bn("m"),AE=Bn("bu"),Rm=Bn("u"),Sm=Bn("bum"),eu=Bn("um"),bE=Bn("sp"),RE=Bn("rtg"),SE=Bn("rtc");function CE(t,e=Pt){Da("ec",t,e)}const PE=Symbol.for("v-ndc");function Cm(t,e,n,r){let s;const i=n,o=le(t);if(o||Je(t)){const c=o&&fn(t);let l=!1,u=!1;c&&(l=!Ft(t),u=On(t),t=xa(t)),s=new Array(t.length);for(let f=0,p=t.length;f<p;f++)s[f]=e(l?u?Ss(en(t[f])):en(t[f]):t[f],f,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let c=0;c<t;c++)s[c]=e(c+1,c,void 0,i)}else if(Ve(t))if(t[Symbol.iterator])s=Array.from(t,(c,l)=>e(c,l,void 0,i));else{const c=Object.keys(t);s=new Array(c.length);for(let l=0,u=c.length;l<u;l++){const f=c[l];s[l]=e(t[f],f,l,i)}}else s=[];return s}function xE(t,e,n={},r,s){if(Tt.ce||Tt.parent&&Ts(Tt.parent)&&Tt.parent.ce){const u=Object.keys(n).length>0;return Oe(),Hr(Et,null,[xe("slot",n,r&&r())],u?-2:64)}let i=t[e];i&&i._c&&(i._d=!1),Oe();const o=i&&Pm(i(n)),c=n.key||o&&o.key,l=Hr(Et,{key:(c&&!Un(c)?c:`_${e}`)+(!o&&r?"_fb":"")},o||(r?r():[]),o&&t._===1?64:-2);return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),i&&i._c&&(i._d=!0),l}function Pm(t){return t.some(e=>Li(e)?!(e.type===vn||e.type===Et&&!Pm(e.children)):!0)?t:null}const Zc=t=>t?Qm(t)?Ma(t):Zc(t.parent):null,Ii=st(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Zc(t.parent),$root:t=>Zc(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Nm(t),$forceUpdate:t=>t.f||(t.f=()=>{Xl(t.update)}),$nextTick:t=>t.n||(t.n=Yl.bind(t.proxy)),$watch:t=>$E.bind(t)}),wc=(t,e)=>t!==ke&&!t.__isScriptSetup&&Se(t,e),NE={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:c,appContext:l}=t;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(wc(r,e))return o[e]=1,r[e];if(s!==ke&&Se(s,e))return o[e]=2,s[e];if(Se(i,e))return o[e]=3,i[e];if(n!==ke&&Se(n,e))return o[e]=4,n[e];el&&(o[e]=0)}}const u=Ii[e];let f,p;if(u)return e==="$attrs"&&vt(t.attrs,"get",""),u(t);if((f=c.__cssModules)&&(f=f[e]))return f;if(n!==ke&&Se(n,e))return o[e]=4,n[e];if(p=l.config.globalProperties,Se(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return wc(s,e)?(s[e]=n,!0):r!==ke&&Se(r,e)?(r[e]=n,!0):Se(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,props:i,type:o}},c){let l;return!!(n[c]||t!==ke&&c[0]!=="$"&&Se(t,c)||wc(e,c)||Se(i,c)||Se(r,c)||Se(Ii,c)||Se(s.config.globalProperties,c)||(l=o.__cssModules)&&l[c])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Se(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function rf(t){return le(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let el=!0;function kE(t){const e=Nm(t),n=t.proxy,r=t.ctx;el=!1,e.beforeCreate&&sf(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:v,updated:C,activated:x,deactivated:k,beforeDestroy:j,beforeUnmount:U,destroyed:$,unmounted:q,render:ee,renderTracked:oe,renderTriggered:b,errorCaptured:y,serverPrefetch:_,expose:T,inheritAttrs:R,components:w,directives:E,filters:be}=e;if(u&&DE(u,r,null),o)for(const he in o){const ye=o[he];pe(ye)&&(r[he]=ye.bind(n))}if(s){const he=s.call(n,n);Ve(he)&&(t.data=Fs(he))}if(el=!0,i)for(const he in i){const ye=i[he],Dt=pe(ye)?ye.bind(n,n):pe(ye.get)?ye.get.bind(n,n):hn,zt=!pe(ye)&&pe(ye.set)?ye.set.bind(n):hn,Ut=je({get:Dt,set:zt});Object.defineProperty(r,he,{enumerable:!0,configurable:!0,get:()=>Ut.value,set:qe=>Ut.value=qe})}if(c)for(const he in c)xm(c[he],r,n,he);if(l){const he=pe(l)?l.call(n):l;Reflect.ownKeys(he).forEach(ye=>{Fo(ye,he[ye])})}f&&sf(f,t,"c");function Pe(he,ye){le(ye)?ye.forEach(Dt=>he(Dt.bind(n))):ye&&he(ye.bind(n))}if(Pe(wE,p),Pe(Zl,m),Pe(AE,v),Pe(Rm,C),Pe(EE,x),Pe(IE,k),Pe(CE,y),Pe(SE,oe),Pe(RE,b),Pe(Sm,U),Pe(eu,q),Pe(bE,_),le(T))if(T.length){const he=t.exposed||(t.exposed={});T.forEach(ye=>{Object.defineProperty(he,ye,{get:()=>n[ye],set:Dt=>n[ye]=Dt,enumerable:!0})})}else t.exposed||(t.exposed={});ee&&t.render===hn&&(t.render=ee),R!=null&&(t.inheritAttrs=R),w&&(t.components=w),E&&(t.directives=E),_&&wm(t)}function DE(t,e,n=hn){le(t)&&(t=tl(t));for(const r in t){const s=t[r];let i;Ve(s)?"default"in s?i=Wt(s.from||r,s.default,!0):i=Wt(s.from||r):i=Wt(s),$e(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function sf(t,e,n){tn(le(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function xm(t,e,n,r){let s=r.includes(".")?Om(n,r):()=>n[r];if(Je(t)){const i=e[t];pe(i)&&Ti(s,i)}else if(pe(t))Ti(s,t.bind(n));else if(Ve(t))if(le(t))t.forEach(i=>xm(i,e,n,r));else{const i=pe(t.handler)?t.handler.bind(n):e[t.handler];pe(i)&&Ti(s,i,t)}}function Nm(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,c=i.get(e);let l;return c?l=c:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(u=>na(l,u,o,!0)),na(l,e,o)),Ve(e)&&i.set(e,l),l}function na(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&na(t,i,n,!0),s&&s.forEach(o=>na(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const c=OE[o]||n&&n[o];t[o]=c?c(t[o],e[o]):e[o]}return t}const OE={data:of,props:af,emits:af,methods:ui,computed:ui,beforeCreate:Rt,created:Rt,beforeMount:Rt,mounted:Rt,beforeUpdate:Rt,updated:Rt,beforeDestroy:Rt,beforeUnmount:Rt,destroyed:Rt,unmounted:Rt,activated:Rt,deactivated:Rt,errorCaptured:Rt,serverPrefetch:Rt,components:ui,directives:ui,watch:ME,provide:of,inject:VE};function of(t,e){return e?t?function(){return st(pe(t)?t.call(this,this):t,pe(e)?e.call(this,this):e)}:e:t}function VE(t,e){return ui(tl(t),tl(e))}function tl(t){if(le(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Rt(t,e){return t?[...new Set([].concat(t,e))]:e}function ui(t,e){return t?st(Object.create(null),t,e):e}function af(t,e){return t?le(t)&&le(e)?[...new Set([...t,...e])]:st(Object.create(null),rf(t),rf(e??{})):e}function ME(t,e){if(!t)return e;if(!e)return t;const n=st(Object.create(null),t);for(const r in e)n[r]=Rt(t[r],e[r]);return n}function km(){return{app:null,config:{isNativeTag:Bp,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let LE=0;function FE(t,e){return function(r,s=null){pe(r)||(r=st({},r)),s!=null&&!Ve(s)&&(s=null);const i=km(),o=new WeakSet,c=[];let l=!1;const u=i.app={_uid:LE++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:vI,get config(){return i.config},set config(f){},use(f,...p){return o.has(f)||(f&&pe(f.install)?(o.add(f),f.install(u,...p)):pe(f)&&(o.add(f),f(u,...p))),u},mixin(f){return i.mixins.includes(f)||i.mixins.push(f),u},component(f,p){return p?(i.components[f]=p,u):i.components[f]},directive(f,p){return p?(i.directives[f]=p,u):i.directives[f]},mount(f,p,m){if(!l){const v=u._ceVNode||xe(r,s);return v.appContext=i,m===!0?m="svg":m===!1&&(m=void 0),t(v,f,m),l=!0,u._container=f,f.__vue_app__=u,Ma(v.component)}},onUnmount(f){c.push(f)},unmount(){l&&(tn(c,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(f,p){return i.provides[f]=p,u},runWithContext(f){const p=jr;jr=u;try{return f()}finally{jr=p}}};return u}}let jr=null;function Fo(t,e){if(Pt){let n=Pt.provides;const r=Pt.parent&&Pt.parent.provides;r===n&&(n=Pt.provides=Object.create(r)),n[t]=e}}function Wt(t,e,n=!1){const r=su();if(r||jr){let s=jr?jr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&pe(e)?e.call(r&&r.proxy):e}}function UE(){return!!(su()||jr)}const BE=Symbol.for("v-scx"),jE=()=>Wt(BE);function Ti(t,e,n){return Dm(t,e,n)}function Dm(t,e,n=ke){const{immediate:r,deep:s,flush:i,once:o}=n,c=st({},n),l=e&&r||!e&&i!=="post";let u;if(Fi){if(i==="sync"){const v=jE();u=v.__watcherHandles||(v.__watcherHandles=[])}else if(!l){const v=()=>{};return v.stop=hn,v.resume=hn,v.pause=hn,v}}const f=Pt;c.call=(v,C,x)=>tn(v,f,C,x);let p=!1;i==="post"?c.scheduler=v=>{Mt(v,f&&f.suspense)}:i!=="sync"&&(p=!0,c.scheduler=(v,C)=>{C?v():Xl(v)}),c.augmentJob=v=>{e&&(v.flags|=4),p&&(v.flags|=2,f&&(v.id=f.uid,v.i=f))};const m=hE(t,e,c);return Fi&&(u?u.push(m):l&&m()),m}function $E(t,e,n){const r=this.proxy,s=Je(t)?t.includes(".")?Om(r,t):()=>r[t]:t.bind(r,r);let i;pe(e)?i=e:(i=e.handler,n=e);const o=Zi(this),c=Dm(s,i.bind(r),n);return o(),c}function Om(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const qE=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${_r(e)}Modifiers`]||t[`${Yr(e)}Modifiers`];function HE(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||ke;let s=n;const i=e.startsWith("update:"),o=i&&qE(r,e.slice(7));o&&(o.trim&&(s=n.map(f=>Je(f)?f.trim():f)),o.number&&(s=n.map($l)));let c,l=r[c=yc(e)]||r[c=yc(_r(e))];!l&&i&&(l=r[c=yc(Yr(e))]),l&&tn(l,t,6,s);const u=r[c+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,tn(u,t,6,s)}}const WE=new WeakMap;function Vm(t,e,n=!1){const r=n?WE:e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},c=!1;if(!pe(t)){const l=u=>{const f=Vm(u,e,!0);f&&(c=!0,st(o,f))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!c?(Ve(t)&&r.set(t,null),null):(le(i)?i.forEach(l=>o[l]=null):st(o,i),Ve(t)&&r.set(t,o),o)}function Oa(t,e){return!t||!ba(e)?!1:(e=e.slice(2).replace(/Once$/,""),Se(t,e[0].toLowerCase()+e.slice(1))||Se(t,Yr(e))||Se(t,e))}function cf(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:c,emit:l,render:u,renderCache:f,props:p,data:m,setupState:v,ctx:C,inheritAttrs:x}=t,k=ea(t);let j,U;try{if(n.shapeFlag&4){const q=s||r,ee=q;j=un(u.call(ee,q,f,p,v,m,C)),U=c}else{const q=e;j=un(q.length>1?q(p,{attrs:c,slots:o,emit:l}):q(p,null)),U=e.props?c:GE(c)}}catch(q){wi.length=0,ka(q,t,1),j=xe(vn)}let $=j;if(U&&x!==!1){const q=Object.keys(U),{shapeFlag:ee}=$;q.length&&ee&7&&(i&&q.some(Bl)&&(U=zE(U,i)),$=Wr($,U,!1,!0))}return n.dirs&&($=Wr($,null,!1,!0),$.dirs=$.dirs?$.dirs.concat(n.dirs):n.dirs),n.transition&&Vi($,n.transition),j=$,ea(k),j}const GE=t=>{let e;for(const n in t)(n==="class"||n==="style"||ba(n))&&((e||(e={}))[n]=t[n]);return e},zE=(t,e)=>{const n={};for(const r in t)(!Bl(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function KE(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:c,patchFlag:l}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?lf(r,o,u):!!o;if(l&8){const f=e.dynamicProps;for(let p=0;p<f.length;p++){const m=f[p];if(o[m]!==r[m]&&!Oa(u,m))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===o?!1:r?o?lf(r,o,u):!0:!!o;return!1}function lf(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!Oa(n,i))return!0}return!1}function QE({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const Mm={},Lm=()=>Object.create(Mm),Fm=t=>Object.getPrototypeOf(t)===Mm;function JE(t,e,n,r=!1){const s={},i=Lm();t.propsDefaults=Object.create(null),Um(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:dm(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function YE(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,c=we(s),[l]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const f=t.vnode.dynamicProps;for(let p=0;p<f.length;p++){let m=f[p];if(Oa(t.emitsOptions,m))continue;const v=e[m];if(l)if(Se(i,m))v!==i[m]&&(i[m]=v,u=!0);else{const C=_r(m);s[C]=nl(l,c,C,v,t,!1)}else v!==i[m]&&(i[m]=v,u=!0)}}}else{Um(t,e,s,i)&&(u=!0);let f;for(const p in c)(!e||!Se(e,p)&&((f=Yr(p))===p||!Se(e,f)))&&(l?n&&(n[p]!==void 0||n[f]!==void 0)&&(s[p]=nl(l,c,p,void 0,t,!0)):delete s[p]);if(i!==c)for(const p in i)(!e||!Se(e,p))&&(delete i[p],u=!0)}u&&Rn(t.attrs,"set","")}function Um(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,c;if(e)for(let l in e){if(_i(l))continue;const u=e[l];let f;s&&Se(s,f=_r(l))?!i||!i.includes(f)?n[f]=u:(c||(c={}))[f]=u:Oa(t.emitsOptions,l)||(!(l in r)||u!==r[l])&&(r[l]=u,o=!0)}if(i){const l=we(n),u=c||ke;for(let f=0;f<i.length;f++){const p=i[f];n[p]=nl(s,l,p,u[p],t,!Se(u,p))}}return o}function nl(t,e,n,r,s,i){const o=t[n];if(o!=null){const c=Se(o,"default");if(c&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&pe(l)){const{propsDefaults:u}=s;if(n in u)r=u[n];else{const f=Zi(s);r=u[n]=l.call(null,e),f()}}else r=l;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!c?r=!1:o[1]&&(r===""||r===Yr(n))&&(r=!0))}return r}const XE=new WeakMap;function Bm(t,e,n=!1){const r=n?XE:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},c=[];let l=!1;if(!pe(t)){const f=p=>{l=!0;const[m,v]=Bm(p,e,!0);st(o,m),v&&c.push(...v)};!n&&e.mixins.length&&e.mixins.forEach(f),t.extends&&f(t.extends),t.mixins&&t.mixins.forEach(f)}if(!i&&!l)return Ve(t)&&r.set(t,vs),vs;if(le(i))for(let f=0;f<i.length;f++){const p=_r(i[f]);uf(p)&&(o[p]=ke)}else if(i)for(const f in i){const p=_r(f);if(uf(p)){const m=i[f],v=o[p]=le(m)||pe(m)?{type:m}:st({},m),C=v.type;let x=!1,k=!0;if(le(C))for(let j=0;j<C.length;++j){const U=C[j],$=pe(U)&&U.name;if($==="Boolean"){x=!0;break}else $==="String"&&(k=!1)}else x=pe(C)&&C.name==="Boolean";v[0]=x,v[1]=k,(x||Se(v,"default"))&&c.push(p)}}const u=[o,c];return Ve(t)&&r.set(t,u),u}function uf(t){return t[0]!=="$"&&!_i(t)}const tu=t=>t==="_"||t==="_ctx"||t==="$stable",nu=t=>le(t)?t.map(un):[un(t)],ZE=(t,e,n)=>{if(e._n)return e;const r=Cn((...s)=>nu(e(...s)),n);return r._c=!1,r},jm=(t,e,n)=>{const r=t._ctx;for(const s in t){if(tu(s))continue;const i=t[s];if(pe(i))e[s]=ZE(s,i,r);else if(i!=null){const o=nu(i);e[s]=()=>o}}},$m=(t,e)=>{const n=nu(e);t.slots.default=()=>n},qm=(t,e,n)=>{for(const r in e)(n||!tu(r))&&(t[r]=e[r])},eI=(t,e,n)=>{const r=t.slots=Lm();if(t.vnode.shapeFlag&32){const s=e._;s?(qm(r,e,n),n&&Gp(r,"_",s,!0)):jm(e,r)}else e&&$m(t,e)},tI=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=ke;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:qm(s,e,n):(i=!e.$stable,jm(e,s)),o=e}else e&&($m(t,e),o={default:1});if(i)for(const c in s)!tu(c)&&o[c]==null&&delete s[c]},Mt=oI;function nI(t){return rI(t)}function rI(t,e){const n=Pa();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:c,createComment:l,setText:u,setElementText:f,parentNode:p,nextSibling:m,setScopeId:v=hn,insertStaticContent:C}=t,x=(I,A,S,O=null,F=null,V=null,z=void 0,W=null,H=!!A.dynamicChildren)=>{if(I===A)return;I&&!hs(I,A)&&(O=D(I),qe(I,F,V,!0),I=null),A.patchFlag===-2&&(H=!1,A.dynamicChildren=null);const{type:B,ref:se,shapeFlag:Q}=A;switch(B){case Va:k(I,A,S,O);break;case vn:j(I,A,S,O);break;case bc:I==null&&U(A,S,O,z);break;case Et:w(I,A,S,O,F,V,z,W,H);break;default:Q&1?ee(I,A,S,O,F,V,z,W,H):Q&6?E(I,A,S,O,F,V,z,W,H):(Q&64||Q&128)&&B.process(I,A,S,O,F,V,z,W,H,te)}se!=null&&F?Ei(se,I&&I.ref,V,A||I,!A):se==null&&I&&I.ref!=null&&Ei(I.ref,null,V,I,!0)},k=(I,A,S,O)=>{if(I==null)r(A.el=c(A.children),S,O);else{const F=A.el=I.el;A.children!==I.children&&u(F,A.children)}},j=(I,A,S,O)=>{I==null?r(A.el=l(A.children||""),S,O):A.el=I.el},U=(I,A,S,O)=>{[I.el,I.anchor]=C(I.children,A,S,O,I.el,I.anchor)},$=({el:I,anchor:A},S,O)=>{let F;for(;I&&I!==A;)F=m(I),r(I,S,O),I=F;r(A,S,O)},q=({el:I,anchor:A})=>{let S;for(;I&&I!==A;)S=m(I),s(I),I=S;s(A)},ee=(I,A,S,O,F,V,z,W,H)=>{if(A.type==="svg"?z="svg":A.type==="math"&&(z="mathml"),I==null)oe(A,S,O,F,V,z,W,H);else{const B=I.el&&I.el._isVueCE?I.el:null;try{B&&B._beginPatch(),_(I,A,F,V,z,W,H)}finally{B&&B._endPatch()}}},oe=(I,A,S,O,F,V,z,W)=>{let H,B;const{props:se,shapeFlag:Q,transition:ne,dirs:ue}=I;if(H=I.el=o(I.type,V,se&&se.is,se),Q&8?f(H,I.children):Q&16&&y(I.children,H,null,O,F,Ac(I,V),z,W),ue&&Nr(I,null,O,"created"),b(H,I,I.scopeId,z,O),se){for(const me in se)me!=="value"&&!_i(me)&&i(H,me,null,se[me],V,O);"value"in se&&i(H,"value",null,se.value,V),(B=se.onVnodeBeforeMount)&&on(B,O,I)}ue&&Nr(I,null,O,"beforeMount");const ie=sI(F,ne);ie&&ne.beforeEnter(H),r(H,A,S),((B=se&&se.onVnodeMounted)||ie||ue)&&Mt(()=>{B&&on(B,O,I),ie&&ne.enter(H),ue&&Nr(I,null,O,"mounted")},F)},b=(I,A,S,O,F)=>{if(S&&v(I,S),O)for(let V=0;V<O.length;V++)v(I,O[V]);if(F){let V=F.subTree;if(A===V||Gm(V.type)&&(V.ssContent===A||V.ssFallback===A)){const z=F.vnode;b(I,z,z.scopeId,z.slotScopeIds,F.parent)}}},y=(I,A,S,O,F,V,z,W,H=0)=>{for(let B=H;B<I.length;B++){const se=I[B]=W?er(I[B]):un(I[B]);x(null,se,A,S,O,F,V,z,W)}},_=(I,A,S,O,F,V,z)=>{const W=A.el=I.el;let{patchFlag:H,dynamicChildren:B,dirs:se}=A;H|=I.patchFlag&16;const Q=I.props||ke,ne=A.props||ke;let ue;if(S&&kr(S,!1),(ue=ne.onVnodeBeforeUpdate)&&on(ue,S,A,I),se&&Nr(A,I,S,"beforeUpdate"),S&&kr(S,!0),(Q.innerHTML&&ne.innerHTML==null||Q.textContent&&ne.textContent==null)&&f(W,""),B?T(I.dynamicChildren,B,W,S,O,Ac(A,F),V):z||ye(I,A,W,null,S,O,Ac(A,F),V,!1),H>0){if(H&16)R(W,Q,ne,S,F);else if(H&2&&Q.class!==ne.class&&i(W,"class",null,ne.class,F),H&4&&i(W,"style",Q.style,ne.style,F),H&8){const ie=A.dynamicProps;for(let me=0;me<ie.length;me++){const Ie=ie[me],ot=Q[Ie],at=ne[Ie];(at!==ot||Ie==="value")&&i(W,Ie,ot,at,F,S)}}H&1&&I.children!==A.children&&f(W,A.children)}else!z&&B==null&&R(W,Q,ne,S,F);((ue=ne.onVnodeUpdated)||se)&&Mt(()=>{ue&&on(ue,S,A,I),se&&Nr(A,I,S,"updated")},O)},T=(I,A,S,O,F,V,z)=>{for(let W=0;W<A.length;W++){const H=I[W],B=A[W],se=H.el&&(H.type===Et||!hs(H,B)||H.shapeFlag&198)?p(H.el):S;x(H,B,se,null,O,F,V,z,!0)}},R=(I,A,S,O,F)=>{if(A!==S){if(A!==ke)for(const V in A)!_i(V)&&!(V in S)&&i(I,V,A[V],null,F,O);for(const V in S){if(_i(V))continue;const z=S[V],W=A[V];z!==W&&V!=="value"&&i(I,V,W,z,F,O)}"value"in S&&i(I,"value",A.value,S.value,F)}},w=(I,A,S,O,F,V,z,W,H)=>{const B=A.el=I?I.el:c(""),se=A.anchor=I?I.anchor:c("");let{patchFlag:Q,dynamicChildren:ne,slotScopeIds:ue}=A;ue&&(W=W?W.concat(ue):ue),I==null?(r(B,S,O),r(se,S,O),y(A.children||[],S,se,F,V,z,W,H)):Q>0&&Q&64&&ne&&I.dynamicChildren?(T(I.dynamicChildren,ne,S,F,V,z,W),(A.key!=null||F&&A===F.subTree)&&Hm(I,A,!0)):ye(I,A,S,se,F,V,z,W,H)},E=(I,A,S,O,F,V,z,W,H)=>{A.slotScopeIds=W,I==null?A.shapeFlag&512?F.ctx.activate(A,S,O,z,H):be(A,S,O,F,V,z,H):Ke(I,A,H)},be=(I,A,S,O,F,V,z)=>{const W=I.component=dI(I,O,F);if(Am(I)&&(W.ctx.renderer=te),pI(W,!1,z),W.asyncDep){if(F&&F.registerDep(W,Pe,z),!I.el){const H=W.subTree=xe(vn);j(null,H,A,S),I.placeholder=H.el}}else Pe(W,I,A,S,F,V,z)},Ke=(I,A,S)=>{const O=A.component=I.component;if(KE(I,A,S))if(O.asyncDep&&!O.asyncResolved){he(O,A,S);return}else O.next=A,O.update();else A.el=I.el,O.vnode=A},Pe=(I,A,S,O,F,V,z)=>{const W=()=>{if(I.isMounted){let{next:Q,bu:ne,u:ue,parent:ie,vnode:me}=I;{const dt=Wm(I);if(dt){Q&&(Q.el=me.el,he(I,Q,z)),dt.asyncDep.then(()=>{I.isUnmounted||W()});return}}let Ie=Q,ot;kr(I,!1),Q?(Q.el=me.el,he(I,Q,z)):Q=me,ne&&Lo(ne),(ot=Q.props&&Q.props.onVnodeBeforeUpdate)&&on(ot,ie,Q,me),kr(I,!0);const at=cf(I),Bt=I.subTree;I.subTree=at,x(Bt,at,p(Bt.el),D(Bt),I,F,V),Q.el=at.el,Ie===null&&QE(I,at.el),ue&&Mt(ue,F),(ot=Q.props&&Q.props.onVnodeUpdated)&&Mt(()=>on(ot,ie,Q,me),F)}else{let Q;const{el:ne,props:ue}=A,{bm:ie,m:me,parent:Ie,root:ot,type:at}=I,Bt=Ts(A);kr(I,!1),ie&&Lo(ie),!Bt&&(Q=ue&&ue.onVnodeBeforeMount)&&on(Q,Ie,A),kr(I,!0);{ot.ce&&ot.ce._def.shadowRoot!==!1&&ot.ce._injectChildStyle(at);const dt=I.subTree=cf(I);x(null,dt,S,O,I,F,V),A.el=dt.el}if(me&&Mt(me,F),!Bt&&(Q=ue&&ue.onVnodeMounted)){const dt=A;Mt(()=>on(Q,Ie,dt),F)}(A.shapeFlag&256||Ie&&Ts(Ie.vnode)&&Ie.vnode.shapeFlag&256)&&I.a&&Mt(I.a,F),I.isMounted=!0,A=S=O=null}};I.scope.on();const H=I.effect=new Zp(W);I.scope.off();const B=I.update=H.run.bind(H),se=I.job=H.runIfDirty.bind(H);se.i=I,se.id=I.uid,H.scheduler=()=>Xl(se),kr(I,!0),B()},he=(I,A,S)=>{A.component=I;const O=I.vnode.props;I.vnode=A,I.next=null,YE(I,A.props,O,S),tI(I,A.children,S),kn(),ef(I),Dn()},ye=(I,A,S,O,F,V,z,W,H=!1)=>{const B=I&&I.children,se=I?I.shapeFlag:0,Q=A.children,{patchFlag:ne,shapeFlag:ue}=A;if(ne>0){if(ne&128){zt(B,Q,S,O,F,V,z,W,H);return}else if(ne&256){Dt(B,Q,S,O,F,V,z,W,H);return}}ue&8?(se&16&&xt(B,F,V),Q!==B&&f(S,Q)):se&16?ue&16?zt(B,Q,S,O,F,V,z,W,H):xt(B,F,V,!0):(se&8&&f(S,""),ue&16&&y(Q,S,O,F,V,z,W,H))},Dt=(I,A,S,O,F,V,z,W,H)=>{I=I||vs,A=A||vs;const B=I.length,se=A.length,Q=Math.min(B,se);let ne;for(ne=0;ne<Q;ne++){const ue=A[ne]=H?er(A[ne]):un(A[ne]);x(I[ne],ue,S,null,F,V,z,W,H)}B>se?xt(I,F,V,!0,!1,Q):y(A,S,O,F,V,z,W,H,Q)},zt=(I,A,S,O,F,V,z,W,H)=>{let B=0;const se=A.length;let Q=I.length-1,ne=se-1;for(;B<=Q&&B<=ne;){const ue=I[B],ie=A[B]=H?er(A[B]):un(A[B]);if(hs(ue,ie))x(ue,ie,S,null,F,V,z,W,H);else break;B++}for(;B<=Q&&B<=ne;){const ue=I[Q],ie=A[ne]=H?er(A[ne]):un(A[ne]);if(hs(ue,ie))x(ue,ie,S,null,F,V,z,W,H);else break;Q--,ne--}if(B>Q){if(B<=ne){const ue=ne+1,ie=ue<se?A[ue].el:O;for(;B<=ne;)x(null,A[B]=H?er(A[B]):un(A[B]),S,ie,F,V,z,W,H),B++}}else if(B>ne)for(;B<=Q;)qe(I[B],F,V,!0),B++;else{const ue=B,ie=B,me=new Map;for(B=ie;B<=ne;B++){const ct=A[B]=H?er(A[B]):un(A[B]);ct.key!=null&&me.set(ct.key,B)}let Ie,ot=0;const at=ne-ie+1;let Bt=!1,dt=0;const qn=new Array(at);for(B=0;B<at;B++)qn[B]=0;for(B=ue;B<=Q;B++){const ct=I[B];if(ot>=at){qe(ct,F,V,!0);continue}let jt;if(ct.key!=null)jt=me.get(ct.key);else for(Ie=ie;Ie<=ne;Ie++)if(qn[Ie-ie]===0&&hs(ct,A[Ie])){jt=Ie;break}jt===void 0?qe(ct,F,V,!0):(qn[jt-ie]=B+1,jt>=dt?dt=jt:Bt=!0,x(ct,A[jt],S,null,F,V,z,W,H),ot++)}const Ks=Bt?iI(qn):vs;for(Ie=Ks.length-1,B=at-1;B>=0;B--){const ct=ie+B,jt=A[ct],uo=A[ct+1],rs=ct+1<se?uo.el||uo.placeholder:O;qn[B]===0?x(null,jt,S,rs,F,V,z,W,H):Bt&&(Ie<0||B!==Ks[Ie]?Ut(jt,S,rs,2):Ie--)}}},Ut=(I,A,S,O,F=null)=>{const{el:V,type:z,transition:W,children:H,shapeFlag:B}=I;if(B&6){Ut(I.component.subTree,A,S,O);return}if(B&128){I.suspense.move(A,S,O);return}if(B&64){z.move(I,A,S,te);return}if(z===Et){r(V,A,S);for(let Q=0;Q<H.length;Q++)Ut(H[Q],A,S,O);r(I.anchor,A,S);return}if(z===bc){$(I,A,S);return}if(O!==2&&B&1&&W)if(O===0)W.beforeEnter(V),r(V,A,S),Mt(()=>W.enter(V),F);else{const{leave:Q,delayLeave:ne,afterLeave:ue}=W,ie=()=>{I.ctx.isUnmounted?s(V):r(V,A,S)},me=()=>{V._isLeaving&&V[Vr](!0),Q(V,()=>{ie(),ue&&ue()})};ne?ne(V,ie,me):me()}else r(V,A,S)},qe=(I,A,S,O=!1,F=!1)=>{const{type:V,props:z,ref:W,children:H,dynamicChildren:B,shapeFlag:se,patchFlag:Q,dirs:ne,cacheIndex:ue}=I;if(Q===-2&&(F=!1),W!=null&&(kn(),Ei(W,null,S,I,!0),Dn()),ue!=null&&(A.renderCache[ue]=void 0),se&256){A.ctx.deactivate(I);return}const ie=se&1&&ne,me=!Ts(I);let Ie;if(me&&(Ie=z&&z.onVnodeBeforeUnmount)&&on(Ie,A,I),se&6)Ot(I.component,S,O);else{if(se&128){I.suspense.unmount(S,O);return}ie&&Nr(I,null,A,"beforeUnmount"),se&64?I.type.remove(I,A,S,te,O):B&&!B.hasOnce&&(V!==Et||Q>0&&Q&64)?xt(B,A,S,!1,!0):(V===Et&&Q&384||!F&&se&16)&&xt(H,A,S),O&&He(I)}(me&&(Ie=z&&z.onVnodeUnmounted)||ie)&&Mt(()=>{Ie&&on(Ie,A,I),ie&&Nr(I,null,A,"unmounted")},S)},He=I=>{const{type:A,el:S,anchor:O,transition:F}=I;if(A===Et){$n(S,O);return}if(A===bc){q(I);return}const V=()=>{s(S),F&&!F.persisted&&F.afterLeave&&F.afterLeave()};if(I.shapeFlag&1&&F&&!F.persisted){const{leave:z,delayLeave:W}=F,H=()=>z(S,V);W?W(I.el,V,H):H()}else V()},$n=(I,A)=>{let S;for(;I!==A;)S=m(I),s(I),I=S;s(A)},Ot=(I,A,S)=>{const{bum:O,scope:F,job:V,subTree:z,um:W,m:H,a:B}=I;hf(H),hf(B),O&&Lo(O),F.stop(),V&&(V.flags|=8,qe(z,I,A,S)),W&&Mt(W,A),Mt(()=>{I.isUnmounted=!0},A)},xt=(I,A,S,O=!1,F=!1,V=0)=>{for(let z=V;z<I.length;z++)qe(I[z],A,S,O,F)},D=I=>{if(I.shapeFlag&6)return D(I.component.subTree);if(I.shapeFlag&128)return I.suspense.next();const A=m(I.anchor||I.el),S=A&&A[mE];return S?m(S):A};let Z=!1;const K=(I,A,S)=>{I==null?A._vnode&&qe(A._vnode,null,null,!0):x(A._vnode||null,I,A,null,null,null,S),A._vnode=I,Z||(Z=!0,ef(),vm(),Z=!1)},te={p:x,um:qe,m:Ut,r:He,mt:be,mc:y,pc:ye,pbc:T,n:D,o:t};return{render:K,hydrate:void 0,createApp:FE(K)}}function Ac({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function kr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function sI(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Hm(t,e,n=!1){const r=t.children,s=e.children;if(le(r)&&le(s))for(let i=0;i<r.length;i++){const o=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=er(s[i]),c.el=o.el),!n&&c.patchFlag!==-2&&Hm(o,c)),c.type===Va&&c.patchFlag!==-1&&(c.el=o.el),c.type===vn&&!c.el&&(c.el=o.el)}}function iI(t){const e=t.slice(),n=[0];let r,s,i,o,c;const l=t.length;for(r=0;r<l;r++){const u=t[r];if(u!==0){if(s=n[n.length-1],t[s]<u){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)c=i+o>>1,t[n[c]]<u?i=c+1:o=c;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Wm(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Wm(e)}function hf(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Gm=t=>t.__isSuspense;function oI(t,e){e&&e.pendingBranch?le(t)?e.effects.push(...t):e.effects.push(t):pE(t)}const Et=Symbol.for("v-fgt"),Va=Symbol.for("v-txt"),vn=Symbol.for("v-cmt"),bc=Symbol.for("v-stc"),wi=[];let Lt=null;function Oe(t=!1){wi.push(Lt=t?null:[])}function aI(){wi.pop(),Lt=wi[wi.length-1]||null}let Mi=1;function ra(t,e=!1){Mi+=t,t<0&&Lt&&e&&(Lt.hasOnce=!0)}function zm(t){return t.dynamicChildren=Mi>0?Lt||vs:null,aI(),Mi>0&&Lt&&Lt.push(t),t}function Ze(t,e,n,r,s,i){return zm(J(t,e,n,r,s,i,!0))}function Hr(t,e,n,r,s){return zm(xe(t,e,n,r,s,!0))}function Li(t){return t?t.__v_isVNode===!0:!1}function hs(t,e){return t.type===e.type&&t.key===e.key}const Km=({key:t})=>t??null,Uo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Je(t)||$e(t)||pe(t)?{i:Tt,r:t,k:e,f:!!n}:t:null);function J(t,e=null,n=null,r=0,s=null,i=t===Et?0:1,o=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Km(e),ref:e&&Uo(e),scopeId:Im,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Tt};return c?(ru(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=Je(n)?8:16),Mi>0&&!o&&Lt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Lt.push(l),l}const xe=cI;function cI(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===PE)&&(t=vn),Li(t)){const c=Wr(t,e,!0);return n&&ru(c,n),Mi>0&&!i&&Lt&&(c.shapeFlag&6?Lt[Lt.indexOf(t)]=c:Lt.push(c)),c.patchFlag=-2,c}if(yI(t)&&(t=t.__vccOpts),e){e=lI(e);let{class:c,style:l}=e;c&&!Je(c)&&(e.class=Yi(c)),Ve(l)&&(Na(l)&&!le(l)&&(l=st({},l)),e.style=ql(l))}const o=Je(t)?1:Gm(t)?128:gE(t)?64:Ve(t)?4:pe(t)?2:0;return J(t,e,n,r,s,o,i,!0)}function lI(t){return t?Na(t)||Fm(t)?st({},t):t:null}function Wr(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:c,transition:l}=t,u=e?uI(s||{},e):s,f={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&Km(u),ref:e&&e.ref?n&&i?le(i)?i.concat(Uo(e)):[i,Uo(e)]:Uo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:c,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Et?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Wr(t.ssContent),ssFallback:t.ssFallback&&Wr(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&r&&Vi(f,l.clone(f)),f}function Jt(t=" ",e=0){return xe(Va,null,t,e)}function Lr(t="",e=!1){return e?(Oe(),Hr(vn,null,t)):xe(vn,null,t)}function un(t){return t==null||typeof t=="boolean"?xe(vn):le(t)?xe(Et,null,t.slice()):Li(t)?er(t):xe(Va,null,String(t))}function er(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Wr(t)}function ru(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(le(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),ru(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Fm(e)?e._ctx=Tt:s===3&&Tt&&(Tt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else pe(e)?(e={default:e,_ctx:Tt},n=32):(e=String(e),r&64?(n=16,e=[Jt(e)]):n=8);t.children=e,t.shapeFlag|=n}function uI(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Yi([e.class,r.class]));else if(s==="style")e.style=ql([e.style,r.style]);else if(ba(s)){const i=e[s],o=r[s];o&&i!==o&&!(le(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function on(t,e,n,r=null){tn(t,e,7,[n,r])}const hI=km();let fI=0;function dI(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||hI,i={uid:fI++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Jp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Bm(r,s),emitsOptions:Vm(r,s),emit:null,emitted:null,propsDefaults:ke,inheritAttrs:r.inheritAttrs,ctx:ke,data:ke,props:ke,attrs:ke,slots:ke,refs:ke,setupState:ke,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=HE.bind(null,i),t.ce&&t.ce(i),i}let Pt=null;const su=()=>Pt||Tt;let sa,rl;{const t=Pa(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};sa=e("__VUE_INSTANCE_SETTERS__",n=>Pt=n),rl=e("__VUE_SSR_SETTERS__",n=>Fi=n)}const Zi=t=>{const e=Pt;return sa(t),t.scope.on(),()=>{t.scope.off(),sa(e)}},ff=()=>{Pt&&Pt.scope.off(),sa(null)};function Qm(t){return t.vnode.shapeFlag&4}let Fi=!1;function pI(t,e=!1,n=!1){e&&rl(e);const{props:r,children:s}=t.vnode,i=Qm(t);JE(t,r,i,e),eI(t,s,n||e);const o=i?mI(t,e):void 0;return e&&rl(!1),o}function mI(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,NE);const{setup:r}=n;if(r){kn();const s=t.setupContext=r.length>1?_I(t):null,i=Zi(t),o=Xi(r,t,0,[t.props,s]),c=$p(o);if(Dn(),i(),(c||t.sp)&&!Ts(t)&&wm(t),c){if(o.then(ff,ff),e)return o.then(l=>{df(t,l)}).catch(l=>{ka(l,t,0)});t.asyncDep=o}else df(t,o)}else Jm(t)}function df(t,e,n){pe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ve(e)&&(t.setupState=mm(e)),Jm(t)}function Jm(t,e,n){const r=t.type;t.render||(t.render=r.render||hn);{const s=Zi(t);kn();try{kE(t)}finally{Dn(),s()}}}const gI={get(t,e){return vt(t,"get",""),t[e]}};function _I(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,gI),slots:t.slots,emit:t.emit,expose:e}}function Ma(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(mm(Jl(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Ii)return Ii[n](t)},has(e,n){return n in e||n in Ii}})):t.proxy}function yI(t){return pe(t)&&"__vccOpts"in t}const je=(t,e)=>lE(t,e,Fi);function Ym(t,e,n){try{ra(-1);const r=arguments.length;return r===2?Ve(e)&&!le(e)?Li(e)?xe(t,null,[e]):xe(t,e):xe(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Li(n)&&(n=[n]),xe(t,e,n))}finally{ra(1)}}const vI="3.5.25";/**
* @vue/runtime-dom v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let sl;const pf=typeof window<"u"&&window.trustedTypes;if(pf)try{sl=pf.createPolicy("vue",{createHTML:t=>t})}catch{}const Xm=sl?t=>sl.createHTML(t):t=>t,EI="http://www.w3.org/2000/svg",II="http://www.w3.org/1998/Math/MathML",bn=typeof document<"u"?document:null,mf=bn&&bn.createElement("template"),TI={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?bn.createElementNS(EI,t):e==="mathml"?bn.createElementNS(II,t):n?bn.createElement(t,{is:n}):bn.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>bn.createTextNode(t),createComment:t=>bn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>bn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{mf.innerHTML=Xm(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const c=mf.content;if(r==="svg"||r==="mathml"){const l=c.firstChild;for(;l.firstChild;)c.appendChild(l.firstChild);c.removeChild(l)}e.insertBefore(c,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},zn="transition",ci="animation",Cs=Symbol("_vtc"),Zm={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},wI=st({},yE,Zm),Dr=(t,e=[])=>{le(t)?t.forEach(n=>n(...e)):t&&t(...e)},gf=t=>t?le(t)?t.some(e=>e.length>1):t.length>1:!1;function AI(t){const e={};for(const w in t)w in Zm||(e[w]=t[w]);if(t.css===!1)return e;const{name:n="v",type:r,duration:s,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:l=i,appearActiveClass:u=o,appearToClass:f=c,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:m=`${n}-leave-active`,leaveToClass:v=`${n}-leave-to`}=t,C=bI(s),x=C&&C[0],k=C&&C[1],{onBeforeEnter:j,onEnter:U,onEnterCancelled:$,onLeave:q,onLeaveCancelled:ee,onBeforeAppear:oe=j,onAppear:b=U,onAppearCancelled:y=$}=e,_=(w,E,be,Ke)=>{w._enterCancelled=Ke,Jn(w,E?f:c),Jn(w,E?u:o),be&&be()},T=(w,E)=>{w._isLeaving=!1,Jn(w,p),Jn(w,v),Jn(w,m),E&&E()},R=w=>(E,be)=>{const Ke=w?b:U,Pe=()=>_(E,w,be);Dr(Ke,[E,Pe]),_f(()=>{Jn(E,w?l:i),an(E,w?f:c),gf(Ke)||yf(E,r,x,Pe)})};return st(e,{onBeforeEnter(w){Dr(j,[w]),an(w,i),an(w,o)},onBeforeAppear(w){Dr(oe,[w]),an(w,l),an(w,u)},onEnter:R(!1),onAppear:R(!0),onLeave(w,E){w._isLeaving=!0;const be=()=>T(w,E);an(w,p),w._enterCancelled?(an(w,m),il(w)):(il(w),an(w,m)),_f(()=>{w._isLeaving&&(Jn(w,p),an(w,v),gf(q)||yf(w,r,k,be))}),Dr(q,[w,be])},onEnterCancelled(w){_(w,!1,void 0,!0),Dr($,[w])},onAppearCancelled(w){_(w,!0,void 0,!0),Dr(y,[w])},onLeaveCancelled(w){T(w),Dr(ee,[w])}})}function bI(t){if(t==null)return null;if(Ve(t))return[Rc(t.enter),Rc(t.leave)];{const e=Rc(t);return[e,e]}}function Rc(t){return Cv(t)}function an(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t[Cs]||(t[Cs]=new Set)).add(e)}function Jn(t,e){e.split(/\s+/).forEach(r=>r&&t.classList.remove(r));const n=t[Cs];n&&(n.delete(e),n.size||(t[Cs]=void 0))}function _f(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let RI=0;function yf(t,e,n,r){const s=t._endId=++RI,i=()=>{s===t._endId&&r()};if(n!=null)return setTimeout(i,n);const{type:o,timeout:c,propCount:l}=eg(t,e);if(!o)return r();const u=o+"end";let f=0;const p=()=>{t.removeEventListener(u,m),i()},m=v=>{v.target===t&&++f>=l&&p()};setTimeout(()=>{f<l&&p()},c+1),t.addEventListener(u,m)}function eg(t,e){const n=window.getComputedStyle(t),r=C=>(n[C]||"").split(", "),s=r(`${zn}Delay`),i=r(`${zn}Duration`),o=vf(s,i),c=r(`${ci}Delay`),l=r(`${ci}Duration`),u=vf(c,l);let f=null,p=0,m=0;e===zn?o>0&&(f=zn,p=o,m=i.length):e===ci?u>0&&(f=ci,p=u,m=l.length):(p=Math.max(o,u),f=p>0?o>u?zn:ci:null,m=f?f===zn?i.length:l.length:0);const v=f===zn&&/\b(?:transform|all)(?:,|$)/.test(r(`${zn}Property`).toString());return{type:f,timeout:p,propCount:m,hasTransform:v}}function vf(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,r)=>Ef(n)+Ef(t[r])))}function Ef(t){return t==="auto"?0:Number(t.slice(0,-1).replace(",","."))*1e3}function il(t){return(t?t.ownerDocument:document).body.offsetHeight}function SI(t,e,n){const r=t[Cs];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const If=Symbol("_vod"),CI=Symbol("_vsh"),PI=Symbol(""),xI=/(?:^|;)\s*display\s*:/;function NI(t,e,n){const r=t.style,s=Je(n);let i=!1;if(n&&!s){if(e)if(Je(e))for(const o of e.split(";")){const c=o.slice(0,o.indexOf(":")).trim();n[c]==null&&Bo(r,c,"")}else for(const o in e)n[o]==null&&Bo(r,o,"");for(const o in n)o==="display"&&(i=!0),Bo(r,o,n[o])}else if(s){if(e!==n){const o=r[PI];o&&(n+=";"+o),r.cssText=n,i=xI.test(n)}}else e&&t.removeAttribute("style");If in t&&(t[If]=i?r.display:"",t[CI]&&(r.display="none"))}const Tf=/\s*!important$/;function Bo(t,e,n){if(le(n))n.forEach(r=>Bo(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=kI(t,e);Tf.test(n)?t.setProperty(Yr(r),n.replace(Tf,""),"important"):t[r]=n}}const wf=["Webkit","Moz","ms"],Sc={};function kI(t,e){const n=Sc[e];if(n)return n;let r=_r(e);if(r!=="filter"&&r in t)return Sc[e]=r;r=Wp(r);for(let s=0;s<wf.length;s++){const i=wf[s]+r;if(i in t)return Sc[e]=i}return e}const Af="http://www.w3.org/1999/xlink";function bf(t,e,n,r,s,i=Ov(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Af,e.slice(6,e.length)):t.setAttributeNS(Af,e,n):n==null||i&&!zp(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Un(n)?String(n):n)}function Rf(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Xm(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(c!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=zp(n):n==null&&c==="string"?(n="",o=!0):c==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function fs(t,e,n,r){t.addEventListener(e,n,r)}function DI(t,e,n,r){t.removeEventListener(e,n,r)}const Sf=Symbol("_vei");function OI(t,e,n,r,s=null){const i=t[Sf]||(t[Sf]={}),o=i[e];if(r&&o)o.value=r;else{const[c,l]=VI(e);if(r){const u=i[e]=FI(r,s);fs(t,c,u,l)}else o&&(DI(t,c,o,l),i[e]=void 0)}}const Cf=/(?:Once|Passive|Capture)$/;function VI(t){let e;if(Cf.test(t)){e={};let r;for(;r=t.match(Cf);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Yr(t.slice(2)),e]}let Cc=0;const MI=Promise.resolve(),LI=()=>Cc||(MI.then(()=>Cc=0),Cc=Date.now());function FI(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;tn(UI(r,n.value),e,5,[r])};return n.value=t,n.attached=LI(),n}function UI(t,e){if(le(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Pf=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,BI=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?SI(t,r,o):e==="style"?NI(t,n,r):ba(e)?Bl(e)||OI(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):jI(t,e,r,o))?(Rf(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&bf(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Je(r))?Rf(t,_r(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),bf(t,e,r,o))};function jI(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Pf(e)&&pe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Pf(e)&&Je(n)?!1:e in t}const tg=new WeakMap,ng=new WeakMap,ia=Symbol("_moveCb"),xf=Symbol("_enterCb"),$I=t=>(delete t.props.mode,t),qI=$I({name:"TransitionGroup",props:st({},wI,{tag:String,moveClass:String}),setup(t,{slots:e}){const n=su(),r=_E();let s,i;return Rm(()=>{if(!s.length)return;const o=t.moveClass||`${t.name||"v"}-move`;if(!KI(s[0].el,n.vnode.el,o)){s=[];return}s.forEach(WI),s.forEach(GI);const c=s.filter(zI);il(n.vnode.el),c.forEach(l=>{const u=l.el,f=u.style;an(u,o),f.transform=f.webkitTransform=f.transitionDuration="";const p=u[ia]=m=>{m&&m.target!==u||(!m||m.propertyName.endsWith("transform"))&&(u.removeEventListener("transitionend",p),u[ia]=null,Jn(u,o))};u.addEventListener("transitionend",p)}),s=[]}),()=>{const o=we(t),c=AI(o);let l=o.tag||Et;if(s=[],i)for(let u=0;u<i.length;u++){const f=i[u];f.el&&f.el instanceof Element&&(s.push(f),Vi(f,Xc(f,c,r,n)),tg.set(f,{left:f.el.offsetLeft,top:f.el.offsetTop}))}i=e.default?Tm(e.default()):[];for(let u=0;u<i.length;u++){const f=i[u];f.key!=null&&Vi(f,Xc(f,c,r,n))}return xe(l,null,i)}}}),HI=qI;function WI(t){const e=t.el;e[ia]&&e[ia](),e[xf]&&e[xf]()}function GI(t){ng.set(t,{left:t.el.offsetLeft,top:t.el.offsetTop})}function zI(t){const e=tg.get(t),n=ng.get(t),r=e.left-n.left,s=e.top-n.top;if(r||s){const i=t.el.style;return i.transform=i.webkitTransform=`translate(${r}px,${s}px)`,i.transitionDuration="0s",t}}function KI(t,e,n){const r=t.cloneNode(),s=t[Cs];s&&s.forEach(c=>{c.split(/\s+/).forEach(l=>l&&r.classList.remove(l))}),n.split(/\s+/).forEach(c=>c&&r.classList.add(c)),r.style.display="none";const i=e.nodeType===1?e:e.parentNode;i.appendChild(r);const{hasTransform:o}=eg(r);return i.removeChild(r),o}const Nf=t=>{const e=t.props["onUpdate:modelValue"]||!1;return le(e)?n=>Lo(e,n):e};function QI(t){t.target.composing=!0}function kf(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Pc=Symbol("_assign");function Df(t,e,n){return e&&(t=t.trim()),n&&(t=$l(t)),t}const Of={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[Pc]=Nf(s);const i=r||s.props&&s.props.type==="number";fs(t,e?"change":"input",o=>{o.target.composing||t[Pc](Df(t.value,n,i))}),(n||i)&&fs(t,"change",()=>{t.value=Df(t.value,n,i)}),e||(fs(t,"compositionstart",QI),fs(t,"compositionend",kf),fs(t,"change",kf))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[Pc]=Nf(o),t.composing)return;const c=(i||t.type==="number")&&!/^0\d/.test(t.value)?$l(t.value):t.value,l=e??"";c!==l&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===l)||(t.value=l))}},JI=["ctrl","shift","alt","meta"],YI={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>JI.some(n=>t[`${n}Key`]&&!e.includes(n))},XI=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let o=0;o<e.length;o++){const c=YI[e[o]];if(c&&c(s,e))return}return t(s,...i)})},ZI=st({patchProp:BI},TI);let Vf;function eT(){return Vf||(Vf=nI(ZI))}const tT=(...t)=>{const e=eT().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=rT(r);if(!s)return;const i=e._component;!pe(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,nT(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function nT(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function rT(t){return Je(t)?document.querySelector(t):t}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let rg;const La=t=>rg=t,sg=Symbol();function ol(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var Ai;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Ai||(Ai={}));function sT(){const t=Yp(!0),e=t.run(()=>kt({}));let n=[],r=[];const s=Jl({install(i){La(s),s._a=i,i.provide(sg,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return this._a?n.push(i):r.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const ig=()=>{};function Mf(t,e,n,r=ig){t.push(e);const s=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),r())};return!n&&Xp()&&Vv(s),s}function ls(t,...e){t.slice().forEach(n=>{n(...e)})}const iT=t=>t(),Lf=Symbol(),xc=Symbol();function al(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,r)=>t.set(r,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],s=t[n];ol(s)&&ol(r)&&t.hasOwnProperty(n)&&!$e(r)&&!fn(r)?t[n]=al(s,r):t[n]=r}return t}const oT=Symbol();function aT(t){return!ol(t)||!t.hasOwnProperty(oT)}const{assign:Yn}=Object;function cT(t){return!!($e(t)&&t.effect)}function lT(t,e,n,r){const{state:s,actions:i,getters:o}=e,c=n.state.value[t];let l;function u(){c||(n.state.value[t]=s?s():{});const f=sE(n.state.value[t]);return Yn(f,i,Object.keys(o||{}).reduce((p,m)=>(p[m]=Jl(je(()=>{La(n);const v=n._s.get(t);return o[m].call(v,v)})),p),{}))}return l=og(t,u,e,n,r,!0),l}function og(t,e,n={},r,s,i){let o;const c=Yn({actions:{}},n),l={deep:!0};let u,f,p=[],m=[],v;const C=r.state.value[t];!i&&!C&&(r.state.value[t]={}),kt({});let x;function k(y){let _;u=f=!1,typeof y=="function"?(y(r.state.value[t]),_={type:Ai.patchFunction,storeId:t,events:v}):(al(r.state.value[t],y),_={type:Ai.patchObject,payload:y,storeId:t,events:v});const T=x=Symbol();Yl().then(()=>{x===T&&(u=!0)}),f=!0,ls(p,_,r.state.value[t])}const j=i?function(){const{state:_}=n,T=_?_():{};this.$patch(R=>{Yn(R,T)})}:ig;function U(){o.stop(),p=[],m=[],r._s.delete(t)}const $=(y,_="")=>{if(Lf in y)return y[xc]=_,y;const T=function(){La(r);const R=Array.from(arguments),w=[],E=[];function be(he){w.push(he)}function Ke(he){E.push(he)}ls(m,{args:R,name:T[xc],store:ee,after:be,onError:Ke});let Pe;try{Pe=y.apply(this&&this.$id===t?this:ee,R)}catch(he){throw ls(E,he),he}return Pe instanceof Promise?Pe.then(he=>(ls(w,he),he)).catch(he=>(ls(E,he),Promise.reject(he))):(ls(w,Pe),Pe)};return T[Lf]=!0,T[xc]=_,T},q={_p:r,$id:t,$onAction:Mf.bind(null,m),$patch:k,$reset:j,$subscribe(y,_={}){const T=Mf(p,y,_.detached,()=>R()),R=o.run(()=>Ti(()=>r.state.value[t],w=>{(_.flush==="sync"?f:u)&&y({storeId:t,type:Ai.direct,events:v},w)},Yn({},l,_)));return T},$dispose:U},ee=Fs(q);r._s.set(t,ee);const b=(r._a&&r._a.runWithContext||iT)(()=>r._e.run(()=>(o=Yp()).run(()=>e({action:$}))));for(const y in b){const _=b[y];if($e(_)&&!cT(_)||fn(_))i||(C&&aT(_)&&($e(_)?_.value=C[y]:al(_,C[y])),r.state.value[t][y]=_);else if(typeof _=="function"){const T=$(_,y);b[y]=T,c.actions[y]=_}}return Yn(ee,b),Yn(we(ee),b),Object.defineProperty(ee,"$state",{get:()=>r.state.value[t],set:y=>{k(_=>{Yn(_,y)})}}),r._p.forEach(y=>{Yn(ee,o.run(()=>y({store:ee,app:r._a,pinia:r,options:c})))}),C&&i&&n.hydrate&&n.hydrate(ee.$state,C),u=!0,f=!0,ee}/*! #__NO_SIDE_EFFECTS__ */function iu(t,e,n){let r,s;const i=typeof e=="function";typeof t=="string"?(r=t,s=i?n:e):(s=t,r=t.id);function o(c,l){const u=UE();return c=c||(u?Wt(sg,null):null),c&&La(c),c=rg,c._s.has(r)||(i?og(r,e,s,c):lT(r,s,c)),c._s.get(r)}return o.$id=r,o}function ag(t){{const e=we(t),n={};for(const r in e){const s=e[r];s.effect?n[r]=je({get:()=>t[r],set(i){t[r]=i}}):($e(s)||fn(s))&&(n[r]=aE(t,r))}return n}}/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const ds=typeof document<"u";function cg(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function uT(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&cg(t.default)}const Re=Object.assign;function Nc(t,e){const n={};for(const r in e){const s=e[r];n[r]=nn(s)?s.map(t):t(s)}return n}const bi=()=>{},nn=Array.isArray;function Ff(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}const lg=/#/g,hT=/&/g,fT=/\//g,dT=/=/g,pT=/\?/g,ug=/\+/g,mT=/%5B/g,gT=/%5D/g,hg=/%5E/g,_T=/%60/g,fg=/%7B/g,yT=/%7C/g,dg=/%7D/g,vT=/%20/g;function ou(t){return t==null?"":encodeURI(""+t).replace(yT,"|").replace(mT,"[").replace(gT,"]")}function ET(t){return ou(t).replace(fg,"{").replace(dg,"}").replace(hg,"^")}function cl(t){return ou(t).replace(ug,"%2B").replace(vT,"+").replace(lg,"%23").replace(hT,"%26").replace(_T,"`").replace(fg,"{").replace(dg,"}").replace(hg,"^")}function IT(t){return cl(t).replace(dT,"%3D")}function TT(t){return ou(t).replace(lg,"%23").replace(pT,"%3F")}function wT(t){return TT(t).replace(fT,"%2F")}function Ui(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const AT=/\/$/,bT=t=>t.replace(AT,"");function kc(t,e,n="/"){let r,s={},i="",o="";const c=e.indexOf("#");let l=e.indexOf("?");return l=c>=0&&l>c?-1:l,l>=0&&(r=e.slice(0,l),i=e.slice(l,c>0?c:e.length),s=t(i.slice(1))),c>=0&&(r=r||e.slice(0,c),o=e.slice(c,e.length)),r=PT(r??e,n),{fullPath:r+i+o,path:r,query:s,hash:Ui(o)}}function RT(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Uf(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function ST(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&Ps(e.matched[r],n.matched[s])&&pg(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Ps(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function pg(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!CT(t[n],e[n]))return!1;return!0}function CT(t,e){return nn(t)?Bf(t,e):nn(e)?Bf(e,t):t===e}function Bf(t,e){return nn(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function PT(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,c;for(o=0;o<r.length;o++)if(c=r[o],c!==".")if(c==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const Kn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let ll=function(t){return t.pop="pop",t.push="push",t}({}),Dc=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function xT(t){if(!t)if(ds){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),bT(t)}const NT=/^[^#]+#/;function kT(t,e){return t.replace(NT,"#")+e}function DT(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const Fa=()=>({left:window.scrollX,top:window.scrollY});function OT(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=DT(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function jf(t,e){return(history.state?history.state.position-e:-1)+t}const ul=new Map;function VT(t,e){ul.set(t,e)}function MT(t){const e=ul.get(t);return ul.delete(t),e}function LT(t){return typeof t=="string"||t&&typeof t=="object"}function mg(t){return typeof t=="string"||typeof t=="symbol"}let ze=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const gg=Symbol("");ze.MATCHER_NOT_FOUND+"",ze.NAVIGATION_GUARD_REDIRECT+"",ze.NAVIGATION_ABORTED+"",ze.NAVIGATION_CANCELLED+"",ze.NAVIGATION_DUPLICATED+"";function xs(t,e){return Re(new Error,{type:t,[gg]:!0},e)}function An(t,e){return t instanceof Error&&gg in t&&(e==null||!!(t.type&e))}const FT=["params","query","hash"];function UT(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of FT)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function BT(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(ug," "),i=s.indexOf("="),o=Ui(i<0?s:s.slice(0,i)),c=i<0?null:Ui(s.slice(i+1));if(o in e){let l=e[o];nn(l)||(l=e[o]=[l]),l.push(c)}else e[o]=c}return e}function $f(t){let e="";for(let n in t){const r=t[n];if(n=IT(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(nn(r)?r.map(s=>s&&cl(s)):[r&&cl(r)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+n,s!=null&&(e+="="+s))})}return e}function jT(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=nn(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const $T=Symbol(""),qf=Symbol(""),Ua=Symbol(""),au=Symbol(""),hl=Symbol("");function li(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function tr(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((c,l)=>{const u=m=>{m===!1?l(xs(ze.NAVIGATION_ABORTED,{from:n,to:e})):m instanceof Error?l(m):LT(m)?l(xs(ze.NAVIGATION_GUARD_REDIRECT,{from:e,to:m})):(o&&r.enterCallbacks[s]===o&&typeof m=="function"&&o.push(m),c())},f=i(()=>t.call(r&&r.instances[s],e,n,u));let p=Promise.resolve(f);t.length<3&&(p=p.then(u)),p.catch(m=>l(m))})}function Oc(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const c in o.components){let l=o.components[c];if(!(e!=="beforeRouteEnter"&&!o.instances[c]))if(cg(l)){const u=(l.__vccOpts||l)[e];u&&i.push(tr(u,n,r,o,c,s))}else{let u=l();i.push(()=>u.then(f=>{if(!f)throw new Error(`Couldn't resolve component "${c}" at "${o.path}"`);const p=uT(f)?f.default:f;o.mods[c]=f,o.components[c]=p;const m=(p.__vccOpts||p)[e];return m&&tr(m,n,r,o,c,s)()}))}}return i}function qT(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const c=e.matched[o];c&&(t.matched.find(u=>Ps(u,c))?r.push(c):n.push(c));const l=t.matched[o];l&&(e.matched.find(u=>Ps(u,l))||s.push(l))}return[n,r,s]}/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let HT=()=>location.protocol+"//"+location.host;function _g(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let o=s.includes(t.slice(i))?t.slice(i).length:1,c=s.slice(o);return c[0]!=="/"&&(c="/"+c),Uf(c,"")}return Uf(n,t)+r+s}function WT(t,e,n,r){let s=[],i=[],o=null;const c=({state:m})=>{const v=_g(t,location),C=n.value,x=e.value;let k=0;if(m){if(n.value=v,e.value=m,o&&o===C){o=null;return}k=x?m.position-x.position:0}else r(v);s.forEach(j=>{j(n.value,C,{delta:k,type:ll.pop,direction:k?k>0?Dc.forward:Dc.back:Dc.unknown})})};function l(){o=n.value}function u(m){s.push(m);const v=()=>{const C=s.indexOf(m);C>-1&&s.splice(C,1)};return i.push(v),v}function f(){if(document.visibilityState==="hidden"){const{history:m}=window;if(!m.state)return;m.replaceState(Re({},m.state,{scroll:Fa()}),"")}}function p(){for(const m of i)m();i=[],window.removeEventListener("popstate",c),window.removeEventListener("pagehide",f),document.removeEventListener("visibilitychange",f)}return window.addEventListener("popstate",c),window.addEventListener("pagehide",f),document.addEventListener("visibilitychange",f),{pauseListeners:l,listen:u,destroy:p}}function Hf(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?Fa():null}}function GT(t){const{history:e,location:n}=window,r={value:_g(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(l,u,f){const p=t.indexOf("#"),m=p>-1?(n.host&&document.querySelector("base")?t:t.slice(p))+l:HT()+t+l;try{e[f?"replaceState":"pushState"](u,"",m),s.value=u}catch(v){console.error(v),n[f?"replace":"assign"](m)}}function o(l,u){i(l,Re({},e.state,Hf(s.value.back,l,s.value.forward,!0),u,{position:s.value.position}),!0),r.value=l}function c(l,u){const f=Re({},s.value,e.state,{forward:l,scroll:Fa()});i(f.current,f,!0),i(l,Re({},Hf(r.value,l,null),{position:f.position+1},u),!1),r.value=l}return{location:r,state:s,push:c,replace:o}}function zT(t){t=xT(t);const e=GT(t),n=WT(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Re({location:"",base:t,go:r,createHref:kT.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}let Fr=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var nt=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(nt||{});const KT={type:Fr.Static,value:""},QT=/[a-zA-Z0-9_]/;function JT(t){if(!t)return[[]];if(t==="/")return[[KT]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(v){throw new Error(`ERR (${n})/"${u}": ${v}`)}let n=nt.Static,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let c=0,l,u="",f="";function p(){u&&(n===nt.Static?i.push({type:Fr.Static,value:u}):n===nt.Param||n===nt.ParamRegExp||n===nt.ParamRegExpEnd?(i.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Fr.Param,value:u,regexp:f,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),u="")}function m(){u+=l}for(;c<t.length;){if(l=t[c++],l==="\\"&&n!==nt.ParamRegExp){r=n,n=nt.EscapeNext;continue}switch(n){case nt.Static:l==="/"?(u&&p(),o()):l===":"?(p(),n=nt.Param):m();break;case nt.EscapeNext:m(),n=r;break;case nt.Param:l==="("?n=nt.ParamRegExp:QT.test(l)?m():(p(),n=nt.Static,l!=="*"&&l!=="?"&&l!=="+"&&c--);break;case nt.ParamRegExp:l===")"?f[f.length-1]=="\\"?f=f.slice(0,-1)+l:n=nt.ParamRegExpEnd:f+=l;break;case nt.ParamRegExpEnd:p(),n=nt.Static,l!=="*"&&l!=="?"&&l!=="+"&&c--,f="";break;default:e("Unknown state");break}}return n===nt.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),p(),o(),s}const Wf="[^/]+?",YT={sensitive:!1,strict:!1,start:!0,end:!0};var St=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(St||{});const XT=/[.+*?^${}()[\]/\\]/g;function ZT(t,e){const n=Re({},YT,e),r=[];let s=n.start?"^":"";const i=[];for(const u of t){const f=u.length?[]:[St.Root];n.strict&&!u.length&&(s+="/");for(let p=0;p<u.length;p++){const m=u[p];let v=St.Segment+(n.sensitive?St.BonusCaseSensitive:0);if(m.type===Fr.Static)p||(s+="/"),s+=m.value.replace(XT,"\\$&"),v+=St.Static;else if(m.type===Fr.Param){const{value:C,repeatable:x,optional:k,regexp:j}=m;i.push({name:C,repeatable:x,optional:k});const U=j||Wf;if(U!==Wf){v+=St.BonusCustomRegExp;try{`${U}`}catch(q){throw new Error(`Invalid custom RegExp for param "${C}" (${U}): `+q.message)}}let $=x?`((?:${U})(?:/(?:${U}))*)`:`(${U})`;p||($=k&&u.length<2?`(?:/${$})`:"/"+$),k&&($+="?"),s+=$,v+=St.Dynamic,k&&(v+=St.BonusOptional),x&&(v+=St.BonusRepeatable),U===".*"&&(v+=St.BonusWildcard)}f.push(v)}r.push(f)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=St.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function c(u){const f=u.match(o),p={};if(!f)return null;for(let m=1;m<f.length;m++){const v=f[m]||"",C=i[m-1];p[C.name]=v&&C.repeatable?v.split("/"):v}return p}function l(u){let f="",p=!1;for(const m of t){(!p||!f.endsWith("/"))&&(f+="/"),p=!1;for(const v of m)if(v.type===Fr.Static)f+=v.value;else if(v.type===Fr.Param){const{value:C,repeatable:x,optional:k}=v,j=C in u?u[C]:"";if(nn(j)&&!x)throw new Error(`Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`);const U=nn(j)?j.join("/"):j;if(!U)if(k)m.length<2&&(f.endsWith("/")?f=f.slice(0,-1):p=!0);else throw new Error(`Missing required param "${C}"`);f+=U}}return f||"/"}return{re:o,score:r,keys:i,parse:c,stringify:l}}function ew(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===St.Static+St.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===St.Static+St.Segment?1:-1:0}function yg(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=ew(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Gf(r))return 1;if(Gf(s))return-1}return s.length-r.length}function Gf(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const tw={strict:!1,end:!0,sensitive:!1};function nw(t,e,n){const r=ZT(JT(t.path),n),s=Re(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function rw(t,e){const n=[],r=new Map;e=Ff(tw,e);function s(p){return r.get(p)}function i(p,m,v){const C=!v,x=Kf(p);x.aliasOf=v&&v.record;const k=Ff(e,p),j=[x];if("alias"in p){const q=typeof p.alias=="string"?[p.alias]:p.alias;for(const ee of q)j.push(Kf(Re({},x,{components:v?v.record.components:x.components,path:ee,aliasOf:v?v.record:x})))}let U,$;for(const q of j){const{path:ee}=q;if(m&&ee[0]!=="/"){const oe=m.record.path,b=oe[oe.length-1]==="/"?"":"/";q.path=m.record.path+(ee&&b+ee)}if(U=nw(q,m,k),v?v.alias.push(U):($=$||U,$!==U&&$.alias.push(U),C&&p.name&&!Qf(U)&&o(p.name)),vg(U)&&l(U),x.children){const oe=x.children;for(let b=0;b<oe.length;b++)i(oe[b],U,v&&v.children[b])}v=v||U}return $?()=>{o($)}:bi}function o(p){if(mg(p)){const m=r.get(p);m&&(r.delete(p),n.splice(n.indexOf(m),1),m.children.forEach(o),m.alias.forEach(o))}else{const m=n.indexOf(p);m>-1&&(n.splice(m,1),p.record.name&&r.delete(p.record.name),p.children.forEach(o),p.alias.forEach(o))}}function c(){return n}function l(p){const m=ow(p,n);n.splice(m,0,p),p.record.name&&!Qf(p)&&r.set(p.record.name,p)}function u(p,m){let v,C={},x,k;if("name"in p&&p.name){if(v=r.get(p.name),!v)throw xs(ze.MATCHER_NOT_FOUND,{location:p});k=v.record.name,C=Re(zf(m.params,v.keys.filter($=>!$.optional).concat(v.parent?v.parent.keys.filter($=>$.optional):[]).map($=>$.name)),p.params&&zf(p.params,v.keys.map($=>$.name))),x=v.stringify(C)}else if(p.path!=null)x=p.path,v=n.find($=>$.re.test(x)),v&&(C=v.parse(x),k=v.record.name);else{if(v=m.name?r.get(m.name):n.find($=>$.re.test(m.path)),!v)throw xs(ze.MATCHER_NOT_FOUND,{location:p,currentLocation:m});k=v.record.name,C=Re({},m.params,p.params),x=v.stringify(C)}const j=[];let U=v;for(;U;)j.unshift(U.record),U=U.parent;return{name:k,path:x,params:C,matched:j,meta:iw(j)}}t.forEach(p=>i(p));function f(){n.length=0,r.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:f,getRoutes:c,getRecordMatcher:s}}function zf(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Kf(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:sw(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function sw(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Qf(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function iw(t){return t.reduce((e,n)=>Re(e,n.meta),{})}function ow(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;yg(t,e[i])<0?r=i:n=i+1}const s=aw(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function aw(t){let e=t;for(;e=e.parent;)if(vg(e)&&yg(t,e)===0)return e}function vg({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Jf(t){const e=Wt(Ua),n=Wt(au),r=je(()=>{const l=De(t.to);return e.resolve(l)}),s=je(()=>{const{matched:l}=r.value,{length:u}=l,f=l[u-1],p=n.matched;if(!f||!p.length)return-1;const m=p.findIndex(Ps.bind(null,f));if(m>-1)return m;const v=Yf(l[u-2]);return u>1&&Yf(f)===v&&p[p.length-1].path!==v?p.findIndex(Ps.bind(null,l[u-2])):m}),i=je(()=>s.value>-1&&hw(n.params,r.value.params)),o=je(()=>s.value>-1&&s.value===n.matched.length-1&&pg(n.params,r.value.params));function c(l={}){if(uw(l)){const u=e[De(t.replace)?"replace":"push"](De(t.to)).catch(bi);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:r,href:je(()=>r.value.href),isActive:i,isExactActive:o,navigate:c}}function cw(t){return t.length===1?t[0]:t}const lw=Gt({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Jf,setup(t,{slots:e}){const n=Fs(Jf(t)),{options:r}=Wt(Ua),s=je(()=>({[Xf(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Xf(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&cw(e.default(n));return t.custom?i:Ym("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),or=lw;function uw(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function hw(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!nn(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function Yf(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Xf=(t,e,n)=>t??e??n,fw=Gt({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Wt(hl),s=je(()=>t.route||r.value),i=Wt(qf,0),o=je(()=>{let u=De(i);const{matched:f}=s.value;let p;for(;(p=f[u])&&!p.components;)u++;return u}),c=je(()=>s.value.matched[o.value]);Fo(qf,je(()=>o.value+1)),Fo($T,c),Fo(hl,s);const l=kt();return Ti(()=>[l.value,c.value,t.name],([u,f,p],[m,v,C])=>{f&&(f.instances[p]=u,v&&v!==f&&u&&u===m&&(f.leaveGuards.size||(f.leaveGuards=v.leaveGuards),f.updateGuards.size||(f.updateGuards=v.updateGuards))),u&&f&&(!v||!Ps(f,v)||!m)&&(f.enterCallbacks[p]||[]).forEach(x=>x(u))},{flush:"post"}),()=>{const u=s.value,f=t.name,p=c.value,m=p&&p.components[f];if(!m)return Zf(n.default,{Component:m,route:u});const v=p.props[f],C=v?v===!0?u.params:typeof v=="function"?v(u):v:null,k=Ym(m,Re({},C,e,{onVnodeUnmounted:j=>{j.component.isUnmounted&&(p.instances[f]=null)},ref:l}));return Zf(n.default,{Component:k,route:u})||k}}});function Zf(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Eg=fw;function dw(t){const e=rw(t.routes,t),n=t.parseQuery||BT,r=t.stringifyQuery||$f,s=t.history,i=li(),o=li(),c=li(),l=tE(Kn);let u=Kn;ds&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const f=Nc.bind(null,D=>""+D),p=Nc.bind(null,wT),m=Nc.bind(null,Ui);function v(D,Z){let K,te;return mg(D)?(K=e.getRecordMatcher(D),te=Z):te=D,e.addRoute(te,K)}function C(D){const Z=e.getRecordMatcher(D);Z&&e.removeRoute(Z)}function x(){return e.getRoutes().map(D=>D.record)}function k(D){return!!e.getRecordMatcher(D)}function j(D,Z){if(Z=Re({},Z||l.value),typeof D=="string"){const S=kc(n,D,Z.path),O=e.resolve({path:S.path},Z),F=s.createHref(S.fullPath);return Re(S,O,{params:m(O.params),hash:Ui(S.hash),redirectedFrom:void 0,href:F})}let K;if(D.path!=null)K=Re({},D,{path:kc(n,D.path,Z.path).path});else{const S=Re({},D.params);for(const O in S)S[O]==null&&delete S[O];K=Re({},D,{params:p(S)}),Z.params=p(Z.params)}const te=e.resolve(K,Z),ge=D.hash||"";te.params=f(m(te.params));const I=RT(r,Re({},D,{hash:ET(ge),path:te.path})),A=s.createHref(I);return Re({fullPath:I,hash:ge,query:r===$f?jT(D.query):D.query||{}},te,{redirectedFrom:void 0,href:A})}function U(D){return typeof D=="string"?kc(n,D,l.value.path):Re({},D)}function $(D,Z){if(u!==D)return xs(ze.NAVIGATION_CANCELLED,{from:Z,to:D})}function q(D){return b(D)}function ee(D){return q(Re(U(D),{replace:!0}))}function oe(D,Z){const K=D.matched[D.matched.length-1];if(K&&K.redirect){const{redirect:te}=K;let ge=typeof te=="function"?te(D,Z):te;return typeof ge=="string"&&(ge=ge.includes("?")||ge.includes("#")?ge=U(ge):{path:ge},ge.params={}),Re({query:D.query,hash:D.hash,params:ge.path!=null?{}:D.params},ge)}}function b(D,Z){const K=u=j(D),te=l.value,ge=D.state,I=D.force,A=D.replace===!0,S=oe(K,te);if(S)return b(Re(U(S),{state:typeof S=="object"?Re({},ge,S.state):ge,force:I,replace:A}),Z||K);const O=K;O.redirectedFrom=Z;let F;return!I&&ST(r,te,K)&&(F=xs(ze.NAVIGATION_DUPLICATED,{to:O,from:te}),Ut(te,te,!0,!1)),(F?Promise.resolve(F):T(O,te)).catch(V=>An(V)?An(V,ze.NAVIGATION_GUARD_REDIRECT)?V:zt(V):ye(V,O,te)).then(V=>{if(V){if(An(V,ze.NAVIGATION_GUARD_REDIRECT))return b(Re({replace:A},U(V.to),{state:typeof V.to=="object"?Re({},ge,V.to.state):ge,force:I}),Z||O)}else V=w(O,te,!0,A,ge);return R(O,te,V),V})}function y(D,Z){const K=$(D,Z);return K?Promise.reject(K):Promise.resolve()}function _(D){const Z=$n.values().next().value;return Z&&typeof Z.runWithContext=="function"?Z.runWithContext(D):D()}function T(D,Z){let K;const[te,ge,I]=qT(D,Z);K=Oc(te.reverse(),"beforeRouteLeave",D,Z);for(const S of te)S.leaveGuards.forEach(O=>{K.push(tr(O,D,Z))});const A=y.bind(null,D,Z);return K.push(A),xt(K).then(()=>{K=[];for(const S of i.list())K.push(tr(S,D,Z));return K.push(A),xt(K)}).then(()=>{K=Oc(ge,"beforeRouteUpdate",D,Z);for(const S of ge)S.updateGuards.forEach(O=>{K.push(tr(O,D,Z))});return K.push(A),xt(K)}).then(()=>{K=[];for(const S of I)if(S.beforeEnter)if(nn(S.beforeEnter))for(const O of S.beforeEnter)K.push(tr(O,D,Z));else K.push(tr(S.beforeEnter,D,Z));return K.push(A),xt(K)}).then(()=>(D.matched.forEach(S=>S.enterCallbacks={}),K=Oc(I,"beforeRouteEnter",D,Z,_),K.push(A),xt(K))).then(()=>{K=[];for(const S of o.list())K.push(tr(S,D,Z));return K.push(A),xt(K)}).catch(S=>An(S,ze.NAVIGATION_CANCELLED)?S:Promise.reject(S))}function R(D,Z,K){c.list().forEach(te=>_(()=>te(D,Z,K)))}function w(D,Z,K,te,ge){const I=$(D,Z);if(I)return I;const A=Z===Kn,S=ds?history.state:{};K&&(te||A?s.replace(D.fullPath,Re({scroll:A&&S&&S.scroll},ge)):s.push(D.fullPath,ge)),l.value=D,Ut(D,Z,K,A),zt()}let E;function be(){E||(E=s.listen((D,Z,K)=>{if(!Ot.listening)return;const te=j(D),ge=oe(te,Ot.currentRoute.value);if(ge){b(Re(ge,{replace:!0,force:!0}),te).catch(bi);return}u=te;const I=l.value;ds&&VT(jf(I.fullPath,K.delta),Fa()),T(te,I).catch(A=>An(A,ze.NAVIGATION_ABORTED|ze.NAVIGATION_CANCELLED)?A:An(A,ze.NAVIGATION_GUARD_REDIRECT)?(b(Re(U(A.to),{force:!0}),te).then(S=>{An(S,ze.NAVIGATION_ABORTED|ze.NAVIGATION_DUPLICATED)&&!K.delta&&K.type===ll.pop&&s.go(-1,!1)}).catch(bi),Promise.reject()):(K.delta&&s.go(-K.delta,!1),ye(A,te,I))).then(A=>{A=A||w(te,I,!1),A&&(K.delta&&!An(A,ze.NAVIGATION_CANCELLED)?s.go(-K.delta,!1):K.type===ll.pop&&An(A,ze.NAVIGATION_ABORTED|ze.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),R(te,I,A)}).catch(bi)}))}let Ke=li(),Pe=li(),he;function ye(D,Z,K){zt(D);const te=Pe.list();return te.length?te.forEach(ge=>ge(D,Z,K)):console.error(D),Promise.reject(D)}function Dt(){return he&&l.value!==Kn?Promise.resolve():new Promise((D,Z)=>{Ke.add([D,Z])})}function zt(D){return he||(he=!D,be(),Ke.list().forEach(([Z,K])=>D?K(D):Z()),Ke.reset()),D}function Ut(D,Z,K,te){const{scrollBehavior:ge}=t;if(!ds||!ge)return Promise.resolve();const I=!K&&MT(jf(D.fullPath,0))||(te||!K)&&history.state&&history.state.scroll||null;return Yl().then(()=>ge(D,Z,I)).then(A=>A&&OT(A)).catch(A=>ye(A,D,Z))}const qe=D=>s.go(D);let He;const $n=new Set,Ot={currentRoute:l,listening:!0,addRoute:v,removeRoute:C,clearRoutes:e.clearRoutes,hasRoute:k,getRoutes:x,resolve:j,options:t,push:q,replace:ee,go:qe,back:()=>qe(-1),forward:()=>qe(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:Pe.add,isReady:Dt,install(D){D.component("RouterLink",or),D.component("RouterView",Eg),D.config.globalProperties.$router=Ot,Object.defineProperty(D.config.globalProperties,"$route",{enumerable:!0,get:()=>De(l)}),ds&&!He&&l.value===Kn&&(He=!0,q(s.location).catch(te=>{}));const Z={};for(const te in Kn)Object.defineProperty(Z,te,{get:()=>l.value[te],enumerable:!0});D.provide(Ua,Ot),D.provide(au,dm(Z)),D.provide(hl,l);const K=D.unmount;$n.add(D),D.unmount=function(){$n.delete(D),$n.size<1&&(u=Kn,E&&E(),E=null,l.value=Kn,He=!1,he=!1),K()}}};function xt(D){return D.reduce((Z,K)=>Z.then(()=>_(K)),Promise.resolve())}return Ot}function pw(){return Wt(Ua)}function mw(t){return Wt(au)}const Ig=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)}),fl=new Set,gw=t=>(fl.add(t),()=>fl.delete(t)),Vc=t=>{const e={id:t.id??Ig(),message:t.message,type:t.type??"info",timeout:t.timeout??4e3};return fl.forEach(n=>n(e)),e},_w=iu("ui",{state:()=>({toasts:[]}),actions:{pushToast(t){this.toasts.push(t),setTimeout(()=>this.removeToast(t.id),t.timeout)},removeToast(t){t&&(this.toasts=this.toasts.filter(e=>e.id!==t))}}});let ed=null;function cu(){const t=_w();return ed||(ed=gw(s=>{t.pushToast(s)})),{notifySuccess:s=>Vc({message:s,type:"success"}),notifyError:s=>Vc({message:s,type:"error"}),notifyInfo:s=>Vc({message:s,type:"info"}),toasts:t.toasts,dismiss:t.removeToast}}const yw={class:"flex min-h-screen flex-col bg-slate-100"},vw={class:"bg-white shadow-sm"},Ew={class:"mx-auto flex max-w-6xl items-center justify-between px-6 py-4"},Iw={class:"flex gap-4 text-sm font-medium text-slate-600"},Tw={class:"mx-auto flex w-full max-w-6xl flex-1 px-6 py-10"},ww={class:"pointer-events-none fixed inset-x-0 top-4 flex justify-center"},Aw=["onClick"],bw=Gt({__name:"App",setup(t){const{toasts:e,dismiss:n}=cu(),r=s=>{switch(s){case"success":return"bg-emerald-500/90";case"error":return"bg-rose-500/90";default:return"bg-slate-900/90"}};return(s,i)=>(Oe(),Ze("div",yw,[J("header",vw,[J("div",Ew,[xe(De(or),{to:"/",class:"text-lg font-semibold text-primary-600"},{default:Cn(()=>[...i[0]||(i[0]=[Jt("Invoice Uploader",-1)])]),_:1}),J("nav",Iw,[xe(De(or),{to:"/upload",class:"hover:text-primary-600"},{default:Cn(()=>[...i[1]||(i[1]=[Jt("Upload",-1)])]),_:1}),xe(De(or),{to:"/invoices",class:"hover:text-primary-600"},{default:Cn(()=>[...i[2]||(i[2]=[Jt("Invoices",-1)])]),_:1}),xe(De(or),{to:"/login",class:"hover:text-primary-600"},{default:Cn(()=>[...i[3]||(i[3]=[Jt("Login",-1)])]),_:1})])])]),J("main",Tw,[xe(De(Eg))]),J("div",ww,[xe(HI,{name:"toast",tag:"div",class:"space-y-2"},{default:Cn(()=>[(Oe(!0),Ze(Et,null,Cm(De(e),o=>(Oe(),Ze("div",{key:o.id,class:Yi(["pointer-events-auto rounded-2xl bg-slate-900/90 px-5 py-3 text-sm text-white shadow-lg",r(o.type)]),onClick:c=>De(n)(o.id)},Be(o.message),11,Aw))),128))]),_:1})])]))}}),Rw=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},Sw=Rw(bw,[["__scopeId","data-v-9668e587"]]),Cw={class:"grid w-full gap-10 lg:grid-cols-2"},Pw={class:"space-y-6"},xw={class:"flex gap-4"},Nw=Gt({__name:"HomePage",setup(t){return(e,n)=>(Oe(),Ze("section",Cw,[J("div",Pw,[n[2]||(n[2]=J("p",{class:"text-sm font-semibold uppercase tracking-tight text-primary-600"},"Procurement PWA",-1)),n[3]||(n[3]=J("h1",{class:"text-4xl font-bold leading-tight text-slate-900"},"Capture, validate, and send invoices in seconds.",-1)),n[4]||(n[4]=J("p",{class:"text-lg text-slate-600"}," Upload crisp invoice photos, run automatic quality checks, and deliver them securely to your procurement backend using signed URLs. ",-1)),J("div",xw,[xe(De(or),{to:"/upload",class:"rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white shadow-md hover:bg-primary-700"},{default:Cn(()=>[...n[0]||(n[0]=[Jt("Start Upload",-1)])]),_:1}),xe(De(or),{to:"/invoices",class:"rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-white"},{default:Cn(()=>[...n[1]||(n[1]=[Jt("View Invoices",-1)])]),_:1})])]),n[5]||(n[5]=J("div",{class:"rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 shadow-inner"},[J("ul",{class:"space-y-4 text-sm text-slate-600"},[J("li",null,"- Capture via mobile camera with offline support."),J("li",null,"- Automated quality assurance pipeline."),J("li",null,"- Uploads routed through secure signed URLs."),J("li",null,"- Firebase Auth + Firestore ready integration.")])],-1))]))}}),kw=()=>{};var td={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tg=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Dw=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],c=t[n++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},wg={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,c=o?t[s+1]:0,l=s+2<t.length,u=l?t[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let m=(c&15)<<2|u>>6,v=u&63;l||(v=64,o||(m=64)),r.push(n[f],n[p],n[m],n[v])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Tg(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Dw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||u==null||p==null)throw new Ow;const m=i<<2|c>>4;if(r.push(m),u!==64){const v=c<<4&240|u>>2;if(r.push(v),p!==64){const C=u<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ow extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Vw=function(t){const e=Tg(t);return wg.encodeByteArray(e,!0)},oa=function(t){return Vw(t).replace(/\./g,"")},Ag=function(t){try{return wg.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lw=()=>Mw().__FIREBASE_DEFAULTS__,Fw=()=>{if(typeof process>"u"||typeof td>"u")return;const t=td.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Uw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ag(t[1]);return e&&JSON.parse(e)},Ba=()=>{try{return kw()||Lw()||Fw()||Uw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},bg=t=>{var e,n;return(n=(e=Ba())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Bw=t=>{const e=bg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Rg=()=>{var t;return(t=Ba())===null||t===void 0?void 0:t.config},Sg=t=>{var e;return(e=Ba())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Us(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Cg(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $w(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[oa(JSON.stringify(n)),oa(JSON.stringify(o)),""].join(".")}const Ri={};function qw(){const t={prod:[],emulator:[]};for(const e of Object.keys(Ri))Ri[e]?t.emulator.push(e):t.prod.push(e);return t}function Hw(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let nd=!1;function Pg(t,e){if(typeof window>"u"||typeof document>"u"||!Us(window.location.host)||Ri[t]===e||Ri[t]||nd)return;Ri[t]=e;function n(m){return`__firebase__banner__${m}`}const r="__firebase__banner",i=qw().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function l(m,v){m.setAttribute("width","24"),m.setAttribute("id",v),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function u(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{nd=!0,o()},m}function f(m,v){m.setAttribute("id",v),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=Hw(r),v=n("text"),C=document.getElementById(v)||document.createElement("span"),x=n("learnmore"),k=document.getElementById(x)||document.createElement("a"),j=n("preprendIcon"),U=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const $=m.element;c($),f(k,x);const q=u();l(U,j),$.append(U,C,k,q),document.body.appendChild($)}i?(C.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",v)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ww(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(wt())}function Gw(){var t;const e=(t=Ba())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function zw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Kw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Qw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Jw(){const t=wt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Yw(){return!Gw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Xw(){try{return typeof indexedDB=="object"}catch{return!1}}function Zw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eA="FirebaseError";class jn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=eA,Object.setPrototypeOf(this,jn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,eo.prototype.create)}}class eo{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?tA(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new jn(s,c,r)}}function tA(t,e){return t.replace(nA,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const nA=/\{\$([^}]+)}/g;function rA(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Gr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(rd(i)&&rd(o)){if(!Gr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function rd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function hi(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function fi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function sA(t,e){const n=new iA(t,e);return n.subscribe.bind(n)}class iA{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");oA(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Mc),s.error===void 0&&(s.error=Mc),s.complete===void 0&&(s.complete=Mc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function oA(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Mc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(t){return t&&t._delegate?t._delegate:t}class zr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aA{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new jw;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(lA(e))try{this.getOrInitializeService({instanceIdentifier:Mr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Mr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Mr){return this.instances.has(e)}getOptions(e=Mr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:cA(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Mr){return this.component?this.component.multipleInstances?e:Mr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function cA(t){return t===Mr?void 0:t}function lA(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uA{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new aA(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ve;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ve||(ve={}));const hA={debug:ve.DEBUG,verbose:ve.VERBOSE,info:ve.INFO,warn:ve.WARN,error:ve.ERROR,silent:ve.SILENT},fA=ve.INFO,dA={[ve.DEBUG]:"log",[ve.VERBOSE]:"log",[ve.INFO]:"info",[ve.WARN]:"warn",[ve.ERROR]:"error"},pA=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=dA[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class lu{constructor(e){this.name=e,this._logLevel=fA,this._logHandler=pA,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ve))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?hA[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ve.DEBUG,...e),this._logHandler(this,ve.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ve.VERBOSE,...e),this._logHandler(this,ve.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ve.INFO,...e),this._logHandler(this,ve.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ve.WARN,...e),this._logHandler(this,ve.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ve.ERROR,...e),this._logHandler(this,ve.ERROR,...e)}}const mA=(t,e)=>e.some(n=>t instanceof n);let sd,id;function gA(){return sd||(sd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function _A(){return id||(id=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const xg=new WeakMap,dl=new WeakMap,Ng=new WeakMap,Lc=new WeakMap,uu=new WeakMap;function yA(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(lr(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&xg.set(n,t)}).catch(()=>{}),uu.set(e,t),e}function vA(t){if(dl.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});dl.set(t,e)}let pl={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return dl.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Ng.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return lr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function EA(t){pl=t(pl)}function IA(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Fc(this),e,...n);return Ng.set(r,e.sort?e.sort():[e]),lr(r)}:_A().includes(t)?function(...e){return t.apply(Fc(this),e),lr(xg.get(this))}:function(...e){return lr(t.apply(Fc(this),e))}}function TA(t){return typeof t=="function"?IA(t):(t instanceof IDBTransaction&&vA(t),mA(t,gA())?new Proxy(t,pl):t)}function lr(t){if(t instanceof IDBRequest)return yA(t);if(Lc.has(t))return Lc.get(t);const e=TA(t);return e!==t&&(Lc.set(t,e),uu.set(e,t)),e}const Fc=t=>uu.get(t);function wA(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=lr(o);return r&&o.addEventListener("upgradeneeded",l=>{r(lr(o.result),l.oldVersion,l.newVersion,lr(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const AA=["get","getKey","getAll","getAllKeys","count"],bA=["put","add","delete","clear"],Uc=new Map;function od(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Uc.get(e))return Uc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=bA.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||AA.includes(n)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(c.shift())),(await Promise.all([u[n](...c),s&&l.done]))[0]};return Uc.set(e,i),i}EA(t=>({...t,get:(e,n,r)=>od(e,n)||t.get(e,n,r),has:(e,n)=>!!od(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RA{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(SA(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function SA(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ml="@firebase/app",ad="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=new lu("@firebase/app"),CA="@firebase/app-compat",PA="@firebase/analytics-compat",xA="@firebase/analytics",NA="@firebase/app-check-compat",kA="@firebase/app-check",DA="@firebase/auth",OA="@firebase/auth-compat",VA="@firebase/database",MA="@firebase/data-connect",LA="@firebase/database-compat",FA="@firebase/functions",UA="@firebase/functions-compat",BA="@firebase/installations",jA="@firebase/installations-compat",$A="@firebase/messaging",qA="@firebase/messaging-compat",HA="@firebase/performance",WA="@firebase/performance-compat",GA="@firebase/remote-config",zA="@firebase/remote-config-compat",KA="@firebase/storage",QA="@firebase/storage-compat",JA="@firebase/firestore",YA="@firebase/ai",XA="@firebase/firestore-compat",ZA="firebase",e0="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl="[DEFAULT]",t0={[ml]:"fire-core",[CA]:"fire-core-compat",[xA]:"fire-analytics",[PA]:"fire-analytics-compat",[kA]:"fire-app-check",[NA]:"fire-app-check-compat",[DA]:"fire-auth",[OA]:"fire-auth-compat",[VA]:"fire-rtdb",[MA]:"fire-data-connect",[LA]:"fire-rtdb-compat",[FA]:"fire-fn",[UA]:"fire-fn-compat",[BA]:"fire-iid",[jA]:"fire-iid-compat",[$A]:"fire-fcm",[qA]:"fire-fcm-compat",[HA]:"fire-perf",[WA]:"fire-perf-compat",[GA]:"fire-rc",[zA]:"fire-rc-compat",[KA]:"fire-gcs",[QA]:"fire-gcs-compat",[JA]:"fire-fst",[XA]:"fire-fst-compat",[YA]:"fire-vertex","fire-js":"fire-js",[ZA]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aa=new Map,n0=new Map,_l=new Map;function cd(t,e){try{t.container.addComponent(e)}catch(n){Vn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ns(t){const e=t.name;if(_l.has(e))return Vn.debug(`There were multiple attempts to register component ${e}.`),!1;_l.set(e,t);for(const n of aa.values())cd(n,t);for(const n of n0.values())cd(n,t);return!0}function hu(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Qt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ur=new eo("app","Firebase",r0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s0{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new zr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ur.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bs=e0;function kg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:gl,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw ur.create("bad-app-name",{appName:String(s)});if(n||(n=Rg()),!n)throw ur.create("no-options");const i=aa.get(s);if(i){if(Gr(n,i.options)&&Gr(r,i.config))return i;throw ur.create("duplicate-app",{appName:s})}const o=new uA(s);for(const l of _l.values())o.addComponent(l);const c=new s0(n,r,o);return aa.set(s,c),c}function Dg(t=gl){const e=aa.get(t);if(!e&&t===gl&&Rg())return kg();if(!e)throw ur.create("no-app",{appName:t});return e}function hr(t,e,n){var r;let s=(r=t0[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vn.warn(c.join(" "));return}Ns(new zr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i0="firebase-heartbeat-database",o0=1,Bi="firebase-heartbeat-store";let Bc=null;function Og(){return Bc||(Bc=wA(i0,o0,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Bi)}catch(n){console.warn(n)}}}}).catch(t=>{throw ur.create("idb-open",{originalErrorMessage:t.message})})),Bc}async function a0(t){try{const n=(await Og()).transaction(Bi),r=await n.objectStore(Bi).get(Vg(t));return await n.done,r}catch(e){if(e instanceof jn)Vn.warn(e.message);else{const n=ur.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Vn.warn(n.message)}}}async function ld(t,e){try{const r=(await Og()).transaction(Bi,"readwrite");await r.objectStore(Bi).put(e,Vg(t)),await r.done}catch(n){if(n instanceof jn)Vn.warn(n.message);else{const r=ur.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Vn.warn(r.message)}}}function Vg(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c0=1024,l0=30;class u0{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new f0(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ud();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>l0){const o=d0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Vn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ud(),{heartbeatsToSend:r,unsentEntries:s}=h0(this._heartbeatsCache.heartbeats),i=oa(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Vn.warn(n),""}}}function ud(){return new Date().toISOString().substring(0,10)}function h0(t,e=c0){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),hd(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),hd(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class f0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Xw()?Zw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await a0(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return ld(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return ld(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function hd(t){return oa(JSON.stringify({version:2,heartbeats:t})).length}function d0(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p0(t){Ns(new zr("platform-logger",e=>new RA(e),"PRIVATE")),Ns(new zr("heartbeat",e=>new u0(e),"PRIVATE")),hr(ml,ad,t),hr(ml,ad,"esm2017"),hr("fire-js","")}p0("");function fu(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Mg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const m0=Mg,Lg=new eo("auth","Firebase",Mg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca=new lu("@firebase/auth");function g0(t,...e){ca.logLevel<=ve.WARN&&ca.warn(`Auth (${Bs}): ${t}`,...e)}function jo(t,...e){ca.logLevel<=ve.ERROR&&ca.error(`Auth (${Bs}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(t,...e){throw du(t,...e)}function dn(t,...e){return du(t,...e)}function Fg(t,e,n){const r=Object.assign(Object.assign({},m0()),{[e]:n});return new eo("auth","Firebase",r).create(e,{appName:t.name})}function fr(t){return Fg(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function du(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Lg.create(t,...e)}function ae(t,e,...n){if(!t)throw du(e,...n)}function Pn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw jo(e),new Error(e)}function Mn(t,e){t||Pn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function _0(){return fd()==="http:"||fd()==="https:"}function fd(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y0(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_0()||Kw()||"connection"in navigator)?navigator.onLine:!0}function v0(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,n){this.shortDelay=e,this.longDelay=n,Mn(n>e,"Short delay should be less than long delay!"),this.isMobile=Ww()||Qw()}get(){return y0()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(t,e){Mn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E0={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I0=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],T0=new no(3e4,6e4);function Xr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function br(t,e,n,r,s={}){return Bg(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=to(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const u=Object.assign({method:e,headers:l},i);return zw()||(u.referrerPolicy="no-referrer"),t.emulatorConfig&&Us(t.emulatorConfig.host)&&(u.credentials="include"),Ug.fetch()(await jg(t,t.config.apiHost,n,c),u)})}async function Bg(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},E0),e);try{const s=new A0(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw No(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw No(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw No(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw No(t,"user-disabled",o);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Fg(t,f,u);rn(t,f)}}catch(s){if(s instanceof jn)throw s;rn(t,"network-request-failed",{message:String(s)})}}async function ja(t,e,n,r,s={}){const i=await br(t,e,n,r,s);return"mfaPendingCredential"in i&&rn(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function jg(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?pu(t.config,s):`${t.config.apiScheme}://${s}`;return I0.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function w0(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class A0{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(dn(this.auth,"network-request-failed")),T0.get())})}}function No(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=dn(t,e,r);return s.customData._tokenResponse=n,s}function dd(t){return t!==void 0&&t.enterprise!==void 0}class b0{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return w0(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function R0(t,e){return br(t,"GET","/v2/recaptchaConfig",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function S0(t,e){return br(t,"POST","/v1/accounts:delete",e)}async function la(t,e){return br(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function C0(t,e=!1){const n=At(t),r=await n.getIdToken(e),s=mu(r);ae(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Si(jc(s.auth_time)),issuedAtTime:Si(jc(s.iat)),expirationTime:Si(jc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function jc(t){return Number(t)*1e3}function mu(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return jo("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ag(n);return s?JSON.parse(s):(jo("Failed to decode base64 JWT payload"),null)}catch(s){return jo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function pd(t){const e=mu(t);return ae(e,"internal-error"),ae(typeof e.exp<"u","internal-error"),ae(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ji(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof jn&&P0(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function P0({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x0{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Si(this.lastLoginAt),this.creationTime=Si(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ua(t){var e;const n=t.auth,r=await t.getIdToken(),s=await ji(t,la(n,{idToken:r}));ae(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?$g(i.providerUserInfo):[],c=k0(t.providerData,o),l=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(c!=null&&c.length),f=l?u:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new vl(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(t,p)}async function N0(t){const e=At(t);await ua(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function k0(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function $g(t){return t.map(e=>{var{providerId:n}=e,r=fu(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D0(t,e){const n=await Bg(t,{},async()=>{const r=to({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await jg(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return t.emulatorConfig&&Us(t.emulatorConfig.host)&&(l.credentials="include"),Ug.fetch()(o,l)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function O0(t,e){return br(t,"POST","/v2/accounts:revokeToken",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ae(e.idToken,"internal-error"),ae(typeof e.idToken<"u","internal-error"),ae(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):pd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){ae(e.length!==0,"internal-error");const n=pd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ae(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await D0(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new ws;return r&&(ae(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ae(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ae(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ws,this.toJSON())}_performRefresh(){return Pn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(t,e){ae(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Yt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=fu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new x0(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new vl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ji(this,this.stsTokenManager.getToken(this.auth,e));return ae(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return C0(this,e)}reload(){return N0(this)}_assign(e){this!==e&&(ae(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Yt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){ae(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await ua(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qt(this.auth.app))return Promise.reject(fr(this.auth));const e=await this.getIdToken();return await ji(this,S0(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,c,l,u,f;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,m=(s=n.email)!==null&&s!==void 0?s:void 0,v=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,C=(o=n.photoURL)!==null&&o!==void 0?o:void 0,x=(c=n.tenantId)!==null&&c!==void 0?c:void 0,k=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,j=(u=n.createdAt)!==null&&u!==void 0?u:void 0,U=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:$,emailVerified:q,isAnonymous:ee,providerData:oe,stsTokenManager:b}=n;ae($&&b,e,"internal-error");const y=ws.fromJSON(this.name,b);ae(typeof $=="string",e,"internal-error"),Qn(p,e.name),Qn(m,e.name),ae(typeof q=="boolean",e,"internal-error"),ae(typeof ee=="boolean",e,"internal-error"),Qn(v,e.name),Qn(C,e.name),Qn(x,e.name),Qn(k,e.name),Qn(j,e.name),Qn(U,e.name);const _=new Yt({uid:$,auth:e,email:m,emailVerified:q,displayName:p,isAnonymous:ee,photoURL:C,phoneNumber:v,tenantId:x,stsTokenManager:y,createdAt:j,lastLoginAt:U});return oe&&Array.isArray(oe)&&(_.providerData=oe.map(T=>Object.assign({},T))),k&&(_._redirectEventId=k),_}static async _fromIdTokenResponse(e,n,r=!1){const s=new ws;s.updateFromServerResponse(n);const i=new Yt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ua(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];ae(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?$g(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new ws;c.updateFromIdToken(r);const l=new Yt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new vl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md=new Map;function xn(t){Mn(t instanceof Function,"Expected a class definition");let e=md.get(t);return e?(Mn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,md.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}qg.type="NONE";const gd=qg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $o(t,e,n){return`firebase:${t}:${e}:${n}`}class As{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=$o(this.userKey,s.apiKey,i),this.fullPersistenceKey=$o("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await la(this.auth,{idToken:e}).catch(()=>{});return n?Yt._fromGetAccountInfoResponse(this.auth,n,e):null}return Yt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new As(xn(gd),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||xn(gd);const o=$o(r,e.config.apiKey,e.name);let c=null;for(const u of n)try{const f=await u._get(o);if(f){let p;if(typeof f=="string"){const m=await la(e,{idToken:f}).catch(()=>{});if(!m)break;p=await Yt._fromGetAccountInfoResponse(e,m,f)}else p=Yt._fromJSON(e,f);u!==i&&(c=p),i=u;break}}catch{}const l=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new As(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new As(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(zg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Hg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Qg(e))return"Blackberry";if(Jg(e))return"Webos";if(Wg(e))return"Safari";if((e.includes("chrome/")||Gg(e))&&!e.includes("edge/"))return"Chrome";if(Kg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Hg(t=wt()){return/firefox\//i.test(t)}function Wg(t=wt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Gg(t=wt()){return/crios\//i.test(t)}function zg(t=wt()){return/iemobile/i.test(t)}function Kg(t=wt()){return/android/i.test(t)}function Qg(t=wt()){return/blackberry/i.test(t)}function Jg(t=wt()){return/webos/i.test(t)}function gu(t=wt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function V0(t=wt()){var e;return gu(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function M0(){return Jw()&&document.documentMode===10}function Yg(t=wt()){return gu(t)||Kg(t)||Jg(t)||Qg(t)||/windows phone/i.test(t)||zg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xg(t,e=[]){let n;switch(t){case"Browser":n=_d(wt());break;case"Worker":n=`${_d(wt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Bs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function F0(t,e={}){return br(t,"GET","/v2/passwordPolicy",Xr(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U0=6;class B0{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:U0,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j0{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new yd(this),this.idTokenSubscription=new yd(this),this.beforeStateQueue=new L0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Lg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=xn(n)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await As.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await la(this,{idToken:e}),r=await Yt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Qt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ae(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ua(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=v0()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qt(this.app))return Promise.reject(fr(this));const n=e?At(e):null;return n&&ae(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ae(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qt(this.app)?Promise.reject(fr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qt(this.app)?Promise.reject(fr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(xn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await F0(this),n=new B0(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new eo("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await O0(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&xn(e)||this._popupRedirectResolver;ae(n,this,"argument-error"),this.redirectPersistenceManager=await As.create(this,[xn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(ae(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ae(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;if(Qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&g0(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function js(t){return At(t)}class yd{constructor(e){this.auth=e,this.observer=null,this.addObserver=sA(n=>this.observer=n)}get next(){return ae(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $a={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function $0(t){$a=t}function Zg(t){return $a.loadJS(t)}function q0(){return $a.recaptchaEnterpriseScript}function H0(){return $a.gapiScript}function W0(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class G0{constructor(){this.enterprise=new z0}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class z0{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const K0="recaptcha-enterprise",e_="NO_RECAPTCHA";class Q0{constructor(e){this.type=K0,this.auth=js(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{R0(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const u=new b0(l);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;dd(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(e_)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new G0().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!n&&dd(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=q0();l.length!==0&&(l+=c),Zg(l).then(()=>{s(c,i,o)}).catch(u=>{o(u)})}}).catch(c=>{o(c)})})}}async function vd(t,e,n,r=!1,s=!1){const i=new Q0(t);let o;if(s)o=e_;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const c=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,u=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ed(t,e,n,r,s){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await vd(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await vd(t,e,n,n==="getOobCode");return r(t,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J0(t,e){const n=hu(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Gr(i,e??{}))return s;rn(s,"already-initialized")}return n.initialize({options:e})}function Y0(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(xn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function X0(t,e,n){const r=js(t);ae(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=t_(e),{host:o,port:c}=Z0(e),l=c===null?"":`:${c}`,u={url:`${i}//${o}${l}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){ae(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),ae(Gr(u,r.config.emulator)&&Gr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Us(o)?(Cg(`${i}//${o}${l}`),Pg("Auth",!0)):eb()}function t_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Z0(t){const e=t_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Id(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Id(o)}}}function Id(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function eb(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Pn("not implemented")}_getIdTokenResponse(e){return Pn("not implemented")}_linkToIdToken(e,n){return Pn("not implemented")}_getReauthenticationResolver(e){return Pn("not implemented")}}async function tb(t,e){return br(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nb(t,e){return ja(t,"POST","/v1/accounts:signInWithPassword",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rb(t,e){return ja(t,"POST","/v1/accounts:signInWithEmailLink",Xr(t,e))}async function sb(t,e){return ja(t,"POST","/v1/accounts:signInWithEmailLink",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i extends _u{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new $i(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new $i(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ed(e,n,"signInWithPassword",nb);case"emailLink":return rb(e,{email:this._email,oobCode:this._password});default:rn(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ed(e,r,"signUpPassword",tb);case"emailLink":return sb(e,{idToken:n,email:this._email,oobCode:this._password});default:rn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bs(t,e){return ja(t,"POST","/v1/accounts:signInWithIdp",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ib="http://localhost";class Kr extends _u{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Kr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):rn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=fu(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Kr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return bs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,bs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,bs(e,n)}buildRequest(){const e={requestUri:ib,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=to(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ob(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function ab(t){const e=hi(fi(t)).link,n=e?hi(fi(e)).deep_link_id:null,r=hi(fi(t)).deep_link_id;return(r?hi(fi(r)).link:null)||r||n||e||t}class yu{constructor(e){var n,r,s,i,o,c;const l=hi(fi(e)),u=(n=l.apiKey)!==null&&n!==void 0?n:null,f=(r=l.oobCode)!==null&&r!==void 0?r:null,p=ob((s=l.mode)!==null&&s!==void 0?s:null);ae(u&&f&&p,"argument-error"),this.apiKey=u,this.operation=p,this.code=f,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.lang)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=ab(e);try{return new yu(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(){this.providerId=$s.PROVIDER_ID}static credential(e,n){return $i._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=yu.parseLink(n);return ae(r,"argument-error"),$i._fromEmailAndCode(e,r.code,r.tenantId)}}$s.PROVIDER_ID="password";$s.EMAIL_PASSWORD_SIGN_IN_METHOD="password";$s.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro extends n_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr extends ro{constructor(){super("facebook.com")}static credential(e){return Kr._fromParams({providerId:nr.PROVIDER_ID,signInMethod:nr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nr.credentialFromTaggedObject(e)}static credentialFromError(e){return nr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nr.credential(e.oauthAccessToken)}catch{return null}}}nr.FACEBOOK_SIGN_IN_METHOD="facebook.com";nr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr extends ro{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Kr._fromParams({providerId:rr.PROVIDER_ID,signInMethod:rr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return rr.credentialFromTaggedObject(e)}static credentialFromError(e){return rr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return rr.credential(n,r)}catch{return null}}}rr.GOOGLE_SIGN_IN_METHOD="google.com";rr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr extends ro{constructor(){super("github.com")}static credential(e){return Kr._fromParams({providerId:sr.PROVIDER_ID,signInMethod:sr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sr.credentialFromTaggedObject(e)}static credentialFromError(e){return sr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sr.credential(e.oauthAccessToken)}catch{return null}}}sr.GITHUB_SIGN_IN_METHOD="github.com";sr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir extends ro{constructor(){super("twitter.com")}static credential(e,n){return Kr._fromParams({providerId:ir.PROVIDER_ID,signInMethod:ir.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ir.credentialFromTaggedObject(e)}static credentialFromError(e){return ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ir.credential(n,r)}catch{return null}}}ir.TWITTER_SIGN_IN_METHOD="twitter.com";ir.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Yt._fromIdTokenResponse(e,r,s),o=Td(r);return new ks({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Td(r);return new ks({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Td(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha extends jn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ha.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new ha(e,n,r,s)}}function r_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ha._fromErrorAndOperation(t,i,e,r):i})}async function cb(t,e,n=!1){const r=await ji(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ks._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lb(t,e,n=!1){const{auth:r}=t;if(Qt(r.app))return Promise.reject(fr(r));const s="reauthenticate";try{const i=await ji(t,r_(r,s,e,t),n);ae(i.idToken,r,"internal-error");const o=mu(i.idToken);ae(o,r,"internal-error");const{sub:c}=o;return ae(t.uid===c,r,"user-mismatch"),ks._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&rn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function s_(t,e,n=!1){if(Qt(t.app))return Promise.reject(fr(t));const r="signIn",s=await r_(t,r,e),i=await ks._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function ub(t,e){return s_(js(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hb(t){const e=js(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function fb(t,e,n){return Qt(t.app)?Promise.reject(fr(t)):ub(At(t),$s.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&hb(t),r})}function db(t,e,n,r){return At(t).onIdTokenChanged(e,n,r)}function pb(t,e,n){return At(t).beforeAuthStateChanged(e,n)}function mb(t,e,n,r){return At(t).onAuthStateChanged(e,n,r)}function gb(t){return At(t).signOut()}const fa="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(fa,"1"),this.storage.removeItem(fa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _b=1e3,yb=10;class o_ extends i_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Yg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);M0()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,yb):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},_b)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}o_.type="LOCAL";const vb=o_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_ extends i_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}a_.type="SESSION";const c_=a_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eb(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new qa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async u=>u(n.origin,i)),l=await Eb(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}qa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vu(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ib{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const u=vu("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===u)switch(m.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(){return window}function Tb(t){pn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(){return typeof pn().WorkerGlobalScope<"u"&&typeof pn().importScripts=="function"}async function wb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ab(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function bb(){return l_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_="firebaseLocalStorageDb",Rb=1,da="firebaseLocalStorage",h_="fbase_key";class so{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ha(t,e){return t.transaction([da],e?"readwrite":"readonly").objectStore(da)}function Sb(){const t=indexedDB.deleteDatabase(u_);return new so(t).toPromise()}function El(){const t=indexedDB.open(u_,Rb);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(da,{keyPath:h_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(da)?e(r):(r.close(),await Sb(),e(await El()))})})}async function wd(t,e,n){const r=Ha(t,!0).put({[h_]:e,value:n});return new so(r).toPromise()}async function Cb(t,e){const n=Ha(t,!1).get(e),r=await new so(n).toPromise();return r===void 0?null:r.value}function Ad(t,e){const n=Ha(t,!0).delete(e);return new so(n).toPromise()}const Pb=800,xb=3;class f_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await El(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>xb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return l_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=qa._getInstance(bb()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await wb(),!this.activeServiceWorker)return;this.sender=new Ib(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ab()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await El();return await wd(e,fa,"1"),await Ad(e,fa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>wd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Cb(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ad(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ha(s,!1).getAll();return new so(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Pb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}f_.type="LOCAL";const Nb=f_;new no(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kb(t,e){return e?xn(e):(ae(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu extends _u{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return bs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return bs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return bs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Db(t){return s_(t.auth,new Eu(t),t.bypassAuthState)}function Ob(t){const{auth:e,user:n}=t;return ae(n,e,"internal-error"),lb(n,new Eu(t),t.bypassAuthState)}async function Vb(t){const{auth:e,user:n}=t;return ae(n,e,"internal-error"),cb(n,new Eu(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Db;case"linkViaPopup":case"linkViaRedirect":return Vb;case"reauthViaPopup":case"reauthViaRedirect":return Ob;default:rn(this.auth,"internal-error")}}resolve(e){Mn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Mn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb=new no(2e3,1e4);class ys extends d_{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ys.currentPopupAction&&ys.currentPopupAction.cancel(),ys.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ae(e,this.auth,"internal-error"),e}async onExecution(){Mn(this.filter.length===1,"Popup operations only handle one event");const e=vu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(dn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(dn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ys.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(dn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Mb.get())};e()}}ys.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lb="pendingRedirect",qo=new Map;class Fb extends d_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=qo.get(this.auth._key());if(!e){try{const r=await Ub(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}qo.set(this.auth._key(),e)}return this.bypassAuthState||qo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ub(t,e){const n=$b(e),r=jb(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Bb(t,e){qo.set(t._key(),e)}function jb(t){return xn(t._redirectPersistence)}function $b(t){return $o(Lb,t.config.apiKey,t.name)}async function qb(t,e,n=!1){if(Qt(t.app))return Promise.reject(fr(t));const r=js(t),s=kb(r,e),o=await new Fb(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hb=10*60*1e3;class Wb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Gb(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!p_(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(dn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Hb&&this.cachedEventUids.clear(),this.cachedEventUids.has(bd(e))}saveEventToCache(e){this.cachedEventUids.add(bd(e)),this.lastProcessedEventTime=Date.now()}}function bd(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function p_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Gb(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return p_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zb(t,e={}){return br(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Qb=/^https?/;async function Jb(t){if(t.config.emulator)return;const{authorizedDomains:e}=await zb(t);for(const n of e)try{if(Yb(n))return}catch{}rn(t,"unauthorized-domain")}function Yb(t){const e=yl(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Qb.test(n))return!1;if(Kb.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xb=new no(3e4,6e4);function Rd(){const t=pn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Zb(t){return new Promise((e,n)=>{var r,s,i;function o(){Rd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Rd(),n(dn(t,"network-request-failed"))},timeout:Xb.get()})}if(!((s=(r=pn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=pn().gapi)===null||i===void 0)&&i.load)o();else{const c=W0("iframefcb");return pn()[c]=()=>{gapi.load?o():n(dn(t,"network-request-failed"))},Zg(`${H0()}?onload=${c}`).catch(l=>n(l))}}).catch(e=>{throw Ho=null,e})}let Ho=null;function eR(t){return Ho=Ho||Zb(t),Ho}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tR=new no(5e3,15e3),nR="__/auth/iframe",rR="emulator/auth/iframe",sR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},iR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function oR(t){const e=t.config;ae(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?pu(e,rR):`https://${t.config.authDomain}/${nR}`,r={apiKey:e.apiKey,appName:t.name,v:Bs},s=iR.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${to(r).slice(1)}`}async function aR(t){const e=await eR(t),n=pn().gapi;return ae(n,t,"internal-error"),e.open({where:document.body,url:oR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:sR,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=dn(t,"network-request-failed"),c=pn().setTimeout(()=>{i(o)},tR.get());function l(){pn().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},lR=500,uR=600,hR="_blank",fR="http://localhost";class Sd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function dR(t,e,n,r=lR,s=uR){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},cR),{width:r.toString(),height:s.toString(),top:i,left:o}),u=wt().toLowerCase();n&&(c=Gg(u)?hR:n),Hg(u)&&(e=e||fR,l.scrollbars="yes");const f=Object.entries(l).reduce((m,[v,C])=>`${m}${v}=${C},`,"");if(V0(u)&&c!=="_self")return pR(e||"",c),new Sd(null);const p=window.open(e||"",c,f);ae(p,t,"popup-blocked");try{p.focus()}catch{}return new Sd(p)}function pR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR="__/auth/handler",gR="emulator/auth/handler",_R=encodeURIComponent("fac");async function Cd(t,e,n,r,s,i){ae(t.config.authDomain,t,"auth-domain-config-required"),ae(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Bs,eventId:s};if(e instanceof n_){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",rA(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof ro){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await t._getAppCheckToken(),u=l?`#${_R}=${encodeURIComponent(l)}`:"";return`${yR(t)}?${to(c).slice(1)}${u}`}function yR({config:t}){return t.emulator?pu(t,gR):`https://${t.authDomain}/${mR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c="webStorageSupport";class vR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=c_,this._completeRedirectFn=qb,this._overrideRedirectResult=Bb}async _openPopup(e,n,r,s){var i;Mn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Cd(e,n,r,yl(),s);return dR(e,o,vu())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Cd(e,n,r,yl(),s);return Tb(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Mn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await aR(e),r=new Wb(e);return n.register("authEvent",s=>(ae(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send($c,{type:$c},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[$c];o!==void 0&&n(!!o),rn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Jb(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Yg()||Wg()||gu()}}const ER=vR;var Pd="@firebase/auth",xd="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ae(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TR(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function wR(t){Ns(new zr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;ae(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xg(t)},u=new j0(r,s,i,l);return Y0(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ns(new zr("auth-internal",e=>{const n=js(e.getProvider("auth").getImmediate());return(r=>new IR(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),hr(Pd,xd,TR(t)),hr(Pd,xd,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AR=5*60,bR=Sg("authIdTokenMaxAge")||AR;let Nd=null;const RR=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>bR)return;const s=n==null?void 0:n.token;Nd!==s&&(Nd=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function m_(t=Dg()){const e=hu(t,"auth");if(e.isInitialized())return e.getImmediate();const n=J0(t,{popupRedirectResolver:ER,persistence:[Nb,vb,c_]}),r=Sg("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=RR(i.toString());pb(n,o,()=>o(n.currentUser)),db(n,c=>o(c))}}const s=bg("auth");return s&&X0(n,`http://${s}`),n}function SR(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}$0({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=dn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",SR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});wR("Browser");var CR="firebase",PR="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */hr(CR,PR,"app");const xR={apiKey:"AIzaSyCoY_qIkL3lLysUcgbXkCxCs6S8XOMzMyw",authDomain:"",projectId:"level-approach-479119-b3",storageBucket:"level-approach-479119-b3.firebasestorage.app",messagingSenderId:"",appId:""},Iu=kg(xR),NR=iu("user",{state:()=>({user:null,loading:!1}),getters:{isAuthenticated:t=>!!t.user},actions:{setUser(t){this.user=t},setLoading(t){this.loading=t}}}),qc=m_(Iu);let kd=null;function kR(){const t=NR(),{user:e}=ag(t),n=kt(!1),r=kt(null);kd||(kd=mb(qc,c=>{t.setUser(c)}));const s=async(c,l)=>{n.value=!0,r.value=null;try{await fb(qc,c,l)}catch(u){throw r.value=u instanceof Error?u.message:"Failed to sign in",u}finally{n.value=!1}},i=async()=>{await gb(qc),t.setUser(null)},o=je(()=>!!e.value);return{user:e,isAuthenticated:o,loginWithEmail:s,logout:i,loading:n,error:r}}const DR={class:"mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"},OR={class:"block space-y-2 text-sm font-medium text-slate-600"},VR={class:"block space-y-2 text-sm font-medium text-slate-600"},MR=["disabled"],LR={key:0,class:"text-sm text-rose-600"},FR=Gt({__name:"LoginPage",setup(t){const{loginWithEmail:e}=kR(),{notifySuccess:n,notifyError:r}=cu(),s=Fs({email:"",password:"",loading:!1,error:null}),i=async()=>{s.loading=!0,s.error=null;try{await e(s.email,s.password),n("Signed in successfully")}catch(o){const c=o instanceof Error?o.message:"Unable to sign in";s.error=c,r(c)}finally{s.loading=!1}};return(o,c)=>(Oe(),Ze("section",DR,[c[4]||(c[4]=J("h2",{class:"text-2xl font-semibold text-slate-900"},"Sign in",-1)),c[5]||(c[5]=J("p",{class:"mb-6 mt-2 text-sm text-slate-500"},"Use your procurement workspace credentials.",-1)),J("form",{class:"space-y-5",onSubmit:XI(i,["prevent"])},[J("label",OR,[c[2]||(c[2]=Jt(" Email ",-1)),tf(J("input",{"onUpdate:modelValue":c[0]||(c[0]=l=>s.email=l),type:"email",required:"",class:"w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"},null,512),[[Of,s.email]])]),J("label",VR,[c[3]||(c[3]=Jt(" Password ",-1)),tf(J("input",{"onUpdate:modelValue":c[1]||(c[1]=l=>s.password=l),type:"password",required:"",class:"w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"},null,512),[[Of,s.password]])]),J("button",{disabled:s.loading,type:"submit",class:"w-full rounded-xl bg-primary-600 px-4 py-3 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"},Be(s.loading?"Signing in...":"Continue"),9,MR),s.error?(Oe(),Ze("p",LR,Be(s.error),1)):Lr("",!0)],32)]))}}),UR=Gt({__name:"CameraButton",emits:["select"],setup(t,{emit:e}){const n=e,r=kt(null),s=()=>{var o;(o=r.value)==null||o.click()},i=o=>{var u;const c=o.target,l=(u=c.files)==null?void 0:u[0];l&&n("select",l),c&&(c.value="")};return(o,c)=>(Oe(),Ze("div",null,[J("input",{ref_key:"fileInput",ref:r,type:"file",accept:"image/*",capture:"environment",class:"hidden",onChange:i},null,544),J("button",{type:"button",class:"flex w-full items-center justify-center rounded-xl bg-primary-600 px-6 py-4 font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700",onClick:s},[xE(o.$slots,"default",{},()=>[c[0]||(c[0]=Jt("Use Camera or Upload",-1))])])]))}}),Tu=Gt({__name:"StatusBadge",props:{status:{}},setup(t){const e=t,n={pending:"Pending",processing:"Processing",uploaded:"Uploaded",failed:"Failed"},r={pending:"bg-amber-100 text-amber-700",processing:"bg-sky-100 text-sky-700",uploaded:"bg-emerald-100 text-emerald-700",failed:"bg-rose-100 text-rose-700"},s=je(()=>`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${r[e.status]}`),i=je(()=>n[e.status]);return(o,c)=>(Oe(),Ze("span",{class:Yi(s.value)},Be(i.value),3))}}),g_=t=>{if(!t)return"Unknown";const e=typeof t=="string"?new Date(t):t;return new Intl.DateTimeFormat("en",{dateStyle:"medium",timeStyle:"short"}).format(e)},BR={class:"flex items-center justify-between"},jR={class:"text-base font-semibold text-slate-900"},$R={class:"mt-2 text-sm text-slate-500"},qR={class:"text-sm text-slate-500"},HR={class:"mt-2 text-lg font-semibold text-slate-900"},WR={class:"mt-4 flex items-center justify-between text-xs text-slate-400"},__=Gt({__name:"InvoiceCard",props:{invoice:{}},emits:["select"],setup(t,{emit:e}){const n=t,r=e,s=je(()=>g_(n.invoice.uploadedAt)),i=()=>r("select",n.invoice.id);return(o,c)=>(Oe(),Ze("article",{class:"rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",onClick:i},[J("header",BR,[J("h3",jR,Be(n.invoice.supplierName),1),xe(Tu,{status:n.invoice.status},null,8,["status"])]),J("p",$R,"Invoice ID: "+Be(n.invoice.id),1),J("p",qR,"Uploaded: "+Be(s.value),1),J("p",HR,Be(n.invoice.currency)+" "+Be(n.invoice.amount.toFixed(2)),1),J("footer",WR,[J("span",null,"Quality score: "+Be(n.invoice.quality.score),1),J("span",null,Be(n.invoice.statusMessage),1)])]))}}),GR={class:"flex items-center gap-3 py-6"},zR={class:"text-sm font-medium text-slate-500"},y_=Gt({__name:"Loader",props:{label:{default:"Processing..."}},setup(t){const e=t;return(n,r)=>(Oe(),Ze("div",GR,[r[0]||(r[0]=J("span",{class:"inline-flex h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-primary-500"},null,-1)),J("p",zR,Be(e.label),1)]))}}),KR=t=>{var e;return((e=t.split(".").pop())==null?void 0:e.toLowerCase())??"jpg"};class QR{constructor(e){this.deps=e}async run(e,n){n==null||n(10);const r=await this.deps.detectQuality(e);if(!r.accepted)throw new Error(r.reasons[0]??"Quality check failed");n==null||n(30);const s=this.deps.generateInvoiceId(),i=KR(e.name)||"jpg",o=`${s}.${i}`,c=await this.deps.requestSignedUrl({filename:o,contentType:e.type||"image/jpeg"});if(n==null||n(60),!(await fetch(c.uploadUrl,{method:"PUT",headers:{"Content-Type":e.type,...c.headers??{}},body:e})).ok)throw new Error("Upload to signed URL failed");n==null||n(85);const u=await this.deps.detectSupplier(e),f=this.deps.mapInvoice({id:s,supplierName:u==null?void 0:u.name,amount:(u==null?void 0:u.amountHint)??0,currency:(u==null?void 0:u.currency)??"USD",quality:r,status:"processing",statusMessage:"Uploaded and waiting for processing",fileUrl:c.fileUrl});return n==null||n(100),f}}const Dd=1024,Od=768,Vd=10*1024*1024;async function JR(t){var u;const e=await YR(t),n=e.width,r=e.height;(u=e.close)==null||u.call(e);const s=[];t.size>Vd&&s.push("File too large"),(n<Dd||r<Od)&&s.push("Resolution too low");const i=Math.min(100,Math.round(n*r/(Dd*Od)*60)),o=Math.max(0,40-Math.round(t.size/Vd*40)),c=Math.min(100,i+o),l=s.length===0;return{score:c,accepted:l,reasons:s,width:n,height:r}}const YR=async t=>{if(typeof window<"u"&&"createImageBitmap"in window)return createImageBitmap(t);if(typeof document>"u")throw new Error("Image APIs are not available in this environment");return new Promise((e,n)=>{const r=new Image;r.onload=()=>{createImageBitmap(r).then(e).catch(n)},r.onerror=n,r.src=URL.createObjectURL(t)})};async function XR(t){return JR(t)}const ZR=()=>Ig(),eS=t=>({id:t.id,supplierName:t.supplierName??"Unknown supplier",amount:t.amount??0,currency:t.currency??"USD",status:t.status??"processing",statusMessage:t.statusMessage??"Queued for extraction",uploadedAt:t.uploadedAt??new Date().toISOString(),quality:t.quality??{score:0,accepted:!1,reasons:[]},fileUrl:t.fileUrl??""}),Md={acme:{name:"ACME Supplies",amountHint:1250,currency:"USD",confidence:.64},globex:{name:"Globex Corporation",amountHint:980.5,currency:"USD",confidence:.57},initech:{name:"Initech",amountHint:735.2,currency:"USD",confidence:.52}},tS=async t=>{const e=t.name.toLowerCase(),n=Object.keys(Md).find(r=>e.includes(r));return n?Md[n]:null},nS="https://us-central1-level-approach-479119-b3.cloudfunctions.net/getSignedUploadUrl",rS="uploads",sS=m_(Iu),iS=async t=>{const e=sS.currentUser;if(!e)throw new Error("User must be signed in to request uploads");const n=await e.getIdToken(),r=await fetch(nS,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({filename:t.filename,contentType:t.contentType,folder:t.folder??rS})});if(!r.ok)throw new Error("Failed to request signed URL");return r.json()};var Ld=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var dr,v_;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,y){function _(){}_.prototype=y.prototype,b.D=y.prototype,b.prototype=new _,b.prototype.constructor=b,b.C=function(T,R,w){for(var E=Array(arguments.length-2),be=2;be<arguments.length;be++)E[be-2]=arguments[be];return y.prototype[R].apply(T,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(b,y,_){_||(_=0);var T=Array(16);if(typeof y=="string")for(var R=0;16>R;++R)T[R]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(R=0;16>R;++R)T[R]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=b.g[0],_=b.g[1],R=b.g[2];var w=b.g[3],E=y+(w^_&(R^w))+T[0]+3614090360&4294967295;y=_+(E<<7&4294967295|E>>>25),E=w+(R^y&(_^R))+T[1]+3905402710&4294967295,w=y+(E<<12&4294967295|E>>>20),E=R+(_^w&(y^_))+T[2]+606105819&4294967295,R=w+(E<<17&4294967295|E>>>15),E=_+(y^R&(w^y))+T[3]+3250441966&4294967295,_=R+(E<<22&4294967295|E>>>10),E=y+(w^_&(R^w))+T[4]+4118548399&4294967295,y=_+(E<<7&4294967295|E>>>25),E=w+(R^y&(_^R))+T[5]+1200080426&4294967295,w=y+(E<<12&4294967295|E>>>20),E=R+(_^w&(y^_))+T[6]+2821735955&4294967295,R=w+(E<<17&4294967295|E>>>15),E=_+(y^R&(w^y))+T[7]+4249261313&4294967295,_=R+(E<<22&4294967295|E>>>10),E=y+(w^_&(R^w))+T[8]+1770035416&4294967295,y=_+(E<<7&4294967295|E>>>25),E=w+(R^y&(_^R))+T[9]+2336552879&4294967295,w=y+(E<<12&4294967295|E>>>20),E=R+(_^w&(y^_))+T[10]+4294925233&4294967295,R=w+(E<<17&4294967295|E>>>15),E=_+(y^R&(w^y))+T[11]+2304563134&4294967295,_=R+(E<<22&4294967295|E>>>10),E=y+(w^_&(R^w))+T[12]+1804603682&4294967295,y=_+(E<<7&4294967295|E>>>25),E=w+(R^y&(_^R))+T[13]+4254626195&4294967295,w=y+(E<<12&4294967295|E>>>20),E=R+(_^w&(y^_))+T[14]+2792965006&4294967295,R=w+(E<<17&4294967295|E>>>15),E=_+(y^R&(w^y))+T[15]+1236535329&4294967295,_=R+(E<<22&4294967295|E>>>10),E=y+(R^w&(_^R))+T[1]+4129170786&4294967295,y=_+(E<<5&4294967295|E>>>27),E=w+(_^R&(y^_))+T[6]+3225465664&4294967295,w=y+(E<<9&4294967295|E>>>23),E=R+(y^_&(w^y))+T[11]+643717713&4294967295,R=w+(E<<14&4294967295|E>>>18),E=_+(w^y&(R^w))+T[0]+3921069994&4294967295,_=R+(E<<20&4294967295|E>>>12),E=y+(R^w&(_^R))+T[5]+3593408605&4294967295,y=_+(E<<5&4294967295|E>>>27),E=w+(_^R&(y^_))+T[10]+38016083&4294967295,w=y+(E<<9&4294967295|E>>>23),E=R+(y^_&(w^y))+T[15]+3634488961&4294967295,R=w+(E<<14&4294967295|E>>>18),E=_+(w^y&(R^w))+T[4]+3889429448&4294967295,_=R+(E<<20&4294967295|E>>>12),E=y+(R^w&(_^R))+T[9]+568446438&4294967295,y=_+(E<<5&4294967295|E>>>27),E=w+(_^R&(y^_))+T[14]+3275163606&4294967295,w=y+(E<<9&4294967295|E>>>23),E=R+(y^_&(w^y))+T[3]+4107603335&4294967295,R=w+(E<<14&4294967295|E>>>18),E=_+(w^y&(R^w))+T[8]+1163531501&4294967295,_=R+(E<<20&4294967295|E>>>12),E=y+(R^w&(_^R))+T[13]+2850285829&4294967295,y=_+(E<<5&4294967295|E>>>27),E=w+(_^R&(y^_))+T[2]+4243563512&4294967295,w=y+(E<<9&4294967295|E>>>23),E=R+(y^_&(w^y))+T[7]+1735328473&4294967295,R=w+(E<<14&4294967295|E>>>18),E=_+(w^y&(R^w))+T[12]+2368359562&4294967295,_=R+(E<<20&4294967295|E>>>12),E=y+(_^R^w)+T[5]+4294588738&4294967295,y=_+(E<<4&4294967295|E>>>28),E=w+(y^_^R)+T[8]+2272392833&4294967295,w=y+(E<<11&4294967295|E>>>21),E=R+(w^y^_)+T[11]+1839030562&4294967295,R=w+(E<<16&4294967295|E>>>16),E=_+(R^w^y)+T[14]+4259657740&4294967295,_=R+(E<<23&4294967295|E>>>9),E=y+(_^R^w)+T[1]+2763975236&4294967295,y=_+(E<<4&4294967295|E>>>28),E=w+(y^_^R)+T[4]+1272893353&4294967295,w=y+(E<<11&4294967295|E>>>21),E=R+(w^y^_)+T[7]+4139469664&4294967295,R=w+(E<<16&4294967295|E>>>16),E=_+(R^w^y)+T[10]+3200236656&4294967295,_=R+(E<<23&4294967295|E>>>9),E=y+(_^R^w)+T[13]+681279174&4294967295,y=_+(E<<4&4294967295|E>>>28),E=w+(y^_^R)+T[0]+3936430074&4294967295,w=y+(E<<11&4294967295|E>>>21),E=R+(w^y^_)+T[3]+3572445317&4294967295,R=w+(E<<16&4294967295|E>>>16),E=_+(R^w^y)+T[6]+76029189&4294967295,_=R+(E<<23&4294967295|E>>>9),E=y+(_^R^w)+T[9]+3654602809&4294967295,y=_+(E<<4&4294967295|E>>>28),E=w+(y^_^R)+T[12]+3873151461&4294967295,w=y+(E<<11&4294967295|E>>>21),E=R+(w^y^_)+T[15]+530742520&4294967295,R=w+(E<<16&4294967295|E>>>16),E=_+(R^w^y)+T[2]+3299628645&4294967295,_=R+(E<<23&4294967295|E>>>9),E=y+(R^(_|~w))+T[0]+4096336452&4294967295,y=_+(E<<6&4294967295|E>>>26),E=w+(_^(y|~R))+T[7]+1126891415&4294967295,w=y+(E<<10&4294967295|E>>>22),E=R+(y^(w|~_))+T[14]+2878612391&4294967295,R=w+(E<<15&4294967295|E>>>17),E=_+(w^(R|~y))+T[5]+4237533241&4294967295,_=R+(E<<21&4294967295|E>>>11),E=y+(R^(_|~w))+T[12]+1700485571&4294967295,y=_+(E<<6&4294967295|E>>>26),E=w+(_^(y|~R))+T[3]+2399980690&4294967295,w=y+(E<<10&4294967295|E>>>22),E=R+(y^(w|~_))+T[10]+4293915773&4294967295,R=w+(E<<15&4294967295|E>>>17),E=_+(w^(R|~y))+T[1]+2240044497&4294967295,_=R+(E<<21&4294967295|E>>>11),E=y+(R^(_|~w))+T[8]+1873313359&4294967295,y=_+(E<<6&4294967295|E>>>26),E=w+(_^(y|~R))+T[15]+4264355552&4294967295,w=y+(E<<10&4294967295|E>>>22),E=R+(y^(w|~_))+T[6]+2734768916&4294967295,R=w+(E<<15&4294967295|E>>>17),E=_+(w^(R|~y))+T[13]+1309151649&4294967295,_=R+(E<<21&4294967295|E>>>11),E=y+(R^(_|~w))+T[4]+4149444226&4294967295,y=_+(E<<6&4294967295|E>>>26),E=w+(_^(y|~R))+T[11]+3174756917&4294967295,w=y+(E<<10&4294967295|E>>>22),E=R+(y^(w|~_))+T[2]+718787259&4294967295,R=w+(E<<15&4294967295|E>>>17),E=_+(w^(R|~y))+T[9]+3951481745&4294967295,b.g[0]=b.g[0]+y&4294967295,b.g[1]=b.g[1]+(R+(E<<21&4294967295|E>>>11))&4294967295,b.g[2]=b.g[2]+R&4294967295,b.g[3]=b.g[3]+w&4294967295}r.prototype.u=function(b,y){y===void 0&&(y=b.length);for(var _=y-this.blockSize,T=this.B,R=this.h,w=0;w<y;){if(R==0)for(;w<=_;)s(this,b,w),w+=this.blockSize;if(typeof b=="string"){for(;w<y;)if(T[R++]=b.charCodeAt(w++),R==this.blockSize){s(this,T),R=0;break}}else for(;w<y;)if(T[R++]=b[w++],R==this.blockSize){s(this,T),R=0;break}}this.h=R,this.o+=y},r.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var y=1;y<b.length-8;++y)b[y]=0;var _=8*this.o;for(y=b.length-8;y<b.length;++y)b[y]=_&255,_/=256;for(this.u(b),b=Array(16),y=_=0;4>y;++y)for(var T=0;32>T;T+=8)b[_++]=this.g[y]>>>T&255;return b};function i(b,y){var _=c;return Object.prototype.hasOwnProperty.call(_,b)?_[b]:_[b]=y(b)}function o(b,y){this.h=y;for(var _=[],T=!0,R=b.length-1;0<=R;R--){var w=b[R]|0;T&&w==y||(_[R]=w,T=!1)}this.g=_}var c={};function l(b){return-128<=b&&128>b?i(b,function(y){return new o([y|0],0>y?-1:0)}):new o([b|0],0>b?-1:0)}function u(b){if(isNaN(b)||!isFinite(b))return p;if(0>b)return k(u(-b));for(var y=[],_=1,T=0;b>=_;T++)y[T]=b/_|0,_*=4294967296;return new o(y,0)}function f(b,y){if(b.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(b.charAt(0)=="-")return k(f(b.substring(1),y));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=u(Math.pow(y,8)),T=p,R=0;R<b.length;R+=8){var w=Math.min(8,b.length-R),E=parseInt(b.substring(R,R+w),y);8>w?(w=u(Math.pow(y,w)),T=T.j(w).add(u(E))):(T=T.j(_),T=T.add(u(E)))}return T}var p=l(0),m=l(1),v=l(16777216);t=o.prototype,t.m=function(){if(x(this))return-k(this).m();for(var b=0,y=1,_=0;_<this.g.length;_++){var T=this.i(_);b+=(0<=T?T:4294967296+T)*y,y*=4294967296}return b},t.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(C(this))return"0";if(x(this))return"-"+k(this).toString(b);for(var y=u(Math.pow(b,6)),_=this,T="";;){var R=q(_,y).g;_=j(_,R.j(y));var w=((0<_.g.length?_.g[0]:_.h)>>>0).toString(b);if(_=R,C(_))return w+T;for(;6>w.length;)w="0"+w;T=w+T}},t.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function C(b){if(b.h!=0)return!1;for(var y=0;y<b.g.length;y++)if(b.g[y]!=0)return!1;return!0}function x(b){return b.h==-1}t.l=function(b){return b=j(this,b),x(b)?-1:C(b)?0:1};function k(b){for(var y=b.g.length,_=[],T=0;T<y;T++)_[T]=~b.g[T];return new o(_,~b.h).add(m)}t.abs=function(){return x(this)?k(this):this},t.add=function(b){for(var y=Math.max(this.g.length,b.g.length),_=[],T=0,R=0;R<=y;R++){var w=T+(this.i(R)&65535)+(b.i(R)&65535),E=(w>>>16)+(this.i(R)>>>16)+(b.i(R)>>>16);T=E>>>16,w&=65535,E&=65535,_[R]=E<<16|w}return new o(_,_[_.length-1]&-2147483648?-1:0)};function j(b,y){return b.add(k(y))}t.j=function(b){if(C(this)||C(b))return p;if(x(this))return x(b)?k(this).j(k(b)):k(k(this).j(b));if(x(b))return k(this.j(k(b)));if(0>this.l(v)&&0>b.l(v))return u(this.m()*b.m());for(var y=this.g.length+b.g.length,_=[],T=0;T<2*y;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(var R=0;R<b.g.length;R++){var w=this.i(T)>>>16,E=this.i(T)&65535,be=b.i(R)>>>16,Ke=b.i(R)&65535;_[2*T+2*R]+=E*Ke,U(_,2*T+2*R),_[2*T+2*R+1]+=w*Ke,U(_,2*T+2*R+1),_[2*T+2*R+1]+=E*be,U(_,2*T+2*R+1),_[2*T+2*R+2]+=w*be,U(_,2*T+2*R+2)}for(T=0;T<y;T++)_[T]=_[2*T+1]<<16|_[2*T];for(T=y;T<2*y;T++)_[T]=0;return new o(_,0)};function U(b,y){for(;(b[y]&65535)!=b[y];)b[y+1]+=b[y]>>>16,b[y]&=65535,y++}function $(b,y){this.g=b,this.h=y}function q(b,y){if(C(y))throw Error("division by zero");if(C(b))return new $(p,p);if(x(b))return y=q(k(b),y),new $(k(y.g),k(y.h));if(x(y))return y=q(b,k(y)),new $(k(y.g),y.h);if(30<b.g.length){if(x(b)||x(y))throw Error("slowDivide_ only works with positive integers.");for(var _=m,T=y;0>=T.l(b);)_=ee(_),T=ee(T);var R=oe(_,1),w=oe(T,1);for(T=oe(T,2),_=oe(_,2);!C(T);){var E=w.add(T);0>=E.l(b)&&(R=R.add(_),w=E),T=oe(T,1),_=oe(_,1)}return y=j(b,R.j(y)),new $(R,y)}for(R=p;0<=b.l(y);){for(_=Math.max(1,Math.floor(b.m()/y.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),w=u(_),E=w.j(y);x(E)||0<E.l(b);)_-=T,w=u(_),E=w.j(y);C(w)&&(w=m),R=R.add(w),b=j(b,E)}return new $(R,b)}t.A=function(b){return q(this,b).h},t.and=function(b){for(var y=Math.max(this.g.length,b.g.length),_=[],T=0;T<y;T++)_[T]=this.i(T)&b.i(T);return new o(_,this.h&b.h)},t.or=function(b){for(var y=Math.max(this.g.length,b.g.length),_=[],T=0;T<y;T++)_[T]=this.i(T)|b.i(T);return new o(_,this.h|b.h)},t.xor=function(b){for(var y=Math.max(this.g.length,b.g.length),_=[],T=0;T<y;T++)_[T]=this.i(T)^b.i(T);return new o(_,this.h^b.h)};function ee(b){for(var y=b.g.length+1,_=[],T=0;T<y;T++)_[T]=b.i(T)<<1|b.i(T-1)>>>31;return new o(_,b.h)}function oe(b,y){var _=y>>5;y%=32;for(var T=b.g.length-_,R=[],w=0;w<T;w++)R[w]=0<y?b.i(w+_)>>>y|b.i(w+_+1)<<32-y:b.i(w+_);return new o(R,b.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,v_=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=f,dr=o}).apply(typeof Ld<"u"?Ld:typeof self<"u"?self:typeof window<"u"?window:{});var ko=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var E_,di,I_,Wo,Il,T_,w_,A_;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,d){return a==Array.prototype||a==Object.prototype||(a[h]=d.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ko=="object"&&ko];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function s(a,h){if(h)e:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var P=a[g];if(!(P in d))break e;d=d[P]}a=a[a.length-1],g=d[a],h=h(g),h!=g&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var d=0,g=!1,P={next:function(){if(!g&&d<a.length){var N=d++;return{value:h(N,a[N]),done:!1}}return g=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}s("Array.prototype.values",function(a){return a||function(){return i(this,function(h,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function u(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,d){return a.call.apply(a.bind,arguments)}function p(a,h,d){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,g),a.apply(h,P)}}return function(){return a.apply(h,arguments)}}function m(a,h,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,m.apply(null,arguments)}function v(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function C(a,h){function d(){}d.prototype=h.prototype,a.aa=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(g,P,N){for(var G=Array(arguments.length-2),Ne=2;Ne<arguments.length;Ne++)G[Ne-2]=arguments[Ne];return h.prototype[P].apply(g,G)}}function x(a){const h=a.length;if(0<h){const d=Array(h);for(let g=0;g<h;g++)d[g]=a[g];return d}return[]}function k(a,h){for(let d=1;d<arguments.length;d++){const g=arguments[d];if(l(g)){const P=a.length||0,N=g.length||0;a.length=P+N;for(let G=0;G<N;G++)a[P+G]=g[G]}else a.push(g)}}class j{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function U(a){return/^[\s\xa0]*$/.test(a)}function $(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function q(a){return q[" "](a),a}q[" "]=function(){};var ee=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function oe(a,h,d){for(const g in a)h.call(d,a[g],g,a)}function b(a,h){for(const d in a)h.call(void 0,a[d],d,a)}function y(a){const h={};for(const d in a)h[d]=a[d];return h}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,h){let d,g;for(let P=1;P<arguments.length;P++){g=arguments[P];for(d in g)a[d]=g[d];for(let N=0;N<_.length;N++)d=_[N],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function R(a){var h=1;a=a.split(":");const d=[];for(;0<h&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function w(a){c.setTimeout(()=>{throw a},0)}function E(){var a=Dt;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class be{constructor(){this.h=this.g=null}add(h,d){const g=Ke.get();g.set(h,d),this.h?this.h.next=g:this.g=g,this.h=g}}var Ke=new j(()=>new Pe,a=>a.reset());class Pe{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let he,ye=!1,Dt=new be,zt=()=>{const a=c.Promise.resolve(void 0);he=()=>{a.then(Ut)}};var Ut=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(d){w(d)}var h=Ke;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}ye=!1};function qe(){this.s=this.s,this.C=this.C}qe.prototype.s=!1,qe.prototype.ma=function(){this.s||(this.s=!0,this.N())},qe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function He(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}He.prototype.h=function(){this.defaultPrevented=!0};var $n=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};c.addEventListener("test",d,h),c.removeEventListener("test",d,h)}catch{}return a}();function Ot(a,h){if(He.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(ee){e:{try{q(h.nodeName);var P=!0;break e}catch{}P=!1}P||(h=null)}}else d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement);this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:xt[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Ot.aa.h.call(this)}}C(Ot,He);var xt={2:"touch",3:"pen",4:"mouse"};Ot.prototype.h=function(){Ot.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var D="closure_listenable_"+(1e6*Math.random()|0),Z=0;function K(a,h,d,g,P){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!g,this.ha=P,this.key=++Z,this.da=this.fa=!1}function te(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ge(a){this.src=a,this.g={},this.h=0}ge.prototype.add=function(a,h,d,g,P){var N=a.toString();a=this.g[N],a||(a=this.g[N]=[],this.h++);var G=A(a,h,g,P);return-1<G?(h=a[G],d||(h.fa=!1)):(h=new K(h,this.src,N,!!g,P),h.fa=d,a.push(h)),h};function I(a,h){var d=h.type;if(d in a.g){var g=a.g[d],P=Array.prototype.indexOf.call(g,h,void 0),N;(N=0<=P)&&Array.prototype.splice.call(g,P,1),N&&(te(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function A(a,h,d,g){for(var P=0;P<a.length;++P){var N=a[P];if(!N.da&&N.listener==h&&N.capture==!!d&&N.ha==g)return P}return-1}var S="closure_lm_"+(1e6*Math.random()|0),O={};function F(a,h,d,g,P){if(Array.isArray(h)){for(var N=0;N<h.length;N++)F(a,h[N],d,g,P);return null}return d=ue(d),a&&a[D]?a.K(h,d,u(g)?!!g.capture:!1,P):V(a,h,d,!1,g,P)}function V(a,h,d,g,P,N){if(!h)throw Error("Invalid event type");var G=u(P)?!!P.capture:!!P,Ne=Q(a);if(Ne||(a[S]=Ne=new ge(a)),d=Ne.add(h,d,g,G,N),d.proxy)return d;if(g=z(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)$n||(P=G),P===void 0&&(P=!1),a.addEventListener(h.toString(),g,P);else if(a.attachEvent)a.attachEvent(B(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function z(){function a(d){return h.call(a.src,a.listener,d)}const h=se;return a}function W(a,h,d,g,P){if(Array.isArray(h))for(var N=0;N<h.length;N++)W(a,h[N],d,g,P);else g=u(g)?!!g.capture:!!g,d=ue(d),a&&a[D]?(a=a.i,h=String(h).toString(),h in a.g&&(N=a.g[h],d=A(N,d,g,P),-1<d&&(te(N[d]),Array.prototype.splice.call(N,d,1),N.length==0&&(delete a.g[h],a.h--)))):a&&(a=Q(a))&&(h=a.g[h.toString()],a=-1,h&&(a=A(h,d,g,P)),(d=-1<a?h[a]:null)&&H(d))}function H(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[D])I(h.i,a);else{var d=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(d,g,a.capture):h.detachEvent?h.detachEvent(B(d),g):h.addListener&&h.removeListener&&h.removeListener(g),(d=Q(h))?(I(d,a),d.h==0&&(d.src=null,h[S]=null)):te(a)}}}function B(a){return a in O?O[a]:O[a]="on"+a}function se(a,h){if(a.da)a=!0;else{h=new Ot(h,this);var d=a.listener,g=a.ha||a.src;a.fa&&H(a),a=d.call(g,h)}return a}function Q(a){return a=a[S],a instanceof ge?a:null}var ne="__closure_events_fn_"+(1e9*Math.random()>>>0);function ue(a){return typeof a=="function"?a:(a[ne]||(a[ne]=function(h){return a.handleEvent(h)}),a[ne])}function ie(){qe.call(this),this.i=new ge(this),this.M=this,this.F=null}C(ie,qe),ie.prototype[D]=!0,ie.prototype.removeEventListener=function(a,h,d,g){W(this,a,h,d,g)};function me(a,h){var d,g=a.F;if(g)for(d=[];g;g=g.F)d.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new He(h,a);else if(h instanceof He)h.target=h.target||a;else{var P=h;h=new He(g,a),T(h,P)}if(P=!0,d)for(var N=d.length-1;0<=N;N--){var G=h.g=d[N];P=Ie(G,g,!0,h)&&P}if(G=h.g=a,P=Ie(G,g,!0,h)&&P,P=Ie(G,g,!1,h)&&P,d)for(N=0;N<d.length;N++)G=h.g=d[N],P=Ie(G,g,!1,h)&&P}ie.prototype.N=function(){if(ie.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var d=a.g[h],g=0;g<d.length;g++)te(d[g]);delete a.g[h],a.h--}}this.F=null},ie.prototype.K=function(a,h,d,g){return this.i.add(String(a),h,!1,d,g)},ie.prototype.L=function(a,h,d,g){return this.i.add(String(a),h,!0,d,g)};function Ie(a,h,d,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var P=!0,N=0;N<h.length;++N){var G=h[N];if(G&&!G.da&&G.capture==d){var Ne=G.listener,lt=G.ha||G.src;G.fa&&I(a.i,G),P=Ne.call(lt,g)!==!1&&P}}return P&&!g.defaultPrevented}function ot(a,h,d){if(typeof a=="function")d&&(a=m(a,d));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(a,h||0)}function at(a){a.g=ot(()=>{a.g=null,a.i&&(a.i=!1,at(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Bt extends qe{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:at(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function dt(a){qe.call(this),this.h=a,this.g={}}C(dt,qe);var qn=[];function Ks(a){oe(a.g,function(h,d){this.g.hasOwnProperty(d)&&H(h)},a),a.g={}}dt.prototype.N=function(){dt.aa.N.call(this),Ks(this)},dt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ct=c.JSON.stringify,jt=c.JSON.parse,uo=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function rs(){}rs.prototype.h=null;function oh(a){return a.h||(a.h=a.i())}function ah(){}var Qs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function sc(){He.call(this,"d")}C(sc,He);function ic(){He.call(this,"c")}C(ic,He);var Sr={},ch=null;function ho(){return ch=ch||new ie}Sr.La="serverreachability";function lh(a){He.call(this,Sr.La,a)}C(lh,He);function Js(a){const h=ho();me(h,new lh(h))}Sr.STAT_EVENT="statevent";function uh(a,h){He.call(this,Sr.STAT_EVENT,a),this.stat=h}C(uh,He);function bt(a){const h=ho();me(h,new uh(h,a))}Sr.Ma="timingevent";function hh(a,h){He.call(this,Sr.Ma,a),this.size=h}C(hh,He);function Ys(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},h)}function Xs(){this.g=!0}Xs.prototype.xa=function(){this.g=!1};function tv(a,h,d,g,P,N){a.info(function(){if(a.g)if(N)for(var G="",Ne=N.split("&"),lt=0;lt<Ne.length;lt++){var Ae=Ne[lt].split("=");if(1<Ae.length){var pt=Ae[0];Ae=Ae[1];var mt=pt.split("_");G=2<=mt.length&&mt[1]=="type"?G+(pt+"="+Ae+"&"):G+(pt+"=redacted&")}}else G=null;else G=N;return"XMLHTTP REQ ("+g+") [attempt "+P+"]: "+h+`
`+d+`
`+G})}function nv(a,h,d,g,P,N,G){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+P+"]: "+h+`
`+d+`
`+N+" "+G})}function ss(a,h,d,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+sv(a,d)+(g?" "+g:"")})}function rv(a,h){a.info(function(){return"TIMEOUT: "+h})}Xs.prototype.info=function(){};function sv(a,h){if(!a.g)return h;if(!h)return null;try{var d=JSON.parse(h);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var g=d[a];if(!(2>g.length)){var P=g[1];if(Array.isArray(P)&&!(1>P.length)){var N=P[0];if(N!="noop"&&N!="stop"&&N!="close")for(var G=1;G<P.length;G++)P[G]=""}}}}return ct(d)}catch{return h}}var fo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},fh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},oc;function po(){}C(po,rs),po.prototype.g=function(){return new XMLHttpRequest},po.prototype.i=function(){return{}},oc=new po;function Hn(a,h,d,g){this.j=a,this.i=h,this.l=d,this.R=g||1,this.U=new dt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new dh}function dh(){this.i=null,this.g="",this.h=!1}var ph={},ac={};function cc(a,h,d){a.L=1,a.v=yo(In(h)),a.m=d,a.P=!0,mh(a,null)}function mh(a,h){a.F=Date.now(),mo(a),a.A=In(a.v);var d=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),Ph(d.i,"t",g),a.C=0,d=a.j.J,a.h=new dh,a.g=zh(a.j,d?h:null,!a.m),0<a.O&&(a.M=new Bt(m(a.Y,a,a.g),a.O)),h=a.U,d=a.g,g=a.ca;var P="readystatechange";Array.isArray(P)||(P&&(qn[0]=P.toString()),P=qn);for(var N=0;N<P.length;N++){var G=F(d,P[N],g||h.handleEvent,!1,h.h||h);if(!G)break;h.g[G.key]=G}h=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Js(),tv(a.i,a.u,a.A,a.l,a.R,a.m)}Hn.prototype.ca=function(a){a=a.target;const h=this.M;h&&Tn(a)==3?h.j():this.Y(a)},Hn.prototype.Y=function(a){try{if(a==this.g)e:{const mt=Tn(this.g);var h=this.g.Ba();const as=this.g.Z();if(!(3>mt)&&(mt!=3||this.g&&(this.h.h||this.g.oa()||Mh(this.g)))){this.J||mt!=4||h==7||(h==8||0>=as?Js(3):Js(2)),lc(this);var d=this.g.Z();this.X=d;t:if(gh(this)){var g=Mh(this.g);a="";var P=g.length,N=Tn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Cr(this),Zs(this);var G="";break t}this.h.i=new c.TextDecoder}for(h=0;h<P;h++)this.h.h=!0,a+=this.h.i.decode(g[h],{stream:!(N&&h==P-1)});g.length=0,this.h.g+=a,this.C=0,G=this.h.g}else G=this.g.oa();if(this.o=d==200,nv(this.i,this.u,this.A,this.l,this.R,mt,d),this.o){if(this.T&&!this.K){t:{if(this.g){var Ne,lt=this.g;if((Ne=lt.g?lt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(Ne)){var Ae=Ne;break t}}Ae=null}if(d=Ae)ss(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,uc(this,d);else{this.o=!1,this.s=3,bt(12),Cr(this),Zs(this);break e}}if(this.P){d=!0;let Kt;for(;!this.J&&this.C<G.length;)if(Kt=iv(this,G),Kt==ac){mt==4&&(this.s=4,bt(14),d=!1),ss(this.i,this.l,null,"[Incomplete Response]");break}else if(Kt==ph){this.s=4,bt(15),ss(this.i,this.l,G,"[Invalid Chunk]"),d=!1;break}else ss(this.i,this.l,Kt,null),uc(this,Kt);if(gh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),mt!=4||G.length!=0||this.h.h||(this.s=1,bt(16),d=!1),this.o=this.o&&d,!d)ss(this.i,this.l,G,"[Invalid Chunked Response]"),Cr(this),Zs(this);else if(0<G.length&&!this.W){this.W=!0;var pt=this.j;pt.g==this&&pt.ba&&!pt.M&&(pt.j.info("Great, no buffering proxy detected. Bytes received: "+G.length),gc(pt),pt.M=!0,bt(11))}}else ss(this.i,this.l,G,null),uc(this,G);mt==4&&Cr(this),this.o&&!this.J&&(mt==4?qh(this.j,this):(this.o=!1,mo(this)))}else Tv(this.g),d==400&&0<G.indexOf("Unknown SID")?(this.s=3,bt(12)):(this.s=0,bt(13)),Cr(this),Zs(this)}}}catch{}finally{}};function gh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function iv(a,h){var d=a.C,g=h.indexOf(`
`,d);return g==-1?ac:(d=Number(h.substring(d,g)),isNaN(d)?ph:(g+=1,g+d>h.length?ac:(h=h.slice(g,g+d),a.C=g+d,h)))}Hn.prototype.cancel=function(){this.J=!0,Cr(this)};function mo(a){a.S=Date.now()+a.I,_h(a,a.I)}function _h(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ys(m(a.ba,a),h)}function lc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Hn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(rv(this.i,this.A),this.L!=2&&(Js(),bt(17)),Cr(this),this.s=2,Zs(this)):_h(this,this.S-a)};function Zs(a){a.j.G==0||a.J||qh(a.j,a)}function Cr(a){lc(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Ks(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function uc(a,h){try{var d=a.j;if(d.G!=0&&(d.g==a||hc(d.h,a))){if(!a.K&&hc(d.h,a)&&d.G==3){try{var g=d.Da.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var P=g;if(P[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Ao(d),To(d);else break e;mc(d),bt(18)}}else d.za=P[1],0<d.za-d.T&&37500>P[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ys(m(d.Za,d),6e3));if(1>=Eh(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else xr(d,11)}else if((a.K||d.g==a)&&Ao(d),!U(h))for(P=d.Da.g.parse(h),h=0;h<P.length;h++){let Ae=P[h];if(d.T=Ae[0],Ae=Ae[1],d.G==2)if(Ae[0]=="c"){d.K=Ae[1],d.ia=Ae[2];const pt=Ae[3];pt!=null&&(d.la=pt,d.j.info("VER="+d.la));const mt=Ae[4];mt!=null&&(d.Aa=mt,d.j.info("SVER="+d.Aa));const as=Ae[5];as!=null&&typeof as=="number"&&0<as&&(g=1.5*as,d.L=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Kt=a.g;if(Kt){const Ro=Kt.g?Kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ro){var N=g.h;N.g||Ro.indexOf("spdy")==-1&&Ro.indexOf("quic")==-1&&Ro.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(fc(N,N.h),N.h=null))}if(g.D){const _c=Kt.g?Kt.g.getResponseHeader("X-HTTP-Session-Id"):null;_c&&(g.ya=_c,Fe(g.I,g.D,_c))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),g=d;var G=a;if(g.qa=Gh(g,g.J?g.ia:null,g.W),G.K){Ih(g.h,G);var Ne=G,lt=g.L;lt&&(Ne.I=lt),Ne.B&&(lc(Ne),mo(Ne)),g.g=G}else jh(g);0<d.i.length&&wo(d)}else Ae[0]!="stop"&&Ae[0]!="close"||xr(d,7);else d.G==3&&(Ae[0]=="stop"||Ae[0]=="close"?Ae[0]=="stop"?xr(d,7):pc(d):Ae[0]!="noop"&&d.l&&d.l.ta(Ae),d.v=0)}}Js(4)}catch{}}var ov=class{constructor(a,h){this.g=a,this.map=h}};function yh(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function vh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Eh(a){return a.h?1:a.g?a.g.size:0}function hc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function fc(a,h){a.g?a.g.add(h):a.h=h}function Ih(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}yh.prototype.cancel=function(){if(this.i=Th(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Th(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const d of a.g.values())h=h.concat(d.D);return h}return x(a.i)}function av(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var h=[],d=a.length,g=0;g<d;g++)h.push(a[g]);return h}h=[],d=0;for(g in a)h[d++]=a[g];return h}function cv(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var h=[];a=a.length;for(var d=0;d<a;d++)h.push(d);return h}h=[],d=0;for(const g in a)h[d++]=g;return h}}}function wh(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var d=cv(a),g=av(a),P=g.length,N=0;N<P;N++)h.call(void 0,g[N],d&&d[N],a)}var Ah=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function lv(a,h){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var g=a[d].indexOf("="),P=null;if(0<=g){var N=a[d].substring(0,g);P=a[d].substring(g+1)}else N=a[d];h(N,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Pr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Pr){this.h=a.h,go(this,a.j),this.o=a.o,this.g=a.g,_o(this,a.s),this.l=a.l;var h=a.i,d=new ni;d.i=h.i,h.g&&(d.g=new Map(h.g),d.h=h.h),bh(this,d),this.m=a.m}else a&&(h=String(a).match(Ah))?(this.h=!1,go(this,h[1]||"",!0),this.o=ei(h[2]||""),this.g=ei(h[3]||"",!0),_o(this,h[4]),this.l=ei(h[5]||"",!0),bh(this,h[6]||"",!0),this.m=ei(h[7]||"")):(this.h=!1,this.i=new ni(null,this.h))}Pr.prototype.toString=function(){var a=[],h=this.j;h&&a.push(ti(h,Rh,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(ti(h,Rh,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(ti(d,d.charAt(0)=="/"?fv:hv,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",ti(d,pv)),a.join("")};function In(a){return new Pr(a)}function go(a,h,d){a.j=d?ei(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function _o(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function bh(a,h,d){h instanceof ni?(a.i=h,mv(a.i,a.h)):(d||(h=ti(h,dv)),a.i=new ni(h,a.h))}function Fe(a,h,d){a.i.set(h,d)}function yo(a){return Fe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function ei(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ti(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,uv),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function uv(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Rh=/[#\/\?@]/g,hv=/[#\?:]/g,fv=/[#\?]/g,dv=/[#\?@]/g,pv=/#/g;function ni(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Wn(a){a.g||(a.g=new Map,a.h=0,a.i&&lv(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}t=ni.prototype,t.add=function(a,h){Wn(this),this.i=null,a=is(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function Sh(a,h){Wn(a),h=is(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Ch(a,h){return Wn(a),h=is(a,h),a.g.has(h)}t.forEach=function(a,h){Wn(this),this.g.forEach(function(d,g){d.forEach(function(P){a.call(h,P,g,this)},this)},this)},t.na=function(){Wn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),d=[];for(let g=0;g<h.length;g++){const P=a[g];for(let N=0;N<P.length;N++)d.push(h[g])}return d},t.V=function(a){Wn(this);let h=[];if(typeof a=="string")Ch(this,a)&&(h=h.concat(this.g.get(is(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)h=h.concat(a[d])}return h},t.set=function(a,h){return Wn(this),this.i=null,a=is(this,a),Ch(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function Ph(a,h,d){Sh(a,h),0<d.length&&(a.i=null,a.g.set(is(a,h),x(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var d=0;d<h.length;d++){var g=h[d];const N=encodeURIComponent(String(g)),G=this.V(g);for(g=0;g<G.length;g++){var P=N;G[g]!==""&&(P+="="+encodeURIComponent(String(G[g]))),a.push(P)}}return this.i=a.join("&")};function is(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function mv(a,h){h&&!a.j&&(Wn(a),a.i=null,a.g.forEach(function(d,g){var P=g.toLowerCase();g!=P&&(Sh(this,g),Ph(this,P,d))},a)),a.j=h}function gv(a,h){const d=new Xs;if(c.Image){const g=new Image;g.onload=v(Gn,d,"TestLoadImage: loaded",!0,h,g),g.onerror=v(Gn,d,"TestLoadImage: error",!1,h,g),g.onabort=v(Gn,d,"TestLoadImage: abort",!1,h,g),g.ontimeout=v(Gn,d,"TestLoadImage: timeout",!1,h,g),c.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function _v(a,h){const d=new Xs,g=new AbortController,P=setTimeout(()=>{g.abort(),Gn(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(N=>{clearTimeout(P),N.ok?Gn(d,"TestPingServer: ok",!0,h):Gn(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(P),Gn(d,"TestPingServer: error",!1,h)})}function Gn(a,h,d,g,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),g(d)}catch{}}function yv(){this.g=new uo}function vv(a,h,d){const g=d||"";try{wh(a,function(P,N){let G=P;u(P)&&(G=ct(P)),h.push(g+N+"="+encodeURIComponent(G))})}catch(P){throw h.push(g+"type="+encodeURIComponent("_badmap")),P}}function vo(a){this.l=a.Ub||null,this.j=a.eb||!1}C(vo,rs),vo.prototype.g=function(){return new Eo(this.l,this.j)},vo.prototype.i=function(a){return function(){return a}}({});function Eo(a,h){ie.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Eo,ie),t=Eo.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,si(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ri(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,si(this)),this.g&&(this.readyState=3,si(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;xh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function xh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?ri(this):si(this),this.readyState==3&&xh(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,ri(this))},t.Qa=function(a){this.g&&(this.response=a,ri(this))},t.ga=function(){this.g&&ri(this)};function ri(a){a.readyState=4,a.l=null,a.j=null,a.v=null,si(a)}t.setRequestHeader=function(a,h){this.u.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function si(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Eo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Nh(a){let h="";return oe(a,function(d,g){h+=g,h+=":",h+=d,h+=`\r
`}),h}function dc(a,h,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=Nh(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):Fe(a,h,d))}function Ge(a){ie.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Ge,ie);var Ev=/^https?$/i,Iv=["POST","PUT"];t=Ge.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,h,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():oc.g(),this.v=this.o?oh(this.o):oh(oc),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(N){kh(this,N);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var P in g)d.set(P,g[P]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const N of g.keys())d.set(N,g.get(N));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(N=>N.toLowerCase()=="content-type"),P=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Iv,h,void 0))||g||P||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,G]of d)this.g.setRequestHeader(N,G);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Vh(this),this.u=!0,this.g.send(a),this.u=!1}catch(N){kh(this,N)}};function kh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,Dh(a),Io(a)}function Dh(a){a.A||(a.A=!0,me(a,"complete"),me(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,me(this,"complete"),me(this,"abort"),Io(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Io(this,!0)),Ge.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Oh(this):this.bb())},t.bb=function(){Oh(this)};function Oh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Tn(a)!=4||a.Z()!=2)){if(a.u&&Tn(a)==4)ot(a.Ea,0,a);else if(me(a,"readystatechange"),Tn(a)==4){a.h=!1;try{const G=a.Z();e:switch(G){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var g;if(g=G===0){var P=String(a.D).match(Ah)[1]||null;!P&&c.self&&c.self.location&&(P=c.self.location.protocol.slice(0,-1)),g=!Ev.test(P?P.toLowerCase():"")}d=g}if(d)me(a,"complete"),me(a,"success");else{a.m=6;try{var N=2<Tn(a)?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.Z()+"]",Dh(a)}}finally{Io(a)}}}}function Io(a,h){if(a.g){Vh(a);const d=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||me(a,"ready");try{d.onreadystatechange=g}catch{}}}function Vh(a){a.I&&(c.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function Tn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<Tn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),jt(h)}};function Mh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Tv(a){const h={};a=(a.g&&2<=Tn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(U(a[g]))continue;var d=R(a[g]);const P=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const N=h[P]||[];h[P]=N,N.push(d)}b(h,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ii(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function Lh(a){this.Aa=0,this.i=[],this.j=new Xs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ii("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ii("baseRetryDelayMs",5e3,a),this.cb=ii("retryDelaySeedMs",1e4,a),this.Wa=ii("forwardChannelMaxRetries",2,a),this.wa=ii("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new yh(a&&a.concurrentRequestLimit),this.Da=new yv,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Lh.prototype,t.la=8,t.G=1,t.connect=function(a,h,d,g){bt(0),this.W=a,this.H=h||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.I=Gh(this,null,this.W),wo(this)};function pc(a){if(Fh(a),a.G==3){var h=a.U++,d=In(a.I);if(Fe(d,"SID",a.K),Fe(d,"RID",h),Fe(d,"TYPE","terminate"),oi(a,d),h=new Hn(a,a.j,h),h.L=2,h.v=yo(In(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=h.v,d=!0),d||(h.g=zh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),mo(h)}Wh(a)}function To(a){a.g&&(gc(a),a.g.cancel(),a.g=null)}function Fh(a){To(a),a.u&&(c.clearTimeout(a.u),a.u=null),Ao(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function wo(a){if(!vh(a.h)&&!a.s){a.s=!0;var h=a.Ga;he||zt(),ye||(he(),ye=!0),Dt.add(h,a),a.B=0}}function wv(a,h){return Eh(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ys(m(a.Ga,a,h),Hh(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const P=new Hn(this,this.j,a);let N=this.o;if(this.S&&(N?(N=y(N),T(N,this.S)):N=this.S),this.m!==null||this.O||(P.H=N,N=null),this.P)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,4096<h){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=Bh(this,P,h),d=In(this.I),Fe(d,"RID",a),Fe(d,"CVER",22),this.D&&Fe(d,"X-HTTP-Session-Id",this.D),oi(this,d),N&&(this.O?h="headers="+encodeURIComponent(String(Nh(N)))+"&"+h:this.m&&dc(d,this.m,N)),fc(this.h,P),this.Ua&&Fe(d,"TYPE","init"),this.P?(Fe(d,"$req",h),Fe(d,"SID","null"),P.T=!0,cc(P,d,null)):cc(P,d,h),this.G=2}}else this.G==3&&(a?Uh(this,a):this.i.length==0||vh(this.h)||Uh(this))};function Uh(a,h){var d;h?d=h.l:d=a.U++;const g=In(a.I);Fe(g,"SID",a.K),Fe(g,"RID",d),Fe(g,"AID",a.T),oi(a,g),a.m&&a.o&&dc(g,a.m,a.o),d=new Hn(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Bh(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),fc(a.h,d),cc(d,g,h)}function oi(a,h){a.H&&oe(a.H,function(d,g){Fe(h,g,d)}),a.l&&wh({},function(d,g){Fe(h,g,d)})}function Bh(a,h,d){d=Math.min(a.i.length,d);var g=a.l?m(a.l.Na,a.l,a):null;e:{var P=a.i;let N=-1;for(;;){const G=["count="+d];N==-1?0<d?(N=P[0].g,G.push("ofs="+N)):N=0:G.push("ofs="+N);let Ne=!0;for(let lt=0;lt<d;lt++){let Ae=P[lt].g;const pt=P[lt].map;if(Ae-=N,0>Ae)N=Math.max(0,P[lt].g-100),Ne=!1;else try{vv(pt,G,"req"+Ae+"_")}catch{g&&g(pt)}}if(Ne){g=G.join("&");break e}}}return a=a.i.splice(0,d),h.D=a,g}function jh(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;he||zt(),ye||(he(),ye=!0),Dt.add(h,a),a.v=0}}function mc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ys(m(a.Fa,a),Hh(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,$h(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ys(m(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,bt(10),To(this),$h(this))};function gc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function $h(a){a.g=new Hn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=In(a.qa);Fe(h,"RID","rpc"),Fe(h,"SID",a.K),Fe(h,"AID",a.T),Fe(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&Fe(h,"TO",a.ja),Fe(h,"TYPE","xmlhttp"),oi(a,h),a.m&&a.o&&dc(h,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=yo(In(h)),d.m=null,d.P=!0,mh(d,a)}t.Za=function(){this.C!=null&&(this.C=null,To(this),mc(this),bt(19))};function Ao(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function qh(a,h){var d=null;if(a.g==h){Ao(a),gc(a),a.g=null;var g=2}else if(hc(a.h,h))d=h.D,Ih(a.h,h),g=1;else return;if(a.G!=0){if(h.o)if(g==1){d=h.m?h.m.length:0,h=Date.now()-h.F;var P=a.B;g=ho(),me(g,new hh(g,d)),wo(a)}else jh(a);else if(P=h.s,P==3||P==0&&0<h.X||!(g==1&&wv(a,h)||g==2&&mc(a)))switch(d&&0<d.length&&(h=a.h,h.i=h.i.concat(d)),P){case 1:xr(a,5);break;case 4:xr(a,10);break;case 3:xr(a,6);break;default:xr(a,2)}}}function Hh(a,h){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*h}function xr(a,h){if(a.j.info("Error code "+h),h==2){var d=m(a.fb,a),g=a.Xa;const P=!g;g=new Pr(g||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||go(g,"https"),yo(g),P?gv(g.toString(),d):_v(g.toString(),d)}else bt(2);a.G=0,a.l&&a.l.sa(h),Wh(a),Fh(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),bt(2)):(this.j.info("Failed to ping google.com"),bt(1))};function Wh(a){if(a.G=0,a.ka=[],a.l){const h=Th(a.h);(h.length!=0||a.i.length!=0)&&(k(a.ka,h),k(a.ka,a.i),a.h.i.length=0,x(a.i),a.i.length=0),a.l.ra()}}function Gh(a,h,d){var g=d instanceof Pr?In(d):new Pr(d);if(g.g!="")h&&(g.g=h+"."+g.g),_o(g,g.s);else{var P=c.location;g=P.protocol,h=h?h+"."+P.hostname:P.hostname,P=+P.port;var N=new Pr(null);g&&go(N,g),h&&(N.g=h),P&&_o(N,P),d&&(N.l=d),g=N}return d=a.D,h=a.ya,d&&h&&Fe(g,d,h),Fe(g,"VER",a.la),oi(a,g),g}function zh(a,h,d){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new Ge(new vo({eb:d})):new Ge(a.pa),h.Ha(a.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Kh(){}t=Kh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function bo(){}bo.prototype.g=function(a,h){return new Vt(a,h)};function Vt(a,h){ie.call(this),this.g=new Lh(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!U(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!U(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new os(this)}C(Vt,ie),Vt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Vt.prototype.close=function(){pc(this.g)},Vt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=ct(a),a=d);h.i.push(new ov(h.Ya++,a)),h.G==3&&wo(h)},Vt.prototype.N=function(){this.g.l=null,delete this.j,pc(this.g),delete this.g,Vt.aa.N.call(this)};function Qh(a){sc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}C(Qh,sc);function Jh(){ic.call(this),this.status=1}C(Jh,ic);function os(a){this.g=a}C(os,Kh),os.prototype.ua=function(){me(this.g,"a")},os.prototype.ta=function(a){me(this.g,new Qh(a))},os.prototype.sa=function(a){me(this.g,new Jh)},os.prototype.ra=function(){me(this.g,"b")},bo.prototype.createWebChannel=bo.prototype.g,Vt.prototype.send=Vt.prototype.o,Vt.prototype.open=Vt.prototype.m,Vt.prototype.close=Vt.prototype.close,A_=function(){return new bo},w_=function(){return ho()},T_=Sr,Il={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},fo.NO_ERROR=0,fo.TIMEOUT=8,fo.HTTP_ERROR=6,Wo=fo,fh.COMPLETE="complete",I_=fh,ah.EventType=Qs,Qs.OPEN="a",Qs.CLOSE="b",Qs.ERROR="c",Qs.MESSAGE="d",ie.prototype.listen=ie.prototype.K,di=ah,Ge.prototype.listenOnce=Ge.prototype.L,Ge.prototype.getLastError=Ge.prototype.Ka,Ge.prototype.getLastErrorCode=Ge.prototype.Ba,Ge.prototype.getStatus=Ge.prototype.Z,Ge.prototype.getResponseJson=Ge.prototype.Oa,Ge.prototype.getResponseText=Ge.prototype.oa,Ge.prototype.send=Ge.prototype.ea,Ge.prototype.setWithCredentials=Ge.prototype.Ha,E_=Ge}).apply(typeof ko<"u"?ko:typeof self<"u"?self:typeof window<"u"?window:{});const Fd="@firebase/firestore",Ud="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}yt.UNAUTHENTICATED=new yt(null),yt.GOOGLE_CREDENTIALS=new yt("google-credentials-uid"),yt.FIRST_PARTY=new yt("first-party-uid"),yt.MOCK_USER=new yt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qs="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=new lu("@firebase/firestore");function ps(){return Qr.logLevel}function X(t,...e){if(Qr.logLevel<=ve.DEBUG){const n=e.map(wu);Qr.debug(`Firestore (${qs}): ${t}`,...n)}}function Ln(t,...e){if(Qr.logLevel<=ve.ERROR){const n=e.map(wu);Qr.error(`Firestore (${qs}): ${t}`,...n)}}function yr(t,...e){if(Qr.logLevel<=ve.WARN){const n=e.map(wu);Qr.warn(`Firestore (${qs}): ${t}`,...n)}}function wu(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,b_(t,r,n)}function b_(t,e,n){let r=`FIRESTORE (${qs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw Ln(r),new Error(r)}function Ce(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||b_(e,s,r)}function de(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Y extends jn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R_{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class oS{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(yt.UNAUTHENTICATED))}shutdown(){}}class aS{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class cS{constructor(e){this.t=e,this.currentUser=yt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ce(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new pr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new pr,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{X("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(X("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new pr)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(X("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ce(typeof r.accessToken=="string",31837,{l:r}),new R_(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ce(e===null||typeof e=="string",2055,{h:e}),new yt(e)}}class lS{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=yt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class uS{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new lS(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(yt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Bd{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hS{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Ce(this.o===void 0,3512);const r=i=>{i.error!=null&&X("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,X("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{X("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):X("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Bd(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ce(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Bd(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fS(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S_(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=fS(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function _e(t,e){return t<e?-1:t>e?1:0}function Tl(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),s=e.codePointAt(n);if(r!==s){if(r<128&&s<128)return _e(r,s);{const i=S_(),o=dS(i.encode(jd(t,n)),i.encode(jd(e,n)));return o!==0?o:_e(r,s)}}n+=r>65535?2:1}return _e(t.length,e.length)}function jd(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function dS(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return _e(t[n],e[n]);return _e(t.length,e.length)}function Ds(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d="__name__";class ln{constructor(e,n,r){n===void 0?n=0:n>e.length&&ce(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&ce(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return ln.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof ln?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=ln.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return _e(e.length,n.length)}static compareSegments(e,n){const r=ln.isNumericId(e),s=ln.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?ln.extractNumericId(e).compare(ln.extractNumericId(n)):Tl(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return dr.fromString(e.substring(4,e.length-2))}}class Le extends ln{construct(e,n,r){return new Le(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new Y(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Le(n)}static emptyPath(){return new Le([])}}const pS=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ht extends ln{construct(e,n,r){return new ht(e,n,r)}static isValidIdentifier(e){return pS.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ht.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===$d}static keyField(){return new ht([$d])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new Y(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new Y(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new Y(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new Y(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ht(n)}static emptyPath(){return new ht([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.path=e}static fromPath(e){return new re(Le.fromString(e))}static fromName(e){return new re(Le.fromString(e).popFirst(5))}static empty(){return new re(Le.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Le.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Le.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new re(new Le(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C_(t,e,n){if(!n)throw new Y(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function mS(t,e,n,r){if(e===!0&&r===!0)throw new Y(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function qd(t){if(!re.isDocumentKey(t))throw new Y(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Hd(t){if(re.isDocumentKey(t))throw new Y(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function P_(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Wa(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ce(12329,{type:typeof t})}function mr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Y(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Wa(t);throw new Y(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(t,e){const n={typeString:t};return e&&(n.value=e),n}function io(t,e){if(!P_(t))throw new Y(M.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new Y(M.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd=-62135596800,Gd=1e6;class Ue{static now(){return Ue.fromMillis(Date.now())}static fromDate(e){return Ue.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Gd);return new Ue(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new Y(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new Y(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Wd)throw new Y(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Y(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gd}_compareTo(e){return this.seconds===e.seconds?_e(this.nanoseconds,e.nanoseconds):_e(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ue._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(io(e,Ue._jsonSchema))return new Ue(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Wd;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ue._jsonSchemaVersion="firestore/timestamp/1.0",Ue._jsonSchema={type:et("string",Ue._jsonSchemaVersion),seconds:et("number"),nanoseconds:et("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{static fromTimestamp(e){return new fe(e)}static min(){return new fe(new Ue(0,0))}static max(){return new fe(new Ue(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi=-1;function gS(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=fe.fromTimestamp(r===1e9?new Ue(n+1,0):new Ue(n,r));return new vr(s,re.empty(),e)}function _S(t){return new vr(t.readTime,t.key,qi)}class vr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new vr(fe.min(),re.empty(),qi)}static max(){return new vr(fe.max(),re.empty(),qi)}}function yS(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=re.comparator(t.documentKey,e.documentKey),n!==0?n:_e(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vS="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ES{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hs(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==vS)throw t;X("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ce(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new L((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof L?n:L.resolve(n)}catch(n){return L.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):L.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):L.reject(n)}static resolve(e){return new L((n,r)=>{n(e)})}static reject(e){return new L((n,r)=>{r(e)})}static waitFor(e){return new L((n,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&n()},l=>r(l))}),o=!0,i===s&&n()})}static or(e){let n=L.resolve(!1);for(const r of e)n=n.next(s=>s?L.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new L((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const u=l;n(e[u]).next(f=>{o[u]=f,++c,c===i&&r(o)},f=>s(f))}})}static doWhile(e,n){return new L((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function IS(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ws(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this._e(r),this.ae=r=>n.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}Ga.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu=-1;function za(t){return t==null}function pa(t){return t===0&&1/t==-1/0}function TS(t){return typeof t=="number"&&Number.isInteger(t)&&!pa(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_="";function wS(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=zd(e)),e=AS(t.get(n),e);return zd(e)}function AS(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case x_:n+="";break;default:n+=i}}return n}function zd(t){return t+x_+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Zr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function N_(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,n){this.comparator=e,this.root=n||ut.EMPTY}insert(e,n){return new We(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(e){return new We(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ut.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Do(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Do(this.root,e,this.comparator,!1)}getReverseIterator(){return new Do(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Do(this.root,e,this.comparator,!0)}}class Do{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ut{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??ut.RED,this.left=s??ut.EMPTY,this.right=i??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new ut(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return ut.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ce(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ce(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ce(27949);return e+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw ce(57766)}get value(){throw ce(16141)}get color(){throw ce(16727)}get left(){throw ce(29726)}get right(){throw ce(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new ut(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.comparator=e,this.data=new We(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Qd(this.data.getIterator())}getIteratorFrom(e){return new Qd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof rt)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new rt(this.comparator);return n.data=e,n}}class Qd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this.fields=e,e.sort(ht.comparator)}static empty(){return new Xt([])}unionWith(e){let n=new rt(ht.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Xt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Ds(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new k_("Invalid base64 string: "+i):i}}(e);return new ft(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new ft(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return _e(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ft.EMPTY_BYTE_STRING=new ft("");const bS=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Er(t){if(Ce(!!t,39018),typeof t=="string"){let e=0;const n=bS.exec(t);if(Ce(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Qe(t.seconds),nanos:Qe(t.nanos)}}function Qe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Ir(t){return typeof t=="string"?ft.fromBase64String(t):ft.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D_="server_timestamp",O_="__type__",V_="__previous_value__",M_="__local_write_time__";function Ru(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[O_])===null||n===void 0?void 0:n.stringValue)===D_}function Ka(t){const e=t.mapValue.fields[V_];return Ru(e)?Ka(e):e}function Hi(t){const e=Er(t.mapValue.fields[M_].timestampValue);return new Ue(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RS{constructor(e,n,r,s,i,o,c,l,u,f){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u,this.isUsingEmulator=f}}const ma="(default)";class Wi{constructor(e,n){this.projectId=e,this.database=n||ma}static empty(){return new Wi("","")}get isDefaultDatabase(){return this.database===ma}isEqual(e){return e instanceof Wi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L_="__type__",SS="__max__",Oo={mapValue:{}},F_="__vector__",ga="value";function Tr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ru(t)?4:PS(t)?9007199254740991:CS(t)?10:11:ce(28295,{value:t})}function En(t,e){if(t===e)return!0;const n=Tr(t);if(n!==Tr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Hi(t).isEqual(Hi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Er(s.timestampValue),c=Er(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return Ir(s.bytesValue).isEqual(Ir(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Qe(s.geoPointValue.latitude)===Qe(i.geoPointValue.latitude)&&Qe(s.geoPointValue.longitude)===Qe(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Qe(s.integerValue)===Qe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Qe(s.doubleValue),c=Qe(i.doubleValue);return o===c?pa(o)===pa(c):isNaN(o)&&isNaN(c)}return!1}(t,e);case 9:return Ds(t.arrayValue.values||[],e.arrayValue.values||[],En);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Kd(o)!==Kd(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!En(o[l],c[l])))return!1;return!0}(t,e);default:return ce(52216,{left:t})}}function Gi(t,e){return(t.values||[]).find(n=>En(n,e))!==void 0}function Os(t,e){if(t===e)return 0;const n=Tr(t),r=Tr(e);if(n!==r)return _e(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return _e(t.booleanValue,e.booleanValue);case 2:return function(i,o){const c=Qe(i.integerValue||i.doubleValue),l=Qe(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(t,e);case 3:return Jd(t.timestampValue,e.timestampValue);case 4:return Jd(Hi(t),Hi(e));case 5:return Tl(t.stringValue,e.stringValue);case 6:return function(i,o){const c=Ir(i),l=Ir(o);return c.compareTo(l)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const f=_e(c[u],l[u]);if(f!==0)return f}return _e(c.length,l.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const c=_e(Qe(i.latitude),Qe(o.latitude));return c!==0?c:_e(Qe(i.longitude),Qe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Yd(t.arrayValue,e.arrayValue);case 10:return function(i,o){var c,l,u,f;const p=i.fields||{},m=o.fields||{},v=(c=p[ga])===null||c===void 0?void 0:c.arrayValue,C=(l=m[ga])===null||l===void 0?void 0:l.arrayValue,x=_e(((u=v==null?void 0:v.values)===null||u===void 0?void 0:u.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return x!==0?x:Yd(v,C)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===Oo.mapValue&&o===Oo.mapValue)return 0;if(i===Oo.mapValue)return 1;if(o===Oo.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),u=o.fields||{},f=Object.keys(u);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const m=Tl(l[p],f[p]);if(m!==0)return m;const v=Os(c[l[p]],u[f[p]]);if(v!==0)return v}return _e(l.length,f.length)}(t.mapValue,e.mapValue);default:throw ce(23264,{le:n})}}function Jd(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return _e(t,e);const n=Er(t),r=Er(e),s=_e(n.seconds,r.seconds);return s!==0?s:_e(n.nanos,r.nanos)}function Yd(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Os(n[s],r[s]);if(i)return i}return _e(n.length,r.length)}function Vs(t){return wl(t)}function wl(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Er(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Ir(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return re.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=wl(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${wl(n.fields[o])}`;return s+"}"}(t.mapValue):ce(61005,{value:t})}function Go(t){switch(Tr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ka(t);return e?16+Go(e):16;case 5:return 2*t.stringValue.length;case 6:return Ir(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Go(i),0)}(t.arrayValue);case 10:case 11:return function(r){let s=0;return Zr(r.fields,(i,o)=>{s+=i.length+Go(o)}),s}(t.mapValue);default:throw ce(13486,{value:t})}}function Xd(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Al(t){return!!t&&"integerValue"in t}function Su(t){return!!t&&"arrayValue"in t}function Zd(t){return!!t&&"nullValue"in t}function ep(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function zo(t){return!!t&&"mapValue"in t}function CS(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[L_])===null||n===void 0?void 0:n.stringValue)===F_}function Ci(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Zr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Ci(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ci(t.arrayValue.values[n]);return e}return Object.assign({},t)}function PS(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===SS}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.value=e}static empty(){return new qt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!zo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ci(n)}setAll(e){let n=ht.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!n.isImmediateParentOf(c)){const l=this.getFieldsMap(n);this.applyChanges(l,r,s),r={},s=[],n=c.popLast()}o?r[c.lastSegment()]=Ci(o):s.push(c.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());zo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return En(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];zo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Zr(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new qt(Ci(this.value))}}function U_(t){const e=[];return Zr(t.fields,(n,r)=>{const s=new ht([n]);if(zo(r)){const i=U_(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Xt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,n,r,s,i,o,c){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new It(e,0,fe.min(),fe.min(),fe.min(),qt.empty(),0)}static newFoundDocument(e,n,r,s){return new It(e,1,n,fe.min(),r,s,0)}static newNoDocument(e,n){return new It(e,2,n,fe.min(),fe.min(),qt.empty(),0)}static newUnknownDocument(e,n){return new It(e,3,n,fe.min(),fe.min(),qt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(fe.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=fe.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof It&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new It(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,n){this.position=e,this.inclusive=n}}function tp(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=re.comparator(re.fromName(o.referenceValue),n.key):r=Os(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function np(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!En(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e,n="asc"){this.field=e,this.dir=n}}function xS(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{}class Xe extends B_{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new kS(e,n,r):n==="array-contains"?new VS(e,r):n==="in"?new MS(e,r):n==="not-in"?new LS(e,r):n==="array-contains-any"?new FS(e,r):new Xe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new DS(e,r):new OS(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Os(n,this.value)):n!==null&&Tr(this.value)===Tr(n)&&this.matchesComparison(Os(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ce(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class sn extends B_{constructor(e,n){super(),this.filters=e,this.op=n,this.he=null}static create(e,n){return new sn(e,n)}matches(e){return j_(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function j_(t){return t.op==="and"}function $_(t){return NS(t)&&j_(t)}function NS(t){for(const e of t.filters)if(e instanceof sn)return!1;return!0}function bl(t){if(t instanceof Xe)return t.field.canonicalString()+t.op.toString()+Vs(t.value);if($_(t))return t.filters.map(e=>bl(e)).join(",");{const e=t.filters.map(n=>bl(n)).join(",");return`${t.op}(${e})`}}function q_(t,e){return t instanceof Xe?function(r,s){return s instanceof Xe&&r.op===s.op&&r.field.isEqual(s.field)&&En(r.value,s.value)}(t,e):t instanceof sn?function(r,s){return s instanceof sn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&q_(o,s.filters[c]),!0):!1}(t,e):void ce(19439)}function H_(t){return t instanceof Xe?function(n){return`${n.field.canonicalString()} ${n.op} ${Vs(n.value)}`}(t):t instanceof sn?function(n){return n.op.toString()+" {"+n.getFilters().map(H_).join(" ,")+"}"}(t):"Filter"}class kS extends Xe{constructor(e,n,r){super(e,n,r),this.key=re.fromName(r.referenceValue)}matches(e){const n=re.comparator(e.key,this.key);return this.matchesComparison(n)}}class DS extends Xe{constructor(e,n){super(e,"in",n),this.keys=W_("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class OS extends Xe{constructor(e,n){super(e,"not-in",n),this.keys=W_("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function W_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>re.fromName(r.referenceValue))}class VS extends Xe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Su(n)&&Gi(n.arrayValue,this.value)}}class MS extends Xe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Gi(this.value.arrayValue,n)}}class LS extends Xe{constructor(e,n){super(e,"not-in",n)}matches(e){if(Gi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Gi(this.value.arrayValue,n)}}class FS extends Xe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Su(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Gi(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class US{constructor(e,n=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Pe=null}}function rp(t,e=null,n=[],r=[],s=null,i=null,o=null){return new US(t,e,n,r,s,i,o)}function Cu(t){const e=de(t);if(e.Pe===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>bl(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),za(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Vs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Vs(r)).join(",")),e.Pe=n}return e.Pe}function Pu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!xS(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!q_(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!np(t.startAt,e.startAt)&&np(t.endAt,e.endAt)}function Rl(t){return re.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e,n=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function BS(t,e,n,r,s,i,o,c){return new Gs(t,e,n,r,s,i,o,c)}function xu(t){return new Gs(t)}function sp(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function G_(t){return t.collectionGroup!==null}function Pi(t){const e=de(t);if(e.Te===null){e.Te=[];const n=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new rt(ht.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(u=>{u.isInequality()&&(c=c.add(u.field))})}),c})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Te.push(new zi(i,r))}),n.has(ht.keyField().canonicalString())||e.Te.push(new zi(ht.keyField(),r))}return e.Te}function mn(t){const e=de(t);return e.Ie||(e.Ie=jS(e,Pi(t))),e.Ie}function jS(t,e){if(t.limitType==="F")return rp(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new zi(s.field,i)});const n=t.endAt?new _a(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new _a(t.startAt.position,t.startAt.inclusive):null;return rp(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Sl(t,e){const n=t.filters.concat([e]);return new Gs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Cl(t,e,n){return new Gs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Qa(t,e){return Pu(mn(t),mn(e))&&t.limitType===e.limitType}function z_(t){return`${Cu(mn(t))}|lt:${t.limitType}`}function ms(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>H_(s)).join(", ")}]`),za(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>Vs(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>Vs(s)).join(",")),`Target(${r})`}(mn(t))}; limitType=${t.limitType})`}function Ja(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):re.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of Pi(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,c,l){const u=tp(o,c,l);return o.inclusive?u<=0:u<0}(r.startAt,Pi(r),s)||r.endAt&&!function(o,c,l){const u=tp(o,c,l);return o.inclusive?u>=0:u>0}(r.endAt,Pi(r),s))}(t,e)}function $S(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function K_(t){return(e,n)=>{let r=!1;for(const s of Pi(t)){const i=qS(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function qS(t,e,n){const r=t.field.isKeyField()?re.comparator(e.key,n.key):function(i,o,c){const l=o.data.field(i),u=c.data.field(i);return l!==null&&u!==null?Os(l,u):ce(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ce(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Zr(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return N_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HS=new We(re.comparator);function Fn(){return HS}const Q_=new We(re.comparator);function pi(...t){let e=Q_;for(const n of t)e=e.insert(n.key,n);return e}function J_(t){let e=Q_;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Ur(){return xi()}function Y_(){return xi()}function xi(){return new es(t=>t.toString(),(t,e)=>t.isEqual(e))}const WS=new We(re.comparator),GS=new rt(re.comparator);function Ee(...t){let e=GS;for(const n of t)e=e.add(n);return e}const zS=new rt(_e);function KS(){return zS}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:pa(e)?"-0":e}}function X_(t){return{integerValue:""+t}}function QS(t,e){return TS(e)?X_(e):Nu(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(){this._=void 0}}function JS(t,e,n){return t instanceof ya?function(s,i){const o={fields:{[O_]:{stringValue:D_},[M_]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ru(i)&&(i=Ka(i)),i&&(o.fields[V_]=i),{mapValue:o}}(n,e):t instanceof Ki?ey(t,e):t instanceof Qi?ty(t,e):function(s,i){const o=Z_(s,i),c=ip(o)+ip(s.Ee);return Al(o)&&Al(s.Ee)?X_(c):Nu(s.serializer,c)}(t,e)}function YS(t,e,n){return t instanceof Ki?ey(t,e):t instanceof Qi?ty(t,e):n}function Z_(t,e){return t instanceof va?function(r){return Al(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class ya extends Ya{}class Ki extends Ya{constructor(e){super(),this.elements=e}}function ey(t,e){const n=ny(e);for(const r of t.elements)n.some(s=>En(s,r))||n.push(r);return{arrayValue:{values:n}}}class Qi extends Ya{constructor(e){super(),this.elements=e}}function ty(t,e){let n=ny(e);for(const r of t.elements)n=n.filter(s=>!En(s,r));return{arrayValue:{values:n}}}class va extends Ya{constructor(e,n){super(),this.serializer=e,this.Ee=n}}function ip(t){return Qe(t.integerValue||t.doubleValue)}function ny(t){return Su(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function XS(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Ki&&s instanceof Ki||r instanceof Qi&&s instanceof Qi?Ds(r.elements,s.elements,En):r instanceof va&&s instanceof va?En(r.Ee,s.Ee):r instanceof ya&&s instanceof ya}(t.transform,e.transform)}class ZS{constructor(e,n){this.version=e,this.transformResults=n}}class Nn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Nn}static exists(e){return new Nn(void 0,e)}static updateTime(e){return new Nn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ko(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Xa{}function ry(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new iy(t.key,Nn.none()):new oo(t.key,t.data,Nn.none());{const n=t.data,r=qt.empty();let s=new rt(ht.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new ts(t.key,r,new Xt(s.toArray()),Nn.none())}}function eC(t,e,n){t instanceof oo?function(s,i,o){const c=s.value.clone(),l=ap(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):t instanceof ts?function(s,i,o){if(!Ko(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=ap(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(sy(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Ni(t,e,n,r){return t instanceof oo?function(i,o,c,l){if(!Ko(i.precondition,o))return c;const u=i.value.clone(),f=cp(i.fieldTransforms,l,o);return u.setAll(f),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(t,e,n,r):t instanceof ts?function(i,o,c,l){if(!Ko(i.precondition,o))return c;const u=cp(i.fieldTransforms,l,o),f=o.data;return f.setAll(sy(i)),f.setAll(u),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,o,c){return Ko(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(t,e,n)}function tC(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Z_(r.transform,s||null);i!=null&&(n===null&&(n=qt.empty()),n.set(r.field,i))}return n||null}function op(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ds(r,s,(i,o)=>XS(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class oo extends Xa{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ts extends Xa{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function sy(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function ap(t,e,n){const r=new Map;Ce(t.length===n.length,32656,{Ae:n.length,Re:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,YS(o,c,n[s]))}return r}function cp(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,JS(i,o,e))}return r}class iy extends Xa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class nC extends Xa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&eC(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Ni(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Ni(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Y_();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=n.has(s.key)?null:c;const l=ry(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(fe.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Ee())}isEqual(e){return this.batchId===e.batchId&&Ds(this.mutations,e.mutations,(n,r)=>op(n,r))&&Ds(this.baseMutations,e.baseMutations,(n,r)=>op(n,r))}}class ku{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Ce(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let s=function(){return WS}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new ku(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sC{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iC{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ye,Te;function oC(t){switch(t){case M.OK:return ce(64938);case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0;default:return ce(15467,{code:t})}}function oy(t){if(t===void 0)return Ln("GRPC error has no .code"),M.UNKNOWN;switch(t){case Ye.OK:return M.OK;case Ye.CANCELLED:return M.CANCELLED;case Ye.UNKNOWN:return M.UNKNOWN;case Ye.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Ye.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Ye.INTERNAL:return M.INTERNAL;case Ye.UNAVAILABLE:return M.UNAVAILABLE;case Ye.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Ye.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Ye.NOT_FOUND:return M.NOT_FOUND;case Ye.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Ye.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Ye.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Ye.ABORTED:return M.ABORTED;case Ye.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Ye.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Ye.DATA_LOSS:return M.DATA_LOSS;default:return ce(39323,{code:t})}}(Te=Ye||(Ye={}))[Te.OK=0]="OK",Te[Te.CANCELLED=1]="CANCELLED",Te[Te.UNKNOWN=2]="UNKNOWN",Te[Te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Te[Te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Te[Te.NOT_FOUND=5]="NOT_FOUND",Te[Te.ALREADY_EXISTS=6]="ALREADY_EXISTS",Te[Te.PERMISSION_DENIED=7]="PERMISSION_DENIED",Te[Te.UNAUTHENTICATED=16]="UNAUTHENTICATED",Te[Te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Te[Te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Te[Te.ABORTED=10]="ABORTED",Te[Te.OUT_OF_RANGE=11]="OUT_OF_RANGE",Te[Te.UNIMPLEMENTED=12]="UNIMPLEMENTED",Te[Te.INTERNAL=13]="INTERNAL",Te[Te.UNAVAILABLE=14]="UNAVAILABLE",Te[Te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aC=new dr([4294967295,4294967295],0);function lp(t){const e=S_().encode(t),n=new v_;return n.update(e),new Uint8Array(n.digest())}function up(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new dr([n,r],0),new dr([s,i],0)]}class Du{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new mi(`Invalid padding: ${n}`);if(r<0)throw new mi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new mi(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new mi(`Invalid padding when bitmap length is 0: ${n}`);this.fe=8*e.length-n,this.ge=dr.fromNumber(this.fe)}pe(e,n,r){let s=e.add(n.multiply(dr.fromNumber(r)));return s.compare(aC)===1&&(s=new dr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const n=lp(e),[r,s]=up(n);for(let i=0;i<this.hashCount;i++){const o=this.pe(r,s,i);if(!this.ye(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Du(i,s,n);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.fe===0)return;const n=lp(e),[r,s]=up(n);for(let i=0;i<this.hashCount;i++){const o=this.pe(r,s,i);this.we(o)}}we(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class mi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,ao.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Za(fe.min(),s,new We(_e),Fn(),Ee())}}class ao{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new ao(r,n,Ee(),Ee(),Ee())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e,n,r,s){this.Se=e,this.removedTargetIds=n,this.key=r,this.be=s}}class ay{constructor(e,n){this.targetId=e,this.De=n}}class cy{constructor(e,n,r=ft.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class hp{constructor(){this.ve=0,this.Ce=fp(),this.Fe=ft.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=Ee(),n=Ee(),r=Ee();return this.Ce.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ce(38017,{changeType:i})}}),new ao(this.Fe,this.Me,e,n,r)}ke(){this.xe=!1,this.Ce=fp()}qe(e,n){this.xe=!0,this.Ce=this.Ce.insert(e,n)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,Ce(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class cC{constructor(e){this.We=e,this.Ge=new Map,this.ze=Fn(),this.je=Vo(),this.Je=Vo(),this.He=new We(_e)}Ye(e){for(const n of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(n,e.be):this.Xe(n,e.key,e.be);for(const n of e.removedTargetIds)this.Xe(n,e.key,e.be)}et(e){this.forEachTarget(e,n=>{const r=this.tt(n);switch(e.state){case 0:this.nt(n)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(n);break;case 3:this.nt(n)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(n)&&(this.rt(n),r.Be(e.resumeToken));break;default:ce(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Ge.forEach((r,s)=>{this.nt(s)&&n(s)})}it(e){const n=e.targetId,r=e.De.count,s=this.st(n);if(s){const i=s.target;if(Rl(i))if(r===0){const o=new re(i.path);this.Xe(n,o,It.newNoDocument(o,fe.min()))}else Ce(r===1,20013,{expectedCount:r});else{const o=this.ot(n);if(o!==r){const c=this._t(e),l=c?this.ut(c,e,o):1;if(l!==0){this.rt(n);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(n,u)}}}}}_t(e){const n=e.De.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,c;try{o=Ir(r).toUint8Array()}catch(l){if(l instanceof k_)return yr("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Du(o,s,i)}catch(l){return yr(l instanceof mi?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.fe===0?null:c}ut(e,n,r){return n.De.count===r-this.ht(e,n.targetId)?0:2}ht(e,n){const r=this.We.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.We.lt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Xe(n,i,null),s++)}),s}Pt(e){const n=new Map;this.Ge.forEach((i,o)=>{const c=this.st(o);if(c){if(i.current&&Rl(c.target)){const l=new re(c.target.path);this.Tt(l).has(o)||this.It(o,l)||this.Xe(o,l,It.newNoDocument(l,e))}i.Ne&&(n.set(o,i.Le()),i.ke())}});let r=Ee();this.Je.forEach((i,o)=>{let c=!0;o.forEachWhile(l=>{const u=this.st(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ze.forEach((i,o)=>o.setReadTime(e));const s=new Za(e,n,this.He,this.ze,r);return this.ze=Fn(),this.je=Vo(),this.Je=Vo(),this.He=new We(_e),s}Ze(e,n){if(!this.nt(e))return;const r=this.It(e,n.key)?2:0;this.tt(e).qe(n.key,r),this.ze=this.ze.insert(n.key,n),this.je=this.je.insert(n.key,this.Tt(n.key).add(e)),this.Je=this.Je.insert(n.key,this.dt(n.key).add(e))}Xe(e,n,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,n)?s.qe(n,1):s.Qe(n),this.Je=this.Je.insert(n,this.dt(n).delete(e)),this.Je=this.Je.insert(n,this.dt(n).add(e)),r&&(this.ze=this.ze.insert(n,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const n=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let n=this.Ge.get(e);return n||(n=new hp,this.Ge.set(e,n)),n}dt(e){let n=this.Je.get(e);return n||(n=new rt(_e),this.Je=this.Je.insert(e,n)),n}Tt(e){let n=this.je.get(e);return n||(n=new rt(_e),this.je=this.je.insert(e,n)),n}nt(e){const n=this.st(e)!==null;return n||X("WatchChangeAggregator","Detected inactive target",e),n}st(e){const n=this.Ge.get(e);return n&&n.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new hp),this.We.getRemoteKeysForTarget(e).forEach(n=>{this.Xe(e,n,null)})}It(e,n){return this.We.getRemoteKeysForTarget(e).has(n)}}function Vo(){return new We(re.comparator)}function fp(){return new We(re.comparator)}const lC={asc:"ASCENDING",desc:"DESCENDING"},uC={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},hC={and:"AND",or:"OR"};class fC{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Pl(t,e){return t.useProto3Json||za(e)?e:{value:e}}function Ea(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ly(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function dC(t,e){return Ea(t,e.toTimestamp())}function gn(t){return Ce(!!t,49232),fe.fromTimestamp(function(n){const r=Er(n);return new Ue(r.seconds,r.nanos)}(t))}function Ou(t,e){return xl(t,e).canonicalString()}function xl(t,e){const n=function(s){return new Le(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function uy(t){const e=Le.fromString(t);return Ce(my(e),10190,{key:e.toString()}),e}function Nl(t,e){return Ou(t.databaseId,e.path)}function Hc(t,e){const n=uy(e);if(n.get(1)!==t.databaseId.projectId)throw new Y(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Y(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new re(fy(n))}function hy(t,e){return Ou(t.databaseId,e)}function pC(t){const e=uy(t);return e.length===4?Le.emptyPath():fy(e)}function kl(t){return new Le(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function fy(t){return Ce(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function dp(t,e,n){return{name:Nl(t,e),fields:n.value.mapValue.fields}}function mC(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:ce(39313,{state:u})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,f){return u.useProto3Json?(Ce(f===void 0||typeof f=="string",58123),ft.fromBase64String(f||"")):(Ce(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ft.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(u){const f=u.code===void 0?M.UNKNOWN:oy(u.code);return new Y(f,u.message||"")}(o);n=new cy(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Hc(t,r.document.name),i=gn(r.document.updateTime),o=r.document.createTime?gn(r.document.createTime):fe.min(),c=new qt({mapValue:{fields:r.document.fields}}),l=It.newFoundDocument(s,i,o,c),u=r.targetIds||[],f=r.removedTargetIds||[];n=new Qo(u,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Hc(t,r.document),i=r.readTime?gn(r.readTime):fe.min(),o=It.newNoDocument(s,i),c=r.removedTargetIds||[];n=new Qo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Hc(t,r.document),i=r.removedTargetIds||[];n=new Qo([],i,s,null)}else{if(!("filter"in e))return ce(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new iC(s,i),c=r.targetId;n=new ay(c,o)}}return n}function gC(t,e){let n;if(e instanceof oo)n={update:dp(t,e.key,e.value)};else if(e instanceof iy)n={delete:Nl(t,e.key)};else if(e instanceof ts)n={update:dp(t,e.key,e.data),updateMask:bC(e.fieldMask)};else{if(!(e instanceof nC))return ce(16599,{Rt:e.type});n={verify:Nl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof ya)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ki)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Qi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof va)return{fieldPath:o.field.canonicalString(),increment:c.Ee};throw ce(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:dC(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ce(27497)}(t,e.precondition)),n}function _C(t,e){return t&&t.length>0?(Ce(e!==void 0,14353),t.map(n=>function(s,i){let o=s.updateTime?gn(s.updateTime):gn(i);return o.isEqual(fe.min())&&(o=gn(i)),new ZS(o,s.transformResults||[])}(n,e))):[]}function yC(t,e){return{documents:[hy(t,e.path)]}}function vC(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=hy(t,s);const i=function(u){if(u.length!==0)return py(sn.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(f=>function(m){return{field:gs(m.field),direction:TC(m.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const c=Pl(t,e.limit);return c!==null&&(n.structuredQuery.limit=c),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{Vt:n,parent:s}}function EC(t){let e=pC(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Ce(r===1,65062);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(p){const m=dy(p);return m instanceof sn&&$_(m)?m.getFilters():[m]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(m=>function(C){return new zi(_s(C.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(m))}(n.orderBy));let c=null;n.limit&&(c=function(p){let m;return m=typeof p=="object"?p.value:p,za(m)?null:m}(n.limit));let l=null;n.startAt&&(l=function(p){const m=!!p.before,v=p.values||[];return new _a(v,m)}(n.startAt));let u=null;return n.endAt&&(u=function(p){const m=!p.before,v=p.values||[];return new _a(v,m)}(n.endAt)),BS(e,s,o,i,c,"F",l,u)}function IC(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ce(28987,{purpose:s})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function dy(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=_s(n.unaryFilter.field);return Xe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=_s(n.unaryFilter.field);return Xe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=_s(n.unaryFilter.field);return Xe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=_s(n.unaryFilter.field);return Xe.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ce(61313);default:return ce(60726)}}(t):t.fieldFilter!==void 0?function(n){return Xe.create(_s(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ce(58110);default:return ce(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return sn.create(n.compositeFilter.filters.map(r=>dy(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ce(1026)}}(n.compositeFilter.op))}(t):ce(30097,{filter:t})}function TC(t){return lC[t]}function wC(t){return uC[t]}function AC(t){return hC[t]}function gs(t){return{fieldPath:t.canonicalString()}}function _s(t){return ht.fromServerFormat(t.fieldPath)}function py(t){return t instanceof Xe?function(n){if(n.op==="=="){if(ep(n.value))return{unaryFilter:{field:gs(n.field),op:"IS_NAN"}};if(Zd(n.value))return{unaryFilter:{field:gs(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(ep(n.value))return{unaryFilter:{field:gs(n.field),op:"IS_NOT_NAN"}};if(Zd(n.value))return{unaryFilter:{field:gs(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:gs(n.field),op:wC(n.op),value:n.value}}}(t):t instanceof sn?function(n){const r=n.getFilters().map(s=>py(s));return r.length===1?r[0]:{compositeFilter:{op:AC(n.op),filters:r}}}(t):ce(54877,{filter:t})}function bC(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function my(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(e,n,r,s,i=fe.min(),o=fe.min(),c=ft.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new ar(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new ar(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ar(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ar(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RC{constructor(e){this.gt=e}}function SC(t){const e=EC({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Cl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CC{constructor(){this.Dn=new PC}addToCollectionParentIndex(e,n){return this.Dn.add(n),L.resolve()}getCollectionParents(e,n){return L.resolve(this.Dn.getEntries(n))}addFieldIndex(e,n){return L.resolve()}deleteFieldIndex(e,n){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,n){return L.resolve()}getDocumentsMatchingTarget(e,n){return L.resolve(null)}getIndexType(e,n){return L.resolve(0)}getFieldIndexes(e,n){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,n){return L.resolve(vr.min())}getMinOffsetFromCollectionGroup(e,n){return L.resolve(vr.min())}updateCollectionGroup(e,n,r){return L.resolve()}updateIndexEntries(e,n){return L.resolve()}}class PC{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new rt(Le.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new rt(Le.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},gy=41943040;class Nt{static withCacheSize(e){return new Nt(e,Nt.DEFAULT_COLLECTION_PERCENTILE,Nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nt.DEFAULT_COLLECTION_PERCENTILE=10,Nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Nt.DEFAULT=new Nt(gy,Nt.DEFAULT_COLLECTION_PERCENTILE,Nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Nt.DISABLED=new Nt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Ms(0)}static ur(){return new Ms(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp="LruGarbageCollector",xC=1048576;function gp([t,e],[n,r]){const s=_e(t,n);return s===0?_e(e,r):s}class NC{constructor(e){this.Tr=e,this.buffer=new rt(gp),this.Ir=0}dr(){return++this.Ir}Er(e){const n=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();gp(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class kC{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){X(mp,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Ws(n)?X(mp,"Ignoring IndexedDB error during garbage collection: ",n):await Hs(n)}await this.Rr(3e5)})}}class DC{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.mr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return L.resolve(Ga.ue);const r=new NC(n);return this.Vr.forEachTarget(e,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Vr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(X("LruGarbageCollector","Garbage collection skipped; disabled"),L.resolve(pp)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(X("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),pp):this.pr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,n){let r,s,i,o,c,l,u;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(X("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,n))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(u=Date.now(),ps()<=ve.DEBUG&&X("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(u-l)+`ms
Total Duration: ${u-f}ms`),L.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function OC(t,e){return new DC(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VC{constructor(){this.changes=new es(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,It.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?L.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MC{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LC{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Ni(r.mutation,s,Xt.empty(),Ue.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,Ee()).next(()=>r))}getLocalViewOfDocuments(e,n,r=Ee()){const s=Ur();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=pi();return i.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Ur();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,Ee()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{n.set(o,c)})})}computeViews(e,n,r,s){let i=Fn();const o=xi(),c=function(){return xi()}();return n.forEach((l,u)=>{const f=r.get(u.key);s.has(u.key)&&(f===void 0||f.mutation instanceof ts)?i=i.insert(u.key,u):f!==void 0?(o.set(u.key,f.mutation.getFieldMask()),Ni(f.mutation,u,f.mutation.getFieldMask(),Ue.now())):o.set(u.key,Xt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((u,f)=>o.set(u,f)),n.forEach((u,f)=>{var p;return c.set(u,new MC(f,(p=o.get(u))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,n){const r=xi();let s=new We((o,c)=>o-c),i=Ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const c of o)c.keys().forEach(l=>{const u=n.get(l);if(u===null)return;let f=r.get(l)||Xt.empty();f=c.applyToLocalView(u,f),r.set(l,f);const p=(s.get(c.batchId)||Ee()).add(l);s=s.insert(c.batchId,p)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,f=l.value,p=Y_();f.forEach(m=>{if(!i.has(m)){const v=ry(n.get(m),r.get(m));v!==null&&p.set(m,v),i=i.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return L.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return re.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):G_(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):L.resolve(Ur());let c=qi,l=i;return o.next(u=>L.forEach(u,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?L.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{l=l.insert(f,m)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,l,u,Ee())).next(f=>({batchId:c,changes:J_(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new re(n)).next(r=>{let s=pi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=pi();return this.indexManager.getCollectionParents(e,i).next(c=>L.forEach(c,l=>{const u=function(p,m){return new Gs(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,r,s).next(f=>{f.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((l,u)=>{const f=u.getKey();o.get(f)===null&&(o=o.insert(f,It.newInvalidDocument(f)))});let c=pi();return o.forEach((l,u)=>{const f=i.get(l);f!==void 0&&Ni(f.mutation,u,Xt.empty(),Ue.now()),Ja(n,u)&&(c=c.insert(l,u))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FC{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,n){return L.resolve(this.Br.get(n))}saveBundleMetadata(e,n){return this.Br.set(n.id,function(s){return{id:s.id,version:s.version,createTime:gn(s.createTime)}}(n)),L.resolve()}getNamedQuery(e,n){return L.resolve(this.Lr.get(n))}saveNamedQuery(e,n){return this.Lr.set(n.name,function(s){return{name:s.name,query:SC(s.bundledQuery),readTime:gn(s.readTime)}}(n)),L.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UC{constructor(){this.overlays=new We(re.comparator),this.kr=new Map}getOverlay(e,n){return L.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Ur();return L.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.wt(e,n,i)}),L.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.kr.delete(r)),L.resolve()}getOverlaysForCollection(e,n,r){const s=Ur(),i=n.length+1,o=new re(n.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return L.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new We((u,f)=>u-f);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>r){let f=i.get(u.largestBatchId);f===null&&(f=Ur(),i=i.insert(u.largestBatchId,f)),f.set(u.getKey(),u)}}const c=Ur(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((u,f)=>c.set(u,f)),!(c.size()>=s)););return L.resolve(c)}wt(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new sC(n,r));let i=this.kr.get(n);i===void 0&&(i=Ee(),this.kr.set(n,i)),this.kr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BC{constructor(){this.sessionToken=ft.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,L.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(){this.qr=new rt(it.Qr),this.$r=new rt(it.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,n){const r=new it(e,n);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Wr(new it(e,n))}Gr(e,n){e.forEach(r=>this.removeReference(r,n))}zr(e){const n=new re(new Le([])),r=new it(n,e),s=new it(n,e+1),i=[];return this.$r.forEachInRange([r,s],o=>{this.Wr(o),i.push(o.key)}),i}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const n=new re(new Le([])),r=new it(n,e),s=new it(n,e+1);let i=Ee();return this.$r.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new it(e,0),r=this.qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class it{constructor(e,n){this.key=e,this.Hr=n}static Qr(e,n){return re.comparator(e.key,n.key)||_e(e.Hr,n.Hr)}static Ur(e,n){return _e(e.Hr,n.Hr)||re.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jC{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.er=1,this.Yr=new rt(it.Qr)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new rC(i,n,r,s);this.mutationQueue.push(o);for(const c of s)this.Yr=this.Yr.add(new it(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return L.resolve(o)}lookupMutationBatch(e,n){return L.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.Xr(r),i=s<0?0:s;return L.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?bu:this.er-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new it(n,0),s=new it(n,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],o=>{const c=this.Zr(o.Hr);i.push(c)}),L.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new rt(_e);return n.forEach(s=>{const i=new it(s,0),o=new it(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,o],c=>{r=r.add(c.Hr)})}),L.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;re.isDocumentKey(i)||(i=i.child(""));const o=new it(new re(i),0);let c=new rt(_e);return this.Yr.forEachWhile(l=>{const u=l.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(c=c.add(l.Hr)),!0)},o),L.resolve(this.ei(c))}ei(e){const n=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Ce(this.ti(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return L.forEach(n.mutations,s=>{const i=new it(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,n){const r=new it(n,0),s=this.Yr.firstAfterOrEqual(r);return L.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}ti(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $C{constructor(e){this.ni=e,this.docs=function(){return new We(re.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.ni(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return L.resolve(r?r.document.mutableCopy():It.newInvalidDocument(n))}getEntries(e,n){let r=Fn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():It.newInvalidDocument(s))}),L.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Fn();const o=n.path,c=new re(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:f}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||yS(_S(f),r)<=0||(s.has(f.key)||Ja(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return L.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ce(9500)}ri(e,n){return L.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new qC(this)}getSize(e){return L.resolve(this.size)}}class qC extends VC{constructor(e){super(),this.Or=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)}),L.waitFor(n)}getFromCache(e,n){return this.Or.getEntry(e,n)}getAllFromCache(e,n){return this.Or.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HC{constructor(e){this.persistence=e,this.ii=new es(n=>Cu(n),Pu),this.lastRemoteSnapshotVersion=fe.min(),this.highestTargetId=0,this.si=0,this.oi=new Vu,this.targetCount=0,this._i=Ms.ar()}forEachTarget(e,n){return this.ii.forEach((r,s)=>n(s)),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.si&&(this.si=n),L.resolve()}hr(e){this.ii.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this._i=new Ms(n),this.highestTargetId=n),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,n){return this.hr(n),this.targetCount+=1,L.resolve()}updateTargetData(e,n){return this.hr(n),L.resolve()}removeTargetData(e,n){return this.ii.delete(n.target),this.oi.zr(n.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.ii.forEach((o,c)=>{c.sequenceNumber<=n&&r.get(c.targetId)===null&&(this.ii.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),L.waitFor(i).next(()=>s)}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,n){const r=this.ii.get(n)||null;return L.resolve(r)}addMatchingKeys(e,n,r){return this.oi.Kr(n,r),L.resolve()}removeMatchingKeys(e,n,r){this.oi.Gr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),L.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.oi.zr(n),L.resolve()}getMatchingKeysForTargetId(e,n){const r=this.oi.Jr(n);return L.resolve(r)}containsKey(e,n){return L.resolve(this.oi.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _y{constructor(e,n){this.ai={},this.overlays={},this.ui=new Ga(0),this.ci=!1,this.ci=!0,this.li=new BC,this.referenceDelegate=e(this),this.hi=new HC(this),this.indexManager=new CC,this.remoteDocumentCache=function(s){return new $C(s)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new RC(n),this.Ti=new FC(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new UC,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ai[e.toKey()];return r||(r=new jC(n,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,n,r){X("MemoryPersistence","Starting transaction:",e);const s=new WC(this.ui.next());return this.referenceDelegate.Ii(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(e,n){return L.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,n)))}}class WC extends ES{constructor(e){super(),this.currentSequenceNumber=e}}class Mu{constructor(e){this.persistence=e,this.Ai=new Vu,this.Ri=null}static Vi(e){return new Mu(e)}get mi(){if(this.Ri)return this.Ri;throw ce(60996)}addReference(e,n,r){return this.Ai.addReference(r,n),this.mi.delete(r.toString()),L.resolve()}removeReference(e,n,r){return this.Ai.removeReference(r,n),this.mi.add(r.toString()),L.resolve()}markPotentiallyOrphaned(e,n){return this.mi.add(n.toString()),L.resolve()}removeTarget(e,n){this.Ai.zr(n.targetId).forEach(s=>this.mi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.mi.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Ii(){this.Ri=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.mi,r=>{const s=re.fromPath(r);return this.fi(e,s).next(i=>{i||n.removeEntry(s,fe.min())})}).next(()=>(this.Ri=null,n.apply(e)))}updateLimboDocument(e,n){return this.fi(e,n).next(r=>{r?this.mi.delete(n.toString()):this.mi.add(n.toString())})}Pi(e){return 0}fi(e,n){return L.or([()=>L.resolve(this.Ai.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ei(e,n)])}}class Ia{constructor(e,n){this.persistence=e,this.gi=new es(r=>wS(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=OC(this,n)}static Vi(e,n){return new Ia(e,n)}Ii(){}di(e){return L.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}mr(e){const n=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}yr(e){let n=0;return this.gr(e,r=>{n++}).next(()=>n)}gr(e,n){return L.forEach(this.gi,(r,s)=>this.Sr(e,r,s).next(i=>i?L.resolve():n(s)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,o=>this.Sr(e,o,n).next(c=>{c||(r++,i.removeEntry(o,fe.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.gi.set(n,e.currentSequenceNumber),L.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.gi.set(r,e.currentSequenceNumber),L.resolve()}removeReference(e,n,r){return this.gi.set(r,e.currentSequenceNumber),L.resolve()}updateLimboDocument(e,n){return this.gi.set(n,e.currentSequenceNumber),L.resolve()}Pi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Go(e.data.value)),n}Sr(e,n,r){return L.or([()=>this.persistence.Ei(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.gi.get(n);return L.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Is=r,this.ds=s}static Es(e,n){let r=Ee(),s=Ee();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Lu(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GC{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zC{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Yw()?8:IS(wt())>0?6:4}()}initialize(e,n){this.gs=e,this.indexManager=n,this.As=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ps(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ys(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new GC;return this.ws(e,n,o).next(c=>{if(i.result=c,this.Rs)return this.Ss(e,n,o,c.size)})}).next(()=>i.result)}Ss(e,n,r,s){return r.documentReadCount<this.Vs?(ps()<=ve.DEBUG&&X("QueryEngine","SDK will not create cache indexes for query:",ms(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),L.resolve()):(ps()<=ve.DEBUG&&X("QueryEngine","Query:",ms(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(ps()<=ve.DEBUG&&X("QueryEngine","The SDK decides to create cache indexes for query:",ms(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,mn(n))):L.resolve())}ps(e,n){if(sp(n))return L.resolve(null);let r=mn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Cl(n,null,"F"),r=mn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=Ee(...i);return this.gs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const u=this.bs(n,c);return this.Ds(n,u,o,l.readTime)?this.ps(e,Cl(n,null,"F")):this.vs(e,u,n,l)}))})))}ys(e,n,r,s){return sp(n)||s.isEqual(fe.min())?L.resolve(null):this.gs.getDocuments(e,r).next(i=>{const o=this.bs(n,i);return this.Ds(n,o,r,s)?L.resolve(null):(ps()<=ve.DEBUG&&X("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ms(n)),this.vs(e,o,n,gS(s,qi)).next(c=>c))})}bs(e,n){let r=new rt(K_(e));return n.forEach((s,i)=>{Ja(e,i)&&(r=r.add(i))}),r}Ds(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,n,r){return ps()<=ve.DEBUG&&X("QueryEngine","Using full collection scan to execute query:",ms(n)),this.gs.getDocumentsMatchingQuery(e,n,vr.min(),r)}vs(e,n,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu="LocalStore",KC=3e8;class QC{constructor(e,n,r,s){this.persistence=e,this.Cs=n,this.serializer=s,this.Fs=new We(_e),this.Ms=new es(i=>Cu(i),Pu),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new LC(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Fs))}}function JC(t,e,n,r){return new QC(t,e,n,r)}async function yy(t,e){const n=de(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.Ns(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let l=Ee();for(const u of s){o.push(u.batchId);for(const f of u.mutations)l=l.add(f.key)}for(const u of i){c.push(u.batchId);for(const f of u.mutations)l=l.add(f.key)}return n.localDocuments.getDocuments(r,l).next(u=>({Bs:u,removedBatchIds:o,addedBatchIds:c}))})})}function YC(t,e){const n=de(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Os.newChangeBuffer({trackRemovals:!0});return function(c,l,u,f){const p=u.batch,m=p.keys();let v=L.resolve();return m.forEach(C=>{v=v.next(()=>f.getEntry(l,C)).next(x=>{const k=u.docVersions.get(C);Ce(k!==null,48541),x.version.compareTo(k)<0&&(p.applyToRemoteDocument(x,u),x.isValidDocument()&&(x.setReadTime(u.commitVersion),f.addEntry(x)))})}),v.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=Ee();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function vy(t){const e=de(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.hi.getLastRemoteSnapshotVersion(n))}function XC(t,e){const n=de(t),r=e.snapshotVersion;let s=n.Fs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Os.newChangeBuffer({trackRemovals:!0});s=n.Fs;const c=[];e.targetChanges.forEach((f,p)=>{const m=s.get(p);if(!m)return;c.push(n.hi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>n.hi.addMatchingKeys(i,f.addedDocuments,p)));let v=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?v=v.withResumeToken(ft.EMPTY_BYTE_STRING,fe.min()).withLastLimboFreeSnapshotVersion(fe.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,r)),s=s.insert(p,v),function(x,k,j){return x.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=KC?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(m,v,f)&&c.push(n.hi.updateTargetData(i,v))});let l=Fn(),u=Ee();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(ZC(i,o,e.documentUpdates).next(f=>{l=f.Ls,u=f.ks})),!r.isEqual(fe.min())){const f=n.hi.getLastRemoteSnapshotVersion(i).next(p=>n.hi.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return L.waitFor(c).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,l,u)).next(()=>l)}).then(i=>(n.Fs=s,i))}function ZC(t,e,n){let r=Ee(),s=Ee();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Fn();return n.forEach((c,l)=>{const u=i.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(fe.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):X(Fu,"Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)}),{Ls:o,ks:s}})}function eP(t,e){const n=de(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=bu),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function tP(t,e){const n=de(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.hi.getTargetData(r,e).next(i=>i?(s=i,L.resolve(s)):n.hi.allocateTargetId(r).next(o=>(s=new ar(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.hi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Fs=n.Fs.insert(r.targetId,r),n.Ms.set(e,r.targetId)),r})}async function Dl(t,e,n){const r=de(t),s=r.Fs.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Ws(o))throw o;X(Fu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function _p(t,e,n){const r=de(t);let s=fe.min(),i=Ee();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,u,f){const p=de(l),m=p.Ms.get(f);return m!==void 0?L.resolve(p.Fs.get(m)):p.hi.getTargetData(u,f)}(r,o,mn(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(o,c.targetId).next(l=>{i=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,n?s:fe.min(),n?i:Ee())).next(c=>(nP(r,$S(e),c),{documents:c,qs:i})))}function nP(t,e,n){let r=t.xs.get(e)||fe.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.xs.set(e,r)}class yp{constructor(){this.activeTargetIds=KS()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class rP{constructor(){this.Fo=new yp,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,n,r){this.Mo[e]=n}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new yp,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sP{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp="ConnectivityMonitor";class Ep{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){X(vp,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){X(vp,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mo=null;function Ol(){return Mo===null?Mo=function(){return 268435456+Math.round(2147483648*Math.random())}():Mo++,"0x"+Mo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc="RestConnection",iP={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class oP{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=n+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===ma?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,n,r,s,i){const o=Ol(),c=this.Go(e,n.toUriEncodedString());X(Wc,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(l,s,i);const{host:u}=new URL(c),f=Us(u);return this.jo(e,c,l,r,f).then(p=>(X(Wc,`Received RPC '${e}' ${o}: `,p),p),p=>{throw yr(Wc,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p})}Jo(e,n,r,s,i,o){return this.Wo(e,n,r,s,i)}zo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+qs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Go(e,n){const r=iP[e];return`${this.$o}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aP{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt="WebChannelConnection";class cP extends oP{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,n,r,s,i){const o=Ol();return new Promise((c,l)=>{const u=new E_;u.setWithCredentials(!0),u.listenOnce(I_.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Wo.NO_ERROR:const p=u.getResponseJson();X(gt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case Wo.TIMEOUT:X(gt,`RPC '${e}' ${o} timed out`),l(new Y(M.DEADLINE_EXCEEDED,"Request time out"));break;case Wo.HTTP_ERROR:const m=u.getStatus();if(X(gt,`RPC '${e}' ${o} failed with status:`,m,"response text:",u.getResponseText()),m>0){let v=u.getResponseJson();Array.isArray(v)&&(v=v[0]);const C=v==null?void 0:v.error;if(C&&C.status&&C.message){const x=function(j){const U=j.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(U)>=0?U:M.UNKNOWN}(C.status);l(new Y(x,C.message))}else l(new Y(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new Y(M.UNAVAILABLE,"Connection failed."));break;default:ce(9055,{c_:e,streamId:o,l_:u.getLastErrorCode(),h_:u.getLastError()})}}finally{X(gt,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);X(gt,`RPC '${e}' ${o} sending request:`,s),u.send(n,"POST",f,r,15)})}P_(e,n,r){const s=Ol(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=A_(),c=w_(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.zo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const f=i.join("");X(gt,`Creating RPC '${e}' stream ${s}: ${f}`,l);const p=o.createWebChannel(f,l);this.T_(p);let m=!1,v=!1;const C=new aP({Ho:k=>{v?X(gt,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(m||(X(gt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),X(gt,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},Yo:()=>p.close()}),x=(k,j,U)=>{k.listen(j,$=>{try{U($)}catch(q){setTimeout(()=>{throw q},0)}})};return x(p,di.EventType.OPEN,()=>{v||(X(gt,`RPC '${e}' stream ${s} transport opened.`),C.s_())}),x(p,di.EventType.CLOSE,()=>{v||(v=!0,X(gt,`RPC '${e}' stream ${s} transport closed`),C.__(),this.I_(p))}),x(p,di.EventType.ERROR,k=>{v||(v=!0,yr(gt,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),C.__(new Y(M.UNAVAILABLE,"The operation could not be completed")))}),x(p,di.EventType.MESSAGE,k=>{var j;if(!v){const U=k.data[0];Ce(!!U,16349);const $=U,q=($==null?void 0:$.error)||((j=$[0])===null||j===void 0?void 0:j.error);if(q){X(gt,`RPC '${e}' stream ${s} received error:`,q);const ee=q.status;let oe=function(_){const T=Ye[_];if(T!==void 0)return oy(T)}(ee),b=q.message;oe===void 0&&(oe=M.INTERNAL,b="Unknown error status: "+ee+" with message "+q.message),v=!0,C.__(new Y(oe,b)),p.close()}else X(gt,`RPC '${e}' stream ${s} received:`,U),C.a_(U)}}),x(c,T_.STAT_EVENT,k=>{k.stat===Il.PROXY?X(gt,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===Il.NOPROXY&&X(gt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(n=>n===e)}}function Gc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(t){return new fC(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ey{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Fi=e,this.timerId=n,this.d_=r,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const n=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,n-r);s>0&&X("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ip="PersistentStream";class Iy{constructor(e,n,r,s,i,o,c,l){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Ey(e,n)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(Ln(n.toString()),Ln("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(n)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),n=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===n&&this.W_(r,s)},r=>{e(()=>{const s=new Y(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}W_(e,n){const r=this.K_(this.b_);this.stream=this.z_(e,n),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return X(Ip,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return n=>{this.Fi.enqueueAndForget(()=>this.b_===e?n():(X(Ip,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class lP extends Iy{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}z_(e,n){return this.connection.P_("Listen",e,n)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const n=mC(this.serializer,e),r=function(i){if(!("targetChange"in i))return fe.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?fe.min():o.readTime?gn(o.readTime):fe.min()}(e);return this.listener.J_(n,r)}H_(e){const n={};n.database=kl(this.serializer),n.addTarget=function(i,o){let c;const l=o.target;if(c=Rl(l)?{documents:yC(i,l)}:{query:vC(i,l).Vt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=ly(i,o.resumeToken);const u=Pl(i,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(fe.min())>0){c.readTime=Ea(i,o.snapshotVersion.toTimestamp());const u=Pl(i,o.expectedCount);u!==null&&(c.expectedCount=u)}return c}(this.serializer,e);const r=IC(this.serializer,e);r&&(n.labels=r),this.k_(n)}Y_(e){const n={};n.database=kl(this.serializer),n.removeTarget=e,this.k_(n)}}class uP extends Iy{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,n){return this.connection.P_("Write",e,n)}j_(e){return Ce(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Ce(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){Ce(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const n=_C(e.writeResults,e.commitTime),r=gn(e.commitTime);return this.listener.ta(r,n)}na(){const e={};e.database=kl(this.serializer),this.k_(e)}X_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>gC(this.serializer,r))};this.k_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hP{}class fP extends hP{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new Y(M.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(e,xl(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Y(M.UNKNOWN,i.toString())})}Jo(e,n,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Jo(e,xl(n,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new Y(M.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class dP{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Ln(n),this._a=!1):X("OnlineStateTracker",n)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr="RemoteStore";class pP{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo(o=>{r.enqueueAndForget(async()=>{ns(this)&&(X(Jr,"Restarting streams for network reachability change."),await async function(l){const u=de(l);u.Ia.add(4),await co(u),u.Aa.set("Unknown"),u.Ia.delete(4),await tc(u)}(this))})}),this.Aa=new dP(r,s)}}async function tc(t){if(ns(t))for(const e of t.da)await e(!0)}async function co(t){for(const e of t.da)await e(!1)}function Ty(t,e){const n=de(t);n.Ta.has(e.targetId)||(n.Ta.set(e.targetId,e),$u(n)?ju(n):zs(n).x_()&&Bu(n,e))}function Uu(t,e){const n=de(t),r=zs(n);n.Ta.delete(e),r.x_()&&wy(n,e),n.Ta.size===0&&(r.x_()?r.B_():ns(n)&&n.Aa.set("Unknown"))}function Bu(t,e){if(t.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(fe.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}zs(t).H_(e)}function wy(t,e){t.Ra.$e(e),zs(t).Y_(e)}function ju(t){t.Ra=new cC({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>t.Ta.get(e)||null,lt:()=>t.datastore.serializer.databaseId}),zs(t).start(),t.Aa.aa()}function $u(t){return ns(t)&&!zs(t).M_()&&t.Ta.size>0}function ns(t){return de(t).Ia.size===0}function Ay(t){t.Ra=void 0}async function mP(t){t.Aa.set("Online")}async function gP(t){t.Ta.forEach((e,n)=>{Bu(t,e)})}async function _P(t,e){Ay(t),$u(t)?(t.Aa.la(e),ju(t)):t.Aa.set("Unknown")}async function yP(t,e,n){if(t.Aa.set("Online"),e instanceof cy&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ta.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ta.delete(c),s.Ra.removeTarget(c))}(t,e)}catch(r){X(Jr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ta(t,r)}else if(e instanceof Qo?t.Ra.Ye(e):e instanceof ay?t.Ra.it(e):t.Ra.et(e),!n.isEqual(fe.min()))try{const r=await vy(t.localStore);n.compareTo(r)>=0&&await function(i,o){const c=i.Ra.Pt(o);return c.targetChanges.forEach((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ta.get(u);f&&i.Ta.set(u,f.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,u)=>{const f=i.Ta.get(l);if(!f)return;i.Ta.set(l,f.withResumeToken(ft.EMPTY_BYTE_STRING,f.snapshotVersion)),wy(i,l);const p=new ar(f.target,l,u,f.sequenceNumber);Bu(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(t,n)}catch(r){X(Jr,"Failed to raise snapshot:",r),await Ta(t,r)}}async function Ta(t,e,n){if(!Ws(e))throw e;t.Ia.add(1),await co(t),t.Aa.set("Offline"),n||(n=()=>vy(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{X(Jr,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await tc(t)})}function by(t,e){return e().catch(n=>Ta(t,n,e))}async function nc(t){const e=de(t),n=wr(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:bu;for(;vP(e);)try{const s=await eP(e.localStore,r);if(s===null){e.Pa.length===0&&n.B_();break}r=s.batchId,EP(e,s)}catch(s){await Ta(e,s)}Ry(e)&&Sy(e)}function vP(t){return ns(t)&&t.Pa.length<10}function EP(t,e){t.Pa.push(e);const n=wr(t);n.x_()&&n.Z_&&n.X_(e.mutations)}function Ry(t){return ns(t)&&!wr(t).M_()&&t.Pa.length>0}function Sy(t){wr(t).start()}async function IP(t){wr(t).na()}async function TP(t){const e=wr(t);for(const n of t.Pa)e.X_(n.mutations)}async function wP(t,e,n){const r=t.Pa.shift(),s=ku.from(r,e,n);await by(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await nc(t)}async function AP(t,e){e&&wr(t).Z_&&await async function(r,s){if(function(o){return oC(o)&&o!==M.ABORTED}(s.code)){const i=r.Pa.shift();wr(r).N_(),await by(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await nc(r)}}(t,e),Ry(t)&&Sy(t)}async function Tp(t,e){const n=de(t);n.asyncQueue.verifyOperationInProgress(),X(Jr,"RemoteStore received new credentials");const r=ns(n);n.Ia.add(3),await co(n),r&&n.Aa.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await tc(n)}async function bP(t,e){const n=de(t);e?(n.Ia.delete(2),await tc(n)):e||(n.Ia.add(2),await co(n),n.Aa.set("Unknown"))}function zs(t){return t.Va||(t.Va=function(n,r,s){const i=de(n);return i.ia(),new lP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Zo:mP.bind(null,t),e_:gP.bind(null,t),n_:_P.bind(null,t),J_:yP.bind(null,t)}),t.da.push(async e=>{e?(t.Va.N_(),$u(t)?ju(t):t.Aa.set("Unknown")):(await t.Va.stop(),Ay(t))})),t.Va}function wr(t){return t.ma||(t.ma=function(n,r,s){const i=de(n);return i.ia(),new uP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),e_:IP.bind(null,t),n_:AP.bind(null,t),ea:TP.bind(null,t),ta:wP.bind(null,t)}),t.da.push(async e=>{e?(t.ma.N_(),await nc(t)):(await t.ma.stop(),t.Pa.length>0&&(X(Jr,`Stopping write stream with ${t.Pa.length} pending writes`),t.Pa=[]))})),t.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new pr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,c=new qu(e,n,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Y(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Hu(t,e){if(Ln("AsyncQueue",`${e}: ${t}`),Ws(t))return new Y(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{static emptySet(e){return new Rs(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||re.comparator(n.key,r.key):(n,r)=>re.comparator(n.key,r.key),this.keyedMap=pi(),this.sortedSet=new We(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Rs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Rs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(){this.fa=new We(re.comparator)}track(e){const n=e.doc.key,r=this.fa.get(n);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(n,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(n):e.type===1&&r.type===2?this.fa=this.fa.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):ce(63341,{At:e,ga:r}):this.fa=this.fa.insert(n,e)}pa(){const e=[];return this.fa.inorderTraversal((n,r)=>{e.push(r)}),e}}class Ls{constructor(e,n,r,s,i,o,c,l,u){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(c=>{o.push({type:0,doc:c})}),new Ls(e,n,Rs.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Qa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RP{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class SP{constructor(){this.queries=Ap(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(n,r){const s=de(n),i=s.queries;s.queries=Ap(),i.forEach((o,c)=>{for(const l of c.wa)l.onError(r)})})(this,new Y(M.ABORTED,"Firestore shutting down"))}}function Ap(){return new es(t=>z_(t),Qa)}async function Cy(t,e){const n=de(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new RP,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await n.onListen(s,!0);break;case 1:i.ya=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const c=Hu(o,`Initialization of query '${ms(e.query)}' failed`);return void e.onError(c)}n.queries.set(s,i),i.wa.push(e),e.va(n.onlineState),i.ya&&e.Ca(i.ya)&&Wu(n)}async function Py(t,e){const n=de(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.wa.indexOf(e);o>=0&&(i.wa.splice(o,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function CP(t,e){const n=de(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const c of o.wa)c.Ca(s)&&(r=!0);o.ya=s}}r&&Wu(n)}function PP(t,e,n){const r=de(t),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(n);r.queries.delete(e)}function Wu(t){t.Da.forEach(e=>{e.next()})}var Vl,bp;(bp=Vl||(Vl={})).Fa="default",bp.Cache="cache";class xy{constructor(e,n,r){this.query=e,this.Ma=n,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Ls(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),n=!0):this.Ba(e,this.onlineState)&&(this.La(e),n=!0),this.Oa=e,n}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let n=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),n=!0),n}Ba(e,n){if(!e.fromCache||!this.ba())return!0;const r=n!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const n=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}La(e){e=Ls.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Vl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ny{constructor(e){this.key=e}}class ky{constructor(e){this.key=e}}class xP{constructor(e,n){this.query=e,this.Ha=n,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=Ee(),this.mutatedKeys=Ee(),this.Xa=K_(e),this.eu=new Rs(this.Xa)}get tu(){return this.Ha}nu(e,n){const r=n?n.ru:new wp,s=n?n.eu:this.eu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const m=s.get(f),v=Ja(this.query,p)?p:null,C=!!m&&this.mutatedKeys.has(m.key),x=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let k=!1;m&&v?m.data.isEqual(v.data)?C!==x&&(r.track({type:3,doc:v}),k=!0):this.iu(m,v)||(r.track({type:2,doc:v}),k=!0,(l&&this.Xa(v,l)>0||u&&this.Xa(v,u)<0)&&(c=!0)):!m&&v?(r.track({type:0,doc:v}),k=!0):m&&!v&&(r.track({type:1,doc:m}),k=!0,(l||u)&&(c=!0)),k&&(v?(o=o.add(v),i=x?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{eu:o,ru:r,Ds:c,mutatedKeys:i}}iu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort((f,p)=>function(v,C){const x=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ce(20277,{At:k})}};return x(v)-x(C)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(r),s=s!=null&&s;const c=n&&!s?this.ou():[],l=this.Za.size===0&&this.current&&!s?1:0,u=l!==this.Ya;return this.Ya=l,o.length!==0||u?{snapshot:new Ls(this.query,e.eu,i,o,e.mutatedKeys,l===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new wp,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(n=>this.Ha=this.Ha.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ha=this.Ha.delete(n)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=Ee(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const n=[];return e.forEach(r=>{this.Za.has(r)||n.push(new ky(r))}),this.Za.forEach(r=>{e.has(r)||n.push(new Ny(r))}),n}uu(e){this.Ha=e.qs,this.Za=Ee();const n=this.nu(e.documents);return this.applyChanges(n,!0)}cu(){return Ls.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Gu="SyncEngine";class NP{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class kP{constructor(e){this.key=e,this.lu=!1}}class DP{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new es(c=>z_(c),Qa),this.Tu=new Map,this.Iu=new Set,this.du=new We(re.comparator),this.Eu=new Map,this.Au=new Vu,this.Ru={},this.Vu=new Map,this.mu=Ms.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function OP(t,e,n=!0){const r=Fy(t);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await Dy(r,e,n,!0),s}async function VP(t,e){const n=Fy(t);await Dy(n,e,!0,!1)}async function Dy(t,e,n,r){const s=await tP(t.localStore,mn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let c;return r&&(c=await MP(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&Ty(t.remoteStore,s),c}async function MP(t,e,n,r,s){t.gu=(p,m,v)=>async function(x,k,j,U){let $=k.view.nu(j);$.Ds&&($=await _p(x.localStore,k.query,!1).then(({documents:b})=>k.view.nu(b,$)));const q=U&&U.targetChanges.get(k.targetId),ee=U&&U.targetMismatches.get(k.targetId)!=null,oe=k.view.applyChanges($,x.isPrimaryClient,q,ee);return Sp(x,k.targetId,oe._u),oe.snapshot}(t,p,m,v);const i=await _p(t.localStore,e,!0),o=new xP(e,i.qs),c=o.nu(i.documents),l=ao.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),u=o.applyChanges(c,t.isPrimaryClient,l);Sp(t,n,u._u);const f=new NP(e,n,o);return t.Pu.set(e,f),t.Tu.has(n)?t.Tu.get(n).push(e):t.Tu.set(n,[e]),u.snapshot}async function LP(t,e,n){const r=de(t),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter(o=>!Qa(o,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Dl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Uu(r.remoteStore,s.targetId),Ml(r,s.targetId)}).catch(Hs)):(Ml(r,s.targetId),await Dl(r.localStore,s.targetId,!0))}async function FP(t,e){const n=de(t),r=n.Pu.get(e),s=n.Tu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Uu(n.remoteStore,r.targetId))}async function UP(t,e,n){const r=GP(t);try{const s=await function(o,c){const l=de(o),u=Ue.now(),f=c.reduce((v,C)=>v.add(C.key),Ee());let p,m;return l.persistence.runTransaction("Locally write mutations","readwrite",v=>{let C=Fn(),x=Ee();return l.Os.getEntries(v,f).next(k=>{C=k,C.forEach((j,U)=>{U.isValidDocument()||(x=x.add(j))})}).next(()=>l.localDocuments.getOverlayedDocuments(v,C)).next(k=>{p=k;const j=[];for(const U of c){const $=tC(U,p.get(U.key).overlayedDocument);$!=null&&j.push(new ts(U.key,$,U_($.value.mapValue),Nn.exists(!0)))}return l.mutationQueue.addMutationBatch(v,u,j,c)}).next(k=>{m=k;const j=k.applyToLocalDocumentSet(p,x);return l.documentOverlayCache.saveOverlays(v,k.batchId,j)})}).then(()=>({batchId:m.batchId,changes:J_(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,l){let u=o.Ru[o.currentUser.toKey()];u||(u=new We(_e)),u=u.insert(c,l),o.Ru[o.currentUser.toKey()]=u}(r,s.batchId,n),await lo(r,s.changes),await nc(r.remoteStore)}catch(s){const i=Hu(s,"Failed to persist write");n.reject(i)}}async function Oy(t,e){const n=de(t);try{const r=await XC(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Eu.get(i);o&&(Ce(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.lu=!0:s.modifiedDocuments.size>0?Ce(o.lu,14607):s.removedDocuments.size>0&&(Ce(o.lu,42227),o.lu=!1))}),await lo(n,r,e)}catch(r){await Hs(r)}}function Rp(t,e,n){const r=de(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Pu.forEach((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const l=de(o);l.onlineState=c;let u=!1;l.queries.forEach((f,p)=>{for(const m of p.wa)m.va(c)&&(u=!0)}),u&&Wu(l)}(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function BP(t,e,n){const r=de(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Eu.get(e),i=s&&s.key;if(i){let o=new We(re.comparator);o=o.insert(i,It.newNoDocument(i,fe.min()));const c=Ee().add(i),l=new Za(fe.min(),new Map,new We(_e),o,c);await Oy(r,l),r.du=r.du.remove(i),r.Eu.delete(e),zu(r)}else await Dl(r.localStore,e,!1).then(()=>Ml(r,e,n)).catch(Hs)}async function jP(t,e){const n=de(t),r=e.batch.batchId;try{const s=await YC(n.localStore,e);My(n,r,null),Vy(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await lo(n,s)}catch(s){await Hs(s)}}async function $P(t,e,n){const r=de(t);try{const s=await function(o,c){const l=de(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let f;return l.mutationQueue.lookupMutationBatch(u,c).next(p=>(Ce(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(u,p))).next(()=>l.mutationQueue.performConsistencyCheck(u)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(u,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,f)).next(()=>l.localDocuments.getDocuments(u,f))})}(r.localStore,e);My(r,e,n),Vy(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await lo(r,s)}catch(s){await Hs(s)}}function Vy(t,e){(t.Vu.get(e)||[]).forEach(n=>{n.resolve()}),t.Vu.delete(e)}function My(t,e,n){const r=de(t);let s=r.Ru[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ru[r.currentUser.toKey()]=s}}function Ml(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Tu.get(e))t.Pu.delete(r),n&&t.hu.pu(r,n);t.Tu.delete(e),t.isPrimaryClient&&t.Au.zr(e).forEach(r=>{t.Au.containsKey(r)||Ly(t,r)})}function Ly(t,e){t.Iu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Uu(t.remoteStore,n),t.du=t.du.remove(e),t.Eu.delete(n),zu(t))}function Sp(t,e,n){for(const r of n)r instanceof Ny?(t.Au.addReference(r.key,e),qP(t,r)):r instanceof ky?(X(Gu,"Document no longer in limbo: "+r.key),t.Au.removeReference(r.key,e),t.Au.containsKey(r.key)||Ly(t,r.key)):ce(19791,{yu:r})}function qP(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Iu.has(r)||(X(Gu,"New document in limbo: "+n),t.Iu.add(r),zu(t))}function zu(t){for(;t.Iu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new re(Le.fromString(e)),r=t.mu.next();t.Eu.set(r,new kP(n)),t.du=t.du.insert(n,r),Ty(t.remoteStore,new ar(mn(xu(n.path)),r,"TargetPurposeLimboResolution",Ga.ue))}}async function lo(t,e,n){const r=de(t),s=[],i=[],o=[];r.Pu.isEmpty()||(r.Pu.forEach((c,l)=>{o.push(r.gu(l,e,n).then(u=>{var f;if((u||n)&&r.isPrimaryClient){const p=u?!u.fromCache:(f=n==null?void 0:n.targetChanges.get(l.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(u){s.push(u);const p=Lu.Es(l.targetId,u);i.push(p)}}))}),await Promise.all(o),r.hu.J_(s),await async function(l,u){const f=de(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>L.forEach(u,m=>L.forEach(m.Is,v=>f.persistence.referenceDelegate.addReference(p,m.targetId,v)).next(()=>L.forEach(m.ds,v=>f.persistence.referenceDelegate.removeReference(p,m.targetId,v)))))}catch(p){if(!Ws(p))throw p;X(Fu,"Failed to update sequence numbers: "+p)}for(const p of u){const m=p.targetId;if(!p.fromCache){const v=f.Fs.get(m),C=v.snapshotVersion,x=v.withLastLimboFreeSnapshotVersion(C);f.Fs=f.Fs.insert(m,x)}}}(r.localStore,i))}async function HP(t,e){const n=de(t);if(!n.currentUser.isEqual(e)){X(Gu,"User change. New user:",e.toKey());const r=await yy(n.localStore,e);n.currentUser=e,function(i,o){i.Vu.forEach(c=>{c.forEach(l=>{l.reject(new Y(M.CANCELLED,o))})}),i.Vu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await lo(n,r.Bs)}}function WP(t,e){const n=de(t),r=n.Eu.get(e);if(r&&r.lu)return Ee().add(r.key);{let s=Ee();const i=n.Tu.get(e);if(!i)return s;for(const o of i){const c=n.Pu.get(o);s=s.unionWith(c.view.tu)}return s}}function Fy(t){const e=de(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Oy.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=WP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=BP.bind(null,e),e.hu.J_=CP.bind(null,e.eventManager),e.hu.pu=PP.bind(null,e.eventManager),e}function GP(t){const e=de(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=jP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=$P.bind(null,e),e}class wa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ec(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,n){return null}Fu(e,n){return null}vu(e){return JC(this.persistence,new zC,e.initialUser,this.serializer)}Du(e){return new _y(Mu.Vi,this.serializer)}bu(e){return new rP}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wa.provider={build:()=>new wa};class zP extends wa{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,n){Ce(this.persistence.referenceDelegate instanceof Ia,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new kC(r,e.asyncQueue,n)}Du(e){const n=this.cacheSizeBytes!==void 0?Nt.withCacheSize(this.cacheSizeBytes):Nt.DEFAULT;return new _y(r=>Ia.Vi(r,n),this.serializer)}}class Ll{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Rp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=HP.bind(null,this.syncEngine),await bP(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new SP}()}createDatastore(e){const n=ec(e.databaseInfo.databaseId),r=function(i){return new cP(i)}(e.databaseInfo);return function(i,o,c,l){return new fP(i,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,c){return new pP(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,n=>Rp(this.syncEngine,n,0),function(){return Ep.C()?new Ep:new sP}())}createSyncEngine(e,n){return function(s,i,o,c,l,u,f){const p=new DP(s,i,o,c,l,u);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=de(s);X(Jr,"RemoteStore shutting down."),i.Ia.add(5),await co(i),i.Ea.shutdown(),i.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Ll.provider={build:()=>new Ll};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uy{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Ln("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar="FirestoreClient";class KP{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=yt.UNAUTHENTICATED,this.clientId=Au.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{X(Ar,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(X(Ar,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new pr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Hu(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function zc(t,e){t.asyncQueue.verifyOperationInProgress(),X(Ar,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await yy(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>{yr("Terminating Firestore due to IndexedDb database deletion"),t.terminate().then(()=>{X("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{yr("Terminating Firestore due to IndexedDb database deletion failed",s)})}),t._offlineComponents=e}async function Cp(t,e){t.asyncQueue.verifyOperationInProgress();const n=await QP(t);X(Ar,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Tp(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Tp(e.remoteStore,s)),t._onlineComponents=e}async function QP(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){X(Ar,"Using user provided OfflineComponentProvider");try{await zc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;yr("Error using user provided cache. Falling back to memory cache: "+n),await zc(t,new wa)}}else X(Ar,"Using default OfflineComponentProvider"),await zc(t,new zP(void 0));return t._offlineComponents}async function By(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(X(Ar,"Using user provided OnlineComponentProvider"),await Cp(t,t._uninitializedComponentsProvider._online)):(X(Ar,"Using default OnlineComponentProvider"),await Cp(t,new Ll))),t._onlineComponents}function JP(t){return By(t).then(e=>e.syncEngine)}async function Fl(t){const e=await By(t),n=e.eventManager;return n.onListen=OP.bind(null,e.syncEngine),n.onUnlisten=LP.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=VP.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=FP.bind(null,e.syncEngine),n}function YP(t,e,n={}){const r=new pr;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,u){const f=new Uy({next:m=>{f.Ou(),o.enqueueAndForget(()=>Py(i,p)),m.fromCache&&l.source==="server"?u.reject(new Y(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new xy(c,f,{includeMetadataChanges:!0,ka:!0});return Cy(i,p)}(await Fl(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jy(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pp=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y="firestore.googleapis.com",xp=!0;class Np{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new Y(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=$y,this.ssl=xp}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:xp;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=gy;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<xC)throw new Y(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}mS("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=jy((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new Y(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new Y(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new Y(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class rc{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Np({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Y(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Y(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Np(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new oS;switch(r.type){case"firstParty":return new uS(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Y(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Pp.get(n);r&&(X("ComponentProvider","Removing Datastore"),Pp.delete(n),r.terminate())}(this),Promise.resolve()}}function XP(t,e,n,r={}){var s;t=mr(t,rc);const i=Us(e),o=t._getSettings(),c=Object.assign(Object.assign({},o),{emulatorOptions:t._getEmulatorOptions()}),l=`${e}:${n}`;i&&(Cg(`https://${l}`),Pg("Firestore",!0)),o.host!==$y&&o.host!==l&&yr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u=Object.assign(Object.assign({},o),{host:l,ssl:i,emulatorOptions:r});if(!Gr(u,c)&&(t._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=yt.MOCK_USER;else{f=$w(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new Y(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new yt(m)}t._authCredentials=new aS(new R_(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Rr(this.firestore,e,this._query)}}class tt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new gr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new tt(this.firestore,e,this._key)}toJSON(){return{type:tt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(io(n,tt._jsonSchema))return new tt(e,r||null,new re(Le.fromString(n.referencePath)))}}tt._jsonSchemaVersion="firestore/documentReference/1.0",tt._jsonSchema={type:et("string",tt._jsonSchemaVersion),referencePath:et("string")};class gr extends Rr{constructor(e,n,r){super(e,n,xu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new tt(this.firestore,null,new re(e))}withConverter(e){return new gr(this.firestore,e,this._path)}}function ZP(t,e,...n){if(t=At(t),C_("collection","path",e),t instanceof rc){const r=Le.fromString(e,...n);return Hd(r),new gr(t,null,r)}{if(!(t instanceof tt||t instanceof gr))throw new Y(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Le.fromString(e,...n));return Hd(r),new gr(t.firestore,null,r)}}function kp(t,e,...n){if(t=At(t),arguments.length===1&&(e=Au.newId()),C_("doc","path",e),t instanceof rc){const r=Le.fromString(e,...n);return qd(r),new tt(t,null,new re(r))}{if(!(t instanceof tt||t instanceof gr))throw new Y(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Le.fromString(e,...n));return qd(r),new tt(t.firestore,t instanceof gr?t.converter:null,new re(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dp="AsyncQueue";class Op{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Ey(this,"async_queue_retry"),this.oc=()=>{const r=Gc();r&&X(Dp,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const n=Gc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const n=Gc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const n=new pr;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Ws(e))throw e;X(Dp,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const n=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,Ln("INTERNAL UNHANDLED ERROR: ",Vp(r)),r}).then(r=>(this.nc=!1,r))));return this._c=n,n}enqueueAfterDelay(e,n,r){this.ac(),this.sc.indexOf(e)>-1&&(n=0);const s=qu.createAndSchedule(this,e,n,r,i=>this.lc(i));return this.ec.push(s),s}ac(){this.tc&&ce(47125,{hc:Vp(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const n of this.ec)if(n.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.ec)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const n=this.ec.indexOf(e);this.ec.splice(n,1)}}function Vp(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mp(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class Ji extends rc{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Op,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Op(e),this._firestoreClient=void 0,await e}}}function e1(t,e){const n=typeof t=="object"?t:Dg(),r=typeof t=="string"?t:ma,s=hu(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Bw("firestore");i&&XP(s,...i)}return s}function Ku(t){if(t._terminated)throw new Y(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||t1(t),t._firestoreClient}function t1(t){var e,n,r;const s=t._freezeSettings(),i=function(c,l,u,f){return new RS(c,l,u,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,jy(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new KP(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ht(ft.fromBase64String(e))}catch(n){throw new Y(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Ht(ft.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ht._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(io(e,Ht._jsonSchema))return Ht.fromBase64String(e.bytes)}}Ht._jsonSchemaVersion="firestore/bytes/1.0",Ht._jsonSchema={type:et("string",Ht._jsonSchemaVersion),bytes:et("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new Y(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ht(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new Y(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new Y(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return _e(this._lat,e._lat)||_e(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:_n._jsonSchemaVersion}}static fromJSON(e){if(io(e,_n._jsonSchema))return new _n(e.latitude,e.longitude)}}_n._jsonSchemaVersion="firestore/geoPoint/1.0",_n._jsonSchema={type:et("string",_n._jsonSchemaVersion),latitude:et("number"),longitude:et("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:yn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(io(e,yn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new yn(e.vectorValues);throw new Y(M.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}yn._jsonSchemaVersion="firestore/vectorValue/1.0",yn._jsonSchema={type:et("string",yn._jsonSchemaVersion),vectorValues:et("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n1=/^__.*__$/;class r1{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new ts(e,this.data,this.fieldMask,n,this.fieldTransforms):new oo(e,this.data,n,this.fieldTransforms)}}function Hy(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ce(40011,{Ec:t})}}class Ju{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Ju(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Aa(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Hy(this.Ec)&&n1.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class s1{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||ec(e)}Dc(e,n,r,s=!1){return new Ju({Ec:e,methodName:n,bc:r,path:ht.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Wy(t){const e=t._freezeSettings(),n=ec(t._databaseId);return new s1(t._databaseId,!!e.ignoreUndefinedProperties,n)}function i1(t,e,n,r,s,i={}){const o=t.Dc(i.merge||i.mergeFields?2:0,e,n,s);Ky("Data must be an object, but it was:",o,r);const c=Gy(r,o);let l,u;if(i.merge)l=new Xt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const m=a1(e,p,n);if(!o.contains(m))throw new Y(M.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);l1(f,m)||f.push(m)}l=new Xt(f),u=o.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,u=o.fieldTransforms;return new r1(new qt(c),l,u)}function o1(t,e,n,r=!1){return Yu(n,t.Dc(r?4:3,e))}function Yu(t,e){if(zy(t=At(t)))return Ky("Unsupported field value:",e,t),Gy(t,e);if(t instanceof qy)return function(r,s){if(!Hy(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let l=Yu(c,s.yc(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=At(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return QS(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ue.fromDate(r);return{timestampValue:Ea(s.serializer,i)}}if(r instanceof Ue){const i=new Ue(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ea(s.serializer,i)}}if(r instanceof _n)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ht)return{bytesValue:ly(s.serializer,r._byteString)};if(r instanceof tt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ou(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof yn)return function(o,c){return{mapValue:{fields:{[L_]:{stringValue:F_},[ga]:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw c.wc("VectorValues must only contain numeric values.");return Nu(c.serializer,u)})}}}}}}(r,s);throw s.wc(`Unsupported field value: ${Wa(r)}`)}(t,e)}function Gy(t,e){const n={};return N_(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Zr(t,(r,s)=>{const i=Yu(s,e.Vc(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function zy(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ue||t instanceof _n||t instanceof Ht||t instanceof tt||t instanceof qy||t instanceof yn)}function Ky(t,e,n){if(!zy(n)||!P_(n)){const r=Wa(n);throw r==="an object"?e.wc(t+" a custom object"):e.wc(t+" "+r)}}function a1(t,e,n){if((e=At(e))instanceof Qu)return e._internalPath;if(typeof e=="string")return Qy(t,e);throw Aa("Field path arguments must be of type string or ",t,!1,void 0,n)}const c1=new RegExp("[~\\*/\\[\\]]");function Qy(t,e,n){if(e.search(c1)>=0)throw Aa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Qu(...e.split("."))._internalPath}catch{throw Aa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Aa(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;n&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new Y(M.INVALID_ARGUMENT,c+t+l)}function l1(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jy{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new u1(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Xu("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class u1 extends Jy{data(){return super.data()}}function Xu(t,e){return typeof e=="string"?Qy(t,e):e instanceof Qu?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yy(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new Y(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Zu{}class Xy extends Zu{}function h1(t,e,...n){let r=[];e instanceof Zu&&r.push(e),r=r.concat(n),function(i){const o=i.filter(l=>l instanceof th).length,c=i.filter(l=>l instanceof eh).length;if(o>1||o>0&&c>0)throw new Y(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class eh extends Xy{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new eh(e,n,r)}_apply(e){const n=this._parse(e);return Zy(e._query,n),new Rr(e.firestore,e.converter,Sl(e._query,n))}_parse(e){const n=Wy(e.firestore);return function(i,o,c,l,u,f,p){let m;if(u.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new Y(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Fp(p,f);const C=[];for(const x of p)C.push(Lp(l,i,x));m={arrayValue:{values:C}}}else m=Lp(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Fp(p,f),m=o1(c,o,p,f==="in"||f==="not-in");return Xe.create(u,f,m)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}class th extends Zu{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new th(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:sn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)Zy(o,l),o=Sl(o,l)}(e._query,n),new Rr(e.firestore,e.converter,Sl(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class nh extends Xy{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new nh(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new Y(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new Y(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new zi(i,o)}(e._query,this._field,this._direction);return new Rr(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Gs(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function f1(t,e="asc"){const n=e,r=Xu("orderBy",t);return nh._create(r,n)}function Lp(t,e,n){if(typeof(n=At(n))=="string"){if(n==="")throw new Y(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!G_(e)&&n.indexOf("/")!==-1)throw new Y(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Le.fromString(n));if(!re.isDocumentKey(r))throw new Y(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Xd(t,new re(r))}if(n instanceof tt)return Xd(t,n._key);throw new Y(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Wa(n)}.`)}function Fp(t,e){if(!Array.isArray(t)||t.length===0)throw new Y(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Zy(t,e){const n=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new Y(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Y(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class d1{convertValue(e,n="none"){switch(Tr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Qe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Ir(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ce(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Zr(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n[ga].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Qe(o.doubleValue));return new yn(i)}convertGeoPoint(e){return new _n(Qe(e.latitude),Qe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Ka(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Hi(e));default:return null}}convertTimestamp(e){const n=Er(e);return new Ue(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Le.fromString(e);Ce(my(r),9688,{name:e});const s=new Wi(r.get(1),r.get(3)),i=new re(r.popFirst(5));return s.isEqual(n)||Ln(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p1(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class gi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class $r extends Jy{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Jo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Xu("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Y(M.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=$r._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}$r._jsonSchemaVersion="firestore/documentSnapshot/1.0",$r._jsonSchema={type:et("string",$r._jsonSchemaVersion),bundleSource:et("string","DocumentSnapshot"),bundleName:et("string"),bundle:et("string")};class Jo extends $r{data(e={}){return super.data(e)}}class qr{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new gi(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Jo(this._firestore,this._userDataWriter,r.key,r,new gi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new Y(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const l=new Jo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new gi(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new Jo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new gi(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,f=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:m1(c.type),doc:l,oldIndex:u,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Y(M.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=qr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Au.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function m1(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ce(61501,{type:t})}}qr._jsonSchemaVersion="firestore/querySnapshot/1.0",qr._jsonSchema={type:et("string",qr._jsonSchemaVersion),bundleSource:et("string","QuerySnapshot"),bundleName:et("string"),bundle:et("string")};class rh extends d1{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ht(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new tt(this.firestore,null,n)}}function g1(t){t=mr(t,Rr);const e=mr(t.firestore,Ji),n=Ku(e),r=new rh(e);return Yy(t._query),YP(n,t._query).then(s=>new qr(e,r,t,s))}function _1(t,e,n){t=mr(t,tt);const r=mr(t.firestore,Ji),s=p1(t.converter,e,n);return v1(r,[i1(Wy(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Nn.none())])}function y1(t,...e){var n,r,s;t=At(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Mp(e[o])||(i=e[o++]);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Mp(e[o])){const p=e[o];e[o]=(n=p.next)===null||n===void 0?void 0:n.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let l,u,f;if(t instanceof tt)u=mr(t.firestore,Ji),f=xu(t._key.path),l={next:p=>{e[o]&&e[o](E1(u,t,p))},error:e[o+1],complete:e[o+2]};else{const p=mr(t,Rr);u=mr(p.firestore,Ji),f=p._query;const m=new rh(u);l={next:v=>{e[o]&&e[o](new qr(u,m,p,v))},error:e[o+1],complete:e[o+2]},Yy(t._query)}return function(m,v,C,x){const k=new Uy(x),j=new xy(v,k,C);return m.asyncQueue.enqueueAndForget(async()=>Cy(await Fl(m),j)),()=>{k.Ou(),m.asyncQueue.enqueueAndForget(async()=>Py(await Fl(m),j))}}(Ku(u),f,c,l)}function v1(t,e){return function(r,s){const i=new pr;return r.asyncQueue.enqueueAndForget(async()=>UP(await JP(r),s,i)),i.promise}(Ku(t),e)}function E1(t,e,n){const r=n.docs.get(e._key),s=new rh(t);return new $r(t,s,e._key,r,new gi(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(s){qs=s})(Bs),Ns(new zr("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Ji(new cS(r.getProvider("auth-internal")),new hS(o,r.getProvider("app-check-internal")),function(u,f){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new Y(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Wi(u.options.projectId,f)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),hr(Fd,Ud,e),hr(Fd,Ud,"esm2017")})();const I1=e1(Iu);function ev(){const t=ZP(I1,"invoices");return{saveInvoiceRecord:async s=>{const i=kp(t,s.id);return await _1(i,s,{merge:!0}),s},fetchInvoices:async()=>(await g1(h1(t,f1("uploadedAt","desc")))).docs.map(i=>i.data()),subscribeToInvoice:(s,i)=>{const o=kp(t,s);return y1(o,c=>{c.exists()&&i(c.data())})}}}const T1=iu("invoices",{state:()=>({invoices:[],activeInvoiceId:null,initialized:!1}),getters:{activeInvoice:t=>t.invoices.find(e=>e.id===t.activeInvoiceId)??null},actions:{setInvoices(t){this.invoices=t,this.initialized=!0},upsertInvoice(t){const e=this.invoices.findIndex(n=>n.id===t.id);e>-1?this.invoices.splice(e,1,t):this.invoices.unshift(t)},setActiveInvoice(t){this.activeInvoiceId=t}}});function sh(){const t=T1(),{invoices:e,activeInvoice:n}=ag(t),{fetchInvoices:r,subscribeToInvoice:s}=ev();return{invoices:e,activeInvoice:n,hydrate:async()=>{if(t.initialized)return;const f=await r();t.setInvoices(f)},watchInvoice:f=>s(f,p=>t.upsertInvoice(p)),setActiveInvoice:f=>t.setActiveInvoice(f),upsertInvoice:f=>t.upsertInvoice(f),getInvoiceById:f=>t.invoices.find(p=>p.id===f)??null}}const w1=new QR({detectQuality:XR,generateInvoiceId:ZR,detectSupplier:tS,mapInvoice:eS,requestSignedUrl:iS});function A1(){const t=kt(null),e=kt(""),n=kt("idle"),r=kt(0),s=kt(null),i=kt(null),{saveInvoiceRecord:o}=ev(),{upsertInvoice:c}=sh(),{notifySuccess:l,notifyError:u}=cu();return{selectFile:m=>{t.value=m,e.value=m.name,i.value=null,n.value="idle",r.value=0,s.value=null},upload:async()=>{if(!t.value){s.value="Select a file first";return}n.value="validating",r.value=10;try{const m=await w1.run(t.value,v=>{r.value=Math.round(v),n.value=v>=60?"uploading":"validating"});return n.value="uploading",r.value=90,await o(m),c(m),r.value=100,n.value="completed",i.value=m,s.value=null,l("Invoice uploaded successfully"),t.value=null,e.value="",m}catch(m){n.value="error";const v=m instanceof Error?m.message:"Upload failed";throw s.value=v,u(v),m}},status:n,progress:r,error:s,selectedFileName:e,currentInvoice:i}}const b1={class:"grid w-full gap-6 lg:grid-cols-[2fr,1fr]"},R1={class:"rounded-3xl bg-white p-6 shadow-lg"},S1={class:"mb-6 flex items-center justify-between"},C1={key:0,class:"mt-4 text-sm text-slate-500"},P1={class:"mt-6 flex items-center gap-4"},x1=["disabled"],N1={key:0,class:"text-sm text-slate-500"},k1={key:2,class:"text-sm text-rose-600"},D1={class:"space-y-4"},O1=Gt({__name:"UploadPage",setup(t){const{selectFile:e,upload:n,status:r,error:s,progress:i,currentInvoice:o,selectedFileName:c}=A1(),l=x=>e(x),u=async()=>{await n()},f=je(()=>!!c.value&&!["uploading","validating"].includes(r.value)),p=je(()=>["validating","uploading"].includes(r.value)),m=je(()=>r.value==="completed"?"uploaded":r.value==="error"?"failed":r.value==="idle"?"pending":"processing"),v=je(()=>r.value==="uploading"?"Uploading...":r.value==="validating"?"Validating...":"Upload now"),C=je(()=>{switch(r.value){case"validating":return"Checking quality...";case"uploading":return"Uploading invoice to signed URL...";case"completed":return"Upload complete";case"error":return"Something went wrong";default:return"Ready to upload"}});return(x,k)=>(Oe(),Ze("section",b1,[J("div",R1,[J("header",S1,[k[0]||(k[0]=J("h2",{class:"text-2xl font-semibold text-slate-900"},"Upload invoice",-1)),xe(Tu,{status:m.value},null,8,["status"])]),xe(UR,{onSelect:l}),De(c)?(Oe(),Ze("p",C1,"Selected: "+Be(De(c)),1)):Lr("",!0),J("div",P1,[J("button",{type:"button",class:"rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60",disabled:!f.value,onClick:u},Be(v.value),9,x1),De(i)>0?(Oe(),Ze("p",N1,"Progress: "+Be(De(i))+"%",1)):Lr("",!0)]),p.value?(Oe(),Hr(y_,{key:1,label:C.value},null,8,["label"])):Lr("",!0),De(s)?(Oe(),Ze("p",k1,Be(De(s)),1)):Lr("",!0)]),J("div",D1,[De(o)?(Oe(),Hr(__,{key:0,invoice:De(o)},null,8,["invoice"])):Lr("",!0),k[1]||(k[1]=J("div",{class:"rounded-3xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500"},[J("p",{class:"font-semibold text-slate-700"},"Flow outline"),J("ul",{class:"mt-2 list-disc space-y-1 pl-5"},[J("li",null,"Validate clarity & orientation"),J("li",null,"Detect supplier hints"),J("li",null,"Request backend signed URL"),J("li",null,"Upload directly from device"),J("li",null,"Persist metadata in Firestore")])],-1))])]))}}),V1={class:"w-full"},M1={class:"mb-6 flex items-center justify-between"},L1={key:1,class:"grid gap-4 md:grid-cols-2"},F1={key:2,class:"rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500"},U1=Gt({__name:"InvoicesListPage",setup(t){const e=pw(),{invoices:n,hydrate:r}=sh(),s=kt(!0);Zl(async()=>{await r(),s.value=!1});const i=o=>{e.push({name:"invoice-details",params:{id:o}})};return(o,c)=>(Oe(),Ze("section",V1,[J("header",M1,[c[1]||(c[1]=J("h2",{class:"text-2xl font-semibold text-slate-900"},"Invoices",-1)),xe(De(or),{to:"/upload",class:"rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white"},{default:Cn(()=>[...c[0]||(c[0]=[Jt(" New upload ",-1)])]),_:1})]),s.value?(Oe(),Hr(y_,{key:0,label:"Syncing invoices..."})):(Oe(),Ze("div",L1,[(Oe(!0),Ze(Et,null,Cm(De(n),l=>(Oe(),Hr(__,{key:l.id,invoice:l,onSelect:i},null,8,["invoice"]))),128))])),!s.value&&De(n).length===0?(Oe(),Ze("p",F1," No invoices yet. Start by uploading your first invoice photo. ")):Lr("",!0)]))}}),B1={key:0,class:"w-full rounded-3xl bg-white p-6 shadow-lg"},j1={class:"flex items-center justify-between"},$1={class:"text-2xl font-semibold text-slate-900"},q1={class:"mt-6 grid gap-4 sm:grid-cols-2"},H1={class:"text-lg font-semibold text-slate-900"},W1={class:"text-lg font-semibold text-slate-900"},G1={class:"text-lg font-semibold text-slate-900"},z1={class:"text-lg font-semibold text-slate-900"},K1={class:"mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"},Q1={key:1,class:"text-slate-500"},J1=Gt({__name:"InvoiceDetailsPage",setup(t){const n=mw().params.id,{getInvoiceById:r,watchInvoice:s}=sh(),i=je(()=>r(n)),o=je(()=>{var l;return g_((l=i.value)==null?void 0:l.uploadedAt)}),c=s(n);return eu(()=>c==null?void 0:c()),(l,u)=>i.value?(Oe(),Ze("section",B1,[J("header",j1,[J("div",null,[u[0]||(u[0]=J("p",{class:"text-xs uppercase tracking-wide text-slate-400"},"Invoice ID",-1)),J("h2",$1,Be(i.value.id),1)]),xe(Tu,{status:i.value.status},null,8,["status"])]),J("dl",q1,[J("div",null,[u[1]||(u[1]=J("dt",{class:"text-xs uppercase text-slate-400"},"Supplier",-1)),J("dd",H1,Be(i.value.supplierName),1)]),J("div",null,[u[2]||(u[2]=J("dt",{class:"text-xs uppercase text-slate-400"},"Amount",-1)),J("dd",W1,Be(i.value.currency)+" "+Be(i.value.amount.toFixed(2)),1)]),J("div",null,[u[3]||(u[3]=J("dt",{class:"text-xs uppercase text-slate-400"},"Uploaded",-1)),J("dd",G1,Be(o.value),1)]),J("div",null,[u[4]||(u[4]=J("dt",{class:"text-xs uppercase text-slate-400"},"Quality",-1)),J("dd",z1,"Score "+Be(i.value.quality.score),1)])]),J("div",K1,Be(i.value.statusMessage),1)])):(Oe(),Ze("p",Q1,"Invoice not found."))}}),Y1=[{path:"/",name:"home",component:Nw},{path:"/login",name:"login",component:FR},{path:"/upload",name:"upload",component:O1},{path:"/invoices",name:"invoices",component:U1},{path:"/invoices/:id",name:"invoice-details",component:J1,props:!0}],X1=dw({history:zT("/"),routes:Y1}),Z1="modulepreload",ex=function(t){return"/"+t},Up={},tx=function(e,n,r){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(l=>{if(l=ex(l),l in Up)return;Up[l]=!0;const u=l.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Z1,u||(p.as="script"),p.crossOrigin="",p.href=l,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((m,v)=>{p.addEventListener("load",m),p.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return s.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})};function nx(t={}){const{immediate:e=!1,onNeedRefresh:n,onOfflineReady:r,onRegistered:s,onRegisteredSW:i,onRegisterError:o}=t;let c,l;const u=async(p=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(c=await tx(async()=>{const{Workbox:p}=await import("./workbox-window.prod.es5-vqzQaGvo.js");return{Workbox:p}},[]).then(({Workbox:p})=>new p("/sw.js",{scope:"/",type:"classic"})).catch(p=>{o==null||o(p)}),!c)return;c.addEventListener("activated",p=>{(p.isUpdate||p.isExternal)&&window.location.reload()}),c.addEventListener("installed",p=>{p.isUpdate||r==null||r()}),c.register({immediate:e}).then(p=>{i?i("/sw.js",p):s==null||s(p)}).catch(p=>{o==null||o(p)})}}return l=f(),u}const rx=()=>{"serviceWorker"in navigator&&nx({immediate:!0,onNeedRefresh(){console.info("New content is available, please refresh.")},onOfflineReady(){console.info("App ready to work offline.")}})},ih=tT(Sw);ih.use(sT());ih.use(X1);ih.mount("#app");rx();
