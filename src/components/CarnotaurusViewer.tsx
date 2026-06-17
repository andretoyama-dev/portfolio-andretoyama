import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { Activity } from 'lucide-react';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.005} />;
}

export default function CarnotaurusViewer() {
  return (
    <div className="h-[400px] md:h-[500px] w-full bg-[#050505] rounded-sm border border-white/5 relative group overflow-hidden shadow-2xl">
      <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-brand-red/50 uppercase tracking-widest pointer-events-none">
        <span className="flex items-center gap-2">
          <Activity className="w-3 h-3 animate-pulse" />
          3D_RECONSTRUCTION_ACTIVE
        </span>
      </div>
      
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full space-y-4 bg-black">
           <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
           <div className="text-brand-red font-mono text-[8px] animate-pulse tracking-widest uppercase">Extracting_DNA_Data...</div>
        </div>
      }>
        <Canvas shadows gl={{ antialias: true }}>
          <color attach="background" args={['#050505']} />
          <PerspectiveCamera makeDefault position={[4, 1.5, 4]} fov={35} />
          
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={2.5} castShadow />
          <pointLight position={[-10, 5, -10]} intensity={1.5} color="#ff3333" />
          
          <Suspense fallback={null}>
            <Center>
              <Model url={`${import.meta.env.BASE_URL}carnotaurus.glb`} />
            </Center>
            <Environment preset="city" />
            <ContactShadows 
              position={[0, -1, 0]} 
              opacity={0.6} 
              scale={20} 
              blur={2.5} 
              far={4.5} 
            />
          </Suspense>

          <OrbitControls 
            autoRotate 
            autoRotateSpeed={0.8} 
            enableZoom={true} 
            makeDefault 
            minDistance={2.5}
            maxDistance={10}
            target={[0, 0.45, 0]}
          />
        </Canvas>
      </Suspense>
      
      <div className="absolute bottom-4 right-4 z-20 font-mono text-[8px] text-gray-500 uppercase tracking-widest text-right pointer-events-none opacity-50">
        [ DRAG TO ROTATE // SCROLL TO ZOOM ]
      </div>
      
      <div className="absolute inset-0 pointer-events-none border border-brand-red/10 scale-[0.98] z-30"></div>
    </div>
  );
}
