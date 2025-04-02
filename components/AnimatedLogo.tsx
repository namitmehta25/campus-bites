'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Logo3D() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main square */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.2, 0.2]} />
        <meshStandardMaterial color={process.env.NEXT_PUBLIC_THEME_COLOR} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Inner cutout for "C" */}
      <mesh position={[0.1, 0, 0.11]}>
        <boxGeometry args={[0.6, 0.6, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* "B" shape */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[0.2, 1.2, 0.05]} />
        <meshStandardMaterial color={process.env.NEXT_PUBLIC_THEME_COLOR} metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.3, 0.3, 0.11]}>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color={process.env.NEXT_PUBLIC_THEME_COLOR} metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.3, -0.3, 0.11]}>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color={process.env.NEXT_PUBLIC_THEME_COLOR} metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.5, 0, 0.11]}>
        <boxGeometry args={[0.2, 0.4, 0.05]} />
        <meshStandardMaterial color={process.env.NEXT_PUBLIC_THEME_COLOR} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function AnimatedLogo() {
  return (
    <div className="h-10 w-10">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 40 }}
        className="h-full w-full"
      >
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Logo3D />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
    </div>
  )
} 