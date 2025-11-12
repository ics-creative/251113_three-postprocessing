import{C as me,V as T,M as nt,T as et,Q as Yt,S as Zt,a as w,R as ge,P as fe,b as _e,c as be,d as Xt,e as ye,W as xe,A as we,D as St,F as ve,f as Ce,g as tt,h as k,n as E,i as rt,j as lt,N as Ee,u as M,k as $,l as P,m as D,v as S,o as L,p as he,q as Tt,r as at,s as jt,t as yt,w as B,x as Te,y as Se,z as Gt,H as F,B as R,E as V,G as Me,I as xt,J as Ot,K as pt,L as it,O as zt,U as Ne,X as Kt,Y as gt,Z as Ae,_ as Wt,$ as Pe,a0 as qt,a1 as Qt,a2 as De,a3 as Re,a4 as Le,a5 as ke,a6 as Mt,a7 as Q,a8 as $e,a9 as mt,aa as Oe,ab as ze,ac as Fe,ad as Be,ae as Ie,af as Ve,ag as je,ah as He,ai as _t,aj as Ft,ak as wt,al as Jt,am as Ue}from"./three.tsl-DEd_xDPd.js";/* empty css              */const te={type:"change"},Ht={type:"start"},ce={type:"end"},bt=new ge,ee=new fe,Ye=Math.cos(70*_e.DEG2RAD),v=new T,N=2*Math.PI,x={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Nt=1e-6;class Ze extends me{constructor(t,e=null){super(t,e),this.state=x.NONE,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:nt.ROTATE,MIDDLE:nt.DOLLY,RIGHT:nt.PAN},this.touches={ONE:et.ROTATE,TWO:et.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new T,this._lastQuaternion=new Yt,this._lastTargetPosition=new T,this._quat=new Yt().setFromUnitVectors(t.up,new T(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zt,this._sphericalDelta=new Zt,this._scale=1,this._panOffset=new T,this._rotateStart=new w,this._rotateEnd=new w,this._rotateDelta=new w,this._panStart=new w,this._panEnd=new w,this._panDelta=new w,this._dollyStart=new w,this._dollyEnd=new w,this._dollyDelta=new w,this._dollyDirection=new T,this._mouse=new w,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ge.bind(this),this._onPointerDown=Xe.bind(this),this._onPointerUp=Ke.bind(this),this._onContextMenu=ii.bind(this),this._onMouseWheel=Qe.bind(this),this._onKeyDown=Je.bind(this),this._onTouchStart=ti.bind(this),this._onTouchMove=ei.bind(this),this._onMouseDown=We.bind(this),this._onMouseMove=qe.bind(this),this._interceptControlDown=si.bind(this),this._interceptControlUp=oi.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(te),this.update(),this.state=x.NONE}update(t=null){const e=this.object.position;v.copy(e).sub(this.target),v.applyQuaternion(this._quat),this._spherical.setFromVector3(v),this.autoRotate&&this.state===x.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(i)&&isFinite(o)&&(i<-Math.PI?i+=N:i>Math.PI&&(i-=N),o<-Math.PI?o+=N:o>Math.PI&&(o-=N),i<=o?this._spherical.theta=Math.max(i,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+o)/2?Math.max(i,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let n=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),n=r!=this._spherical.radius}if(v.setFromSpherical(this._spherical),v.applyQuaternion(this._quatInverse),e.copy(this.target).add(v),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const a=v.length();r=this._clampDistance(a*this._scale);const h=a-r;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),n=!!h}else if(this.object.isOrthographicCamera){const a=new T(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),n=h!==this.object.zoom;const u=new T(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(a),this.object.updateMatrixWorld(),r=v.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(bt.origin.copy(this.object.position),bt.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(bt.direction))<Ye?this.object.lookAt(this.target):(ee.setFromNormalAndCoplanarPoint(this.object.up,this.target),bt.intersectPlane(ee,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),n=!0)}return this._scale=1,this._performCursorZoom=!1,n||this._lastPosition.distanceToSquared(this.object.position)>Nt||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Nt||this._lastTargetPosition.distanceToSquared(this.target)>Nt?(this.dispatchEvent(te),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?N/60*this.autoRotateSpeed*t:N/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){v.setFromMatrixColumn(e,0),v.multiplyScalar(-t),this._panOffset.add(v)}_panUp(t,e){this.screenSpacePanning===!0?v.setFromMatrixColumn(e,1):(v.setFromMatrixColumn(e,0),v.crossVectors(this.object.up,v)),v.multiplyScalar(t),this._panOffset.add(v)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;v.copy(o).sub(this.target);let n=v.length();n*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*n/i.clientHeight,this.object.matrix),this._panUp(2*e*n/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),o=t-i.left,n=e-i.top,r=i.width,a=i.height;this._mouse.x=o/r*2-1,this._mouse.y=-(n/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(N*this._rotateDelta.x/e.clientHeight),this._rotateUp(N*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(N*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-N*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(N*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-N*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),o=.5*(t.pageY+e.y);this._rotateStart.set(i,o)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),o=.5*(t.pageY+e.y);this._panStart.set(i,o)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,o=t.pageY-e.y,n=Math.sqrt(i*i+o*o);this._dollyStart.set(0,n)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),o=.5*(t.pageX+i.x),n=.5*(t.pageY+i.y);this._rotateEnd.set(o,n)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(N*this._rotateDelta.x/e.clientHeight),this._rotateUp(N*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),o=.5*(t.pageY+e.y);this._panEnd.set(i,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,o=t.pageY-e.y,n=Math.sqrt(i*i+o*o);this._dollyEnd.set(0,n),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(r,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new w,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Xe(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function Ge(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function Ke(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ce),this.state=x.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function We(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case nt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=x.DOLLY;break;case nt.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=x.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=x.ROTATE}break;case nt.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=x.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=x.PAN}break;default:this.state=x.NONE}this.state!==x.NONE&&this.dispatchEvent(Ht)}function qe(s){switch(this.state){case x.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case x.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case x.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Qe(s){this.enabled===!1||this.enableZoom===!1||this.state!==x.NONE||(s.preventDefault(),this.dispatchEvent(Ht),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(ce))}function Je(s){this.enabled!==!1&&this._handleKeyDown(s)}function ti(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case et.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=x.TOUCH_ROTATE;break;case et.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=x.TOUCH_PAN;break;default:this.state=x.NONE}break;case 2:switch(this.touches.TWO){case et.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=x.TOUCH_DOLLY_PAN;break;case et.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=x.TOUCH_DOLLY_ROTATE;break;default:this.state=x.NONE}break;default:this.state=x.NONE}this.state!==x.NONE&&this.dispatchEvent(Ht)}function ei(s){switch(this._trackPointer(s),this.state){case x.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case x.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case x.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case x.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=x.NONE}}function ii(s){this.enabled!==!1&&s.preventDefault()}function si(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function oi(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const U=s=>s==="day"?{backgroundColor:"#87ceeb",ambientLightIntensity:1,dirLight1Intensity:1,dirLight2Intensity:1,dirLight3Intensity:1,cloudColor:"#ffffff",islandColor:"#a59f83",leavesColor:"#86b964",trunkColor:"#b38f75",bushesColor:"#558038"}:{backgroundColor:"#10465b",ambientLightIntensity:.2,dirLight1Intensity:.5,dirLight2Intensity:.5,dirLight3Intensity:.5,cloudColor:"#545454",islandColor:"#565243",leavesColor:"#3c542b",trunkColor:"#6a5444",bushesColor:"#344d23"},ie={fogNear:18,fogFar:70},ni=s=>{const t=U("day"),e=new we(16777215,t.ambientLightIntensity);s.add(e);const i=new St(16777215,t.dirLight1Intensity);i.position.set(5,15,15);const o=new St(16777215,t.dirLight2Intensity);o.position.set(-5,15,10);const n=new St(16777215,t.dirLight3Intensity);return n.position.set(0,15,10),n.lookAt(0,0,10),{ambientLight:e,directionalLight1:i,directionalLight2:o,directionalLight3:n}},se=s=>{const t=U(s);return{fog:new ve(t.backgroundColor,ie.fogNear,ie.fogFar)}},ri=s=>{const t=U("day"),e=new be;e.background=new Xt(t.backgroundColor);const{ambientLight:i,directionalLight1:o,directionalLight2:n,directionalLight3:r}=ni(e);e.add(i,o,n,r);const{fog:a}=se("day");e.fog=a;const h=new ye(75,window.innerWidth/window.innerHeight,.1,1e3);h.position.set(0,8,30);const u=new xe({antialias:!0});u.setSize(window.innerWidth,window.innerHeight),u.setPixelRatio(window.devicePixelRatio),s.appendChild(u.domElement);const d=new Ze(h,u.domElement);return d.target.set(0,4,0),d.update(),{scene:e,camera:h,renderer:u,onChangeEffectScene:m=>{const f=m==="bloom"?"night":"day",b=U(f),{fog:p}=se(f);e.fog=p,e.background=new Xt(b.backgroundColor),i.intensity=b.ambientLightIntensity,o.intensity=b.dirLight1Intensity,n.intensity=b.dirLight2Intensity,r.intensity=b.dirLight3Intensity}}},ai=(s,t)=>{s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight)},de=Math.sqrt(3),li=.5*(de-1),ut=(3-de)/6,oe=s=>Math.floor(s)|0,ne=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function hi(s=Math.random){const t=ci(s),e=new Float64Array(t).map(o=>ne[o%12*2]),i=new Float64Array(t).map(o=>ne[o%12*2+1]);return function(n,r){let a=0,h=0,u=0;const d=(n+r)*li,_=oe(n+d),m=oe(r+d),f=(_+m)*ut,b=_-f,p=m-f,g=n-b,c=r-p;let l,y;g>c?(l=1,y=0):(l=0,y=1);const C=g-l+ut,z=c-y+ut,Y=g-1+2*ut,Z=c-1+2*ut,X=_&255,ht=m&255;let G=.5-g*g-c*c;if(G>=0){const I=X+t[ht],ct=e[I],dt=i[I];G*=G,a=G*G*(ct*g+dt*c)}let K=.5-C*C-z*z;if(K>=0){const I=X+l+t[ht+y],ct=e[I],dt=i[I];K*=K,h=K*K*(ct*C+dt*z)}let W=.5-Y*Y-Z*Z;if(W>=0){const I=X+1+t[ht+1],ct=e[I],dt=i[I];W*=W,u=W*W*(ct*Y+dt*Z)}return 70*(a+h+u)}}function ci(s){const e=new Uint8Array(512);for(let i=0;i<512/2;i++)e[i]=i;for(let i=0;i<512/2-1;i++){const o=i+~~(s()*(256-i)),n=e[i];e[i]=e[o],e[o]=n}for(let i=256;i<512;i++)e[i]=e[i-256];return e}const ue=hi(),j={color:"#52ebff",frequency:.1,amplitude:.7,waveSpeed:.2,waveAmplitude:.4};let H=null,vt=[];const di=()=>{if(!H)return;const s=H.getAttribute("position");vt=[];for(let t=0;t<s.count;t++){const e=s.getX(t),i=s.getY(t),n=ue(e*j.frequency,i*j.frequency)*j.amplitude;s.setZ(t,n),vt.push(n)}s.needsUpdate=!0,H.computeVertexNormals()},ui=()=>{H=new Ce(120,60,64,64);const s=new tt({color:j.color,metalness:1});di();const t=new k(H,s);return t.rotation.x=-Math.PI/2,t.position.y=0,t.receiveShadow=!0,t},pi=s=>{if(!H||vt.length===0)return;const t=H.getAttribute("position"),e=s*j.waveSpeed;for(let i=0;i<t.count;i++){const o=t.getX(i),n=t.getY(i),r=vt[i],h=ue(o*j.frequency+e,n*j.frequency+e)*j.waveAmplitude;t.setZ(i,r+h)}t.needsUpdate=!0,H.computeVertexNormals()};class mi extends lt{static get type(){return"ChromaticAberrationNode"}constructor(t,e,i,o){super("vec4"),this.textureNode=t,this.updateBeforeType=Ee.FRAME,this.strengthNode=e,this.centerNode=i,this.scaleNode=o,this._invSize=M(new w)}updateBefore(){const t=this.textureNode.value;this._invSize.value.set(1/t.image.width,1/t.image.height)}setup(){const t=this.textureNode,e=t.uvNode||$(),i=P(([r,a,h,u])=>{const d=r.sub(h),_=d.length(),m=D(1).add(u.mul(.02).mul(a)),f=D(1),b=D(1).sub(u.mul(.02).mul(a)),p=a.mul(_),g=h.add(d.mul(m)),c=h.add(d.mul(f)),l=h.add(d.mul(b)),y=d.mul(p).mul(D(.01)),C=d.mul(p).mul(D(0)),z=d.mul(p).mul(D(-.01)),Y=g.add(y),Z=c.add(C),X=l.add(z),ht=t.sample(Y).r,G=t.sample(Z).g,K=t.sample(X).b,W=t.sample(r).a;return S(ht,G,K,W)}).setLayout({name:"ChromaticAberrationShader",type:"vec4",inputs:[{name:"uv",type:"vec2"},{name:"strength",type:"float"},{name:"center",type:"vec2"},{name:"scale",type:"float"},{name:"invSize",type:"vec2"}]});return P(()=>i(e,this.strengthNode,this.centerNode,this.scaleNode,this._invSize))()}}const gi=(s,t=1,e=null,i=1.1)=>E(new mi(rt(s),E(t),E(e),E(i))),At=new jt;let Pt;class fi extends lt{static get type(){return"GaussianBlurNode"}constructor(t,e=null,i=4,o={}){super("vec4"),this.textureNode=t,this.directionNode=e,this.sigma=i,this._invSize=M(new w),this._passDirection=M(new w),this._horizontalRT=new L(1,1,{depthBuffer:!1}),this._horizontalRT.texture.name="GaussianBlurNode.horizontal",this._verticalRT=new L(1,1,{depthBuffer:!1}),this._verticalRT.texture.name="GaussianBlurNode.vertical",this._textureNode=he(this,this._verticalRT.texture),this._textureNode.uvNode=t.uvNode,this.updateBeforeType=Tt.FRAME,this.resolutionScale=o.resolutionScale||1,this.premultipliedAlpha=o.premultipliedAlpha||!1}setSize(t,e){t=Math.max(Math.round(t*this.resolutionScale),1),e=Math.max(Math.round(e*this.resolutionScale),1),this._invSize.value.set(1/t,1/e),this._horizontalRT.setSize(t,e),this._verticalRT.setSize(t,e)}updateBefore(t){const{renderer:e}=t;Pt=at.resetRendererState(e,Pt);const i=this.textureNode,o=i.value,n=i.value;At.material=this._material,this.setSize(o.image.width,o.image.height);const r=o.type;this._horizontalRT.texture.type=r,this._verticalRT.texture.type=r,e.setRenderTarget(this._horizontalRT),this._passDirection.value.set(1,0),At.render(e),i.value=this._horizontalRT.texture,e.setRenderTarget(this._verticalRT),this._passDirection.value.set(0,1),At.render(e),i.value=n,at.restoreRendererState(e,Pt)}getTextureNode(){return this._textureNode}setup(t){const e=this.textureNode,i=$(),o=yt(this.directionNode||1);let n,r;this.premultipliedAlpha?(n=d=>Te(e.sample(d)),r=d=>Se(d)):(n=d=>e.sample(d),r=d=>d);const a=P(()=>{const d=3+2*this.sigma,_=this._getCoefficients(d),m=this._invSize,f=o.mul(this._passDirection),b=S(n(i).mul(_[0])).toVar();for(let p=1;p<d;p++){const g=D(p),c=D(_[p]),l=yt(f.mul(m.mul(g))).toVar(),y=n(i.add(l)),C=n(i.sub(l));b.addAssign(y.add(C).mul(c))}return r(b)}),h=this._material||(this._material=new B);h.fragmentNode=a().context(t.getSharedContext()),h.name="Gaussian_blur",h.needsUpdate=!0;const u=t.getNodeProperties(this);return u.textureNode=e,this._textureNode}dispose(){this._horizontalRT.dispose(),this._verticalRT.dispose()}_getCoefficients(t){const e=[],i=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(i*i))/i);return e}get resolution(){return console.warn('THREE.GaussianBlurNode: The "resolution" property has been renamed to "resolutionScale" and is now of type `number`.'),new w(this.resolutionScale,this.resolutionScale)}set resolution(t){console.warn('THREE.GaussianBlurNode: The "resolution" property has been renamed to "resolutionScale" and is now of type `number`.'),this.resolutionScale=t.x}}const pe=(s,t,e,i={})=>E(new fi(rt(s),t,e,i)),A=new jt;let Dt;class _i extends lt{static get type(){return"DepthOfFieldNode"}constructor(t,e,i,o,n){super("vec4"),this.textureNode=t,this.viewZNode=e,this.focusDistanceNode=i,this.focalLengthNode=o,this.bokehScaleNode=n,this._invSize=M(new w),this._CoCRT=new L(1,1,{depthBuffer:!1,type:F,format:Gt,count:2}),this._CoCRT.textures[0].name="DepthOfField.NearField",this._CoCRT.textures[1].name="DepthOfField.FarField",this._CoCBlurredRT=new L(1,1,{depthBuffer:!1,type:F,format:Gt}),this._CoCBlurredRT.texture.name="DepthOfField.NearFieldBlurred",this._blur64RT=new L(1,1,{depthBuffer:!1,type:F}),this._blur64RT.texture.name="DepthOfField.Blur64",this._blur16NearRT=new L(1,1,{depthBuffer:!1,type:F}),this._blur16NearRT.texture.name="DepthOfField.Blur16Near",this._blur16FarRT=new L(1,1,{depthBuffer:!1,type:F}),this._blur16FarRT.texture.name="DepthOfField.Blur16Far",this._compositeRT=new L(1,1,{depthBuffer:!1,type:F}),this._compositeRT.texture.name="DepthOfField.Composite",this._CoCMaterial=new B,this._CoCBlurredMaterial=new B,this._blur64Material=new B,this._blur16Material=new B,this._compositeMaterial=new B,this._textureNode=R(this._compositeRT.texture),this._CoCTextureNode=R(this._CoCRT.texture),this._blur64TextureNode=R(this._blur64RT.texture),this._blur16NearTextureNode=R(this._blur16NearRT.texture),this._blur16FarTextureNode=R(this._blur16FarRT.texture),this.updateBeforeType=Tt.FRAME}setSize(t,e){this._invSize.value.set(1/t,1/e),this._CoCRT.setSize(t,e),this._compositeRT.setSize(t,e);const i=Math.round(t/2),o=Math.round(e/2);this._CoCBlurredRT.setSize(i,o),this._blur64RT.setSize(i,o),this._blur16NearRT.setSize(i,o),this._blur16FarRT.setSize(i,o)}getTextureNode(){return this._textureNode}updateBefore(t){const{renderer:e}=t,i=this.textureNode.value;this.setSize(i.image.width,i.image.height),Dt=at.resetRendererState(e,Dt),e.setClearColor(0,0),A.material=this._CoCMaterial,e.setRenderTarget(this._CoCRT),A.render(e),this._CoCTextureNode.value=this._CoCRT.textures[0],A.material=this._CoCBlurredMaterial,e.setRenderTarget(this._CoCBlurredRT),A.render(e),this._CoCTextureNode.value=this._CoCBlurredRT.texture,A.material=this._blur64Material,e.setRenderTarget(this._blur64RT),A.render(e),A.material=this._blur16Material,e.setRenderTarget(this._blur16NearRT),A.render(e),this._CoCTextureNode.value=this._CoCRT.textures[1],A.material=this._blur64Material,e.setRenderTarget(this._blur64RT),A.render(e),A.material=this._blur16Material,e.setRenderTarget(this._blur16FarRT),A.render(e),A.material=this._compositeMaterial,e.setRenderTarget(this._compositeRT),A.render(e),at.restoreRendererState(e,Dt)}setup(t){const e=this._generateKernels(),i=V("float"),o=V("float"),n=Me(i,o),r=P(()=>{const m=this.viewZNode.negate().sub(this.focusDistanceNode),f=xt(0,this.focalLengthNode,m.abs());return i.assign(Ot(m,0).mul(f)),o.assign(Ot(0,m).mul(f)),S(0)});this._CoCMaterial.colorNode=r().context(t.getSharedContext()),this._CoCMaterial.outputNode=n,this._CoCMaterial.needsUpdate=!0,this._CoCBlurredMaterial.colorNode=pe(this._CoCTextureNode,1,2),this._CoCBlurredMaterial.needsUpdate=!0;const a=pt(e.points64),h=P(()=>{const m=it(),f=$(),b=this._CoCTextureNode.sample(f).r,p=this._invSize.mul(this.bokehScaleNode).mul(b);return zt(64,({i:g})=>{const c=f.add(p.mul(a.element(g))),l=this.textureNode.sample(c);m.addAssign(l.rgb)}),m.divAssign(64),S(m,b)});this._blur64Material.fragmentNode=h().context(t.getSharedContext()),this._blur64Material.needsUpdate=!0;const u=pt(e.points16),d=P(()=>{const m=$(),f=this._blur64TextureNode.sample(m).toVar(),b=f.rgb,p=f.a,g=this._invSize.mul(this.bokehScaleNode).mul(p);return zt(16,({i:c})=>{const l=m.add(g.mul(u.element(c))),y=this._blur64TextureNode.sample(l);b.assign(Ne(y.rgb,b))}),S(b,p)});this._blur16Material.fragmentNode=d().context(t.getSharedContext()),this._blur16Material.needsUpdate=!0;const _=P(()=>{const m=$(),f=this._blur16NearTextureNode.sample(m),b=this._blur16FarTextureNode.sample(m),p=this.textureNode.sample(m),g=Kt(f.a,.5).mul(2),c=Kt(b.a,.5).mul(2),l=S(0,0,0,1).toVar();return l.rgb=gt(p.rgb,b.rgb,c),l.rgb=gt(l.rgb,f.rgb,g),l});return this._compositeMaterial.fragmentNode=_().context(t.getSharedContext()),this._compositeMaterial.needsUpdate=!0,this._textureNode}_generateKernels(){const t=2.39996323,e=80,i=[],o=[];let n=0,r=0;for(let a=0;a<e;a++){const h=a*t,u=Math.sqrt(a)/Math.sqrt(e),d=new w(u*Math.cos(h),u*Math.sin(h));a%5===0?(o[r]=d,r++):(i[n]=d,n++)}return{points16:o,points64:i}}dispose(){this._CoCRT.dispose(),this._CoCBlurredRT.dispose(),this._blur64RT.dispose(),this._blur16NearRT.dispose(),this._blur16FarRT.dispose(),this._compositeRT.dispose(),this._CoCMaterial.dispose(),this._CoCBlurredMaterial.dispose(),this._blur64Material.dispose(),this._blur16Material.dispose(),this._compositeMaterial.dispose()}}const bi=(s,t,e=1,i=1,o=1)=>E(new _i(rt(s),E(t),E(e),E(i),E(o))),re=(s,t)=>{const e=new w(.4,.4),i=M(e),o=gi(s,D(.2),i);return bi(o,t)},q=new jt,yi=new w,xi=new w(1,0),wi=new w(0,1);let Rt;class vi extends lt{static get type(){return"BloomNode"}constructor(t,e=1,i=0,o=0){super("vec4"),this.inputNode=t,this.strength=M(e),this.radius=M(i),this.threshold=M(o),this.smoothWidth=M(.01),this._renderTargetsHorizontal=[],this._renderTargetsVertical=[],this._nMips=5,this._renderTargetBright=new L(1,1,{depthBuffer:!1,type:F}),this._renderTargetBright.texture.name="UnrealBloomPass.bright",this._renderTargetBright.texture.generateMipmaps=!1;for(let n=0;n<this._nMips;n++){const r=new L(1,1,{depthBuffer:!1,type:F});r.texture.name="UnrealBloomPass.h"+n,r.texture.generateMipmaps=!1,this._renderTargetsHorizontal.push(r);const a=new L(1,1,{depthBuffer:!1,type:F});a.texture.name="UnrealBloomPass.v"+n,a.texture.generateMipmaps=!1,this._renderTargetsVertical.push(a)}this._compositeMaterial=null,this._highPassFilterMaterial=null,this._separableBlurMaterials=[],this._textureNodeBright=R(this._renderTargetBright.texture),this._textureNodeBlur0=R(this._renderTargetsVertical[0].texture),this._textureNodeBlur1=R(this._renderTargetsVertical[1].texture),this._textureNodeBlur2=R(this._renderTargetsVertical[2].texture),this._textureNodeBlur3=R(this._renderTargetsVertical[3].texture),this._textureNodeBlur4=R(this._renderTargetsVertical[4].texture),this._textureOutput=he(this,this._renderTargetsHorizontal[0].texture),this.updateBeforeType=Tt.FRAME}getTextureNode(){return this._textureOutput}setSize(t,e){let i=Math.round(t/2),o=Math.round(e/2);this._renderTargetBright.setSize(i,o);for(let n=0;n<this._nMips;n++)this._renderTargetsHorizontal[n].setSize(i,o),this._renderTargetsVertical[n].setSize(i,o),this._separableBlurMaterials[n].invSize.value.set(1/i,1/o),i=Math.round(i/2),o=Math.round(o/2)}updateBefore(t){const{renderer:e}=t;Rt=at.resetRendererState(e,Rt);const i=e.getDrawingBufferSize(yi);this.setSize(i.width,i.height),e.setRenderTarget(this._renderTargetBright),q.material=this._highPassFilterMaterial,q.render(e);let o=this._renderTargetBright;for(let n=0;n<this._nMips;n++)q.material=this._separableBlurMaterials[n],this._separableBlurMaterials[n].colorTexture.value=o.texture,this._separableBlurMaterials[n].direction.value=xi,e.setRenderTarget(this._renderTargetsHorizontal[n]),q.render(e),this._separableBlurMaterials[n].colorTexture.value=this._renderTargetsHorizontal[n].texture,this._separableBlurMaterials[n].direction.value=wi,e.setRenderTarget(this._renderTargetsVertical[n]),q.render(e),o=this._renderTargetsVertical[n];e.setRenderTarget(this._renderTargetsHorizontal[0]),q.material=this._compositeMaterial,q.render(e),at.restoreRendererState(e,Rt)}setup(t){const e=P(()=>{const h=this.inputNode,u=Ae(h.rgb),d=xt(this.threshold,this.threshold.add(this.smoothWidth),u);return gt(S(0),h,d)});this._highPassFilterMaterial=this._highPassFilterMaterial||new B,this._highPassFilterMaterial.fragmentNode=e().context(t.getSharedContext()),this._highPassFilterMaterial.name="Bloom_highPass",this._highPassFilterMaterial.needsUpdate=!0;const i=[6,10,14,18,22];for(let h=0;h<this._nMips;h++)this._separableBlurMaterials.push(this._getSeparableBlurMaterial(t,i[h]));const o=pt([1,.8,.6,.4,.2]),n=pt([new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)]),r=P(([h,u])=>{const d=D(1.2).sub(h);return gt(h,d,u)}).setLayout({name:"lerpBloomFactor",type:"float",inputs:[{name:"factor",type:"float"},{name:"radius",type:"float"}]}),a=P(()=>{const h=r(o.element(0),this.radius).mul(S(n.element(0),1)).mul(this._textureNodeBlur0),u=r(o.element(1),this.radius).mul(S(n.element(1),1)).mul(this._textureNodeBlur1),d=r(o.element(2),this.radius).mul(S(n.element(2),1)).mul(this._textureNodeBlur2),_=r(o.element(3),this.radius).mul(S(n.element(3),1)).mul(this._textureNodeBlur3),m=r(o.element(4),this.radius).mul(S(n.element(4),1)).mul(this._textureNodeBlur4);return h.add(u).add(d).add(_).add(m).mul(this.strength)});return this._compositeMaterial=this._compositeMaterial||new B,this._compositeMaterial.fragmentNode=a().context(t.getSharedContext()),this._compositeMaterial.name="Bloom_comp",this._compositeMaterial.needsUpdate=!0,this._textureOutput}dispose(){for(let t=0;t<this._renderTargetsHorizontal.length;t++)this._renderTargetsHorizontal[t].dispose();for(let t=0;t<this._renderTargetsVertical.length;t++)this._renderTargetsVertical[t].dispose();this._renderTargetBright.dispose()}_getSeparableBlurMaterial(t,e){const i=[],o=e/3;for(let f=0;f<e;f++)i.push(.39894*Math.exp(-.5*f*f/(o*o))/o);const n=R(null),r=pt(i),a=M(new w),h=M(new w(.5,.5)),u=$(),d=f=>n.sample(f),_=P(()=>{const f=d(u).rgb.mul(r.element(0)).toVar();return zt({start:Wt(1),end:Wt(e),type:"int",condition:"<"},({i:b})=>{const p=D(b),g=r.element(b),c=h.mul(a).mul(p),l=d(u.add(c)).rgb,y=d(u.sub(c)).rgb;f.addAssign(Pe(l,y).mul(g))}),S(f,1)}),m=new B;return m.fragmentNode=_().context(t.getSharedContext()),m.name="Bloom_separable",m.needsUpdate=!0,m.colorTexture=n,m.direction=h,m.invSize=a,m}}const Ci=(s,t,e,i)=>E(new vi(E(s),t,e,i)),Ei=s=>{const t=Ci(s,.3,0,0);return t.smoothWidth.value=.3,t};class Ti extends lt{static get type(){return"PixelationNode"}constructor(t,e,i,o,n,r){super("vec4"),this.textureNode=t,this.depthNode=e,this.normalNode=i,this.pixelSize=o,this.normalEdgeStrength=n,this.depthEdgeStrength=r,this._resolution=M(new ke),this.updateBeforeType=Tt.FRAME}updateBefore(){const t=this.textureNode.value,e=t.image.width,i=t.image.height;this._resolution.value.set(e,i,1/e,1/i)}setup(){const{textureNode:t,depthNode:e,normalNode:i}=this,o=t.uvNode||$(),n=e.uvNode||$(),r=i.uvNode||$(),a=()=>t.sample(o),h=(p,g)=>e.sample(n.add(yt(p,g).mul(this._resolution.zw))).r,u=(p,g)=>i.sample(r.add(yt(p,g).mul(this._resolution.zw))).rgb.normalize(),d=p=>{const g=V("float","diff");return g.addAssign(Q(h(1,0).sub(p))),g.addAssign(Q(h(-1,0).sub(p))),g.addAssign(Q(h(0,1).sub(p))),g.addAssign(Q(h(0,-1).sub(p))),$e(xt(.01,.02,g).mul(2)).div(2)},_=(p,g,c,l)=>{const y=h(p,g).sub(c),C=u(p,g),z=it(1,1,1),Y=mt(l.sub(C),z),Z=Q(xt(-.01,.01,Y),0,1),X=Q(Oe(y.mul(.25).add(.0025)),0,1);return D(1).sub(mt(l,C)).mul(X).mul(Z)},m=(p,g)=>{const c=V("float","indicator");return c.addAssign(_(0,-1,p,g)),c.addAssign(_(0,1,p,g)),c.addAssign(_(-1,0,p,g)),c.addAssign(_(1,0,p,g)),Ot(.1,c)};return P(()=>{const p=a(),g=V("float","depth"),c=V("vec3","normal");Mt(this.depthEdgeStrength.greaterThan(0).or(this.normalEdgeStrength.greaterThan(0)),()=>{g.assign(h(0,0)),c.assign(u(0,0))});const l=V("float","dei");Mt(this.depthEdgeStrength.greaterThan(0),()=>{l.assign(d(g))});const y=V("float","nei");Mt(this.normalEdgeStrength.greaterThan(0),()=>{y.assign(m(g,c))});const C=l.greaterThan(0).select(D(1).sub(l.mul(this.depthEdgeStrength)),y.mul(this.normalEdgeStrength).add(1));return p.mul(C)})()}}const Si=(s,t,e,i=6,o=.3,n=.4)=>E(new Ti(rt(s),rt(t),rt(e),E(i),E(o),E(n)));class Mi extends qt{static get type(){return"PixelationPassNode"}constructor(t,e,i=6,o=.3,n=.4){super(qt.COLOR,t,e,{minFilter:Qt,magFilter:Qt}),this.pixelSize=i,this.normalEdgeStrength=o,this.depthEdgeStrength=n,this.isPixelationPassNode=!0,this._mrt=De({output:Le,normal:Re})}setSize(t,e){const i=this.pixelSize.value?this.pixelSize.value:this.pixelSize,o=Math.floor(t/i),n=Math.floor(e/i);super.setSize(o,n)}setup(){const t=super.getTextureNode("output"),e=super.getTextureNode("depth"),i=super.getTextureNode("normal");return Si(t,e,i,this.pixelSize,this.normalEdgeStrength,this.depthEdgeStrength)}}const Ni=(s,t,e,i,o)=>E(new Mi(s,t,e,i,o)),Ai=(s,t)=>{const e=M(5),i=M(.5),o=M(1);return Ni(s,t,e,i,o)},Pi=P(([s])=>{const t=it(s);return S(mt(t,it(.393,.769,.189)),mt(t,it(.349,.686,.168)),mt(t,it(.272,.534,.131)),s.a)});class Di extends lt{static get type(){return"FilmNode"}constructor(t,e=null,i=null){super("vec4"),this.inputNode=t,this.intensityNode=e,this.uvNode=i}setup(){const t=this.uvNode||$();return P(()=>{const o=this.inputNode.rgb,n=Fe(Be(t.add(Ie)));let r=o.add(o.mul(Q(n.add(.1),0,1)));return this.intensityNode!==null&&(r=gt(o,r,this.intensityNode)),S(r,this.inputNode.a)})()}}const Ri=ze(Di),Li=s=>{const t=Pi(s),e=pe(t,.5);return Ri(e)},ki=(s,t,e)=>{const i=new Ve(e),o=je(s,t),n=o.getTextureNode(),r=o.getViewZNode();return i.outputNode=re(n,r),{postprocessing:i,changePostprocess:h=>{switch(h){case"none":i.outputNode=n;break;case"chromatic":i.outputNode=re(n,r);break;case"bloom":i.outputNode=Ei(n);break;case"pixelation":i.outputNode=Ai(s,t);break;case"sepia":i.outputNode=Li(n);break;default:i.outputNode=n;break}i.needsUpdate=!0}}},Bt=new He,ae=[{radius:.6,position:{x:0,y:0,z:0}},{radius:.5,position:{x:.8,y:.1,z:0}},{radius:.7,position:{x:-.7,y:.2,z:0}},{radius:.4,position:{x:.3,y:.3,z:-.2}}],$i=[{radius:1,position:{x:0,y:0,z:0}},{radius:1.2,position:{x:1.4,y:.1,z:0}},{radius:.5,position:{x:-.7,y:.2,z:0}},{radius:.6,position:{x:-.8,y:.3,z:-.2}}];let st=null,ot=null,J=null;const Lt=s=>{const t=new _t;return s.forEach(e=>{const i=new Ft(e.radius,12,12),o=new k(i,Bt);o.position.set(e.position.x,e.position.y,e.position.z),t.add(o)}),t},Oi=()=>{const s=U("day"),t=new _t;return Bt.color.set(s.cloudColor),st=Lt(ae),st.position.set(0,34,-32),st.scale.set(15,10,10),t.add(st),ot=Lt($i),ot.position.set(50,30,-35),ot.scale.set(10,7,7),t.add(ot),J=Lt(ae),J.position.set(-60,20,-40),J.scale.set(20,17,17),J.rotation.y=-Math.PI,t.add(J),{clouds:t,onChangeEffectClouds:i=>{const n=U(i==="bloom"?"night":"day");Bt.color.set(n.cloudColor)}}},zi=s=>{if(!st||!ot||!J)return;const t=s;st.position.y+=Math.sin(t+Math.PI/2)*.009,ot.position.y+=Math.sin(t+Math.PI)*.005,J.position.y+=Math.sin(t)*.008},Fi="#fd7c96",Bi="#fff700";let kt=null;const Ct=new tt({roughness:.9}),It=new tt({roughness:.8}),Et=new tt({roughness:.8}),Ii=new tt({color:Fi,roughness:.8}),Vi=new tt({color:Bi,roughness:.8}),ji=()=>{const s=new _t,t=new Jt(1,8,4),e=new k(t,Ct);e.position.y=8,s.add(e);const i=new Jt(.3,1.6,4),o=new k(i,Ct);o.position.set(-.9,8,0),o.rotation.z=Math.PI/4,s.add(o);const n=new wt(4,0),r=new k(n,It);return r.scale.set(1,.9,1),r.position.y=12,r.rotation.y=Math.PI/12,s.add(r),s},Hi=[{x:-2.6,y:5,z:2.2},{x:-1,y:4.3,z:2.7},{x:-1.5,y:4.8,z:2.7},{x:0,y:5.2,z:1.7}],Ui=[{x:2.5,y:3.5,z:1.16},{x:3.5,y:4,z:1.75},{x:3.2,y:4.2,z:1.7}],Yi=()=>{const s=new _t,t=new wt(2,0),e=new k(t,Et);e.scale.set(1.4,1,1),e.position.set(-1.2,4,1),e.rotation.y=Math.PI/6,s.add(e);for(const n of Hi){const r=new Ft(1,6,6),a=new k(r,Ii);a.scale.set(.2,.2,.2),a.position.set(n.x,n.y,n.z),s.add(a)}const i=new wt(1,0),o=new k(i,Et);o.scale.set(1.4,1,1),o.position.set(3.5,3.5,1),o.rotation.y=-Math.PI/6,s.add(o);for(const n of Ui){const r=new Ft(1,6,6),a=new k(r,Vi);a.scale.set(.12,.12,.12),a.position.set(n.x,n.y,n.z),s.add(a)}return s},Zi=()=>{const s=U("day"),t=new _t,e=new wt(10,0);kt=new tt({color:s.islandColor,roughness:.9});const i=new k(e,kt);i.position.set(0,-5,1),i.scale.set(1.4,1,1),i.rotation.x=Math.PI/5,i.rotation.y=Math.PI,t.add(i),Ct.color.set(s.trunkColor),It.color.set(s.leavesColor),Et.color.set(s.bushesColor);const o=ji();o.position.set(1.6,-1.2,1),t.add(o);const n=Yi();return t.add(n),{island:t,onChangeEffectIsland:a=>{const u=U(a==="bloom"?"night":"day");kt?.color.set(u.islandColor),Ct.color.set(u.trunkColor),It.color.set(u.leavesColor),Et.color.set(u.bushesColor)}}};/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class O{constructor(t,e,i,o,n="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(n),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(o),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),O.nextNameID=O.nextNameID||0,this.$name.id=`lil-gui-name-${++O.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",r=>r.stopPropagation()),this.domElement.addEventListener("keyup",r=>r.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Xi extends O{constructor(t,e,i){super(t,e,i,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Vt(s){let t,e;return(t=s.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=s.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=s.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const Gi={isPrimitive:!0,match:s=>typeof s=="string",fromHexString:Vt,toHexString:Vt},ft={isPrimitive:!0,match:s=>typeof s=="number",fromHexString:s=>parseInt(s.substring(1),16),toHexString:s=>"#"+s.toString(16).padStart(6,0)},Ki={isPrimitive:!1,match:s=>Array.isArray(s)||ArrayBuffer.isView(s),fromHexString(s,t,e=1){const i=ft.fromHexString(s);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(i&255)/255*e},toHexString([s,t,e],i=1){i=255/i;const o=s*i<<16^t*i<<8^e*i<<0;return ft.toHexString(o)}},Wi={isPrimitive:!1,match:s=>Object(s)===s,fromHexString(s,t,e=1){const i=ft.fromHexString(s);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(i&255)/255*e},toHexString({r:s,g:t,b:e},i=1){i=255/i;const o=s*i<<16^t*i<<8^e*i<<0;return ft.toHexString(o)}},qi=[Gi,ft,Ki,Wi];function Qi(s){return qi.find(t=>t.match(s))}class Ji extends O{constructor(t,e,i,o){super(t,e,i,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Qi(this.initialValue),this._rgbScale=o,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const n=Vt(this.$text.value);n&&this._setValueFromHexString(n)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class $t extends O{constructor(t,e,i){super(t,e,i,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",o=>{o.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class ts extends O{constructor(t,e,i,o,n,r){super(t,e,i,"lil-number"),this._initInput(),this.min(o),this.max(n);const a=r!==void 0;this.step(a?r:this._getImplicitStep(),a),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let l=parseFloat(this.$input.value);isNaN(l)||(this._stepExplicit&&(l=this._snap(l)),this.setValue(this._clamp(l)))},i=l=>{const y=parseFloat(this.$input.value);isNaN(y)||(this._snapClampSetValue(y+l),this.$input.value=this.getValue())},o=l=>{l.key==="Enter"&&this.$input.blur(),l.code==="ArrowUp"&&(l.preventDefault(),i(this._step*this._arrowKeyMultiplier(l))),l.code==="ArrowDown"&&(l.preventDefault(),i(this._step*this._arrowKeyMultiplier(l)*-1))},n=l=>{this._inputFocused&&(l.preventDefault(),i(this._step*this._normalizeMouseWheel(l)))};let r=!1,a,h,u,d,_;const m=5,f=l=>{a=l.clientX,h=u=l.clientY,r=!0,d=this.getValue(),_=0,window.addEventListener("mousemove",b),window.addEventListener("mouseup",p)},b=l=>{if(r){const y=l.clientX-a,C=l.clientY-h;Math.abs(C)>m?(l.preventDefault(),this.$input.blur(),r=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(y)>m&&p()}if(!r){const y=l.clientY-u;_-=y*this._step*this._arrowKeyMultiplier(l),d+_>this._max?_=this._max-d:d+_<this._min&&(_=this._min-d),this._snapClampSetValue(d+_)}u=l.clientY},p=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",p)},g=()=>{this._inputFocused=!0},c=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",o),this.$input.addEventListener("wheel",n,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",g),this.$input.addEventListener("blur",c)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(c,l,y,C,z)=>(c-l)/(y-l)*(z-C)+C,e=c=>{const l=this.$slider.getBoundingClientRect();let y=t(c,l.left,l.right,this._min,this._max);this._snapClampSetValue(y)},i=c=>{this._setDraggingStyle(!0),e(c.clientX),window.addEventListener("mousemove",o),window.addEventListener("mouseup",n)},o=c=>{e(c.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",n)};let r=!1,a,h;const u=c=>{c.preventDefault(),this._setDraggingStyle(!0),e(c.touches[0].clientX),r=!1},d=c=>{c.touches.length>1||(this._hasScrollBar?(a=c.touches[0].clientX,h=c.touches[0].clientY,r=!0):u(c),window.addEventListener("touchmove",_,{passive:!1}),window.addEventListener("touchend",m))},_=c=>{if(r){const l=c.touches[0].clientX-a,y=c.touches[0].clientY-h;Math.abs(l)>Math.abs(y)?u(c):(window.removeEventListener("touchmove",_),window.removeEventListener("touchend",m))}else c.preventDefault(),e(c.touches[0].clientX)},m=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",_),window.removeEventListener("touchend",m)},f=this._callOnFinishChange.bind(this),b=400;let p;const g=c=>{if(Math.abs(c.deltaX)<Math.abs(c.deltaY)&&this._hasScrollBar)return;c.preventDefault();const y=this._normalizeMouseWheel(c)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(p),p=setTimeout(f,b)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",g,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class es extends O{constructor(t,e,i,o){super(t,e,i,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(o)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const i=document.createElement("option");i.textContent=e,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class is extends O{constructor(t,e,i){super(t,e,i,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",o=>{o.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var ss=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function os(s){const t=document.createElement("style");t.innerHTML=s;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let le=!1;class Ut{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:o,title:n="Controls",closeFolders:r=!1,injectStyles:a=!0,touchStyles:h=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(n),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!le&&a&&(os(ss),le=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),o&&this.domElement.style.setProperty("--width",o+"px"),this._closeFolders=r}add(t,e,i,o,n){if(Object(i)===i)return new es(this,t,e,i);const r=t[e];switch(typeof r){case"number":return new ts(this,t,e,i,o,n);case"boolean":return new Xi(this,t,e);case"string":return new is(this,t,e);case"function":return new $t(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,r)}addColor(t,e,i=1){return new Ji(this,t,e,i)}addFolder(t){const e=new Ut({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof $t||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof $t)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("lil-transition");const i=n=>{n.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const o=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=o+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}const ns=new Ut,rs=["none","chromatic","bloom","pixelation","sepia"],as=s=>{const{scene:t,camera:e,renderer:i,onChangeEffectScene:o}=ri(s),n=ui();t.add(n);const{clouds:r,onChangeEffectClouds:a}=Oi();t.add(r);const{island:h,onChangeEffectIsland:u}=Zi();t.add(h);const{postprocessing:d,changePostprocess:_}=ki(t,e,i);ls([_,o,u,a]);const m=new Ue,f=async()=>{await d.renderAsync();const b=m.getElapsedTime();pi(b),zi(b),requestAnimationFrame(f)};f(),window.addEventListener("resize",()=>ai(e,i))},ls=s=>{ns.addFolder("Postprocessing").add({effect:"chromatic"},"effect",rs).name("Effect").onChange(e=>{for(const i of s)i(e)})},hs=()=>{const s=document.querySelector("#app");s&&as(s)};document.addEventListener("DOMContentLoaded",hs);
