declare module 'three/addons/controls/OrbitControls' {
    import { type Camera, type EventDispatcher } from 'three';
  
    export class OrbitControls extends EventDispatcher {
      constructor(camera: Camera, domElement?: HTMLElement);
      enabled: boolean;
      enableDamping: boolean;
      dampingFactor: number;
      rotateSpeed: number;
      enableZoom: boolean;
      autoRotate: boolean;
      autoRotateSpeed: number;
      update(): void;
      dispose(): void;
    }
  }
  
  declare module 'three/examples/jsm/controls/OrbitControls' {
    export * from 'three/addons/controls/OrbitControls';
  }