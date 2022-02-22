import { ReactThreeFiber, extend } from "@react-three/fiber";
import { TextGeometry, UnrealBloomPass } from "three-stdlib";
import { MeshLine, MeshLineMaterial } from "meshline";

declare module "*.vert" {
  const content: string;
  export default content;
}

declare module "*.frag" {
  const content: string;
  export default content;
}
extend({ TextGeometry, MeshLine, UnrealBloomPass, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLine: ReactThreeFiber.Object3DNode<MeshLine, typeof MeshLine>;
      textGeometry: ReactThreeFiber.Object3DNode<TextGeometry, typeof TextGeometry>;
      unrealBloomPass: ReactThreeFiber.Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
      meshLineMaterial: ReactThreeFiber.Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
      meshWobbleMaterial: ReactThreeFiber.Object3DNode<MeshWobbleMaterial, typeof MeshWobbleMaterial>;
      waveShaderMaterial: React.DetailedHTMLProps<ShaderMaterialProps>;
    }
  }
}
