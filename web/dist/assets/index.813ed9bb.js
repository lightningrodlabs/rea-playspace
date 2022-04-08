var t0=Object.defineProperty,r0=Object.defineProperties;var n0=Object.getOwnPropertyDescriptors;var ju=Object.getOwnPropertySymbols;var o0=Object.prototype.hasOwnProperty,i0=Object.prototype.propertyIsEnumerable;var Wu=(e,t,r)=>t in e?t0(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ys=(e,t)=>{for(var r in t||(t={}))o0.call(t,r)&&Wu(e,r,t[r]);if(ju)for(var r of ju(t))i0.call(t,r)&&Wu(e,r,t[r]);return e},qs=(e,t)=>r0(e,n0(t));function s0(e,t){return t.forEach(function(r){r&&typeof r!="string"&&!Array.isArray(r)&&Object.keys(r).forEach(function(n){if(n!=="default"&&!(n in e)){var o=Object.getOwnPropertyDescriptor(r,n);Object.defineProperty(e,n,o.get?o:{enumerable:!0,get:function(){return r[n]}})}})}),Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}const a0=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}};a0();var fi=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function l0(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var J={exports:{}},le={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Ku=Object.getOwnPropertySymbols,u0=Object.prototype.hasOwnProperty,c0=Object.prototype.propertyIsEnumerable;function d0(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function h0(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(t).map(function(s){return t[s]});if(n.join("")!=="0123456789")return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(s){o[s]=s}),Object.keys(Object.assign({},o)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}var Kd=h0()?Object.assign:function(e,t){for(var r,n=d0(e),o,s=1;s<arguments.length;s++){r=Object(arguments[s]);for(var i in r)u0.call(r,i)&&(n[i]=r[i]);if(Ku){o=Ku(r);for(var a=0;a<o.length;a++)c0.call(r,o[a])&&(n[o[a]]=r[o[a]])}}return n};/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rl=Kd,St=typeof Symbol=="function"&&Symbol.for,Bo=St?Symbol.for("react.element"):60103,p0=St?Symbol.for("react.portal"):60106,f0=St?Symbol.for("react.fragment"):60107,m0=St?Symbol.for("react.strict_mode"):60108,g0=St?Symbol.for("react.profiler"):60114,v0=St?Symbol.for("react.provider"):60109,y0=St?Symbol.for("react.context"):60110,b0=St?Symbol.for("react.forward_ref"):60112,w0=St?Symbol.for("react.suspense"):60113,x0=St?Symbol.for("react.memo"):60115,_0=St?Symbol.for("react.lazy"):60116,Xu=typeof Symbol=="function"&&Symbol.iterator;function Vo(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Xd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Yd={};function Kn(e,t,r){this.props=e,this.context=t,this.refs=Yd,this.updater=r||Xd}Kn.prototype.isReactComponent={};Kn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error(Vo(85));this.updater.enqueueSetState(this,e,t,"setState")};Kn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function qd(){}qd.prototype=Kn.prototype;function Ml(e,t,r){this.props=e,this.context=t,this.refs=Yd,this.updater=r||Xd}var Ll=Ml.prototype=new qd;Ll.constructor=Ml;Rl(Ll,Kn.prototype);Ll.isPureReactComponent=!0;var Ul={current:null},Qd=Object.prototype.hasOwnProperty,Gd={key:!0,ref:!0,__self:!0,__source:!0};function Jd(e,t,r){var n,o={},s=null,i=null;if(t!=null)for(n in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(s=""+t.key),t)Qd.call(t,n)&&!Gd.hasOwnProperty(n)&&(o[n]=t[n]);var a=arguments.length-2;if(a===1)o.children=r;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];o.children=l}if(e&&e.defaultProps)for(n in a=e.defaultProps,a)o[n]===void 0&&(o[n]=a[n]);return{$$typeof:Bo,type:e,key:s,ref:i,props:o,_owner:Ul.current}}function k0(e,t){return{$$typeof:Bo,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Nl(e){return typeof e=="object"&&e!==null&&e.$$typeof===Bo}function S0(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(r){return t[r]})}var Zd=/\/+/g,Di=[];function eh(e,t,r,n){if(Di.length){var o=Di.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function th(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>Di.length&&Di.push(e)}function Ta(e,t,r,n){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Bo:case p0:s=!0}}if(s)return r(n,e,t===""?"."+Qs(e,0):t),1;if(s=0,t=t===""?".":t+":",Array.isArray(e))for(var i=0;i<e.length;i++){o=e[i];var a=t+Qs(o,i);s+=Ta(o,a,r,n)}else if(e===null||typeof e!="object"?a=null:(a=Xu&&e[Xu]||e["@@iterator"],a=typeof a=="function"?a:null),typeof a=="function")for(e=a.call(e),i=0;!(o=e.next()).done;)o=o.value,a=t+Qs(o,i++),s+=Ta(o,a,r,n);else if(o==="object")throw r=""+e,Error(Vo(31,r==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":r,""));return s}function $a(e,t,r){return e==null?0:Ta(e,"",t,r)}function Qs(e,t){return typeof e=="object"&&e!==null&&e.key!=null?S0(e.key):t.toString(36)}function C0(e,t){e.func.call(e.context,t,e.count++)}function E0(e,t,r){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?za(e,n,r,function(s){return s}):e!=null&&(Nl(e)&&(e=k0(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(Zd,"$&/")+"/")+r)),n.push(e))}function za(e,t,r,n,o){var s="";r!=null&&(s=(""+r).replace(Zd,"$&/")+"/"),t=eh(t,s,n,o),$a(e,E0,t),th(t)}var rh={current:null};function er(){var e=rh.current;if(e===null)throw Error(Vo(321));return e}var T0={ReactCurrentDispatcher:rh,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:Ul,IsSomeRendererActing:{current:!1},assign:Rl};le.Children={map:function(e,t,r){if(e==null)return e;var n=[];return za(e,n,null,t,r),n},forEach:function(e,t,r){if(e==null)return e;t=eh(null,null,t,r),$a(e,C0,t),th(t)},count:function(e){return $a(e,function(){return null},null)},toArray:function(e){var t=[];return za(e,t,null,function(r){return r}),t},only:function(e){if(!Nl(e))throw Error(Vo(143));return e}};le.Component=Kn;le.Fragment=f0;le.Profiler=g0;le.PureComponent=Ml;le.StrictMode=m0;le.Suspense=w0;le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T0;le.cloneElement=function(e,t,r){if(e==null)throw Error(Vo(267,e));var n=Rl({},e.props),o=e.key,s=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,i=Ul.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)Qd.call(t,l)&&!Gd.hasOwnProperty(l)&&(n[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)n.children=r;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];n.children=a}return{$$typeof:Bo,type:e.type,key:o,ref:s,props:n,_owner:i}};le.createContext=function(e,t){return t===void 0&&(t=null),e={$$typeof:y0,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider={$$typeof:v0,_context:e},e.Consumer=e};le.createElement=Jd;le.createFactory=function(e){var t=Jd.bind(null,e);return t.type=e,t};le.createRef=function(){return{current:null}};le.forwardRef=function(e){return{$$typeof:b0,render:e}};le.isValidElement=Nl;le.lazy=function(e){return{$$typeof:_0,_ctor:e,_status:-1,_result:null}};le.memo=function(e,t){return{$$typeof:x0,type:e,compare:t===void 0?null:t}};le.useCallback=function(e,t){return er().useCallback(e,t)};le.useContext=function(e,t){return er().useContext(e,t)};le.useDebugValue=function(){};le.useEffect=function(e,t){return er().useEffect(e,t)};le.useImperativeHandle=function(e,t,r){return er().useImperativeHandle(e,t,r)};le.useLayoutEffect=function(e,t){return er().useLayoutEffect(e,t)};le.useMemo=function(e,t){return er().useMemo(e,t)};le.useReducer=function(e,t,r){return er().useReducer(e,t,r)};le.useRef=function(e){return er().useRef(e)};le.useState=function(e){return er().useState(e)};le.version="16.14.0";J.exports=le;var nh=J.exports,V=s0({__proto__:null,default:nh},[J.exports]),oh={exports:{}},gt={},ih={exports:{}},sh={};/** @license React v0.19.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){var t,r,n,o,s;if(typeof window=="undefined"||typeof MessageChannel!="function"){var i=null,a=null,l=function(){if(i!==null)try{var I=e.unstable_now();i(!0,I),i=null}catch(W){throw setTimeout(l,0),W}},u=Date.now();e.unstable_now=function(){return Date.now()-u},t=function(I){i!==null?setTimeout(t,0,I):(i=I,setTimeout(l,0))},r=function(I,W){a=setTimeout(I,W)},n=function(){clearTimeout(a)},o=function(){return!1},s=e.unstable_forceFrameRate=function(){}}else{var d=window.performance,c=window.Date,p=window.setTimeout,b=window.clearTimeout;if(typeof console!="undefined"){var w=window.cancelAnimationFrame;typeof window.requestAnimationFrame!="function"&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),typeof w!="function"&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")}if(typeof d=="object"&&typeof d.now=="function")e.unstable_now=function(){return d.now()};else{var g=c.now();e.unstable_now=function(){return c.now()-g}}var f=!1,m=null,y=-1,_=5,x=0;o=function(){return e.unstable_now()>=x},s=function(){},e.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):_=0<I?Math.floor(1e3/I):5};var k=new MessageChannel,C=k.port2;k.port1.onmessage=function(){if(m!==null){var I=e.unstable_now();x=I+_;try{m(!0,I)?C.postMessage(null):(f=!1,m=null)}catch(W){throw C.postMessage(null),W}}else f=!1},t=function(I){m=I,f||(f=!0,C.postMessage(null))},r=function(I,W){y=p(function(){I(e.unstable_now())},W)},n=function(){b(y),y=-1}}function E(I,W){var te=I.length;I.push(W);e:for(;;){var ye=te-1>>>1,ke=I[ye];if(ke!==void 0&&0<D(ke,W))I[ye]=W,I[te]=ke,te=ye;else break e}}function $(I){return I=I[0],I===void 0?null:I}function T(I){var W=I[0];if(W!==void 0){var te=I.pop();if(te!==W){I[0]=te;e:for(var ye=0,ke=I.length;ye<ke;){var Dr=2*(ye+1)-1,Ir=I[Dr],Gn=Dr+1,un=I[Gn];if(Ir!==void 0&&0>D(Ir,te))un!==void 0&&0>D(un,Ir)?(I[ye]=un,I[Gn]=te,ye=Gn):(I[ye]=Ir,I[Dr]=te,ye=Dr);else if(un!==void 0&&0>D(un,te))I[ye]=un,I[Gn]=te,ye=Gn;else break e}}return W}return null}function D(I,W){var te=I.sortIndex-W.sortIndex;return te!==0?te:I.id-W.id}var F=[],ne=[],xe=1,S=null,z=3,B=!1,ue=!1,fe=!1;function re(I){for(var W=$(ne);W!==null;){if(W.callback===null)T(ne);else if(W.startTime<=I)T(ne),W.sortIndex=W.expirationTime,E(F,W);else break;W=$(ne)}}function rr(I){if(fe=!1,re(I),!ue)if($(F)!==null)ue=!0,t(Ft);else{var W=$(ne);W!==null&&r(rr,W.startTime-I)}}function Ft(I,W){ue=!1,fe&&(fe=!1,n()),B=!0;var te=z;try{for(re(W),S=$(F);S!==null&&(!(S.expirationTime>W)||I&&!o());){var ye=S.callback;if(ye!==null){S.callback=null,z=S.priorityLevel;var ke=ye(S.expirationTime<=W);W=e.unstable_now(),typeof ke=="function"?S.callback=ke:S===$(F)&&T(F),re(W)}else T(F);S=$(F)}if(S!==null)var Dr=!0;else{var Ir=$(ne);Ir!==null&&r(rr,Ir.startTime-W),Dr=!1}return Dr}finally{S=null,z=te,B=!1}}function ln(I){switch(I){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1e4;default:return 5e3}}var e0=s;e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(I){I.callback=null},e.unstable_continueExecution=function(){ue||B||(ue=!0,t(Ft))},e.unstable_getCurrentPriorityLevel=function(){return z},e.unstable_getFirstCallbackNode=function(){return $(F)},e.unstable_next=function(I){switch(z){case 1:case 2:case 3:var W=3;break;default:W=z}var te=z;z=W;try{return I()}finally{z=te}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=e0,e.unstable_runWithPriority=function(I,W){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var te=z;z=I;try{return W()}finally{z=te}},e.unstable_scheduleCallback=function(I,W,te){var ye=e.unstable_now();if(typeof te=="object"&&te!==null){var ke=te.delay;ke=typeof ke=="number"&&0<ke?ye+ke:ye,te=typeof te.timeout=="number"?te.timeout:ln(I)}else te=ln(I),ke=ye;return te=ke+te,I={id:xe++,callback:W,priorityLevel:I,startTime:ke,expirationTime:te,sortIndex:-1},ke>ye?(I.sortIndex=ke,E(ne,I),$(F)===null&&I===$(ne)&&(fe?n():fe=!0,r(rr,ke-ye))):(I.sortIndex=te,E(F,I),ue||B||(ue=!0,t(Ft))),I},e.unstable_shouldYield=function(){var I=e.unstable_now();re(I);var W=$(F);return W!==S&&S!==null&&W!==null&&W.callback!==null&&W.startTime<=I&&W.expirationTime<S.expirationTime||o()},e.unstable_wrapCallback=function(I){var W=z;return function(){var te=z;z=W;try{return I.apply(this,arguments)}finally{z=te}}}})(sh);ih.exports=sh;/** @license React v16.14.0
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ks=J.exports,Fe=Kd,Oe=ih.exports;function A(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!ks)throw Error(A(227));function $0(e,t,r,n,o,s,i,a,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(r,u)}catch(d){this.onError(d)}}var mo=!1,Ii=null,Ri=!1,Aa=null,z0={onError:function(e){mo=!0,Ii=e}};function A0(e,t,r,n,o,s,i,a,l){mo=!1,Ii=null,$0.apply(z0,arguments)}function P0(e,t,r,n,o,s,i,a,l){if(A0.apply(this,arguments),mo){if(mo){var u=Ii;mo=!1,Ii=null}else throw Error(A(198));Ri||(Ri=!0,Aa=u)}}var Fl=null,ah=null,lh=null;function Yu(e,t,r){var n=e.type||"unknown-event";e.currentTarget=lh(r),P0(n,t,void 0,e),e.currentTarget=null}var Mi=null,fn={};function uh(){if(Mi)for(var e in fn){var t=fn[e],r=Mi.indexOf(e);if(!(-1<r))throw Error(A(96,e));if(!Li[r]){if(!t.extractEvents)throw Error(A(97,e));Li[r]=t,r=t.eventTypes;for(var n in r){var o=void 0,s=r[n],i=t,a=n;if(Pa.hasOwnProperty(a))throw Error(A(99,a));Pa[a]=s;var l=s.phasedRegistrationNames;if(l){for(o in l)l.hasOwnProperty(o)&&qu(l[o],i,a);o=!0}else s.registrationName?(qu(s.registrationName,i,a),o=!0):o=!1;if(!o)throw Error(A(98,n,e))}}}}function qu(e,t,r){if(An[e])throw Error(A(100,e));An[e]=t,Bl[e]=t.eventTypes[r].dependencies}var Li=[],Pa={},An={},Bl={};function ch(e){var t=!1,r;for(r in e)if(e.hasOwnProperty(r)){var n=e[r];if(!fn.hasOwnProperty(r)||fn[r]!==n){if(fn[r])throw Error(A(102,r));fn[r]=n,t=!0}}t&&uh()}var zr=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),Oa=null,xn=null,_n=null;function Qu(e){if(e=ah(e)){if(typeof Oa!="function")throw Error(A(280));var t=e.stateNode;t&&(t=Fl(t),Oa(e.stateNode,e.type,t))}}function dh(e){xn?_n?_n.push(e):_n=[e]:xn=e}function hh(){if(xn){var e=xn,t=_n;if(_n=xn=null,Qu(e),t)for(e=0;e<t.length;e++)Qu(t[e])}}function Vl(e,t){return e(t)}function ph(e,t,r,n,o){return e(t,r,n,o)}function Hl(){}var fh=Vl,Fr=!1,Gs=!1;function jl(){(xn!==null||_n!==null)&&(Hl(),hh())}function mh(e,t,r){if(Gs)return e(t,r);Gs=!0;try{return fh(e,t,r)}finally{Gs=!1,jl()}}var O0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Gu=Object.prototype.hasOwnProperty,Ju={},Zu={};function D0(e){return Gu.call(Zu,e)?!0:Gu.call(Ju,e)?!1:O0.test(e)?Zu[e]=!0:(Ju[e]=!0,!1)}function I0(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function R0(e,t,r,n){if(t===null||typeof t=="undefined"||I0(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function je(e,t,r,n,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=o,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=s}var De={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){De[e]=new je(e,0,!1,e,null,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];De[t]=new je(t,1,!1,e[1],null,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){De[e]=new je(e,2,!1,e.toLowerCase(),null,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){De[e]=new je(e,2,!1,e,null,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){De[e]=new je(e,3,!1,e.toLowerCase(),null,!1)});["checked","multiple","muted","selected"].forEach(function(e){De[e]=new je(e,3,!0,e,null,!1)});["capture","download"].forEach(function(e){De[e]=new je(e,4,!1,e,null,!1)});["cols","rows","size","span"].forEach(function(e){De[e]=new je(e,6,!1,e,null,!1)});["rowSpan","start"].forEach(function(e){De[e]=new je(e,5,!1,e.toLowerCase(),null,!1)});var Wl=/[\-:]([a-z])/g;function Kl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Wl,Kl);De[t]=new je(t,1,!1,e,null,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Wl,Kl);De[t]=new je(t,1,!1,e,"http://www.w3.org/1999/xlink",!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Wl,Kl);De[t]=new je(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1)});["tabIndex","crossOrigin"].forEach(function(e){De[e]=new je(e,1,!1,e.toLowerCase(),null,!1)});De.xlinkHref=new je("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0);["src","href","action","formAction"].forEach(function(e){De[e]=new je(e,1,!1,e.toLowerCase(),null,!0)});var yt=ks.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;yt.hasOwnProperty("ReactCurrentDispatcher")||(yt.ReactCurrentDispatcher={current:null});yt.hasOwnProperty("ReactCurrentBatchConfig")||(yt.ReactCurrentBatchConfig={suspense:null});function Xl(e,t,r,n){var o=De.hasOwnProperty(t)?De[t]:null,s=o!==null?o.type===0:n?!1:!(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N");s||(R0(t,r,o,n)&&(r=null),n||o===null?D0(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):o.mustUseProperty?e[o.propertyName]=r===null?o.type===3?!1:"":r:(t=o.attributeName,n=o.attributeNamespace,r===null?e.removeAttribute(t):(o=o.type,r=o===3||o===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var M0=/^(.*)[\\\/]/,Ge=typeof Symbol=="function"&&Symbol.for,ti=Ge?Symbol.for("react.element"):60103,mn=Ge?Symbol.for("react.portal"):60106,Ur=Ge?Symbol.for("react.fragment"):60107,gh=Ge?Symbol.for("react.strict_mode"):60108,mi=Ge?Symbol.for("react.profiler"):60114,vh=Ge?Symbol.for("react.provider"):60109,yh=Ge?Symbol.for("react.context"):60110,L0=Ge?Symbol.for("react.concurrent_mode"):60111,Yl=Ge?Symbol.for("react.forward_ref"):60112,gi=Ge?Symbol.for("react.suspense"):60113,Da=Ge?Symbol.for("react.suspense_list"):60120,ql=Ge?Symbol.for("react.memo"):60115,bh=Ge?Symbol.for("react.lazy"):60116,wh=Ge?Symbol.for("react.block"):60121,ec=typeof Symbol=="function"&&Symbol.iterator;function Jn(e){return e===null||typeof e!="object"?null:(e=ec&&e[ec]||e["@@iterator"],typeof e=="function"?e:null)}function U0(e){if(e._status===-1){e._status=0;var t=e._ctor;t=t(),e._result=t,t.then(function(r){e._status===0&&(r=r.default,e._status=1,e._result=r)},function(r){e._status===0&&(e._status=2,e._result=r)})}}function qt(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ur:return"Fragment";case mn:return"Portal";case mi:return"Profiler";case gh:return"StrictMode";case gi:return"Suspense";case Da:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case yh:return"Context.Consumer";case vh:return"Context.Provider";case Yl:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case ql:return qt(e.type);case wh:return qt(e.render);case bh:if(e=e._status===1?e._result:null)return qt(e)}return null}function Ql(e){var t="";do{e:switch(e.tag){case 3:case 4:case 6:case 7:case 10:case 9:var r="";break e;default:var n=e._debugOwner,o=e._debugSource,s=qt(e.type);r=null,n&&(r=qt(n.type)),n=s,s="",o?s=" (at "+o.fileName.replace(M0,"")+":"+o.lineNumber+")":r&&(s=" (created by "+r+")"),r=`
    in `+(n||"Unknown")+s}t+=r,e=e.return}while(e);return t}function br(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function xh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function N0(e){var t=xh(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r!="undefined"&&typeof r.get=="function"&&typeof r.set=="function"){var o=r.get,s=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(i){n=""+i,s.call(this,i)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(i){n=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ri(e){e._valueTracker||(e._valueTracker=N0(e))}function _h(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=xh(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function Ia(e,t){var r=t.checked;return Fe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r!=null?r:e._wrapperState.initialChecked})}function tc(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=br(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function kh(e,t){t=t.checked,t!=null&&Xl(e,"checked",t,!1)}function Ra(e,t){kh(e,t);var r=br(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ma(e,t.type,r):t.hasOwnProperty("defaultValue")&&Ma(e,t.type,br(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function rc(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Ma(e,t,r){(t!=="number"||e.ownerDocument.activeElement!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}function F0(e){var t="";return ks.Children.forEach(e,function(r){r!=null&&(t+=r)}),t}function La(e,t){return e=Fe({children:void 0},t),(t=F0(t.children))&&(e.children=t),e}function kn(e,t,r,n){if(e=e.options,t){t={};for(var o=0;o<r.length;o++)t["$"+r[o]]=!0;for(r=0;r<e.length;r++)o=t.hasOwnProperty("$"+e[r].value),e[r].selected!==o&&(e[r].selected=o),o&&n&&(e[r].defaultSelected=!0)}else{for(r=""+br(r),t=null,o=0;o<e.length;o++){if(e[o].value===r){e[o].selected=!0,n&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Ua(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(A(91));return Fe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function nc(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(A(92));if(Array.isArray(r)){if(!(1>=r.length))throw Error(A(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:br(r)}}function Sh(e,t){var r=br(t.value),n=br(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function oc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}var Ch={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};function Eh(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Na(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Eh(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ni,Th=function(e){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(t,r,n,o){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,o)})}:e}(function(e,t){if(e.namespaceURI!==Ch.svg||"innerHTML"in e)e.innerHTML=t;else{for(ni=ni||document.createElement("div"),ni.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ni.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function $o(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}function oi(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var gn={animationend:oi("Animation","AnimationEnd"),animationiteration:oi("Animation","AnimationIteration"),animationstart:oi("Animation","AnimationStart"),transitionend:oi("Transition","TransitionEnd")},Js={},$h={};zr&&($h=document.createElement("div").style,"AnimationEvent"in window||(delete gn.animationend.animation,delete gn.animationiteration.animation,delete gn.animationstart.animation),"TransitionEvent"in window||delete gn.transitionend.transition);function Ss(e){if(Js[e])return Js[e];if(!gn[e])return e;var t=gn[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in $h)return Js[e]=t[r];return e}var zh=Ss("animationend"),Ah=Ss("animationiteration"),Ph=Ss("animationstart"),Oh=Ss("transitionend"),uo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ic=new(typeof WeakMap=="function"?WeakMap:Map);function Gl(e){var t=ic.get(e);return t===void 0&&(t=new Map,ic.set(e,t)),t}function sn(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.effectTag&1026)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function Dh(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function sc(e){if(sn(e)!==e)throw Error(A(188))}function B0(e){var t=e.alternate;if(!t){if(t=sn(e),t===null)throw Error(A(188));return t!==e?null:e}for(var r=e,n=t;;){var o=r.return;if(o===null)break;var s=o.alternate;if(s===null){if(n=o.return,n!==null){r=n;continue}break}if(o.child===s.child){for(s=o.child;s;){if(s===r)return sc(o),e;if(s===n)return sc(o),t;s=s.sibling}throw Error(A(188))}if(r.return!==n.return)r=o,n=s;else{for(var i=!1,a=o.child;a;){if(a===r){i=!0,r=o,n=s;break}if(a===n){i=!0,n=o,r=s;break}a=a.sibling}if(!i){for(a=s.child;a;){if(a===r){i=!0,r=s,n=o;break}if(a===n){i=!0,n=s,r=o;break}a=a.sibling}if(!i)throw Error(A(189))}}if(r.alternate!==n)throw Error(A(190))}if(r.tag!==3)throw Error(A(188));return r.stateNode.current===r?e:t}function Ih(e){if(e=B0(e),!e)return null;for(var t=e;;){if(t.tag===5||t.tag===6)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}function Pn(e,t){if(t==null)throw Error(A(30));return e==null?t:Array.isArray(e)?Array.isArray(t)?(e.push.apply(e,t),e):(e.push(t),e):Array.isArray(t)?[e].concat(t):[e,t]}function Jl(e,t,r){Array.isArray(e)?e.forEach(t,r):e&&t.call(r,e)}var Zn=null;function V0(e){if(e){var t=e._dispatchListeners,r=e._dispatchInstances;if(Array.isArray(t))for(var n=0;n<t.length&&!e.isPropagationStopped();n++)Yu(e,t[n],r[n]);else t&&Yu(e,t,r);e._dispatchListeners=null,e._dispatchInstances=null,e.isPersistent()||e.constructor.release(e)}}function Cs(e){if(e!==null&&(Zn=Pn(Zn,e)),e=Zn,Zn=null,e){if(Jl(e,V0),Zn)throw Error(A(95));if(Ri)throw e=Aa,Ri=!1,Aa=null,e}}function Zl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}function Rh(e){if(!zr)return!1;e="on"+e;var t=e in document;return t||(t=document.createElement("div"),t.setAttribute(e,"return;"),t=typeof t[e]=="function"),t}var Ui=[];function Mh(e){e.topLevelType=null,e.nativeEvent=null,e.targetInst=null,e.ancestors.length=0,10>Ui.length&&Ui.push(e)}function Lh(e,t,r,n){if(Ui.length){var o=Ui.pop();return o.topLevelType=e,o.eventSystemFlags=n,o.nativeEvent=t,o.targetInst=r,o}return{topLevelType:e,eventSystemFlags:n,nativeEvent:t,targetInst:r,ancestors:[]}}function Uh(e){var t=e.targetInst,r=t;do{if(!r){e.ancestors.push(r);break}var n=r;if(n.tag===3)n=n.stateNode.containerInfo;else{for(;n.return;)n=n.return;n=n.tag!==3?null:n.stateNode.containerInfo}if(!n)break;t=r.tag,t!==5&&t!==6||e.ancestors.push(r),r=jo(n)}while(r);for(r=0;r<e.ancestors.length;r++){t=e.ancestors[r];var o=Zl(e.nativeEvent);n=e.topLevelType;var s=e.nativeEvent,i=e.eventSystemFlags;r===0&&(i|=64);for(var a=null,l=0;l<Li.length;l++){var u=Li[l];u&&(u=u.extractEvents(n,t,s,o,i))&&(a=Pn(a,u))}Cs(a)}}function Fa(e,t,r){if(!r.has(e)){switch(e){case"scroll":co(t,"scroll",!0);break;case"focus":case"blur":co(t,"focus",!0),co(t,"blur",!0),r.set("blur",null),r.set("focus",null);break;case"cancel":case"close":Rh(e)&&co(t,e,!0);break;case"invalid":case"submit":case"reset":break;default:uo.indexOf(e)===-1&&me(e,t)}r.set(e,null)}}var Nh,eu,Fh,Ba=!1,$t=[],dr=null,hr=null,pr=null,zo=new Map,Ao=new Map,eo=[],Va="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),H0="focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");function j0(e,t){var r=Gl(t);Va.forEach(function(n){Fa(n,t,r)}),H0.forEach(function(n){Fa(n,t,r)})}function Ha(e,t,r,n,o){return{blockedOn:e,topLevelType:t,eventSystemFlags:r|32,nativeEvent:o,container:n}}function ac(e,t){switch(e){case"focus":case"blur":dr=null;break;case"dragenter":case"dragleave":hr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":zo.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ao.delete(t.pointerId)}}function to(e,t,r,n,o,s){return e===null||e.nativeEvent!==s?(e=Ha(t,r,n,o,s),t!==null&&(t=Wo(t),t!==null&&eu(t)),e):(e.eventSystemFlags|=n,e)}function W0(e,t,r,n,o){switch(t){case"focus":return dr=to(dr,e,t,r,n,o),!0;case"dragenter":return hr=to(hr,e,t,r,n,o),!0;case"mouseover":return pr=to(pr,e,t,r,n,o),!0;case"pointerover":var s=o.pointerId;return zo.set(s,to(zo.get(s)||null,e,t,r,n,o)),!0;case"gotpointercapture":return s=o.pointerId,Ao.set(s,to(Ao.get(s)||null,e,t,r,n,o)),!0}return!1}function K0(e){var t=jo(e.target);if(t!==null){var r=sn(t);if(r!==null){if(t=r.tag,t===13){if(t=Dh(r),t!==null){e.blockedOn=t,Oe.unstable_runWithPriority(e.priority,function(){Fh(r)});return}}else if(t===3&&r.stateNode.hydrate){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vi(e){if(e.blockedOn!==null)return!1;var t=nu(e.topLevelType,e.eventSystemFlags,e.container,e.nativeEvent);if(t!==null){var r=Wo(t);return r!==null&&eu(r),e.blockedOn=t,!1}return!0}function lc(e,t,r){vi(e)&&r.delete(t)}function X0(){for(Ba=!1;0<$t.length;){var e=$t[0];if(e.blockedOn!==null){e=Wo(e.blockedOn),e!==null&&Nh(e);break}var t=nu(e.topLevelType,e.eventSystemFlags,e.container,e.nativeEvent);t!==null?e.blockedOn=t:$t.shift()}dr!==null&&vi(dr)&&(dr=null),hr!==null&&vi(hr)&&(hr=null),pr!==null&&vi(pr)&&(pr=null),zo.forEach(lc),Ao.forEach(lc)}function ro(e,t){e.blockedOn===t&&(e.blockedOn=null,Ba||(Ba=!0,Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority,X0)))}function Bh(e){function t(o){return ro(o,e)}if(0<$t.length){ro($t[0],e);for(var r=1;r<$t.length;r++){var n=$t[r];n.blockedOn===e&&(n.blockedOn=null)}}for(dr!==null&&ro(dr,e),hr!==null&&ro(hr,e),pr!==null&&ro(pr,e),zo.forEach(t),Ao.forEach(t),r=0;r<eo.length;r++)n=eo[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<eo.length&&(r=eo[0],r.blockedOn===null);)K0(r),r.blockedOn===null&&eo.shift()}var Vh={},Hh=new Map,tu=new Map,Y0=["abort","abort",zh,"animationEnd",Ah,"animationIteration",Ph,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Oh,"transitionEnd","waiting","waiting"];function ru(e,t){for(var r=0;r<e.length;r+=2){var n=e[r],o=e[r+1],s="on"+(o[0].toUpperCase()+o.slice(1));s={phasedRegistrationNames:{bubbled:s,captured:s+"Capture"},dependencies:[n],eventPriority:t},tu.set(n,t),Hh.set(n,s),Vh[o]=s}}ru("blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0);ru("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);ru(Y0,2);for(var uc="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),Zs=0;Zs<uc.length;Zs++)tu.set(uc[Zs],0);var q0=Oe.unstable_UserBlockingPriority,Q0=Oe.unstable_runWithPriority,yi=!0;function me(e,t){co(t,e,!1)}function co(e,t,r){var n=tu.get(t);switch(n===void 0?2:n){case 0:n=G0.bind(null,t,1,e);break;case 1:n=J0.bind(null,t,1,e);break;default:n=Es.bind(null,t,1,e)}r?e.addEventListener(t,n,!0):e.addEventListener(t,n,!1)}function G0(e,t,r,n){Fr||Hl();var o=Es,s=Fr;Fr=!0;try{ph(o,e,t,r,n)}finally{(Fr=s)||jl()}}function J0(e,t,r,n){Q0(q0,Es.bind(null,e,t,r,n))}function Es(e,t,r,n){if(yi)if(0<$t.length&&-1<Va.indexOf(e))e=Ha(null,e,t,r,n),$t.push(e);else{var o=nu(e,t,r,n);if(o===null)ac(e,n);else if(-1<Va.indexOf(e))e=Ha(o,e,t,r,n),$t.push(e);else if(!W0(o,e,t,r,n)){ac(e,n),e=Lh(e,n,null,t);try{mh(Uh,e)}finally{Mh(e)}}}}function nu(e,t,r,n){if(r=Zl(n),r=jo(r),r!==null){var o=sn(r);if(o===null)r=null;else{var s=o.tag;if(s===13){if(r=Dh(o),r!==null)return r;r=null}else if(s===3){if(o.stateNode.hydrate)return o.tag===3?o.stateNode.containerInfo:null;r=null}else o!==r&&(r=null)}}e=Lh(e,n,r,t);try{mh(Uh,e)}finally{Mh(e)}return null}var go={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Z0=["Webkit","ms","Moz","O"];Object.keys(go).forEach(function(e){Z0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),go[t]=go[e]})});function jh(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||go.hasOwnProperty(e)&&go[e]?(""+t).trim():t+"px"}function Wh(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,o=jh(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,o):e[r]=o}}var em=Fe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ja(e,t){if(t){if(em[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(A(137,e,""));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(A(60));if(!(typeof t.dangerouslySetInnerHTML=="object"&&"__html"in t.dangerouslySetInnerHTML))throw Error(A(61))}if(t.style!=null&&typeof t.style!="object")throw Error(A(62,""))}}function Wa(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cc=Ch.html;function Vt(e,t){e=e.nodeType===9||e.nodeType===11?e:e.ownerDocument;var r=Gl(e);t=Bl[t];for(var n=0;n<t.length;n++)Fa(t[n],e,r)}function Ni(){}function Ka(e){if(e=e||(typeof document!="undefined"?document:void 0),typeof e=="undefined")return null;try{return e.activeElement||e.body}catch{return e.body}}function dc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hc(e,t){var r=dc(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=dc(r)}}function Kh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Kh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function pc(){for(var e=window,t=Ka();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Ka(e.document)}return t}function Xa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Xh="$",Yh="/$",ou="$?",iu="$!",ea=null,ta=null;function qh(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function Ya(e,t){return e==="textarea"||e==="option"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ra=typeof setTimeout=="function"?setTimeout:void 0,tm=typeof clearTimeout=="function"?clearTimeout:void 0;function Sn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break}return e}function fc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r===Xh||r===iu||r===ou){if(t===0)return e;t--}else r===Yh&&t++}e=e.previousSibling}return null}var su=Math.random().toString(36).slice(2),sr="__reactInternalInstance$"+su,Fi="__reactEventHandlers$"+su,Ho="__reactContainere$"+su;function jo(e){var t=e[sr];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Ho]||r[sr]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=fc(e);e!==null;){if(r=e[sr])return r;e=fc(e)}return t}e=r,r=e.parentNode}return null}function Wo(e){return e=e[sr]||e[Ho],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Gr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(A(33))}function au(e){return e[Fi]||null}function Ht(e){do e=e.return;while(e&&e.tag!==5);return e||null}function Qh(e,t){var r=e.stateNode;if(!r)return null;var n=Fl(r);if(!n)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(A(231,t,typeof r));return r}function mc(e,t,r){(t=Qh(e,r.dispatchConfig.phasedRegistrationNames[t]))&&(r._dispatchListeners=Pn(r._dispatchListeners,t),r._dispatchInstances=Pn(r._dispatchInstances,e))}function rm(e){if(e&&e.dispatchConfig.phasedRegistrationNames){for(var t=e._targetInst,r=[];t;)r.push(t),t=Ht(t);for(t=r.length;0<t--;)mc(r[t],"captured",e);for(t=0;t<r.length;t++)mc(r[t],"bubbled",e)}}function qa(e,t,r){e&&r&&r.dispatchConfig.registrationName&&(t=Qh(e,r.dispatchConfig.registrationName))&&(r._dispatchListeners=Pn(r._dispatchListeners,t),r._dispatchInstances=Pn(r._dispatchInstances,e))}function nm(e){e&&e.dispatchConfig.registrationName&&qa(e._targetInst,null,e)}function On(e){Jl(e,rm)}var ar=null,lu=null,bi=null;function Gh(){if(bi)return bi;var e,t=lu,r=t.length,n,o="value"in ar?ar.value:ar.textContent,s=o.length;for(e=0;e<r&&t[e]===o[e];e++);var i=r-e;for(n=1;n<=i&&t[r-n]===o[s-n];n++);return bi=o.slice(e,1<n?1-n:void 0)}function wi(){return!0}function Bi(){return!1}function lt(e,t,r,n){this.dispatchConfig=e,this._targetInst=t,this.nativeEvent=r,e=this.constructor.Interface;for(var o in e)e.hasOwnProperty(o)&&((t=e[o])?this[o]=t(r):o==="target"?this.target=n:this[o]=r[o]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?wi:Bi,this.isPropagationStopped=Bi,this}Fe(lt.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!="unknown"&&(e.returnValue=!1),this.isDefaultPrevented=wi)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!="unknown"&&(e.cancelBubble=!0),this.isPropagationStopped=wi)},persist:function(){this.isPersistent=wi},isPersistent:Bi,destructor:function(){var e=this.constructor.Interface,t;for(t in e)this[t]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null,this.isPropagationStopped=this.isDefaultPrevented=Bi,this._dispatchInstances=this._dispatchListeners=null}});lt.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};lt.extend=function(e){function t(){}function r(){return n.apply(this,arguments)}var n=this;t.prototype=n.prototype;var o=new t;return Fe(o,r.prototype),r.prototype=o,r.prototype.constructor=r,r.Interface=Fe({},n.Interface,e),r.extend=n.extend,Jh(r),r};Jh(lt);function om(e,t,r,n){if(this.eventPool.length){var o=this.eventPool.pop();return this.call(o,e,t,r,n),o}return new this(e,t,r,n)}function im(e){if(!(e instanceof this))throw Error(A(279));e.destructor(),10>this.eventPool.length&&this.eventPool.push(e)}function Jh(e){e.eventPool=[],e.getPooled=om,e.release=im}var sm=lt.extend({data:null}),am=lt.extend({data:null}),lm=[9,13,27,32],uu=zr&&"CompositionEvent"in window,vo=null;zr&&"documentMode"in document&&(vo=document.documentMode);var um=zr&&"TextEvent"in window&&!vo,Zh=zr&&(!uu||vo&&8<vo&&11>=vo),gc=String.fromCharCode(32),Bt={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},vc=!1;function ep(e,t){switch(e){case"keyup":return lm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"blur":return!0;default:return!1}}function tp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var vn=!1;function cm(e,t){switch(e){case"compositionend":return tp(t);case"keypress":return t.which!==32?null:(vc=!0,gc);case"textInput":return e=t.data,e===gc&&vc?null:e;default:return null}}function dm(e,t){if(vn)return e==="compositionend"||!uu&&ep(e,t)?(e=Gh(),bi=lu=ar=null,vn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Zh&&t.locale!=="ko"?null:t.data;default:return null}}var hm={eventTypes:Bt,extractEvents:function(e,t,r,n){var o;if(uu)e:{switch(e){case"compositionstart":var s=Bt.compositionStart;break e;case"compositionend":s=Bt.compositionEnd;break e;case"compositionupdate":s=Bt.compositionUpdate;break e}s=void 0}else vn?ep(e,r)&&(s=Bt.compositionEnd):e==="keydown"&&r.keyCode===229&&(s=Bt.compositionStart);return s?(Zh&&r.locale!=="ko"&&(vn||s!==Bt.compositionStart?s===Bt.compositionEnd&&vn&&(o=Gh()):(ar=n,lu="value"in ar?ar.value:ar.textContent,vn=!0)),s=sm.getPooled(s,t,r,n),o?s.data=o:(o=tp(r),o!==null&&(s.data=o)),On(s),o=s):o=null,(e=um?cm(e,r):dm(e,r))?(t=am.getPooled(Bt.beforeInput,t,r,n),t.data=e,On(t)):t=null,o===null?t:t===null?o:[o,t]}},pm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!pm[e.type]:t==="textarea"}var np={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function op(e,t,r){return e=lt.getPooled(np.change,e,t,r),e.type="change",dh(r),On(e),e}var yo=null,Po=null;function fm(e){Cs(e)}function Ts(e){var t=Gr(e);if(_h(t))return e}function mm(e,t){if(e==="change")return t}var Qa=!1;zr&&(Qa=Rh("input")&&(!document.documentMode||9<document.documentMode));function yc(){yo&&(yo.detachEvent("onpropertychange",ip),Po=yo=null)}function ip(e){if(e.propertyName==="value"&&Ts(Po))if(e=op(Po,e,Zl(e)),Fr)Cs(e);else{Fr=!0;try{Vl(fm,e)}finally{Fr=!1,jl()}}}function gm(e,t,r){e==="focus"?(yc(),yo=t,Po=r,yo.attachEvent("onpropertychange",ip)):e==="blur"&&yc()}function vm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ts(Po)}function ym(e,t){if(e==="click")return Ts(t)}function bm(e,t){if(e==="input"||e==="change")return Ts(t)}var wm={eventTypes:np,_isInputEventSupported:Qa,extractEvents:function(e,t,r,n){var o=t?Gr(t):window,s=o.nodeName&&o.nodeName.toLowerCase();if(s==="select"||s==="input"&&o.type==="file")var i=mm;else if(rp(o))if(Qa)i=bm;else{i=vm;var a=gm}else(s=o.nodeName)&&s.toLowerCase()==="input"&&(o.type==="checkbox"||o.type==="radio")&&(i=ym);if(i&&(i=i(e,t)))return op(i,r,n);a&&a(e,o,t),e==="blur"&&(e=o._wrapperState)&&e.controlled&&o.type==="number"&&Ma(o,"number",o.value)}},Ko=lt.extend({view:null,detail:null}),xm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _m(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=xm[e])?!!t[e]:!1}function cu(){return _m}var bc=0,wc=0,xc=!1,_c=!1,Xo=Ko.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:cu,button:null,buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)},movementX:function(e){if("movementX"in e)return e.movementX;var t=bc;return bc=e.screenX,xc?e.type==="mousemove"?e.screenX-t:0:(xc=!0,0)},movementY:function(e){if("movementY"in e)return e.movementY;var t=wc;return wc=e.screenY,_c?e.type==="mousemove"?e.screenY-t:0:(_c=!0,0)}}),sp=Xo.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),no={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},km={eventTypes:no,extractEvents:function(e,t,r,n,o){var s=e==="mouseover"||e==="pointerover",i=e==="mouseout"||e==="pointerout";if(s&&(o&32)===0&&(r.relatedTarget||r.fromElement)||!i&&!s)return null;if(s=n.window===n?n:(s=n.ownerDocument)?s.defaultView||s.parentWindow:window,i){if(i=t,t=(t=r.relatedTarget||r.toElement)?jo(t):null,t!==null){var a=sn(t);(t!==a||t.tag!==5&&t.tag!==6)&&(t=null)}}else i=null;if(i===t)return null;if(e==="mouseout"||e==="mouseover")var l=Xo,u=no.mouseLeave,d=no.mouseEnter,c="mouse";else(e==="pointerout"||e==="pointerover")&&(l=sp,u=no.pointerLeave,d=no.pointerEnter,c="pointer");if(e=i==null?s:Gr(i),s=t==null?s:Gr(t),u=l.getPooled(u,i,r,n),u.type=c+"leave",u.target=e,u.relatedTarget=s,r=l.getPooled(d,t,r,n),r.type=c+"enter",r.target=s,r.relatedTarget=e,n=i,c=t,n&&c)e:{for(l=n,d=c,i=0,e=l;e;e=Ht(e))i++;for(e=0,t=d;t;t=Ht(t))e++;for(;0<i-e;)l=Ht(l),i--;for(;0<e-i;)d=Ht(d),e--;for(;i--;){if(l===d||l===d.alternate)break e;l=Ht(l),d=Ht(d)}l=null}else l=null;for(d=l,l=[];n&&n!==d&&(i=n.alternate,!(i!==null&&i===d));)l.push(n),n=Ht(n);for(n=[];c&&c!==d&&(i=c.alternate,!(i!==null&&i===d));)n.push(c),c=Ht(c);for(c=0;c<l.length;c++)qa(l[c],"bubbled",u);for(c=n.length;0<c--;)qa(n[c],"captured",r);return(o&64)===0?[u]:[u,r]}};function Sm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Jr=typeof Object.is=="function"?Object.is:Sm,Cm=Object.prototype.hasOwnProperty;function Oo(e,t){if(Jr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++)if(!Cm.call(t,r[n])||!Jr(e[r[n]],t[r[n]]))return!1;return!0}var Em=zr&&"documentMode"in document&&11>=document.documentMode,ap={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},yn=null,Ga=null,bo=null,Ja=!1;function kc(e,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;return Ja||yn==null||yn!==Ka(r)?null:(r=yn,"selectionStart"in r&&Xa(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),bo&&Oo(bo,r)?null:(bo=r,e=lt.getPooled(ap.select,Ga,e,t),e.type="select",e.target=yn,On(e),e))}var Tm={eventTypes:ap,extractEvents:function(e,t,r,n,o,s){if(o=s||(n.window===n?n.document:n.nodeType===9?n:n.ownerDocument),!(s=!o)){e:{o=Gl(o),s=Bl.onSelect;for(var i=0;i<s.length;i++)if(!o.has(s[i])){o=!1;break e}o=!0}s=!o}if(s)return null;switch(o=t?Gr(t):window,e){case"focus":(rp(o)||o.contentEditable==="true")&&(yn=o,Ga=t,bo=null);break;case"blur":bo=Ga=yn=null;break;case"mousedown":Ja=!0;break;case"contextmenu":case"mouseup":case"dragend":return Ja=!1,kc(r,n);case"selectionchange":if(Em)break;case"keydown":case"keyup":return kc(r,n)}return null}},$m=lt.extend({animationName:null,elapsedTime:null,pseudoElement:null}),zm=lt.extend({clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Am=Ko.extend({relatedTarget:null});function xi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}var Pm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Om={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Dm=Ko.extend({key:function(e){if(e.key){var t=Pm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=xi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Om[e.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:cu,charCode:function(e){return e.type==="keypress"?xi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?xi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Im=Xo.extend({dataTransfer:null}),Rm=Ko.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:cu}),Mm=lt.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),Lm=Xo.extend({deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:null,deltaMode:null}),Um={eventTypes:Vh,extractEvents:function(e,t,r,n){var o=Hh.get(e);if(!o)return null;switch(e){case"keypress":if(xi(r)===0)return null;case"keydown":case"keyup":e=Dm;break;case"blur":case"focus":e=Am;break;case"click":if(r.button===2)return null;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":e=Xo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":e=Im;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":e=Rm;break;case zh:case Ah:case Ph:e=$m;break;case Oh:e=Mm;break;case"scroll":e=Ko;break;case"wheel":e=Lm;break;case"copy":case"cut":case"paste":e=zm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":e=sp;break;default:e=lt}return t=e.getPooled(o,t,r,n),On(t),t}};if(Mi)throw Error(A(101));Mi=Array.prototype.slice.call("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));uh();var Nm=Wo;Fl=au;ah=Nm;lh=Gr;ch({SimpleEventPlugin:Um,EnterLeaveEventPlugin:km,ChangeEventPlugin:wm,SelectEventPlugin:Tm,BeforeInputEventPlugin:hm});var Za=[],bn=-1;function de(e){0>bn||(e.current=Za[bn],Za[bn]=null,bn--)}function be(e,t){bn++,Za[bn]=e.current,e.current=t}var wr={},Ue={current:wr},We={current:!1},Zr=wr;function Dn(e,t){var r=e.type.contextTypes;if(!r)return wr;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var o={},s;for(s in r)o[s]=t[s];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Ke(e){return e=e.childContextTypes,e!=null}function Vi(){de(We),de(Ue)}function Sc(e,t,r){if(Ue.current!==wr)throw Error(A(168));be(Ue,t),be(We,r)}function lp(e,t,r){var n=e.stateNode;if(e=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var o in n)if(!(o in e))throw Error(A(108,qt(t)||"Unknown",o));return Fe({},r,{},n)}function _i(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||wr,Zr=Ue.current,be(Ue,e),be(We,We.current),!0}function Cc(e,t,r){var n=e.stateNode;if(!n)throw Error(A(169));r?(e=lp(e,t,Zr),n.__reactInternalMemoizedMergedChildContext=e,de(We),de(Ue),be(Ue,e)):de(We),be(We,r)}var Fm=Oe.unstable_runWithPriority,du=Oe.unstable_scheduleCallback,up=Oe.unstable_cancelCallback,Ec=Oe.unstable_requestPaint,el=Oe.unstable_now,Bm=Oe.unstable_getCurrentPriorityLevel,$s=Oe.unstable_ImmediatePriority,cp=Oe.unstable_UserBlockingPriority,dp=Oe.unstable_NormalPriority,hp=Oe.unstable_LowPriority,pp=Oe.unstable_IdlePriority,fp={},Vm=Oe.unstable_shouldYield,Hm=Ec!==void 0?Ec:function(){},jt=null,ki=null,na=!1,Tc=el(),ct=1e4>Tc?el:function(){return el()-Tc};function zs(){switch(Bm()){case $s:return 99;case cp:return 98;case dp:return 97;case hp:return 96;case pp:return 95;default:throw Error(A(332))}}function mp(e){switch(e){case 99:return $s;case 98:return cp;case 97:return dp;case 96:return hp;case 95:return pp;default:throw Error(A(332))}}function xr(e,t){return e=mp(e),Fm(e,t)}function gp(e,t,r){return e=mp(e),du(e,t,r)}function $c(e){return jt===null?(jt=[e],ki=du($s,vp)):jt.push(e),fp}function Nt(){if(ki!==null){var e=ki;ki=null,up(e)}vp()}function vp(){if(!na&&jt!==null){na=!0;var e=0;try{var t=jt;xr(99,function(){for(;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}}),jt=null}catch(r){throw jt!==null&&(jt=jt.slice(e+1)),du($s,Nt),r}finally{na=!1}}}function Si(e,t,r){return r/=10,1073741821-(((1073741821-e+t/10)/r|0)+1)*r}function vt(e,t){if(e&&e.defaultProps){t=Fe({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r])}return t}var Hi={current:null},ji=null,wn=null,Wi=null;function hu(){Wi=wn=ji=null}function pu(e){var t=Hi.current;de(Hi),e.type._context._currentValue=t}function yp(e,t){for(;e!==null;){var r=e.alternate;if(e.childExpirationTime<t)e.childExpirationTime=t,r!==null&&r.childExpirationTime<t&&(r.childExpirationTime=t);else if(r!==null&&r.childExpirationTime<t)r.childExpirationTime=t;else break;e=e.return}}function Cn(e,t){ji=e,Wi=wn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.expirationTime>=t&&(zt=!0),e.firstContext=null)}function ht(e,t){if(Wi!==e&&t!==!1&&t!==0)if((typeof t!="number"||t===1073741823)&&(Wi=e,t=1073741823),t={context:e,observedBits:t,next:null},wn===null){if(ji===null)throw Error(A(308));wn=t,ji.dependencies={expirationTime:0,firstContext:t,responders:null}}else wn=wn.next=t;return e._currentValue}var or=!1;function fu(e){e.updateQueue={baseState:e.memoizedState,baseQueue:null,shared:{pending:null},effects:null}}function mu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,baseQueue:e.baseQueue,shared:e.shared,effects:e.effects})}function fr(e,t){return e={expirationTime:e,suspenseConfig:t,tag:0,payload:null,callback:null,next:null},e.next=e}function mr(e,t){if(e=e.updateQueue,e!==null){e=e.shared;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}}function zc(e,t){var r=e.alternate;r!==null&&mu(r,e),e=e.updateQueue,r=e.baseQueue,r===null?(e.baseQueue=t.next=t,t.next=t):(t.next=r.next,r.next=t)}function Do(e,t,r,n){var o=e.updateQueue;or=!1;var s=o.baseQueue,i=o.shared.pending;if(i!==null){if(s!==null){var a=s.next;s.next=i.next,i.next=a}s=i,o.shared.pending=null,a=e.alternate,a!==null&&(a=a.updateQueue,a!==null&&(a.baseQueue=i))}if(s!==null){a=s.next;var l=o.baseState,u=0,d=null,c=null,p=null;if(a!==null){var b=a;do{if(i=b.expirationTime,i<n){var w={expirationTime:b.expirationTime,suspenseConfig:b.suspenseConfig,tag:b.tag,payload:b.payload,callback:b.callback,next:null};p===null?(c=p=w,d=l):p=p.next=w,i>u&&(u=i)}else{p!==null&&(p=p.next={expirationTime:1073741823,suspenseConfig:b.suspenseConfig,tag:b.tag,payload:b.payload,callback:b.callback,next:null}),Yp(i,b.suspenseConfig);e:{var g=e,f=b;switch(i=t,w=r,f.tag){case 1:if(g=f.payload,typeof g=="function"){l=g.call(w,l,i);break e}l=g;break e;case 3:g.effectTag=g.effectTag&-4097|64;case 0:if(g=f.payload,i=typeof g=="function"?g.call(w,l,i):g,i==null)break e;l=Fe({},l,i);break e;case 2:or=!0}}b.callback!==null&&(e.effectTag|=32,i=o.effects,i===null?o.effects=[b]:i.push(b))}if(b=b.next,b===null||b===a){if(i=o.shared.pending,i===null)break;b=s.next=i.next,i.next=a,o.baseQueue=s=i,o.shared.pending=null}}while(1)}p===null?d=l:p.next=c,o.baseState=d,o.baseQueue=p,Is(u),e.expirationTime=u,e.memoizedState=l}}function Ac(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],o=n.callback;if(o!==null){if(n.callback=null,n=o,o=r,typeof n!="function")throw Error(A(191,n));n.call(o)}}}var wo=yt.ReactCurrentBatchConfig,bp=new ks.Component().refs;function Ki(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:Fe({},t,r),e.memoizedState=r,e.expirationTime===0&&(e.updateQueue.baseState=r)}var As={isMounted:function(e){return(e=e._reactInternalFiber)?sn(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternalFiber;var n=Ot(),o=wo.suspense;n=qr(n,e,o),o=fr(n,o),o.payload=t,r!=null&&(o.callback=r),mr(e,o),vr(e,n)},enqueueReplaceState:function(e,t,r){e=e._reactInternalFiber;var n=Ot(),o=wo.suspense;n=qr(n,e,o),o=fr(n,o),o.tag=1,o.payload=t,r!=null&&(o.callback=r),mr(e,o),vr(e,n)},enqueueForceUpdate:function(e,t){e=e._reactInternalFiber;var r=Ot(),n=wo.suspense;r=qr(r,e,n),n=fr(r,n),n.tag=2,t!=null&&(n.callback=t),mr(e,n),vr(e,r)}};function Pc(e,t,r,n,o,s,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,s,i):t.prototype&&t.prototype.isPureReactComponent?!Oo(r,n)||!Oo(o,s):!0}function wp(e,t,r){var n=!1,o=wr,s=t.contextType;return typeof s=="object"&&s!==null?s=ht(s):(o=Ke(t)?Zr:Ue.current,n=t.contextTypes,s=(n=n!=null)?Dn(e,o):wr),t=new t(r,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=As,e.stateNode=t,t._reactInternalFiber=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=s),t}function Oc(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&As.enqueueReplaceState(t,t.state,null)}function tl(e,t,r,n){var o=e.stateNode;o.props=r,o.state=e.memoizedState,o.refs=bp,fu(e);var s=t.contextType;typeof s=="object"&&s!==null?o.context=ht(s):(s=Ke(t)?Zr:Ue.current,o.context=Dn(e,s)),Do(e,r,o,n),o.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Ki(e,t,s,r),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&As.enqueueReplaceState(o,o.state,null),Do(e,r,o,n),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.effectTag|=4)}var ii=Array.isArray;function oo(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(A(309));var n=r.stateNode}if(!n)throw Error(A(147,e));var o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var i=n.refs;i===bp&&(i=n.refs={}),s===null?delete i[o]:i[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(A(284));if(!r._owner)throw Error(A(290,e))}return e}function si(e,t){if(e.type!=="textarea")throw Error(A(31,Object.prototype.toString.call(t)==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":t,""))}function xp(e){function t(f,m){if(e){var y=f.lastEffect;y!==null?(y.nextEffect=m,f.lastEffect=m):f.firstEffect=f.lastEffect=m,m.nextEffect=null,m.effectTag=8}}function r(f,m){if(!e)return null;for(;m!==null;)t(f,m),m=m.sibling;return null}function n(f,m){for(f=new Map;m!==null;)m.key!==null?f.set(m.key,m):f.set(m.index,m),m=m.sibling;return f}function o(f,m){return f=en(f,m),f.index=0,f.sibling=null,f}function s(f,m,y){return f.index=y,e?(y=f.alternate,y!==null?(y=y.index,y<m?(f.effectTag=2,m):y):(f.effectTag=2,m)):m}function i(f){return e&&f.alternate===null&&(f.effectTag=2),f}function a(f,m,y,_){return m===null||m.tag!==6?(m=ua(y,f.mode,_),m.return=f,m):(m=o(m,y),m.return=f,m)}function l(f,m,y,_){return m!==null&&m.elementType===y.type?(_=o(m,y.props),_.ref=oo(f,m,y),_.return=f,_):(_=$i(y.type,y.key,y.props,null,f.mode,_),_.ref=oo(f,m,y),_.return=f,_)}function u(f,m,y,_){return m===null||m.tag!==4||m.stateNode.containerInfo!==y.containerInfo||m.stateNode.implementation!==y.implementation?(m=ca(y,f.mode,_),m.return=f,m):(m=o(m,y.children||[]),m.return=f,m)}function d(f,m,y,_,x){return m===null||m.tag!==7?(m=cr(y,f.mode,_,x),m.return=f,m):(m=o(m,y),m.return=f,m)}function c(f,m,y){if(typeof m=="string"||typeof m=="number")return m=ua(""+m,f.mode,y),m.return=f,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ti:return y=$i(m.type,m.key,m.props,null,f.mode,y),y.ref=oo(f,null,m),y.return=f,y;case mn:return m=ca(m,f.mode,y),m.return=f,m}if(ii(m)||Jn(m))return m=cr(m,f.mode,y,null),m.return=f,m;si(f,m)}return null}function p(f,m,y,_){var x=m!==null?m.key:null;if(typeof y=="string"||typeof y=="number")return x!==null?null:a(f,m,""+y,_);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ti:return y.key===x?y.type===Ur?d(f,m,y.props.children,_,x):l(f,m,y,_):null;case mn:return y.key===x?u(f,m,y,_):null}if(ii(y)||Jn(y))return x!==null?null:d(f,m,y,_,null);si(f,y)}return null}function b(f,m,y,_,x){if(typeof _=="string"||typeof _=="number")return f=f.get(y)||null,a(m,f,""+_,x);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case ti:return f=f.get(_.key===null?y:_.key)||null,_.type===Ur?d(m,f,_.props.children,x,_.key):l(m,f,_,x);case mn:return f=f.get(_.key===null?y:_.key)||null,u(m,f,_,x)}if(ii(_)||Jn(_))return f=f.get(y)||null,d(m,f,_,x,null);si(m,_)}return null}function w(f,m,y,_){for(var x=null,k=null,C=m,E=m=0,$=null;C!==null&&E<y.length;E++){C.index>E?($=C,C=null):$=C.sibling;var T=p(f,C,y[E],_);if(T===null){C===null&&(C=$);break}e&&C&&T.alternate===null&&t(f,C),m=s(T,m,E),k===null?x=T:k.sibling=T,k=T,C=$}if(E===y.length)return r(f,C),x;if(C===null){for(;E<y.length;E++)C=c(f,y[E],_),C!==null&&(m=s(C,m,E),k===null?x=C:k.sibling=C,k=C);return x}for(C=n(f,C);E<y.length;E++)$=b(C,f,E,y[E],_),$!==null&&(e&&$.alternate!==null&&C.delete($.key===null?E:$.key),m=s($,m,E),k===null?x=$:k.sibling=$,k=$);return e&&C.forEach(function(D){return t(f,D)}),x}function g(f,m,y,_){var x=Jn(y);if(typeof x!="function")throw Error(A(150));if(y=x.call(y),y==null)throw Error(A(151));for(var k=x=null,C=m,E=m=0,$=null,T=y.next();C!==null&&!T.done;E++,T=y.next()){C.index>E?($=C,C=null):$=C.sibling;var D=p(f,C,T.value,_);if(D===null){C===null&&(C=$);break}e&&C&&D.alternate===null&&t(f,C),m=s(D,m,E),k===null?x=D:k.sibling=D,k=D,C=$}if(T.done)return r(f,C),x;if(C===null){for(;!T.done;E++,T=y.next())T=c(f,T.value,_),T!==null&&(m=s(T,m,E),k===null?x=T:k.sibling=T,k=T);return x}for(C=n(f,C);!T.done;E++,T=y.next())T=b(C,f,E,T.value,_),T!==null&&(e&&T.alternate!==null&&C.delete(T.key===null?E:T.key),m=s(T,m,E),k===null?x=T:k.sibling=T,k=T);return e&&C.forEach(function(F){return t(f,F)}),x}return function(f,m,y,_){var x=typeof y=="object"&&y!==null&&y.type===Ur&&y.key===null;x&&(y=y.props.children);var k=typeof y=="object"&&y!==null;if(k)switch(y.$$typeof){case ti:e:{for(k=y.key,x=m;x!==null;){if(x.key===k){switch(x.tag){case 7:if(y.type===Ur){r(f,x.sibling),m=o(x,y.props.children),m.return=f,f=m;break e}break;default:if(x.elementType===y.type){r(f,x.sibling),m=o(x,y.props),m.ref=oo(f,x,y),m.return=f,f=m;break e}}r(f,x);break}else t(f,x);x=x.sibling}y.type===Ur?(m=cr(y.props.children,f.mode,_,y.key),m.return=f,f=m):(_=$i(y.type,y.key,y.props,null,f.mode,_),_.ref=oo(f,m,y),_.return=f,f=_)}return i(f);case mn:e:{for(x=y.key;m!==null;){if(m.key===x)if(m.tag===4&&m.stateNode.containerInfo===y.containerInfo&&m.stateNode.implementation===y.implementation){r(f,m.sibling),m=o(m,y.children||[]),m.return=f,f=m;break e}else{r(f,m);break}else t(f,m);m=m.sibling}m=ca(y,f.mode,_),m.return=f,f=m}return i(f)}if(typeof y=="string"||typeof y=="number")return y=""+y,m!==null&&m.tag===6?(r(f,m.sibling),m=o(m,y),m.return=f,f=m):(r(f,m),m=ua(y,f.mode,_),m.return=f,f=m),i(f);if(ii(y))return w(f,m,y,_);if(Jn(y))return g(f,m,y,_);if(k&&si(f,y),typeof y=="undefined"&&!x)switch(f.tag){case 1:case 0:throw f=f.type,Error(A(152,f.displayName||f.name||"Component"))}return r(f,m)}}var In=xp(!0),gu=xp(!1),Yo={},Pt={current:Yo},Io={current:Yo},Ro={current:Yo};function Br(e){if(e===Yo)throw Error(A(174));return e}function rl(e,t){switch(be(Ro,t),be(Io,e),be(Pt,Yo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Na(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Na(t,e)}de(Pt),be(Pt,t)}function Rn(){de(Pt),de(Io),de(Ro)}function Dc(e){Br(Ro.current);var t=Br(Pt.current),r=Na(t,e.type);t!==r&&(be(Io,e),be(Pt,r))}function vu(e){Io.current===e&&(de(Pt),de(Io))}var ge={current:0};function Xi(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data===ou||r.data===iu))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.effectTag&64)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function yu(e,t){return{responder:e,props:t}}var Ci=yt.ReactCurrentDispatcher,dt=yt.ReactCurrentBatchConfig,lr=0,Se=null,Re=null,Me=null,Yi=!1;function Je(){throw Error(A(321))}function bu(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Jr(e[r],t[r]))return!1;return!0}function wu(e,t,r,n,o,s){if(lr=s,Se=t,t.memoizedState=null,t.updateQueue=null,t.expirationTime=0,Ci.current=e===null||e.memoizedState===null?jm:Wm,e=r(n,o),t.expirationTime===lr){s=0;do{if(t.expirationTime=0,!(25>s))throw Error(A(301));s+=1,Me=Re=null,t.updateQueue=null,Ci.current=Km,e=r(n,o)}while(t.expirationTime===lr)}if(Ci.current=Gi,t=Re!==null&&Re.next!==null,lr=0,Me=Re=Se=null,Yi=!1,t)throw Error(A(300));return e}function En(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Me===null?Se.memoizedState=Me=e:Me=Me.next=e,Me}function Xn(){if(Re===null){var e=Se.alternate;e=e!==null?e.memoizedState:null}else e=Re.next;var t=Me===null?Se.memoizedState:Me.next;if(t!==null)Me=t,Re=e;else{if(e===null)throw Error(A(310));Re=e,e={memoizedState:Re.memoizedState,baseState:Re.baseState,baseQueue:Re.baseQueue,queue:Re.queue,next:null},Me===null?Se.memoizedState=Me=e:Me=Me.next=e}return Me}function Kr(e,t){return typeof t=="function"?t(e):t}function ai(e){var t=Xn(),r=t.queue;if(r===null)throw Error(A(311));r.lastRenderedReducer=e;var n=Re,o=n.baseQueue,s=r.pending;if(s!==null){if(o!==null){var i=o.next;o.next=s.next,s.next=i}n.baseQueue=o=s,r.pending=null}if(o!==null){o=o.next,n=n.baseState;var a=i=s=null,l=o;do{var u=l.expirationTime;if(u<lr){var d={expirationTime:l.expirationTime,suspenseConfig:l.suspenseConfig,action:l.action,eagerReducer:l.eagerReducer,eagerState:l.eagerState,next:null};a===null?(i=a=d,s=n):a=a.next=d,u>Se.expirationTime&&(Se.expirationTime=u,Is(u))}else a!==null&&(a=a.next={expirationTime:1073741823,suspenseConfig:l.suspenseConfig,action:l.action,eagerReducer:l.eagerReducer,eagerState:l.eagerState,next:null}),Yp(u,l.suspenseConfig),n=l.eagerReducer===e?l.eagerState:e(n,l.action);l=l.next}while(l!==null&&l!==o);a===null?s=n:a.next=i,Jr(n,t.memoizedState)||(zt=!0),t.memoizedState=n,t.baseState=s,t.baseQueue=a,r.lastRenderedState=n}return[t.memoizedState,r.dispatch]}function li(e){var t=Xn(),r=t.queue;if(r===null)throw Error(A(311));r.lastRenderedReducer=e;var n=r.dispatch,o=r.pending,s=t.memoizedState;if(o!==null){r.pending=null;var i=o=o.next;do s=e(s,i.action),i=i.next;while(i!==o);Jr(s,t.memoizedState)||(zt=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),r.lastRenderedState=s}return[s,n]}function oa(e){var t=En();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e=t.queue={pending:null,dispatch:null,lastRenderedReducer:Kr,lastRenderedState:e},e=e.dispatch=Tp.bind(null,Se,e),[t.memoizedState,e]}function nl(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=Se.updateQueue,t===null?(t={lastEffect:null},Se.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function _p(){return Xn().memoizedState}function ol(e,t,r,n){var o=En();Se.effectTag|=e,o.memoizedState=nl(1|t,r,void 0,n===void 0?null:n)}function xu(e,t,r,n){var o=Xn();n=n===void 0?null:n;var s=void 0;if(Re!==null){var i=Re.memoizedState;if(s=i.destroy,n!==null&&bu(n,i.deps)){nl(t,r,s,n);return}}Se.effectTag|=e,o.memoizedState=nl(1|t,r,s,n)}function Ic(e,t){return ol(516,4,e,t)}function qi(e,t){return xu(516,4,e,t)}function kp(e,t){return xu(4,2,e,t)}function Sp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Cp(e,t,r){return r=r!=null?r.concat([e]):null,xu(4,2,Sp.bind(null,t,e),r)}function _u(){}function Rc(e,t){return En().memoizedState=[e,t===void 0?null:t],e}function Qi(e,t){var r=Xn();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&bu(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Ep(e,t){var r=Xn();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&bu(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function ku(e,t,r){var n=zs();xr(98>n?98:n,function(){e(!0)}),xr(97<n?97:n,function(){var o=dt.suspense;dt.suspense=t===void 0?null:t;try{e(!1),r()}finally{dt.suspense=o}})}function Tp(e,t,r){var n=Ot(),o=wo.suspense;n=qr(n,e,o),o={expirationTime:n,suspenseConfig:o,action:r,eagerReducer:null,eagerState:null,next:null};var s=t.pending;if(s===null?o.next=o:(o.next=s.next,s.next=o),t.pending=o,s=e.alternate,e===Se||s!==null&&s===Se)Yi=!0,o.expirationTime=lr,Se.expirationTime=lr;else{if(e.expirationTime===0&&(s===null||s.expirationTime===0)&&(s=t.lastRenderedReducer,s!==null))try{var i=t.lastRenderedState,a=s(i,r);if(o.eagerReducer=s,o.eagerState=a,Jr(a,i))return}catch{}finally{}vr(e,n)}}var Gi={readContext:ht,useCallback:Je,useContext:Je,useEffect:Je,useImperativeHandle:Je,useLayoutEffect:Je,useMemo:Je,useReducer:Je,useRef:Je,useState:Je,useDebugValue:Je,useResponder:Je,useDeferredValue:Je,useTransition:Je},jm={readContext:ht,useCallback:Rc,useContext:ht,useEffect:Ic,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,ol(4,2,Sp.bind(null,t,e),r)},useLayoutEffect:function(e,t){return ol(4,2,e,t)},useMemo:function(e,t){var r=En();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=En();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e=n.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},e=e.dispatch=Tp.bind(null,Se,e),[n.memoizedState,e]},useRef:function(e){var t=En();return e={current:e},t.memoizedState=e},useState:oa,useDebugValue:_u,useResponder:yu,useDeferredValue:function(e,t){var r=oa(e),n=r[0],o=r[1];return Ic(function(){var s=dt.suspense;dt.suspense=t===void 0?null:t;try{o(e)}finally{dt.suspense=s}},[e,t]),n},useTransition:function(e){var t=oa(!1),r=t[0];return t=t[1],[Rc(ku.bind(null,t,e),[t,e]),r]}},Wm={readContext:ht,useCallback:Qi,useContext:ht,useEffect:qi,useImperativeHandle:Cp,useLayoutEffect:kp,useMemo:Ep,useReducer:ai,useRef:_p,useState:function(){return ai(Kr)},useDebugValue:_u,useResponder:yu,useDeferredValue:function(e,t){var r=ai(Kr),n=r[0],o=r[1];return qi(function(){var s=dt.suspense;dt.suspense=t===void 0?null:t;try{o(e)}finally{dt.suspense=s}},[e,t]),n},useTransition:function(e){var t=ai(Kr),r=t[0];return t=t[1],[Qi(ku.bind(null,t,e),[t,e]),r]}},Km={readContext:ht,useCallback:Qi,useContext:ht,useEffect:qi,useImperativeHandle:Cp,useLayoutEffect:kp,useMemo:Ep,useReducer:li,useRef:_p,useState:function(){return li(Kr)},useDebugValue:_u,useResponder:yu,useDeferredValue:function(e,t){var r=li(Kr),n=r[0],o=r[1];return qi(function(){var s=dt.suspense;dt.suspense=t===void 0?null:t;try{o(e)}finally{dt.suspense=s}},[e,t]),n},useTransition:function(e){var t=li(Kr),r=t[0];return t=t[1],[Qi(ku.bind(null,t,e),[t,e]),r]}},Xt=null,ur=null,Xr=!1;function $p(e,t){var r=At(5,null,null,0);r.elementType="DELETED",r.type="DELETED",r.stateNode=t,r.return=e,r.effectTag=8,e.lastEffect!==null?(e.lastEffect.nextEffect=r,e.lastEffect=r):e.firstEffect=e.lastEffect=r}function Mc(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,!0):!1;case 13:return!1;default:return!1}}function il(e){if(Xr){var t=ur;if(t){var r=t;if(!Mc(e,t)){if(t=Sn(r.nextSibling),!t||!Mc(e,t)){e.effectTag=e.effectTag&-1025|2,Xr=!1,Xt=e;return}$p(Xt,r)}Xt=e,ur=Sn(t.firstChild)}else e.effectTag=e.effectTag&-1025|2,Xr=!1,Xt=e}}function Lc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Xt=e}function ui(e){if(e!==Xt)return!1;if(!Xr)return Lc(e),Xr=!0,!1;var t=e.type;if(e.tag!==5||t!=="head"&&t!=="body"&&!Ya(t,e.memoizedProps))for(t=ur;t;)$p(e,t),t=Sn(t.nextSibling);if(Lc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(A(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r===Yh){if(t===0){ur=Sn(e.nextSibling);break e}t--}else r!==Xh&&r!==iu&&r!==ou||t++}e=e.nextSibling}ur=null}}else ur=Xt?Sn(e.stateNode.nextSibling):null;return!0}function ia(){ur=Xt=null,Xr=!1}var Xm=yt.ReactCurrentOwner,zt=!1;function Ze(e,t,r,n){t.child=e===null?gu(t,null,r,n):In(t,e.child,r,n)}function Uc(e,t,r,n,o){r=r.render;var s=t.ref;return Cn(t,o),n=wu(e,t,r,n,s,o),e!==null&&!zt?(t.updateQueue=e.updateQueue,t.effectTag&=-517,e.expirationTime<=o&&(e.expirationTime=0),Yt(e,t,o)):(t.effectTag|=1,Ze(e,t,n,o),t.child)}function Nc(e,t,r,n,o,s){if(e===null){var i=r.type;return typeof i=="function"&&!$u(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=i,zp(e,t,i,n,o,s)):(e=$i(r.type,null,n,null,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}return i=e.child,o<s&&(o=i.memoizedProps,r=r.compare,r=r!==null?r:Oo,r(o,n)&&e.ref===t.ref)?Yt(e,t,s):(t.effectTag|=1,e=en(i,n),e.ref=t.ref,e.return=t,t.child=e)}function zp(e,t,r,n,o,s){return e!==null&&Oo(e.memoizedProps,n)&&e.ref===t.ref&&(zt=!1,o<s)?(t.expirationTime=e.expirationTime,Yt(e,t,s)):sl(e,t,r,n,s)}function Ap(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.effectTag|=128)}function sl(e,t,r,n,o){var s=Ke(r)?Zr:Ue.current;return s=Dn(t,s),Cn(t,o),r=wu(e,t,r,n,s,o),e!==null&&!zt?(t.updateQueue=e.updateQueue,t.effectTag&=-517,e.expirationTime<=o&&(e.expirationTime=0),Yt(e,t,o)):(t.effectTag|=1,Ze(e,t,r,o),t.child)}function Fc(e,t,r,n,o){if(Ke(r)){var s=!0;_i(t)}else s=!1;if(Cn(t,o),t.stateNode===null)e!==null&&(e.alternate=null,t.alternate=null,t.effectTag|=2),wp(t,r,n),tl(t,r,n,o),n=!0;else if(e===null){var i=t.stateNode,a=t.memoizedProps;i.props=a;var l=i.context,u=r.contextType;typeof u=="object"&&u!==null?u=ht(u):(u=Ke(r)?Zr:Ue.current,u=Dn(t,u));var d=r.getDerivedStateFromProps,c=typeof d=="function"||typeof i.getSnapshotBeforeUpdate=="function";c||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==n||l!==u)&&Oc(t,i,n,u),or=!1;var p=t.memoizedState;i.state=p,Do(t,n,i,o),l=t.memoizedState,a!==n||p!==l||We.current||or?(typeof d=="function"&&(Ki(t,r,d,n),l=t.memoizedState),(a=or||Pc(t,r,a,n,p,l,u))?(c||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.effectTag|=4)):(typeof i.componentDidMount=="function"&&(t.effectTag|=4),t.memoizedProps=n,t.memoizedState=l),i.props=n,i.state=l,i.context=u,n=a):(typeof i.componentDidMount=="function"&&(t.effectTag|=4),n=!1)}else i=t.stateNode,mu(e,t),a=t.memoizedProps,i.props=t.type===t.elementType?a:vt(t.type,a),l=i.context,u=r.contextType,typeof u=="object"&&u!==null?u=ht(u):(u=Ke(r)?Zr:Ue.current,u=Dn(t,u)),d=r.getDerivedStateFromProps,(c=typeof d=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==n||l!==u)&&Oc(t,i,n,u),or=!1,l=t.memoizedState,i.state=l,Do(t,n,i,o),p=t.memoizedState,a!==n||l!==p||We.current||or?(typeof d=="function"&&(Ki(t,r,d,n),p=t.memoizedState),(d=or||Pc(t,r,a,n,l,p,u))?(c||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(n,p,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(n,p,u)),typeof i.componentDidUpdate=="function"&&(t.effectTag|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.effectTag|=256)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&l===e.memoizedState||(t.effectTag|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&l===e.memoizedState||(t.effectTag|=256),t.memoizedProps=n,t.memoizedState=p),i.props=n,i.state=p,i.context=u,n=d):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&l===e.memoizedState||(t.effectTag|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&l===e.memoizedState||(t.effectTag|=256),n=!1);return al(e,t,r,n,s,o)}function al(e,t,r,n,o,s){Ap(e,t);var i=(t.effectTag&64)!==0;if(!n&&!i)return o&&Cc(t,r,!1),Yt(e,t,s);n=t.stateNode,Xm.current=t;var a=i&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.effectTag|=1,e!==null&&i?(t.child=In(t,e.child,null,s),t.child=In(t,null,a,s)):Ze(e,t,a,s),t.memoizedState=n.state,o&&Cc(t,r,!0),t.child}function Bc(e){var t=e.stateNode;t.pendingContext?Sc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Sc(e,t.context,!1),rl(e,t.containerInfo)}var sa={dehydrated:null,retryTime:0};function Vc(e,t,r){var n=t.mode,o=t.pendingProps,s=ge.current,i=!1,a;if((a=(t.effectTag&64)!==0)||(a=(s&2)!==0&&(e===null||e.memoizedState!==null)),a?(i=!0,t.effectTag&=-65):e!==null&&e.memoizedState===null||o.fallback===void 0||o.unstable_avoidThisFallback===!0||(s|=1),be(ge,s&1),e===null){if(o.fallback!==void 0&&il(t),i){if(i=o.fallback,o=cr(null,n,0,null),o.return=t,(t.mode&2)===0)for(e=t.memoizedState!==null?t.child.child:t.child,o.child=e;e!==null;)e.return=o,e=e.sibling;return r=cr(i,n,r,null),r.return=t,o.sibling=r,t.memoizedState=sa,t.child=o,r}return n=o.children,t.memoizedState=null,t.child=gu(t,null,n,r)}if(e.memoizedState!==null){if(e=e.child,n=e.sibling,i){if(o=o.fallback,r=en(e,e.pendingProps),r.return=t,(t.mode&2)===0&&(i=t.memoizedState!==null?t.child.child:t.child,i!==e.child))for(r.child=i;i!==null;)i.return=r,i=i.sibling;return n=en(n,o),n.return=t,r.sibling=n,r.childExpirationTime=0,t.memoizedState=sa,t.child=r,n}return r=In(t,e.child,o.children,r),t.memoizedState=null,t.child=r}if(e=e.child,i){if(i=o.fallback,o=cr(null,n,0,null),o.return=t,o.child=e,e!==null&&(e.return=o),(t.mode&2)===0)for(e=t.memoizedState!==null?t.child.child:t.child,o.child=e;e!==null;)e.return=o,e=e.sibling;return r=cr(i,n,r,null),r.return=t,o.sibling=r,r.effectTag|=2,o.childExpirationTime=0,t.memoizedState=sa,t.child=o,r}return t.memoizedState=null,t.child=In(t,e,o.children,r)}function Hc(e,t){e.expirationTime<t&&(e.expirationTime=t);var r=e.alternate;r!==null&&r.expirationTime<t&&(r.expirationTime=t),yp(e.return,t)}function aa(e,t,r,n,o,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailExpiration:0,tailMode:o,lastEffect:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=n,i.tail=r,i.tailExpiration=0,i.tailMode=o,i.lastEffect=s)}function jc(e,t,r){var n=t.pendingProps,o=n.revealOrder,s=n.tail;if(Ze(e,t,n.children,r),n=ge.current,(n&2)!==0)n=n&1|2,t.effectTag|=64;else{if(e!==null&&(e.effectTag&64)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Hc(e,r);else if(e.tag===19)Hc(e,r);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(be(ge,n),(t.mode&2)===0)t.memoizedState=null;else switch(o){case"forwards":for(r=t.child,o=null;r!==null;)e=r.alternate,e!==null&&Xi(e)===null&&(o=r),r=r.sibling;r=o,r===null?(o=t.child,t.child=null):(o=r.sibling,r.sibling=null),aa(t,!1,o,r,s,t.lastEffect);break;case"backwards":for(r=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Xi(e)===null){t.child=o;break}e=o.sibling,o.sibling=r,r=o,o=e}aa(t,!0,r,null,s,t.lastEffect);break;case"together":aa(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function Yt(e,t,r){e!==null&&(t.dependencies=e.dependencies);var n=t.expirationTime;if(n!==0&&Is(n),t.childExpirationTime<r)return null;if(e!==null&&t.child!==e.child)throw Error(A(153));if(t.child!==null){for(e=t.child,r=en(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=en(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}var Pp,ll,Op,Dp;Pp=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};ll=function(){};Op=function(e,t,r,n,o){var s=e.memoizedProps;if(s!==n){var i=t.stateNode;switch(Br(Pt.current),e=null,r){case"input":s=Ia(i,s),n=Ia(i,n),e=[];break;case"option":s=La(i,s),n=La(i,n),e=[];break;case"select":s=Fe({},s,{value:void 0}),n=Fe({},n,{value:void 0}),e=[];break;case"textarea":s=Ua(i,s),n=Ua(i,n),e=[];break;default:typeof s.onClick!="function"&&typeof n.onClick=="function"&&(i.onclick=Ni)}ja(r,n);var a,l;r=null;for(a in s)if(!n.hasOwnProperty(a)&&s.hasOwnProperty(a)&&s[a]!=null)if(a==="style")for(l in i=s[a],i)i.hasOwnProperty(l)&&(r||(r={}),r[l]="");else a!=="dangerouslySetInnerHTML"&&a!=="children"&&a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(An.hasOwnProperty(a)?e||(e=[]):(e=e||[]).push(a,null));for(a in n){var u=n[a];if(i=s!=null?s[a]:void 0,n.hasOwnProperty(a)&&u!==i&&(u!=null||i!=null))if(a==="style")if(i){for(l in i)!i.hasOwnProperty(l)||u&&u.hasOwnProperty(l)||(r||(r={}),r[l]="");for(l in u)u.hasOwnProperty(l)&&i[l]!==u[l]&&(r||(r={}),r[l]=u[l])}else r||(e||(e=[]),e.push(a,r)),r=u;else a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,i=i?i.__html:void 0,u!=null&&i!==u&&(e=e||[]).push(a,u)):a==="children"?i===u||typeof u!="string"&&typeof u!="number"||(e=e||[]).push(a,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&(An.hasOwnProperty(a)?(u!=null&&Vt(o,a),e||i===u||(e=[])):(e=e||[]).push(a,u))}r&&(e=e||[]).push("style",r),o=e,(t.updateQueue=o)&&(t.effectTag|=4)}};Dp=function(e,t,r,n){r!==n&&(t.effectTag|=4)};function ci(e,t){switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function Ym(e,t,r){var n=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ke(t.type)&&Vi(),null;case 3:return Rn(),de(We),de(Ue),r=t.stateNode,r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),e!==null&&e.child!==null||!ui(t)||(t.effectTag|=4),ll(t),null;case 5:vu(t),r=Br(Ro.current);var o=t.type;if(e!==null&&t.stateNode!=null)Op(e,t,o,n,r),e.ref!==t.ref&&(t.effectTag|=128);else{if(!n){if(t.stateNode===null)throw Error(A(166));return null}if(e=Br(Pt.current),ui(t)){n=t.stateNode,o=t.type;var s=t.memoizedProps;switch(n[sr]=t,n[Fi]=s,o){case"iframe":case"object":case"embed":me("load",n);break;case"video":case"audio":for(e=0;e<uo.length;e++)me(uo[e],n);break;case"source":me("error",n);break;case"img":case"image":case"link":me("error",n),me("load",n);break;case"form":me("reset",n),me("submit",n);break;case"details":me("toggle",n);break;case"input":tc(n,s),me("invalid",n),Vt(r,"onChange");break;case"select":n._wrapperState={wasMultiple:!!s.multiple},me("invalid",n),Vt(r,"onChange");break;case"textarea":nc(n,s),me("invalid",n),Vt(r,"onChange")}ja(o,s),e=null;for(var i in s)if(s.hasOwnProperty(i)){var a=s[i];i==="children"?typeof a=="string"?n.textContent!==a&&(e=["children",a]):typeof a=="number"&&n.textContent!==""+a&&(e=["children",""+a]):An.hasOwnProperty(i)&&a!=null&&Vt(r,i)}switch(o){case"input":ri(n),rc(n,s,!0);break;case"textarea":ri(n),oc(n);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(n.onclick=Ni)}r=e,t.updateQueue=r,r!==null&&(t.effectTag|=4)}else{switch(i=r.nodeType===9?r:r.ownerDocument,e===cc&&(e=Eh(o)),e===cc?o==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=i.createElement(o,{is:n.is}):(e=i.createElement(o),o==="select"&&(i=e,n.multiple?i.multiple=!0:n.size&&(i.size=n.size))):e=i.createElementNS(e,o),e[sr]=t,e[Fi]=n,Pp(e,t,!1,!1),t.stateNode=e,i=Wa(o,n),o){case"iframe":case"object":case"embed":me("load",e),a=n;break;case"video":case"audio":for(a=0;a<uo.length;a++)me(uo[a],e);a=n;break;case"source":me("error",e),a=n;break;case"img":case"image":case"link":me("error",e),me("load",e),a=n;break;case"form":me("reset",e),me("submit",e),a=n;break;case"details":me("toggle",e),a=n;break;case"input":tc(e,n),a=Ia(e,n),me("invalid",e),Vt(r,"onChange");break;case"option":a=La(e,n);break;case"select":e._wrapperState={wasMultiple:!!n.multiple},a=Fe({},n,{value:void 0}),me("invalid",e),Vt(r,"onChange");break;case"textarea":nc(e,n),a=Ua(e,n),me("invalid",e),Vt(r,"onChange");break;default:a=n}ja(o,a);var l=a;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Wh(e,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Th(e,u)):s==="children"?typeof u=="string"?(o!=="textarea"||u!=="")&&$o(e,u):typeof u=="number"&&$o(e,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(An.hasOwnProperty(s)?u!=null&&Vt(r,s):u!=null&&Xl(e,s,u,i))}switch(o){case"input":ri(e),rc(e,n,!1);break;case"textarea":ri(e),oc(e);break;case"option":n.value!=null&&e.setAttribute("value",""+br(n.value));break;case"select":e.multiple=!!n.multiple,r=n.value,r!=null?kn(e,!!n.multiple,r,!1):n.defaultValue!=null&&kn(e,!!n.multiple,n.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Ni)}qh(o,n)&&(t.effectTag|=4)}t.ref!==null&&(t.effectTag|=128)}return null;case 6:if(e&&t.stateNode!=null)Dp(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(A(166));r=Br(Ro.current),Br(Pt.current),ui(t)?(r=t.stateNode,n=t.memoizedProps,r[sr]=t,r.nodeValue!==n&&(t.effectTag|=4)):(r=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),r[sr]=t,t.stateNode=r)}return null;case 13:return de(ge),n=t.memoizedState,(t.effectTag&64)!==0?(t.expirationTime=r,t):(r=n!==null,n=!1,e===null?t.memoizedProps.fallback!==void 0&&ui(t):(o=e.memoizedState,n=o!==null,r||o===null||(o=e.child.sibling,o!==null&&(s=t.firstEffect,s!==null?(t.firstEffect=o,o.nextEffect=s):(t.firstEffect=t.lastEffect=o,o.nextEffect=null),o.effectTag=8))),r&&!n&&(t.mode&2)!==0&&(e===null&&t.memoizedProps.unstable_avoidThisFallback!==!0||(ge.current&1)!==0?Ce===Yr&&(Ce=es):((Ce===Yr||Ce===es)&&(Ce=Ps),Lo!==0&&rt!==null&&(jr(rt,Xe),Zp(rt,Lo)))),(r||n)&&(t.effectTag|=4),null);case 4:return Rn(),ll(t),null;case 10:return pu(t),null;case 17:return Ke(t.type)&&Vi(),null;case 19:if(de(ge),n=t.memoizedState,n===null)return null;if(o=(t.effectTag&64)!==0,s=n.rendering,s===null){if(o)ci(n,!1);else if(Ce!==Yr||e!==null&&(e.effectTag&64)!==0)for(s=t.child;s!==null;){if(e=Xi(s),e!==null){for(t.effectTag|=64,ci(n,!1),o=e.updateQueue,o!==null&&(t.updateQueue=o,t.effectTag|=4),n.lastEffect===null&&(t.firstEffect=null),t.lastEffect=n.lastEffect,n=t.child;n!==null;)o=n,s=r,o.effectTag&=2,o.nextEffect=null,o.firstEffect=null,o.lastEffect=null,e=o.alternate,e===null?(o.childExpirationTime=0,o.expirationTime=s,o.child=null,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null):(o.childExpirationTime=e.childExpirationTime,o.expirationTime=e.expirationTime,o.child=e.child,o.memoizedProps=e.memoizedProps,o.memoizedState=e.memoizedState,o.updateQueue=e.updateQueue,s=e.dependencies,o.dependencies=s===null?null:{expirationTime:s.expirationTime,firstContext:s.firstContext,responders:s.responders}),n=n.sibling;return be(ge,ge.current&1|2),t.child}s=s.sibling}}else{if(!o)if(e=Xi(s),e!==null){if(t.effectTag|=64,o=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.effectTag|=4),ci(n,!0),n.tail===null&&n.tailMode==="hidden"&&!s.alternate)return t=t.lastEffect=n.lastEffect,t!==null&&(t.nextEffect=null),null}else 2*ct()-n.renderingStartTime>n.tailExpiration&&1<r&&(t.effectTag|=64,o=!0,ci(n,!1),t.expirationTime=t.childExpirationTime=r-1);n.isBackwards?(s.sibling=t.child,t.child=s):(r=n.last,r!==null?r.sibling=s:t.child=s,n.last=s)}return n.tail!==null?(n.tailExpiration===0&&(n.tailExpiration=ct()+500),r=n.tail,n.rendering=r,n.tail=r.sibling,n.lastEffect=t.lastEffect,n.renderingStartTime=ct(),r.sibling=null,t=ge.current,be(ge,o?t&1|2:t&1),r):null}throw Error(A(156,t.tag))}function qm(e){switch(e.tag){case 1:Ke(e.type)&&Vi();var t=e.effectTag;return t&4096?(e.effectTag=t&-4097|64,e):null;case 3:if(Rn(),de(We),de(Ue),t=e.effectTag,(t&64)!==0)throw Error(A(285));return e.effectTag=t&-4097|64,e;case 5:return vu(e),null;case 13:return de(ge),t=e.effectTag,t&4096?(e.effectTag=t&-4097|64,e):null;case 19:return de(ge),null;case 4:return Rn(),null;case 10:return pu(e),null;default:return null}}function Su(e,t){return{value:e,source:t,stack:Ql(t)}}var Qm=typeof WeakSet=="function"?WeakSet:Set;function ul(e,t){var r=t.source,n=t.stack;n===null&&r!==null&&(n=Ql(r)),r!==null&&qt(r.type),t=t.value,e!==null&&e.tag===1&&qt(e.type);try{console.error(t)}catch(o){setTimeout(function(){throw o})}}function Gm(e,t){try{t.props=e.memoizedProps,t.state=e.memoizedState,t.componentWillUnmount()}catch(r){Qr(e,r)}}function Wc(e){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){Qr(e,r)}else t.current=null}function Jm(e,t){switch(t.tag){case 0:case 11:case 15:case 22:return;case 1:if(t.effectTag&256&&e!==null){var r=e.memoizedProps,n=e.memoizedState;e=t.stateNode,t=e.getSnapshotBeforeUpdate(t.elementType===t.type?r:vt(t.type,r),n),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:case 5:case 6:case 4:case 17:return}throw Error(A(163))}function Ip(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.destroy;r.destroy=void 0,n!==void 0&&n()}r=r.next}while(r!==t)}}function Rp(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function Zm(e,t,r){switch(r.tag){case 0:case 11:case 15:case 22:Rp(3,r);return;case 1:if(e=r.stateNode,r.effectTag&4)if(t===null)e.componentDidMount();else{var n=r.elementType===r.type?t.memoizedProps:vt(r.type,t.memoizedProps);e.componentDidUpdate(n,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate)}t=r.updateQueue,t!==null&&Ac(r,t,e);return;case 3:if(t=r.updateQueue,t!==null){if(e=null,r.child!==null)switch(r.child.tag){case 5:e=r.child.stateNode;break;case 1:e=r.child.stateNode}Ac(r,t,e)}return;case 5:e=r.stateNode,t===null&&r.effectTag&4&&qh(r.type,r.memoizedProps)&&e.focus();return;case 6:return;case 4:return;case 12:return;case 13:r.memoizedState===null&&(r=r.alternate,r!==null&&(r=r.memoizedState,r!==null&&(r=r.dehydrated,r!==null&&Bh(r))));return;case 19:case 17:case 20:case 21:return}throw Error(A(163))}function Kc(e,t,r){switch(typeof vl=="function"&&vl(t),t.tag){case 0:case 11:case 14:case 15:case 22:if(e=t.updateQueue,e!==null&&(e=e.lastEffect,e!==null)){var n=e.next;xr(97<r?97:r,function(){var o=n;do{var s=o.destroy;if(s!==void 0){var i=t;try{s()}catch(a){Qr(i,a)}}o=o.next}while(o!==n)})}break;case 1:Wc(t),r=t.stateNode,typeof r.componentWillUnmount=="function"&&Gm(t,r);break;case 5:Wc(t);break;case 4:Lp(e,t,r)}}function Mp(e){var t=e.alternate;e.return=null,e.child=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.alternate=null,e.firstEffect=null,e.lastEffect=null,e.pendingProps=null,e.memoizedProps=null,e.stateNode=null,t!==null&&Mp(t)}function Xc(e){return e.tag===5||e.tag===3||e.tag===4}function Yc(e){e:{for(var t=e.return;t!==null;){if(Xc(t)){var r=t;break e}t=t.return}throw Error(A(160))}switch(t=r.stateNode,r.tag){case 5:var n=!1;break;case 3:t=t.containerInfo,n=!0;break;case 4:t=t.containerInfo,n=!0;break;default:throw Error(A(161))}r.effectTag&16&&($o(t,""),r.effectTag&=-17);e:t:for(r=e;;){for(;r.sibling===null;){if(r.return===null||Xc(r.return)){r=null;break e}r=r.return}for(r.sibling.return=r.return,r=r.sibling;r.tag!==5&&r.tag!==6&&r.tag!==18;){if(r.effectTag&2||r.child===null||r.tag===4)continue t;r.child.return=r,r=r.child}if(!(r.effectTag&2)){r=r.stateNode;break e}}n?cl(e,r,t):dl(e,r,t)}function cl(e,t,r){var n=e.tag,o=n===5||n===6;if(o)e=o?e.stateNode:e.stateNode.instance,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Ni));else if(n!==4&&(e=e.child,e!==null))for(cl(e,t,r),e=e.sibling;e!==null;)cl(e,t,r),e=e.sibling}function dl(e,t,r){var n=e.tag,o=n===5||n===6;if(o)e=o?e.stateNode:e.stateNode.instance,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(dl(e,t,r),e=e.sibling;e!==null;)dl(e,t,r),e=e.sibling}function Lp(e,t,r){for(var n=t,o=!1,s,i;;){if(!o){o=n.return;e:for(;;){if(o===null)throw Error(A(160));switch(s=o.stateNode,o.tag){case 5:i=!1;break e;case 3:s=s.containerInfo,i=!0;break e;case 4:s=s.containerInfo,i=!0;break e}o=o.return}o=!0}if(n.tag===5||n.tag===6){e:for(var a=e,l=n,u=r,d=l;;)if(Kc(a,d,u),d.child!==null&&d.tag!==4)d.child.return=d,d=d.child;else{if(d===l)break e;for(;d.sibling===null;){if(d.return===null||d.return===l)break e;d=d.return}d.sibling.return=d.return,d=d.sibling}i?(a=s,l=n.stateNode,a.nodeType===8?a.parentNode.removeChild(l):a.removeChild(l)):s.removeChild(n.stateNode)}else if(n.tag===4){if(n.child!==null){s=n.stateNode.containerInfo,i=!0,n.child.return=n,n=n.child;continue}}else if(Kc(e,n,r),n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return,n.tag===4&&(o=!1)}n.sibling.return=n.return,n=n.sibling}}function la(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:Ip(3,t);return;case 1:return;case 5:var r=t.stateNode;if(r!=null){var n=t.memoizedProps,o=e!==null?e.memoizedProps:n;e=t.type;var s=t.updateQueue;if(t.updateQueue=null,s!==null){for(r[Fi]=n,e==="input"&&n.type==="radio"&&n.name!=null&&kh(r,n),Wa(e,o),t=Wa(e,n),o=0;o<s.length;o+=2){var i=s[o],a=s[o+1];i==="style"?Wh(r,a):i==="dangerouslySetInnerHTML"?Th(r,a):i==="children"?$o(r,a):Xl(r,i,a,t)}switch(e){case"input":Ra(r,n);break;case"textarea":Sh(r,n);break;case"select":t=r._wrapperState.wasMultiple,r._wrapperState.wasMultiple=!!n.multiple,e=n.value,e!=null?kn(r,!!n.multiple,e,!1):t!==!!n.multiple&&(n.defaultValue!=null?kn(r,!!n.multiple,n.defaultValue,!0):kn(r,!!n.multiple,n.multiple?[]:"",!1))}}}return;case 6:if(t.stateNode===null)throw Error(A(162));t.stateNode.nodeValue=t.memoizedProps;return;case 3:t=t.stateNode,t.hydrate&&(t.hydrate=!1,Bh(t.containerInfo));return;case 12:return;case 13:if(r=t,t.memoizedState===null?n=!1:(n=!0,r=t.child,Tu=ct()),r!==null)e:for(e=r;;){if(e.tag===5)s=e.stateNode,n?(s=s.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(s=e.stateNode,o=e.memoizedProps.style,o=o!=null&&o.hasOwnProperty("display")?o.display:null,s.style.display=jh("display",o));else if(e.tag===6)e.stateNode.nodeValue=n?"":e.memoizedProps;else if(e.tag===13&&e.memoizedState!==null&&e.memoizedState.dehydrated===null){s=e.child.sibling,s.return=e,e=s;continue}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===r)break;for(;e.sibling===null;){if(e.return===null||e.return===r)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}qc(t);return;case 19:qc(t);return;case 17:return}throw Error(A(163))}function qc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new Qm),t.forEach(function(n){var o=ug.bind(null,e,n);r.has(n)||(r.add(n),n.then(o,o))})}}var eg=typeof WeakMap=="function"?WeakMap:Map;function Up(e,t,r){r=fr(r,null),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){ns||(ns=!0,hl=n),ul(e,t)},r}function Np(e,t,r){r=fr(r,null),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var o=t.value;r.payload=function(){return ul(e,t),n(o)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(r.callback=function(){typeof n!="function"&&(gr===null?gr=new Set([this]):gr.add(this),ul(e,t));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),r}var tg=Math.ceil,Ji=yt.ReactCurrentDispatcher,Fp=yt.ReactCurrentOwner,$e=0,Cu=8,bt=16,Dt=32,Yr=0,Zi=1,Bp=2,es=3,Ps=4,Eu=5,q=$e,rt=null,G=null,Xe=0,Ce=Yr,Os=null,Kt=1073741823,Mo=1073741823,ts=null,Lo=0,rs=!1,Tu=0,Vp=500,L=null,ns=!1,hl=null,gr=null,os=!1,xo=null,ho=90,Vr=null,_o=0,pl=null,Ei=0;function Ot(){return(q&(bt|Dt))!==$e?1073741821-(ct()/10|0):Ei!==0?Ei:Ei=1073741821-(ct()/10|0)}function qr(e,t,r){if(t=t.mode,(t&2)===0)return 1073741823;var n=zs();if((t&4)===0)return n===99?1073741823:1073741822;if((q&bt)!==$e)return Xe;if(r!==null)e=Si(e,r.timeoutMs|0||5e3,250);else switch(n){case 99:e=1073741823;break;case 98:e=Si(e,150,100);break;case 97:case 96:e=Si(e,5e3,250);break;case 95:e=2;break;default:throw Error(A(326))}return rt!==null&&e===Xe&&--e,e}function vr(e,t){if(50<_o)throw _o=0,pl=null,Error(A(185));if(e=Ds(e,t),e!==null){var r=zs();t===1073741823?(q&Cu)!==$e&&(q&(bt|Dt))===$e?fl(e):(nt(e),q===$e&&Nt()):nt(e),(q&4)===$e||r!==98&&r!==99||(Vr===null?Vr=new Map([[e,t]]):(r=Vr.get(e),(r===void 0||r>t)&&Vr.set(e,t)))}}function Ds(e,t){e.expirationTime<t&&(e.expirationTime=t);var r=e.alternate;r!==null&&r.expirationTime<t&&(r.expirationTime=t);var n=e.return,o=null;if(n===null&&e.tag===3)o=e.stateNode;else for(;n!==null;){if(r=n.alternate,n.childExpirationTime<t&&(n.childExpirationTime=t),r!==null&&r.childExpirationTime<t&&(r.childExpirationTime=t),n.return===null&&n.tag===3){o=n.stateNode;break}n=n.return}return o!==null&&(rt===o&&(Is(t),Ce===Ps&&jr(o,Xe)),Zp(o,t)),o}function Ti(e){var t=e.lastExpiredTime;if(t!==0||(t=e.firstPendingTime,!Jp(e,t)))return t;var r=e.lastPingedTime;return e=e.nextKnownPendingLevel,e=r>e?r:e,2>=e&&t!==e?0:e}function nt(e){if(e.lastExpiredTime!==0)e.callbackExpirationTime=1073741823,e.callbackPriority=99,e.callbackNode=$c(fl.bind(null,e));else{var t=Ti(e),r=e.callbackNode;if(t===0)r!==null&&(e.callbackNode=null,e.callbackExpirationTime=0,e.callbackPriority=90);else{var n=Ot();if(t===1073741823?n=99:t===1||t===2?n=95:(n=10*(1073741821-t)-10*(1073741821-n),n=0>=n?99:250>=n?98:5250>=n?97:95),r!==null){var o=e.callbackPriority;if(e.callbackExpirationTime===t&&o>=n)return;r!==fp&&up(r)}e.callbackExpirationTime=t,e.callbackPriority=n,t=t===1073741823?$c(fl.bind(null,e)):gp(n,Hp.bind(null,e),{timeout:10*(1073741821-t)-ct()}),e.callbackNode=t}}}function Hp(e,t){if(Ei=0,t)return t=Ot(),yl(e,t),nt(e),null;var r=Ti(e);if(r!==0){if(t=e.callbackNode,(q&(bt|Dt))!==$e)throw Error(A(327));if(Yn(),e===rt&&r===Xe||Hr(e,r),G!==null){var n=q;q|=bt;var o=Xp();do try{og();break}catch(a){Kp(e,a)}while(1);if(hu(),q=n,Ji.current=o,Ce===Zi)throw t=Os,Hr(e,r),jr(e,r),nt(e),t;if(G===null)switch(o=e.finishedWork=e.current.alternate,e.finishedExpirationTime=r,n=Ce,rt=null,n){case Yr:case Zi:throw Error(A(345));case Bp:yl(e,2<r?2:r);break;case es:if(jr(e,r),n=e.lastSuspendedTime,r===n&&(e.nextKnownPendingLevel=ml(o)),Kt===1073741823&&(o=Tu+Vp-ct(),10<o)){if(rs){var s=e.lastPingedTime;if(s===0||s>=r){e.lastPingedTime=r,Hr(e,r);break}}if(s=Ti(e),s!==0&&s!==r)break;if(n!==0&&n!==r){e.lastPingedTime=n;break}e.timeoutHandle=ra(Mr.bind(null,e),o);break}Mr(e);break;case Ps:if(jr(e,r),n=e.lastSuspendedTime,r===n&&(e.nextKnownPendingLevel=ml(o)),rs&&(o=e.lastPingedTime,o===0||o>=r)){e.lastPingedTime=r,Hr(e,r);break}if(o=Ti(e),o!==0&&o!==r)break;if(n!==0&&n!==r){e.lastPingedTime=n;break}if(Mo!==1073741823?n=10*(1073741821-Mo)-ct():Kt===1073741823?n=0:(n=10*(1073741821-Kt)-5e3,o=ct(),r=10*(1073741821-r)-o,n=o-n,0>n&&(n=0),n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*tg(n/1960))-n,r<n&&(n=r)),10<n){e.timeoutHandle=ra(Mr.bind(null,e),n);break}Mr(e);break;case Eu:if(Kt!==1073741823&&ts!==null){s=Kt;var i=ts;if(n=i.busyMinDurationMs|0,0>=n?n=0:(o=i.busyDelayMs|0,s=ct()-(10*(1073741821-s)-(i.timeoutMs|0||5e3)),n=s<=o?0:o+n-s),10<n){jr(e,r),e.timeoutHandle=ra(Mr.bind(null,e),n);break}}Mr(e);break;default:throw Error(A(329))}if(nt(e),e.callbackNode===t)return Hp.bind(null,e)}}return null}function fl(e){var t=e.lastExpiredTime;if(t=t!==0?t:1073741823,(q&(bt|Dt))!==$e)throw Error(A(327));if(Yn(),e===rt&&t===Xe||Hr(e,t),G!==null){var r=q;q|=bt;var n=Xp();do try{ng();break}catch(o){Kp(e,o)}while(1);if(hu(),q=r,Ji.current=n,Ce===Zi)throw r=Os,Hr(e,t),jr(e,t),nt(e),r;if(G!==null)throw Error(A(261));e.finishedWork=e.current.alternate,e.finishedExpirationTime=t,rt=null,Mr(e),nt(e)}return null}function rg(){if(Vr!==null){var e=Vr;Vr=null,e.forEach(function(t,r){yl(r,t),nt(r)}),Nt()}}function jp(e,t){var r=q;q|=1;try{return e(t)}finally{q=r,q===$e&&Nt()}}function Wp(e,t){var r=q;q&=-2,q|=Cu;try{return e(t)}finally{q=r,q===$e&&Nt()}}function Hr(e,t){e.finishedWork=null,e.finishedExpirationTime=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,tm(r)),G!==null)for(r=G.return;r!==null;){var n=r;switch(n.tag){case 1:n=n.type.childContextTypes,n!=null&&Vi();break;case 3:Rn(),de(We),de(Ue);break;case 5:vu(n);break;case 4:Rn();break;case 13:de(ge);break;case 19:de(ge);break;case 10:pu(n)}r=r.return}rt=e,G=en(e.current,null),Xe=t,Ce=Yr,Os=null,Mo=Kt=1073741823,ts=null,Lo=0,rs=!1}function Kp(e,t){do{try{if(hu(),Ci.current=Gi,Yi)for(var r=Se.memoizedState;r!==null;){var n=r.queue;n!==null&&(n.pending=null),r=r.next}if(lr=0,Me=Re=Se=null,Yi=!1,G===null||G.return===null)return Ce=Zi,Os=t,G=null;e:{var o=e,s=G.return,i=G,a=t;if(t=Xe,i.effectTag|=2048,i.firstEffect=i.lastEffect=null,a!==null&&typeof a=="object"&&typeof a.then=="function"){var l=a;if((i.mode&2)===0){var u=i.alternate;u?(i.updateQueue=u.updateQueue,i.memoizedState=u.memoizedState,i.expirationTime=u.expirationTime):(i.updateQueue=null,i.memoizedState=null)}var d=(ge.current&1)!==0,c=s;do{var p;if(p=c.tag===13){var b=c.memoizedState;if(b!==null)p=b.dehydrated!==null;else{var w=c.memoizedProps;p=w.fallback===void 0?!1:w.unstable_avoidThisFallback!==!0?!0:!d}}if(p){var g=c.updateQueue;if(g===null){var f=new Set;f.add(l),c.updateQueue=f}else g.add(l);if((c.mode&2)===0){if(c.effectTag|=64,i.effectTag&=-2981,i.tag===1)if(i.alternate===null)i.tag=17;else{var m=fr(1073741823,null);m.tag=2,mr(i,m)}i.expirationTime=1073741823;break e}a=void 0,i=t;var y=o.pingCache;if(y===null?(y=o.pingCache=new eg,a=new Set,y.set(l,a)):(a=y.get(l),a===void 0&&(a=new Set,y.set(l,a))),!a.has(i)){a.add(i);var _=lg.bind(null,o,l,i);l.then(_,_)}c.effectTag|=4096,c.expirationTime=t;break e}c=c.return}while(c!==null);a=Error((qt(i.type)||"A React component")+` suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`+Ql(i))}Ce!==Eu&&(Ce=Bp),a=Su(a,i),c=s;do{switch(c.tag){case 3:l=a,c.effectTag|=4096,c.expirationTime=t;var x=Up(c,l,t);zc(c,x);break e;case 1:l=a;var k=c.type,C=c.stateNode;if((c.effectTag&64)===0&&(typeof k.getDerivedStateFromError=="function"||C!==null&&typeof C.componentDidCatch=="function"&&(gr===null||!gr.has(C)))){c.effectTag|=4096,c.expirationTime=t;var E=Np(c,l,t);zc(c,E);break e}}c=c.return}while(c!==null)}G=Qp(G)}catch($){t=$;continue}break}while(1)}function Xp(){var e=Ji.current;return Ji.current=Gi,e===null?Gi:e}function Yp(e,t){e<Kt&&2<e&&(Kt=e),t!==null&&e<Mo&&2<e&&(Mo=e,ts=t)}function Is(e){e>Lo&&(Lo=e)}function ng(){for(;G!==null;)G=qp(G)}function og(){for(;G!==null&&!Vm();)G=qp(G)}function qp(e){var t=Gp(e.alternate,e,Xe);return e.memoizedProps=e.pendingProps,t===null&&(t=Qp(e)),Fp.current=null,t}function Qp(e){G=e;do{var t=G.alternate;if(e=G.return,(G.effectTag&2048)===0){if(t=Ym(t,G,Xe),Xe===1||G.childExpirationTime!==1){for(var r=0,n=G.child;n!==null;){var o=n.expirationTime,s=n.childExpirationTime;o>r&&(r=o),s>r&&(r=s),n=n.sibling}G.childExpirationTime=r}if(t!==null)return t;e!==null&&(e.effectTag&2048)===0&&(e.firstEffect===null&&(e.firstEffect=G.firstEffect),G.lastEffect!==null&&(e.lastEffect!==null&&(e.lastEffect.nextEffect=G.firstEffect),e.lastEffect=G.lastEffect),1<G.effectTag&&(e.lastEffect!==null?e.lastEffect.nextEffect=G:e.firstEffect=G,e.lastEffect=G))}else{if(t=qm(G),t!==null)return t.effectTag&=2047,t;e!==null&&(e.firstEffect=e.lastEffect=null,e.effectTag|=2048)}if(t=G.sibling,t!==null)return t;G=e}while(G!==null);return Ce===Yr&&(Ce=Eu),null}function ml(e){var t=e.expirationTime;return e=e.childExpirationTime,t>e?t:e}function Mr(e){var t=zs();return xr(99,ig.bind(null,e,t)),null}function ig(e,t){do Yn();while(xo!==null);if((q&(bt|Dt))!==$e)throw Error(A(327));var r=e.finishedWork,n=e.finishedExpirationTime;if(r===null)return null;if(e.finishedWork=null,e.finishedExpirationTime=0,r===e.current)throw Error(A(177));e.callbackNode=null,e.callbackExpirationTime=0,e.callbackPriority=90,e.nextKnownPendingLevel=0;var o=ml(r);if(e.firstPendingTime=o,n<=e.lastSuspendedTime?e.firstSuspendedTime=e.lastSuspendedTime=e.nextKnownPendingLevel=0:n<=e.firstSuspendedTime&&(e.firstSuspendedTime=n-1),n<=e.lastPingedTime&&(e.lastPingedTime=0),n<=e.lastExpiredTime&&(e.lastExpiredTime=0),e===rt&&(G=rt=null,Xe=0),1<r.effectTag?r.lastEffect!==null?(r.lastEffect.nextEffect=r,o=r.firstEffect):o=r:o=r.firstEffect,o!==null){var s=q;q|=Dt,Fp.current=null,ea=yi;var i=pc();if(Xa(i)){if("selectionStart"in i)var a={start:i.selectionStart,end:i.selectionEnd};else e:{a=(a=i.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var u=l.anchorOffset,d=l.focusNode;l=l.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var c=0,p=-1,b=-1,w=0,g=0,f=i,m=null;t:for(;;){for(var y;f!==a||u!==0&&f.nodeType!==3||(p=c+u),f!==d||l!==0&&f.nodeType!==3||(b=c+l),f.nodeType===3&&(c+=f.nodeValue.length),(y=f.firstChild)!==null;)m=f,f=y;for(;;){if(f===i)break t;if(m===a&&++w===u&&(p=c),m===d&&++g===l&&(b=c),(y=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=y}a=p===-1||b===-1?null:{start:p,end:b}}else a=null}a=a||{start:0,end:0}}else a=null;ta={activeElementDetached:null,focusedElem:i,selectionRange:a},yi=!1,L=o;do try{sg()}catch(T){if(L===null)throw Error(A(330));Qr(L,T),L=L.nextEffect}while(L!==null);L=o;do try{for(i=e,a=t;L!==null;){var _=L.effectTag;if(_&16&&$o(L.stateNode,""),_&128){var x=L.alternate;if(x!==null){var k=x.ref;k!==null&&(typeof k=="function"?k(null):k.current=null)}}switch(_&1038){case 2:Yc(L),L.effectTag&=-3;break;case 6:Yc(L),L.effectTag&=-3,la(L.alternate,L);break;case 1024:L.effectTag&=-1025;break;case 1028:L.effectTag&=-1025,la(L.alternate,L);break;case 4:la(L.alternate,L);break;case 8:u=L,Lp(i,u,a),Mp(u)}L=L.nextEffect}}catch(T){if(L===null)throw Error(A(330));Qr(L,T),L=L.nextEffect}while(L!==null);if(k=ta,x=pc(),_=k.focusedElem,a=k.selectionRange,x!==_&&_&&_.ownerDocument&&Kh(_.ownerDocument.documentElement,_)){for(a!==null&&Xa(_)&&(x=a.start,k=a.end,k===void 0&&(k=x),"selectionStart"in _?(_.selectionStart=x,_.selectionEnd=Math.min(k,_.value.length)):(k=(x=_.ownerDocument||document)&&x.defaultView||window,k.getSelection&&(k=k.getSelection(),u=_.textContent.length,i=Math.min(a.start,u),a=a.end===void 0?i:Math.min(a.end,u),!k.extend&&i>a&&(u=a,a=i,i=u),u=hc(_,i),d=hc(_,a),u&&d&&(k.rangeCount!==1||k.anchorNode!==u.node||k.anchorOffset!==u.offset||k.focusNode!==d.node||k.focusOffset!==d.offset)&&(x=x.createRange(),x.setStart(u.node,u.offset),k.removeAllRanges(),i>a?(k.addRange(x),k.extend(d.node,d.offset)):(x.setEnd(d.node,d.offset),k.addRange(x)))))),x=[],k=_;k=k.parentNode;)k.nodeType===1&&x.push({element:k,left:k.scrollLeft,top:k.scrollTop});for(typeof _.focus=="function"&&_.focus(),_=0;_<x.length;_++)k=x[_],k.element.scrollLeft=k.left,k.element.scrollTop=k.top}yi=!!ea,ta=ea=null,e.current=r,L=o;do try{for(_=e;L!==null;){var C=L.effectTag;if(C&36&&Zm(_,L.alternate,L),C&128){x=void 0;var E=L.ref;if(E!==null){var $=L.stateNode;switch(L.tag){case 5:x=$;break;default:x=$}typeof E=="function"?E(x):E.current=x}}L=L.nextEffect}}catch(T){if(L===null)throw Error(A(330));Qr(L,T),L=L.nextEffect}while(L!==null);L=null,Hm(),q=s}else e.current=r;if(os)os=!1,xo=e,ho=t;else for(L=o;L!==null;)t=L.nextEffect,L.nextEffect=null,L=t;if(t=e.firstPendingTime,t===0&&(gr=null),t===1073741823?e===pl?_o++:(_o=0,pl=e):_o=0,typeof gl=="function"&&gl(r.stateNode,n),nt(e),ns)throw ns=!1,e=hl,hl=null,e;return(q&Cu)!==$e||Nt(),null}function sg(){for(;L!==null;){var e=L.effectTag;(e&256)!==0&&Jm(L.alternate,L),(e&512)===0||os||(os=!0,gp(97,function(){return Yn(),null})),L=L.nextEffect}}function Yn(){if(ho!==90){var e=97<ho?97:ho;return ho=90,xr(e,ag)}}function ag(){if(xo===null)return!1;var e=xo;if(xo=null,(q&(bt|Dt))!==$e)throw Error(A(331));var t=q;for(q|=Dt,e=e.current.firstEffect;e!==null;){try{var r=e;if((r.effectTag&512)!==0)switch(r.tag){case 0:case 11:case 15:case 22:Ip(5,r),Rp(5,r)}}catch(n){if(e===null)throw Error(A(330));Qr(e,n)}r=e.nextEffect,e.nextEffect=null,e=r}return q=t,Nt(),!0}function Qc(e,t,r){t=Su(r,t),t=Up(e,t,1073741823),mr(e,t),e=Ds(e,1073741823),e!==null&&nt(e)}function Qr(e,t){if(e.tag===3)Qc(e,e,t);else for(var r=e.return;r!==null;){if(r.tag===3){Qc(r,e,t);break}else if(r.tag===1){var n=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(gr===null||!gr.has(n))){e=Su(t,e),e=Np(r,e,1073741823),mr(r,e),r=Ds(r,1073741823),r!==null&&nt(r);break}}r=r.return}}function lg(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),rt===e&&Xe===r?Ce===Ps||Ce===es&&Kt===1073741823&&ct()-Tu<Vp?Hr(e,Xe):rs=!0:Jp(e,r)&&(t=e.lastPingedTime,t!==0&&t<r||(e.lastPingedTime=r,nt(e)))}function ug(e,t){var r=e.stateNode;r!==null&&r.delete(t),t=0,t===0&&(t=Ot(),t=qr(t,e,null)),e=Ds(e,t),e!==null&&nt(e)}var Gp;Gp=function(e,t,r){var n=t.expirationTime;if(e!==null){var o=t.pendingProps;if(e.memoizedProps!==o||We.current)zt=!0;else{if(n<r){switch(zt=!1,t.tag){case 3:Bc(t),ia();break;case 5:if(Dc(t),t.mode&4&&r!==1&&o.hidden)return t.expirationTime=t.childExpirationTime=1,null;break;case 1:Ke(t.type)&&_i(t);break;case 4:rl(t,t.stateNode.containerInfo);break;case 10:n=t.memoizedProps.value,o=t.type._context,be(Hi,o._currentValue),o._currentValue=n;break;case 13:if(t.memoizedState!==null)return n=t.child.childExpirationTime,n!==0&&n>=r?Vc(e,t,r):(be(ge,ge.current&1),t=Yt(e,t,r),t!==null?t.sibling:null);be(ge,ge.current&1);break;case 19:if(n=t.childExpirationTime>=r,(e.effectTag&64)!==0){if(n)return jc(e,t,r);t.effectTag|=64}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null),be(ge,ge.current),!n)return null}return Yt(e,t,r)}zt=!1}}else zt=!1;switch(t.expirationTime=0,t.tag){case 2:if(n=t.type,e!==null&&(e.alternate=null,t.alternate=null,t.effectTag|=2),e=t.pendingProps,o=Dn(t,Ue.current),Cn(t,r),o=wu(null,t,n,e,o,r),t.effectTag|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ke(n)){var s=!0;_i(t)}else s=!1;t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,fu(t);var i=n.getDerivedStateFromProps;typeof i=="function"&&Ki(t,n,i,e),o.updater=As,t.stateNode=o,o._reactInternalFiber=t,tl(t,n,e,r),t=al(null,t,n,!0,s,r)}else t.tag=0,Ze(null,t,o,r),t=t.child;return t;case 16:e:{if(o=t.elementType,e!==null&&(e.alternate=null,t.alternate=null,t.effectTag|=2),e=t.pendingProps,U0(o),o._status!==1)throw o._result;switch(o=o._result,t.type=o,s=t.tag=hg(o),e=vt(o,e),s){case 0:t=sl(null,t,o,e,r);break e;case 1:t=Fc(null,t,o,e,r);break e;case 11:t=Uc(null,t,o,e,r);break e;case 14:t=Nc(null,t,o,vt(o.type,e),n,r);break e}throw Error(A(306,o,""))}return t;case 0:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:vt(n,o),sl(e,t,n,o,r);case 1:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:vt(n,o),Fc(e,t,n,o,r);case 3:if(Bc(t),n=t.updateQueue,e===null||n===null)throw Error(A(282));if(n=t.pendingProps,o=t.memoizedState,o=o!==null?o.element:null,mu(e,t),Do(t,n,null,r),n=t.memoizedState.element,n===o)ia(),t=Yt(e,t,r);else{if((o=t.stateNode.hydrate)&&(ur=Sn(t.stateNode.containerInfo.firstChild),Xt=t,o=Xr=!0),o)for(r=gu(t,null,n,r),t.child=r;r;)r.effectTag=r.effectTag&-3|1024,r=r.sibling;else Ze(e,t,n,r),ia();t=t.child}return t;case 5:return Dc(t),e===null&&il(t),n=t.type,o=t.pendingProps,s=e!==null?e.memoizedProps:null,i=o.children,Ya(n,o)?i=null:s!==null&&Ya(n,s)&&(t.effectTag|=16),Ap(e,t),t.mode&4&&r!==1&&o.hidden?(t.expirationTime=t.childExpirationTime=1,t=null):(Ze(e,t,i,r),t=t.child),t;case 6:return e===null&&il(t),null;case 13:return Vc(e,t,r);case 4:return rl(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=In(t,null,n,r):Ze(e,t,n,r),t.child;case 11:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:vt(n,o),Uc(e,t,n,o,r);case 7:return Ze(e,t,t.pendingProps,r),t.child;case 8:return Ze(e,t,t.pendingProps.children,r),t.child;case 12:return Ze(e,t,t.pendingProps.children,r),t.child;case 10:e:{n=t.type._context,o=t.pendingProps,i=t.memoizedProps,s=o.value;var a=t.type._context;if(be(Hi,a._currentValue),a._currentValue=s,i!==null)if(a=i.value,s=Jr(a,s)?0:(typeof n._calculateChangedBits=="function"?n._calculateChangedBits(a,s):1073741823)|0,s===0){if(i.children===o.children&&!We.current){t=Yt(e,t,r);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var l=a.dependencies;if(l!==null){i=a.child;for(var u=l.firstContext;u!==null;){if(u.context===n&&(u.observedBits&s)!==0){a.tag===1&&(u=fr(r,null),u.tag=2,mr(a,u)),a.expirationTime<r&&(a.expirationTime=r),u=a.alternate,u!==null&&u.expirationTime<r&&(u.expirationTime=r),yp(a.return,r),l.expirationTime<r&&(l.expirationTime=r);break}u=u.next}}else i=a.tag===10&&a.type===t.type?null:a.child;if(i!==null)i.return=a;else for(i=a;i!==null;){if(i===t){i=null;break}if(a=i.sibling,a!==null){a.return=i.return,i=a;break}i=i.return}a=i}Ze(e,t,o.children,r),t=t.child}return t;case 9:return o=t.type,s=t.pendingProps,n=s.children,Cn(t,r),o=ht(o,s.unstable_observedBits),n=n(o),t.effectTag|=1,Ze(e,t,n,r),t.child;case 14:return o=t.type,s=vt(o,t.pendingProps),s=vt(o.type,s),Nc(e,t,o,s,n,r);case 15:return zp(e,t,t.type,t.pendingProps,n,r);case 17:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:vt(n,o),e!==null&&(e.alternate=null,t.alternate=null,t.effectTag|=2),t.tag=1,Ke(n)?(e=!0,_i(t)):e=!1,Cn(t,r),wp(t,n,o),tl(t,n,o,r),al(null,t,n,!0,e,r);case 19:return jc(e,t,r)}throw Error(A(156,t.tag))};var gl=null,vl=null;function cg(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled||!t.supportsFiber)return!0;try{var r=t.inject(e);gl=function(n){try{t.onCommitFiberRoot(r,n,void 0,(n.current.effectTag&64)===64)}catch{}},vl=function(n){try{t.onCommitFiberUnmount(r,n)}catch{}}}catch{}return!0}function dg(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.effectTag=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childExpirationTime=this.expirationTime=0,this.alternate=null}function At(e,t,r,n){return new dg(e,t,r,n)}function $u(e){return e=e.prototype,!(!e||!e.isReactComponent)}function hg(e){if(typeof e=="function")return $u(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Yl)return 11;if(e===ql)return 14}return 2}function en(e,t){var r=e.alternate;return r===null?(r=At(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.effectTag=0,r.nextEffect=null,r.firstEffect=null,r.lastEffect=null),r.childExpirationTime=e.childExpirationTime,r.expirationTime=e.expirationTime,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{expirationTime:t.expirationTime,firstContext:t.firstContext,responders:t.responders},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function $i(e,t,r,n,o,s){var i=2;if(n=e,typeof e=="function")$u(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Ur:return cr(r.children,o,s,t);case L0:i=8,o|=7;break;case gh:i=8,o|=1;break;case mi:return e=At(12,r,t,o|8),e.elementType=mi,e.type=mi,e.expirationTime=s,e;case gi:return e=At(13,r,t,o),e.type=gi,e.elementType=gi,e.expirationTime=s,e;case Da:return e=At(19,r,t,o),e.elementType=Da,e.expirationTime=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case vh:i=10;break e;case yh:i=9;break e;case Yl:i=11;break e;case ql:i=14;break e;case bh:i=16,n=null;break e;case wh:i=22;break e}throw Error(A(130,e==null?e:typeof e,""))}return t=At(i,r,t,o),t.elementType=e,t.type=n,t.expirationTime=s,t}function cr(e,t,r,n){return e=At(7,e,n,t),e.expirationTime=r,e}function ua(e,t,r){return e=At(6,e,null,t),e.expirationTime=r,e}function ca(e,t,r){return t=At(4,e.children!==null?e.children:[],e.key,t),t.expirationTime=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function pg(e,t,r){this.tag=t,this.current=null,this.containerInfo=e,this.pingCache=this.pendingChildren=null,this.finishedExpirationTime=0,this.finishedWork=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=r,this.callbackNode=null,this.callbackPriority=90,this.lastExpiredTime=this.lastPingedTime=this.nextKnownPendingLevel=this.lastSuspendedTime=this.firstSuspendedTime=this.firstPendingTime=0}function Jp(e,t){var r=e.firstSuspendedTime;return e=e.lastSuspendedTime,r!==0&&r>=t&&e<=t}function jr(e,t){var r=e.firstSuspendedTime,n=e.lastSuspendedTime;r<t&&(e.firstSuspendedTime=t),(n>t||r===0)&&(e.lastSuspendedTime=t),t<=e.lastPingedTime&&(e.lastPingedTime=0),t<=e.lastExpiredTime&&(e.lastExpiredTime=0)}function Zp(e,t){t>e.firstPendingTime&&(e.firstPendingTime=t);var r=e.firstSuspendedTime;r!==0&&(t>=r?e.firstSuspendedTime=e.lastSuspendedTime=e.nextKnownPendingLevel=0:t>=e.lastSuspendedTime&&(e.lastSuspendedTime=t+1),t>e.nextKnownPendingLevel&&(e.nextKnownPendingLevel=t))}function yl(e,t){var r=e.lastExpiredTime;(r===0||r>t)&&(e.lastExpiredTime=t)}function is(e,t,r,n){var o=t.current,s=Ot(),i=wo.suspense;s=qr(s,o,i);e:if(r){r=r._reactInternalFiber;t:{if(sn(r)!==r||r.tag!==1)throw Error(A(170));var a=r;do{switch(a.tag){case 3:a=a.stateNode.context;break t;case 1:if(Ke(a.type)){a=a.stateNode.__reactInternalMemoizedMergedChildContext;break t}}a=a.return}while(a!==null);throw Error(A(171))}if(r.tag===1){var l=r.type;if(Ke(l)){r=lp(r,l,a);break e}}r=a}else r=wr;return t.context===null?t.context=r:t.pendingContext=r,t=fr(s,i),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),mr(o,t),vr(o,s),s}function da(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Gc(e,t){e=e.memoizedState,e!==null&&e.dehydrated!==null&&e.retryTime<t&&(e.retryTime=t)}function zu(e,t){Gc(e,t),(e=e.alternate)&&Gc(e,t)}function Au(e,t,r){r=r!=null&&r.hydrate===!0;var n=new pg(e,t,r),o=At(3,null,null,t===2?7:t===1?3:0);n.current=o,o.stateNode=n,fu(o),e[Ho]=n.current,r&&t!==0&&j0(e,e.nodeType===9?e:e.ownerDocument),this._internalRoot=n}Au.prototype.render=function(e){is(e,this._internalRoot,null,null)};Au.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;is(null,e,null,function(){t[Ho]=null})};function qo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function fg(e,t){if(t||(t=e?e.nodeType===9?e.documentElement:e.firstChild:null,t=!(!t||t.nodeType!==1||!t.hasAttribute("data-reactroot"))),!t)for(var r;r=e.lastChild;)e.removeChild(r);return new Au(e,0,t?{hydrate:!0}:void 0)}function Rs(e,t,r,n,o){var s=r._reactRootContainer;if(s){var i=s._internalRoot;if(typeof o=="function"){var a=o;o=function(){var u=da(i);a.call(u)}}is(t,i,e,o)}else{if(s=r._reactRootContainer=fg(r,n),i=s._internalRoot,typeof o=="function"){var l=o;o=function(){var u=da(i);l.call(u)}}Wp(function(){is(t,i,e,o)})}return da(i)}function mg(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:mn,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}Nh=function(e){if(e.tag===13){var t=Si(Ot(),150,100);vr(e,t),zu(e,t)}};eu=function(e){e.tag===13&&(vr(e,3),zu(e,3))};Fh=function(e){if(e.tag===13){var t=Ot();t=qr(t,e,null),vr(e,t),zu(e,t)}};Oa=function(e,t,r){switch(t){case"input":if(Ra(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var o=au(n);if(!o)throw Error(A(90));_h(n),Ra(n,o)}}}break;case"textarea":Sh(e,r);break;case"select":t=r.value,t!=null&&kn(e,!!r.multiple,t,!1)}};Vl=jp;ph=function(e,t,r,n,o){var s=q;q|=4;try{return xr(98,e.bind(null,t,r,n,o))}finally{q=s,q===$e&&Nt()}};Hl=function(){(q&(1|bt|Dt))===$e&&(rg(),Yn())};fh=function(e,t){var r=q;q|=2;try{return e(t)}finally{q=r,q===$e&&Nt()}};function ef(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!qo(t))throw Error(A(200));return mg(e,t,null,r)}var gg={Events:[Wo,Gr,au,ch,Pa,On,function(e){Jl(e,nm)},dh,hh,Es,Cs,Yn,{current:!1}]};(function(e){var t=e.findFiberByHostInstance;return cg(Fe({},e,{overrideHookState:null,overrideProps:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:yt.ReactCurrentDispatcher,findHostInstanceByFiber:function(r){return r=Ih(r),r===null?null:r.stateNode},findFiberByHostInstance:function(r){return t?t(r):null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null}))})({findFiberByHostInstance:jo,bundleType:0,version:"16.14.0",rendererPackageName:"react-dom"});gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=gg;gt.createPortal=ef;gt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternalFiber;if(t===void 0)throw typeof e.render=="function"?Error(A(188)):Error(A(268,Object.keys(e)));return e=Ih(t),e=e===null?null:e.stateNode,e};gt.flushSync=function(e,t){if((q&(bt|Dt))!==$e)throw Error(A(187));var r=q;q|=1;try{return xr(99,e.bind(null,t))}finally{q=r,Nt()}};gt.hydrate=function(e,t,r){if(!qo(t))throw Error(A(200));return Rs(null,e,t,!0,r)};gt.render=function(e,t,r){if(!qo(t))throw Error(A(200));return Rs(null,e,t,!1,r)};gt.unmountComponentAtNode=function(e){if(!qo(e))throw Error(A(40));return e._reactRootContainer?(Wp(function(){Rs(null,null,e,!1,function(){e._reactRootContainer=null,e[Ho]=null})}),!0):!1};gt.unstable_batchedUpdates=jp;gt.unstable_createPortal=function(e,t){return ef(e,t,2<arguments.length&&arguments[2]!==void 0?arguments[2]:null)};gt.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!qo(r))throw Error(A(200));if(e==null||e._reactInternalFiber===void 0)throw Error(A(38));return Rs(e,t,r,!1,n)};gt.version="16.14.0";function tf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(tf)}catch(e){console.error(e)}}tf(),oh.exports=gt;var vg=oh.exports;var rf="";function bl(e){rf=e}function yg(){return rf.replace(/\/$/,"")}var nf=[...document.getElementsByTagName("script")],Jc=nf.find(e=>e.hasAttribute("data-shoelace"));if(Jc)bl(Jc.getAttribute("data-shoelace"));else{const e=nf.find(r=>/shoelace(\.min)?\.js($|\?)/.test(r.src));let t="";e&&(t=e.getAttribute("src")),bl(t.split("/").slice(0,-1).join("/"))}var bg=Object.create,qn=Object.defineProperty,wg=Object.defineProperties,of=Object.getOwnPropertyDescriptor,xg=Object.getOwnPropertyDescriptors,sf=Object.getOwnPropertyNames,ss=Object.getOwnPropertySymbols,_g=Object.getPrototypeOf,Pu=Object.prototype.hasOwnProperty,af=Object.prototype.propertyIsEnumerable,Zc=(e,t,r)=>t in e?qn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,he=(e,t)=>{for(var r in t||(t={}))Pu.call(t,r)&&Zc(e,r,t[r]);if(ss)for(var r of ss(t))af.call(t,r)&&Zc(e,r,t[r]);return e},ot=(e,t)=>wg(e,xg(t)),kg=e=>qn(e,"__esModule",{value:!0}),Ou=(e,t)=>{var r={};for(var n in e)Pu.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&ss)for(var n of ss(e))t.indexOf(n)<0&&af.call(e,n)&&(r[n]=e[n]);return r},Ar=(e,t)=>function(){return t||(0,e[sf(e)[0]])((t={exports:{}}).exports,t),t.exports},Sg=(e,t)=>{for(var r in t)qn(e,r,{get:t[r],enumerable:!0})},Cg=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of sf(t))!Pu.call(e,o)&&(r||o!=="default")&&qn(e,o,{get:()=>t[o],enumerable:!(n=of(t,o))||n.enumerable});return e},Eg=(e,t)=>Cg(kg(qn(e!=null?bg(_g(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),h=(e,t,r,n)=>{for(var o=n>1?void 0:n?of(t,r):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=(n?i(t,r,o):i(o))||o);return n&&o&&qn(t,r,o),o};function as(){return as=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},as.apply(this,arguments)}var Wr;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Wr||(Wr={}));var ed=function(e){return e},td="beforeunload",Tg="popstate";function $g(e){e===void 0&&(e={});var t=e,r=t.window,n=r===void 0?document.defaultView:r,o=n.history;function s(){var E=n.location,$=E.pathname,T=E.search,D=E.hash,F=o.state||{};return[F.idx,ed({pathname:$,search:T,hash:D,state:F.usr||null,key:F.key||"default"})]}var i=null;function a(){if(i)b.call(i),i=null;else{var E=Wr.Pop,$=s(),T=$[0],D=$[1];if(b.length){if(T!=null){var F=d-T;F&&(i={action:E,location:D,retry:function(){k(F*-1)}},k(F))}}else y(E)}}n.addEventListener(Tg,a);var l=Wr.Pop,u=s(),d=u[0],c=u[1],p=nd(),b=nd();d==null&&(d=0,o.replaceState(as({},o.state,{idx:d}),""));function w(E){return typeof E=="string"?E:wl(E)}function g(E,$){return $===void 0&&($=null),ed(as({pathname:c.pathname,hash:"",search:""},typeof E=="string"?an(E):E,{state:$,key:zg()}))}function f(E,$){return[{usr:E.state,key:E.key,idx:$},w(E)]}function m(E,$,T){return!b.length||(b.call({action:E,location:$,retry:T}),!1)}function y(E){l=E;var $=s();d=$[0],c=$[1],p.call({action:l,location:c})}function _(E,$){var T=Wr.Push,D=g(E,$);function F(){_(E,$)}if(m(T,D,F)){var ne=f(D,d+1),xe=ne[0],S=ne[1];try{o.pushState(xe,"",S)}catch{n.location.assign(S)}y(T)}}function x(E,$){var T=Wr.Replace,D=g(E,$);function F(){x(E,$)}if(m(T,D,F)){var ne=f(D,d),xe=ne[0],S=ne[1];o.replaceState(xe,"",S),y(T)}}function k(E){o.go(E)}var C={get action(){return l},get location(){return c},createHref:w,push:_,replace:x,go:k,back:function(){k(-1)},forward:function(){k(1)},listen:function($){return p.push($)},block:function($){var T=b.push($);return b.length===1&&n.addEventListener(td,rd),function(){T(),b.length||n.removeEventListener(td,rd)}}};return C}function rd(e){e.preventDefault(),e.returnValue=""}function nd(){var e=[];return{get length(){return e.length},push:function(r){return e.push(r),function(){e=e.filter(function(n){return n!==r})}},call:function(r){e.forEach(function(n){return n&&n(r)})}}}function zg(){return Math.random().toString(36).substr(2,8)}function wl(e){var t=e.pathname,r=t===void 0?"/":t,n=e.search,o=n===void 0?"":n,s=e.hash,i=s===void 0?"":s;return o&&o!=="?"&&(r+=o.charAt(0)==="?"?o:"?"+o),i&&i!=="#"&&(r+=i.charAt(0)==="#"?i:"#"+i),r}function an(e){var t={};if(e){var r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));var n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}/**
 * React Router v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Du=J.exports.createContext(null),Iu=J.exports.createContext(null),Ms=J.exports.createContext({outlet:null,matches:[]});function It(e,t){if(!e)throw new Error(t)}function Ag(e,t,r){r===void 0&&(r="/");let n=typeof t=="string"?an(t):t,o=cf(n.pathname||"/",r);if(o==null)return null;let s=lf(e);Pg(s);let i=null;for(let a=0;i==null&&a<s.length;++a)i=Fg(s[a],o);return i}function lf(e,t,r,n){return t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n=""),e.forEach((o,s)=>{let i={relativePath:o.path||"",caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};i.relativePath.startsWith("/")&&(i.relativePath.startsWith(n)||It(!1),i.relativePath=i.relativePath.slice(n.length));let a=yr([n,i.relativePath]),l=r.concat(i);o.children&&o.children.length>0&&(o.index===!0&&It(!1),lf(o.children,t,l,a)),!(o.path==null&&!o.index)&&t.push({path:a,score:Ug(a,o.index),routesMeta:l})}),t}function Pg(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Ng(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const Og=/^:\w+$/,Dg=3,Ig=2,Rg=1,Mg=10,Lg=-2,od=e=>e==="*";function Ug(e,t){let r=e.split("/"),n=r.length;return r.some(od)&&(n+=Lg),t&&(n+=Ig),r.filter(o=>!od(o)).reduce((o,s)=>o+(Og.test(s)?Dg:s===""?Rg:Mg),n)}function Ng(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function Fg(e,t){let{routesMeta:r}=e,n={},o="/",s=[];for(let i=0;i<r.length;++i){let a=r[i],l=i===r.length-1,u=o==="/"?t:t.slice(o.length)||"/",d=Bg({path:a.relativePath,caseSensitive:a.caseSensitive,end:l},u);if(!d)return null;Object.assign(n,d.params);let c=a.route;s.push({params:n,pathname:yr([o,d.pathname]),pathnameBase:df(yr([o,d.pathnameBase])),route:c}),d.pathnameBase!=="/"&&(o=yr([o,d.pathnameBase]))}return s}function Bg(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Vg(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let s=o[0],i=s.replace(/(.)\/+$/,"$1"),a=o.slice(1);return{params:n.reduce((u,d,c)=>{if(d==="*"){let p=a[c]||"";i=s.slice(0,s.length-p.length).replace(/(.)\/+$/,"$1")}return u[d]=Hg(a[c]||""),u},{}),pathname:s,pathnameBase:i,pattern:e}}function Vg(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(i,a)=>(n.push(a),"([^\\/]+)"));return e.endsWith("*")?(n.push("*"),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):o+=r?"\\/*$":"(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)",[new RegExp(o,t?void 0:"i"),n]}function Hg(e,t){try{return decodeURIComponent(e)}catch{return e}}function jg(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?an(e):e;return{pathname:r?r.startsWith("/")?r:Wg(r,t):t,search:Xg(n),hash:Yg(o)}}function Wg(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function uf(e,t,r){let n=typeof e=="string"?an(e):e,o=e===""||n.pathname===""?"/":n.pathname,s;if(o==null)s=r;else{let a=t.length-1;if(o.startsWith("..")){let l=o.split("/");for(;l[0]==="..";)l.shift(),a-=1;n.pathname=l.join("/")}s=a>=0?t[a]:"/"}let i=jg(n,s);return o&&o!=="/"&&o.endsWith("/")&&!i.pathname.endsWith("/")&&(i.pathname+="/"),i}function Kg(e){return e===""||e.pathname===""?"/":typeof e=="string"?an(e).pathname:e.pathname}function cf(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=e.charAt(t.length);return r&&r!=="/"?null:e.slice(t.length)||"/"}const yr=e=>e.join("/").replace(/\/\/+/g,"/"),df=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Xg=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Yg=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function qg(e){Qo()||It(!1);let{basename:t,navigator:r}=J.exports.useContext(Du),{hash:n,pathname:o,search:s}=pf(e),i=o;if(t!=="/"){let a=Kg(e),l=a!=null&&a.endsWith("/");i=o==="/"?t+(l?"/":""):yr([t,o])}return r.createHref({pathname:i,search:s,hash:n})}function Qo(){return J.exports.useContext(Iu)!=null}function Ls(){return Qo()||It(!1),J.exports.useContext(Iu).location}function hf(){Qo()||It(!1);let{basename:e,navigator:t}=J.exports.useContext(Du),{matches:r}=J.exports.useContext(Ms),{pathname:n}=Ls(),o=JSON.stringify(r.map(a=>a.pathnameBase)),s=J.exports.useRef(!1);return J.exports.useEffect(()=>{s.current=!0}),J.exports.useCallback(function(a,l){if(l===void 0&&(l={}),!s.current)return;if(typeof a=="number"){t.go(a);return}let u=uf(a,JSON.parse(o),n);e!=="/"&&(u.pathname=yr([e,u.pathname])),(l.replace?t.replace:t.push)(u,l.state)},[e,t,o,n])}function pf(e){let{matches:t}=J.exports.useContext(Ms),{pathname:r}=Ls(),n=JSON.stringify(t.map(o=>o.pathnameBase));return J.exports.useMemo(()=>uf(e,JSON.parse(n),r),[e,n,r])}function Qg(e,t){Qo()||It(!1);let{matches:r}=J.exports.useContext(Ms),n=r[r.length-1],o=n?n.params:{};n&&n.pathname;let s=n?n.pathnameBase:"/";n&&n.route;let i=Ls(),a;if(t){var l;let p=typeof t=="string"?an(t):t;s==="/"||((l=p.pathname)==null?void 0:l.startsWith(s))||It(!1),a=p}else a=i;let u=a.pathname||"/",d=s==="/"?u:u.slice(s.length)||"/",c=Ag(e,{pathname:d});return Gg(c&&c.map(p=>Object.assign({},p,{params:Object.assign({},o,p.params),pathname:yr([s,p.pathname]),pathnameBase:p.pathnameBase==="/"?s:yr([s,p.pathnameBase])})),r)}function Gg(e,t){return t===void 0&&(t=[]),e==null?null:e.reduceRight((r,n,o)=>J.exports.createElement(Ms.Provider,{children:n.route.element!==void 0?n.route.element:r,value:{outlet:r,matches:t.concat(e.slice(0,o+1))}}),null)}function dn(e){It(!1)}function Jg(e){let{basename:t="/",children:r=null,location:n,navigationType:o=Wr.Pop,navigator:s,static:i=!1}=e;Qo()&&It(!1);let a=df(t),l=J.exports.useMemo(()=>({basename:a,navigator:s,static:i}),[a,s,i]);typeof n=="string"&&(n=an(n));let{pathname:u="/",search:d="",hash:c="",state:p=null,key:b="default"}=n,w=J.exports.useMemo(()=>{let g=cf(u,a);return g==null?null:{pathname:g,search:d,hash:c,state:p,key:b}},[a,u,d,c,p,b]);return w==null?null:J.exports.createElement(Du.Provider,{value:l},J.exports.createElement(Iu.Provider,{children:r,value:{location:w,navigationType:o}}))}function Zg(e){let{children:t,location:r}=e;return Qg(xl(t),r)}function xl(e){let t=[];return J.exports.Children.forEach(e,r=>{if(!J.exports.isValidElement(r))return;if(r.type===J.exports.Fragment){t.push.apply(t,xl(r.props.children));return}r.type!==dn&&It(!1);let n={caseSensitive:r.props.caseSensitive,element:r.props.element,index:r.props.index,path:r.props.path};r.props.children&&(n.children=xl(r.props.children)),t.push(n)}),t}/**
 * React Router DOM v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function _l(){return _l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_l.apply(this,arguments)}function ev(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,s;for(s=0;s<n.length;s++)o=n[s],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const tv=["onClick","reloadDocument","replace","state","target","to"];function rv(e){let{basename:t,children:r,window:n}=e,o=J.exports.useRef();o.current==null&&(o.current=$g({window:n}));let s=o.current,[i,a]=J.exports.useState({action:s.action,location:s.location});return J.exports.useLayoutEffect(()=>s.listen(a),[s]),J.exports.createElement(Jg,{basename:t,children:r,location:i.location,navigationType:i.action,navigator:s})}function nv(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}const Tn=J.exports.forwardRef(function(t,r){let{onClick:n,reloadDocument:o,replace:s=!1,state:i,target:a,to:l}=t,u=ev(t,tv),d=qg(l),c=ov(l,{replace:s,state:i,target:a});function p(b){n&&n(b),!b.defaultPrevented&&!o&&c(b)}return J.exports.createElement("a",_l({},u,{href:d,onClick:p,ref:r,target:a}))});function ov(e,t){let{target:r,replace:n,state:o}=t===void 0?{}:t,s=hf(),i=Ls(),a=pf(e);return J.exports.useCallback(l=>{if(l.button===0&&(!r||r==="_self")&&!nv(l)){l.preventDefault();let u=!!n||wl(i)===wl(a);s(e,{replace:u,state:o})}},[i,s,a,n,o,r,e])}var Ru=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Mu=Symbol(),id=new Map,ff=class{constructor(e,t){if(this._$cssResult$=!0,t!==Mu)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=id.get(this.cssText);return Ru&&e===void 0&&(id.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},mf=e=>new ff(typeof e=="string"?e:e+"",Mu),X=(e,...t)=>{const r=e.length===1?e[0]:t.reduce((n,o,s)=>n+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[s+1],e[0]);return new ff(r,Mu)},iv=(e,t)=>{Ru?e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):t.forEach(r=>{const n=document.createElement("style"),o=window.litNonce;o!==void 0&&n.setAttribute("nonce",o),n.textContent=r.cssText,e.appendChild(n)})},sd=Ru?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const n of t.cssRules)r+=n.cssText;return mf(r)})(e):e,ha,ad=window.trustedTypes,sv=ad?ad.emptyScript:"",ld=window.reactiveElementPolyfillSupport,kl={toAttribute(e,t){switch(t){case Boolean:e=e?sv:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},gf=(e,t)=>t!==e&&(t==t||e==e),pa={attribute:!0,type:String,converter:kl,reflect:!1,hasChanged:gf},hn=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,r)=>{const n=this._$Eh(r,t);n!==void 0&&(this._$Eu.set(n,r),e.push(n))}),e}static createProperty(e,t=pa){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,r,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(n){const o=this[e];this[t]=n,this.requestUpdate(e,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||pa}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,r=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of r)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const n of r)t.unshift(sd(n))}else e!==void 0&&t.push(sd(e));return t}static _$Eh(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,r;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)===null||r===void 0||r.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return iv(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostConnected)===null||r===void 0?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostDisconnected)===null||r===void 0?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ES(e,t,r=pa){var n,o;const s=this.constructor._$Eh(e,r);if(s!==void 0&&r.reflect===!0){const i=((o=(n=r.converter)===null||n===void 0?void 0:n.toAttribute)!==null&&o!==void 0?o:kl.toAttribute)(t,r.type);this._$Ei=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Ei=null}}_$AK(e,t){var r,n,o;const s=this.constructor,i=s._$Eu.get(e);if(i!==void 0&&this._$Ei!==i){const a=s.getPropertyOptions(i),l=a.converter,u=(o=(n=(r=l)===null||r===void 0?void 0:r.fromAttribute)!==null&&n!==void 0?n:typeof l=="function"?l:null)!==null&&o!==void 0?o:kl.fromAttribute;this._$Ei=i,this[i]=u(t,a.type),this._$Ei=null}}requestUpdate(e,t,r){let n=!0;e!==void 0&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||gf)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),r.reflect===!0&&this._$Ei!==e&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(e,r))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((n,o)=>this[o]=n),this._$Et=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(e=this._$Eg)===null||e===void 0||e.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(r)):this._$EU()}catch(n){throw t=!1,this._$EU(),n}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostUpdated)===null||n===void 0?void 0:n.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$E_!==void 0&&(this._$E_.forEach((t,r)=>this._$ES(r,this[r],t)),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}};hn.finalized=!0,hn.elementProperties=new Map,hn.elementStyles=[],hn.shadowRootOptions={mode:"open"},ld==null||ld({ReactiveElement:hn}),((ha=globalThis.reactiveElementVersions)!==null&&ha!==void 0?ha:globalThis.reactiveElementVersions=[]).push("1.2.3");var fa,Mn=globalThis.trustedTypes,ud=Mn?Mn.createPolicy("lit-html",{createHTML:e=>e}):void 0,ir=`lit$${(Math.random()+"").slice(9)}$`,vf="?"+ir,av=`<${vf}>`,Ln=document,Uo=(e="")=>Ln.createComment(e),No=e=>e===null||typeof e!="object"&&typeof e!="function",yf=Array.isArray,lv=e=>{var t;return yf(e)||typeof((t=e)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},io=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cd=/-->/g,dd=/>/g,Rr=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,hd=/'/g,pd=/"/g,bf=/^(?:script|style|textarea|title)$/i,uv=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),O=uv(1),tt=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),fd=new WeakMap,cv=(e,t,r)=>{var n,o;const s=(n=r==null?void 0:r.renderBefore)!==null&&n!==void 0?n:t;let i=s._$litPart$;if(i===void 0){const a=(o=r==null?void 0:r.renderBefore)!==null&&o!==void 0?o:null;s._$litPart$=i=new Us(t.insertBefore(Uo(),a),a,void 0,r!=null?r:{})}return i._$AI(e),i},$n=Ln.createTreeWalker(Ln,129,null,!1),dv=(e,t)=>{const r=e.length-1,n=[];let o,s=t===2?"<svg>":"",i=io;for(let l=0;l<r;l++){const u=e[l];let d,c,p=-1,b=0;for(;b<u.length&&(i.lastIndex=b,c=i.exec(u),c!==null);)b=i.lastIndex,i===io?c[1]==="!--"?i=cd:c[1]!==void 0?i=dd:c[2]!==void 0?(bf.test(c[2])&&(o=RegExp("</"+c[2],"g")),i=Rr):c[3]!==void 0&&(i=Rr):i===Rr?c[0]===">"?(i=o!=null?o:io,p=-1):c[1]===void 0?p=-2:(p=i.lastIndex-c[2].length,d=c[1],i=c[3]===void 0?Rr:c[3]==='"'?pd:hd):i===pd||i===hd?i=Rr:i===cd||i===dd?i=io:(i=Rr,o=void 0);const w=i===Rr&&e[l+1].startsWith("/>")?" ":"";s+=i===io?u+av:p>=0?(n.push(d),u.slice(0,p)+"$lit$"+u.slice(p)+ir+w):u+ir+(p===-2?(n.push(void 0),l):w)}const a=s+(e[r]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ud!==void 0?ud.createHTML(a):a,n]},ls=class{constructor({strings:e,_$litType$:t},r){let n;this.parts=[];let o=0,s=0;const i=e.length-1,a=this.parts,[l,u]=dv(e,t);if(this.el=ls.createElement(l,r),$n.currentNode=this.el.content,t===2){const d=this.el.content,c=d.firstChild;c.remove(),d.append(...c.childNodes)}for(;(n=$n.nextNode())!==null&&a.length<i;){if(n.nodeType===1){if(n.hasAttributes()){const d=[];for(const c of n.getAttributeNames())if(c.endsWith("$lit$")||c.startsWith(ir)){const p=u[s++];if(d.push(c),p!==void 0){const b=n.getAttribute(p.toLowerCase()+"$lit$").split(ir),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?pv:w[1]==="?"?mv:w[1]==="@"?gv:Ns})}else a.push({type:6,index:o})}for(const c of d)n.removeAttribute(c)}if(bf.test(n.tagName)){const d=n.textContent.split(ir),c=d.length-1;if(c>0){n.textContent=Mn?Mn.emptyScript:"";for(let p=0;p<c;p++)n.append(d[p],Uo()),$n.nextNode(),a.push({type:2,index:++o});n.append(d[c],Uo())}}}else if(n.nodeType===8)if(n.data===vf)a.push({type:2,index:o});else{let d=-1;for(;(d=n.data.indexOf(ir,d+1))!==-1;)a.push({type:7,index:o}),d+=ir.length-1}o++}}static createElement(e,t){const r=Ln.createElement("template");return r.innerHTML=e,r}};function Un(e,t,r=e,n){var o,s,i,a;if(t===tt)return t;let l=n!==void 0?(o=r._$Cl)===null||o===void 0?void 0:o[n]:r._$Cu;const u=No(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==u&&((s=l==null?void 0:l._$AO)===null||s===void 0||s.call(l,!1),u===void 0?l=void 0:(l=new u(e),l._$AT(e,r,n)),n!==void 0?((i=(a=r)._$Cl)!==null&&i!==void 0?i:a._$Cl=[])[n]=l:r._$Cu=l),l!==void 0&&(t=Un(e,l._$AS(e,t.values),l,n)),t}var hv=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:r},parts:n}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Ln).importNode(r,!0);$n.currentNode=o;let s=$n.nextNode(),i=0,a=0,l=n[0];for(;l!==void 0;){if(i===l.index){let u;l.type===2?u=new Us(s,s.nextSibling,this,e):l.type===1?u=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(u=new vv(s,this,e)),this.v.push(u),l=n[++a]}i!==(l==null?void 0:l.index)&&(s=$n.nextNode(),i++)}return o}m(e){let t=0;for(const r of this.v)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},Us=class{constructor(e,t,r,n){var o;this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=n,this._$Cg=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Un(this,e,t),No(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==tt&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):lv(e)?this.A(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==ve&&No(this._$AH)?this._$AA.nextSibling.data=e:this.S(Ln.createTextNode(e)),this._$AH=e}T(e){var t;const{values:r,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=ls.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(r);else{const s=new hv(o,this),i=s.p(this.options);s.m(r),this.S(i),this._$AH=s}}_$AC(e){let t=fd.get(e.strings);return t===void 0&&fd.set(e.strings,t=new ls(e)),t}A(e){yf(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,n=0;for(const o of e)n===t.length?t.push(r=new Us(this.M(Uo()),this.M(Uo()),this,this.options)):r=t[n],r._$AI(o),n++;n<t.length&&(this._$AR(r&&r._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},Ns=class{constructor(e,t,r,n,o){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=ve}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,n){const o=this.strings;let s=!1;if(o===void 0)e=Un(this,e,t,0),s=!No(e)||e!==this._$AH&&e!==tt,s&&(this._$AH=e);else{const i=e;let a,l;for(e=o[0],a=0;a<o.length-1;a++)l=Un(this,i[r+a],t,a),l===tt&&(l=this._$AH[a]),s||(s=!No(l)||l!==this._$AH[a]),l===ve?e=ve:e!==ve&&(e+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}s&&!n&&this.k(e)}k(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}},pv=class extends Ns{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===ve?void 0:e}},fv=Mn?Mn.emptyScript:"",mv=class extends Ns{constructor(){super(...arguments),this.type=4}k(e){e&&e!==ve?this.element.setAttribute(this.name,fv):this.element.removeAttribute(this.name)}},gv=class extends Ns{constructor(e,t,r,n,o){super(e,t,r,n,o),this.type=5}_$AI(e,t=this){var r;if((e=(r=Un(this,e,t,0))!==null&&r!==void 0?r:ve)===tt)return;const n=this._$AH,o=e===ve&&n!==ve||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==ve&&(n===ve||o);o&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;typeof this._$AH=="function"?this._$AH.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$AH.handleEvent(e)}},vv=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Un(this,e)}},md=window.litHtmlPolyfillSupport;md==null||md(ls,Us),((fa=globalThis.litHtmlVersions)!==null&&fa!==void 0?fa:globalThis.litHtmlVersions=[]).push("2.1.3");var ma,ga,U=class extends hn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=cv(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return tt}};U.finalized=!0,U._$litElement$=!0,(ma=globalThis.litElementHydrateSupport)===null||ma===void 0||ma.call(globalThis,{LitElement:U});var gd=globalThis.litElementPolyfillSupport;gd==null||gd({LitElement:U});((ga=globalThis.litElementVersions)!==null&&ga!==void 0?ga:globalThis.litElementVersions=[]).push("3.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Y=X`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,yv=X`
  ${Y}

  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,H=e=>t=>typeof t=="function"?((r,n)=>(window.customElements.define(r,n),n))(e,t):((r,n)=>{const{kind:o,elements:s}=n;return{kind:o,elements:s,finisher(i){window.customElements.define(r,i)}}})(e,t),bv=(e,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?ot(he({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function v(e){return(t,r)=>r!==void 0?((n,o,s)=>{o.constructor.createProperty(s,n)})(e,t,r):bv(e,t)}function se(e){return v(ot(he({},e),{state:!0}))}var wf=({finisher:e,descriptor:t})=>(r,n)=>{var o;if(n===void 0){const s=(o=r.originalKey)!==null&&o!==void 0?o:r.key,i=t!=null?{kind:"method",placement:"prototype",key:s,descriptor:t(r.key)}:ot(he({},r),{key:s});return e!=null&&(i.finisher=function(a){e(a,s)}),i}{const s=r.constructor;t!==void 0&&Object.defineProperty(r,n,t(n)),e==null||e(s,n)}};function K(e,t){return wf({descriptor:r=>{const n={get(){var o,s;return(s=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(e))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(t){const o=typeof r=="symbol"?Symbol():"__"+r;n.get=function(){var s,i;return this[o]===void 0&&(this[o]=(i=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(e))!==null&&i!==void 0?i:null),this[o]}}return n}})}function wv(e){return wf({descriptor:t=>({async get(){var r;return await this.updateComplete,(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(e)},enumerable:!0,configurable:!0})})}var va;((va=window.HTMLSlotElement)===null||va===void 0?void 0:va.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var us=class extends U{render(){return O` <slot></slot> `}};us.styles=yv;us=h([H("sl-visually-hidden")],us);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xv=new Set(["children","localName","ref","style","className"]),vd=new WeakMap,_v=(e,t,r,n,o)=>{const s=o==null?void 0:o[t];s!==void 0?r!==n&&((i,a,l)=>{let u=vd.get(i);u===void 0&&vd.set(i,u=new Map);let d=u.get(a);l!==void 0?d===void 0?(u.set(a,d={handleEvent:l}),i.addEventListener(a,d)):d.handleEvent=l:d!==void 0&&(u.delete(a),i.removeEventListener(a,d))})(e,s,r):e[t]=r},j=(e,t,r,n,o)=>{const s=e.Component,i=e.createElement,a=new Set(Object.keys(n!=null?n:{}));for(const d in r.prototype)d in HTMLElement.prototype||(xv.has(d)?console.warn(`${t} contains property ${d} which is a React reserved property. It will be used by React and not set on the element.`):a.add(d));class l extends s{constructor(){super(...arguments),this.t=null}o(c){if(this.t!==null)for(const p in this.i)_v(this.t,p,this.props[p],c?c[p]:void 0,n)}componentDidMount(){this.o()}componentDidUpdate(c){this.o(c)}render(){const c=this.props.l;this.h!==void 0&&this.u===c||(this.h=b=>{this.t===null&&(this.t=b),c!==null&&((w,g)=>{typeof w=="function"?w(g):w.current=g})(c,b),this.u=c});const p={ref:this.h};this.i={};for(const[b,w]of Object.entries(this.props))a.has(b)?this.i[b]=w:p[b==="className"?"class":b]=w;return i(t,p)}}l.displayName=o!=null?o:r.name;const u=e.forwardRef((d,c)=>i(l,qs(Ys({},d),{l:c}),d==null?void 0:d.children));return u.displayName=l.displayName,u};j(V,"sl-visually-hidden",us,{});var zi=(()=>{const e=document.createElement("style");let t;try{document.head.appendChild(e),e.sheet.insertRule(":focus-visible { color: inherit }"),t=!0}catch{t=!1}finally{e.remove()}return t})(),Q=mf(zi?":focus-visible":":focus"),kv=X`
  ${Y}

  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider${Q} {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }
`;function ko(e,t){function r(o){const s=e.getBoundingClientRect(),i=e.ownerDocument.defaultView,a=s.left+i.pageXOffset,l=s.top+i.pageYOffset,u=o.pageX-a,d=o.pageY-l;t(u,d)}function n(){document.removeEventListener("pointermove",r),document.removeEventListener("pointerup",n)}document.addEventListener("pointermove",r,{passive:!0}),document.addEventListener("pointerup",n)}function Ae(e,t,r){return e<t?t:e>r?r:e}var Sl=new Set,Sv=new MutationObserver(xf),Cl=new Map,po=document.documentElement.lang||navigator.language,So;Sv.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]});function Cv(...e){e.map(t=>{const r=t.$code.toLowerCase();Cl.set(r,t),So||(So=t)}),xf()}function Ev(e,t,...r){const n=e.toLowerCase().slice(0,2),o=e.length>2?e.toLowerCase():"",s=Cl.get(o),i=Cl.get(n);let a;if(s&&s[t])a=s[t];else if(i&&i[t])a=i[t];else if(So&&So[t])a=So[t];else return console.error(`No translation found for: ${t}`),t;return typeof a=="function"?a(...r):a}function Tv(e,t,r){return t=new Date(t),new Intl.DateTimeFormat(e,r).format(t)}function $v(e,t,r){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(e,r).format(t)}function zv(e,t,r,n){return new Intl.RelativeTimeFormat(e,n).format(t,r)}function xf(){po=document.documentElement.lang||navigator.language,[...Sl.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var ut=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Sl.add(this.host)}hostDisconnected(){Sl.delete(this.host)}term(e,...t){return Ev(this.host.lang||po,e,...t)}date(e,t){return Tv(this.host.lang||po,e,t)}number(e,t){return $v(this.host.lang||po,e,t)}relativeTime(e,t,r){return zv(this.host.lang||po,e,t,r)}},Av={$code:"en",$name:"English",$dir:"ltr",close:"Close",copy:"Copy",currentValue:"Current value",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",toggleColorFormat:"Toggle color format"};Cv(Av);var M=e=>e!=null?e:ve;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(e,t){const r=he({waitUntilFirstUpdate:!1},t);return(n,o)=>{const{update:s}=n;if(e in n){const i=e;n.update=function(a){if(a.has(i)){const l=a.get(i),u=this[i];l!==u&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[o](l,u)}s.call(this,a)}}}}function P(e,t,r){const n=new CustomEvent(t,he({bubbles:!0,cancelable:!1,composed:!0,detail:{}},r));return e.dispatchEvent(n),n}function pt(e,t){return new Promise(r=>{function n(o){o.target===e&&(e.removeEventListener(t,n),r())}e.addEventListener(t,n)})}var Be=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.position=50,this.vertical=!1,this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this)}detectSize(){const{width:e,height:t}=this.getBoundingClientRect();this.size=this.vertical?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){this.disabled||(e.preventDefault(),ko(this,(t,r)=>{let n=this.vertical?r:t;this.primary==="end"&&(n=this.size-n),this.snap&&this.snap.split(" ").forEach(s=>{let i;s.endsWith("%")?i=this.size*(parseFloat(s)/100):i=parseFloat(s),n>=i-this.snapThreshold&&n<=i+this.snapThreshold&&(n=i)}),this.position=Ae(this.pixelsToPercentage(n),0,100)}))}handleKeyDown(e){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)){let t=this.position;const r=(e.shiftKey?10:1)*(this.primary==="end"?-1:1);e.preventDefault(),(e.key==="ArrowLeft"&&!this.vertical||e.key==="ArrowUp"&&this.vertical)&&(t-=r),(e.key==="ArrowRight"&&!this.vertical||e.key==="ArrowDown"&&this.vertical)&&(t+=r),e.key==="Home"&&(t=this.primary==="end"?100:0),e.key==="End"&&(t=this.primary==="end"?0:100),this.position=Ae(t,0,100)}}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.positionInPixels=this.percentageToPixels(this.position),P(this,"sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}handleResize(e){const{width:t,height:r}=e[0].contentRect;this.size=this.vertical?r:t,this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}render(){const e=this.vertical?"gridTemplateRows":"gridTemplateColumns",t=this.vertical?"gridTemplateColumns":"gridTemplateRows",r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,n="auto";return this.primary==="end"?this.style[e]=`${n} var(--divider-width) ${r}`:this.style[e]=`${r} var(--divider-width) ${n}`,this.style[t]="",O`
      <div part="panel start" class="start">
        <slot name="start"></slot>
      </div>

      <div
        part="divider"
        class="divider"
        tabindex=${M(this.disabled?void 0:"0")}
        role="separator"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="handle"></slot>
      </div>

      <div part="panel end" class="end">
        <slot name="end"></slot>
      </div>
    `}};Be.styles=kv;h([K(".divider")],Be.prototype,"divider",2);h([v({type:Number,reflect:!0})],Be.prototype,"position",2);h([v({attribute:"position-in-pixels",type:Number})],Be.prototype,"positionInPixels",2);h([v({type:Boolean,reflect:!0})],Be.prototype,"vertical",2);h([v({type:Boolean,reflect:!0})],Be.prototype,"disabled",2);h([v()],Be.prototype,"primary",2);h([v()],Be.prototype,"snap",2);h([v({type:Number,attribute:"snap-threshold"})],Be.prototype,"snapThreshold",2);h([R("position")],Be.prototype,"handlePositionChange",1);h([R("positionInPixels")],Be.prototype,"handlePositionInPixelsChange",1);h([R("vertical")],Be.prototype,"handleVerticalChange",1);Be=h([H("sl-split-panel")],Be);j(V,"sl-split-panel",Be,{onSlReposition:"sl-reposition"});var Pv=X`
  ${Y}

  :host {
    --height: var(--sl-toggle-size);
    --thumb-size: calc(var(--sl-toggle-size) + 4px);
    --width: calc(var(--height) * 2);

    display: inline-block;
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    transform: translateX(calc((var(--width) - var(--height)) / -2));
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input${Q} ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled)
    .switch__input${Q}
    ~ .switch__control
    .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    transform: translateX(calc((var(--width) - var(--height)) / 2));
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input${Q} ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled)
    .switch__input${Q}
    ~ .switch__control
    .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    line-height: var(--height);
    margin-left: 0.5em;
    user-select: none;
  }
`,Wt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Go=e=>(...t)=>({_$litDirective$:e,values:t}),Fs=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ov=e=>e.strings===void 0,Dv={},Iv=(e,t=Dv)=>e._$AH=t,_r=Go(class extends Fs{constructor(e){if(super(e),e.type!==Wt.PROPERTY&&e.type!==Wt.ATTRIBUTE&&e.type!==Wt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ov(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===tt||t===ve)return t;const r=e.element,n=e.name;if(e.type===Wt.PROPERTY){if(t===r[n])return tt}else if(e.type===Wt.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return tt}else if(e.type===Wt.ATTRIBUTE&&r.getAttribute(n)===t+"")return tt;return Iv(e),t}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Rv=class extends Event{constructor(e){super("formdata");this.formData=e}},Mv=class extends FormData{constructor(e){super(e);this.form=e,e.dispatchEvent(new Rv(this))}append(e,t){let r=this.form.elements[e];if(r||(r=document.createElement("input"),r.type="hidden",r.name=e,this.form.appendChild(r)),this.has(e)){const n=this.getAll(e),o=n.indexOf(r.value);o!==-1&&n.splice(o,1),n.push(t),this.set(e,n)}else super.append(e,t);r.value=t}};function Lv(){const e=document.createElement("form");let t=!1;return document.body.append(e),e.addEventListener("submit",r=>{new FormData(r.target),r.preventDefault()}),e.addEventListener("formdata",()=>t=!0),e.dispatchEvent(new Event("submit",{cancelable:!0})),e.remove(),t}function yd(){!window.FormData||Lv()||(window.FormData=Mv,window.addEventListener("submit",e=>{e.defaultPrevented||new FormData(e.target)}))}document.readyState==="complete"?yd():window.addEventListener("DOMContentLoaded",()=>yd());var tr=class{constructor(e,t){(this.host=e).addController(this),this.options=he({form:r=>r.closest("form"),name:r=>r.name,value:r=>r.value,disabled:r=>r.disabled,reportValidity:r=>typeof r.reportValidity=="function"?r.reportValidity():!0},t),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this)}hostConnected(){this.form=this.options.form(this.host),this.form&&(this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit))}hostDisconnected(){this.form&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form=void 0)}handleFormData(e){const t=this.options.disabled(this.host),r=this.options.name(this.host),n=this.options.value(this.host);!t&&typeof r=="string"&&typeof n!="undefined"&&(Array.isArray(n)?n.forEach(o=>{e.formData.append(r,o.toString())}):e.formData.append(r,n.toString()))}handleFormSubmit(e){const t=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&!t&&!r(this.host)&&(e.preventDefault(),e.stopImmediatePropagation())}submit(e){if(this.form){const t=document.createElement("button");t.type="submit",t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clip="rect(0 0 0 0)",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",e&&["formaction","formmethod","formnovalidate","formtarget"].forEach(r=>{e.hasAttribute(r)&&t.setAttribute(r,e.getAttribute(r))}),this.form.append(t),t.click(),t.remove()}}},Z=Go(class extends Fs{constructor(e){var t;if(super(e),e.type!==Wt.ATTRIBUTE||e.name!=="class"||((t=e.strings)===null||t===void 0?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var r,n;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.et=new Set(e.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in t)t[s]&&!(!((r=this.et)===null||r===void 0)&&r.has(s))&&this.st.add(s);return this.render(t)}const o=e.element.classList;this.st.forEach(s=>{s in t||(o.remove(s),this.st.delete(s))});for(const s in t){const i=!!t[s];i===this.st.has(s)||((n=this.et)===null||n===void 0?void 0:n.has(s))||(i?(o.add(s),this.st.add(s)):(o.remove(s),this.st.delete(s)))}return tt}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ye=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this,{value:e=>e.checked?e.value:void 0}),this.hasFocus=!1,this.disabled=!1,this.required=!1,this.checked=!1,this.invalid=!1}firstUpdated(){this.invalid=!this.input.checkValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,P(this,"sl-blur")}handleCheckedChange(){this.input.checked=this.checked,this.invalid=!this.input.checkValidity()}handleClick(){this.checked=!this.checked,P(this,"sl-change")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,P(this,"sl-focus")}handleKeyDown(e){e.key==="ArrowLeft"&&(e.preventDefault(),this.checked=!1,P(this,"sl-change")),e.key==="ArrowRight"&&(e.preventDefault(),this.checked=!0,P(this,"sl-change"))}render(){return O`
      <label
        part="base"
        class=${Z({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus})}
      >
        <input
          class="switch__input"
          type="checkbox"
          name=${M(this.name)}
          value=${M(this.value)}
          .checked=${_r(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <span part="label" class="switch__label">
          <slot></slot>
        </span>
      </label>
    `}};Ye.styles=Pv;h([K('input[type="checkbox"]')],Ye.prototype,"input",2);h([se()],Ye.prototype,"hasFocus",2);h([v()],Ye.prototype,"name",2);h([v()],Ye.prototype,"value",2);h([v({type:Boolean,reflect:!0})],Ye.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],Ye.prototype,"required",2);h([v({type:Boolean,reflect:!0})],Ye.prototype,"checked",2);h([v({type:Boolean,reflect:!0})],Ye.prototype,"invalid",2);h([R("checked",{waitUntilFirstUpdate:!0})],Ye.prototype,"handleCheckedChange",1);h([R("disabled",{waitUntilFirstUpdate:!0})],Ye.prototype,"handleDisabledChange",1);Ye=h([H("sl-switch")],Ye);j(V,"sl-switch",Ye,{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus"});var Uv=0;function _f(){return++Uv}var Nv=X`
  ${Y}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab${Q}:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
    box-shadow: inset var(--sl-focus-ring);
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-right: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-large);
    margin-left: var(--sl-spacing-2x-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }
`,Rt=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.attrId=_f(),this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1}focus(e){this.tab.focus(e)}blur(){this.tab.blur()}handleCloseClick(){P(this,"sl-close")}render(){return this.id=this.id.length>0?this.id:this.componentId,O`
      <div
        part="base"
        class=${Z({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
        role="tab"
        aria-disabled=${this.disabled?"true":"false"}
        aria-selected=${this.active?"true":"false"}
        tabindex=${this.disabled||!this.active?"-1":"0"}
      >
        <slot></slot>
        ${this.closable?O`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};Rt.styles=Nv;h([K(".tab")],Rt.prototype,"tab",2);h([v({reflect:!0})],Rt.prototype,"panel",2);h([v({type:Boolean,reflect:!0})],Rt.prototype,"active",2);h([v({type:Boolean})],Rt.prototype,"closable",2);h([v({type:Boolean,reflect:!0})],Rt.prototype,"disabled",2);h([v()],Rt.prototype,"lang",2);Rt=h([H("sl-tab")],Rt);j(V,"sl-tab",Rt,{onSlClose:"sl-close"});var Fv=X`
  ${Y}

  :host {
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);

    display: block;
  }

  .tab-group {
    display: flex;
    border: solid 1px transparent;
    border-radius: 0;
  }

  .tab-group .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group .tab-group__indicator {
    position: absolute;
    left: 0;
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid 2px var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: -2px;
    border-bottom: solid 2px var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid 2px var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * 2px);
    border-top: solid 2px var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-right: solid 2px var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * 2px);
    border-right: solid 2px var(--indicator-color);
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid 2px var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * 2px);
    border-left: solid 2px var(--indicator-color);
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`;function Bv(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}var El=new Set;function cs(e){El.add(e),document.body.classList.add("sl-scroll-lock")}function ds(e){El.delete(e),El.size===0&&document.body.classList.remove("sl-scroll-lock")}function Tl(e,t,r="vertical",n="smooth"){const o=Bv(e,t),s=o.top+t.scrollTop,i=o.left+t.scrollLeft,a=t.scrollLeft,l=t.scrollLeft+t.offsetWidth,u=t.scrollTop,d=t.scrollTop+t.offsetHeight;(r==="horizontal"||r==="both")&&(i<a?t.scrollTo({left:i,behavior:n}):i+e.clientWidth>l&&t.scrollTo({left:i-t.offsetWidth+e.clientWidth,behavior:n})),(r==="vertical"||r==="both")&&(s<u?t.scrollTo({top:s,behavior:n}):s+e.clientHeight>d&&t.scrollTo({top:s-t.offsetHeight+e.clientHeight,behavior:n}))}var Ve=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.tabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.preventIndicatorTransition(),this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(t=>!["aria-labelledby","aria-controls"].includes(t.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(t=>t.attributeName==="disabled")&&this.syncTabsAndPanels()}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((t,r)=>{var n;t[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((n=this.getActiveTab())!=null?n:this.tabs[0],{emitEvents:!1}),r.unobserve(t[0].target))}).observe(this.tabGroup)})}disconnectedCallback(){this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}show(e){const t=this.tabs.find(r=>r.panel===e);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}getAllTabs(e=!1){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(r=>e?r.tagName.toLowerCase()==="sl-tab":r.tagName.toLowerCase()==="sl-tab"&&!r.disabled)}getAllPanels(){return[...this.body.querySelector("slot").assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){const r=e.target.closest("sl-tab");(r==null?void 0:r.closest("sl-tab-group"))===this&&r!==null&&this.setActiveTab(r,{scrollBehavior:"smooth"})}handleKeyDown(e){const r=e.target.closest("sl-tab");if((r==null?void 0:r.closest("sl-tab-group"))===this&&(["Enter"," "].includes(e.key)&&r!==null&&(this.setActiveTab(r,{scrollBehavior:"smooth"}),e.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))){const o=document.activeElement;if((o==null?void 0:o.tagName.toLowerCase())==="sl-tab"){let s=this.tabs.indexOf(o);e.key==="Home"?s=0:e.key==="End"?s=this.tabs.length-1:["top","bottom"].includes(this.placement)&&e.key==="ArrowLeft"||["start","end"].includes(this.placement)&&e.key==="ArrowUp"?s=Math.max(0,s-1):(["top","bottom"].includes(this.placement)&&e.key==="ArrowRight"||["start","end"].includes(this.placement)&&e.key==="ArrowDown")&&(s=Math.min(this.tabs.length-1,s+1)),this.tabs[s].focus({preventScroll:!0}),this.activation==="auto"&&this.setActiveTab(this.tabs[s],{scrollBehavior:"smooth"}),["top","bottom"].includes(this.placement)&&Tl(this.tabs[s],this.nav,"horizontal"),e.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth}setActiveTab(e,t){if(t=he({emitEvents:!0,scrollBehavior:"auto"},t),e!==this.activeTab&&!e.disabled){const r=this.activeTab;this.activeTab=e,this.tabs.map(n=>n.active=n===this.activeTab),this.panels.map(n=>{var o;return n.active=n.name===((o=this.activeTab)==null?void 0:o.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Tl(this.activeTab,this.nav,"horizontal",t.scrollBehavior),t.emitEvents&&(r&&P(this,"sl-tab-hide",{detail:{name:r.panel}}),P(this,"sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(e=>{const t=this.panels.find(r=>r.name===e.panel);t&&(e.setAttribute("aria-controls",t.getAttribute("id")),t.setAttribute("aria-labelledby",e.getAttribute("id")))})}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}repositionIndicator(){const e=this.getActiveTab();if(!e)return;const t=e.clientWidth,r=e.clientHeight,n=this.getAllTabs(!0),s=n.slice(0,n.indexOf(e)).reduce((i,a)=>({left:i.left+a.clientWidth,top:i.top+a.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${t}px`,this.indicator.style.height="auto",this.indicator.style.transform=`translateX(${s.left}px)`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${r}px`,this.indicator.style.transform=`translateY(${s.top}px)`;break}}preventIndicatorTransition(){const e=this.indicator.style.transition;this.indicator.style.transition="none",requestAnimationFrame(()=>{this.indicator.style.transition=e})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.panels=this.getAllPanels(),this.syncIndicator()}render(){return O`
      <div
        part="base"
        class=${Z({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?O`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name="chevron-left"
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?O`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name="chevron-right"
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <div part="body" class="tab-group__body">
          <slot @slotchange=${this.syncTabsAndPanels}></slot>
        </div>
      </div>
    `}};Ve.styles=Fv;h([K(".tab-group")],Ve.prototype,"tabGroup",2);h([K(".tab-group__body")],Ve.prototype,"body",2);h([K(".tab-group__nav")],Ve.prototype,"nav",2);h([K(".tab-group__indicator")],Ve.prototype,"indicator",2);h([se()],Ve.prototype,"hasScrollControls",2);h([v()],Ve.prototype,"placement",2);h([v()],Ve.prototype,"activation",2);h([v({attribute:"no-scroll-controls",type:Boolean})],Ve.prototype,"noScrollControls",2);h([v()],Ve.prototype,"lang",2);h([R("noScrollControls",{waitUntilFirstUpdate:!0})],Ve.prototype,"updateScrollControls",1);h([R("placement",{waitUntilFirstUpdate:!0})],Ve.prototype,"syncIndicator",1);Ve=h([H("sl-tab-group")],Ve);j(V,"sl-tab-group",Ve,{onSlTabShow:"sl-tab-show",onSlTabHide:"sl-tab-hide"});var Vv=X`
  ${Y}

  :host {
    --padding: 0;

    display: block;
  }

  .tab-panel {
    border: solid 1px transparent;
    padding: var(--padding);
  }
`,Nn=class extends U{constructor(){super(...arguments);this.attrId=_f(),this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId}render(){return this.style.display=this.active?"block":"none",O`
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden=${this.active?"false":"true"}>
        <slot></slot>
      </div>
    `}};Nn.styles=Vv;h([v({reflect:!0})],Nn.prototype,"name",2);h([v({type:Boolean,reflect:!0})],Nn.prototype,"active",2);Nn=h([H("sl-tab-panel")],Nn);j(V,"sl-tab-panel",Nn,{});var Hv=X`
  ${Y}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    cursor: default;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--small .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-3x-small));
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-2x-small));
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    font-size: 1.4em;
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-x-small));
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,kr=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){P(this,"sl-remove")}render(){return O`
      <span
        part="base"
        class=${Z({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <span part="content" class="tag__content">
          <slot></slot>
        </span>

        ${this.removable?O`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
              ></sl-icon-button>
            `:""}
      </span>
    `}};kr.styles=Hv;h([v({reflect:!0})],kr.prototype,"variant",2);h([v({reflect:!0})],kr.prototype,"size",2);h([v({type:Boolean,reflect:!0})],kr.prototype,"pill",2);h([v({type:Boolean})],kr.prototype,"removable",2);kr=h([H("sl-tag")],kr);j(V,"sl-tag",kr,{onSlRemove:"sl-remove"});var Bs=X`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
  }

  .form-control--has-help-text .form-control__help-text ::slotted(*) {
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }
`,jv=X`
  ${Y}
  ${Bs}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
  }
`,Ct=class{constructor(e,...t){this.slotNames=[],(this.host=e).addController(this),this.slotNames=t,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===e.ELEMENT_NODE){const t=e;if(t.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(e){const t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()}};function kf(e){if(!e)return"";const t=e.assignedNodes({flatten:!0});let r="";return[...t].forEach(n=>{n.nodeType===Node.TEXT_NODE&&(r+=n.textContent)}),r}var ie=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this),this.hasSlotController=new Ct(this,"help-text","label"),this.hasFocus=!1,this.size="medium",this.value="",this.filled=!1,this.label="",this.helpText="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.invalid=!this.input.checkValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){if(e){typeof e.top=="number"&&(this.input.scrollTop=e.top),typeof e.left=="number"&&(this.input.scrollLeft=e.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,r="none"){this.input.setSelectionRange(e,t,r)}setRangeText(e,t,r,n="preserve"){this.input.setRangeText(e,t,r,n),this.value!==this.input.value&&(this.value=this.input.value,P(this,"sl-input")),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight(),P(this,"sl-input"),P(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,P(this,"sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),P(this,"sl-change")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,P(this,"sl-focus")}handleInput(){this.value=this.input.value,this.setTextareaHeight(),P(this,"sl-input")}handleRowsChange(){this.setTextareaHeight()}handleValueChange(){this.invalid=!this.input.checkValidity()}setTextareaHeight(){this.resize==="auto"?(this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=void 0}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),r=this.label?!0:!!e,n=this.helpText?!0:!!t;return O`
      <div
        part="form-control"
        class=${Z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":n})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Z({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":this.value.length===0,"textarea--invalid":this.invalid,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              name=${M(this.name)}
              .value=${_r(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${M(this.placeholder)}
              rows=${M(this.rows)}
              minlength=${M(this.minlength)}
              maxlength=${M(this.maxlength)}
              autocapitalize=${M(this.autocapitalize)}
              autocorrect=${M(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${M(this.spellcheck)}
              inputmode=${M(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${n?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ie.styles=jv;h([K(".textarea__control")],ie.prototype,"input",2);h([se()],ie.prototype,"hasFocus",2);h([v({reflect:!0})],ie.prototype,"size",2);h([v()],ie.prototype,"name",2);h([v()],ie.prototype,"value",2);h([v({type:Boolean,reflect:!0})],ie.prototype,"filled",2);h([v()],ie.prototype,"label",2);h([v({attribute:"help-text"})],ie.prototype,"helpText",2);h([v()],ie.prototype,"placeholder",2);h([v({type:Number})],ie.prototype,"rows",2);h([v()],ie.prototype,"resize",2);h([v({type:Boolean,reflect:!0})],ie.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],ie.prototype,"readonly",2);h([v({type:Number})],ie.prototype,"minlength",2);h([v({type:Number})],ie.prototype,"maxlength",2);h([v({type:Boolean,reflect:!0})],ie.prototype,"required",2);h([v({type:Boolean,reflect:!0})],ie.prototype,"invalid",2);h([v()],ie.prototype,"autocapitalize",2);h([v()],ie.prototype,"autocorrect",2);h([v()],ie.prototype,"autocomplete",2);h([v({type:Boolean})],ie.prototype,"autofocus",2);h([v({type:Boolean})],ie.prototype,"spellcheck",2);h([v()],ie.prototype,"inputmode",2);h([R("disabled",{waitUntilFirstUpdate:!0})],ie.prototype,"handleDisabledChange",1);h([R("rows",{waitUntilFirstUpdate:!0})],ie.prototype,"handleRowsChange",1);h([R("value",{waitUntilFirstUpdate:!0})],ie.prototype,"handleValueChange",1);ie=h([H("sl-textarea")],ie);j(V,"sl-textarea",ie,{onSlChange:"sl-change",onSlInput:"sl-input",onSlFocus:"sl-focus",onSlBlur:"sl-blur"});var Wv=X`
  ${Y}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip-target {
    display: contents;
  }

  .tooltip-positioner {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    pointer-events: none;
  }

  .tooltip-positioner[data-placement^='top'] .tooltip {
    transform-origin: bottom;
  }

  .tooltip-positioner[data-placement^='bottom'] .tooltip {
    transform-origin: top;
  }

  .tooltip-positioner[data-placement^='left'] .tooltip {
    transform-origin: right;
  }

  .tooltip-positioner[data-placement^='right'] .tooltip {
    transform-origin: left;
  }

  .tooltip__content {
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
  }

  .tooltip__arrow {
    position: absolute;
    background: var(--sl-tooltip-background-color);
    width: calc(var(--sl-tooltip-arrow-size) * 2);
    height: calc(var(--sl-tooltip-arrow-size) * 2);
    transform: rotate(45deg);
    z-index: -1;
  }
`;function Qn(e){return e.split("-")[0]}function Vs(e){return e.split("-")[1]}function Jo(e){return["top","bottom"].includes(Qn(e))?"x":"y"}function Lu(e){return e==="y"?"height":"width"}function bd(e,t,r){let{reference:n,floating:o}=e;const s=n.x+n.width/2-o.width/2,i=n.y+n.height/2-o.height/2,a=Jo(t),l=Lu(a),u=n[l]/2-o[l]/2,d=Qn(t),c=a==="x";let p;switch(d){case"top":p={x:s,y:n.y-o.height};break;case"bottom":p={x:s,y:n.y+n.height};break;case"right":p={x:n.x+n.width,y:i};break;case"left":p={x:n.x-o.width,y:i};break;default:p={x:n.x,y:n.y}}switch(Vs(t)){case"start":p[a]-=u*(r&&c?-1:1);break;case"end":p[a]+=u*(r&&c?-1:1);break}return p}var Kv=async(e,t,r)=>{const{placement:n="bottom",strategy:o="absolute",middleware:s=[],platform:i}=r,a=await(i.isRTL==null?void 0:i.isRTL(t));let l=await i.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:d}=bd(l,n,a),c=n,p={};const b=new Set;for(let w=0;w<s.length;w++){const{name:g,fn:f}=s[w];if(b.has(g))continue;const{x:m,y,data:_,reset:x}=await f({x:u,y:d,initialPlacement:n,placement:c,strategy:o,middlewareData:p,rects:l,platform:i,elements:{reference:e,floating:t}});if(u=m!=null?m:u,d=y!=null?y:d,p=ot(he({},p),{[g]:he(he({},p[g]),_)}),x){typeof x=="object"&&(x.placement&&(c=x.placement),x.rects&&(l=x.rects===!0?await i.getElementRects({reference:e,floating:t,strategy:o}):x.rects),{x:u,y:d}=bd(l,c,a),x.skip!==!1&&b.add(g)),w=-1;continue}}return{x:u,y:d,placement:c,strategy:o,middlewareData:p}};function Xv(e){return he({top:0,right:0,bottom:0,left:0},e)}function Sf(e){return typeof e!="number"?Xv(e):{top:e,right:e,bottom:e,left:e}}function hs(e){return ot(he({},e),{top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height})}async function Uu(e,t){var r;t===void 0&&(t={});const{x:n,y:o,platform:s,rects:i,elements:a,strategy:l}=e,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:c="floating",altBoundary:p=!1,padding:b=0}=t,w=Sf(b),f=a[p?c==="floating"?"reference":"floating":c],m=hs(await s.getClippingRect({element:(r=await(s.isElement==null?void 0:s.isElement(f)))==null||r?f:f.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:u,rootBoundary:d})),y=hs(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({rect:c==="floating"?ot(he({},i.floating),{x:n,y:o}):i.reference,offsetParent:await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),strategy:l}):i[c]);return{top:m.top-y.top+w.top,bottom:y.bottom-m.bottom+w.bottom,left:m.left-y.left+w.left,right:y.right-m.right+w.right}}var Yv=Math.min,Lr=Math.max;function $l(e,t,r){return Lr(e,Yv(t,r))}var qv=e=>({name:"arrow",options:e,async fn(t){const{element:r,padding:n=0}=e!=null?e:{},{x:o,y:s,placement:i,rects:a,platform:l}=t;if(r==null)return{};const u=Sf(n),d={x:o,y:s},c=Jo(i),p=Lu(c),b=await l.getDimensions(r),w=c==="y"?"top":"left",g=c==="y"?"bottom":"right",f=a.reference[p]+a.reference[c]-d[c]-a.floating[p],m=d[c]-a.reference[c],y=await(l.getOffsetParent==null?void 0:l.getOffsetParent(r)),_=y?c==="y"?y.clientHeight||0:y.clientWidth||0:0,x=f/2-m/2,k=u[w],C=_-b[p]-u[g],E=_/2-b[p]/2+x,$=$l(k,E,C);return{data:{[c]:$,centerOffset:E-$}}}}),Qv={left:"right",right:"left",bottom:"top",top:"bottom"};function ps(e){return e.replace(/left|right|bottom|top/g,t=>Qv[t])}function Gv(e,t,r){r===void 0&&(r=!1);const n=Vs(e),o=Jo(e),s=Lu(o);let i=o==="x"?n===(r?"end":"start")?"right":"left":n==="start"?"bottom":"top";return t.reference[s]>t.floating[s]&&(i=ps(i)),{main:i,cross:ps(i)}}var Jv={start:"end",end:"start"};function wd(e){return e.replace(/start|end/g,t=>Jv[t])}function Zv(e){const t=ps(e);return[wd(e),t,wd(t)]}var Cf=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var r;const{placement:n,middlewareData:o,rects:s,initialPlacement:i,platform:a,elements:l}=t,u=e,{mainAxis:d=!0,crossAxis:c=!0,fallbackPlacements:p,fallbackStrategy:b="bestFit",flipAlignment:w=!0}=u,g=Ou(u,["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","flipAlignment"]),f=Qn(n),y=p||(f===i||!w?[ps(i)]:Zv(i)),_=[i,...y],x=await Uu(t,g),k=[];let C=((r=o.flip)==null?void 0:r.overflows)||[];if(d&&k.push(x[f]),c){const{main:D,cross:F}=Gv(n,s,await(a.isRTL==null?void 0:a.isRTL(l.floating)));k.push(x[D],x[F])}if(C=[...C,{placement:n,overflows:k}],!k.every(D=>D<=0)){var E,$;const D=((E=($=o.flip)==null?void 0:$.index)!=null?E:0)+1,F=_[D];if(F)return{data:{index:D,overflows:C},reset:{skip:!1,placement:F}};let ne="bottom";switch(b){case"bestFit":{var T;const xe=(T=C.slice().sort((S,z)=>S.overflows.filter(B=>B>0).reduce((B,ue)=>B+ue,0)-z.overflows.filter(B=>B>0).reduce((B,ue)=>B+ue,0))[0])==null?void 0:T.placement;xe&&(ne=xe);break}case"initialPlacement":ne=i;break}return{reset:{placement:ne}}}return{}}}};function ey(e,t,r,n){n===void 0&&(n=!1);const o=Qn(e),s=Vs(e),i=Jo(e)==="x",a=["left","top"].includes(o)?-1:1;let l=1;s==="end"&&(l=-1),n&&i&&(l*=-1);const u=typeof r=="function"?r(ot(he({},t),{placement:e})):r,{mainAxis:d,crossAxis:c}=typeof u=="number"?{mainAxis:u,crossAxis:0}:he({mainAxis:0,crossAxis:0},u);return i?{x:c*l,y:d*a}:{x:d*a,y:c*l}}var Ef=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){const{x:r,y:n,placement:o,rects:s,platform:i,elements:a}=t,l=ey(o,s,e,await(i.isRTL==null?void 0:i.isRTL(a.floating)));return{x:r+l.x,y:n+l.y,data:l}}}};function ty(e){return e==="x"?"y":"x"}var Tf=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:r,y:n,placement:o}=t,s=e,{mainAxis:i=!0,crossAxis:a=!1,limiter:l={fn:m=>{let{x:y,y:_}=m;return{x:y,y:_}}}}=s,u=Ou(s,["mainAxis","crossAxis","limiter"]),d={x:r,y:n},c=await Uu(t,u),p=Jo(Qn(o)),b=ty(p);let w=d[p],g=d[b];if(i){const m=p==="y"?"top":"left",y=p==="y"?"bottom":"right",_=w+c[m],x=w-c[y];w=$l(_,w,x)}if(a){const m=b==="y"?"top":"left",y=b==="y"?"bottom":"right",_=g+c[m],x=g-c[y];g=$l(_,g,x)}const f=l.fn(ot(he({},t),{[p]:w,[b]:g}));return ot(he({},f),{data:{x:f.x-r,y:f.y-n}})}}},ry=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){const{placement:r,rects:n,platform:o,elements:s}=t,i=e,{apply:a}=i,l=Ou(i,["apply"]),u=await Uu(t,l),d=Qn(r),c=Vs(r);let p,b;d==="top"||d==="bottom"?(p=d,b=c===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?"start":"end")?"left":"right"):(b=d,p=c==="end"?"top":"bottom");const w=Lr(u.left,0),g=Lr(u.right,0),f=Lr(u.top,0),m=Lr(u.bottom,0),y={height:n.floating.height-(["left","right"].includes(r)?2*(f!==0||m!==0?f+m:Lr(u.top,u.bottom)):u[p]),width:n.floating.width-(["top","bottom"].includes(r)?2*(w!==0||g!==0?w+g:Lr(u.left,u.right)):u[b])};return a==null||a(he(he({},y),n)),{reset:{rects:!0}}}}};function Nu(e){return(e==null?void 0:e.toString())==="[object Window]"}function Pr(e){if(e==null)return window;if(!Nu(e)){const t=e.ownerDocument;return t&&t.defaultView||window}return e}function Zo(e){return Pr(e).getComputedStyle(e)}function Qt(e){return Nu(e)?"":e?(e.nodeName||"").toLowerCase():""}function Mt(e){return e instanceof Pr(e).HTMLElement}function Fn(e){return e instanceof Pr(e).Element}function ny(e){return e instanceof Pr(e).Node}function Fu(e){const t=Pr(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Hs(e){const{overflow:t,overflowX:r,overflowY:n}=Zo(e);return/auto|scroll|overlay|hidden/.test(t+n+r)}function oy(e){return["table","td","th"].includes(Qt(e))}function $f(e){const t=navigator.userAgent.toLowerCase().includes("firefox"),r=Zo(e);return r.transform!=="none"||r.perspective!=="none"||r.contain==="paint"||["transform","perspective"].includes(r.willChange)||t&&r.willChange==="filter"||t&&(r.filter?r.filter!=="none":!1)}var xd=Math.min,Co=Math.max,fs=Math.round;function Gt(e,t){t===void 0&&(t=!1);const r=e.getBoundingClientRect();let n=1,o=1;return t&&Mt(e)&&(n=e.offsetWidth>0&&fs(r.width)/e.offsetWidth||1,o=e.offsetHeight>0&&fs(r.height)/e.offsetHeight||1),{width:r.width/n,height:r.height/o,top:r.top/o,right:r.right/n,bottom:r.bottom/o,left:r.left/n,x:r.left/n,y:r.top/o}}function Or(e){return((ny(e)?e.ownerDocument:e.document)||window.document).documentElement}function js(e){return Nu(e)?{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}:{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function zf(e){return Gt(Or(e)).left+js(e).scrollLeft}function iy(e){const t=Gt(e);return fs(t.width)!==e.offsetWidth||fs(t.height)!==e.offsetHeight}function sy(e,t,r){const n=Mt(t),o=Or(t),s=Gt(e,n&&iy(t));let i={scrollLeft:0,scrollTop:0};const a={x:0,y:0};if(n||!n&&r!=="fixed")if((Qt(t)!=="body"||Hs(o))&&(i=js(t)),Mt(t)){const l=Gt(t,!0);a.x=l.x+t.clientLeft,a.y=l.y+t.clientTop}else o&&(a.x=zf(o));return{x:s.left+i.scrollLeft-a.x,y:s.top+i.scrollTop-a.y,width:s.width,height:s.height}}function Ws(e){return Qt(e)==="html"?e:e.assignedSlot||e.parentNode||(Fu(e)?e.host:null)||Or(e)}function _d(e){return!Mt(e)||getComputedStyle(e).position==="fixed"?null:e.offsetParent}function ay(e){let t=Ws(e);for(Fu(t)&&(t=t.host);Mt(t)&&!["html","body"].includes(Qt(t));){if($f(t))return t;t=t.parentNode}return null}function zl(e){const t=Pr(e);let r=_d(e);for(;r&&oy(r)&&getComputedStyle(r).position==="static";)r=_d(r);return r&&(Qt(r)==="html"||Qt(r)==="body"&&getComputedStyle(r).position==="static"&&!$f(r))?t:r||ay(e)||t}function kd(e){if(Mt(e))return{width:e.offsetWidth,height:e.offsetHeight};const t=Gt(e);return{width:t.width,height:t.height}}function ly(e){let{rect:t,offsetParent:r,strategy:n}=e;const o=Mt(r),s=Or(r);if(r===s)return t;let i={scrollLeft:0,scrollTop:0};const a={x:0,y:0};if((o||!o&&n!=="fixed")&&((Qt(r)!=="body"||Hs(s))&&(i=js(r)),Mt(r))){const l=Gt(r,!0);a.x=l.x+r.clientLeft,a.y=l.y+r.clientTop}return ot(he({},t),{x:t.x-i.scrollLeft+a.x,y:t.y-i.scrollTop+a.y})}function uy(e){const t=Pr(e),r=Or(e),n=t.visualViewport;let o=r.clientWidth,s=r.clientHeight,i=0,a=0;return n&&(o=n.width,s=n.height,Math.abs(t.innerWidth/n.scale-n.width)<.01&&(i=n.offsetLeft,a=n.offsetTop)),{width:o,height:s,x:i,y:a}}function cy(e){var t;const r=Or(e),n=js(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=Co(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=Co(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0);let a=-n.scrollLeft+zf(e);const l=-n.scrollTop;return Zo(o||r).direction==="rtl"&&(a+=Co(r.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:a,y:l}}function Af(e){return["html","body","#document"].includes(Qt(e))?e.ownerDocument.body:Mt(e)&&Hs(e)?e:Af(Ws(e))}function ms(e,t){var r;t===void 0&&(t=[]);const n=Af(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),s=Pr(n),i=o?[s].concat(s.visualViewport||[],Hs(n)?n:[]):n,a=t.concat(i);return o?a:a.concat(ms(Ws(i)))}function dy(e,t){const r=t.getRootNode==null?void 0:t.getRootNode();if(e.contains(t))return!0;if(r&&Fu(r)){let n=t;do{if(n&&e===n)return!0;n=n.parentNode||n.host}while(n)}return!1}function hy(e){const t=Gt(e),r=t.top+e.clientTop,n=t.left+e.clientLeft;return{top:r,left:n,x:n,y:r,right:n+e.clientWidth,bottom:r+e.clientHeight,width:e.clientWidth,height:e.clientHeight}}function Sd(e,t){return t==="viewport"?hs(uy(e)):Fn(t)?hy(t):hs(cy(Or(e)))}function py(e){const t=ms(Ws(e)),n=["absolute","fixed"].includes(Zo(e).position)&&Mt(e)?zl(e):e;return Fn(n)?t.filter(o=>Fn(o)&&dy(o,n)&&Qt(o)!=="body"):[]}function fy(e){let{element:t,boundary:r,rootBoundary:n}=e;const s=[...r==="clippingAncestors"?py(t):[].concat(r),n],i=s[0],a=s.reduce((l,u)=>{const d=Sd(t,u);return l.top=Co(d.top,l.top),l.right=xd(d.right,l.right),l.bottom=xd(d.bottom,l.bottom),l.left=Co(d.left,l.left),l},Sd(t,i));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}var my={getClippingRect:fy,convertOffsetParentRelativeRectToViewportRelativeRect:ly,isElement:Fn,getDimensions:kd,getOffsetParent:zl,getDocumentElement:Or,getElementRects:e=>{let{reference:t,floating:r,strategy:n}=e;return{reference:sy(t,zl(r),n),floating:ot(he({},kd(r)),{x:0,y:0})}},getClientRects:e=>Array.from(e.getClientRects()),isRTL:e=>Zo(e).direction==="rtl"};function Pf(e,t,r,n){n===void 0&&(n={});const{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:i=!0,animationFrame:a=!1}=n;let l=!1;const u=o&&!a,d=s&&!a,c=i&&!a,p=u||d?[...Fn(e)?ms(e):[],...ms(t)]:[];p.forEach(m=>{u&&m.addEventListener("scroll",r,{passive:!0}),d&&m.addEventListener("resize",r)});let b=null;c&&(b=new ResizeObserver(r),Fn(e)&&b.observe(e),b.observe(t));let w,g=a?Gt(e):null;a&&f();function f(){if(l)return;const m=Gt(e);g&&(m.x!==g.x||m.y!==g.y||m.width!==g.width||m.height!==g.height)&&r(),g=m,w=requestAnimationFrame(f)}return()=>{var m;l=!0,p.forEach(y=>{u&&y.removeEventListener("scroll",r),d&&y.removeEventListener("resize",r)}),(m=b)==null||m.disconnect(),b=null,a&&cancelAnimationFrame(w)}}var Of=(e,t,r)=>Kv(e,t,he({platform:my},r));function Ee(e,t,r){return new Promise(n=>{if((r==null?void 0:r.duration)===1/0)throw new Error("Promise-based animations must be finite.");const o=e.animate(t,ot(he({},r),{duration:gy()?0:r.duration}));o.addEventListener("cancel",n,{once:!0}),o.addEventListener("finish",n,{once:!0})})}function Cd(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?parseFloat(e)*1e3:parseFloat(e)}function gy(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Le(e){return Promise.all(e.getAnimations().map(t=>new Promise(r=>{const n=requestAnimationFrame(r);t.addEventListener("cancel",()=>n,{once:!0}),t.addEventListener("finish",()=>n,{once:!0}),t.cancel()})))}function Ed(e,t){return e.map(r=>ot(he({},r),{height:r.height==="auto"?`${t}px`:r.height}))}var Df=new Map,vy=new WeakMap;function yy(e){return e!=null?e:{keyframes:[],options:{duration:0}}}function pe(e,t){Df.set(e,yy(t))}function Te(e,t){const r=vy.get(e);if(r!=null&&r[t])return r[t];const n=Df.get(t);return n||{keyframes:[],options:{duration:0}}}var ze=class extends U{constructor(){super(...arguments);this.content="",this.placement="top",this.disabled=!1,this.distance=10,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleBlur=this.handleBlur.bind(this),this.handleClick=this.handleClick.bind(this),this.handleFocus=this.handleFocus.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleMouseOver=this.handleMouseOver.bind(this),this.handleMouseOut=this.handleMouseOut.bind(this),this.updateComplete.then(()=>{this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),this.target=this.getTarget()})}async firstUpdated(){this.tooltip.hidden=!this.open,this.open&&(await this.updateComplete,this.updatePositioner())}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("blur",this.handleBlur,!0),this.removeEventListener("focus",this.handleFocus,!0),this.removeEventListener("click",this.handleClick),this.removeEventListener("keydown",this.handleKeyDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.stopPositioner()}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}getTarget(){const e=[...this.children].find(t=>t.tagName.toLowerCase()!=="style"&&t.getAttribute("slot")!=="content");if(!e)throw new Error("Invalid tooltip target: no child element was found.");return e}handleBlur(){this.hasTrigger("focus")&&this.hide()}handleClick(){this.hasTrigger("click")&&(this.open?this.hide():this.show())}handleFocus(){this.hasTrigger("focus")&&this.show()}handleKeyDown(e){this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide())}handleMouseOver(){if(this.hasTrigger("hover")){const e=Cd(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>void this.show(),e)}}handleMouseOut(){if(this.hasTrigger("hover")){const e=Cd(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>void this.hide(),e)}}async handleOpenChange(){if(!this.disabled)if(this.open){P(this,"sl-show"),await Le(this.tooltip),this.startPositioner(),this.tooltip.hidden=!1;const{keyframes:e,options:t}=Te(this,"tooltip.show");await Ee(this.tooltip,e,t),P(this,"sl-after-show")}else{P(this,"sl-hide"),await Le(this.tooltip);const{keyframes:e,options:t}=Te(this,"tooltip.hide");await Ee(this.tooltip,e,t),this.tooltip.hidden=!0,this.stopPositioner(),P(this,"sl-after-hide")}}handleOptionsChange(){this.updatePositioner()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}hasTrigger(e){return this.trigger.split(" ").includes(e)}startPositioner(){this.stopPositioner(),this.updatePositioner(),this.positionerCleanup=Pf(this.target,this.positioner,this.updatePositioner.bind(this))}updatePositioner(){!this.open||!this.target||!this.positioner||Of(this.target,this.positioner,{placement:this.placement,middleware:[Ef({mainAxis:this.distance,crossAxis:this.skidding}),Cf(),Tf(),qv({element:this.arrow,padding:10})],strategy:this.hoist?"fixed":"absolute"}).then(({x:e,y:t,middlewareData:r,placement:n})=>{const o=r.arrow.x,s=r.arrow.y,i={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];this.positioner.setAttribute("data-placement",n),Object.assign(this.positioner.style,{position:this.hoist?"fixed":"absolute",left:`${e}px`,top:`${t}px`}),Object.assign(this.arrow.style,{left:typeof o=="number"?`${o}px`:"",top:typeof s=="number"?`${s}px`:"",right:"",bottom:"",[i]:"calc(var(--sl-tooltip-arrow-size) * -1)"})})}stopPositioner(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=void 0,this.positioner.removeAttribute("data-placement"))}render(){return O`
      <div class="tooltip-target" aria-describedby="tooltip">
        <slot></slot>
      </div>

      <div class="tooltip-positioner">
        <div
          part="base"
          id="tooltip"
          class=${Z({tooltip:!0,"tooltip--open":this.open})}
          role="tooltip"
          aria-hidden=${this.open?"false":"true"}
        >
          <div class="tooltip__arrow"></div>
          <div class="tooltip__content">
            <slot name="content"> ${this.content} </slot>
          </div>
        </div>
      </div>
    `}};ze.styles=Wv;h([K(".tooltip-positioner")],ze.prototype,"positioner",2);h([K(".tooltip")],ze.prototype,"tooltip",2);h([K(".tooltip__arrow")],ze.prototype,"arrow",2);h([v()],ze.prototype,"content",2);h([v()],ze.prototype,"placement",2);h([v({type:Boolean,reflect:!0})],ze.prototype,"disabled",2);h([v({type:Number})],ze.prototype,"distance",2);h([v({type:Boolean,reflect:!0})],ze.prototype,"open",2);h([v({type:Number})],ze.prototype,"skidding",2);h([v()],ze.prototype,"trigger",2);h([v({type:Boolean})],ze.prototype,"hoist",2);h([R("open",{waitUntilFirstUpdate:!0})],ze.prototype,"handleOpenChange",1);h([R("content"),R("distance"),R("hoist"),R("placement"),R("skidding")],ze.prototype,"handleOptionsChange",1);h([R("disabled")],ze.prototype,"handleDisabledChange",1);ze=h([H("sl-tooltip")],ze);pe("tooltip.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:150,easing:"ease"}});pe("tooltip.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:150,easing:"ease"}});j(V,"sl-tooltip",ze,{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"});var by=X`
  ${Y}
  ${Bs}

  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled${Q}::-webkit-slider-thumb {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled${Q}::-moz-range-thumb {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control${Q} {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 1px;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    margin-left: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }
`,we=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this),this.hasSlotController=new Ct(this,"help-text","label"),this.hasFocus=!1,this.hasTooltip=!1,this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.invalid=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=e=>e.toString()}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value||(this.value=this.min),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}focus(e){this.input.focus(e)}blur(){this.input.blur()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}handleInput(){this.value=parseFloat(this.input.value),P(this,"sl-change"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,P(this,"sl-blur")}handleValueChange(){this.invalid=!this.input.checkValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,P(this,"sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncRange(){const e=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(e),this.tooltip!=="none"&&this.syncTooltip(e)}syncProgress(e){this.input.style.background=`linear-gradient(to right, var(--track-color-active) 0%, var(--track-color-active) ${e*100}%, var(--track-color-inactive) ${e*100}%, var(--track-color-inactive) 100%)`}syncTooltip(e){if(this.output!==null){const t=this.input.offsetWidth,r=this.output.offsetWidth,n=getComputedStyle(this.input).getPropertyValue("--thumb-size"),o=`calc(${t*e}px - calc(calc(${e} * ${n}) - calc(${n} / 2)))`;this.output.style.transform=`translateX(${o})`,this.output.style.marginLeft=`-${r/2}px`}}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),r=this.label?!0:!!e,n=this.helpText?!0:!!t;return O`
      <div
        part="form-control"
        class=${Z({"form-control":!0,"form-control--medium":!0,"form-control--has-label":r,"form-control--has-help-text":n})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Z({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              type="range"
              class="range__control"
              name=${M(this.name)}
              ?disabled=${this.disabled}
              min=${M(this.min)}
              max=${M(this.max)}
              step=${M(this.step)}
              .value=${_r(this.value.toString())}
              aria-describedby="help-text"
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?O`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${n?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};we.styles=by;h([K(".range__control")],we.prototype,"input",2);h([K(".range__tooltip")],we.prototype,"output",2);h([se()],we.prototype,"hasFocus",2);h([se()],we.prototype,"hasTooltip",2);h([v()],we.prototype,"name",2);h([v({type:Number})],we.prototype,"value",2);h([v()],we.prototype,"label",2);h([v({attribute:"help-text"})],we.prototype,"helpText",2);h([v({type:Boolean,reflect:!0})],we.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],we.prototype,"invalid",2);h([v({type:Number})],we.prototype,"min",2);h([v({type:Number})],we.prototype,"max",2);h([v({type:Number})],we.prototype,"step",2);h([v()],we.prototype,"tooltip",2);h([v({attribute:!1})],we.prototype,"tooltipFormatter",2);h([R("value",{waitUntilFirstUpdate:!0})],we.prototype,"handleValueChange",1);h([R("disabled",{waitUntilFirstUpdate:!0})],we.prototype,"handleDisabledChange",1);we=h([H("sl-range")],we);j(V,"sl-range",we,{onSlChange:"sl-change",onSlBlur:"sl-blur",onSlFocus:"sl-focus"});var wy=X`
  ${Y}

  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating${Q} {
    box-shadow: var(--sl-focus-ring);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbols--indicator {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--symbol-color-active);
    pointer-events: none;
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) transform;
  }

  .rating__symbol--hover {
    transform: scale(1.2);
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    transform: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }
`,et=Go(class extends Fs{constructor(e){var t;if(super(e),e.type!==Wt.ATTRIBUTE||e.name!=="style"||((t=e.strings)===null||t===void 0?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,r)=>{const n=e[r];return n==null?t:t+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(e,[t]){const{style:r}=e.element;if(this.ct===void 0){this.ct=new Set;for(const n in t)this.ct.add(n);return this.render(t)}this.ct.forEach(n=>{t[n]==null&&(this.ct.delete(n),n.includes("-")?r.removeProperty(n):r[n]="")});for(const n in t){const o=t[n];o!=null&&(this.ct.add(n),n.includes("-")?r.setProperty(n,o):r[n]=o)}return tt}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var xy={name:"default",resolver:e=>`${yg()}/assets/icons/${e}.svg`},_y=xy,Td={"check-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,x:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},ky={name:"system",resolver:e=>e in Td?`data:image/svg+xml,${encodeURIComponent(Td[e])}`:""},Sy=ky,Cy=[_y,Sy],Al=[];function Ey(e){Al.push(e)}function Ty(e){Al=Al.filter(t=>t!==e)}function $d(e){return Cy.find(t=>t.name===e)}var ya=new Map;function If(e,t="cors"){if(ya.has(e))return ya.get(e);const r=fetch(e,{mode:t}).then(async n=>({ok:n.ok,status:n.status,html:await n.text()}));return ya.set(e,r),r}var ba=new Map;async function $y(e){if(ba.has(e))return ba.get(e);const t=await If(e),r={ok:t.ok,status:t.status,svg:null};if(t.ok){const n=document.createElement("div");n.innerHTML=t.html;const o=n.firstElementChild;r.svg=(o==null?void 0:o.tagName.toLowerCase())==="svg"?o.outerHTML:""}return ba.set(e,r),r}var zy=X`
  ${Y}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,gs=class extends Fs{constructor(e){if(super(e),this.it=ve,e.type!==Wt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ve||e==null)return this.vt=void 0,this.it=e;if(e===tt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.vt;this.it=e;const t=[e];return t.raw=t,this.vt={_$litType$:this.constructor.resultType,strings:t,values:[]}}};gs.directiveName="unsafeHTML",gs.resultType=1;var zd=Go(gs),Pl=class extends gs{};Pl.directiveName="unsafeSVG",Pl.resultType=2;var Ay=Go(Pl),Py=new DOMParser,Lt=class extends U{constructor(){super(...arguments);this.svg="",this.label="",this.library="default"}connectedCallback(){super.connectedCallback(),Ey(this)}firstUpdated(){this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Ty(this)}getUrl(){const e=$d(this.library);return this.name&&e?e.resolver(this.name):this.src}redraw(){this.setIcon()}async setIcon(){var e;const t=$d(this.library),r=this.getUrl();if(r)try{const n=await $y(r);if(r!==this.getUrl())return;if(n.ok){const s=Py.parseFromString(n.svg,"text/html").body.querySelector("svg");s!==null?((e=t==null?void 0:t.mutator)==null||e.call(t,s),this.svg=s.outerHTML,P(this,"sl-load")):(this.svg="",P(this,"sl-error"))}else this.svg="",P(this,"sl-error")}catch{P(this,"sl-error")}else this.svg.length>0&&(this.svg="")}handleChange(){this.setIcon()}render(){const e=typeof this.label=="string"&&this.label.length>0;return O` <div
      part="base"
      class="icon"
      role=${M(e?"img":void 0)}
      aria-label=${M(e?this.label:void 0)}
      aria-hidden=${M(e?void 0:"true")}
    >
      ${Ay(this.svg)}
    </div>`}};Lt.styles=zy;h([se()],Lt.prototype,"svg",2);h([v()],Lt.prototype,"name",2);h([v()],Lt.prototype,"src",2);h([v()],Lt.prototype,"label",2);h([v()],Lt.prototype,"library",2);h([R("name"),R("src"),R("library")],Lt.prototype,"setIcon",1);Lt=h([H("sl-icon")],Lt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var qe=class extends U{constructor(){super(...arguments);this.hoverValue=0,this.isHovering=!1,this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}focus(e){this.rating.focus(e)}blur(){this.rating.blur()}getValueFromMousePosition(e){return this.getValueFromXCoordinate(e.clientX)}getValueFromTouchPosition(e){return this.getValueFromXCoordinate(e.touches[0].clientX)}getValueFromXCoordinate(e){const t=this.rating.getBoundingClientRect().left,r=this.rating.getBoundingClientRect().width;return Ae(this.roundToPrecision((e-t)/r*this.max,this.precision),0,this.max)}handleClick(e){this.setValue(this.getValueFromMousePosition(e))}setValue(e){this.disabled||this.readonly||(this.value=e===this.value?0:e,this.isHovering=!1)}handleKeyDown(e){if(!(this.disabled||this.readonly)){if(e.key==="ArrowLeft"){const t=e.shiftKey?1:this.precision;this.value=Math.max(0,this.value-t),e.preventDefault()}if(e.key==="ArrowRight"){const t=e.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+t),e.preventDefault()}e.key==="Home"&&(this.value=0,e.preventDefault()),e.key==="End"&&(this.value=this.max,e.preventDefault())}}handleMouseEnter(){this.isHovering=!0}handleMouseMove(e){this.hoverValue=this.getValueFromMousePosition(e)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(e){this.hoverValue=this.getValueFromTouchPosition(e),e.preventDefault()}handleTouchMove(e){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(e)}handleTouchEnd(e){this.isHovering=!1,this.setValue(this.hoverValue),e.preventDefault()}handleValueChange(){P(this,"sl-change")}roundToPrecision(e,t=.5){const r=1/t;return Math.ceil(e*r)/r}render(){const e=Array.from(Array(this.max).keys());let t=0;return this.disabled||this.readonly?t=this.value:t=this.isHovering?this.hoverValue:this.value,O`
      <div
        part="base"
        class=${Z({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${e.map(r=>O`
              <span
                class=${Z({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(t)===r+1})}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${zd(this.getSymbol(r+1))}
              </span>
            `)}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${e.map(r=>O`
              <span
                class=${Z({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(t)===r+1})}
                style=${et({clipPath:t>r+1?"none":`inset(0 ${100-(t-r)/1*100}% 0 0)`})}
                role="presentation"
              >
                ${zd(this.getSymbol(r+1))}
              </span>
            `)}
        </span>
      </div>
    `}};qe.styles=wy;h([K(".rating")],qe.prototype,"rating",2);h([se()],qe.prototype,"hoverValue",2);h([se()],qe.prototype,"isHovering",2);h([v({type:Number})],qe.prototype,"value",2);h([v({type:Number})],qe.prototype,"max",2);h([v({type:Number})],qe.prototype,"precision",2);h([v({type:Boolean,reflect:!0})],qe.prototype,"readonly",2);h([v({type:Boolean,reflect:!0})],qe.prototype,"disabled",2);h([v()],qe.prototype,"getSymbol",2);h([R("value",{waitUntilFirstUpdate:!0})],qe.prototype,"handleValueChange",1);qe=h([H("sl-rating")],qe);j(V,"sl-rating",qe,{onSlChange:"sl-change"});var Oy=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],wt=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.isoTime="",this.relativeTime="",this.titleTime="",this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const e=new Date,t=new Date(this.date);if(isNaN(t.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const r=t.getTime()-e.getTime(),{unit:n,value:o}=Oy.find(s=>Math.abs(r)<s.max);if(this.isoTime=t.toISOString(),this.titleTime=this.localize.date(t,{month:"long",year:"numeric",day:"numeric",hour:"numeric",minute:"numeric",timeZoneName:"short"}),this.relativeTime=this.localize.relativeTime(Math.round(r/o),n,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let s;n==="minute"?s=di("second"):n==="hour"?s=di("minute"):n==="day"?s=di("hour"):s=di("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),s)}return O` <time datetime=${this.isoTime} title=${this.titleTime}>${this.relativeTime}</time> `}};h([se()],wt.prototype,"isoTime",2);h([se()],wt.prototype,"relativeTime",2);h([se()],wt.prototype,"titleTime",2);h([v()],wt.prototype,"date",2);h([v()],wt.prototype,"lang",2);h([v()],wt.prototype,"format",2);h([v()],wt.prototype,"numeric",2);h([v({type:Boolean})],wt.prototype,"sync",2);wt=h([H("sl-relative-time")],wt);function di(e){const r={second:1e3,minute:6e4,hour:36e5,day:864e5}[e];return r-Date.now()%r}j(V,"sl-relative-time",wt,{});var Dy=X`
  ${Y}

  :host {
    display: contents;
  }
`,Bn=class extends U{constructor(){super(...arguments);this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{P(this,"sl-resize",{detail:{entries:e}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const e=this.shadowRoot.querySelector("slot");if(e!==null){const t=e.assignedElements({flatten:!0});this.observedElements.forEach(r=>this.resizeObserver.unobserve(r)),this.observedElements=[],t.forEach(r=>{this.resizeObserver.observe(r),this.observedElements.push(r)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return O` <slot @slotchange=${this.handleSlotChange}></slot> `}};Bn.styles=Dy;h([v({type:Boolean,reflect:!0})],Bn.prototype,"disabled",2);h([R("disabled",{waitUntilFirstUpdate:!0})],Bn.prototype,"handleDisabledChange",1);Bn=h([H("sl-resize-observer")],Bn);j(V,"sl-resize-observer",Bn,{onSlResize:"sl-resize"});var Iy=X`
  ${Y}

  :host {
    display: block;
  }

  .responsive-media {
    position: relative;
  }

  .responsive-media ::slotted(*) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  .responsive-media--cover ::slotted(embed),
  .responsive-media--cover ::slotted(iframe),
  .responsive-media--cover ::slotted(img),
  .responsive-media--cover ::slotted(video) {
    object-fit: cover !important;
  }

  .responsive-media--contain ::slotted(embed),
  .responsive-media--contain ::slotted(iframe),
  .responsive-media--contain ::slotted(img),
  .responsive-media--contain ::slotted(video) {
    object-fit: contain !important;
  }
`,Vn=class extends U{constructor(){super(...arguments);this.aspectRatio="16:9",this.fit="cover"}render(){const e=this.aspectRatio.split(":"),t=parseFloat(e[0]),r=parseFloat(e[1]),n=!isNaN(t)&&!isNaN(r)&&t>0&&r>0?`${r/t*100}%`:"0";return O`
      <div
        class=${Z({"responsive-media":!0,"responsive-media--cover":this.fit==="cover","responsive-media--contain":this.fit==="contain"})}
        style="padding-bottom: ${n}"
      >
        <slot></slot>
      </div>
    `}};Vn.styles=Iy;h([v({attribute:"aspect-ratio"})],Vn.prototype,"aspectRatio",2);h([v()],Vn.prototype,"fit",2);Vn=h([H("sl-responsive-media")],Vn);j(V,"sl-responsive-media",Vn,{});var Ry=X`
  ${Y}
  ${Bs}

  :host {
    display: block;
  }

  .select {
    display: block;
  }

  .select__control {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .select__menu {
    max-height: 50vh;
    overflow: auto;
  }

  /* Standard selects */
  .select--standard .select__control {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    color: var(--sl-input-color);
  }

  .select--standard:not(.select--disabled) .select__control:hover {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
    color: var(--sl-input-color-hover);
  }

  .select--standard.select--focused:not(.select--disabled) .select__control {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
    outline: none;
    color: var(--sl-input-color-focus);
  }

  .select--standard.select--disabled .select__control {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  /* Filled selects */
  .select--filled .select__control {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__control {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--focused:not(.select--disabled) .select__control {
    outline: none;
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .select--filled.select--disabled .select__control {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--disabled .select__tags,
  .select--disabled .select__clear {
    pointer-events: none;
  }

  .select__prefix {
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__label {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    user-select: none;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .select__label::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .select__clear {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    width: 1.25em;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__suffix {
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__icon {
    flex: 0 0 auto;
    display: inline-flex;
    transition: var(--sl-transition-medium) transform ease;
  }

  .select--open .select__icon {
    transform: rotate(-180deg);
  }

  /* Placeholder */
  .select--placeholder-visible .select__label {
    color: var(--sl-input-placeholder-color);
  }

  .select--disabled.select--placeholder-visible .select__label {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Tags */
  .select__tags {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: left;
    margin-left: var(--sl-spacing-2x-small);
  }

  /* Hidden input (for form control validation to show) */
  .select__hidden-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }

  /*
   * Size modifiers
   */

  /* Small */
  .select--small .select__control {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
  }

  .select--small .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-small);
  }

  .select--small .select__label {
    margin: 0 var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__icon {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__tags {
    padding-bottom: 2px;
  }

  .select--small .select__tags sl-tag {
    padding-top: 2px;
  }

  .select--small .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--small.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Medium */
  .select--medium .select__control {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
  }

  .select--medium .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-medium);
  }

  .select--medium .select__label {
    margin: 0 var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__icon {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__tags {
    padding-bottom: 3px;
  }

  .select--medium .select__tags sl-tag {
    padding-top: 3px;
  }

  .select--medium .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--medium.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Large */
  .select--large .select__control {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
  }

  .select--large .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-large);
  }

  .select--large .select__label {
    margin: 0 var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__icon {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__tags {
    padding-bottom: 4px;
  }
  .select--large .select__tags sl-tag {
    padding-top: 4px;
  }

  .select--large .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--large.select--has-tags .select__label {
    margin-left: 0;
  }

  /*
   * Pill modifier
   */
  .select--pill.select--small .select__control {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__control {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__control {
    border-radius: var(--sl-input-height-large);
  }
`,oe=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this),this.hasSlotController=new Ct(this,"help-text","label"),this.hasFocus=!1,this.isOpen=!1,this.displayLabel="",this.displayTags=[],this.multiple=!1,this.maxTagsVisible=3,this.disabled=!1,this.name="",this.placeholder="",this.size="medium",this.hoist=!1,this.value="",this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.required=!1,this.clearable=!1,this.invalid=!1}connectedCallback(){super.connectedCallback(),this.handleMenuSlotChange=this.handleMenuSlotChange.bind(this),this.resizeObserver=new ResizeObserver(()=>this.resizeMenu()),this.updateComplete.then(()=>{this.resizeObserver.observe(this),this.syncItemsFromValue()})}firstUpdated(){this.invalid=!this.input.checkValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this)}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}getItemLabel(e){const t=e.shadowRoot.querySelector("slot:not([name])");return kf(t)}getItems(){return[...this.querySelectorAll("sl-menu-item")]}getValueAsArray(){return this.multiple&&this.value===""?[]:Array.isArray(this.value)?this.value:[this.value]}focus(e){this.control.focus(e)}blur(){this.control.blur()}handleBlur(){this.isOpen||(this.hasFocus=!1,P(this,"sl-blur"))}handleClearClick(e){e.stopPropagation(),this.value=this.multiple?[]:"",P(this,"sl-clear"),this.syncItemsFromValue()}handleDisabledChange(){this.disabled&&this.isOpen&&this.dropdown.hide(),this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus||(this.hasFocus=!0,P(this,"sl-focus"))}handleKeyDown(e){const t=e.target,r=this.getItems(),n=r[0],o=r[r.length-1];if(t.tagName.toLowerCase()!=="sl-tag"){if(e.key==="Tab"){this.isOpen&&this.dropdown.hide();return}if(["ArrowDown","ArrowUp"].includes(e.key)){if(e.preventDefault(),this.isOpen||this.dropdown.show(),e.key==="ArrowDown"){this.menu.setCurrentItem(n),n.focus();return}if(e.key==="ArrowUp"){this.menu.setCurrentItem(o),o.focus();return}}e.ctrlKey||e.metaKey||!this.isOpen&&e.key.length===1&&(e.stopPropagation(),e.preventDefault(),this.dropdown.show(),this.menu.typeToSelect(e))}}handleLabelClick(){this.focus()}handleMenuSelect(e){const t=e.detail.item;this.multiple?this.value=this.value.includes(t.value)?this.value.filter(r=>r!==t.value):[...this.value,t.value]:this.value=t.value,this.syncItemsFromValue()}handleMenuShow(){this.resizeMenu(),this.isOpen=!0}handleMenuHide(){this.isOpen=!1,this.control.focus()}handleMultipleChange(){var e;const t=this.getValueAsArray();this.value=this.multiple?t:(e=t[0])!=null?e:"",this.syncItemsFromValue()}async handleMenuSlotChange(){const e=this.getItems(),t=[];e.forEach(r=>{t.includes(r.value)&&console.error(`Duplicate value found in <sl-select> menu item: '${r.value}'`,r),t.push(r.value)}),await Promise.all(e.map(r=>r.render)).then(()=>this.syncItemsFromValue())}handleTagInteraction(e){e.composedPath().find(n=>n instanceof HTMLElement?n.classList.contains("tag__remove"):!1)&&e.stopPropagation()}async handleValueChange(){this.syncItemsFromValue(),await this.updateComplete,this.invalid=!this.input.checkValidity(),P(this,"sl-change")}resizeMenu(){this.menu.style.width=`${this.control.clientWidth}px`,this.dropdown.reposition()}syncItemsFromValue(){const e=this.getItems(),t=this.getValueAsArray();if(e.map(r=>r.checked=t.includes(r.value)),this.multiple){const r=e.filter(n=>t.includes(n.value));if(this.displayLabel=r.length>0?this.getItemLabel(r[0]):"",this.displayTags=r.map(n=>O`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
            ?pill=${this.pill}
            removable
            @click=${this.handleTagInteraction}
            @keydown=${this.handleTagInteraction}
            @sl-remove=${o=>{o.stopPropagation(),this.disabled||(n.checked=!1,this.syncValueFromItems())}}
          >
            ${this.getItemLabel(n)}
          </sl-tag>
        `),this.maxTagsVisible>0&&this.displayTags.length>this.maxTagsVisible){const n=this.displayTags.length;this.displayLabel="",this.displayTags=this.displayTags.slice(0,this.maxTagsVisible),this.displayTags.push(O`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
          >
            +${n-this.maxTagsVisible}
          </sl-tag>
        `)}}else{const r=e.find(n=>n.value===t[0]);this.displayLabel=r?this.getItemLabel(r):"",this.displayTags=[]}}syncValueFromItems(){const r=this.getItems().filter(n=>n.checked).map(n=>n.value);this.multiple?this.value=this.value.filter(n=>r.includes(n)):this.value=r.length>0?r[0]:""}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),r=this.multiple?this.value.length>0:this.value!=="",n=this.label?!0:!!e,o=this.helpText?!0:!!t;return O`
      <div
        part="form-control"
        class=${Z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":n,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${n?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-dropdown
            part="base"
            .hoist=${this.hoist}
            .placement=${this.placement}
            .stayOpenOnSelect=${this.multiple}
            .containingElement=${this}
            ?disabled=${this.disabled}
            class=${Z({select:!0,"select--open":this.isOpen,"select--empty":this.value.length===0,"select--focused":this.hasFocus,"select--clearable":this.clearable,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--standard":!this.filled,"select--filled":this.filled,"select--has-tags":this.multiple&&this.displayTags.length>0,"select--placeholder-visible":this.displayLabel==="","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large","select--pill":this.pill,"select--invalid":this.invalid})}
            @sl-show=${this.handleMenuShow}
            @sl-hide=${this.handleMenuHide}
          >
            <div
              part="control"
              slot="trigger"
              id="input"
              class="select__control"
              role="combobox"
              aria-describedby="help-text"
              aria-haspopup="true"
              aria-disabled=${this.disabled?"true":"false"}
              aria-expanded=${this.isOpen?"true":"false"}
              aria-controls="menu"
              tabindex=${this.disabled?"-1":"0"}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            >
              <span part="prefix" class="select__prefix">
                <slot name="prefix"></slot>
              </span>

              <div part="display-label" class="select__label">
                ${this.displayTags.length>0?O` <span part="tags" class="select__tags"> ${this.displayTags} </span> `:this.displayLabel.length>0?this.displayLabel:this.placeholder}
              </div>

              ${this.clearable&&r?O`
                    <button part="clear-button" class="select__clear" @click=${this.handleClearClick} tabindex="-1">
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <span part="suffix" class="select__suffix">
                <slot name="suffix"></slot>
              </span>

              <span part="icon" class="select__icon" aria-hidden="true">
                <sl-icon name="chevron-down" library="system"></sl-icon>
              </span>

              <!-- The hidden input tricks the browser's built-in validation so it works as expected. We use an input
              instead of a select because, otherwise, iOS will show a list of options during validation. The focus
              handler is used to move focus to the primary control when it's marked invalid.  -->
              <input
                class="select__hidden-select"
                aria-hidden="true"
                ?required=${this.required}
                .value=${r?"1":""}
                tabindex="-1"
                @focus=${()=>this.control.focus()}
              />
            </div>

            <sl-menu part="menu" id="menu" class="select__menu" @sl-select=${this.handleMenuSelect}>
              <slot @slotchange=${this.handleMenuSlotChange}></slot>
            </sl-menu>
          </sl-dropdown>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};oe.styles=Ry;h([K(".select")],oe.prototype,"dropdown",2);h([K(".select__control")],oe.prototype,"control",2);h([K(".select__hidden-select")],oe.prototype,"input",2);h([K(".select__menu")],oe.prototype,"menu",2);h([se()],oe.prototype,"hasFocus",2);h([se()],oe.prototype,"isOpen",2);h([se()],oe.prototype,"displayLabel",2);h([se()],oe.prototype,"displayTags",2);h([v({type:Boolean,reflect:!0})],oe.prototype,"multiple",2);h([v({attribute:"max-tags-visible",type:Number})],oe.prototype,"maxTagsVisible",2);h([v({type:Boolean,reflect:!0})],oe.prototype,"disabled",2);h([v()],oe.prototype,"name",2);h([v()],oe.prototype,"placeholder",2);h([v()],oe.prototype,"size",2);h([v({type:Boolean})],oe.prototype,"hoist",2);h([v()],oe.prototype,"value",2);h([v({type:Boolean,reflect:!0})],oe.prototype,"filled",2);h([v({type:Boolean,reflect:!0})],oe.prototype,"pill",2);h([v()],oe.prototype,"label",2);h([v()],oe.prototype,"placement",2);h([v({attribute:"help-text"})],oe.prototype,"helpText",2);h([v({type:Boolean,reflect:!0})],oe.prototype,"required",2);h([v({type:Boolean})],oe.prototype,"clearable",2);h([v({type:Boolean,reflect:!0})],oe.prototype,"invalid",2);h([R("disabled",{waitUntilFirstUpdate:!0})],oe.prototype,"handleDisabledChange",1);h([R("multiple")],oe.prototype,"handleMultipleChange",1);h([R("value",{waitUntilFirstUpdate:!0})],oe.prototype,"handleValueChange",1);oe=h([H("sl-select")],oe);j(V,"sl-select",oe,{onSlClear:"sl-clear",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlBlur:"sl-blur"});var My=X`
  ${Y}

  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,Fo=class extends U{constructor(){super(...arguments);this.effect="none"}render(){return O`
      <div
        part="base"
        class=${Z({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
        aria-busy="true"
        aria-live="polite"
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};Fo.styles=My;h([v()],Fo.prototype,"effect",2);Fo=h([H("sl-skeleton")],Fo);j(V,"sl-skeleton",Fo,{});var Ly=X`
  ${Y}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,vs=class extends U{render(){return O`
      <svg part="base" class="spinner" role="status">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};vs.styles=Ly;vs=h([H("sl-spinner")],vs);j(V,"sl-spinner",vs,{});var Uy=X`
  ${Y}

  :host {
    display: block;
  }

  .menu-label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
  }
`,ys=class extends U{render(){return O`
      <div part="base" class="menu-label">
        <slot></slot>
      </div>
    `}};ys.styles=Uy;ys=h([H("sl-menu-label")],ys);j(V,"sl-menu-label",ys,{});var Ny=X`
  ${Y}

  :host {
    display: contents;
  }
`,ft=class extends U{constructor(){super(...arguments);this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.handleMutation=this.handleMutation.bind(this),this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver()}disconnectedCallback(){this.stopObserver()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}handleMutation(e){P(this,"sl-mutation",{detail:{mutationList:e}})}startObserver(){const e=typeof this.attr=="string"&&this.attr.length>0,t=e&&this.attr!=="*"?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:e,attributeFilter:t,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}render(){return O` <slot></slot> `}};ft.styles=Ny;h([v({reflect:!0})],ft.prototype,"attr",2);h([v({attribute:"attr-old-value",type:Boolean,reflect:!0})],ft.prototype,"attrOldValue",2);h([v({attribute:"char-data",type:Boolean,reflect:!0})],ft.prototype,"charData",2);h([v({attribute:"char-data-old-value",type:Boolean,reflect:!0})],ft.prototype,"charDataOldValue",2);h([v({attribute:"child-list",type:Boolean,reflect:!0})],ft.prototype,"childList",2);h([v({type:Boolean,reflect:!0})],ft.prototype,"disabled",2);h([R("disabled")],ft.prototype,"handleDisabledChange",1);h([R("attr",{waitUntilFirstUpdate:!0}),R("attr-old-value",{waitUntilFirstUpdate:!0}),R("char-data",{waitUntilFirstUpdate:!0}),R("char-data-old-value",{waitUntilFirstUpdate:!0}),R("childList",{waitUntilFirstUpdate:!0})],ft.prototype,"handleChange",1);ft=h([H("sl-mutation-observer")],ft);j(V,"sl-mutation-observer",ft,{onSlMutation:"sl-mutation"});var Fy=X`
  ${Y}

  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition: 400ms width, 400ms background-color;
    user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }
`,Sr=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return O`
      <div
        part="base"
        class=${Z({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate})}
        role="progressbar"
        title=${M(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${et({width:`${this.value}%`})}>
          ${this.indeterminate?"":O`
                <span part="label" class="progress-bar__label">
                  <slot></slot>
                </span>
              `}
        </div>
      </div>
    `}};Sr.styles=Fy;h([v({type:Number,reflect:!0})],Sr.prototype,"value",2);h([v({type:Boolean,reflect:!0})],Sr.prototype,"indeterminate",2);h([v()],Sr.prototype,"label",2);h([v()],Sr.prototype,"lang",2);Sr=h([H("sl-progress-bar")],Sr);j(V,"sl-progress-bar",Sr,{});var By=X`
  ${Y}

  :host {
    --size: 128px;
    --track-width: 4px;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    width: var(--size);
    height: var(--size);
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    stroke-width: var(--track-width);
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .progress-ring__track {
    stroke: var(--track-color);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    transition: 0.35s stroke-dashoffset;
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
  }
`,Jt=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.value=0,this.label=""}updated(e){if(super.updated(e),e.has("percentage")){const t=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),r=2*Math.PI*t,n=r-this.value/100*r;this.indicatorOffset=`${n}px`}}render(){return O`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value/100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <span part="label" class="progress-ring__label">
          <slot></slot>
        </span>
      </div>
    `}};Jt.styles=By;h([K(".progress-ring__indicator")],Jt.prototype,"indicator",2);h([se()],Jt.prototype,"indicatorOffset",2);h([v({type:Number,reflect:!0})],Jt.prototype,"value",2);h([v()],Jt.prototype,"label",2);h([v()],Jt.prototype,"lang",2);Jt=h([H("sl-progress-ring")],Jt);j(V,"sl-progress-ring",Jt,{});var Vy=X`
  ${Y}

  :host {
    display: inline-block;
  }

  .qr-code {
    position: relative;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`,Rf=null,Mf=class{};Mf.render=function(e,t){Rf(e,t)};self.QrCreator=Mf;(function(e){function t(a,l,u,d){var c={},p=e(u,l);p.u(a),p.J(),d=d||0;var b=p.h(),w=p.h()+2*d;return c.text=a,c.level=l,c.version=u,c.O=w,c.a=function(g,f){return g-=d,f-=d,0>g||g>=b||0>f||f>=b?!1:p.a(g,f)},c}function r(a,l,u,d,c,p,b,w,g,f){function m(y,_,x,k,C,E,$){y?(a.lineTo(_+E,x+$),a.arcTo(_,x,k,C,p)):a.lineTo(_,x)}b?a.moveTo(l+p,u):a.moveTo(l,u),m(w,d,u,d,c,-p,0),m(g,d,c,l,c,0,-p),m(f,l,c,l,u,p,0),m(b,l,u,d,u,0,p)}function n(a,l,u,d,c,p,b,w,g,f){function m(y,_,x,k){a.moveTo(y+x,_),a.lineTo(y,_),a.lineTo(y,_+k),a.arcTo(y,_,y+x,_,p)}b&&m(l,u,p,p),w&&m(d,u,-p,p),g&&m(d,c,-p,-p),f&&m(l,c,p,-p)}function o(a,l){var u=l.fill;if(typeof u=="string")a.fillStyle=u;else{var d=u.type,c=u.colorStops;if(u=u.position.map(b=>Math.round(b*l.size)),d==="linear-gradient")var p=a.createLinearGradient.apply(a,u);else if(d==="radial-gradient")p=a.createRadialGradient.apply(a,u);else throw Error("Unsupported fill");c.forEach(([b,w])=>{p.addColorStop(b,w)}),a.fillStyle=p}}function s(a,l){e:{var u=l.text,d=l.v,c=l.N,p=l.K,b=l.P;for(c=Math.max(1,c||1),p=Math.min(40,p||40);c<=p;c+=1)try{var w=t(u,d,c,b);break e}catch{}w=void 0}if(!w)return null;for(u=a.getContext("2d"),l.background&&(u.fillStyle=l.background,u.fillRect(l.left,l.top,l.size,l.size)),d=w.O,p=l.size/d,u.beginPath(),b=0;b<d;b+=1)for(c=0;c<d;c+=1){var g=u,f=l.left+c*p,m=l.top+b*p,y=b,_=c,x=w.a,k=f+p,C=m+p,E=y-1,$=y+1,T=_-1,D=_+1,F=Math.floor(Math.min(.5,Math.max(0,l.R))*p),ne=x(y,_),xe=x(E,T),S=x(E,_);E=x(E,D);var z=x(y,D);D=x($,D),_=x($,_),$=x($,T),y=x(y,T),f=Math.round(f),m=Math.round(m),k=Math.round(k),C=Math.round(C),ne?r(g,f,m,k,C,F,!S&&!y,!S&&!z,!_&&!z,!_&&!y):n(g,f,m,k,C,F,S&&y&&xe,S&&z&&E,_&&z&&D,_&&y&&$)}return o(u,l),u.fill(),a}var i={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Rf=function(a,l){var u={};Object.assign(u,i,a),u.N=u.minVersion,u.K=u.maxVersion,u.v=u.ecLevel,u.left=u.left,u.top=u.top,u.size=u.size,u.fill=u.fill,u.background=u.background,u.text=u.text,u.R=u.radius,u.P=u.quiet,l instanceof HTMLCanvasElement?((l.width!==u.size||l.height!==u.size)&&(l.width=u.size,l.height=u.size),l.getContext("2d").clearRect(0,0,l.width,l.height),s(l,u)):(a=document.createElement("canvas"),a.width=u.size,a.height=u.size,u=s(a,u),l.appendChild(u))}})(function(){function e(l){var u=r.s(l);return{S:function(){return 4},b:function(){return u.length},write:function(d){for(var c=0;c<u.length;c+=1)d.put(u[c],8)}}}function t(){var l=[],u=0,d={B:function(){return l},c:function(c){return(l[Math.floor(c/8)]>>>7-c%8&1)==1},put:function(c,p){for(var b=0;b<p;b+=1)d.m((c>>>p-b-1&1)==1)},f:function(){return u},m:function(c){var p=Math.floor(u/8);l.length<=p&&l.push(0),c&&(l[p]|=128>>>u%8),u+=1}};return d}function r(l,u){function d(y,_){for(var x=-1;7>=x;x+=1)if(!(-1>=y+x||w<=y+x))for(var k=-1;7>=k;k+=1)-1>=_+k||w<=_+k||(b[y+x][_+k]=0<=x&&6>=x&&(k==0||k==6)||0<=k&&6>=k&&(x==0||x==6)||2<=x&&4>=x&&2<=k&&4>=k)}function c(y,_){for(var x=w=4*l+17,k=Array(x),C=0;C<x;C+=1){k[C]=Array(x);for(var E=0;E<x;E+=1)k[C][E]=null}for(b=k,d(0,0),d(w-7,0),d(0,w-7),x=s.G(l),k=0;k<x.length;k+=1)for(C=0;C<x.length;C+=1){E=x[k];var $=x[C];if(b[E][$]==null)for(var T=-2;2>=T;T+=1)for(var D=-2;2>=D;D+=1)b[E+T][$+D]=T==-2||T==2||D==-2||D==2||T==0&&D==0}for(x=8;x<w-8;x+=1)b[x][6]==null&&(b[x][6]=x%2==0);for(x=8;x<w-8;x+=1)b[6][x]==null&&(b[6][x]=x%2==0);for(x=s.w(p<<3|_),k=0;15>k;k+=1)C=!y&&(x>>k&1)==1,b[6>k?k:8>k?k+1:w-15+k][8]=C,b[8][8>k?w-k-1:9>k?15-k:14-k]=C;if(b[w-8][8]=!y,7<=l){for(x=s.A(l),k=0;18>k;k+=1)C=!y&&(x>>k&1)==1,b[Math.floor(k/3)][k%3+w-8-3]=C;for(k=0;18>k;k+=1)C=!y&&(x>>k&1)==1,b[k%3+w-8-3][Math.floor(k/3)]=C}if(g==null){for(y=a.I(l,p),x=t(),k=0;k<f.length;k+=1)C=f[k],x.put(4,4),x.put(C.b(),s.f(4,l)),C.write(x);for(k=C=0;k<y.length;k+=1)C+=y[k].j;if(x.f()>8*C)throw Error("code length overflow. ("+x.f()+">"+8*C+")");for(x.f()+4<=8*C&&x.put(0,4);x.f()%8!=0;)x.m(!1);for(;!(x.f()>=8*C)&&(x.put(236,8),!(x.f()>=8*C));)x.put(17,8);var F=0;for(C=k=0,E=Array(y.length),$=Array(y.length),T=0;T<y.length;T+=1){var ne=y[T].j,xe=y[T].o-ne;for(k=Math.max(k,ne),C=Math.max(C,xe),E[T]=Array(ne),D=0;D<E[T].length;D+=1)E[T][D]=255&x.B()[D+F];for(F+=ne,D=s.C(xe),ne=n(E[T],D.b()-1).l(D),$[T]=Array(D.b()-1),D=0;D<$[T].length;D+=1)xe=D+ne.b()-$[T].length,$[T][D]=0<=xe?ne.c(xe):0}for(D=x=0;D<y.length;D+=1)x+=y[D].o;for(x=Array(x),D=F=0;D<k;D+=1)for(T=0;T<y.length;T+=1)D<E[T].length&&(x[F]=E[T][D],F+=1);for(D=0;D<C;D+=1)for(T=0;T<y.length;T+=1)D<$[T].length&&(x[F]=$[T][D],F+=1);g=x}for(y=g,x=-1,k=w-1,C=7,E=0,_=s.F(_),$=w-1;0<$;$-=2)for($==6&&--$;;){for(T=0;2>T;T+=1)b[k][$-T]==null&&(D=!1,E<y.length&&(D=(y[E]>>>C&1)==1),_(k,$-T)&&(D=!D),b[k][$-T]=D,--C,C==-1&&(E+=1,C=7));if(k+=x,0>k||w<=k){k-=x,x=-x;break}}}var p=o[u],b=null,w=0,g=null,f=[],m={u:function(y){y=e(y),f.push(y),g=null},a:function(y,_){if(0>y||w<=y||0>_||w<=_)throw Error(y+","+_);return b[y][_]},h:function(){return w},J:function(){for(var y=0,_=0,x=0;8>x;x+=1){c(!0,x);var k=s.D(m);(x==0||y>k)&&(y=k,_=x)}c(!1,_)}};return m}function n(l,u){if(typeof l.length=="undefined")throw Error(l.length+"/"+u);var d=function(){for(var p=0;p<l.length&&l[p]==0;)p+=1;for(var b=Array(l.length-p+u),w=0;w<l.length-p;w+=1)b[w]=l[w+p];return b}(),c={c:function(p){return d[p]},b:function(){return d.length},multiply:function(p){for(var b=Array(c.b()+p.b()-1),w=0;w<c.b();w+=1)for(var g=0;g<p.b();g+=1)b[w+g]^=i.i(i.g(c.c(w))+i.g(p.c(g)));return n(b,0)},l:function(p){if(0>c.b()-p.b())return c;for(var b=i.g(c.c(0))-i.g(p.c(0)),w=Array(c.b()),g=0;g<c.b();g+=1)w[g]=c.c(g);for(g=0;g<p.b();g+=1)w[g]^=i.i(i.g(p.c(g))+b);return n(w,0).l(p)}};return c}r.s=function(l){for(var u=[],d=0;d<l.length;d++){var c=l.charCodeAt(d);128>c?u.push(c):2048>c?u.push(192|c>>6,128|c&63):55296>c||57344<=c?u.push(224|c>>12,128|c>>6&63,128|c&63):(d++,c=65536+((c&1023)<<10|l.charCodeAt(d)&1023),u.push(240|c>>18,128|c>>12&63,128|c>>6&63,128|c&63))}return u};var o={L:1,M:0,Q:3,H:2},s=function(){function l(c){for(var p=0;c!=0;)p+=1,c>>>=1;return p}var u=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],d={w:function(c){for(var p=c<<10;0<=l(p)-l(1335);)p^=1335<<l(p)-l(1335);return(c<<10|p)^21522},A:function(c){for(var p=c<<12;0<=l(p)-l(7973);)p^=7973<<l(p)-l(7973);return c<<12|p},G:function(c){return u[c-1]},F:function(c){switch(c){case 0:return function(p,b){return(p+b)%2==0};case 1:return function(p){return p%2==0};case 2:return function(p,b){return b%3==0};case 3:return function(p,b){return(p+b)%3==0};case 4:return function(p,b){return(Math.floor(p/2)+Math.floor(b/3))%2==0};case 5:return function(p,b){return p*b%2+p*b%3==0};case 6:return function(p,b){return(p*b%2+p*b%3)%2==0};case 7:return function(p,b){return(p*b%3+(p+b)%2)%2==0};default:throw Error("bad maskPattern:"+c)}},C:function(c){for(var p=n([1],0),b=0;b<c;b+=1)p=p.multiply(n([1,i.i(b)],0));return p},f:function(c,p){if(c!=4||1>p||40<p)throw Error("mode: "+c+"; type: "+p);return 10>p?8:16},D:function(c){for(var p=c.h(),b=0,w=0;w<p;w+=1)for(var g=0;g<p;g+=1){for(var f=0,m=c.a(w,g),y=-1;1>=y;y+=1)if(!(0>w+y||p<=w+y))for(var _=-1;1>=_;_+=1)0>g+_||p<=g+_||(y!=0||_!=0)&&m==c.a(w+y,g+_)&&(f+=1);5<f&&(b+=3+f-5)}for(w=0;w<p-1;w+=1)for(g=0;g<p-1;g+=1)f=0,c.a(w,g)&&(f+=1),c.a(w+1,g)&&(f+=1),c.a(w,g+1)&&(f+=1),c.a(w+1,g+1)&&(f+=1),(f==0||f==4)&&(b+=3);for(w=0;w<p;w+=1)for(g=0;g<p-6;g+=1)c.a(w,g)&&!c.a(w,g+1)&&c.a(w,g+2)&&c.a(w,g+3)&&c.a(w,g+4)&&!c.a(w,g+5)&&c.a(w,g+6)&&(b+=40);for(g=0;g<p;g+=1)for(w=0;w<p-6;w+=1)c.a(w,g)&&!c.a(w+1,g)&&c.a(w+2,g)&&c.a(w+3,g)&&c.a(w+4,g)&&!c.a(w+5,g)&&c.a(w+6,g)&&(b+=40);for(g=f=0;g<p;g+=1)for(w=0;w<p;w+=1)c.a(w,g)&&(f+=1);return b+=Math.abs(100*f/p/p-50)/5*10}};return d}(),i=function(){for(var l=Array(256),u=Array(256),d=0;8>d;d+=1)l[d]=1<<d;for(d=8;256>d;d+=1)l[d]=l[d-4]^l[d-5]^l[d-6]^l[d-8];for(d=0;255>d;d+=1)u[l[d]]=d;return{g:function(c){if(1>c)throw Error("glog("+c+")");return u[c]},i:function(c){for(;0>c;)c+=255;for(;256<=c;)c-=255;return l[c]}}}(),a=function(){function l(c,p){switch(p){case o.L:return u[4*(c-1)];case o.M:return u[4*(c-1)+1];case o.Q:return u[4*(c-1)+2];case o.H:return u[4*(c-1)+3]}}var u=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],d={I:function(c,p){var b=l(c,p);if(typeof b=="undefined")throw Error("bad rs block @ typeNumber:"+c+"/errorCorrectLevel:"+p);c=b.length/3,p=[];for(var w=0;w<c;w+=1)for(var g=b[3*w],f=b[3*w+1],m=b[3*w+2],y=0;y<g;y+=1){var _=m,x={};x.o=f,x.j=_,p.push(x)}return p}};return d}();return r}());var Hy=QrCreator,it=class extends U{constructor(){super(...arguments);this.value="",this.label="",this.size=128,this.fill="#000",this.background="#fff",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){!this.hasUpdated||Hy.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background==="transparent"?null:this.background,size:this.size*2},this.canvas)}render(){return O`
      <div
        class="qr-code"
        part="base"
        style=${et({width:`${this.size}px`,height:`${this.size}px`})}
      >
        <canvas role="img" aria-label=${this.label.length>0?this.label:this.value}></canvas>
      </div>
    `}};it.styles=Vy;h([K("canvas")],it.prototype,"canvas",2);h([v()],it.prototype,"value",2);h([v()],it.prototype,"label",2);h([v({type:Number})],it.prototype,"size",2);h([v()],it.prototype,"fill",2);h([v()],it.prototype,"background",2);h([v({type:Number})],it.prototype,"radius",2);h([v({attribute:"error-correction"})],it.prototype,"errorCorrection",2);h([R("background"),R("errorCorrection"),R("fill"),R("radius"),R("size"),R("value")],it.prototype,"generate",1);it=h([H("sl-qr-code")],it);j(V,"sl-qr-code",it,{});var jy=X`
  ${Y}

  :host {
    display: inline-block;
  }

  .radio {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .radio__icon svg {
    width: 100%;
    height: 100%;
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__input${Q} ~ .radio__control {
    border-color: var(--sl-input-border-color-focus);
    background-color: var(--sl-input-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  .radio.radio--checked:not(.radio--disabled) .radio__input${Q} ~ .radio__control {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`,Et=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this,{value:e=>e.checked?e.value:void 0}),this.hasFocus=!1,this.disabled=!1,this.checked=!1,this.invalid=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","radio")}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,P(this,"sl-blur")}handleClick(){this.disabled||(this.checked=!0)}handleFocus(){this.hasFocus=!0,P(this,"sl-focus")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.hasUpdated&&P(this,"sl-change")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.hasUpdated&&(this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity())}};h([K('input[type="radio"], button')],Et.prototype,"input",2);h([se()],Et.prototype,"hasFocus",2);h([v()],Et.prototype,"name",2);h([v()],Et.prototype,"value",2);h([v({type:Boolean,reflect:!0})],Et.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],Et.prototype,"checked",2);h([v({type:Boolean,reflect:!0})],Et.prototype,"invalid",2);h([R("checked")],Et.prototype,"handleCheckedChange",1);h([R("disabled",{waitUntilFirstUpdate:!0})],Et.prototype,"handleDisabledChange",1);var bs=class extends Et{render(){return O`
      <label
        part="base"
        class=${Z({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus})}
      >
        <input
          class="radio__input"
          type="radio"
          name=${M(this.name)}
          value=${M(this.value)}
          .checked=${_r(this.checked)}
          .disabled=${this.disabled}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />
        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>
        </span>

        <span part="label" class="radio__label">
          <slot></slot>
        </span>
      </label>
    `}};bs.styles=jy;bs=h([H("sl-radio")],bs);j(V,"sl-radio",bs,{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus"});var Ad=(e,...t)=>({_$litStatic$:t.reduce((r,n,o)=>r+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(n)+e[o+1],e[0])}),Pd=new Map,Wy=e=>(t,...r)=>{var n;const o=r.length;let s,i;const a=[],l=[];let u,d=0,c=!1;for(;d<o;){for(u=t[d];d<o&&(i=r[d],(s=(n=i)===null||n===void 0?void 0:n._$litStatic$)!==void 0);)u+=s+t[++d],c=!0;l.push(i),a.push(u),d++}if(d===o&&a.push(t[o]),c){const p=a.join("$$lit$$");(t=Pd.get(p))===void 0&&(a.raw=a,Pd.set(p,t=a)),r=l}return e(t,...r)},Ai=Wy(O);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Lf=X`
  ${Y}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label ::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default${Q}:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary${Q}:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success${Q}:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral${Q}:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning${Q}:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger${Q}:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default${Q}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary${Q}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success${Q}:not(.button--disabled) {
    border-color: var(--sl-color-success-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral${Q}:not(.button--disabled) {
    border-color: var(--sl-color-neutral-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning${Q}:not(.button--disabled) {
    border-color: var(--sl-color-warning-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger${Q}:not(.button--disabled) {
    border-color: var(--sl-color-danger-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text${Q}:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    display: flex;
    align-items: center;
  }

  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-right: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-left: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--focus, .sl-button-group__button--first, [variant='default']):not(:hover, :active, :focus))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump focused buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  :host(.sl-button-group__button--focus) {
    z-index: 2;
  }
`,Cr=class extends Et{constructor(){super(...arguments);this.hasSlotController=new Ct(this,"[default]","prefix","suffix"),this.variant="default",this.size="medium",this.invalid=!1,this.pill=!1}render(){return Ai`
      <button
        part="base"
        class=${Z({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${this.disabled}
        type="button"
        name=${M(this.name)}
        value=${M(this.value)}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <span part="label" class="button__label">
          <slot></slot>
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix"></slot>
        </span>
      </button>
    `}};Cr.styles=Lf;h([v({reflect:!0})],Cr.prototype,"variant",2);h([v({reflect:!0})],Cr.prototype,"size",2);h([v({type:Boolean,reflect:!0})],Cr.prototype,"invalid",2);h([v({type:Boolean,reflect:!0})],Cr.prototype,"pill",2);Cr=h([H("sl-radio-button")],Cr);j(V,"sl-radio-button",Cr,{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus"});var Ky=X`
  ${Y}

  :host {
    display: block;
  }

  .radio-group {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-large);
    padding-top: var(--sl-spacing-x-small);
  }

  .radio-group .radio-group__label {
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    padding: 0 var(--sl-spacing-2x-small);
  }

  ::slotted(sl-radio:not(:last-of-type)) {
    display: block;
    margin-bottom: var(--sl-spacing-2x-small);
  }

  .radio-group:not(.radio-group--has-fieldset) {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .radio-group:not(.radio-group--has-fieldset) .radio-group__label {
    position: absolute;
    width: 0;
    height: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`,wa=["sl-radio","sl-radio-button"],Er=class extends U{constructor(){super(...arguments);this.hasButtonGroup=!1,this.label="",this.fieldset=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","radiogroup")}getAllRadios(){return[...this.querySelectorAll(wa.join(","))].filter(e=>wa.includes(e.tagName.toLowerCase()))}handleRadioClick(e){const r=e.target.closest(wa.map(n=>`${n}:not([disabled])`).join(","));r&&this.getAllRadios().forEach(o=>{o.checked=o===r,o.input.tabIndex=o===r?0:-1})}handleKeyDown(e){var t;if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){const r=this.getAllRadios().filter(i=>!i.disabled),n=(t=r.find(i=>i.checked))!=null?t:r[0],o=["ArrowUp","ArrowLeft"].includes(e.key)?-1:1;let s=r.indexOf(n)+o;s<0&&(s=r.length-1),s>r.length-1&&(s=0),this.getAllRadios().forEach(i=>{i.checked=!1,i.input.tabIndex=-1}),r[s].focus(),r[s].checked=!0,r[s].input.tabIndex=0,e.preventDefault()}}handleSlotChange(){const e=this.getAllRadios(),t=e.find(r=>r.checked);this.hasButtonGroup=!!e.find(r=>r.tagName.toLowerCase()==="sl-radio-button"),e.forEach(r=>{r.setAttribute("role","radio"),r.input.tabIndex=-1}),t?t.input.tabIndex=0:e.length>0&&(e[0].input.tabIndex=0)}render(){const e=O`
      <slot @click=${this.handleRadioClick} @keydown=${this.handleKeyDown} @slotchange=${this.handleSlotChange}></slot>
    `;return O`
      <fieldset
        part="base"
        class=${Z({"radio-group":!0,"radio-group--has-fieldset":this.fieldset})}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        ${this.hasButtonGroup?O`<sl-button-group part="button-group">${e}</sl-button-group>`:e}
      </fieldset>
    `}};Er.styles=Ky;h([K("slot:not([name])")],Er.prototype,"defaultSlot",2);h([se()],Er.prototype,"hasButtonGroup",2);h([v()],Er.prototype,"label",2);h([v({type:Boolean,attribute:"fieldset"})],Er.prototype,"fieldset",2);Er=h([H("sl-radio-group")],Er);j(V,"sl-radio-group",Er,{});var Qe=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};h([v({type:Number})],Qe.prototype,"value",2);h([v()],Qe.prototype,"lang",2);h([v()],Qe.prototype,"type",2);h([v({attribute:"no-grouping",type:Boolean})],Qe.prototype,"noGrouping",2);h([v()],Qe.prototype,"currency",2);h([v({attribute:"currency-display"})],Qe.prototype,"currencyDisplay",2);h([v({attribute:"minimum-integer-digits",type:Number})],Qe.prototype,"minimumIntegerDigits",2);h([v({attribute:"minimum-fraction-digits",type:Number})],Qe.prototype,"minimumFractionDigits",2);h([v({attribute:"maximum-fraction-digits",type:Number})],Qe.prototype,"maximumFractionDigits",2);h([v({attribute:"minimum-significant-digits",type:Number})],Qe.prototype,"minimumSignificantDigits",2);h([v({attribute:"maximum-significant-digits",type:Number})],Qe.prototype,"maximumSignificantDigits",2);Qe=h([H("sl-format-number")],Qe);j(V,"sl-format-number",Qe,{});var Pi=j(V,"sl-icon",Lt,{onSlLoad:"sl-load",onSlError:"sl-error"}),Xy=X`
  ${Y}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button${Q} {
    box-shadow: var(--sl-focus-ring);
  }
`,st=class extends U{constructor(){super(...arguments);this.label="",this.disabled=!1}render(){const e=!!this.href,t=O`
      <sl-icon
        name=${M(this.name)}
        library=${M(this.library)}
        src=${M(this.src)}
        aria-hidden="true"
      ></sl-icon>
    `;return e?O`
          <a
            part="base"
            class="icon-button"
            href=${M(this.href)}
            target=${M(this.target)}
            download=${M(this.download)}
            rel=${M(this.target?"noreferrer noopener":void 0)}
            role="button"
            aria-disabled=${this.disabled?"true":"false"}
            aria-label="${this.label}"
            tabindex=${this.disabled?"-1":"0"}
          >
            ${t}
          </a>
        `:O`
          <button
            part="base"
            class=${Z({"icon-button":!0,"icon-button--disabled":this.disabled})}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${t}
          </button>
        `}};st.styles=Xy;h([K(".icon-button")],st.prototype,"button",2);h([v()],st.prototype,"name",2);h([v()],st.prototype,"library",2);h([v()],st.prototype,"src",2);h([v()],st.prototype,"href",2);h([v()],st.prototype,"target",2);h([v()],st.prototype,"download",2);h([v()],st.prototype,"label",2);h([v({type:Boolean,reflect:!0})],st.prototype,"disabled",2);st=h([H("sl-icon-button")],st);j(V,"sl-icon-button",st,{});var Yy=X`
  ${Y}

  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    pointer-events: none;
  }

  .image-comparer__before ::slotted(img),
  .image-comparer__after ::slotted(img),
  .image-comparer__before ::slotted(svg),
  .image-comparer__after ::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    transform: translateX(calc(var(--divider-width) / -2));
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-600);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle${Q} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }
`,Tr=class extends U{constructor(){super(...arguments);this.position=50}handleDrag(e){const{width:t}=this.base.getBoundingClientRect();e.preventDefault(),ko(this.base,r=>{this.position=parseFloat(Ae(r/t*100,0,100).toFixed(2))})}handleKeyDown(e){if(["ArrowLeft","ArrowRight","Home","End"].includes(e.key)){const t=e.shiftKey?10:1;let r=this.position;e.preventDefault(),e.key==="ArrowLeft"&&(r-=t),e.key==="ArrowRight"&&(r+=t),e.key==="Home"&&(r=0),e.key==="End"&&(r=100),r=Ae(r,0,100),this.position=r}}handlePositionChange(){P(this,"sl-change")}render(){return O`
      <div part="base" id="image-comparer" class="image-comparer" @keydown=${this.handleKeyDown}>
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${et({clipPath:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${et({left:`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle-icon">
              <sl-icon class="image-comparer__handle-icon" name="grip-vertical" library="system"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `}};Tr.styles=Yy;h([K(".image-comparer")],Tr.prototype,"base",2);h([K(".image-comparer__handle")],Tr.prototype,"handle",2);h([v({type:Number,reflect:!0})],Tr.prototype,"position",2);h([R("position",{waitUntilFirstUpdate:!0})],Tr.prototype,"handlePositionChange",1);Tr=h([H("sl-image-comparer")],Tr);j(V,"sl-image-comparer",Tr,{onSlChange:"sl-change"});var qy=X`
  ${Y}

  :host {
    display: block;
  }
`,$r=class extends U{constructor(){super(...arguments);this.mode="cors",this.allowScripts=!1}executeScript(e){const t=document.createElement("script");[...e.attributes].forEach(r=>t.setAttribute(r.name,r.value)),t.textContent=e.textContent,e.parentNode.replaceChild(t,e)}async handleSrcChange(){try{const e=this.src,t=await If(e,this.mode);if(e!==this.src)return;if(!t.ok){P(this,"sl-error",{detail:{status:t.status}});return}this.innerHTML=t.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(r=>this.executeScript(r)),P(this,"sl-load")}catch{P(this,"sl-error",{detail:{status:-1}})}}render(){return O`<slot></slot>`}};$r.styles=qy;h([v()],$r.prototype,"src",2);h([v()],$r.prototype,"mode",2);h([v({attribute:"allow-scripts",type:Boolean})],$r.prototype,"allowScripts",2);h([R("src")],$r.prototype,"handleSrcChange",1);$r=h([H("sl-include")],$r);j(V,"sl-include",$r,{onSlLoad:"sl-load",onSlError:"sl-error"});var Qy=X`
  ${Y}
  ${Bs}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }
`,ee=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this),this.hasSlotController=new Ct(this,"help-text","label"),this.hasFocus=!1,this.isPasswordVisible=!1,this.type="text",this.size="medium",this.value="",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.togglePassword=!1,this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}get valueAsDate(){var e,t;return(t=(e=this.input)==null?void 0:e.valueAsDate)!=null?t:null}set valueAsDate(e){this.updateComplete.then(()=>{this.input.valueAsDate=e,this.value=this.input.value})}get valueAsNumber(){var e,t;return(t=(e=this.input)==null?void 0:e.valueAsNumber)!=null?t:parseFloat(this.value)}set valueAsNumber(e){this.updateComplete.then(()=>{this.input.valueAsNumber=e,this.value=this.input.value})}firstUpdated(){this.invalid=!this.input.checkValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,r="none"){this.input.setSelectionRange(e,t,r)}setRangeText(e,t,r,n="preserve"){this.input.setRangeText(e,t,r,n),this.value!==this.input.value&&(this.value=this.input.value,P(this,"sl-input"),P(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,P(this,"sl-blur")}handleChange(){this.value=this.input.value,P(this,"sl-change")}handleClearClick(e){this.value="",P(this,"sl-clear"),P(this,"sl-input"),P(this,"sl-change"),this.input.focus(),e.stopPropagation()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,P(this,"sl-focus")}handleInput(){this.value=this.input.value,P(this,"sl-input")}handleInvalid(){this.invalid=!0}handleKeyDown(e){const t=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!t&&this.formSubmitController.submit()}handlePasswordToggle(){this.isPasswordVisible=!this.isPasswordVisible}handleValueChange(){this.invalid=!this.input.checkValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),r=this.label?!0:!!e,n=this.helpText?!0:!!t;return O`
      <div
        part="form-control"
        class=${Z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":n})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Z({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":this.value.length===0,"input--invalid":this.invalid})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.isPasswordVisible?"text":this.type}
              name=${M(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${M(this.placeholder)}
              minlength=${M(this.minlength)}
              maxlength=${M(this.maxlength)}
              min=${M(this.min)}
              max=${M(this.max)}
              step=${M(this.step)}
              .value=${_r(this.value)}
              autocapitalize=${M(this.autocapitalize)}
              autocomplete=${M(this.autocomplete)}
              autocorrect=${M(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${M(this.spellcheck)}
              pattern=${M(this.pattern)}
              inputmode=${M(this.inputmode)}
              aria-describedby="help-text"
              aria-invalid=${this.invalid?"true":"false"}
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${this.clearable&&this.value.length>0?O`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-hidden="true"
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.togglePassword?O`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-hidden="true"
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.isPasswordVisible?O`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:O`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${n?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ee.styles=Qy;h([K(".input__control")],ee.prototype,"input",2);h([se()],ee.prototype,"hasFocus",2);h([se()],ee.prototype,"isPasswordVisible",2);h([v({reflect:!0})],ee.prototype,"type",2);h([v({reflect:!0})],ee.prototype,"size",2);h([v()],ee.prototype,"name",2);h([v()],ee.prototype,"value",2);h([v({type:Boolean,reflect:!0})],ee.prototype,"filled",2);h([v({type:Boolean,reflect:!0})],ee.prototype,"pill",2);h([v()],ee.prototype,"label",2);h([v({attribute:"help-text"})],ee.prototype,"helpText",2);h([v({type:Boolean})],ee.prototype,"clearable",2);h([v({attribute:"toggle-password",type:Boolean})],ee.prototype,"togglePassword",2);h([v()],ee.prototype,"placeholder",2);h([v({type:Boolean,reflect:!0})],ee.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],ee.prototype,"readonly",2);h([v({type:Number})],ee.prototype,"minlength",2);h([v({type:Number})],ee.prototype,"maxlength",2);h([v()],ee.prototype,"min",2);h([v()],ee.prototype,"max",2);h([v({type:Number})],ee.prototype,"step",2);h([v()],ee.prototype,"pattern",2);h([v({type:Boolean,reflect:!0})],ee.prototype,"required",2);h([v({type:Boolean,reflect:!0})],ee.prototype,"invalid",2);h([v()],ee.prototype,"autocapitalize",2);h([v()],ee.prototype,"autocorrect",2);h([v()],ee.prototype,"autocomplete",2);h([v({type:Boolean})],ee.prototype,"autofocus",2);h([v({type:Boolean})],ee.prototype,"spellcheck",2);h([v()],ee.prototype,"inputmode",2);h([R("disabled",{waitUntilFirstUpdate:!0})],ee.prototype,"handleDisabledChange",1);h([R("value",{waitUntilFirstUpdate:!0})],ee.prototype,"handleValueChange",1);ee=h([H("sl-input")],ee);var Oi=j(V,"sl-input",ee,{onSlChange:"sl-change",onSlClear:"sl-clear",onSlInput:"sl-input",onSlFocus:"sl-focus",onSlBlur:"sl-blur"}),Gy=X`
  ${Y}

  :host {
    display: block;
  }

  .menu {
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    background: var(--sl-panel-background-color);
    padding: var(--sl-spacing-x-small) 0;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,Hn=class extends U{constructor(){super(...arguments);this.typeToSelectString=""}firstUpdated(){this.setAttribute("role","menu")}getAllItems(e={includeDisabled:!0}){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(t=>!(t.getAttribute("role")!=="menuitem"||!e.includeDisabled&&t.disabled))}getCurrentItem(){return this.getAllItems({includeDisabled:!1}).find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){const t=this.getAllItems({includeDisabled:!1}),r=e.disabled?t[0]:e;t.forEach(n=>{n.setAttribute("tabindex",n===r?"0":"-1")})}typeToSelect(e){var t;const r=this.getAllItems({includeDisabled:!1});clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?e.metaKey||e.ctrlKey?this.typeToSelectString="":this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase(),zi||r.forEach(n=>n.classList.remove("sl-focus-invisible"));for(const n of r){const o=(t=n.shadowRoot)==null?void 0:t.querySelector("slot:not([name])");if(kf(o).toLowerCase().trim().startsWith(this.typeToSelectString)){this.setCurrentItem(n),n.focus();break}}}handleClick(e){const r=e.target.closest("sl-menu-item");(r==null?void 0:r.disabled)===!1&&P(this,"sl-select",{detail:{item:r}})}handleKeyUp(){zi||this.getAllItems().forEach(t=>{t.classList.remove("sl-focus-invisible")})}handleKeyDown(e){if(e.key==="Enter"){const t=this.getCurrentItem();e.preventDefault(),t==null||t.click()}if(e.key===" "&&e.preventDefault(),["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const t=this.getAllItems({includeDisabled:!1}),r=this.getCurrentItem();let n=r?t.indexOf(r):0;if(t.length>0){e.preventDefault(),e.key==="ArrowDown"?n++:e.key==="ArrowUp"?n--:e.key==="Home"?n=0:e.key==="End"&&(n=t.length-1),n<0&&(n=0),n>t.length-1&&(n=t.length-1),this.setCurrentItem(t[n]),t[n].focus();return}}this.typeToSelect(e)}handleMouseDown(e){const t=e.target;t.getAttribute("role")==="menuitem"&&(this.setCurrentItem(t),zi||t.classList.add("sl-focus-invisible"))}handleSlotChange(){const e=this.getAllItems({includeDisabled:!1});e.length>0&&this.setCurrentItem(e[0])}render(){return O`
      <div
        part="base"
        class="menu"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Hn.styles=Gy;h([K(".menu")],Hn.prototype,"menu",2);h([K("slot")],Hn.prototype,"defaultSlot",2);Hn=h([H("sl-menu")],Hn);var Jy=j(V,"sl-menu",Hn,{onSlSelect:"sl-select"}),Zy=X`
  ${Y}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    text-align: left;
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: var(--sl-color-neutral-400);
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-right: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item,
  :host(${Q}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }
`,Ut=class extends U{constructor(){super(...arguments);this.checked=!1,this.value="",this.disabled=!1}firstUpdated(){this.setAttribute("role","menuitem")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return O`
      <div
        part="base"
        class=${Z({"menu-item":!0,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--has-submenu":!1})}
      >
        <span class="menu-item__check">
          <sl-icon name="check-lg" library="default" aria-hidden="true"></sl-icon>
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="default" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `}};Ut.styles=Zy;h([K(".menu-item")],Ut.prototype,"menuItem",2);h([v({type:Boolean,reflect:!0})],Ut.prototype,"checked",2);h([v()],Ut.prototype,"value",2);h([v({type:Boolean,reflect:!0})],Ut.prototype,"disabled",2);h([R("checked")],Ut.prototype,"handleCheckedChange",1);h([R("disabled")],Ut.prototype,"handleDisabledChange",1);Ut=h([H("sl-menu-item")],Ut);var xa=j(V,"sl-menu-item",Ut,{}),e1=X`
  ${Y}

  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline${Q} {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500), var(--sl-focus-ring);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(
        to bottom,
        hsl(0, 0%, 100%) 0%,
        hsla(0, 0%, 100%, 0) 50%,
        hsla(0, 0%, 0%, 0) 50%,
        hsl(0, 0%, 0%) 100%
      ),
      linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
  }

  .color-picker__grid-handle${Q} {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500), var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle${Q} {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500), var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 3.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-input-border-radius-medium);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview${Q} {
    box-shadow: var(--sl-focus-ring);
    outline: none;
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch${Q} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 0, -5px -5px, 5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: var(--sl-transition-fast) box-shadow;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow: inset 0 0 0 2px var(--sl-input-border-color), inset 0 0 0 4px var(--sl-color-neutral-0);
    transition: inherit;
  }

  .color-dropdown__trigger${Q} {
    outline: none;
  }

  .color-dropdown__trigger${Q}:not(.color-dropdown__trigger--disabled) {
    box-shadow: var(--sl-focus-ring);
    outline: none;
  }

  .color-dropdown__trigger${Q}:not(.color-dropdown__trigger--disabled):before {
    box-shadow: inset 0 0 0 1px var(--sl-color-primary-500);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Uf=Ar({"node_modules/color-name/index.js"(e,t){t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}}),t1=Ar({"node_modules/simple-swizzle/node_modules/is-arrayish/index.js"(e,t){t.exports=function(n){return!n||typeof n=="string"?!1:n instanceof Array||Array.isArray(n)||n.length>=0&&(n.splice instanceof Function||Object.getOwnPropertyDescriptor(n,n.length-1)&&n.constructor.name!=="String")}}}),r1=Ar({"node_modules/simple-swizzle/index.js"(e,t){var r=t1(),n=Array.prototype.concat,o=Array.prototype.slice,s=t.exports=function(a){for(var l=[],u=0,d=a.length;u<d;u++){var c=a[u];r(c)?l=n.call(l,o.call(c)):l.push(c)}return l};s.wrap=function(i){return function(){return i(s(arguments))}}}}),n1=Ar({"node_modules/color-string/index.js"(e,t){var r=Uf(),n=r1(),o=Object.hasOwnProperty,s={};for(i in r)o.call(r,i)&&(s[r[i]]=i);var i,a=t.exports={to:{},get:{}};a.get=function(d){var c=d.substring(0,3).toLowerCase(),p,b;switch(c){case"hsl":p=a.get.hsl(d),b="hsl";break;case"hwb":p=a.get.hwb(d),b="hwb";break;default:p=a.get.rgb(d),b="rgb";break}return p?{model:b,value:p}:null},a.get.rgb=function(d){if(!d)return null;var c=/^#([a-f0-9]{3,4})$/i,p=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,b=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,w=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,g=/^(\w+)$/,f=[0,0,0,1],m,y,_;if(m=d.match(p)){for(_=m[2],m=m[1],y=0;y<3;y++){var x=y*2;f[y]=parseInt(m.slice(x,x+2),16)}_&&(f[3]=parseInt(_,16)/255)}else if(m=d.match(c)){for(m=m[1],_=m[3],y=0;y<3;y++)f[y]=parseInt(m[y]+m[y],16);_&&(f[3]=parseInt(_+_,16)/255)}else if(m=d.match(b)){for(y=0;y<3;y++)f[y]=parseInt(m[y+1],0);m[4]&&(m[5]?f[3]=parseFloat(m[4])*.01:f[3]=parseFloat(m[4]))}else if(m=d.match(w)){for(y=0;y<3;y++)f[y]=Math.round(parseFloat(m[y+1])*2.55);m[4]&&(m[5]?f[3]=parseFloat(m[4])*.01:f[3]=parseFloat(m[4]))}else return(m=d.match(g))?m[1]==="transparent"?[0,0,0,0]:o.call(r,m[1])?(f=r[m[1]],f[3]=1,f):null:null;for(y=0;y<3;y++)f[y]=l(f[y],0,255);return f[3]=l(f[3],0,1),f},a.get.hsl=function(d){if(!d)return null;var c=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,p=d.match(c);if(p){var b=parseFloat(p[4]),w=(parseFloat(p[1])%360+360)%360,g=l(parseFloat(p[2]),0,100),f=l(parseFloat(p[3]),0,100),m=l(isNaN(b)?1:b,0,1);return[w,g,f,m]}return null},a.get.hwb=function(d){if(!d)return null;var c=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,p=d.match(c);if(p){var b=parseFloat(p[4]),w=(parseFloat(p[1])%360+360)%360,g=l(parseFloat(p[2]),0,100),f=l(parseFloat(p[3]),0,100),m=l(isNaN(b)?1:b,0,1);return[w,g,f,m]}return null},a.to.hex=function(){var d=n(arguments);return"#"+u(d[0])+u(d[1])+u(d[2])+(d[3]<1?u(Math.round(d[3]*255)):"")},a.to.rgb=function(){var d=n(arguments);return d.length<4||d[3]===1?"rgb("+Math.round(d[0])+", "+Math.round(d[1])+", "+Math.round(d[2])+")":"rgba("+Math.round(d[0])+", "+Math.round(d[1])+", "+Math.round(d[2])+", "+d[3]+")"},a.to.rgb.percent=function(){var d=n(arguments),c=Math.round(d[0]/255*100),p=Math.round(d[1]/255*100),b=Math.round(d[2]/255*100);return d.length<4||d[3]===1?"rgb("+c+"%, "+p+"%, "+b+"%)":"rgba("+c+"%, "+p+"%, "+b+"%, "+d[3]+")"},a.to.hsl=function(){var d=n(arguments);return d.length<4||d[3]===1?"hsl("+d[0]+", "+d[1]+"%, "+d[2]+"%)":"hsla("+d[0]+", "+d[1]+"%, "+d[2]+"%, "+d[3]+")"},a.to.hwb=function(){var d=n(arguments),c="";return d.length>=4&&d[3]!==1&&(c=", "+d[3]),"hwb("+d[0]+", "+d[1]+"%, "+d[2]+"%"+c+")"},a.to.keyword=function(d){return s[d.slice(0,3)]};function l(d,c,p){return Math.min(Math.max(c,d),p)}function u(d){var c=Math.round(d).toString(16).toUpperCase();return c.length<2?"0"+c:c}}}),Nf=Ar({"node_modules/color-convert/conversions.js"(e,t){var r=Uf(),n={};for(const i of Object.keys(r))n[r[i]]=i;var o={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};t.exports=o;for(const i of Object.keys(o)){if(!("channels"in o[i]))throw new Error("missing channels property: "+i);if(!("labels"in o[i]))throw new Error("missing channel labels property: "+i);if(o[i].labels.length!==o[i].channels)throw new Error("channel and label counts mismatch: "+i);const{channels:a,labels:l}=o[i];delete o[i].channels,delete o[i].labels,Object.defineProperty(o[i],"channels",{value:a}),Object.defineProperty(o[i],"labels",{value:l})}o.rgb.hsl=function(i){const a=i[0]/255,l=i[1]/255,u=i[2]/255,d=Math.min(a,l,u),c=Math.max(a,l,u),p=c-d;let b,w;c===d?b=0:a===c?b=(l-u)/p:l===c?b=2+(u-a)/p:u===c&&(b=4+(a-l)/p),b=Math.min(b*60,360),b<0&&(b+=360);const g=(d+c)/2;return c===d?w=0:g<=.5?w=p/(c+d):w=p/(2-c-d),[b,w*100,g*100]},o.rgb.hsv=function(i){let a,l,u,d,c;const p=i[0]/255,b=i[1]/255,w=i[2]/255,g=Math.max(p,b,w),f=g-Math.min(p,b,w),m=function(y){return(g-y)/6/f+1/2};return f===0?(d=0,c=0):(c=f/g,a=m(p),l=m(b),u=m(w),p===g?d=u-l:b===g?d=1/3+a-u:w===g&&(d=2/3+l-a),d<0?d+=1:d>1&&(d-=1)),[d*360,c*100,g*100]},o.rgb.hwb=function(i){const a=i[0],l=i[1];let u=i[2];const d=o.rgb.hsl(i)[0],c=1/255*Math.min(a,Math.min(l,u));return u=1-1/255*Math.max(a,Math.max(l,u)),[d,c*100,u*100]},o.rgb.cmyk=function(i){const a=i[0]/255,l=i[1]/255,u=i[2]/255,d=Math.min(1-a,1-l,1-u),c=(1-a-d)/(1-d)||0,p=(1-l-d)/(1-d)||0,b=(1-u-d)/(1-d)||0;return[c*100,p*100,b*100,d*100]};function s(i,a){return(i[0]-a[0])**2+(i[1]-a[1])**2+(i[2]-a[2])**2}o.rgb.keyword=function(i){const a=n[i];if(a)return a;let l=1/0,u;for(const d of Object.keys(r)){const c=r[d],p=s(i,c);p<l&&(l=p,u=d)}return u},o.keyword.rgb=function(i){return r[i]},o.rgb.xyz=function(i){let a=i[0]/255,l=i[1]/255,u=i[2]/255;a=a>.04045?((a+.055)/1.055)**2.4:a/12.92,l=l>.04045?((l+.055)/1.055)**2.4:l/12.92,u=u>.04045?((u+.055)/1.055)**2.4:u/12.92;const d=a*.4124+l*.3576+u*.1805,c=a*.2126+l*.7152+u*.0722,p=a*.0193+l*.1192+u*.9505;return[d*100,c*100,p*100]},o.rgb.lab=function(i){const a=o.rgb.xyz(i);let l=a[0],u=a[1],d=a[2];l/=95.047,u/=100,d/=108.883,l=l>.008856?l**(1/3):7.787*l+16/116,u=u>.008856?u**(1/3):7.787*u+16/116,d=d>.008856?d**(1/3):7.787*d+16/116;const c=116*u-16,p=500*(l-u),b=200*(u-d);return[c,p,b]},o.hsl.rgb=function(i){const a=i[0]/360,l=i[1]/100,u=i[2]/100;let d,c,p;if(l===0)return p=u*255,[p,p,p];u<.5?d=u*(1+l):d=u+l-u*l;const b=2*u-d,w=[0,0,0];for(let g=0;g<3;g++)c=a+1/3*-(g-1),c<0&&c++,c>1&&c--,6*c<1?p=b+(d-b)*6*c:2*c<1?p=d:3*c<2?p=b+(d-b)*(2/3-c)*6:p=b,w[g]=p*255;return w},o.hsl.hsv=function(i){const a=i[0];let l=i[1]/100,u=i[2]/100,d=l;const c=Math.max(u,.01);u*=2,l*=u<=1?u:2-u,d*=c<=1?c:2-c;const p=(u+l)/2,b=u===0?2*d/(c+d):2*l/(u+l);return[a,b*100,p*100]},o.hsv.rgb=function(i){const a=i[0]/60,l=i[1]/100;let u=i[2]/100;const d=Math.floor(a)%6,c=a-Math.floor(a),p=255*u*(1-l),b=255*u*(1-l*c),w=255*u*(1-l*(1-c));switch(u*=255,d){case 0:return[u,w,p];case 1:return[b,u,p];case 2:return[p,u,w];case 3:return[p,b,u];case 4:return[w,p,u];case 5:return[u,p,b]}},o.hsv.hsl=function(i){const a=i[0],l=i[1]/100,u=i[2]/100,d=Math.max(u,.01);let c,p;p=(2-l)*u;const b=(2-l)*d;return c=l*d,c/=b<=1?b:2-b,c=c||0,p/=2,[a,c*100,p*100]},o.hwb.rgb=function(i){const a=i[0]/360;let l=i[1]/100,u=i[2]/100;const d=l+u;let c;d>1&&(l/=d,u/=d);const p=Math.floor(6*a),b=1-u;c=6*a-p,(p&1)!==0&&(c=1-c);const w=l+c*(b-l);let g,f,m;switch(p){default:case 6:case 0:g=b,f=w,m=l;break;case 1:g=w,f=b,m=l;break;case 2:g=l,f=b,m=w;break;case 3:g=l,f=w,m=b;break;case 4:g=w,f=l,m=b;break;case 5:g=b,f=l,m=w;break}return[g*255,f*255,m*255]},o.cmyk.rgb=function(i){const a=i[0]/100,l=i[1]/100,u=i[2]/100,d=i[3]/100,c=1-Math.min(1,a*(1-d)+d),p=1-Math.min(1,l*(1-d)+d),b=1-Math.min(1,u*(1-d)+d);return[c*255,p*255,b*255]},o.xyz.rgb=function(i){const a=i[0]/100,l=i[1]/100,u=i[2]/100;let d,c,p;return d=a*3.2406+l*-1.5372+u*-.4986,c=a*-.9689+l*1.8758+u*.0415,p=a*.0557+l*-.204+u*1.057,d=d>.0031308?1.055*d**(1/2.4)-.055:d*12.92,c=c>.0031308?1.055*c**(1/2.4)-.055:c*12.92,p=p>.0031308?1.055*p**(1/2.4)-.055:p*12.92,d=Math.min(Math.max(0,d),1),c=Math.min(Math.max(0,c),1),p=Math.min(Math.max(0,p),1),[d*255,c*255,p*255]},o.xyz.lab=function(i){let a=i[0],l=i[1],u=i[2];a/=95.047,l/=100,u/=108.883,a=a>.008856?a**(1/3):7.787*a+16/116,l=l>.008856?l**(1/3):7.787*l+16/116,u=u>.008856?u**(1/3):7.787*u+16/116;const d=116*l-16,c=500*(a-l),p=200*(l-u);return[d,c,p]},o.lab.xyz=function(i){const a=i[0],l=i[1],u=i[2];let d,c,p;c=(a+16)/116,d=l/500+c,p=c-u/200;const b=c**3,w=d**3,g=p**3;return c=b>.008856?b:(c-16/116)/7.787,d=w>.008856?w:(d-16/116)/7.787,p=g>.008856?g:(p-16/116)/7.787,d*=95.047,c*=100,p*=108.883,[d,c,p]},o.lab.lch=function(i){const a=i[0],l=i[1],u=i[2];let d;d=Math.atan2(u,l)*360/2/Math.PI,d<0&&(d+=360);const p=Math.sqrt(l*l+u*u);return[a,p,d]},o.lch.lab=function(i){const a=i[0],l=i[1],d=i[2]/360*2*Math.PI,c=l*Math.cos(d),p=l*Math.sin(d);return[a,c,p]},o.rgb.ansi16=function(i,a=null){const[l,u,d]=i;let c=a===null?o.rgb.hsv(i)[2]:a;if(c=Math.round(c/50),c===0)return 30;let p=30+(Math.round(d/255)<<2|Math.round(u/255)<<1|Math.round(l/255));return c===2&&(p+=60),p},o.hsv.ansi16=function(i){return o.rgb.ansi16(o.hsv.rgb(i),i[2])},o.rgb.ansi256=function(i){const a=i[0],l=i[1],u=i[2];return a===l&&l===u?a<8?16:a>248?231:Math.round((a-8)/247*24)+232:16+36*Math.round(a/255*5)+6*Math.round(l/255*5)+Math.round(u/255*5)},o.ansi16.rgb=function(i){let a=i%10;if(a===0||a===7)return i>50&&(a+=3.5),a=a/10.5*255,[a,a,a];const l=(~~(i>50)+1)*.5,u=(a&1)*l*255,d=(a>>1&1)*l*255,c=(a>>2&1)*l*255;return[u,d,c]},o.ansi256.rgb=function(i){if(i>=232){const c=(i-232)*10+8;return[c,c,c]}i-=16;let a;const l=Math.floor(i/36)/5*255,u=Math.floor((a=i%36)/6)/5*255,d=a%6/5*255;return[l,u,d]},o.rgb.hex=function(i){const l=(((Math.round(i[0])&255)<<16)+((Math.round(i[1])&255)<<8)+(Math.round(i[2])&255)).toString(16).toUpperCase();return"000000".substring(l.length)+l},o.hex.rgb=function(i){const a=i.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!a)return[0,0,0];let l=a[0];a[0].length===3&&(l=l.split("").map(b=>b+b).join(""));const u=parseInt(l,16),d=u>>16&255,c=u>>8&255,p=u&255;return[d,c,p]},o.rgb.hcg=function(i){const a=i[0]/255,l=i[1]/255,u=i[2]/255,d=Math.max(Math.max(a,l),u),c=Math.min(Math.min(a,l),u),p=d-c;let b,w;return p<1?b=c/(1-p):b=0,p<=0?w=0:d===a?w=(l-u)/p%6:d===l?w=2+(u-a)/p:w=4+(a-l)/p,w/=6,w%=1,[w*360,p*100,b*100]},o.hsl.hcg=function(i){const a=i[1]/100,l=i[2]/100,u=l<.5?2*a*l:2*a*(1-l);let d=0;return u<1&&(d=(l-.5*u)/(1-u)),[i[0],u*100,d*100]},o.hsv.hcg=function(i){const a=i[1]/100,l=i[2]/100,u=a*l;let d=0;return u<1&&(d=(l-u)/(1-u)),[i[0],u*100,d*100]},o.hcg.rgb=function(i){const a=i[0]/360,l=i[1]/100,u=i[2]/100;if(l===0)return[u*255,u*255,u*255];const d=[0,0,0],c=a%1*6,p=c%1,b=1-p;let w=0;switch(Math.floor(c)){case 0:d[0]=1,d[1]=p,d[2]=0;break;case 1:d[0]=b,d[1]=1,d[2]=0;break;case 2:d[0]=0,d[1]=1,d[2]=p;break;case 3:d[0]=0,d[1]=b,d[2]=1;break;case 4:d[0]=p,d[1]=0,d[2]=1;break;default:d[0]=1,d[1]=0,d[2]=b}return w=(1-l)*u,[(l*d[0]+w)*255,(l*d[1]+w)*255,(l*d[2]+w)*255]},o.hcg.hsv=function(i){const a=i[1]/100,l=i[2]/100,u=a+l*(1-a);let d=0;return u>0&&(d=a/u),[i[0],d*100,u*100]},o.hcg.hsl=function(i){const a=i[1]/100,u=i[2]/100*(1-a)+.5*a;let d=0;return u>0&&u<.5?d=a/(2*u):u>=.5&&u<1&&(d=a/(2*(1-u))),[i[0],d*100,u*100]},o.hcg.hwb=function(i){const a=i[1]/100,l=i[2]/100,u=a+l*(1-a);return[i[0],(u-a)*100,(1-u)*100]},o.hwb.hcg=function(i){const a=i[1]/100,l=i[2]/100,u=1-l,d=u-a;let c=0;return d<1&&(c=(u-d)/(1-d)),[i[0],d*100,c*100]},o.apple.rgb=function(i){return[i[0]/65535*255,i[1]/65535*255,i[2]/65535*255]},o.rgb.apple=function(i){return[i[0]/255*65535,i[1]/255*65535,i[2]/255*65535]},o.gray.rgb=function(i){return[i[0]/100*255,i[0]/100*255,i[0]/100*255]},o.gray.hsl=function(i){return[0,0,i[0]]},o.gray.hsv=o.gray.hsl,o.gray.hwb=function(i){return[0,100,i[0]]},o.gray.cmyk=function(i){return[0,0,0,i[0]]},o.gray.lab=function(i){return[i[0],0,0]},o.gray.hex=function(i){const a=Math.round(i[0]/100*255)&255,u=((a<<16)+(a<<8)+a).toString(16).toUpperCase();return"000000".substring(u.length)+u},o.rgb.gray=function(i){return[(i[0]+i[1]+i[2])/3/255*100]}}}),o1=Ar({"node_modules/color-convert/route.js"(e,t){var r=Nf();function n(){const a={},l=Object.keys(r);for(let u=l.length,d=0;d<u;d++)a[l[d]]={distance:-1,parent:null};return a}function o(a){const l=n(),u=[a];for(l[a].distance=0;u.length;){const d=u.pop(),c=Object.keys(r[d]);for(let p=c.length,b=0;b<p;b++){const w=c[b],g=l[w];g.distance===-1&&(g.distance=l[d].distance+1,g.parent=d,u.unshift(w))}}return l}function s(a,l){return function(u){return l(a(u))}}function i(a,l){const u=[l[a].parent,a];let d=r[l[a].parent][a],c=l[a].parent;for(;l[c].parent;)u.unshift(l[c].parent),d=s(r[l[c].parent][c],d),c=l[c].parent;return d.conversion=u,d}t.exports=function(a){const l=o(a),u={},d=Object.keys(l);for(let c=d.length,p=0;p<c;p++){const b=d[p];l[b].parent!==null&&(u[b]=i(b,l))}return u}}}),i1=Ar({"node_modules/color-convert/index.js"(e,t){var r=Nf(),n=o1(),o={},s=Object.keys(r);function i(l){const u=function(...d){const c=d[0];return c==null?c:(c.length>1&&(d=c),l(d))};return"conversion"in l&&(u.conversion=l.conversion),u}function a(l){const u=function(...d){const c=d[0];if(c==null)return c;c.length>1&&(d=c);const p=l(d);if(typeof p=="object")for(let b=p.length,w=0;w<b;w++)p[w]=Math.round(p[w]);return p};return"conversion"in l&&(u.conversion=l.conversion),u}s.forEach(l=>{o[l]={},Object.defineProperty(o[l],"channels",{value:r[l].channels}),Object.defineProperty(o[l],"labels",{value:r[l].labels});const u=n(l);Object.keys(u).forEach(c=>{const p=u[c];o[l][c]=a(p),o[l][c].raw=i(p)})}),t.exports=o}}),s1=Ar({"node_modules/color/index.js"(e,t){var r=n1(),n=i1(),o=[].slice,s=["keyword","gray","hex"],i={};for(const g of Object.keys(n))i[o.call(n[g].labels).sort().join("")]=g;var a={};function l(g,f){if(!(this instanceof l))return new l(g,f);if(f&&f in s&&(f=null),f&&!(f in n))throw new Error("Unknown model: "+f);let m,y;if(g==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(g instanceof l)this.model=g.model,this.color=g.color.slice(),this.valpha=g.valpha;else if(typeof g=="string"){const _=r.get(g);if(_===null)throw new Error("Unable to parse color from string: "+g);this.model=_.model,y=n[this.model].channels,this.color=_.value.slice(0,y),this.valpha=typeof _.value[y]=="number"?_.value[y]:1}else if(g.length>0){this.model=f||"rgb",y=n[this.model].channels;const _=o.call(g,0,y);this.color=w(_,y),this.valpha=typeof g[y]=="number"?g[y]:1}else if(typeof g=="number")this.model="rgb",this.color=[g>>16&255,g>>8&255,g&255],this.valpha=1;else{this.valpha=1;const _=Object.keys(g);"alpha"in g&&(_.splice(_.indexOf("alpha"),1),this.valpha=typeof g.alpha=="number"?g.alpha:0);const x=_.sort().join("");if(!(x in i))throw new Error("Unable to parse color from object: "+JSON.stringify(g));this.model=i[x];const k=n[this.model].labels,C=[];for(m=0;m<k.length;m++)C.push(g[k[m]]);this.color=w(C)}if(a[this.model])for(y=n[this.model].channels,m=0;m<y;m++){const _=a[this.model][m];_&&(this.color[m]=_(this.color[m]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}l.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(g){let f=this.model in r.to?this:this.rgb();f=f.round(typeof g=="number"?g:1);const m=f.valpha===1?f.color:f.color.concat(this.valpha);return r.to[f.model](m)},percentString(g){const f=this.rgb().round(typeof g=="number"?g:1),m=f.valpha===1?f.color:f.color.concat(this.valpha);return r.to.rgb.percent(m)},array(){return this.valpha===1?this.color.slice():this.color.concat(this.valpha)},object(){const g={},f=n[this.model].channels,m=n[this.model].labels;for(let y=0;y<f;y++)g[m[y]]=this.color[y];return this.valpha!==1&&(g.alpha=this.valpha),g},unitArray(){const g=this.rgb().color;return g[0]/=255,g[1]/=255,g[2]/=255,this.valpha!==1&&g.push(this.valpha),g},unitObject(){const g=this.rgb().object();return g.r/=255,g.g/=255,g.b/=255,this.valpha!==1&&(g.alpha=this.valpha),g},round(g){return g=Math.max(g||0,0),new l(this.color.map(d(g)).concat(this.valpha),this.model)},alpha(g){return arguments.length>0?new l(this.color.concat(Math.max(0,Math.min(1,g))),this.model):this.valpha},red:c("rgb",0,p(255)),green:c("rgb",1,p(255)),blue:c("rgb",2,p(255)),hue:c(["hsl","hsv","hsl","hwb","hcg"],0,g=>(g%360+360)%360),saturationl:c("hsl",1,p(100)),lightness:c("hsl",2,p(100)),saturationv:c("hsv",1,p(100)),value:c("hsv",2,p(100)),chroma:c("hcg",1,p(100)),gray:c("hcg",2,p(100)),white:c("hwb",1,p(100)),wblack:c("hwb",2,p(100)),cyan:c("cmyk",0,p(100)),magenta:c("cmyk",1,p(100)),yellow:c("cmyk",2,p(100)),black:c("cmyk",3,p(100)),x:c("xyz",0,p(100)),y:c("xyz",1,p(100)),z:c("xyz",2,p(100)),l:c("lab",0,p(100)),a:c("lab",1),b:c("lab",2),keyword(g){return arguments.length>0?new l(g):n[this.model].keyword(this.color)},hex(g){return arguments.length>0?new l(g):r.to.hex(this.rgb().round().color)},hexa(g){if(arguments.length>0)return new l(g);const f=this.rgb().round().color;let m=Math.round(this.valpha*255).toString(16).toUpperCase();return m.length===1&&(m="0"+m),r.to.hex(f)+m},rgbNumber(){const g=this.rgb().color;return(g[0]&255)<<16|(g[1]&255)<<8|g[2]&255},luminosity(){const g=this.rgb().color,f=[];for(const[m,y]of g.entries()){const _=y/255;f[m]=_<=.03928?_/12.92:((_+.055)/1.055)**2.4}return .2126*f[0]+.7152*f[1]+.0722*f[2]},contrast(g){const f=this.luminosity(),m=g.luminosity();return f>m?(f+.05)/(m+.05):(m+.05)/(f+.05)},level(g){const f=this.contrast(g);return f>=7.1?"AAA":f>=4.5?"AA":""},isDark(){const g=this.rgb().color;return(g[0]*299+g[1]*587+g[2]*114)/1e3<128},isLight(){return!this.isDark()},negate(){const g=this.rgb();for(let f=0;f<3;f++)g.color[f]=255-g.color[f];return g},lighten(g){const f=this.hsl();return f.color[2]+=f.color[2]*g,f},darken(g){const f=this.hsl();return f.color[2]-=f.color[2]*g,f},saturate(g){const f=this.hsl();return f.color[1]+=f.color[1]*g,f},desaturate(g){const f=this.hsl();return f.color[1]-=f.color[1]*g,f},whiten(g){const f=this.hwb();return f.color[1]+=f.color[1]*g,f},blacken(g){const f=this.hwb();return f.color[2]+=f.color[2]*g,f},grayscale(){const g=this.rgb().color,f=g[0]*.3+g[1]*.59+g[2]*.11;return l.rgb(f,f,f)},fade(g){return this.alpha(this.valpha-this.valpha*g)},opaquer(g){return this.alpha(this.valpha+this.valpha*g)},rotate(g){const f=this.hsl();let m=f.color[0];return m=(m+g)%360,m=m<0?360+m:m,f.color[0]=m,f},mix(g,f){if(!g||!g.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof g);const m=g.rgb(),y=this.rgb(),_=f===void 0?.5:f,x=2*_-1,k=m.alpha()-y.alpha(),C=((x*k===-1?x:(x+k)/(1+x*k))+1)/2,E=1-C;return l.rgb(C*m.red()+E*y.red(),C*m.green()+E*y.green(),C*m.blue()+E*y.blue(),m.alpha()*_+y.alpha()*(1-_))}};for(const g of Object.keys(n)){if(s.includes(g))continue;const f=n[g].channels;l.prototype[g]=function(){if(this.model===g)return new l(this);if(arguments.length>0)return new l(arguments,g);const m=typeof arguments[f]=="number"?f:this.valpha;return new l(b(n[this.model][g].raw(this.color)).concat(m),g)},l[g]=function(m){return typeof m=="number"&&(m=w(o.call(arguments),f)),new l(m,g)}}function u(g,f){return Number(g.toFixed(f))}function d(g){return function(f){return u(f,g)}}function c(g,f,m){g=Array.isArray(g)?g:[g];for(const y of g)(a[y]||(a[y]=[]))[f]=m;return g=g[0],function(y){let _;return arguments.length>0?(m&&(y=m(y)),_=this[g](),_.color[f]=y,_):(_=this[g]().color[f],m&&(_=m(_)),_)}}function p(g){return function(f){return Math.max(0,Math.min(g,f))}}function b(g){return Array.isArray(g)?g:[g]}function w(g,f){for(let m=0;m<f;m++)typeof g[m]!="number"&&(g[m]=0);return g}t.exports=l}}),a1=Eg(s1(),1),Od="EyeDropper"in window,ae=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this),this.isSafeValue=!1,this.localize=new ut(this),this.inputValue="",this.hue=0,this.saturation=100,this.lightness=100,this.alpha=100,this.value="#ffffff",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.invalid=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches=["#d0021b","#f5a623","#f8e71c","#8b572a","#7ed321","#417505","#bd10e0","#9013fe","#4a90e2","#50e3c2","#b8e986","#000","#444","#888","#ccc","#fff"]}connectedCallback(){super.connectedCallback(),this.setColor(this.value)||this.setColor("#ffff"),this.inputValue=this.value,this.lastValueEmitted=this.value,this.syncValues()}getFormattedValue(e="hex"){const t=this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`);if(t===null)return"";switch(e){case"hex":return t.hex;case"hexa":return t.hexa;case"rgb":return t.rgb.string;case"rgba":return t.rgba.string;case"hsl":return t.hsl.string;case"hsla":return t.hsla.string;default:return""}}reportValidity(){return!this.inline&&this.input.invalid?new Promise(e=>{this.dropdown.addEventListener("sl-after-show",()=>{this.input.reportValidity(),e()},{once:!0}),this.dropdown.show()}):this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=this.input.invalid}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){const e=["hex","rgb","hsl"],t=(e.indexOf(this.format)+1)%e.length;this.format=e[t]}handleAlphaDrag(e){const t=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),r=t.querySelector(".color-picker__slider-handle"),{width:n}=t.getBoundingClientRect();r.focus(),e.preventDefault(),ko(t,o=>{this.alpha=Ae(o/n*100,0,100),this.syncValues()})}handleHueDrag(e){const t=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),r=t.querySelector(".color-picker__slider-handle"),{width:n}=t.getBoundingClientRect();r.focus(),e.preventDefault(),ko(t,o=>{this.hue=Ae(o/n*360,0,360),this.syncValues()})}handleGridDrag(e){const t=this.shadowRoot.querySelector(".color-picker__grid"),r=t.querySelector(".color-picker__grid-handle"),{width:n,height:o}=t.getBoundingClientRect();r.focus(),e.preventDefault(),ko(t,(s,i)=>{this.saturation=Ae(s/n*100,0,100),this.lightness=Ae(100-i/o*100,0,100),this.syncValues()})}handleAlphaKeyDown(e){const t=e.shiftKey?10:1;e.key==="ArrowLeft"&&(e.preventDefault(),this.alpha=Ae(this.alpha-t,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.alpha=Ae(this.alpha+t,0,100),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.alpha=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.alpha=100,this.syncValues())}handleHueKeyDown(e){const t=e.shiftKey?10:1;e.key==="ArrowLeft"&&(e.preventDefault(),this.hue=Ae(this.hue-t,0,360),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.hue=Ae(this.hue+t,0,360),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.hue=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.hue=360,this.syncValues())}handleGridKeyDown(e){const t=e.shiftKey?10:1;e.key==="ArrowLeft"&&(e.preventDefault(),this.saturation=Ae(this.saturation-t,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.saturation=Ae(this.saturation+t,0,100),this.syncValues()),e.key==="ArrowUp"&&(e.preventDefault(),this.lightness=Ae(this.lightness+t,0,100),this.syncValues()),e.key==="ArrowDown"&&(e.preventDefault(),this.lightness=Ae(this.lightness-t,0,100),this.syncValues())}handleInputChange(e){const t=e.target;this.setColor(t.value),t.value=this.value,e.stopPropagation()}handleInputKeyDown(e){e.key==="Enter"&&(this.setColor(this.input.value),this.input.value=this.value,setTimeout(()=>this.input.select()))}normalizeColorString(e){if(/rgba?/i.test(e)){const t=e.replace(/[^\d.%]/g," ").split(" ").map(r=>r.trim()).filter(r=>r.length);return t.length<4&&(t[3]="1"),t[3].indexOf("%")>-1&&(t[3]=(parseFloat(t[3].replace(/%/g,""))/100).toString()),`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]})`}if(/hsla?/i.test(e)){const t=e.replace(/[^\d.%]/g," ").split(" ").map(r=>r.trim()).filter(r=>r.length);return t.length<4&&(t[3]="1"),t[3].indexOf("%")>-1&&(t[3]=(parseFloat(t[3].replace(/%/g,""))/100).toString()),`hsla(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]})`}return/^[0-9a-f]+$/i.test(e)?`#${e}`:e}parseColor(e){let t;e=this.normalizeColorString(e);try{t=(0,a1.default)(e)}catch{return null}const r=t.hsl(),n={h:r.hue(),s:r.saturationl(),l:r.lightness(),a:r.alpha()},o=t.rgb(),s={r:o.red(),g:o.green(),b:o.blue(),a:o.alpha()},i={r:hi(s.r),g:hi(s.g),b:hi(s.b),a:hi(s.a*255)};return{hsl:{h:n.h,s:n.s,l:n.l,string:this.setLetterCase(`hsl(${Math.round(n.h)}, ${Math.round(n.s)}%, ${Math.round(n.l)}%)`)},hsla:{h:n.h,s:n.s,l:n.l,a:n.a,string:this.setLetterCase(`hsla(${Math.round(n.h)}, ${Math.round(n.s)}%, ${Math.round(n.l)}%, ${n.a.toFixed(2).toString()})`)},rgb:{r:s.r,g:s.g,b:s.b,string:this.setLetterCase(`rgb(${Math.round(s.r)}, ${Math.round(s.g)}, ${Math.round(s.b)})`)},rgba:{r:s.r,g:s.g,b:s.b,a:s.a,string:this.setLetterCase(`rgba(${Math.round(s.r)}, ${Math.round(s.g)}, ${Math.round(s.b)}, ${s.a.toFixed(2).toString()})`)},hex:this.setLetterCase(`#${i.r}${i.g}${i.b}`),hexa:this.setLetterCase(`#${i.r}${i.g}${i.b}${i.a}`)}}setColor(e){const t=this.parseColor(e);return t===null?!1:(this.hue=t.hsla.h,this.saturation=t.hsla.s,this.lightness=t.hsla.l,this.alpha=this.opacity?t.hsla.a*100:100,this.syncValues(),!0)}setLetterCase(e){return typeof e!="string"?"":this.uppercase?e.toUpperCase():e.toLowerCase()}async syncValues(){const e=this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`);e!==null&&(this.format==="hsl"?this.inputValue=this.opacity?e.hsla.string:e.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?e.rgba.string:e.rgb.string:this.inputValue=this.opacity?e.hexa:e.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!Od)return;new EyeDropper().open().then(t=>this.setColor(t.sRGBHex)).catch(()=>{})}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(e,t){if(!this.isSafeValue&&e!==void 0){const r=this.parseColor(t);r!==null?(this.inputValue=this.value,this.hue=r.hsla.h,this.saturation=r.hsla.s,this.lightness=r.hsla.l,this.alpha=r.hsla.a*100):this.inputValue=e}this.value!==this.lastValueEmitted&&(P(this,"sl-change"),this.lastValueEmitted=this.value)}render(){const e=this.saturation,t=100-this.lightness,r=O`
      <div
        part="base"
        class=${Z({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?O`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${et({backgroundColor:`hsl(${this.hue}deg, 100%, 50%)`})}
          @mousedown=${this.handleGridDrag}
          @touchstart=${this.handleGridDrag}
        >
          <span
            part="grid-handle"
            class="color-picker__grid-handle"
            style=${et({top:`${t}%`,left:`${e}%`,backgroundColor:`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`})}
            role="application"
            aria-label="HSL"
            tabindex=${M(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @mousedown=${this.handleHueDrag}
              @touchstart=${this.handleHueDrag}
            >
              <span
                part="slider-handle"
                class="color-picker__slider-handle"
                style=${et({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${M(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?O`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @mousedown="${this.handleAlphaDrag}"
                    @touchstart="${this.handleAlphaDrag}"
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${et({backgroundImage:`linear-gradient(
                          to right,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle"
                      class="color-picker__slider-handle"
                      style=${et({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${M(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${et({"--preview-color":`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${_r(this.inputValue)}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":O`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${Od?O`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${this.swatches.length>0?O`
              <div part="swatches" class="color-picker__swatches">
                ${this.swatches.map(n=>O`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${M(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${n}
                      @click=${()=>!this.disabled&&this.setColor(n)}
                      @keydown=${o=>!this.disabled&&o.key==="Enter"&&this.setColor(n)}
                    >
                      <div class="color-picker__swatch-color" style=${et({backgroundColor:n})}></div>
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `;return this.inline?r:O`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containing-element=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${Z({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-picker__transparent-bg":!0})}
          style=${et({color:`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${r}
      </sl-dropdown>
    `}};ae.styles=e1;h([K('[part="input"]')],ae.prototype,"input",2);h([K('[part="preview"]')],ae.prototype,"previewButton",2);h([K(".color-dropdown")],ae.prototype,"dropdown",2);h([se()],ae.prototype,"inputValue",2);h([se()],ae.prototype,"hue",2);h([se()],ae.prototype,"saturation",2);h([se()],ae.prototype,"lightness",2);h([se()],ae.prototype,"alpha",2);h([v()],ae.prototype,"value",2);h([v()],ae.prototype,"label",2);h([v()],ae.prototype,"format",2);h([v({type:Boolean,reflect:!0})],ae.prototype,"inline",2);h([v()],ae.prototype,"size",2);h([v({attribute:"no-format-toggle",type:Boolean})],ae.prototype,"noFormatToggle",2);h([v()],ae.prototype,"name",2);h([v({type:Boolean,reflect:!0})],ae.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],ae.prototype,"invalid",2);h([v({type:Boolean})],ae.prototype,"hoist",2);h([v({type:Boolean})],ae.prototype,"opacity",2);h([v({type:Boolean})],ae.prototype,"uppercase",2);h([v({attribute:!1})],ae.prototype,"swatches",2);h([v()],ae.prototype,"lang",2);h([R("format")],ae.prototype,"handleFormatChange",1);h([R("opacity")],ae.prototype,"handleOpacityChange",1);h([R("value")],ae.prototype,"handleValueChange",1);ae=h([H("sl-color-picker")],ae);function hi(e){const t=Math.round(e).toString(16);return t.length===1?`0${t}`:t}j(V,"sl-color-picker",ae,{onSlChange:"sl-change"});var l1=X`
  ${Y}

  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    cursor: pointer;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header${Q} {
    box-shadow: var(--sl-focus-ring);
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header${Q} {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) transform ease;
  }

  .details--open .details__summary-icon {
    transform: rotate(90deg);
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    padding: var(--sl-spacing-medium);
  }
`,xt=class extends U{constructor(){super(...arguments);this.open=!1,this.disabled=!1}firstUpdated(){this.body.hidden=!this.open,this.body.style.height=this.open?"auto":"0"}async show(){if(!(this.open||this.disabled))return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,pt(this,"sl-after-hide")}handleSummaryClick(){this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show())}async handleOpenChange(){if(this.open){P(this,"sl-show"),await Le(this.body),this.body.hidden=!1;const{keyframes:e,options:t}=Te(this,"details.show");await Ee(this.body,Ed(e,this.body.scrollHeight),t),this.body.style.height="auto",P(this,"sl-after-show")}else{P(this,"sl-hide"),await Le(this.body);const{keyframes:e,options:t}=Te(this,"details.hide");await Ee(this.body,Ed(e,this.body.scrollHeight),t),this.body.hidden=!0,this.body.style.height="auto",P(this,"sl-after-hide")}}render(){return O`
      <div
        part="base"
        class=${Z({details:!0,"details--open":this.open,"details--disabled":this.disabled})}
      >
        <header
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <div part="summary" class="details__summary">
            <slot name="summary">${this.summary}</slot>
          </div>

          <span part="summary-icon" class="details__summary-icon">
            <sl-icon name="chevron-right" library="system"></sl-icon>
          </span>
        </header>

        <div class="details__body">
          <div part="content" id="content" class="details__content" role="region" aria-labelledby="header">
            <slot></slot>
          </div>
        </div>
      </div>
    `}};xt.styles=l1;h([K(".details")],xt.prototype,"details",2);h([K(".details__header")],xt.prototype,"header",2);h([K(".details__body")],xt.prototype,"body",2);h([v({type:Boolean,reflect:!0})],xt.prototype,"open",2);h([v()],xt.prototype,"summary",2);h([v({type:Boolean,reflect:!0})],xt.prototype,"disabled",2);h([R("open",{waitUntilFirstUpdate:!0})],xt.prototype,"handleOpenChange",1);xt=h([H("sl-details")],xt);pe("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});pe("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});j(V,"sl-details",xt,{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"});function Dd(e){const t=e.tagName.toLowerCase();return e.getAttribute("tabindex")==="-1"||e.hasAttribute("disabled")||e.hasAttribute("aria-disabled")&&e.getAttribute("aria-disabled")!=="false"||t==="input"&&e.getAttribute("type")==="radio"&&!e.hasAttribute("checked")||e.offsetParent===null||window.getComputedStyle(e).visibility==="hidden"?!1:(t==="audio"||t==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"?!0:["button","input","select","textarea","a","audio","video","summary"].includes(t)}function Ff(e){var t,r;const n=[];function o(a){a instanceof HTMLElement&&(n.push(a),a.shadowRoot!==null&&a.shadowRoot.mode==="open"&&o(a.shadowRoot)),[...a.querySelectorAll("*")].forEach(l=>o(l))}o(e);const s=(t=n.find(a=>Dd(a)))!=null?t:null,i=(r=n.reverse().find(a=>Dd(a)))!=null?r:null;return{start:s,end:i}}var so=[],Bf=class{constructor(e){this.tabDirection="forward",this.element=e,this.handleFocusIn=this.handleFocusIn.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}activate(){so.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){so=so.filter(e=>e!==this.element),document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return so[so.length-1]===this.element}checkFocus(){if(this.isActive()&&!this.element.matches(":focus-within")){const{start:e,end:t}=Ff(this.element),r=this.tabDirection==="forward"?e:t;typeof(r==null?void 0:r.focus)=="function"&&r.focus({preventScroll:!0})}}handleFocusIn(){this.checkFocus()}handleKeyDown(e){e.key==="Tab"&&e.shiftKey&&(this.tabDirection="backward"),requestAnimationFrame(()=>this.checkFocus())}handleKeyUp(){this.tabDirection="forward"}},u1=X`
  ${Y}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
    transform: none;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .dialog__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-left: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }
`,_t=class extends U{constructor(){super(...arguments);this.hasSlotController=new Ct(this,"footer"),this.localize=new ut(this),this.open=!1,this.label="",this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.modal=new Bf(this)}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.modal.activate(),cs(this))}disconnectedCallback(){super.disconnectedCallback(),ds(this)}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}requestClose(e){if(P(this,"sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const r=Te(this,"dialog.denyClose");Ee(this.panel,r.keyframes,r.options);return}this.hide()}handleKeyDown(e){e.key==="Escape"&&(e.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){P(this,"sl-show"),this.originalTrigger=document.activeElement,this.modal.activate(),cs(this);const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([Le(this.dialog),Le(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{P(this,"sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=Te(this,"dialog.show"),r=Te(this,"dialog.overlay.show");await Promise.all([Ee(this.panel,t.keyframes,t.options),Ee(this.overlay,r.keyframes,r.options)]),P(this,"sl-after-show")}else{P(this,"sl-hide"),this.modal.deactivate(),await Promise.all([Le(this.dialog),Le(this.overlay)]);const e=Te(this,"dialog.hide"),t=Te(this,"dialog.overlay.hide");await Promise.all([Ee(this.panel,e.keyframes,e.options),Ee(this.overlay,t.keyframes,t.options)]),this.dialog.hidden=!0,ds(this);const r=this.originalTrigger;typeof(r==null?void 0:r.focus)=="function"&&setTimeout(()=>r.focus()),P(this,"sl-after-hide")}}render(){return O`
      <div
        part="base"
        class=${Z({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${M(this.noHeader?this.label:void 0)}
          aria-labelledby=${M(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":O`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="dialog__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click="${()=>this.requestClose("close-button")}"
                  ></sl-icon-button>
                </header>
              `}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};_t.styles=u1;h([K(".dialog")],_t.prototype,"dialog",2);h([K(".dialog__panel")],_t.prototype,"panel",2);h([K(".dialog__overlay")],_t.prototype,"overlay",2);h([v({type:Boolean,reflect:!0})],_t.prototype,"open",2);h([v({reflect:!0})],_t.prototype,"label",2);h([v({attribute:"no-header",type:Boolean,reflect:!0})],_t.prototype,"noHeader",2);h([R("open",{waitUntilFirstUpdate:!0})],_t.prototype,"handleOpenChange",1);_t=h([H("sl-dialog")],_t);pe("dialog.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}});pe("dialog.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:250,easing:"ease"}});pe("dialog.denyClose",{keyframes:[{transform:"scale(1)"},{transform:"scale(1.02)"},{transform:"scale(1)"}],options:{duration:250}});pe("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});pe("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});j(V,"sl-dialog",_t,{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide",onSlInitialFocus:"sl-initial-focus",onSlRequestClose:"sl-request-close"});var c1=X`
  ${Y}

  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,jn=class extends U{constructor(){super(...arguments);this.vertical=!1}firstUpdated(){this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};jn.styles=c1;h([v({type:Boolean,reflect:!0})],jn.prototype,"vertical",2);h([R("vertical")],jn.prototype,"handleVerticalChange",1);jn=h([H("sl-divider")],jn);j(V,"sl-divider",jn,{});var d1=X`
  ${Y}

  :host {
    display: inline-block;
  }

  .dropdown {
    position: relative;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__positioner {
    position: absolute;
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    box-shadow: var(--sl-shadow-large);
    overflow: auto;
    overscroll-behavior: none;
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    pointer-events: all;
  }

  .dropdown__positioner[data-placement^='top'] .dropdown__panel {
    transform-origin: bottom;
  }

  .dropdown__positioner[data-placement^='bottom'] .dropdown__panel {
    transform-origin: top;
  }

  .dropdown__positioner[data-placement^='left'] .dropdown__panel {
    transform-origin: right;
  }

  .dropdown__positioner[data-placement^='right'] .dropdown__panel {
    transform-origin: left;
  }
`,Ie=class extends U{constructor(){super(...arguments);this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleMenuItemActivate=this.handleMenuItemActivate.bind(this),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this)}async firstUpdated(){this.panel.hidden=!this.open,this.open&&(await this.updateComplete,this.startPositioner())}disconnectedCallback(){super.disconnectedCallback(),this.hide(),this.stopPositioner()}focusOnTrigger(){const t=this.trigger.querySelector("slot").assignedElements({flatten:!0})[0];typeof(t==null?void 0:t.focus)=="function"&&t.focus()}getMenu(){return this.panel.querySelector("slot").assignedElements({flatten:!0}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleDocumentKeyDown(e){var t;if(e.key==="Escape"){this.hide(),this.focusOnTrigger();return}if(e.key==="Tab"){if(this.open&&((t=document.activeElement)==null?void 0:t.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var r,n,o;const s=((r=this.containingElement)==null?void 0:r.getRootNode())instanceof ShadowRoot?(o=(n=document.activeElement)==null?void 0:n.shadowRoot)==null?void 0:o.activeElement:document.activeElement;(!this.containingElement||(s==null?void 0:s.closest(this.containingElement.tagName.toLowerCase()))!==this.containingElement)&&this.hide()})}}handleDocumentMouseDown(e){const t=e.composedPath();this.containingElement&&!t.includes(this.containingElement)&&this.hide()}handleMenuItemActivate(e){const t=e.target;Tl(t,this.panel)}handlePanelSelect(e){const t=e.target;!this.stayOpenOnSelect&&t.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}handlePopoverOptionsChange(){this.updatePositioner()}handleTriggerClick(){this.open?this.hide():this.show()}handleTriggerKeyDown(e){const t=this.getMenu(),r=t.defaultSlot.assignedElements({flatten:!0}),n=r[0],o=r[r.length-1];if(e.key==="Escape"){this.focusOnTrigger(),this.hide();return}if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||this.show(),requestAnimationFrame(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(t.setCurrentItem(n),n.focus()),(e.key==="ArrowUp"||e.key==="End")&&(t.setCurrentItem(o),o.focus())}));const s=["Tab","Shift","Meta","Ctrl","Alt"];this.open&&!s.includes(e.key)&&t.typeToSelect(e)}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const r=this.trigger.querySelector("slot").assignedElements({flatten:!0}).find(o=>Ff(o).start);let n;if(r){switch(r.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":n=r.button;break;default:n=r}n.setAttribute("aria-haspopup","true"),n.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}reposition(){this.updatePositioner()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){P(this,"sl-show"),this.panel.addEventListener("sl-activate",this.handleMenuItemActivate),this.panel.addEventListener("sl-select",this.handlePanelSelect),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),await Le(this),this.startPositioner(),this.panel.hidden=!1;const{keyframes:e,options:t}=Te(this,"dropdown.show");await Ee(this.panel,e,t),P(this,"sl-after-show")}else{P(this,"sl-hide"),this.panel.removeEventListener("sl-activate",this.handleMenuItemActivate),this.panel.removeEventListener("sl-select",this.handlePanelSelect),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),await Le(this);const{keyframes:e,options:t}=Te(this,"dropdown.hide");await Ee(this.panel,e,t),this.panel.hidden=!0,this.stopPositioner(),P(this,"sl-after-hide")}}startPositioner(){this.stopPositioner(),this.updatePositioner(),this.positionerCleanup=Pf(this.trigger,this.positioner,this.updatePositioner.bind(this))}updatePositioner(){!this.open||!this.trigger||!this.positioner||Of(this.trigger,this.positioner,{placement:this.placement,middleware:[Ef({mainAxis:this.distance,crossAxis:this.skidding}),Cf(),Tf(),ry({apply:({width:e,height:t})=>{Object.assign(this.panel.style,{maxWidth:`${e}px`,maxHeight:`${t}px`})},padding:8})],strategy:this.hoist?"fixed":"absolute"}).then(({x:e,y:t,placement:r})=>{this.positioner.setAttribute("data-placement",r),Object.assign(this.positioner.style,{position:this.hoist?"fixed":"absolute",left:`${e}px`,top:`${t}px`})})}stopPositioner(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=void 0,this.positioner.removeAttribute("data-placement"))}render(){return O`
      <div
        part="base"
        id="dropdown"
        class=${Z({dropdown:!0,"dropdown--open":this.open})}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        >
          <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div
            part="panel"
            class="dropdown__panel"
            aria-hidden=${this.open?"false":"true"}
            aria-labelledby="dropdown"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `}};Ie.styles=d1;h([K(".dropdown__trigger")],Ie.prototype,"trigger",2);h([K(".dropdown__panel")],Ie.prototype,"panel",2);h([K(".dropdown__positioner")],Ie.prototype,"positioner",2);h([v({type:Boolean,reflect:!0})],Ie.prototype,"open",2);h([v({reflect:!0})],Ie.prototype,"placement",2);h([v({type:Boolean})],Ie.prototype,"disabled",2);h([v({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],Ie.prototype,"stayOpenOnSelect",2);h([v({attribute:!1})],Ie.prototype,"containingElement",2);h([v({type:Number})],Ie.prototype,"distance",2);h([v({type:Number})],Ie.prototype,"skidding",2);h([v({type:Boolean})],Ie.prototype,"hoist",2);h([R("distance"),R("hoist"),R("placement"),R("skidding")],Ie.prototype,"handlePopoverOptionsChange",1);h([R("open",{waitUntilFirstUpdate:!0})],Ie.prototype,"handleOpenChange",1);Ie=h([H("sl-dropdown")],Ie);pe("dropdown.show",{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:100,easing:"ease"}});pe("dropdown.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:100,easing:"ease"}});j(V,"sl-dropdown",Ie,{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"});var h1=X`
  ${Y}

  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    transition: var(--sl-transition-medium) transform;
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    right: 0;
    bottom: auto;
    left: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .drawer__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-right: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    position: absolute;
  }
`;function Id(e){return e.charAt(0).toUpperCase()+e.slice(1)}var at=class extends U{constructor(){super(...arguments);this.hasSlotController=new Ct(this,"footer"),this.localize=new ut(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.modal=new Bf(this)}firstUpdated(){this.drawer.hidden=!this.open,this.open&&!this.contained&&(this.modal.activate(),cs(this))}disconnectedCallback(){super.disconnectedCallback(),ds(this)}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}requestClose(e){if(P(this,"sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const r=Te(this,"drawer.denyClose");Ee(this.panel,r.keyframes,r.options);return}this.hide()}handleKeyDown(e){e.key==="Escape"&&(e.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){P(this,"sl-show"),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),cs(this));const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([Le(this.drawer),Le(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{P(this,"sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=Te(this,`drawer.show${Id(this.placement)}`),r=Te(this,"drawer.overlay.show");await Promise.all([Ee(this.panel,t.keyframes,t.options),Ee(this.overlay,r.keyframes,r.options)]),P(this,"sl-after-show")}else{P(this,"sl-hide"),this.modal.deactivate(),ds(this),await Promise.all([Le(this.drawer),Le(this.overlay)]);const e=Te(this,`drawer.hide${Id(this.placement)}`),t=Te(this,"drawer.overlay.hide");await Promise.all([Ee(this.panel,e.keyframes,e.options),Ee(this.overlay,t.keyframes,t.options)]),this.drawer.hidden=!0;const r=this.originalTrigger;typeof(r==null?void 0:r.focus)=="function"&&setTimeout(()=>r.focus()),P(this,"sl-after-hide")}}render(){return O`
      <div
        part="base"
        class=${Z({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--has-footer":this.hasSlotController.test("footer")})}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${M(this.noHeader?this.label:void 0)}
          aria-labelledby=${M(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":O`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="drawer__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click=${()=>this.requestClose("close-button")}
                  ></sl-icon-button>
                </header>
              `}

          <div part="body" class="drawer__body">
            <slot></slot>
          </div>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};at.styles=h1;h([K(".drawer")],at.prototype,"drawer",2);h([K(".drawer__panel")],at.prototype,"panel",2);h([K(".drawer__overlay")],at.prototype,"overlay",2);h([v({type:Boolean,reflect:!0})],at.prototype,"open",2);h([v({reflect:!0})],at.prototype,"label",2);h([v({reflect:!0})],at.prototype,"placement",2);h([v({type:Boolean,reflect:!0})],at.prototype,"contained",2);h([v({attribute:"no-header",type:Boolean,reflect:!0})],at.prototype,"noHeader",2);h([R("open",{waitUntilFirstUpdate:!0})],at.prototype,"handleOpenChange",1);at=h([H("sl-drawer")],at);pe("drawer.showTop",{keyframes:[{opacity:0,transform:"translateY(-100%)"},{opacity:1,transform:"translateY(0)"}],options:{duration:250,easing:"ease"}});pe("drawer.hideTop",{keyframes:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-100%)"}],options:{duration:250,easing:"ease"}});pe("drawer.showEnd",{keyframes:[{opacity:0,transform:"translateX(100%)"},{opacity:1,transform:"translateX(0)"}],options:{duration:250,easing:"ease"}});pe("drawer.hideEnd",{keyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(100%)"}],options:{duration:250,easing:"ease"}});pe("drawer.showBottom",{keyframes:[{opacity:0,transform:"translateY(100%)"},{opacity:1,transform:"translateY(0)"}],options:{duration:250,easing:"ease"}});pe("drawer.hideBottom",{keyframes:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(100%)"}],options:{duration:250,easing:"ease"}});pe("drawer.showStart",{keyframes:[{opacity:0,transform:"translateX(-100%)"},{opacity:1,transform:"translateX(0)"}],options:{duration:250,easing:"ease"}});pe("drawer.hideStart",{keyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(-100%)"}],options:{duration:250,easing:"ease"}});pe("drawer.denyClose",{keyframes:[{transform:"scale(1)"},{transform:"scale(1.01)"},{transform:"scale(1)"}],options:{duration:250}});pe("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});pe("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});j(V,"sl-drawer",at,{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide",onSlInitialFocus:"sl-initial-focus",onSlRequestClose:"sl-request-close"});var tn=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const e=["","kilo","mega","giga","tera"],t=["","kilo","mega","giga","tera","peta"],r=this.unit==="bit"?e:t,n=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),r.length-1)),o=r[n]+this.unit,s=parseFloat((this.value/Math.pow(1e3,n)).toPrecision(3));return this.localize.number(s,{style:"unit",unit:o,unitDisplay:this.display})}};h([v({type:Number})],tn.prototype,"value",2);h([v()],tn.prototype,"unit",2);h([v()],tn.prototype,"display",2);h([v()],tn.prototype,"lang",2);tn=h([H("sl-format-bytes")],tn);j(V,"sl-format-bytes",tn,{});var Ne=class extends U{constructor(){super(...arguments);this.localize=new ut(this),this.date=new Date,this.hourFormat="auto"}render(){const e=new Date(this.date),t=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(!isNaN(e.getMilliseconds()))return O`
      <time datetime=${e.toISOString()}>
        ${this.localize.date(e,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:t})}
      </time>
    `}};h([v()],Ne.prototype,"date",2);h([v()],Ne.prototype,"lang",2);h([v()],Ne.prototype,"weekday",2);h([v()],Ne.prototype,"era",2);h([v()],Ne.prototype,"year",2);h([v()],Ne.prototype,"month",2);h([v()],Ne.prototype,"day",2);h([v()],Ne.prototype,"hour",2);h([v()],Ne.prototype,"minute",2);h([v()],Ne.prototype,"second",2);h([v({attribute:"time-zone-name"})],Ne.prototype,"timeZoneName",2);h([v({attribute:"time-zone"})],Ne.prototype,"timeZone",2);h([v({attribute:"hour-format"})],Ne.prototype,"hourFormat",2);Ne=h([H("sl-format-date")],Ne);j(V,"sl-format-date",Ne,{});var p1=X`
  ${Y}

  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,Zt=class extends U{constructor(){super(...arguments);this.hasError=!1,this.label="",this.shape="circle"}render(){return O`
      <div
        part="base"
        class=${Z({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.initials?O` <div part="initials" class="avatar__initials">${this.initials}</div> `:O`
              <div part="icon" class="avatar__icon" aria-hidden="true">
                <slot name="icon">
                  <sl-icon name="person-fill" library="system"></sl-icon>
                </slot>
              </div>
            `}
        ${typeof this.image=="string"&&!this.hasError?O`
              <img
                part="image"
                class="avatar__image"
                src="${this.image}"
                alt=""
                @error="${()=>this.hasError=!0}"
              />
            `:""}
      </div>
    `}};Zt.styles=p1;h([se()],Zt.prototype,"hasError",2);h([v()],Zt.prototype,"image",2);h([v()],Zt.prototype,"label",2);h([v()],Zt.prototype,"initials",2);h([v({reflect:!0})],Zt.prototype,"shape",2);Zt=h([H("sl-avatar")],Zt);var Rd=j(V,"sl-avatar",Zt,{}),f1=X`
  ${Y}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--sl-font-size-x-small);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 3px 6px;
    user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,rn=class extends U{constructor(){super(...arguments);this.variant="primary",this.pill=!1,this.pulse=!1}render(){return O`
      <span
        part="base"
        class=${Z({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};rn.styles=f1;h([v({reflect:!0})],rn.prototype,"variant",2);h([v({type:Boolean,reflect:!0})],rn.prototype,"pill",2);h([v({type:Boolean,reflect:!0})],rn.prototype,"pulse",2);rn=h([H("sl-badge")],rn);j(V,"sl-badge",rn,{});var m1=X`
  ${Y}

  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`,nn=class extends U{constructor(){super(...arguments);this.label="Breadcrumb"}getSeparator(){const t=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[t,...t.querySelectorAll("[id]")].forEach(r=>r.removeAttribute("id")),t.slot="separator",t}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})].filter(t=>t.tagName.toLowerCase()==="sl-breadcrumb-item");e.forEach((t,r)=>{t.querySelector('[slot="separator"]')===null&&t.append(this.getSeparator()),r===e.length-1?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})}render(){return O`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <slot name="separator" hidden aria-hidden="true">
        <sl-icon name="chevron-right" library="system"></sl-icon>
      </slot>
    `}};nn.styles=m1;h([K("slot")],nn.prototype,"defaultSlot",2);h([K('slot[name="separator"]')],nn.prototype,"separatorSlot",2);h([v()],nn.prototype,"label",2);nn=h([H("sl-breadcrumb")],nn);j(V,"sl-breadcrumb",nn,{});var g1=X`
  ${Y}

  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label${Q} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-right: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
  }
`,on=class extends U{constructor(){super(...arguments);this.hasSlotController=new Ct(this,"prefix","suffix"),this.rel="noreferrer noopener"}render(){const e=!!this.href;return O`
      <div
        part="base"
        class=${Z({"breadcrumb-item":!0,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${e?O`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${M(this.target?this.target:void 0)}"
                rel=${M(this.target?this.rel:void 0)}
              >
                <slot></slot>
              </a>
            `:O`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot></slot>
              </button>
            `}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};on.styles=g1;h([v()],on.prototype,"href",2);h([v()],on.prototype,"target",2);h([v()],on.prototype,"rel",2);on=h([H("sl-breadcrumb-item")],on);j(V,"sl-breadcrumb-item",on,{});var v1=X`
  ${Y}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,Md=["sl-button","sl-radio-button"],Wn=class extends U{constructor(){super(...arguments);this.label=""}handleFocus(e){const t=ao(e.target);t==null||t.classList.add("sl-button-group__button--focus")}handleBlur(e){const t=ao(e.target);t==null||t.classList.remove("sl-button-group__button--focus")}handleMouseOver(e){const t=ao(e.target);t==null||t.classList.add("sl-button-group__button--hover")}handleMouseOut(e){const t=ao(e.target);t==null||t.classList.remove("sl-button-group__button--hover")}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})];e.forEach(t=>{const r=e.indexOf(t),n=ao(t);n!==null&&(n.classList.add("sl-button-group__button"),n.classList.toggle("sl-button-group__button--first",r===0),n.classList.toggle("sl-button-group__button--inner",r>0&&r<e.length-1),n.classList.toggle("sl-button-group__button--last",r===e.length-1))})}render(){return O`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Wn.styles=v1;h([K("slot")],Wn.prototype,"defaultSlot",2);h([v()],Wn.prototype,"label",2);Wn=h([H("sl-button-group")],Wn);function ao(e){return Md.includes(e.tagName.toLowerCase())?e:e.querySelector(Md.join(","))}j(V,"sl-button-group",Wn,{});var ce=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this,{form:e=>{if(e.hasAttribute("form")){const t=e.getRootNode(),r=e.getAttribute("form");return t.getElementById(r)}return e.closest("form")}}),this.hasSlotController=new Ct(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button"}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}handleBlur(){this.hasFocus=!1,P(this,"sl-blur")}handleFocus(){this.hasFocus=!0,P(this,"sl-focus")}handleClick(e){if(this.disabled||this.loading){e.preventDefault(),e.stopPropagation();return}this.type==="submit"&&this.formSubmitController.submit(this)}render(){const e=!!this.href,t=e?Ad`a`:Ad`button`;return Ai`
      <${t}
        part="base"
        class=${Z({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${M(e?void 0:this.disabled)}
        type=${this.type}
        name=${M(e?void 0:this.name)}
        value=${M(e?void 0:this.value)}
        href=${M(this.href)}
        target=${M(this.target)}
        download=${M(this.download)}
        rel=${M(this.target?"noreferrer noopener":void 0)}
        role="button"
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <span part="label" class="button__label">
          <slot></slot>
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix"></slot>
        </span>
        ${this.caret?Ai`
                <span part="caret" class="button__caret">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              `:""}
        ${this.loading?Ai`<sl-spinner></sl-spinner>`:""}
      </${t}>
    `}};ce.styles=Lf;h([K(".button")],ce.prototype,"button",2);h([se()],ce.prototype,"hasFocus",2);h([v({reflect:!0})],ce.prototype,"variant",2);h([v({reflect:!0})],ce.prototype,"size",2);h([v({type:Boolean,reflect:!0})],ce.prototype,"caret",2);h([v({type:Boolean,reflect:!0})],ce.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],ce.prototype,"loading",2);h([v({type:Boolean,reflect:!0})],ce.prototype,"outline",2);h([v({type:Boolean,reflect:!0})],ce.prototype,"pill",2);h([v({type:Boolean,reflect:!0})],ce.prototype,"circle",2);h([v()],ce.prototype,"type",2);h([v()],ce.prototype,"name",2);h([v()],ce.prototype,"value",2);h([v()],ce.prototype,"href",2);h([v()],ce.prototype,"target",2);h([v()],ce.prototype,"download",2);h([v()],ce.prototype,"form",2);h([v({attribute:"formaction"})],ce.prototype,"formAction",2);h([v({attribute:"formmethod"})],ce.prototype,"formMethod",2);h([v({attribute:"formnovalidate",type:Boolean})],ce.prototype,"formNoValidate",2);h([v({attribute:"formtarget"})],ce.prototype,"formTarget",2);ce=h([H("sl-button")],ce);var ws=j(V,"sl-button",ce,{onSlBlur:"sl-blur",onSlFocus:"sl-focus"}),y1=X`
  ${Y}

  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image ::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card__body {
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,xs=class extends U{constructor(){super(...arguments);this.hasSlotController=new Ct(this,"footer","header","image")}render(){return O`
      <div
        part="base"
        class=${Z({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <div part="image" class="card__image">
          <slot name="image"></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header"></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `}};xs.styles=y1;xs=h([H("sl-card")],xs);var b1=j(V,"sl-card",xs,{}),w1=X`
  ${Y}

  :host {
    display: inline-block;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__control .checkbox__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .checkbox__control .checkbox__icon svg {
    width: 100%;
    height: 100%;
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled)
    .checkbox__input${Q}
    ~ .checkbox__control {
    border-color: var(--sl-input-border-color-focus);
    background-color: var(--sl-input-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input${Q} ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled)
    .checkbox__input${Q}
    ~ .checkbox__control {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`,He=class extends U{constructor(){super(...arguments);this.formSubmitController=new tr(this,{value:e=>e.checked?e.value:void 0}),this.hasFocus=!1,this.disabled=!1,this.required=!1,this.checked=!1,this.indeterminate=!1,this.invalid=!1}firstUpdated(){this.invalid=!this.input.checkValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,P(this,"sl-change")}handleBlur(){this.hasFocus=!1,P(this,"sl-blur")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,P(this,"sl-focus")}handleStateChange(){this.invalid=!this.input.checkValidity()}render(){return O`
      <label
        part="base"
        class=${Z({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate})}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          name=${M(this.name)}
          value=${M(this.value)}
          .indeterminate=${_r(this.indeterminate)}
          .checked=${_r(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="checkbox__control">
          ${this.checked?O`
                <span part="checked-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(3.428571, 3.428571)">
                          <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                          <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `:""}
          ${!this.checked&&this.indeterminate?O`
                <span part="indeterminate-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(2.285714, 6.857143)">
                          <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `:""}
        </span>

        <span part="label" class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    `}};He.styles=w1;h([K('input[type="checkbox"]')],He.prototype,"input",2);h([se()],He.prototype,"hasFocus",2);h([v()],He.prototype,"name",2);h([v()],He.prototype,"value",2);h([v({type:Boolean,reflect:!0})],He.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],He.prototype,"required",2);h([v({type:Boolean,reflect:!0})],He.prototype,"checked",2);h([v({type:Boolean,reflect:!0})],He.prototype,"indeterminate",2);h([v({type:Boolean,reflect:!0})],He.prototype,"invalid",2);h([R("disabled",{waitUntilFirstUpdate:!0})],He.prototype,"handleDisabledChange",1);h([R("checked",{waitUntilFirstUpdate:!0}),R("indeterminate",{waitUntilFirstUpdate:!0})],He.prototype,"handleStateChange",1);He=h([H("sl-checkbox")],He);j(V,"sl-checkbox",He,{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus"});var x1=X`
  ${Y}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--box-shadow);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-left: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-right: var(--sl-spacing-medium);
  }
`,cn=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),kt=class extends U{constructor(){super(...arguments);this.hasSlotController=new Ct(this,"icon","suffix"),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}async show(){if(!this.open)return this.open=!0,pt(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,pt(this,"sl-after-hide")}async toast(){return new Promise(e=>{cn.parentElement===null&&document.body.append(cn),cn.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{cn.removeChild(this),e(),cn.querySelector("sl-alert")===null&&cn.remove()},{once:!0})})}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){P(this,"sl-show"),this.duration<1/0&&this.restartAutoHide(),await Le(this.base),this.base.hidden=!1;const{keyframes:e,options:t}=Te(this,"alert.show");await Ee(this.base,e,t),P(this,"sl-after-show")}else{P(this,"sl-hide"),clearTimeout(this.autoHideTimeout),await Le(this.base);const{keyframes:e,options:t}=Te(this,"alert.hide");await Ee(this.base,e,t),this.base.hidden=!0,P(this,"sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}render(){return O`
      <div
        part="base"
        class=${Z({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <span part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </span>

        <span part="message" class="alert__message">
          <slot></slot>
        </span>

        ${this.closable?O`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x"
                library="system"
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};kt.styles=x1;h([K('[part="base"]')],kt.prototype,"base",2);h([v({type:Boolean,reflect:!0})],kt.prototype,"open",2);h([v({type:Boolean,reflect:!0})],kt.prototype,"closable",2);h([v({reflect:!0})],kt.prototype,"variant",2);h([v({type:Number})],kt.prototype,"duration",2);h([R("open",{waitUntilFirstUpdate:!0})],kt.prototype,"handleOpenChange",1);h([R("duration")],kt.prototype,"handleDurationChange",1);kt=h([H("sl-alert")],kt);pe("alert.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}});pe("alert.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:250,easing:"ease"}});j(V,"sl-alert",kt,{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"});var _1=X`
  ${Y}

  :host {
    display: contents;
  }
`,Ol={};Sg(Ol,{backInDown:()=>M1,backInLeft:()=>L1,backInRight:()=>U1,backInUp:()=>N1,backOutDown:()=>F1,backOutLeft:()=>B1,backOutRight:()=>V1,backOutUp:()=>H1,bounce:()=>k1,bounceIn:()=>j1,bounceInDown:()=>W1,bounceInLeft:()=>K1,bounceInRight:()=>X1,bounceInUp:()=>Y1,bounceOut:()=>q1,bounceOutDown:()=>Q1,bounceOutLeft:()=>G1,bounceOutRight:()=>J1,bounceOutUp:()=>Z1,easings:()=>pw,fadeIn:()=>eb,fadeInBottomLeft:()=>tb,fadeInBottomRight:()=>rb,fadeInDown:()=>nb,fadeInDownBig:()=>ob,fadeInLeft:()=>ib,fadeInLeftBig:()=>sb,fadeInRight:()=>ab,fadeInRightBig:()=>lb,fadeInTopLeft:()=>ub,fadeInTopRight:()=>cb,fadeInUp:()=>db,fadeInUpBig:()=>hb,fadeOut:()=>pb,fadeOutBottomLeft:()=>fb,fadeOutBottomRight:()=>mb,fadeOutDown:()=>gb,fadeOutDownBig:()=>vb,fadeOutLeft:()=>yb,fadeOutLeftBig:()=>bb,fadeOutRight:()=>wb,fadeOutRightBig:()=>xb,fadeOutTopLeft:()=>_b,fadeOutTopRight:()=>kb,fadeOutUp:()=>Sb,fadeOutUpBig:()=>Cb,flash:()=>S1,flip:()=>Eb,flipInX:()=>Tb,flipInY:()=>$b,flipOutX:()=>zb,flipOutY:()=>Ab,headShake:()=>C1,heartBeat:()=>E1,hinge:()=>Zb,jackInTheBox:()=>ew,jello:()=>T1,lightSpeedInLeft:()=>Pb,lightSpeedInRight:()=>Ob,lightSpeedOutLeft:()=>Db,lightSpeedOutRight:()=>Ib,pulse:()=>$1,rollIn:()=>tw,rollOut:()=>rw,rotateIn:()=>Rb,rotateInDownLeft:()=>Mb,rotateInDownRight:()=>Lb,rotateInUpLeft:()=>Ub,rotateInUpRight:()=>Nb,rotateOut:()=>Fb,rotateOutDownLeft:()=>Bb,rotateOutDownRight:()=>Vb,rotateOutUpLeft:()=>Hb,rotateOutUpRight:()=>jb,rubberBand:()=>z1,shake:()=>A1,shakeX:()=>P1,shakeY:()=>O1,slideInDown:()=>Wb,slideInLeft:()=>Kb,slideInRight:()=>Xb,slideInUp:()=>Yb,slideOutDown:()=>qb,slideOutLeft:()=>Qb,slideOutRight:()=>Gb,slideOutUp:()=>Jb,swing:()=>D1,tada:()=>I1,wobble:()=>R1,zoomIn:()=>nw,zoomInDown:()=>ow,zoomInLeft:()=>iw,zoomInRight:()=>sw,zoomInUp:()=>aw,zoomOut:()=>lw,zoomOutDown:()=>uw,zoomOutLeft:()=>cw,zoomOutRight:()=>dw,zoomOutUp:()=>hw});var k1=[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],S1=[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],C1=[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],E1=[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],T1=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],$1=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],z1=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],A1=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],P1=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],O1=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],D1=[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],I1=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],R1=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],M1=[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],L1=[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],U1=[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],N1=[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],F1=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],B1=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],V1=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],H1=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],j1=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],W1=[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],K1=[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],X1=[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Y1=[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],q1=[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],Q1=[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],G1=[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],J1=[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],Z1=[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],eb=[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],tb=[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],rb=[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],nb=[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ob=[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ib=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],sb=[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ab=[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],lb=[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ub=[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],cb=[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],db=[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],hb=[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],pb=[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],fb=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],mb=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],gb=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],vb=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],yb=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],bb=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],wb=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],xb=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],_b=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],kb=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],Sb=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],Cb=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],Eb=[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:"ease-out"},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:"ease-in"},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],Tb=[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],$b=[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],zb=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],Ab=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],Pb=[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Ob=[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Db=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],Ib=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],Rb=[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Mb=[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Lb=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Ub=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Nb=[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Fb=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],Bb=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],Vb=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Hb=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],jb=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],Wb=[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Kb=[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Xb=[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Yb=[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],qb=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],Qb=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],Gb=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],Jb=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],Zb=[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],ew=[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],tw=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],rw=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],nw=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],ow=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],iw=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],sw=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],aw=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],lw=[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],uw=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],cw=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],dw=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],hw=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],pw={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},_e=class extends U{constructor(){super(...arguments);this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1}get currentTime(){var e,t;return(t=(e=this.animation)==null?void 0:e.currentTime)!=null?t:0}set currentTime(e){this.animation&&(this.animation.currentTime=e)}connectedCallback(){super.connectedCallback(),this.createAnimation(),this.handleAnimationCancel=this.handleAnimationCancel.bind(this),this.handleAnimationFinish=this.handleAnimationFinish.bind(this)}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleAnimationChange(){!this.hasUpdated||this.createAnimation()}handleAnimationFinish(){this.play=!1,this.hasStarted=!1,P(this,"sl-finish")}handleAnimationCancel(){this.play=!1,this.hasStarted=!1,P(this,"sl-cancel")}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,P(this,"sl-start")),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var e,t;const r=(e=Ol.easings[this.easing])!=null?e:this.easing,n=(t=this.keyframes)!=null?t:Ol[this.name],s=(await this.defaultSlot).assignedElements()[0];return!s||!n?!1:(this.destroyAnimation(),this.animation=s.animate(n,{delay:this.delay,direction:this.direction,duration:this.duration,easing:r,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,P(this,"sl-start")):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}cancel(){var e;(e=this.animation)==null||e.cancel()}finish(){var e;(e=this.animation)==null||e.finish()}render(){return O` <slot @slotchange=${this.handleSlotChange}></slot> `}};_e.styles=_1;h([wv("slot")],_e.prototype,"defaultSlot",2);h([v()],_e.prototype,"name",2);h([v({type:Boolean,reflect:!0})],_e.prototype,"play",2);h([v({type:Number})],_e.prototype,"delay",2);h([v()],_e.prototype,"direction",2);h([v({type:Number})],_e.prototype,"duration",2);h([v()],_e.prototype,"easing",2);h([v({attribute:"end-delay",type:Number})],_e.prototype,"endDelay",2);h([v()],_e.prototype,"fill",2);h([v({type:Number})],_e.prototype,"iterations",2);h([v({attribute:"iteration-start",type:Number})],_e.prototype,"iterationStart",2);h([v({attribute:!1})],_e.prototype,"keyframes",2);h([v({attribute:"playback-rate",type:Number})],_e.prototype,"playbackRate",2);h([R("name"),R("delay"),R("direction"),R("duration"),R("easing"),R("endDelay"),R("fill"),R("iterations"),R("iterationsStart"),R("keyframes")],_e.prototype,"handleAnimationChange",1);h([R("play")],_e.prototype,"handlePlayChange",1);h([R("playbackRate")],_e.prototype,"handlePlaybackRateChange",1);_e=h([H("sl-animation")],_e);j(V,"sl-animation",_e,{onSlCancel:"sl-cancel",onSlFinish:"sl-finish",onSlStart:"sl-start"});var fw=X`
  ${Y}

  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);
    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .animated-image__control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: var(--icon-size);
    background: none;
    border: solid 2px currentColor;
    background-color: rgb(0 0 0 /50%);
    border-radius: var(--sl-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: var(--sl-transition-fast) opacity;
  }

  :host([play]:hover) .animated-image__control-box {
    opacity: 1;
    transform: scale(1);
  }

  :host([play]:not(:hover)) .animated-image__control-box {
    opacity: 0;
  }
`,mt=class extends U{constructor(){super(...arguments);this.isLoaded=!1}handleClick(){this.play=!this.play}handleLoad(){const e=document.createElement("canvas"),{width:t,height:r}=this.animatedImage;e.width=t,e.height=r,e.getContext("2d").drawImage(this.animatedImage,0,0,t,r),this.frozenFrame=e.toDataURL("image/gif"),this.isLoaded||(P(this,"sl-load"),this.isLoaded=!0)}handleError(){P(this,"sl-error")}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){return O`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?O`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                ${this.play?O`<sl-icon part="pause-icon" name="pause-fill" library="system"></sl-icon>`:O`<sl-icon part="play-icon" name="play-fill" library="system"></sl-icon>`}
              </div>
            `:""}
      </div>
    `}};mt.styles=fw;h([se()],mt.prototype,"frozenFrame",2);h([se()],mt.prototype,"isLoaded",2);h([K(".animated-image__animated")],mt.prototype,"animatedImage",2);h([v()],mt.prototype,"src",2);h([v()],mt.prototype,"alt",2);h([v({type:Boolean,reflect:!0})],mt.prototype,"play",2);h([R("play")],mt.prototype,"handlePlayChange",1);h([R("src")],mt.prototype,"handleSrcChange",1);mt=h([H("sl-animated-image")],mt);j(V,"sl-animated-image",mt,{onSlLoad:"sl-load",onSlError:"sl-error"});var Ks={exports:{}},ei={};/** @license React v16.14.0
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mw=J.exports,Vf=60103;ei.Fragment=60107;if(typeof Symbol=="function"&&Symbol.for){var Ld=Symbol.for;Vf=Ld("react.element"),ei.Fragment=Ld("react.fragment")}var gw=mw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,vw=Object.prototype.hasOwnProperty,yw={key:!0,ref:!0,__self:!0,__source:!0};function Hf(e,t,r){var n,o={},s=null,i=null;r!==void 0&&(s=""+r),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(i=t.ref);for(n in t)vw.call(t,n)&&!yw.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)o[n]===void 0&&(o[n]=t[n]);return{$$typeof:Vf,type:e,key:s,ref:i,props:o,_owner:gw.current}}ei.jsx=Hf;ei.jsxs=Hf;Ks.exports=ei;const N=Ks.exports.jsx,Pe=Ks.exports.jsxs,jf=Ks.exports.Fragment,bw=({name:e})=>Pe("div",{className:"header",children:[N(Rd,{image:"https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",label:"Avatar of a gray tabby kitten looking down"}),N("div",{className:"search",children:Pe(Oi,{placeholder:"Search...",clearable:!0,children:[N(Pi,{name:"search",slot:"prefix"})," "]})}),Pe("div",{children:[N(Rd,{shape:"circle",label:"Circle avatar"})," ",e.slice(0,8),"..."]})]}),ww=({})=>N("div",{className:"left-screen-nav-menu",children:Pe(Jy,{children:[N(Tn,{to:"/knowledge",children:Pe(xa,{value:"Knowledge",children:[N(Pi,{slot:"prefix",name:"node-plus"}),"Knowledge"]})}),N(Tn,{to:"/plan",children:Pe(xa,{value:"Plan",children:[N(Pi,{slot:"prefix",name:"minecart-loaded"}),"Plan"]})}),N(Tn,{to:"/observation",children:Pe(xa,{value:"Observation",children:["Observation",N(Pi,{slot:"prefix",name:"people"})]})})]})}),Ud="rea_playspace",xw="8888",Wf=({children:e})=>N("div",{className:"main-panel-header",children:e}),Kf=()=>N(jf,{children:Pe(Wf,{children:[N("h2",{children:"Resources"}),Pe("div",{children:[N(Tn,{to:"/resources/transfer",children:N(ws,{variant:"primary",children:"Transfer"})})," ",N(Tn,{to:"/resources/new",children:N(ws,{variant:"primary",children:"Add Resource"})})]})]})}),_w=()=>N("div",{children:N(Kf,{})}),kw=()=>N("div",{children:N("p",{children:"Plan"})}),Sw=()=>N("div",{children:N("p",{children:"Observation"})}),Cw=({myAgentId:e,setCurrentNodeName:t,closeModal:r})=>{hf();const[n,o]=J.exports.useState(""),[s,i]=J.exports.useState(1),[a,l]=J.exports.useState("");if(createERmutationStatus.loading)return N("div",{children:"Creating economic resource..."});if(createERmutationStatus.error)return N("p",{children:"ERROR"});const u=async()=>{await createER({variables:{event:{action:"raise",provider:e,receiver:e,resourceQuantity:{hasNumericalValue:s},resourceClassifiedAs:"https://something",hasPointInTime:new Date},newInventoriedResource:{note:a,image:n}}}),t(a),r()};return N(b1,{className:"create-resource",children:Pe("form",{onSubmit:c=>{c.preventDefault(),a&&n&&typeof s!="undefined"&&u()},children:[N("br",{}),N(Oi,{required:!0,label:"Resource Name",onSlChange:c=>l(c.target.value),value:a}),N("br",{}),N(Oi,{required:!0,type:"number",label:"Initial Balance",onSlChange:c=>i(+c.target.value),value:s.toString()}),N("br",{}),N(Oi,{required:!0,label:"Image",onSlChange:c=>o(c.target.value),value:n}),N("br",{}),N(ws,{type:"submit",variant:"primary",children:"Create"})]})})},Ew=()=>Pe(jf,{children:[Pe(Wf,{children:[N("h2",{children:"New Resource"}),N(Tn,{to:"/resources",children:N(ws,{variant:"primary",children:"View Resources"})})]}),N(Cw,{})]});bl("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/");const Tw=({wsClient:e})=>{const[t,r]=J.exports.useState();J.exports.useState();async function n(){console.log(Ud);let o=await e.appInfo(Ud);console.log(o)}return J.exports.useEffect(()=>{n().then(()=>console.log("got cell ID"))},[]),N(rv,{children:Pe("div",{className:"container",children:[N(bw,{name:"shane"}),Pe("div",{className:"below-header",children:[N(ww,{}),Pe("div",{className:"main-panel",children:[Pe("p",{children:["Am I rendering? ",t||"waiting..."]}),Pe(Zg,{children:[N(dn,{path:"/knowledge",element:N(_w,{})}),N(dn,{path:"/plan",element:N(kw,{})}),N(dn,{path:"/",element:N(Sw,{})}),N(dn,{path:"/resources",element:N(Kf,{})}),N(dn,{path:"/resources/new",element:N(Ew,{})})]})]})]})]})})};var Nd;(function(e){e.Enabled="enabled",e.Disabled="disabled",e.Running="running",e.Stopped="stopped",e.Paused="paused"})(Nd||(Nd={}));var pn=null;typeof WebSocket!="undefined"?pn=WebSocket:typeof MozWebSocket!="undefined"?pn=MozWebSocket:typeof fi!="undefined"?pn=fi.WebSocket||fi.MozWebSocket:typeof window!="undefined"?pn=window.WebSocket||window.MozWebSocket:typeof self!="undefined"&&(pn=self.WebSocket||self.MozWebSocket);var $w=pn,Nr=4294967295;function zw(e,t,r){var n=r/4294967296,o=r;e.setUint32(t,n),e.setUint32(t+4,o)}function Xf(e,t,r){var n=Math.floor(r/4294967296),o=r;e.setUint32(t,n),e.setUint32(t+4,o)}function Yf(e,t){var r=e.getInt32(t),n=e.getUint32(t+4);return r*4294967296+n}function Aw(e,t){var r=e.getUint32(t),n=e.getUint32(t+4);return r*4294967296+n}var _a,ka,Sa,Xs=(typeof process=="undefined"||((_a=process==null?void 0:process.env)===null||_a===void 0?void 0:_a.TEXT_ENCODING)!=="never")&&typeof TextEncoder!="undefined"&&typeof TextDecoder!="undefined";function Fd(e){for(var t=e.length,r=0,n=0;n<t;){var o=e.charCodeAt(n++);if((o&4294967168)===0){r++;continue}else if((o&4294965248)===0)r+=2;else{if(o>=55296&&o<=56319&&n<t){var s=e.charCodeAt(n);(s&64512)===56320&&(++n,o=((o&1023)<<10)+(s&1023)+65536)}(o&4294901760)===0?r+=3:r+=4}}return r}function Pw(e,t,r){for(var n=e.length,o=r,s=0;s<n;){var i=e.charCodeAt(s++);if((i&4294967168)===0){t[o++]=i;continue}else if((i&4294965248)===0)t[o++]=i>>6&31|192;else{if(i>=55296&&i<=56319&&s<n){var a=e.charCodeAt(s);(a&64512)===56320&&(++s,i=((i&1023)<<10)+(a&1023)+65536)}(i&4294901760)===0?(t[o++]=i>>12&15|224,t[o++]=i>>6&63|128):(t[o++]=i>>18&7|240,t[o++]=i>>12&63|128,t[o++]=i>>6&63|128)}t[o++]=i&63|128}}var Eo=Xs?new TextEncoder:void 0,Ow=Xs?typeof process!="undefined"&&((ka=process==null?void 0:process.env)===null||ka===void 0?void 0:ka.TEXT_ENCODING)!=="force"?200:0:Nr;function Dw(e,t,r){t.set(Eo.encode(e),r)}function Iw(e,t,r){Eo.encodeInto(e,t.subarray(r))}var Rw=Eo!=null&&Eo.encodeInto?Iw:Dw,Mw=4096;function qf(e,t,r){for(var n=t,o=n+r,s=[],i="";n<o;){var a=e[n++];if((a&128)===0)s.push(a);else if((a&224)===192){var l=e[n++]&63;s.push((a&31)<<6|l)}else if((a&240)===224){var l=e[n++]&63,u=e[n++]&63;s.push((a&31)<<12|l<<6|u)}else if((a&248)===240){var l=e[n++]&63,u=e[n++]&63,d=e[n++]&63,c=(a&7)<<18|l<<12|u<<6|d;c>65535&&(c-=65536,s.push(c>>>10&1023|55296),c=56320|c&1023),s.push(c)}else s.push(a);s.length>=Mw&&(i+=String.fromCharCode.apply(String,s),s.length=0)}return s.length>0&&(i+=String.fromCharCode.apply(String,s)),i}var Lw=Xs?new TextDecoder:null,Uw=Xs?typeof process!="undefined"&&((Sa=process==null?void 0:process.env)===null||Sa===void 0?void 0:Sa.TEXT_DECODER)!=="force"?200:0:Nr;function Nw(e,t,r){var n=e.subarray(t,t+r);return Lw.decode(n)}var pi=function(){function e(t,r){this.type=t,this.data=r}return e}(),Fw=globalThis&&globalThis.__extends||function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,o){n.__proto__=o}||function(n,o){for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(n[s]=o[s])},e(t,r)};return function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Tt=function(e){Fw(t,e);function t(r){var n=e.call(this,r)||this,o=Object.create(t.prototype);return Object.setPrototypeOf(n,o),Object.defineProperty(n,"name",{configurable:!0,enumerable:!1,value:t.name}),n}return t}(Error),Bw=-1,Vw=4294967296-1,Hw=17179869184-1;function jw(e){var t=e.sec,r=e.nsec;if(t>=0&&r>=0&&t<=Hw)if(r===0&&t<=Vw){var n=new Uint8Array(4),o=new DataView(n.buffer);return o.setUint32(0,t),n}else{var s=t/4294967296,i=t&4294967295,n=new Uint8Array(8),o=new DataView(n.buffer);return o.setUint32(0,r<<2|s&3),o.setUint32(4,i),n}else{var n=new Uint8Array(12),o=new DataView(n.buffer);return o.setUint32(0,r),Xf(o,4,t),n}}function Ww(e){var t=e.getTime(),r=Math.floor(t/1e3),n=(t-r*1e3)*1e6,o=Math.floor(n/1e9);return{sec:r+o,nsec:n-o*1e9}}function Kw(e){if(e instanceof Date){var t=Ww(e);return jw(t)}else return null}function Xw(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength);switch(e.byteLength){case 4:{var r=t.getUint32(0),n=0;return{sec:r,nsec:n}}case 8:{var o=t.getUint32(0),s=t.getUint32(4),r=(o&3)*4294967296+s,n=o>>>2;return{sec:r,nsec:n}}case 12:{var r=Yf(t,4),n=t.getUint32(0);return{sec:r,nsec:n}}default:throw new Tt("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(e.length))}}function Yw(e){var t=Xw(e);return new Date(t.sec*1e3+t.nsec/1e6)}var qw={type:Bw,encode:Kw,decode:Yw},Qf=function(){function e(){this.builtInEncoders=[],this.builtInDecoders=[],this.encoders=[],this.decoders=[],this.register(qw)}return e.prototype.register=function(t){var r=t.type,n=t.encode,o=t.decode;if(r>=0)this.encoders[r]=n,this.decoders[r]=o;else{var s=1+r;this.builtInEncoders[s]=n,this.builtInDecoders[s]=o}},e.prototype.tryToEncode=function(t,r){for(var n=0;n<this.builtInEncoders.length;n++){var o=this.builtInEncoders[n];if(o!=null){var s=o(t,r);if(s!=null){var i=-1-n;return new pi(i,s)}}}for(var n=0;n<this.encoders.length;n++){var o=this.encoders[n];if(o!=null){var s=o(t,r);if(s!=null){var i=n;return new pi(i,s)}}}return t instanceof pi?t:null},e.prototype.decode=function(t,r,n){var o=r<0?this.builtInDecoders[-1-r]:this.decoders[r];return o?o(t,r,n):new pi(r,t)},e.defaultCodec=new e,e}();function _s(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer?new Uint8Array(e):Uint8Array.from(e)}function Qw(e){if(e instanceof ArrayBuffer)return new DataView(e);var t=_s(e);return new DataView(t.buffer,t.byteOffset,t.byteLength)}var Gw=100,Jw=2048,Zw=function(){function e(t,r,n,o,s,i,a,l){t===void 0&&(t=Qf.defaultCodec),r===void 0&&(r=void 0),n===void 0&&(n=Gw),o===void 0&&(o=Jw),s===void 0&&(s=!1),i===void 0&&(i=!1),a===void 0&&(a=!1),l===void 0&&(l=!1),this.extensionCodec=t,this.context=r,this.maxDepth=n,this.initialBufferSize=o,this.sortKeys=s,this.forceFloat32=i,this.ignoreUndefined=a,this.forceIntegerToFloat=l,this.pos=0,this.view=new DataView(new ArrayBuffer(this.initialBufferSize)),this.bytes=new Uint8Array(this.view.buffer)}return e.prototype.getUint8Array=function(){return this.bytes.subarray(0,this.pos)},e.prototype.reinitializeState=function(){this.pos=0},e.prototype.encode=function(t){return this.reinitializeState(),this.doEncode(t,1),this.getUint8Array()},e.prototype.doEncode=function(t,r){if(r>this.maxDepth)throw new Error("Too deep objects in depth ".concat(r));t==null?this.encodeNil():typeof t=="boolean"?this.encodeBoolean(t):typeof t=="number"?this.encodeNumber(t):typeof t=="string"?this.encodeString(t):this.encodeObject(t,r)},e.prototype.ensureBufferSizeToWrite=function(t){var r=this.pos+t;this.view.byteLength<r&&this.resizeBuffer(r*2)},e.prototype.resizeBuffer=function(t){var r=new ArrayBuffer(t),n=new Uint8Array(r),o=new DataView(r);n.set(this.bytes),this.view=o,this.bytes=n},e.prototype.encodeNil=function(){this.writeU8(192)},e.prototype.encodeBoolean=function(t){t===!1?this.writeU8(194):this.writeU8(195)},e.prototype.encodeNumber=function(t){Number.isSafeInteger(t)&&!this.forceIntegerToFloat?t>=0?t<128?this.writeU8(t):t<256?(this.writeU8(204),this.writeU8(t)):t<65536?(this.writeU8(205),this.writeU16(t)):t<4294967296?(this.writeU8(206),this.writeU32(t)):(this.writeU8(207),this.writeU64(t)):t>=-32?this.writeU8(224|t+32):t>=-128?(this.writeU8(208),this.writeI8(t)):t>=-32768?(this.writeU8(209),this.writeI16(t)):t>=-2147483648?(this.writeU8(210),this.writeI32(t)):(this.writeU8(211),this.writeI64(t)):this.forceFloat32?(this.writeU8(202),this.writeF32(t)):(this.writeU8(203),this.writeF64(t))},e.prototype.writeStringHeader=function(t){if(t<32)this.writeU8(160+t);else if(t<256)this.writeU8(217),this.writeU8(t);else if(t<65536)this.writeU8(218),this.writeU16(t);else if(t<4294967296)this.writeU8(219),this.writeU32(t);else throw new Error("Too long string: ".concat(t," bytes in UTF-8"))},e.prototype.encodeString=function(t){var r=5,n=t.length;if(n>Ow){var o=Fd(t);this.ensureBufferSizeToWrite(r+o),this.writeStringHeader(o),Rw(t,this.bytes,this.pos),this.pos+=o}else{var o=Fd(t);this.ensureBufferSizeToWrite(r+o),this.writeStringHeader(o),Pw(t,this.bytes,this.pos),this.pos+=o}},e.prototype.encodeObject=function(t,r){var n=this.extensionCodec.tryToEncode(t,this.context);if(n!=null)this.encodeExtension(n);else if(Array.isArray(t))this.encodeArray(t,r);else if(ArrayBuffer.isView(t))this.encodeBinary(t);else if(typeof t=="object")this.encodeMap(t,r);else throw new Error("Unrecognized object: ".concat(Object.prototype.toString.apply(t)))},e.prototype.encodeBinary=function(t){var r=t.byteLength;if(r<256)this.writeU8(196),this.writeU8(r);else if(r<65536)this.writeU8(197),this.writeU16(r);else if(r<4294967296)this.writeU8(198),this.writeU32(r);else throw new Error("Too large binary: ".concat(r));var n=_s(t);this.writeU8a(n)},e.prototype.encodeArray=function(t,r){var n=t.length;if(n<16)this.writeU8(144+n);else if(n<65536)this.writeU8(220),this.writeU16(n);else if(n<4294967296)this.writeU8(221),this.writeU32(n);else throw new Error("Too large array: ".concat(n));for(var o=0,s=t;o<s.length;o++){var i=s[o];this.doEncode(i,r+1)}},e.prototype.countWithoutUndefined=function(t,r){for(var n=0,o=0,s=r;o<s.length;o++){var i=s[o];t[i]!==void 0&&n++}return n},e.prototype.encodeMap=function(t,r){var n=Object.keys(t);this.sortKeys&&n.sort();var o=this.ignoreUndefined?this.countWithoutUndefined(t,n):n.length;if(o<16)this.writeU8(128+o);else if(o<65536)this.writeU8(222),this.writeU16(o);else if(o<4294967296)this.writeU8(223),this.writeU32(o);else throw new Error("Too large map object: ".concat(o));for(var s=0,i=n;s<i.length;s++){var a=i[s],l=t[a];this.ignoreUndefined&&l===void 0||(this.encodeString(a),this.doEncode(l,r+1))}},e.prototype.encodeExtension=function(t){var r=t.data.length;if(r===1)this.writeU8(212);else if(r===2)this.writeU8(213);else if(r===4)this.writeU8(214);else if(r===8)this.writeU8(215);else if(r===16)this.writeU8(216);else if(r<256)this.writeU8(199),this.writeU8(r);else if(r<65536)this.writeU8(200),this.writeU16(r);else if(r<4294967296)this.writeU8(201),this.writeU32(r);else throw new Error("Too large extension object: ".concat(r));this.writeI8(t.type),this.writeU8a(t.data)},e.prototype.writeU8=function(t){this.ensureBufferSizeToWrite(1),this.view.setUint8(this.pos,t),this.pos++},e.prototype.writeU8a=function(t){var r=t.length;this.ensureBufferSizeToWrite(r),this.bytes.set(t,this.pos),this.pos+=r},e.prototype.writeI8=function(t){this.ensureBufferSizeToWrite(1),this.view.setInt8(this.pos,t),this.pos++},e.prototype.writeU16=function(t){this.ensureBufferSizeToWrite(2),this.view.setUint16(this.pos,t),this.pos+=2},e.prototype.writeI16=function(t){this.ensureBufferSizeToWrite(2),this.view.setInt16(this.pos,t),this.pos+=2},e.prototype.writeU32=function(t){this.ensureBufferSizeToWrite(4),this.view.setUint32(this.pos,t),this.pos+=4},e.prototype.writeI32=function(t){this.ensureBufferSizeToWrite(4),this.view.setInt32(this.pos,t),this.pos+=4},e.prototype.writeF32=function(t){this.ensureBufferSizeToWrite(4),this.view.setFloat32(this.pos,t),this.pos+=4},e.prototype.writeF64=function(t){this.ensureBufferSizeToWrite(8),this.view.setFloat64(this.pos,t),this.pos+=8},e.prototype.writeU64=function(t){this.ensureBufferSizeToWrite(8),zw(this.view,this.pos,t),this.pos+=8},e.prototype.writeI64=function(t){this.ensureBufferSizeToWrite(8),Xf(this.view,this.pos,t),this.pos+=8},e}(),ex={};function fo(e,t){t===void 0&&(t=ex);var r=new Zw(t.extensionCodec,t.context,t.maxDepth,t.initialBufferSize,t.sortKeys,t.forceFloat32,t.ignoreUndefined,t.forceIntegerToFloat);return r.encode(e)}function Ca(e){return"".concat(e<0?"-":"","0x").concat(Math.abs(e).toString(16).padStart(2,"0"))}var tx=16,rx=16,nx=function(){function e(t,r){t===void 0&&(t=tx),r===void 0&&(r=rx),this.maxKeyLength=t,this.maxLengthPerKey=r,this.hit=0,this.miss=0,this.caches=[];for(var n=0;n<this.maxKeyLength;n++)this.caches.push([])}return e.prototype.canBeCached=function(t){return t>0&&t<=this.maxKeyLength},e.prototype.find=function(t,r,n){var o=this.caches[n-1];e:for(var s=0,i=o;s<i.length;s++){for(var a=i[s],l=a.bytes,u=0;u<n;u++)if(l[u]!==t[r+u])continue e;return a.str}return null},e.prototype.store=function(t,r){var n=this.caches[t.length-1],o={bytes:t,str:r};n.length>=this.maxLengthPerKey?n[Math.random()*n.length|0]=o:n.push(o)},e.prototype.decode=function(t,r,n){var o=this.find(t,r,n);if(o!=null)return this.hit++,o;this.miss++;var s=qf(t,r,n),i=Uint8Array.prototype.slice.call(t,r,r+n);return this.store(i,s),s},e}(),ox=globalThis&&globalThis.__awaiter||function(e,t,r,n){function o(s){return s instanceof r?s:new r(function(i){i(s)})}return new(r||(r=Promise))(function(s,i){function a(d){try{u(n.next(d))}catch(c){i(c)}}function l(d){try{u(n.throw(d))}catch(c){i(c)}}function u(d){d.done?s(d.value):o(d.value).then(a,l)}u((n=n.apply(e,t||[])).next())})},Ea=globalThis&&globalThis.__generator||function(e,t){var r={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},n,o,s,i;return i={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function a(u){return function(d){return l([u,d])}}function l(u){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,o&&(s=u[0]&2?o.return:u[0]?o.throw||((s=o.return)&&s.call(o),0):o.next)&&!(s=s.call(o,u[1])).done)return s;switch(o=0,s&&(u=[u[0]&2,s.value]),u[0]){case 0:case 1:s=u;break;case 4:return r.label++,{value:u[1],done:!1};case 5:r.label++,o=u[1],u=[0];continue;case 7:u=r.ops.pop(),r.trys.pop();continue;default:if(s=r.trys,!(s=s.length>0&&s[s.length-1])&&(u[0]===6||u[0]===2)){r=0;continue}if(u[0]===3&&(!s||u[1]>s[0]&&u[1]<s[3])){r.label=u[1];break}if(u[0]===6&&r.label<s[1]){r.label=s[1],s=u;break}if(s&&r.label<s[2]){r.label=s[2],r.ops.push(u);break}s[2]&&r.ops.pop(),r.trys.pop();continue}u=t.call(e,r)}catch(d){u=[6,d],o=0}finally{n=s=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}},Bd=globalThis&&globalThis.__asyncValues||function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],r;return t?t.call(e):(e=typeof __values=="function"?__values(e):e[Symbol.iterator](),r={},n("next"),n("throw"),n("return"),r[Symbol.asyncIterator]=function(){return this},r);function n(s){r[s]=e[s]&&function(i){return new Promise(function(a,l){i=e[s](i),o(a,l,i.done,i.value)})}}function o(s,i,a,l){Promise.resolve(l).then(function(u){s({value:u,done:a})},i)}},zn=globalThis&&globalThis.__await||function(e){return this instanceof zn?(this.v=e,this):new zn(e)},ix=globalThis&&globalThis.__asyncGenerator||function(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=r.apply(e,t||[]),o,s=[];return o={},i("next"),i("throw"),i("return"),o[Symbol.asyncIterator]=function(){return this},o;function i(p){n[p]&&(o[p]=function(b){return new Promise(function(w,g){s.push([p,b,w,g])>1||a(p,b)})})}function a(p,b){try{l(n[p](b))}catch(w){c(s[0][3],w)}}function l(p){p.value instanceof zn?Promise.resolve(p.value.v).then(u,d):c(s[0][2],p)}function u(p){a("next",p)}function d(p){a("throw",p)}function c(p,b){p(b),s.shift(),s.length&&a(s[0][0],s[0][1])}},sx=function(e){var t=typeof e;return t==="string"||t==="number"},lo=-1,Bu=new DataView(new ArrayBuffer(0)),ax=new Uint8Array(Bu.buffer),Dl=function(){try{Bu.getInt8(0)}catch(e){return e.constructor}throw new Error("never reached")}(),Vd=new Dl("Insufficient data"),lx=new nx,ux=function(){function e(t,r,n,o,s,i,a,l){t===void 0&&(t=Qf.defaultCodec),r===void 0&&(r=void 0),n===void 0&&(n=Nr),o===void 0&&(o=Nr),s===void 0&&(s=Nr),i===void 0&&(i=Nr),a===void 0&&(a=Nr),l===void 0&&(l=lx),this.extensionCodec=t,this.context=r,this.maxStrLength=n,this.maxBinLength=o,this.maxArrayLength=s,this.maxMapLength=i,this.maxExtLength=a,this.keyDecoder=l,this.totalPos=0,this.pos=0,this.view=Bu,this.bytes=ax,this.headByte=lo,this.stack=[]}return e.prototype.reinitializeState=function(){this.totalPos=0,this.headByte=lo,this.stack.length=0},e.prototype.setBuffer=function(t){this.bytes=_s(t),this.view=Qw(this.bytes),this.pos=0},e.prototype.appendBuffer=function(t){if(this.headByte===lo&&!this.hasRemaining(1))this.setBuffer(t);else{var r=this.bytes.subarray(this.pos),n=_s(t),o=new Uint8Array(r.length+n.length);o.set(r),o.set(n,r.length),this.setBuffer(o)}},e.prototype.hasRemaining=function(t){return this.view.byteLength-this.pos>=t},e.prototype.createExtraByteError=function(t){var r=this,n=r.view,o=r.pos;return new RangeError("Extra ".concat(n.byteLength-o," of ").concat(n.byteLength," byte(s) found at buffer[").concat(t,"]"))},e.prototype.decode=function(t){this.reinitializeState(),this.setBuffer(t);var r=this.doDecodeSync();if(this.hasRemaining(1))throw this.createExtraByteError(this.pos);return r},e.prototype.decodeMulti=function(t){return Ea(this,function(r){switch(r.label){case 0:this.reinitializeState(),this.setBuffer(t),r.label=1;case 1:return this.hasRemaining(1)?[4,this.doDecodeSync()]:[3,3];case 2:return r.sent(),[3,1];case 3:return[2]}})},e.prototype.decodeAsync=function(t){var r,n,o,s;return ox(this,void 0,void 0,function(){var i,a,l,u,d,c,p,b;return Ea(this,function(w){switch(w.label){case 0:i=!1,w.label=1;case 1:w.trys.push([1,6,7,12]),r=Bd(t),w.label=2;case 2:return[4,r.next()];case 3:if(n=w.sent(),!!n.done)return[3,5];if(l=n.value,i)throw this.createExtraByteError(this.totalPos);this.appendBuffer(l);try{a=this.doDecodeSync(),i=!0}catch(g){if(!(g instanceof Dl))throw g}this.totalPos+=this.pos,w.label=4;case 4:return[3,2];case 5:return[3,12];case 6:return u=w.sent(),o={error:u},[3,12];case 7:return w.trys.push([7,,10,11]),n&&!n.done&&(s=r.return)?[4,s.call(r)]:[3,9];case 8:w.sent(),w.label=9;case 9:return[3,11];case 10:if(o)throw o.error;return[7];case 11:return[7];case 12:if(i){if(this.hasRemaining(1))throw this.createExtraByteError(this.totalPos);return[2,a]}throw d=this,c=d.headByte,p=d.pos,b=d.totalPos,new RangeError("Insufficient data in parsing ".concat(Ca(c)," at ").concat(b," (").concat(p," in the current buffer)"))}})})},e.prototype.decodeArrayStream=function(t){return this.decodeMultiAsync(t,!0)},e.prototype.decodeStream=function(t){return this.decodeMultiAsync(t,!1)},e.prototype.decodeMultiAsync=function(t,r){return ix(this,arguments,function(){var o,s,i,a,l,u,d,c,p;return Ea(this,function(b){switch(b.label){case 0:o=r,s=-1,b.label=1;case 1:b.trys.push([1,13,14,19]),i=Bd(t),b.label=2;case 2:return[4,zn(i.next())];case 3:if(a=b.sent(),!!a.done)return[3,12];if(l=a.value,r&&s===0)throw this.createExtraByteError(this.totalPos);this.appendBuffer(l),o&&(s=this.readArraySize(),o=!1,this.complete()),b.label=4;case 4:b.trys.push([4,9,,10]),b.label=5;case 5:return[4,zn(this.doDecodeSync())];case 6:return[4,b.sent()];case 7:return b.sent(),--s===0?[3,8]:[3,5];case 8:return[3,10];case 9:if(u=b.sent(),!(u instanceof Dl))throw u;return[3,10];case 10:this.totalPos+=this.pos,b.label=11;case 11:return[3,2];case 12:return[3,19];case 13:return d=b.sent(),c={error:d},[3,19];case 14:return b.trys.push([14,,17,18]),a&&!a.done&&(p=i.return)?[4,zn(p.call(i))]:[3,16];case 15:b.sent(),b.label=16;case 16:return[3,18];case 17:if(c)throw c.error;return[7];case 18:return[7];case 19:return[2]}})})},e.prototype.doDecodeSync=function(){e:for(;;){var t=this.readHeadByte(),r=void 0;if(t>=224)r=t-256;else if(t<192)if(t<128)r=t;else if(t<144){var n=t-128;if(n!==0){this.pushMapState(n),this.complete();continue e}else r={}}else if(t<160){var n=t-144;if(n!==0){this.pushArrayState(n),this.complete();continue e}else r=[]}else{var o=t-160;r=this.decodeUtf8String(o,0)}else if(t===192)r=null;else if(t===194)r=!1;else if(t===195)r=!0;else if(t===202)r=this.readF32();else if(t===203)r=this.readF64();else if(t===204)r=this.readU8();else if(t===205)r=this.readU16();else if(t===206)r=this.readU32();else if(t===207)r=this.readU64();else if(t===208)r=this.readI8();else if(t===209)r=this.readI16();else if(t===210)r=this.readI32();else if(t===211)r=this.readI64();else if(t===217){var o=this.lookU8();r=this.decodeUtf8String(o,1)}else if(t===218){var o=this.lookU16();r=this.decodeUtf8String(o,2)}else if(t===219){var o=this.lookU32();r=this.decodeUtf8String(o,4)}else if(t===220){var n=this.readU16();if(n!==0){this.pushArrayState(n),this.complete();continue e}else r=[]}else if(t===221){var n=this.readU32();if(n!==0){this.pushArrayState(n),this.complete();continue e}else r=[]}else if(t===222){var n=this.readU16();if(n!==0){this.pushMapState(n),this.complete();continue e}else r={}}else if(t===223){var n=this.readU32();if(n!==0){this.pushMapState(n),this.complete();continue e}else r={}}else if(t===196){var n=this.lookU8();r=this.decodeBinary(n,1)}else if(t===197){var n=this.lookU16();r=this.decodeBinary(n,2)}else if(t===198){var n=this.lookU32();r=this.decodeBinary(n,4)}else if(t===212)r=this.decodeExtension(1,0);else if(t===213)r=this.decodeExtension(2,0);else if(t===214)r=this.decodeExtension(4,0);else if(t===215)r=this.decodeExtension(8,0);else if(t===216)r=this.decodeExtension(16,0);else if(t===199){var n=this.lookU8();r=this.decodeExtension(n,1)}else if(t===200){var n=this.lookU16();r=this.decodeExtension(n,2)}else if(t===201){var n=this.lookU32();r=this.decodeExtension(n,4)}else throw new Tt("Unrecognized type byte: ".concat(Ca(t)));this.complete();for(var s=this.stack;s.length>0;){var i=s[s.length-1];if(i.type===0)if(i.array[i.position]=r,i.position++,i.position===i.size)s.pop(),r=i.array;else continue e;else if(i.type===1){if(!sx(r))throw new Tt("The type of key must be string or number but "+typeof r);if(r==="__proto__")throw new Tt("The key __proto__ is not allowed");i.key=r,i.type=2;continue e}else if(i.map[i.key]=r,i.readCount++,i.readCount===i.size)s.pop(),r=i.map;else{i.key=null,i.type=1;continue e}}return r}},e.prototype.readHeadByte=function(){return this.headByte===lo&&(this.headByte=this.readU8()),this.headByte},e.prototype.complete=function(){this.headByte=lo},e.prototype.readArraySize=function(){var t=this.readHeadByte();switch(t){case 220:return this.readU16();case 221:return this.readU32();default:{if(t<160)return t-144;throw new Tt("Unrecognized array type byte: ".concat(Ca(t)))}}},e.prototype.pushMapState=function(t){if(t>this.maxMapLength)throw new Tt("Max length exceeded: map length (".concat(t,") > maxMapLengthLength (").concat(this.maxMapLength,")"));this.stack.push({type:1,size:t,key:null,readCount:0,map:{}})},e.prototype.pushArrayState=function(t){if(t>this.maxArrayLength)throw new Tt("Max length exceeded: array length (".concat(t,") > maxArrayLength (").concat(this.maxArrayLength,")"));this.stack.push({type:0,size:t,array:new Array(t),position:0})},e.prototype.decodeUtf8String=function(t,r){var n;if(t>this.maxStrLength)throw new Tt("Max length exceeded: UTF-8 byte length (".concat(t,") > maxStrLength (").concat(this.maxStrLength,")"));if(this.bytes.byteLength<this.pos+r+t)throw Vd;var o=this.pos+r,s;return this.stateIsMapKey()&&((n=this.keyDecoder)===null||n===void 0?void 0:n.canBeCached(t))?s=this.keyDecoder.decode(this.bytes,o,t):t>Uw?s=Nw(this.bytes,o,t):s=qf(this.bytes,o,t),this.pos+=r+t,s},e.prototype.stateIsMapKey=function(){if(this.stack.length>0){var t=this.stack[this.stack.length-1];return t.type===1}return!1},e.prototype.decodeBinary=function(t,r){if(t>this.maxBinLength)throw new Tt("Max length exceeded: bin length (".concat(t,") > maxBinLength (").concat(this.maxBinLength,")"));if(!this.hasRemaining(t+r))throw Vd;var n=this.pos+r,o=this.bytes.subarray(n,n+t);return this.pos+=r+t,o},e.prototype.decodeExtension=function(t,r){if(t>this.maxExtLength)throw new Tt("Max length exceeded: ext length (".concat(t,") > maxExtLength (").concat(this.maxExtLength,")"));var n=this.view.getInt8(this.pos+r),o=this.decodeBinary(t,r+1);return this.extensionCodec.decode(o,n,this.context)},e.prototype.lookU8=function(){return this.view.getUint8(this.pos)},e.prototype.lookU16=function(){return this.view.getUint16(this.pos)},e.prototype.lookU32=function(){return this.view.getUint32(this.pos)},e.prototype.readU8=function(){var t=this.view.getUint8(this.pos);return this.pos++,t},e.prototype.readI8=function(){var t=this.view.getInt8(this.pos);return this.pos++,t},e.prototype.readU16=function(){var t=this.view.getUint16(this.pos);return this.pos+=2,t},e.prototype.readI16=function(){var t=this.view.getInt16(this.pos);return this.pos+=2,t},e.prototype.readU32=function(){var t=this.view.getUint32(this.pos);return this.pos+=4,t},e.prototype.readI32=function(){var t=this.view.getInt32(this.pos);return this.pos+=4,t},e.prototype.readU64=function(){var t=Aw(this.view,this.pos);return this.pos+=8,t},e.prototype.readI64=function(){var t=Yf(this.view,this.pos);return this.pos+=8,t},e.prototype.readF32=function(){var t=this.view.getFloat32(this.pos);return this.pos+=4,t},e.prototype.readF64=function(){var t=this.view.getFloat64(this.pos);return this.pos+=8,t},e}(),cx={};function To(e,t){t===void 0&&(t=cx);var r=new ux(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength);return r.decode(e)}class Vu{constructor(t,r){this.socket=t,this.pendingRequests={},this.index=0,this.alreadyWarnedNoSignalCb=!1,t.onmessage=async n=>{let o=n.data;(typeof Buffer=="undefined"||!Buffer.isBuffer(o))&&(o=await o.arrayBuffer());const s=To(o);if(s.type==="Signal")if(r){const i=To(s.data);if(!i.App)return;const a=i.App[0],l=dx(i.App[1]),u={type:s.type,data:{cellId:a,payload:l}};r(u)}else this.alreadyWarnedNoSignalCb||console.log("Received signal but no signal callback was set in constructor"),this.alreadyWarnedNoSignalCb=!0;else s.type==="Response"?this.handleResponse(s):console.error(`Got unrecognized Websocket message type: ${s.type}`)}}emitSignal(t){const r=fo({type:"Signal",data:fo(t)});this.socket.send(r)}request(t){const r=this.index;this.index+=1;const n=fo({id:r,type:"Request",data:fo(t)}),o=new Promise((s,i)=>{this.pendingRequests[r]={fulfill:s,reject:i}});if(this.socket.readyState===this.socket.OPEN)this.socket.send(n);else return Promise.reject(new Error("Socket is not open"));return o}handleResponse(t){const r=t.id;this.pendingRequests[r]?t.data===null||t.data===void 0?this.pendingRequests[r].reject(new Error("Response canceled by responder")):this.pendingRequests[r].fulfill(To(t.data)):console.error(`Got response with no matching request. id=${r}`)}close(){return this.socket.close(),this.awaitClose()}awaitClose(){return new Promise(t=>this.socket.on("close",t))}static connect(t,r){return new Promise((n,o)=>{const s=new $w(t);s.onerror=()=>{o(new Error(`could not connect to holochain conductor, please check that a conductor service is running and available at ${t}`))},s.onopen=()=>{n(new Vu(s,r))}})}}const dx=e=>To(e),hx="error",px=15e3,fx=e=>e.type===hx?Promise.reject(e):Promise.resolve(e),mx=(e,t,r)=>{let n;const o=new Promise((s,i)=>{n=setTimeout(()=>{clearTimeout(n),i(new Error(`Timed out in ${r}ms: ${t}`))},r)});return new Promise((s,i)=>{Promise.race([e,o]).then(a=>(clearTimeout(n),s(a))).catch(a=>i(a))})},gx=(e,t,r=vx)=>async(n,o)=>{const s={type:t,data:r.input(n)},i=await e(s,o);return r.output(i.data)},Hd=e=>e,vx={input:Hd,output:Hd};var Il={exports:{}};(function(e,t){var r=typeof self!="undefined"?self:fi,n=function(){function s(){this.fetch=!1,this.DOMException=r.DOMException}return s.prototype=r,new s}();(function(s){(function(i){var a={searchParams:"URLSearchParams"in s,iterable:"Symbol"in s&&"iterator"in Symbol,blob:"FileReader"in s&&"Blob"in s&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in s,arrayBuffer:"ArrayBuffer"in s};function l(S){return S&&DataView.prototype.isPrototypeOf(S)}if(a.arrayBuffer)var u=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],d=ArrayBuffer.isView||function(S){return S&&u.indexOf(Object.prototype.toString.call(S))>-1};function c(S){if(typeof S!="string"&&(S=String(S)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(S))throw new TypeError("Invalid character in header field name");return S.toLowerCase()}function p(S){return typeof S!="string"&&(S=String(S)),S}function b(S){var z={next:function(){var B=S.shift();return{done:B===void 0,value:B}}};return a.iterable&&(z[Symbol.iterator]=function(){return z}),z}function w(S){this.map={},S instanceof w?S.forEach(function(z,B){this.append(B,z)},this):Array.isArray(S)?S.forEach(function(z){this.append(z[0],z[1])},this):S&&Object.getOwnPropertyNames(S).forEach(function(z){this.append(z,S[z])},this)}w.prototype.append=function(S,z){S=c(S),z=p(z);var B=this.map[S];this.map[S]=B?B+", "+z:z},w.prototype.delete=function(S){delete this.map[c(S)]},w.prototype.get=function(S){return S=c(S),this.has(S)?this.map[S]:null},w.prototype.has=function(S){return this.map.hasOwnProperty(c(S))},w.prototype.set=function(S,z){this.map[c(S)]=p(z)},w.prototype.forEach=function(S,z){for(var B in this.map)this.map.hasOwnProperty(B)&&S.call(z,this.map[B],B,this)},w.prototype.keys=function(){var S=[];return this.forEach(function(z,B){S.push(B)}),b(S)},w.prototype.values=function(){var S=[];return this.forEach(function(z){S.push(z)}),b(S)},w.prototype.entries=function(){var S=[];return this.forEach(function(z,B){S.push([B,z])}),b(S)},a.iterable&&(w.prototype[Symbol.iterator]=w.prototype.entries);function g(S){if(S.bodyUsed)return Promise.reject(new TypeError("Already read"));S.bodyUsed=!0}function f(S){return new Promise(function(z,B){S.onload=function(){z(S.result)},S.onerror=function(){B(S.error)}})}function m(S){var z=new FileReader,B=f(z);return z.readAsArrayBuffer(S),B}function y(S){var z=new FileReader,B=f(z);return z.readAsText(S),B}function _(S){for(var z=new Uint8Array(S),B=new Array(z.length),ue=0;ue<z.length;ue++)B[ue]=String.fromCharCode(z[ue]);return B.join("")}function x(S){if(S.slice)return S.slice(0);var z=new Uint8Array(S.byteLength);return z.set(new Uint8Array(S)),z.buffer}function k(){return this.bodyUsed=!1,this._initBody=function(S){this._bodyInit=S,S?typeof S=="string"?this._bodyText=S:a.blob&&Blob.prototype.isPrototypeOf(S)?this._bodyBlob=S:a.formData&&FormData.prototype.isPrototypeOf(S)?this._bodyFormData=S:a.searchParams&&URLSearchParams.prototype.isPrototypeOf(S)?this._bodyText=S.toString():a.arrayBuffer&&a.blob&&l(S)?(this._bodyArrayBuffer=x(S.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):a.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(S)||d(S))?this._bodyArrayBuffer=x(S):this._bodyText=S=Object.prototype.toString.call(S):this._bodyText="",this.headers.get("content-type")||(typeof S=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):a.searchParams&&URLSearchParams.prototype.isPrototypeOf(S)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},a.blob&&(this.blob=function(){var S=g(this);if(S)return S;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?g(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(m)}),this.text=function(){var S=g(this);if(S)return S;if(this._bodyBlob)return y(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(_(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},a.formData&&(this.formData=function(){return this.text().then(T)}),this.json=function(){return this.text().then(JSON.parse)},this}var C=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function E(S){var z=S.toUpperCase();return C.indexOf(z)>-1?z:S}function $(S,z){z=z||{};var B=z.body;if(S instanceof $){if(S.bodyUsed)throw new TypeError("Already read");this.url=S.url,this.credentials=S.credentials,z.headers||(this.headers=new w(S.headers)),this.method=S.method,this.mode=S.mode,this.signal=S.signal,!B&&S._bodyInit!=null&&(B=S._bodyInit,S.bodyUsed=!0)}else this.url=String(S);if(this.credentials=z.credentials||this.credentials||"same-origin",(z.headers||!this.headers)&&(this.headers=new w(z.headers)),this.method=E(z.method||this.method||"GET"),this.mode=z.mode||this.mode||null,this.signal=z.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&B)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(B)}$.prototype.clone=function(){return new $(this,{body:this._bodyInit})};function T(S){var z=new FormData;return S.trim().split("&").forEach(function(B){if(B){var ue=B.split("="),fe=ue.shift().replace(/\+/g," "),re=ue.join("=").replace(/\+/g," ");z.append(decodeURIComponent(fe),decodeURIComponent(re))}}),z}function D(S){var z=new w,B=S.replace(/\r?\n[\t ]+/g," ");return B.split(/\r?\n/).forEach(function(ue){var fe=ue.split(":"),re=fe.shift().trim();if(re){var rr=fe.join(":").trim();z.append(re,rr)}}),z}k.call($.prototype);function F(S,z){z||(z={}),this.type="default",this.status=z.status===void 0?200:z.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in z?z.statusText:"OK",this.headers=new w(z.headers),this.url=z.url||"",this._initBody(S)}k.call(F.prototype),F.prototype.clone=function(){return new F(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new w(this.headers),url:this.url})},F.error=function(){var S=new F(null,{status:0,statusText:""});return S.type="error",S};var ne=[301,302,303,307,308];F.redirect=function(S,z){if(ne.indexOf(z)===-1)throw new RangeError("Invalid status code");return new F(null,{status:z,headers:{location:S}})},i.DOMException=s.DOMException;try{new i.DOMException}catch{i.DOMException=function(z,B){this.message=z,this.name=B;var ue=Error(z);this.stack=ue.stack},i.DOMException.prototype=Object.create(Error.prototype),i.DOMException.prototype.constructor=i.DOMException}function xe(S,z){return new Promise(function(B,ue){var fe=new $(S,z);if(fe.signal&&fe.signal.aborted)return ue(new i.DOMException("Aborted","AbortError"));var re=new XMLHttpRequest;function rr(){re.abort()}re.onload=function(){var Ft={status:re.status,statusText:re.statusText,headers:D(re.getAllResponseHeaders()||"")};Ft.url="responseURL"in re?re.responseURL:Ft.headers.get("X-Request-URL");var ln="response"in re?re.response:re.responseText;B(new F(ln,Ft))},re.onerror=function(){ue(new TypeError("Network request failed"))},re.ontimeout=function(){ue(new TypeError("Network request failed"))},re.onabort=function(){ue(new i.DOMException("Aborted","AbortError"))},re.open(fe.method,fe.url,!0),fe.credentials==="include"?re.withCredentials=!0:fe.credentials==="omit"&&(re.withCredentials=!1),"responseType"in re&&a.blob&&(re.responseType="blob"),fe.headers.forEach(function(Ft,ln){re.setRequestHeader(ln,Ft)}),fe.signal&&(fe.signal.addEventListener("abort",rr),re.onreadystatechange=function(){re.readyState===4&&fe.signal.removeEventListener("abort",rr)}),re.send(typeof fe._bodyInit=="undefined"?null:fe._bodyInit)})}return xe.polyfill=!0,s.fetch||(s.fetch=xe,s.Headers=w,s.Request=$,s.Response=F),i.Headers=w,i.Request=$,i.Response=F,i.fetch=xe,Object.defineProperty(i,"__esModule",{value:!0}),i})({})})(n),n.fetch.ponyfill=!0,delete n.fetch.polyfill;var o=n;t=o.fetch,t.default=o.fetch,t.fetch=o.fetch,t.Headers=o.Headers,t.Request=o.Request,t.Response=o.Response,e.exports=t})(Il,Il.exports);var yx=l0(Il.exports);const bx="/.launcher-env.json";async function wx(){const e=await yx(bx);if(e.ok)return await e.json();if(e.status===404){console.warn("[@holochain/conductor-api]: you are in a development environment. When this UI is run in the Holochain Launcher, `AppWebsocket.connect()`, `AdminWebsocket.connect()` and `appWebsocket.appInfo()` will have their parameters ignored and substituted by the ones provided by the Holochain Launcher.");return}else throw new Error(`Error trying to fetch the launcher environment: ${e.statusText}`)}const Gf=typeof window!="undefined",xx=typeof process!="undefined"&&process.env&&{}.JEST_WORKER_ID!==void 0;let Jf;Gf&&!xx&&(Jf=wx().catch(console.error));async function _x(){if(Gf)return Jf}class Hu{constructor(t,r,n){this.overrideInstalledAppId=n,this._requester=(o,s)=>gx((i,a)=>mx(this.client.request(i),o,a||this.defaultTimeout).then(fx),o,s),this.appInfo=this._requester("app_info",Sx(this.overrideInstalledAppId)),this.callZome=this._requester("zome_call",kx),this.client=t,this.defaultTimeout=r===void 0?px:r}static async connect(t,r,n){const o=await _x();o&&(t=`ws://localhost:${o.APP_INTERFACE_PORT}`);const s=await Vu.connect(t,n);return new Hu(s,r,o?o.INSTALLED_APP_ID:void 0)}}const kx={input:e=>qs(Ys({},e),{payload:fo(e.payload)}),output:e=>To(e)},Sx=e=>({input:t=>e?{installed_app_id:e}:t,output:t=>t});var jd;(function(e){e.StoreElement="StoreElement",e.StoreEntry="StoreEntry",e.RegisterAgentActivity="RegisterAgentActivity",e.RegisterUpdatedContent="RegisterUpdatedContent",e.RegisterUpdatedElement="RegisterUpdatedElement",e.RegisterDeletedBy="RegisterDeletedBy",e.RegisterDeletedEntryHeader="RegisterDeletedEntryHeader",e.RegisterAddLink="RegisterAddLink",e.RegisterRemoveLink="RegisterRemoveLink"})(jd||(jd={}));var Wd;(function(e){e.Dna="Dna",e.AgentValidationPkg="AgentValidationPkg",e.InitZomesComplete="InitZomesComplete",e.CreateLink="CreateLink",e.DeleteLink="DeleteLink",e.OpenChain="OpenChain",e.CloseChain="CloseChain",e.Create="Create",e.Update="Update",e.Delete="Delete"})(Wd||(Wd={}));const Cx=`ws://localhost:${xw}`;let nr;async function Ex(e){return nr||(nr=await Hu.connect(Cx,void 0,e),setInterval(()=>{nr.client.socket.readyState===nr.client.socket.OPEN&&nr.appInfo({installed_app_id:"test"})},6e4),nr.client.socket.addEventListener("close",()=>{console.log("app websocket closed")}),nr)}let Zf;Ex().then(e=>{console.log("AppWS connected"),Zf=e});vg.render(N(nh.StrictMode,{children:N(Tw,{wsClient:Zf})}),document.getElementById("root"));
