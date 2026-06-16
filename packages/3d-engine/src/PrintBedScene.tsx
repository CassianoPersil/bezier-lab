'use client'

// =============================================================================
// PRINT BED SCENE — @bezier-lab/3d-engine
// Animated 3D print bed hero scene for the storefront
// =============================================================================

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Animated grid (print bed)
// ---------------------------------------------------------------------------
function PrintGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 0.5
      if (gridRef.current.position.z > 2) {
        gridRef.current.position.z = 0
      }
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, '#1e2124', '#1e2124']}
      position={[0, -2, 0]}
    />
  )
}

// ---------------------------------------------------------------------------
// Floating abstract 3D shapes (simulate printing objects)
// ---------------------------------------------------------------------------
function FloatingShape({
  position,
  color = '#00F0FF',
  speed = 1,
  shape = 'box',
}: {
  position: [number, number, number]
  color?: string
  speed?: number
  shape?: 'box' | 'sphere' | 'torus' | 'cone'
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2
    }
  })

  const geometry = {
    box: <boxGeometry args={[0.6, 0.6, 0.6]} />,
    sphere: <sphereGeometry args={[0.4, 32, 32]} />,
    torus: <torusGeometry args={[0.3, 0.12, 16, 100]} />,
    cone: <coneGeometry args={[0.35, 0.7, 32]} />,
  }[shape]

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} castShadow>
        {geometry}
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

// ---------------------------------------------------------------------------
// Print nozzle (animated extrusion line)
// ---------------------------------------------------------------------------
function PrintNozzle() {
  const nozzleRef = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.Mesh>(null)
  const progress = useRef(0)

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * 0.3) % 1

    if (nozzleRef.current) {
      nozzleRef.current.position.x = Math.sin(progress.current * Math.PI * 2) * 1.5
      nozzleRef.current.position.y = -1.2 + progress.current * 0.4
    }
  })

  return (
    <group ref={nozzleRef} position={[0, -1.2, 0]}>
      {/* Nozzle body */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#636b76" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Cyan glow dot at tip */}
      <mesh position={[0, -0.17, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={3} />
      </mesh>
      {/* Light from nozzle */}
      <pointLight color="#00F0FF" intensity={2} distance={1.5} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// Scene particles
// ---------------------------------------------------------------------------
function Particles({ count = 80 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00F0FF" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

// ---------------------------------------------------------------------------
// PrintBedScene — Main export
// ---------------------------------------------------------------------------
export interface PrintBedSceneProps {
  height?: number | string
  className?: string
}

export function PrintBedScene({ height = '100%', className = '' }: PrintBedSceneProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ height, width: '100%' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={0.6} color="#e8eaed" />
        <pointLight position={[0, 4, 0]} intensity={1.5} color="#00F0FF" distance={12} />

        {/* Stars background */}
        <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />

        {/* Grid */}
        <PrintGrid />

        {/* Particles */}
        <Particles count={100} />

        {/* Floating 3D shapes */}
        <FloatingShape position={[-2.5, 0.5, -1]} color="#00F0FF" speed={0.8} shape="torus" />
        <FloatingShape position={[2.5, 0, -2]} color="#29eeff" speed={1.2} shape="box" />
        <FloatingShape position={[0, 1.5, -3]} color="#6ef4ff" speed={0.6} shape="sphere" />
        <FloatingShape position={[-1.5, -0.5, -1.5]} color="#00c8d9" speed={1} shape="cone" />
        <FloatingShape position={[1.5, 1, -1]} color="#e8eaed" speed={0.9} shape="box" />

        {/* Print nozzle */}
        <PrintNozzle />

        {/* Environment */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
