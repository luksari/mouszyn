import '@react-three/drei';
import React from 'react';
import { MeshStandardMaterial } from 'three';

declare module '@react-three/drei' {
  export declare const MeshWobbleMaterial: React.ForwardRefExoticComponent<
    Pick<
      Omit<
        import('@react-three/fiber').Node<MeshStandardMaterial, [MeshStandardMaterialParameters]>,
        'color' | undefined
      > & {
        color?: import('@react-three/fiber').Color | undefined;
      } & {
        time?: number | undefined;
        factor?: number | undefined;
        speed?: number | undefined;
      } & {
        speed?: number | undefined;
        factor?: number | undefined;
      },
      | 'visible'
      | 'attach'
      | 'attachArray'
      | 'attachObject'
      | 'args'
      | 'children'
      | 'key'
      | 'onUpdate'
      | 'dispose'
      | 'type'
      | 'id'
      | 'uuid'
      | 'name'
      | 'userData'
      | 'toJSON'
      | 'clone'
      | 'copy'
      | 'addEventListener'
      | 'hasEventListener'
      | 'removeEventListener'
      | 'dispatchEvent'
      | 'color'
      | 'map'
      | 'time'
      | 'transparent'
      | 'fog'
      | 'opacity'
      | 'speed'
      | 'alphaTest'
      | 'alphaToCoverage'
      | 'blendDst'
      | 'blendDstAlpha'
      | 'blendEquation'
      | 'blendEquationAlpha'
      | 'blending'
      | 'blendSrc'
      | 'blendSrcAlpha'
      | 'clipIntersection'
      | 'clippingPlanes'
      | 'clipShadows'
      | 'colorWrite'
      | 'defines'
      | 'depthFunc'
      | 'depthTest'
      | 'depthWrite'
      | 'stencilWrite'
      | 'stencilFunc'
      | 'stencilRef'
      | 'stencilWriteMask'
      | 'stencilFuncMask'
      | 'stencilFail'
      | 'stencilZFail'
      | 'stencilZPass'
      | 'isMaterial'
      | 'needsUpdate'
      | 'polygonOffset'
      | 'polygonOffsetFactor'
      | 'polygonOffsetUnits'
      | 'precision'
      | 'premultipliedAlpha'
      | 'dithering'
      | 'side'
      | 'shadowSide'
      | 'toneMapped'
      | 'vertexColors'
      | 'version'
      | 'onBeforeCompile'
      | 'customProgramCacheKey'
      | 'setValues'
      | 'roughness'
      | 'metalness'
      | 'lightMap'
      | 'lightMapIntensity'
      | 'aoMap'
      | 'aoMapIntensity'
      | 'emissive'
      | 'emissiveIntensity'
      | 'emissiveMap'
      | 'bumpMap'
      | 'bumpScale'
      | 'normalMap'
      | 'normalMapType'
      | 'normalScale'
      | 'displacementMap'
      | 'displacementScale'
      | 'displacementBias'
      | 'roughnessMap'
      | 'metalnessMap'
      | 'alphaMap'
      | 'envMap'
      | 'envMapIntensity'
      | 'refractionRatio'
      | 'wireframe'
      | 'wireframeLinewidth'
      | 'wireframeLinecap'
      | 'wireframeLinejoin'
      | 'flatShading'
      | 'isMeshStandardMaterial'
      | 'factor'
    > &
      React.RefAttributes<unknown>
  >;
}
