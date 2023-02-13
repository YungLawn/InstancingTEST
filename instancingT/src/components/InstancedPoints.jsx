import { useRef, useState, useMemo, useEffect} from 'react';
import { Object3D, Color} from 'three';
import { useSpring, a } from '@react-spring/three'

// re-use for instance computations
const scratchObject3D = new Object3D();
const tempColor = new Color()

function updateInstancedMeshMatrices({ mesh, scalex, hover, data }) {
  if (!mesh) return
  // console.log(hover)

  for (let i = 0; i < data.length; i++) {
    const x = (data[i].x) * 1.05;
    const y = (data[i].y) * 1.05;
    const z = 0;
    if(i === hover) {
      scratchObject3D.position.set(x, y, z)
        scratchObject3D.scale.set(1, scalex, 1)
        scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
        scratchObject3D.updateMatrix()
        mesh.setMatrixAt(hover, scratchObject3D.matrix)
        mesh.instanceMatrix.needsUpdate = true
    }
  }
}

const InstancedPoints = ({ data }) => {
  const [hover, setHover] = useState()
  const meshRef = useRef();
  const colorArray = useMemo(() => Float32Array.from(new Array(data.length).fill().flatMap((_, i) => tempColor.set(data[i].col).toArray())), [])
  const [{ scalex }] = useSpring({ scalex: 1, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } }, [hover])
  // console.log(hover)

  // update instance matrices only when needed
  useEffect(() => {
    const mesh = meshRef.current;
    scalex.start({
      from: { scalex: hover ? 1 : 8 },
      to: { scalex: hover ? 8 : 1 },
      reset: true,
      onChange: (props, spring) => {
        updateInstancedMeshMatrices({ mesh: meshRef.current, scalex: spring.get(), hover, data })
      }
    })

    // set the transform matrix for each instance
    for (let i = 0; i < data.length; ++i) {
      // console.log(i)
      const x = (data[i].x) * 1.05;
      const y = (data[i].y) * 1.05;
      const z = 0;

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <a.instancedMesh
      position={[-100,-60,0]}
      ref={meshRef}
      args={[null, null, data.length]}
      // frustumCulled={false}
      onPointerMove={(e) => {e.stopPropagation; setHover(e.instanceId)}}
      onPointerOut={(e) => {e.stopPropagation; setHover(undefined)}}
    >
      <boxGeometry attach="geometry" args={[1, 0.25, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </boxGeometry>
      <meshLambertMaterial attach="material" vertexColors/>
    </a.instancedMesh>
  );
};

export default InstancedPoints;
