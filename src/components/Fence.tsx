const Fence = ({
  position = [0, 0, 0],
  length = 1,
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  length?: number;
  rotation?: [number, number, number];
}) => {
  const postSpacing = 0.5;
  const numPosts = Math.floor(length / postSpacing) + 1;

  return (
    <group position={position} rotation={rotation}>
      {/* Vertical posts */}
      {Array.from({ length: numPosts }).map((_, i) => (
        <mesh key={`post-${i}`} position={[i * postSpacing, 0, 0]}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

      {/* Top rail */}
      <mesh position={[length / 2, 0.2, 0]}>
        <boxGeometry args={[length, 0.05, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Bottom rail */}
      <mesh position={[length / 2, 0.05, 0]}>
        <boxGeometry args={[length, 0.05, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
};

export default Fence;
