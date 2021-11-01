import { MeshLine, MeshLineMaterial } from 'meshline';
import * as React from 'react';
import { MeshStandardMaterial } from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLine: React.DetailedHTMLProps<MeshLine>;
      unrealBloomPass: React.DetailedHTMLProps<UnrealBloomPass>;
      meshLineMaterial: React.DetailedHTMLProps<MeshLineMaterial>;
      meshWobbleMaterial: React.DetailedHTMLFactory<MeshStandardMaterial>;
    }
  }
}
