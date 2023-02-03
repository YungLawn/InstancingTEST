import React from 'react';
import {OrbitControls} from '@react-three/drei';

export default function SpecialControls() {
    return (
        <OrbitControls 
            minPolarAngle={Math.PI / -1}
            maxPolarAngle={Math.PI / 1}
            minAzimuthAngle = {Math.PI / -2}
            maxAzimuthAngle = {Math.PI / 2}
            minDistance = {10}
            maxDistance = {400}
            rotateSpeed = {0.75}
            zoomSpeed = {1}
            setAzimuthalAngle={Math.PI}
            target={[0,0,0]}
            rotation={[0,5,0]}
        >
        </OrbitControls>

        // <MapControls> 
        //     location ={[0,0,0]}
        //     minPolarAngle={Math.PI / 2} 
        //     maxPolarAngle={Math.PI / 1} 
        //     minAzimuthAngle = {0}
        //     maxAzimuthAngle = {0}
        // </MapControls>
    )
}