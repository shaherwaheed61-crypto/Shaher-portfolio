"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type View = "isometric" | "front" | "top";
type Props = { modelSrc: string; projectTitle: string; projectLocation: string };

export function NiqatModelViewer({ modelSrc, projectTitle, projectLocation }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sizeRef = useRef({ span: 50, height: 17 });
  const [status, setStatus] = useState("Loading 3D model…");
  const [ready, setReady] = useState(false);
  const [activeView, setActiveView] = useState<View>("isometric");

  const setView = (view: View) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const { span, height } = sizeRef.current;
    const distance = span * 1.55;
    const targetY = height * .45;
    controls.target.set(0, targetY, 0);
    camera.up.set(0, view === "top" ? 0 : 1, view === "top" ? -1 : 0);
    if (view === "top") camera.position.set(0, distance, .01);
    else if (view === "front") camera.position.set(0, targetY + height * .28, distance);
    else camera.position.set(distance * .73, targetY + height * 1.5, distance * .8);
    camera.lookAt(controls.target);
    controls.update();
    setActiveView(view);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    setStatus("Loading 3D model…");
    setReady(false);
    setActiveView("isometric");
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setStatus("3D preview needs a browser with WebGL enabled.");
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c1012");
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 1000);
    cameraRef.current = camera;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = .075;
    controls.minDistance = 9;
    controls.maxDistance = 220;
    controlsRef.current = controls;

    scene.add(new THREE.HemisphereLight(0xdce7ed, 0x36302d, 2.1));
    const sun = new THREE.DirectionalLight(0xffedd9, 3.2);
    sun.position.set(30, 65, 40);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x9cbac9, 1.4);
    fill.position.set(-30, 24, -25);
    scene.add(fill);
    const grid = new THREE.GridHelper(90, 22, 0x856448, 0x263038);
    grid.position.y = -.08;
    scene.add(grid);

    let disposed = false;
    let frame = 0;
    let model: THREE.Group | null = null;
    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Decoder initialization belongs in the browser, alongside the WebGL viewer.
    void import("three/examples/jsm/libs/meshopt_decoder.module.js").then(({ MeshoptDecoder }) => {
      if (disposed) return;
      new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(
        modelSrc,
        (gltf) => {
          if (disposed) return;
          model = gltf.scene;
          model.rotation.x = -Math.PI / 2;
          model.updateMatrixWorld(true);
          const bounds = new THREE.Box3().setFromObject(model);
          const center = bounds.getCenter(new THREE.Vector3());
          const size = bounds.getSize(new THREE.Vector3());
          model.position.set(-center.x, -bounds.min.y, -center.z);
          scene.add(model);
          sizeRef.current = { span: Math.max(size.x, size.z), height: size.y };
          sizeRef.current.span = Math.max(sizeRef.current.span, size.y);
          camera.near = Math.max(sizeRef.current.span / 1000, .01);
          camera.far = sizeRef.current.span * 30;
          camera.updateProjectionMatrix();
          controls.minDistance = sizeRef.current.span * .08;
          controls.maxDistance = sizeRef.current.span * 6;
          grid.scale.setScalar(Math.max(size.x, size.z) / 60);
          const distance = sizeRef.current.span * 1.55;
          controls.target.set(0, size.y * .45, 0);
          camera.position.set(distance * .73, size.y * 1.95, distance * .8);
          camera.lookAt(controls.target);
          controls.update();
          setStatus("");
          setReady(true);
        },
        undefined,
        () => { if (!disposed) setStatus("The model could not load. Please refresh and try again."); },
      );
    }).catch(() => {
      if (!disposed) setStatus("The model could not load. Please refresh and try again.");
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((material) => material.dispose());
          }
        });
      }
      renderer.dispose();
      grid.geometry.dispose();
      (Array.isArray(grid.material) ? grid.material : [grid.material]).forEach((material) => material.dispose());
      renderer.domElement.remove();
      cameraRef.current = null;
      controlsRef.current = null;
    };
  }, [modelSrc]);

  return (
    <div className="niqat-viewer">
      <div className="niqat-viewer-canvas" ref={mountRef} role="img" aria-label={`Interactive 3D architectural model of ${projectTitle} in ${projectLocation}. Drag to rotate, scroll to zoom, right drag to pan.`} />
      {status && <div className="niqat-viewer-status" role="status">{status}</div>}
      <div className="niqat-viewer-top"><span>{projectTitle} / {projectLocation}</span><span>Geometry preview</span></div>
      <div className="niqat-viewer-bottom">
        <div className="niqat-viewer-tabs" aria-label="Camera views">
          {(["isometric", "front", "top"] as View[]).map((view) => <button key={view} type="button" disabled={!ready} className={activeView === view ? "active" : ""} onClick={() => setView(view)} aria-pressed={activeView === view}>{view}</button>)}
        </div>
        <p>Drag to rotate · Scroll to zoom · Right drag to pan</p>
      </div>
    </div>
  );
}
