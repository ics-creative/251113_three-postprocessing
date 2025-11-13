import{C as ii,V as L,M as mt,T as ct,Q as De,S as Re,a as E,R as si,P as oi,b as ni,c as ri,d as ke,e as ai,W as li,A as hi,D as de,F as ci,f as di,g as ht,h as U,n as D,i as gt,j as _t,N as ui,u as O,k as Y,l as B,m as j,v as $,o as H,p as Xe,q as Gt,r as ft,s as Se,t as Vt,w as G,x as pi,y as mi,z as Le,H as X,B as I,E as J,G as gi,I as Ht,J as we,K as Rt,L as dt,O as ve,U as fi,X as $e,Y as Lt,Z as _i,_ as Oe,$ as bi,a0 as ze,a1 as Fe,a2 as yi,a3 as xi,a4 as wi,a5 as vi,a6 as ue,a7 as at,a8 as Ci,a9 as kt,aa as Ei,ab as Ti,ac as Mi,ad as Si,ae as Ni,af as Ai,ag as Pi,ah as Di,ai as Ot,aj as Ce,ak as Ut,al as Be,am as Ri}from"./three.tsl-DEd_xDPd.js";/* empty css              */const je={type:"change"},Ne={type:"start"},Ge={type:"end"},It=new si,Ie=new oi,ki=Math.cos(70*ni.DEG2RAD),N=new L,z=2*Math.PI,w={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pe=1e-6;class Li extends ii{constructor(t,e=null){super(t,e),this.state=w.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:mt.ROTATE,MIDDLE:mt.DOLLY,RIGHT:mt.PAN},this.touches={ONE:ct.ROTATE,TWO:ct.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new De,this._lastTargetPosition=new L,this._quat=new De().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Re,this._sphericalDelta=new Re,this._scale=1,this._panOffset=new L,this._rotateStart=new E,this._rotateEnd=new E,this._rotateDelta=new E,this._panStart=new E,this._panEnd=new E,this._panDelta=new E,this._dollyStart=new E,this._dollyEnd=new E,this._dollyDelta=new E,this._dollyDirection=new L,this._mouse=new E,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Oi.bind(this),this._onPointerDown=$i.bind(this),this._onPointerUp=zi.bind(this),this._onContextMenu=Ui.bind(this),this._onMouseWheel=ji.bind(this),this._onKeyDown=Ii.bind(this),this._onTouchStart=Vi.bind(this),this._onTouchMove=Hi.bind(this),this._onMouseDown=Fi.bind(this),this._onMouseMove=Bi.bind(this),this._interceptControlDown=Yi.bind(this),this._interceptControlUp=Zi.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(je),this.update(),this.state=w.NONE}update(t=null){const e=this.object.position;N.copy(e).sub(this.target),N.applyQuaternion(this._quat),this._spherical.setFromVector3(N),this.autoRotate&&this.state===w.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=z:i>Math.PI&&(i-=z),s<-Math.PI?s+=z:s>Math.PI&&(s-=z),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let n=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),n=r!=this._spherical.radius}if(N.setFromSpherical(this._spherical),N.applyQuaternion(this._quatInverse),e.copy(this.target).add(N),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const a=N.length();r=this._clampDistance(a*this._scale);const c=a-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),n=!!c}else if(this.object.isOrthographicCamera){const a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),n=c!==this.object.zoom;const h=new L(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(a),this.object.updateMatrixWorld(),r=N.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(It.origin.copy(this.object.position),It.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(It.direction))<ki?this.object.lookAt(this.target):(Ie.setFromNormalAndCoplanarPoint(this.object.up,this.target),It.intersectPlane(Ie,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),n=!0)}return this._scale=1,this._performCursorZoom=!1,n||this._lastPosition.distanceToSquared(this.object.position)>pe||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pe||this._lastTargetPosition.distanceToSquared(this.target)>pe?(this.dispatchEvent(je),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?z/60*this.autoRotateSpeed*t:z/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){N.setFromMatrixColumn(e,0),N.multiplyScalar(-t),this._panOffset.add(N)}_panUp(t,e){this.screenSpacePanning===!0?N.setFromMatrixColumn(e,1):(N.setFromMatrixColumn(e,0),N.crossVectors(this.object.up,N)),N.multiplyScalar(t),this._panOffset.add(N)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;N.copy(s).sub(this.target);let n=N.length();n*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*n/i.clientHeight,this.object.matrix),this._panUp(2*e*n/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,n=e-i.top,r=i.width,a=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(n/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(z*this._rotateDelta.x/e.clientHeight),this._rotateUp(z*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(z*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-z*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(z*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-z*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,n=Math.sqrt(i*i+s*s);this._dollyStart.set(0,n)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),n=.5*(t.pageY+i.y);this._rotateEnd.set(s,n)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(z*this._rotateDelta.x/e.clientHeight),this._rotateUp(z*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,n=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,n),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(r,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new E,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function $i(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function Oi(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function zi(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ge),this.state=w.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Fi(o){let t;switch(o.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=w.DOLLY;break;case mt.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=w.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=w.ROTATE}break;case mt.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=w.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=w.PAN}break;default:this.state=w.NONE}this.state!==w.NONE&&this.dispatchEvent(Ne)}function Bi(o){switch(this.state){case w.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case w.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case w.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function ji(o){this.enabled===!1||this.enableZoom===!1||this.state!==w.NONE||(o.preventDefault(),this.dispatchEvent(Ne),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Ge))}function Ii(o){this.enabled!==!1&&this._handleKeyDown(o)}function Vi(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case ct.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=w.TOUCH_ROTATE;break;case ct.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=w.TOUCH_PAN;break;default:this.state=w.NONE}break;case 2:switch(this.touches.TWO){case ct.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=w.TOUCH_DOLLY_PAN;break;case ct.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=w.TOUCH_DOLLY_ROTATE;break;default:this.state=w.NONE}break;default:this.state=w.NONE}this.state!==w.NONE&&this.dispatchEvent(Ne)}function Hi(o){switch(this._trackPointer(o),this.state){case w.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case w.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case w.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case w.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=w.NONE}}function Ui(o){this.enabled!==!1&&o.preventDefault()}function Yi(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Zi(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Xi{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(t,e){let i,s,n;const r=.5*(Math.sqrt(3)-1),a=(t+e)*r,c=Math.floor(t+a),h=Math.floor(e+a),d=(3-Math.sqrt(3))/6,y=(c+h)*d,g=c-y,m=h-y,_=t-g,p=e-m;let f,u;_>p?(f=1,u=0):(f=0,u=1);const l=_-f+d,b=p-u+d,x=_-1+2*d,S=p-1+2*d,A=c&255,P=h&255,R=this.perm[A+this.perm[P]]%12,v=this.perm[A+f+this.perm[P+u]]%12,C=this.perm[A+1+this.perm[P+1]]%12;let T=.5-_*_-p*p;T<0?i=0:(T*=T,i=T*T*this._dot(this.grad3[R],_,p));let M=.5-l*l-b*b;M<0?s=0:(M*=M,s=M*M*this._dot(this.grad3[v],l,b));let V=.5-x*x-S*S;return V<0?n=0:(V*=V,n=V*V*this._dot(this.grad3[C],x,S)),70*(i+s+n)}noise3d(t,e,i){let s,n,r,a;const h=(t+e+i)*.3333333333333333,d=Math.floor(t+h),y=Math.floor(e+h),g=Math.floor(i+h),m=1/6,_=(d+y+g)*m,p=d-_,f=y-_,u=g-_,l=t-p,b=e-f,x=i-u;let S,A,P,R,v,C;l>=b?b>=x?(S=1,A=0,P=0,R=1,v=1,C=0):l>=x?(S=1,A=0,P=0,R=1,v=0,C=1):(S=0,A=0,P=1,R=1,v=0,C=1):b<x?(S=0,A=0,P=1,R=0,v=1,C=1):l<x?(S=0,A=1,P=0,R=0,v=1,C=1):(S=0,A=1,P=0,R=1,v=1,C=0);const T=l-S+m,M=b-A+m,V=x-P+m,bt=l-R+2*m,yt=b-v+2*m,xt=x-C+2*m,wt=l-1+3*m,vt=b-1+3*m,k=x-1+3*m,st=d&255,ot=y&255,nt=g&255,zt=this.perm[st+this.perm[ot+this.perm[nt]]]%12,Ft=this.perm[st+S+this.perm[ot+A+this.perm[nt+P]]]%12,Bt=this.perm[st+R+this.perm[ot+v+this.perm[nt+C]]]%12,jt=this.perm[st+1+this.perm[ot+1+this.perm[nt+1]]]%12;let K=.6-l*l-b*b-x*x;K<0?s=0:(K*=K,s=K*K*this._dot3(this.grad3[zt],l,b,x));let q=.6-T*T-M*M-V*V;q<0?n=0:(q*=q,n=q*q*this._dot3(this.grad3[Ft],T,M,V));let W=.6-bt*bt-yt*yt-xt*xt;W<0?r=0:(W*=W,r=W*W*this._dot3(this.grad3[Bt],bt,yt,xt));let Q=.6-wt*wt-vt*vt-k*k;return Q<0?a=0:(Q*=Q,a=Q*Q*this._dot3(this.grad3[jt],wt,vt,k)),32*(s+n+r+a)}noise4d(t,e,i,s){const n=this.grad4,r=this.simplex,a=this.perm,c=(Math.sqrt(5)-1)/4,h=(5-Math.sqrt(5))/20;let d,y,g,m,_;const p=(t+e+i+s)*c,f=Math.floor(t+p),u=Math.floor(e+p),l=Math.floor(i+p),b=Math.floor(s+p),x=(f+u+l+b)*h,S=f-x,A=u-x,P=l-x,R=b-x,v=t-S,C=e-A,T=i-P,M=s-R,V=v>C?32:0,bt=v>T?16:0,yt=C>T?8:0,xt=v>M?4:0,wt=C>M?2:0,vt=T>M?1:0,k=V+bt+yt+xt+wt+vt,st=r[k][0]>=3?1:0,ot=r[k][1]>=3?1:0,nt=r[k][2]>=3?1:0,zt=r[k][3]>=3?1:0,Ft=r[k][0]>=2?1:0,Bt=r[k][1]>=2?1:0,jt=r[k][2]>=2?1:0,K=r[k][3]>=2?1:0,q=r[k][0]>=1?1:0,W=r[k][1]>=1?1:0,Q=r[k][2]>=1?1:0,Pe=r[k][3]>=1?1:0,Kt=v-st+h,qt=C-ot+h,Wt=T-nt+h,Qt=M-zt+h,Jt=v-Ft+2*h,te=C-Bt+2*h,ee=T-jt+2*h,ie=M-K+2*h,se=v-q+3*h,oe=C-W+3*h,ne=T-Q+3*h,re=M-Pe+3*h,ae=v-1+4*h,le=C-1+4*h,he=T-1+4*h,ce=M-1+4*h,Ct=f&255,Et=u&255,Tt=l&255,Mt=b&255,We=a[Ct+a[Et+a[Tt+a[Mt]]]]%32,Qe=a[Ct+st+a[Et+ot+a[Tt+nt+a[Mt+zt]]]]%32,Je=a[Ct+Ft+a[Et+Bt+a[Tt+jt+a[Mt+K]]]]%32,ti=a[Ct+q+a[Et+W+a[Tt+Q+a[Mt+Pe]]]]%32,ei=a[Ct+1+a[Et+1+a[Tt+1+a[Mt+1]]]]%32;let St=.6-v*v-C*C-T*T-M*M;St<0?d=0:(St*=St,d=St*St*this._dot4(n[We],v,C,T,M));let Nt=.6-Kt*Kt-qt*qt-Wt*Wt-Qt*Qt;Nt<0?y=0:(Nt*=Nt,y=Nt*Nt*this._dot4(n[Qe],Kt,qt,Wt,Qt));let At=.6-Jt*Jt-te*te-ee*ee-ie*ie;At<0?g=0:(At*=At,g=At*At*this._dot4(n[Je],Jt,te,ee,ie));let Pt=.6-se*se-oe*oe-ne*ne-re*re;Pt<0?m=0:(Pt*=Pt,m=Pt*Pt*this._dot4(n[ti],se,oe,ne,re));let Dt=.6-ae*ae-le*le-he*he-ce*ce;return Dt<0?_=0:(Dt*=Dt,_=Dt*Dt*this._dot4(n[ei],ae,le,he,ce)),27*(d+y+g+m+_)}_dot(t,e,i){return t[0]*e+t[1]*i}_dot3(t,e,i,s){return t[0]*e+t[1]*i+t[2]*s}_dot4(t,e,i,s,n){return t[0]*e+t[1]*i+t[2]*s+t[3]*n}}const it=o=>o==="day"?{backgroundColor:"#87ceeb",ambientLightIntensity:1,dirLight1Intensity:1,dirLight2Intensity:1,dirLight3Intensity:1,cloudColor:"#ffffff",islandColor:"#a59f83",leavesColor:"#86b964",trunkColor:"#b38f75",bushesColor:"#558038"}:{backgroundColor:"#10465b",ambientLightIntensity:.2,dirLight1Intensity:.5,dirLight2Intensity:.5,dirLight3Intensity:.5,cloudColor:"#545454",islandColor:"#565243",leavesColor:"#3c542b",trunkColor:"#6a5444",bushesColor:"#344d23"},Ve={fogNear:18,fogFar:70},Gi=o=>{const t=it("day"),e=new hi(16777215,t.ambientLightIntensity);o.add(e);const i=new de(16777215,t.dirLight1Intensity);i.position.set(5,15,15);const s=new de(16777215,t.dirLight2Intensity);s.position.set(-5,15,10);const n=new de(16777215,t.dirLight3Intensity);return n.position.set(0,15,10),n.lookAt(0,0,10),{ambientLight:e,directionalLight1:i,directionalLight2:s,directionalLight3:n}},He=o=>{const t=it(o);return{fog:new ci(t.backgroundColor,Ve.fogNear,Ve.fogFar)}},Ki=async o=>{const t=it("day"),e=new ri;e.background=new ke(t.backgroundColor);const{ambientLight:i,directionalLight1:s,directionalLight2:n,directionalLight3:r}=Gi(e);e.add(i,s,n,r);const{fog:a}=He("day");e.fog=a;const c=new ai(75,window.innerWidth/window.innerHeight,.1,1e3);c.position.set(0,8,30);const h=new li({antialias:!0});await h.init(),h.setSize(window.innerWidth,window.innerHeight),h.setPixelRatio(window.devicePixelRatio),o.appendChild(h.domElement);const d=new Li(c,h.domElement);return d.target.set(0,4,0),d.update(),{scene:e,camera:c,renderer:h,onChangeEffectScene:g=>{const m=g==="bloom"?"night":"day",_=it(m),{fog:p}=He(m);e.fog=p,e.background=new ke(_.backgroundColor),i.intensity=_.ambientLightIntensity,s.intensity=_.dirLight1Intensity,n.intensity=_.dirLight2Intensity,r.intensity=_.dirLight3Intensity}}},qi=(o,t)=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight)},Ke=new Xi,tt={color:"#52ebff",frequency:.09,amplitude:.75,waveSpeed:.2,waveAmplitude:.4};let et=null,Yt=[];const Wi=()=>{if(!et)return;const o=et.getAttribute("position");Yt=[];for(let t=0;t<o.count;t++){const e=o.getX(t),i=o.getY(t),n=Ke.noise(e*tt.frequency,i*tt.frequency)*tt.amplitude;o.setZ(t,n),Yt.push(n)}o.needsUpdate=!0,et.computeVertexNormals()},Qi=()=>{et=new di(120,60,64,64);const o=new ht({color:tt.color,metalness:1});Wi();const t=new U(et,o);return t.rotation.x=-Math.PI/2,t.position.y=0,t.receiveShadow=!0,t},Ji=o=>{if(!et||Yt.length===0)return;const t=et.getAttribute("position"),e=o*tt.waveSpeed;for(let i=0;i<t.count;i++){const s=t.getX(i),n=t.getY(i),r=Yt[i],c=Ke.noise(s*tt.frequency+e,n*tt.frequency+e)*tt.waveAmplitude;t.setZ(i,r+c)}t.needsUpdate=!0,et.computeVertexNormals()};class ts extends _t{static get type(){return"ChromaticAberrationNode"}constructor(t,e,i,s){super("vec4"),this.textureNode=t,this.updateBeforeType=ui.FRAME,this.strengthNode=e,this.centerNode=i,this.scaleNode=s,this._invSize=O(new E)}updateBefore(){const t=this.textureNode.value;this._invSize.value.set(1/t.image.width,1/t.image.height)}setup(){const t=this.textureNode,e=t.uvNode||Y(),i=B(([r,a,c,h])=>{const d=r.sub(c),y=d.length(),g=j(1).add(h.mul(.02).mul(a)),m=j(1),_=j(1).sub(h.mul(.02).mul(a)),p=a.mul(y),f=c.add(d.mul(g)),u=c.add(d.mul(m)),l=c.add(d.mul(_)),b=d.mul(p).mul(j(.01)),x=d.mul(p).mul(j(0)),S=d.mul(p).mul(j(-.01)),A=f.add(b),P=u.add(x),R=l.add(S),v=t.sample(A).r,C=t.sample(P).g,T=t.sample(R).b,M=t.sample(r).a;return $(v,C,T,M)}).setLayout({name:"ChromaticAberrationShader",type:"vec4",inputs:[{name:"uv",type:"vec2"},{name:"strength",type:"float"},{name:"center",type:"vec2"},{name:"scale",type:"float"},{name:"invSize",type:"vec2"}]});return B(()=>i(e,this.strengthNode,this.centerNode,this.scaleNode,this._invSize))()}}const es=(o,t=1,e=null,i=1.1)=>D(new ts(gt(o),D(t),D(e),D(i))),me=new Se;let ge;class is extends _t{static get type(){return"GaussianBlurNode"}constructor(t,e=null,i=4,s={}){super("vec4"),this.textureNode=t,this.directionNode=e,this.sigma=i,this._invSize=O(new E),this._passDirection=O(new E),this._horizontalRT=new H(1,1,{depthBuffer:!1}),this._horizontalRT.texture.name="GaussianBlurNode.horizontal",this._verticalRT=new H(1,1,{depthBuffer:!1}),this._verticalRT.texture.name="GaussianBlurNode.vertical",this._textureNode=Xe(this,this._verticalRT.texture),this._textureNode.uvNode=t.uvNode,this.updateBeforeType=Gt.FRAME,this.resolutionScale=s.resolutionScale||1,this.premultipliedAlpha=s.premultipliedAlpha||!1}setSize(t,e){t=Math.max(Math.round(t*this.resolutionScale),1),e=Math.max(Math.round(e*this.resolutionScale),1),this._invSize.value.set(1/t,1/e),this._horizontalRT.setSize(t,e),this._verticalRT.setSize(t,e)}updateBefore(t){const{renderer:e}=t;ge=ft.resetRendererState(e,ge);const i=this.textureNode,s=i.value,n=i.value;me.material=this._material,this.setSize(s.image.width,s.image.height);const r=s.type;this._horizontalRT.texture.type=r,this._verticalRT.texture.type=r,e.setRenderTarget(this._horizontalRT),this._passDirection.value.set(1,0),me.render(e),i.value=this._horizontalRT.texture,e.setRenderTarget(this._verticalRT),this._passDirection.value.set(0,1),me.render(e),i.value=n,ft.restoreRendererState(e,ge)}getTextureNode(){return this._textureNode}setup(t){const e=this.textureNode,i=Y(),s=Vt(this.directionNode||1);let n,r;this.premultipliedAlpha?(n=d=>pi(e.sample(d)),r=d=>mi(d)):(n=d=>e.sample(d),r=d=>d);const a=B(()=>{const d=3+2*this.sigma,y=this._getCoefficients(d),g=this._invSize,m=s.mul(this._passDirection),_=$(n(i).mul(y[0])).toVar();for(let p=1;p<d;p++){const f=j(p),u=j(y[p]),l=Vt(m.mul(g.mul(f))).toVar(),b=n(i.add(l)),x=n(i.sub(l));_.addAssign(b.add(x).mul(u))}return r(_)}),c=this._material||(this._material=new G);c.fragmentNode=a().context(t.getSharedContext()),c.name="Gaussian_blur",c.needsUpdate=!0;const h=t.getNodeProperties(this);return h.textureNode=e,this._textureNode}dispose(){this._horizontalRT.dispose(),this._verticalRT.dispose()}_getCoefficients(t){const e=[],i=t/3;for(let s=0;s<t;s++)e.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return e}get resolution(){return console.warn('THREE.GaussianBlurNode: The "resolution" property has been renamed to "resolutionScale" and is now of type `number`.'),new E(this.resolutionScale,this.resolutionScale)}set resolution(t){console.warn('THREE.GaussianBlurNode: The "resolution" property has been renamed to "resolutionScale" and is now of type `number`.'),this.resolutionScale=t.x}}const qe=(o,t,e,i={})=>D(new is(gt(o),t,e,i)),F=new Se;let fe;class ss extends _t{static get type(){return"DepthOfFieldNode"}constructor(t,e,i,s,n){super("vec4"),this.textureNode=t,this.viewZNode=e,this.focusDistanceNode=i,this.focalLengthNode=s,this.bokehScaleNode=n,this._invSize=O(new E),this._CoCRT=new H(1,1,{depthBuffer:!1,type:X,format:Le,count:2}),this._CoCRT.textures[0].name="DepthOfField.NearField",this._CoCRT.textures[1].name="DepthOfField.FarField",this._CoCBlurredRT=new H(1,1,{depthBuffer:!1,type:X,format:Le}),this._CoCBlurredRT.texture.name="DepthOfField.NearFieldBlurred",this._blur64RT=new H(1,1,{depthBuffer:!1,type:X}),this._blur64RT.texture.name="DepthOfField.Blur64",this._blur16NearRT=new H(1,1,{depthBuffer:!1,type:X}),this._blur16NearRT.texture.name="DepthOfField.Blur16Near",this._blur16FarRT=new H(1,1,{depthBuffer:!1,type:X}),this._blur16FarRT.texture.name="DepthOfField.Blur16Far",this._compositeRT=new H(1,1,{depthBuffer:!1,type:X}),this._compositeRT.texture.name="DepthOfField.Composite",this._CoCMaterial=new G,this._CoCBlurredMaterial=new G,this._blur64Material=new G,this._blur16Material=new G,this._compositeMaterial=new G,this._textureNode=I(this._compositeRT.texture),this._CoCTextureNode=I(this._CoCRT.texture),this._blur64TextureNode=I(this._blur64RT.texture),this._blur16NearTextureNode=I(this._blur16NearRT.texture),this._blur16FarTextureNode=I(this._blur16FarRT.texture),this.updateBeforeType=Gt.FRAME}setSize(t,e){this._invSize.value.set(1/t,1/e),this._CoCRT.setSize(t,e),this._compositeRT.setSize(t,e);const i=Math.round(t/2),s=Math.round(e/2);this._CoCBlurredRT.setSize(i,s),this._blur64RT.setSize(i,s),this._blur16NearRT.setSize(i,s),this._blur16FarRT.setSize(i,s)}getTextureNode(){return this._textureNode}updateBefore(t){const{renderer:e}=t,i=this.textureNode.value;this.setSize(i.image.width,i.image.height),fe=ft.resetRendererState(e,fe),e.setClearColor(0,0),F.material=this._CoCMaterial,e.setRenderTarget(this._CoCRT),F.render(e),this._CoCTextureNode.value=this._CoCRT.textures[0],F.material=this._CoCBlurredMaterial,e.setRenderTarget(this._CoCBlurredRT),F.render(e),this._CoCTextureNode.value=this._CoCBlurredRT.texture,F.material=this._blur64Material,e.setRenderTarget(this._blur64RT),F.render(e),F.material=this._blur16Material,e.setRenderTarget(this._blur16NearRT),F.render(e),this._CoCTextureNode.value=this._CoCRT.textures[1],F.material=this._blur64Material,e.setRenderTarget(this._blur64RT),F.render(e),F.material=this._blur16Material,e.setRenderTarget(this._blur16FarRT),F.render(e),F.material=this._compositeMaterial,e.setRenderTarget(this._compositeRT),F.render(e),ft.restoreRendererState(e,fe)}setup(t){const e=this._generateKernels(),i=J("float"),s=J("float"),n=gi(i,s),r=B(()=>{const g=this.viewZNode.negate().sub(this.focusDistanceNode),m=Ht(0,this.focalLengthNode,g.abs());return i.assign(we(g,0).mul(m)),s.assign(we(0,g).mul(m)),$(0)});this._CoCMaterial.colorNode=r().context(t.getSharedContext()),this._CoCMaterial.outputNode=n,this._CoCMaterial.needsUpdate=!0,this._CoCBlurredMaterial.colorNode=qe(this._CoCTextureNode,1,2),this._CoCBlurredMaterial.needsUpdate=!0;const a=Rt(e.points64),c=B(()=>{const g=dt(),m=Y(),_=this._CoCTextureNode.sample(m).r,p=this._invSize.mul(this.bokehScaleNode).mul(_);return ve(64,({i:f})=>{const u=m.add(p.mul(a.element(f))),l=this.textureNode.sample(u);g.addAssign(l.rgb)}),g.divAssign(64),$(g,_)});this._blur64Material.fragmentNode=c().context(t.getSharedContext()),this._blur64Material.needsUpdate=!0;const h=Rt(e.points16),d=B(()=>{const g=Y(),m=this._blur64TextureNode.sample(g).toVar(),_=m.rgb,p=m.a,f=this._invSize.mul(this.bokehScaleNode).mul(p);return ve(16,({i:u})=>{const l=g.add(f.mul(h.element(u))),b=this._blur64TextureNode.sample(l);_.assign(fi(b.rgb,_))}),$(_,p)});this._blur16Material.fragmentNode=d().context(t.getSharedContext()),this._blur16Material.needsUpdate=!0;const y=B(()=>{const g=Y(),m=this._blur16NearTextureNode.sample(g),_=this._blur16FarTextureNode.sample(g),p=this.textureNode.sample(g),f=$e(m.a,.5).mul(2),u=$e(_.a,.5).mul(2),l=$(0,0,0,1).toVar();return l.rgb=Lt(p.rgb,_.rgb,u),l.rgb=Lt(l.rgb,m.rgb,f),l});return this._compositeMaterial.fragmentNode=y().context(t.getSharedContext()),this._compositeMaterial.needsUpdate=!0,this._textureNode}_generateKernels(){const t=2.39996323,e=80,i=[],s=[];let n=0,r=0;for(let a=0;a<e;a++){const c=a*t,h=Math.sqrt(a)/Math.sqrt(e),d=new E(h*Math.cos(c),h*Math.sin(c));a%5===0?(s[r]=d,r++):(i[n]=d,n++)}return{points16:s,points64:i}}dispose(){this._CoCRT.dispose(),this._CoCBlurredRT.dispose(),this._blur64RT.dispose(),this._blur16NearRT.dispose(),this._blur16FarRT.dispose(),this._compositeRT.dispose(),this._CoCMaterial.dispose(),this._CoCBlurredMaterial.dispose(),this._blur64Material.dispose(),this._blur16Material.dispose(),this._compositeMaterial.dispose()}}const os=(o,t,e=1,i=1,s=1)=>D(new ss(gt(o),D(t),D(e),D(i),D(s))),Ue=(o,t)=>{const e=new E(.4,.4),i=O(e),s=es(o,j(.2),i);return os(s,t)},rt=new Se,ns=new E,rs=new E(1,0),as=new E(0,1);let _e;class ls extends _t{static get type(){return"BloomNode"}constructor(t,e=1,i=0,s=0){super("vec4"),this.inputNode=t,this.strength=O(e),this.radius=O(i),this.threshold=O(s),this.smoothWidth=O(.01),this._renderTargetsHorizontal=[],this._renderTargetsVertical=[],this._nMips=5,this._renderTargetBright=new H(1,1,{depthBuffer:!1,type:X}),this._renderTargetBright.texture.name="UnrealBloomPass.bright",this._renderTargetBright.texture.generateMipmaps=!1;for(let n=0;n<this._nMips;n++){const r=new H(1,1,{depthBuffer:!1,type:X});r.texture.name="UnrealBloomPass.h"+n,r.texture.generateMipmaps=!1,this._renderTargetsHorizontal.push(r);const a=new H(1,1,{depthBuffer:!1,type:X});a.texture.name="UnrealBloomPass.v"+n,a.texture.generateMipmaps=!1,this._renderTargetsVertical.push(a)}this._compositeMaterial=null,this._highPassFilterMaterial=null,this._separableBlurMaterials=[],this._textureNodeBright=I(this._renderTargetBright.texture),this._textureNodeBlur0=I(this._renderTargetsVertical[0].texture),this._textureNodeBlur1=I(this._renderTargetsVertical[1].texture),this._textureNodeBlur2=I(this._renderTargetsVertical[2].texture),this._textureNodeBlur3=I(this._renderTargetsVertical[3].texture),this._textureNodeBlur4=I(this._renderTargetsVertical[4].texture),this._textureOutput=Xe(this,this._renderTargetsHorizontal[0].texture),this.updateBeforeType=Gt.FRAME}getTextureNode(){return this._textureOutput}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this._renderTargetBright.setSize(i,s);for(let n=0;n<this._nMips;n++)this._renderTargetsHorizontal[n].setSize(i,s),this._renderTargetsVertical[n].setSize(i,s),this._separableBlurMaterials[n].invSize.value.set(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}updateBefore(t){const{renderer:e}=t;_e=ft.resetRendererState(e,_e);const i=e.getDrawingBufferSize(ns);this.setSize(i.width,i.height),e.setRenderTarget(this._renderTargetBright),rt.material=this._highPassFilterMaterial,rt.render(e);let s=this._renderTargetBright;for(let n=0;n<this._nMips;n++)rt.material=this._separableBlurMaterials[n],this._separableBlurMaterials[n].colorTexture.value=s.texture,this._separableBlurMaterials[n].direction.value=rs,e.setRenderTarget(this._renderTargetsHorizontal[n]),rt.render(e),this._separableBlurMaterials[n].colorTexture.value=this._renderTargetsHorizontal[n].texture,this._separableBlurMaterials[n].direction.value=as,e.setRenderTarget(this._renderTargetsVertical[n]),rt.render(e),s=this._renderTargetsVertical[n];e.setRenderTarget(this._renderTargetsHorizontal[0]),rt.material=this._compositeMaterial,rt.render(e),ft.restoreRendererState(e,_e)}setup(t){const e=B(()=>{const c=this.inputNode,h=_i(c.rgb),d=Ht(this.threshold,this.threshold.add(this.smoothWidth),h);return Lt($(0),c,d)});this._highPassFilterMaterial=this._highPassFilterMaterial||new G,this._highPassFilterMaterial.fragmentNode=e().context(t.getSharedContext()),this._highPassFilterMaterial.name="Bloom_highPass",this._highPassFilterMaterial.needsUpdate=!0;const i=[6,10,14,18,22];for(let c=0;c<this._nMips;c++)this._separableBlurMaterials.push(this._getSeparableBlurMaterial(t,i[c]));const s=Rt([1,.8,.6,.4,.2]),n=Rt([new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)]),r=B(([c,h])=>{const d=j(1.2).sub(c);return Lt(c,d,h)}).setLayout({name:"lerpBloomFactor",type:"float",inputs:[{name:"factor",type:"float"},{name:"radius",type:"float"}]}),a=B(()=>{const c=r(s.element(0),this.radius).mul($(n.element(0),1)).mul(this._textureNodeBlur0),h=r(s.element(1),this.radius).mul($(n.element(1),1)).mul(this._textureNodeBlur1),d=r(s.element(2),this.radius).mul($(n.element(2),1)).mul(this._textureNodeBlur2),y=r(s.element(3),this.radius).mul($(n.element(3),1)).mul(this._textureNodeBlur3),g=r(s.element(4),this.radius).mul($(n.element(4),1)).mul(this._textureNodeBlur4);return c.add(h).add(d).add(y).add(g).mul(this.strength)});return this._compositeMaterial=this._compositeMaterial||new G,this._compositeMaterial.fragmentNode=a().context(t.getSharedContext()),this._compositeMaterial.name="Bloom_comp",this._compositeMaterial.needsUpdate=!0,this._textureOutput}dispose(){for(let t=0;t<this._renderTargetsHorizontal.length;t++)this._renderTargetsHorizontal[t].dispose();for(let t=0;t<this._renderTargetsVertical.length;t++)this._renderTargetsVertical[t].dispose();this._renderTargetBright.dispose()}_getSeparableBlurMaterial(t,e){const i=[],s=e/3;for(let m=0;m<e;m++)i.push(.39894*Math.exp(-.5*m*m/(s*s))/s);const n=I(null),r=Rt(i),a=O(new E),c=O(new E(.5,.5)),h=Y(),d=m=>n.sample(m),y=B(()=>{const m=d(h).rgb.mul(r.element(0)).toVar();return ve({start:Oe(1),end:Oe(e),type:"int",condition:"<"},({i:_})=>{const p=j(_),f=r.element(_),u=c.mul(a).mul(p),l=d(h.add(u)).rgb,b=d(h.sub(u)).rgb;m.addAssign(bi(l,b).mul(f))}),$(m,1)}),g=new G;return g.fragmentNode=y().context(t.getSharedContext()),g.name="Bloom_separable",g.needsUpdate=!0,g.colorTexture=n,g.direction=c,g.invSize=a,g}}const hs=(o,t,e,i)=>D(new ls(D(o),t,e,i)),cs=o=>{const t=hs(o,.3,0,0);return t.smoothWidth.value=.3,t};class ds extends _t{static get type(){return"PixelationNode"}constructor(t,e,i,s,n,r){super("vec4"),this.textureNode=t,this.depthNode=e,this.normalNode=i,this.pixelSize=s,this.normalEdgeStrength=n,this.depthEdgeStrength=r,this._resolution=O(new vi),this.updateBeforeType=Gt.FRAME}updateBefore(){const t=this.textureNode.value,e=t.image.width,i=t.image.height;this._resolution.value.set(e,i,1/e,1/i)}setup(){const{textureNode:t,depthNode:e,normalNode:i}=this,s=t.uvNode||Y(),n=e.uvNode||Y(),r=i.uvNode||Y(),a=()=>t.sample(s),c=(p,f)=>e.sample(n.add(Vt(p,f).mul(this._resolution.zw))).r,h=(p,f)=>i.sample(r.add(Vt(p,f).mul(this._resolution.zw))).rgb.normalize(),d=p=>{const f=J("float","diff");return f.addAssign(at(c(1,0).sub(p))),f.addAssign(at(c(-1,0).sub(p))),f.addAssign(at(c(0,1).sub(p))),f.addAssign(at(c(0,-1).sub(p))),Ci(Ht(.01,.02,f).mul(2)).div(2)},y=(p,f,u,l)=>{const b=c(p,f).sub(u),x=h(p,f),S=dt(1,1,1),A=kt(l.sub(x),S),P=at(Ht(-.01,.01,A),0,1),R=at(Ei(b.mul(.25).add(.0025)),0,1);return j(1).sub(kt(l,x)).mul(R).mul(P)},g=(p,f)=>{const u=J("float","indicator");return u.addAssign(y(0,-1,p,f)),u.addAssign(y(0,1,p,f)),u.addAssign(y(-1,0,p,f)),u.addAssign(y(1,0,p,f)),we(.1,u)};return B(()=>{const p=a(),f=J("float","depth"),u=J("vec3","normal");ue(this.depthEdgeStrength.greaterThan(0).or(this.normalEdgeStrength.greaterThan(0)),()=>{f.assign(c(0,0)),u.assign(h(0,0))});const l=J("float","dei");ue(this.depthEdgeStrength.greaterThan(0),()=>{l.assign(d(f))});const b=J("float","nei");ue(this.normalEdgeStrength.greaterThan(0),()=>{b.assign(g(f,u))});const x=l.greaterThan(0).select(j(1).sub(l.mul(this.depthEdgeStrength)),b.mul(this.normalEdgeStrength).add(1));return p.mul(x)})()}}const us=(o,t,e,i=6,s=.3,n=.4)=>D(new ds(gt(o),gt(t),gt(e),D(i),D(s),D(n)));class ps extends ze{static get type(){return"PixelationPassNode"}constructor(t,e,i=6,s=.3,n=.4){super(ze.COLOR,t,e,{minFilter:Fe,magFilter:Fe}),this.pixelSize=i,this.normalEdgeStrength=s,this.depthEdgeStrength=n,this.isPixelationPassNode=!0,this._mrt=yi({output:wi,normal:xi})}setSize(t,e){const i=this.pixelSize.value?this.pixelSize.value:this.pixelSize,s=Math.floor(t/i),n=Math.floor(e/i);super.setSize(s,n)}setup(){const t=super.getTextureNode("output"),e=super.getTextureNode("depth"),i=super.getTextureNode("normal");return us(t,e,i,this.pixelSize,this.normalEdgeStrength,this.depthEdgeStrength)}}const ms=(o,t,e,i,s)=>D(new ps(o,t,e,i,s)),gs=(o,t)=>{const e=O(5),i=O(.5),s=O(1);return ms(o,t,e,i,s)},fs=B(([o])=>{const t=dt(o);return $(kt(t,dt(.393,.769,.189)),kt(t,dt(.349,.686,.168)),kt(t,dt(.272,.534,.131)),o.a)});class _s extends _t{static get type(){return"FilmNode"}constructor(t,e=null,i=null){super("vec4"),this.inputNode=t,this.intensityNode=e,this.uvNode=i}setup(){const t=this.uvNode||Y();return B(()=>{const s=this.inputNode.rgb,n=Mi(Si(t.add(Ni)));let r=s.add(s.mul(at(n.add(.1),0,1)));return this.intensityNode!==null&&(r=Lt(s,r,this.intensityNode)),$(r,this.inputNode.a)})()}}const bs=Ti(_s),ys=o=>{const t=fs(o),e=qe(t,.5);return bs(e)},xs=(o,t,e)=>{const i=new Ai(e),s=Pi(o,t),n=s.getTextureNode(),r=s.getViewZNode();return i.outputNode=Ue(n,r),{postProcessing:i,changePostprocess:c=>{switch(c){case"none":i.outputNode=n;break;case"chromatic":i.outputNode=Ue(n,r);break;case"bloom":i.outputNode=cs(n);break;case"pixelation":i.outputNode=gs(o,t);break;case"sepia":i.outputNode=ys(n);break;default:i.outputNode=n;break}i.needsUpdate=!0}}},Ee=new Di,Ye=[{radius:.6,position:{x:0,y:0,z:0}},{radius:.5,position:{x:.8,y:.1,z:0}},{radius:.7,position:{x:-.7,y:.2,z:0}},{radius:.4,position:{x:.3,y:.3,z:-.2}}],ws=[{radius:1,position:{x:0,y:0,z:0}},{radius:1.2,position:{x:1.4,y:.1,z:0}},{radius:.5,position:{x:-.7,y:.2,z:0}},{radius:.6,position:{x:-.8,y:.3,z:-.2}}];let ut=null,pt=null,lt=null;const be=o=>{const t=new Ot;return o.forEach(e=>{const i=new Ce(e.radius,12,12),s=new U(i,Ee);s.position.set(e.position.x,e.position.y,e.position.z),t.add(s)}),t},vs=()=>{const o=it("day"),t=new Ot;return Ee.color.set(o.cloudColor),ut=be(Ye),ut.position.set(0,34,-32),ut.scale.set(15,10,10),t.add(ut),pt=be(ws),pt.position.set(50,30,-35),pt.scale.set(10,7,7),t.add(pt),lt=be(Ye),lt.position.set(-60,20,-40),lt.scale.set(20,17,17),lt.rotation.y=-Math.PI,t.add(lt),{clouds:t,onChangeEffectClouds:i=>{const n=it(i==="bloom"?"night":"day");Ee.color.set(n.cloudColor)}}},Cs=o=>{if(!ut||!pt||!lt)return;const t=o;ut.position.y+=Math.sin(t+Math.PI/2)*.009,pt.position.y+=Math.sin(t+Math.PI)*.005,lt.position.y+=Math.sin(t)*.008},Es="#fd7c96",Ts="#fff700";let ye=null;const Zt=new ht({roughness:.9}),Te=new ht({roughness:.8}),Xt=new ht({roughness:.8}),Ms=new ht({color:Es,roughness:.8}),Ss=new ht({color:Ts,roughness:.8}),Ns=()=>{const o=new Ot,t=new Be(1,8,4),e=new U(t,Zt);e.position.y=8,o.add(e);const i=new Be(.3,1.6,4),s=new U(i,Zt);s.position.set(-.9,8,0),s.rotation.z=Math.PI/4,o.add(s);const n=new Ut(4,0),r=new U(n,Te);return r.scale.set(1,.9,1),r.position.y=12,r.rotation.y=Math.PI/12,o.add(r),o},As=[{x:-2.6,y:5,z:2.2},{x:-1,y:4.3,z:2.7},{x:-1.5,y:4.8,z:2.7},{x:0,y:5.2,z:1.7}],Ps=[{x:2.5,y:3.5,z:1.16},{x:3.5,y:4,z:1.75},{x:3.2,y:4.2,z:1.7}],Ds=()=>{const o=new Ot,t=new Ut(2,0),e=new U(t,Xt);e.scale.set(1.4,1,1),e.position.set(-1.2,4,1),e.rotation.y=Math.PI/6,o.add(e);for(const n of As){const r=new Ce(1,6,6),a=new U(r,Ms);a.scale.set(.2,.2,.2),a.position.set(n.x,n.y,n.z),o.add(a)}const i=new Ut(1,0),s=new U(i,Xt);s.scale.set(1.4,1,1),s.position.set(3.5,3.5,1),s.rotation.y=-Math.PI/6,o.add(s);for(const n of Ps){const r=new Ce(1,6,6),a=new U(r,Ss);a.scale.set(.12,.12,.12),a.position.set(n.x,n.y,n.z),o.add(a)}return o},Rs=()=>{const o=it("day"),t=new Ot,e=new Ut(10,0);ye=new ht({color:o.islandColor,roughness:.9});const i=new U(e,ye);i.position.set(0,-5,1),i.scale.set(1.4,1,1),i.rotation.x=Math.PI/5,i.rotation.y=Math.PI,t.add(i),Zt.color.set(o.trunkColor),Te.color.set(o.leavesColor),Xt.color.set(o.bushesColor);const s=Ns();s.position.set(1.6,-1.2,1),t.add(s);const n=Ds();return t.add(n),{island:t,onChangeEffectIsland:a=>{const h=it(a==="bloom"?"night":"day");ye?.color.set(h.islandColor),Zt.color.set(h.trunkColor),Te.color.set(h.leavesColor),Xt.color.set(h.bushesColor)}}};/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class Z{constructor(t,e,i,s,n="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(n),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),Z.nextNameID=Z.nextNameID||0,this.$name.id=`lil-gui-name-${++Z.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",r=>r.stopPropagation()),this.domElement.addEventListener("keyup",r=>r.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ks extends Z{constructor(t,e,i){super(t,e,i,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Me(o){let t,e;return(t=o.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const Ls={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:Me,toHexString:Me},$t={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},$s={isPrimitive:!1,match:o=>Array.isArray(o)||ArrayBuffer.isView(o),fromHexString(o,t,e=1){const i=$t.fromHexString(o);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(i&255)/255*e},toHexString([o,t,e],i=1){i=255/i;const s=o*i<<16^t*i<<8^e*i<<0;return $t.toHexString(s)}},Os={isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,t,e=1){const i=$t.fromHexString(o);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(i&255)/255*e},toHexString({r:o,g:t,b:e},i=1){i=255/i;const s=o*i<<16^t*i<<8^e*i<<0;return $t.toHexString(s)}},zs=[Ls,$t,$s,Os];function Fs(o){return zs.find(t=>t.match(o))}class Bs extends Z{constructor(t,e,i,s){super(t,e,i,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Fs(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const n=Me(this.$text.value);n&&this._setValueFromHexString(n)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class xe extends Z{constructor(t,e,i){super(t,e,i,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class js extends Z{constructor(t,e,i,s,n,r){super(t,e,i,"lil-number"),this._initInput(),this.min(s),this.max(n);const a=r!==void 0;this.step(a?r:this._getImplicitStep(),a),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let l=parseFloat(this.$input.value);isNaN(l)||(this._stepExplicit&&(l=this._snap(l)),this.setValue(this._clamp(l)))},i=l=>{const b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+l),this.$input.value=this.getValue())},s=l=>{l.key==="Enter"&&this.$input.blur(),l.code==="ArrowUp"&&(l.preventDefault(),i(this._step*this._arrowKeyMultiplier(l))),l.code==="ArrowDown"&&(l.preventDefault(),i(this._step*this._arrowKeyMultiplier(l)*-1))},n=l=>{this._inputFocused&&(l.preventDefault(),i(this._step*this._normalizeMouseWheel(l)))};let r=!1,a,c,h,d,y;const g=5,m=l=>{a=l.clientX,c=h=l.clientY,r=!0,d=this.getValue(),y=0,window.addEventListener("mousemove",_),window.addEventListener("mouseup",p)},_=l=>{if(r){const b=l.clientX-a,x=l.clientY-c;Math.abs(x)>g?(l.preventDefault(),this.$input.blur(),r=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>g&&p()}if(!r){const b=l.clientY-h;y-=b*this._step*this._arrowKeyMultiplier(l),d+y>this._max?y=this._max-d:d+y<this._min&&(y=this._min-d),this._snapClampSetValue(d+y)}h=l.clientY},p=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",_),window.removeEventListener("mouseup",p)},f=()=>{this._inputFocused=!0},u=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",n,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",f),this.$input.addEventListener("blur",u)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(u,l,b,x,S)=>(u-l)/(b-l)*(S-x)+x,e=u=>{const l=this.$slider.getBoundingClientRect();let b=t(u,l.left,l.right,this._min,this._max);this._snapClampSetValue(b)},i=u=>{this._setDraggingStyle(!0),e(u.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",n)},s=u=>{e(u.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",n)};let r=!1,a,c;const h=u=>{u.preventDefault(),this._setDraggingStyle(!0),e(u.touches[0].clientX),r=!1},d=u=>{u.touches.length>1||(this._hasScrollBar?(a=u.touches[0].clientX,c=u.touches[0].clientY,r=!0):h(u),window.addEventListener("touchmove",y,{passive:!1}),window.addEventListener("touchend",g))},y=u=>{if(r){const l=u.touches[0].clientX-a,b=u.touches[0].clientY-c;Math.abs(l)>Math.abs(b)?h(u):(window.removeEventListener("touchmove",y),window.removeEventListener("touchend",g))}else u.preventDefault(),e(u.touches[0].clientX)},g=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",y),window.removeEventListener("touchend",g)},m=this._callOnFinishChange.bind(this),_=400;let p;const f=u=>{if(Math.abs(u.deltaX)<Math.abs(u.deltaY)&&this._hasScrollBar)return;u.preventDefault();const b=this._normalizeMouseWheel(u)*this._step;this._snapClampSetValue(this.getValue()+b),this.$input.value=this.getValue(),clearTimeout(p),p=setTimeout(m,_)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",f,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Is extends Z{constructor(t,e,i,s){super(t,e,i,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const i=document.createElement("option");i.textContent=e,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class Vs extends Z{constructor(t,e,i){super(t,e,i,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Hs=`.lil-gui {
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
}`;function Us(o){const t=document.createElement("style");t.innerHTML=o;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let Ze=!1;class Ae{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:s,title:n="Controls",closeFolders:r=!1,injectStyles:a=!0,touchStyles:c=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(n),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),c&&this.domElement.classList.add("lil-allow-touch-styles"),!Ze&&a&&(Us(Hs),Ze=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=r}add(t,e,i,s,n){if(Object(i)===i)return new Is(this,t,e,i);const r=t[e];switch(typeof r){case"number":return new js(this,t,e,i,s,n);case"boolean":return new ks(this,t,e);case"string":return new Vs(this,t,e);case"function":return new xe(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,r)}addColor(t,e,i=1){return new Bs(this,t,e,i)}addFolder(t){const e=new Ae({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof xe||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof xe)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("lil-transition");const i=n=>{n.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}const Ys=new Ae,Zs=["none","chromatic","bloom","pixelation","sepia"],Xs=async o=>{const{scene:t,camera:e,renderer:i,onChangeEffectScene:s}=await Ki(o),n=Qi();t.add(n);const{clouds:r,onChangeEffectClouds:a}=vs();t.add(r);const{island:c,onChangeEffectIsland:h}=Rs();t.add(c);const{postProcessing:d,changePostprocess:y}=xs(t,e,i);Gs([y,s,h,a]);const g=new Ri,m=()=>{d.render();const _=g.getElapsedTime();Ji(_),Cs(_),requestAnimationFrame(m)};m(),window.addEventListener("resize",()=>qi(e,i))},Gs=o=>{Ys.addFolder("Post Processing").add({effect:"chromatic"},"effect",Zs).name("Effect").onChange(e=>{for(const i of o)i(e)})},Ks=()=>{const o=document.querySelector("#app");o&&Xs(o)};document.addEventListener("DOMContentLoaded",Ks);
