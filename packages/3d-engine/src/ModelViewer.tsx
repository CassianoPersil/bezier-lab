'use client'

// =============================================================================
// MODEL VIEWER — @bezier-lab/3d-engine
// Interactive 3D model viewer with orbit controls
// Supports .glb/.gltf files via URL
// =============================================================================

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  useProgress,
  useGLTF,
  Center,
} from '@react-three/drei'
import { Spinner } from '@bezier-lab/ui'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Loading progress overlay
// ---------------------------------------------------------------------------
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-center">
        <Spinner size="lg" variant="accent" />
        <p className="text-sm text-[#9da3ae] font-medium">{Math.round(progress)}%</p>
      </div>
    </Html>
  )
}

// ---------------------------------------------------------------------------
// GLTF Model Component
// ---------------------------------------------------------------------------
function GLTFModel({ url, autoRotate = false }: { url: string; autoRotate?: boolean }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  )
}

// ---------------------------------------------------------------------------
// Placeholder mesh when no URL is provided
// ---------------------------------------------------------------------------
function PlaceholderMesh({ autoRotate = false }: { autoRotate?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <mesh ref={meshRef} castShadow>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#141517"
        metalness={0.8}
        roughness={0.2}
        emissive="#00F0FF"
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

// ---------------------------------------------------------------------------
// ModelViewer — Main export
// ---------------------------------------------------------------------------
export interface ModelViewerProps {
  /** URL to a .glb or .gltf file. Shows a placeholder if omitted. */
  modelUrl?: string
  /** Auto-rotate the model */
  autoRotate?: boolean
  /** Container height */
  height?: number | string
  /** Container width */
  width?: number | string
  /** Show contact shadows */
  shadows?: boolean
  /** Environment preset for lighting */
  environment?: 'studio' | 'city' | 'sunset' | 'dawn' | 'warehouse'
  /** Additional className for the wrapper */
  className?: string
}

export function ModelViewer({
  modelUrl,
  autoRotate = true,
  height = 400,
  width = '100%',
  shadows = true,
  environment = 'studio',
  className = '',
}: ModelViewerProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden border border-[#1e2124] bg-[#0f1011] ${className}`}
      style={{ height, width }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00F0FF" />

        <Suspense fallback={<Loader />}>
          {modelUrl ? (
            <GLTFModel url={modelUrl} autoRotate={autoRotate} />
          ) : (
            <PlaceholderMesh autoRotate={autoRotate} />
          )}

          <Environment preset={environment} />

          {shadows && (
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4}
              color="#00F0FF"
            />
          )}
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
        />
      </Canvas>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0f1011] to-transparent pointer-events-none" />
    </div>
  )
}
