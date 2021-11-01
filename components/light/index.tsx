export const Light = () => {
  return (
    <group>
      <ambientLight intensity={0.3} color="#A63923" />
      <directionalLight color="#f8de88" position={[-2, 1, 6]} intensity={0.6} />
      <directionalLight position={[2, 1, 6]} intensity={0.6} color="#ec7256" />
      <pointLight position={[0, 0, 0]} intensity={4} color="#f8de88" />
    </group>
  );
};
