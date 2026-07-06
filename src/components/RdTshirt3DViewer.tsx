import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RdTshirt3DViewerProps {
  frontImage: string | null;
  backImage: string | null;
}

export default function RdTshirt3DViewer({ frontImage, backImage }: RdTshirt3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background for elegant blending

    // 2. Camera setup with professional perspective
    const camera = new THREE.PerspectiveCamera(
      40,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.8;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);

    // 4. Multi-point High-contrast Studio Lighting for 3D Fabric Volume & Embossing
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Primary key light (cyan tech glow)
    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.2);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    // Fill light (warm orange rim glow)
    const fillLight = new THREE.DirectionalLight(0xff6b00, 1.8);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    // Front high-fidelity specular highlight light for embossing depth
    const specularLight = new THREE.DirectionalLight(0xffffff, 1.2);
    specularLight.position.set(0, 2, 5);
    scene.add(specularLight);

    // 5. Helper to create beautiful sloped shoulder t-shirt cylinder geometry with organic folds
    const createSlopedCylinder = (
      radiusTop: number,
      radiusBottom: number,
      height: number,
      radialSegments: number,
      heightSegments: number,
      openEnded: boolean,
      thetaStart?: number,
      thetaLength?: number
    ) => {
      const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        
        // Calculate angle theta
        const angle = Math.atan2(z, x);
        
        // Slope shoulders: as |x| increases, lower y organically to form draped sloped shoulders
        let newY = y;
        if (y > 0.3) {
          const absX = Math.abs(x);
          const slope = 0.45 * Math.pow(absX / radiusTop, 2.0);
          newY = y - slope;
          pos.setY(i, newY);
        }
        
        // Add organic fabric folds/waves along the torso (realistic 3D cloth drape)
        const foldWave = 0.045 * Math.sin(y * 3.8 + angle * 2.0) * (1.1 - Math.abs(y) / (height / 2));
        pos.setZ(i, z + foldWave * Math.cos(angle));
        pos.setX(i, x + foldWave * Math.sin(angle));
      }
      geo.computeVertexNormals();
      return geo;
    };

    // 6. Define Solid Base Materials and Textured Materials
    const fabricColor = 0x0a0a0f; // Ultra rich deep matte black

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: fabricColor,
      roughness: 0.9,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      color: fabricColor,
      roughness: 0.72,
      metalness: 0.12,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: fabricColor,
      roughness: 0.72,
      metalness: 0.12,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true
    });

    // Load textures and apply high-end bump/embossing mapping
    const loader = new THREE.TextureLoader();

    if (frontImage) {
      loader.load(frontImage, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        
        frontMaterial.map = texture;
        // Apply texture as high-contrast bump map for a raised, realistic printed-ink feel (embossed)
        frontMaterial.bumpMap = texture;
        frontMaterial.bumpScale = 0.18;
        frontMaterial.color.setHex(0xffffff); // Use original graphic colors
        frontMaterial.needsUpdate = true;
      });
    }

    if (backImage) {
      loader.load(backImage, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        
        // Flip texture horizontally to correct the mirrored cylinder orientation on the back
        texture.repeat.x = -1;
        texture.offset.x = 1;
        
        backMaterial.map = texture;
        // Embossed raised print for the back as well
        backMaterial.bumpMap = texture;
        backMaterial.bumpScale = 0.18;
        backMaterial.color.setHex(0xffffff);
        backMaterial.needsUpdate = true;
      });
    }

    // 7. Assemble 3D T-Shirt Components into a single, cohesive, premium Group
    const tShirtGroup = new THREE.Group();

    // A. Torso Body (Solid base backing)
    const baseTorsoGeo = createSlopedCylinder(1.0, 1.05, 2.3, 32, 4, false);
    const baseTorso = new THREE.Mesh(baseTorsoGeo, baseMaterial);
    baseTorso.scale.set(1.15, 1, 0.35); // Flatten on Z to create realistic oval body shape
    tShirtGroup.add(baseTorso);

    // B. Front Print Layer (Slightly larger radius to prevent Z-fighting)
    const frontPrintGeo = createSlopedCylinder(1.002, 1.052, 2.3, 32, 4, true, -Math.PI / 2, Math.PI);
    const frontPrintMesh = new THREE.Mesh(frontPrintGeo, frontMaterial);
    frontPrintMesh.scale.set(1.15, 1, 0.35);
    tShirtGroup.add(frontPrintMesh);

    // C. Back Print Layer (Slightly larger radius)
    const backPrintGeo = createSlopedCylinder(1.002, 1.052, 2.3, 32, 4, true, Math.PI / 2, Math.PI);
    const backPrintMesh = new THREE.Mesh(backPrintGeo, backMaterial);
    backPrintMesh.scale.set(1.15, 1, 0.35);
    tShirtGroup.add(backPrintMesh);

    // D. Left Sleeve Group (Angled downwards and outwards)
    const leftSleeveGroup = new THREE.Group();
    leftSleeveGroup.position.set(-1.08, 0.58, 0);
    leftSleeveGroup.rotation.z = -0.55; // Corrected: Points downwards and outwards!
    leftSleeveGroup.rotation.x = 0.05;  // Slightly forward
    leftSleeveGroup.scale.set(1, 1, 0.6); // Flattened oval sleeve cross section

    const leftSleeveGeo = new THREE.CylinderGeometry(0.28, 0.25, 0.7, 16, 1, true);
    const leftSleeve = new THREE.Mesh(leftSleeveGeo, baseMaterial);
    leftSleeveGroup.add(leftSleeve);

    // Beautiful Cuff/Hem at Left Sleeve Opening
    const leftSleeveHemGeo = new THREE.TorusGeometry(0.255, 0.02, 8, 16);
    const leftSleeveHem = new THREE.Mesh(leftSleeveHemGeo, baseMaterial);
    leftSleeveHem.position.y = -0.35;
    leftSleeveHem.rotation.x = Math.PI / 2;
    leftSleeveGroup.add(leftSleeveHem);

    tShirtGroup.add(leftSleeveGroup);

    // E. Right Sleeve Group (Angled downwards and outwards)
    const rightSleeveGroup = new THREE.Group();
    rightSleeveGroup.position.set(1.08, 0.58, 0);
    rightSleeveGroup.rotation.z = 0.55;  // Corrected: Points downwards and outwards!
    rightSleeveGroup.rotation.x = 0.05;  // Slightly forward
    rightSleeveGroup.scale.set(1, 1, 0.6);

    const rightSleeveGeo = new THREE.CylinderGeometry(0.28, 0.25, 0.7, 16, 1, true);
    const rightSleeve = new THREE.Mesh(rightSleeveGeo, baseMaterial);
    rightSleeveGroup.add(rightSleeve);

    // Beautiful Cuff/Hem at Right Sleeve Opening
    const rightSleeveHemGeo = new THREE.TorusGeometry(0.255, 0.02, 8, 16);
    const rightSleeveHem = new THREE.Mesh(rightSleeveHemGeo, baseMaterial);
    rightSleeveHem.position.y = -0.35;
    rightSleeveHem.rotation.x = Math.PI / 2;
    rightSleeveGroup.add(rightSleeveHem);

    tShirtGroup.add(rightSleeveGroup);

    // F. Rib Collar (Torus ring at the sloped neck opening)
    const collarGeo = new THREE.TorusGeometry(0.35, 0.04, 12, 32);
    const collar = new THREE.Mesh(collarGeo, baseMaterial);
    collar.position.set(0, 1.12, 0);
    collar.rotation.x = Math.PI / 2;
    collar.scale.set(1.15, 1, 0.35); // Matches neck oval
    tShirtGroup.add(collar);

    // G. Bottom Torso Hem (Volumetric ring for premium realistic edge)
    const bottomHemGeo = new THREE.TorusGeometry(1.055, 0.025, 8, 32);
    const bottomHem = new THREE.Mesh(bottomHemGeo, baseMaterial);
    bottomHem.position.set(0, -1.15, 0);
    bottomHem.rotation.x = Math.PI / 2;
    bottomHem.scale.set(1.15, 1, 0.35); // Matches bottom torso oval
    tShirtGroup.add(bottomHem);

    // Center the entire group
    tShirtGroup.position.set(0, -0.1, 0);
    scene.add(tShirtGroup);

    // 8. Interaction handling (Smooth dragging & inertia)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocityY = 0.005; // Elegant passive auto-rotation speed

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      tShirtGroup.rotation.y += deltaMove.x * 0.008;
      tShirtGroup.rotation.x += deltaMove.y * 0.006;

      // Limit X axis tilt to keep realistic viewport bounds
      tShirtGroup.rotation.x = Math.max(-0.4, Math.min(0.4, tShirtGroup.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
      rotationVelocityY = 0; // Freeze auto-rotation on user contact
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 9. Fluid Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(containerRef.current);

    // 10. Animation rendering loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Slow organic idle spin
        tShirtGroup.rotation.y += rotationVelocityY;
        // Return X axis rotation slowly to horizontal rest
        tShirtGroup.rotation.x *= 0.95;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      
      renderer.dispose();
      baseTorsoGeo.dispose();
      frontPrintGeo.dispose();
      backPrintGeo.dispose();
      leftSleeveGeo.dispose();
      rightSleeveGeo.dispose();
      collarGeo.dispose();
      bottomHemGeo.dispose();
      leftSleeveHemGeo.dispose();
      rightSleeveHemGeo.dispose();
      
      baseMaterial.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
    };
  }, [frontImage, backImage]);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center bg-[#07070a]/50 select-none rounded-2xl overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10 animate-fade-in" />
      
      {/* Dynamic Instruction Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none select-none">
        <span className="font-mono text-[8px] text-white/30 tracking-[0.2em] uppercase">
          // 3D KABARTMA MODELİ
        </span>
        <span className="font-mono text-[8px] text-[#00F0FF]/60 tracking-[0.15em] uppercase flex items-center gap-1.5 bg-[#00F0FF]/5 px-2.5 py-1 rounded-md border border-[#00F0FF]/15 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping" />
          DÖNDÜRMEK İÇİN SÜRÜKLEYİN
        </span>
      </div>

      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#07070a]/90 pointer-events-none z-0" />
    </div>
  );
}
