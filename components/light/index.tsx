export const Light = () => {
  return (
    <group>
      <ambientLight intensity={0.1} />
      <directionalLight
        color="#998953"
        position={[0, 10, 5]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[0, 10, -25]} intensity={0.4} color="#df9382" />
    </group>
  );
};
