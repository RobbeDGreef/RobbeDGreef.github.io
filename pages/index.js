import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useEffect, useRef, useState, Suspense} from 'react'
import { Canvas, useFrame } from "@react-three/fiber"
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { Euler, Vector3 } from 'three';

function Scene() {
  //const obj = useLoader(OBJLoader, "/world.obj");
  //const mat = useLoader(MTLLoader, "/world.mtl");
  const obj = useLoader(GLTFLoader, "/world4.gltf");
  const bg = useLoader(GLTFLoader, "/bg.gltf");

  obj.scene.scale.set(1.5, 1.5, 1.5);
  bg.scene.rotation.set(-0.3, -1, 0, 'XYZ');
  bg.scene.scale.set(3, 3, 3);
  bg.scene.position.set(0,0,-5);

  const [clicked, setClicked] = useState(false);

  //gltf.scene.scale.multiply(Vector3(0.1, 0.1, 0.1))
  useFrame((state, delta) => (obj.scene.rotation.y += 0.002))
  return (
    <Suspense fallback = {null}>
      <mesh
        scale={clicked ? 1.2 : 1}
        onClick={(event) => setClicked(!clicked)}>
        <primitive object={obj.scene}/>
      </mesh>
      <primitive object={bg.scene}/>
    </Suspense>
  )
}
w
function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.y += 0.002))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function Home() {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(false), []);
  return (
    <div className={styles.container}>
      <body>
        <h1> Hello world :)</h1>
      <Canvas
        shadows={true}
        className={styles.canvas}
        camera={{position: [-6, 4, 7]}}>
          <pointLight position={[-2, 10, 10]} intensity={0.3}/>
          <pointLight position={[-2, 0, 10]} intensity={0.3}/>
          
          <Scene></Scene>
        </Canvas>
        </body>
    </div>
  )
}
