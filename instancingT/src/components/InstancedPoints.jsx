import * as React from 'react';
import * as THREE from 'three';

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();
const tempColor = new THREE.Color()

const InstancedPoints = ({ data }) => {
  const meshRef = React.useRef();
  const numPoints = data.length;
  const colorArray = React.useMemo(() => Float32Array.from(new Array(data.length).fill().flatMap((_, i) => tempColor.set(data[i].col).toArray())), [])
  console.log(colorArray)

  // update instance matrices only when needed
  React.useEffect(() => {
    const mesh = meshRef.current;

    // set the transform matrix for each instance
    for (let i = 0; i < numPoints; ++i) {
      // console.log(data[i])
      const x = (data[i].x) * 1.05;
      const y = (data[i].y) * 1.05;
      const z = 0;

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [numPoints]);

  return (
    <instancedMesh
      position={[-100,-60,0]}
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}
    >
      <boxBufferGeometry attach="geometry" args={[1, 0.25, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshStandardMaterial attach="material" vertexColors/>
    </instancedMesh>
  );
};

export default InstancedPoints;
