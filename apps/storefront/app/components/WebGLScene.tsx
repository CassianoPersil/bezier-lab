'use client'

// =============================================================================
// WEBGL SCENE — Storefront Client Component
// Isolated WebGL canvas to prevent SSR hydration errors
// =============================================================================

import React, { useRef, useMemo } from 'react'
import { motion, MotionValue } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// 3D Canvas Components - linked to scroll
// ---------------------------------------------------------------------------

function ScrollLinkedMesh({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lineRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    const progress = scrollYProgress.get()
    
    if (meshRef.current) {
      // Rotate based on scroll progress + auto-rotation
      meshRef.current.rotation.y = progress * Math.PI * 1.5 + state.clock.elapsedTime * 0.15
      meshRef.current.rotation.x = progress * Math.PI * 0.5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      
      // Scale up and float into center as scroll progress increases
      const scale = 1.0 + progress * 0.8
      meshRef.current.scale.set(scale, scale, scale)
      
      // Adjust position (move to center from right)
      meshRef.current.position.x = THREE.MathUtils.lerp(1.8, 0, Math.min(progress * 2.5, 1))
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }

    if (lineRef.current) {
      lineRef.current.rotation.y = progress * Math.PI * 1.5 + state.clock.elapsedTime * 0.15
      lineRef.current.rotation.x = progress * Math.PI * 0.5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      const scale = 1.02 + progress * 0.82
      lineRef.current.scale.set(scale, scale, scale)
      lineRef.current.position.x = THREE.MathUtils.lerp(1.8, 0, Math.min(progress * 2.5, 1))
      lineRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  // Create geometry for a complex mathematical object (torus knot)
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(0.8, 0.25, 120, 16), [])

  return (
    <group>
      {/* Solid body */}
      <mesh ref={meshRef} geometry={geometry} castShadow>
        <meshStandardMaterial
          color="#00F0FF"
          metalness={0.9}
          roughness={0.2}
          emissive="#005b66"
          emissiveIntensity={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay for digital precision look */}
      <lineSegments ref={lineRef}>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#00F0FF" transparent opacity={0.3} />
      </lineSegments>
    </group>
  )
}

function PrintNozzle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const nozzleRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const progress = scrollYProgress.get()
    
    if (nozzleRef.current) {
      // The nozzle moves in a mathematical Lissajous pattern representing path drawing
      const time = state.clock.elapsedTime * 2.5
      nozzleRef.current.position.x = THREE.MathUtils.lerp(
        1.8 + Math.sin(time) * 0.5,
        Math.sin(time * 1.5) * 1.2,
        Math.min(progress * 2.5, 1)
      )
      nozzleRef.current.position.z = THREE.MathUtils.lerp(
        Math.cos(time) * 0.5,
        Math.cos(time * 2) * 1.2,
        Math.min(progress * 2.5, 1)
      )
      nozzleRef.current.position.y = THREE.MathUtils.lerp(1.5, 1.2, progress)
    }
  })

  return (
    <group ref={nozzleRef}>
      {/* Nozzle stem */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.01, 0.4, 8]} />
        <meshStandardMaterial color="#636b76" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Glowing tip */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={4} />
      </mesh>
      {/* Laser point light pointing down */}
      <pointLight color="#00F0FF" intensity={3} distance={2.5} position={[0, -0.2, 0]} />
    </group>
  )
}

export function WebGLScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.8, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} color="#e8eaed" />
        <pointLight position={[-4, 5, -2]} intensity={0.4} color="#00F0FF" />
        
        {/* Particle stars background */}
        <Stars radius={60} depth={40} count={1200} factor={4} saturation={0} fade speed={1} />
        
        {/* Animated print bed plane grid */}
        <gridHelper args={[16, 16, '#1e2124', '#141517']} position={[0, -1.2, 0]} />
        
        <ScrollLinkedMesh scrollYProgress={scrollYProgress} />
        <PrintNozzle scrollYProgress={scrollYProgress} />

        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
