import React, {Suspense, useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {Stats, Stars} from '@react-three/drei';
import SpecialControls from './SpecialControls';
import InstancedPoints from './InstancedPoints';
import SpringTest from './SpringTest';

export default function NuclideScene( {data} ) {
    const [layout, setLayout] = React.useState('grid');
    const [selectedPoint, setSelectedPoint] = React.useState(null);

    return(
        <Canvas camera={{ fov: 30, position:[0,0,300], far: 15000 }}>
            <SpecialControls/>

            <ambientLight intensity={0.25}/>
            <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

            <InstancedPoints data={data}/>
            {/* <SpringTest data={data}/> */}

            <Stars radius={200}/>
            <Stats showPanel={4}/>
        </Canvas>
    )
}

