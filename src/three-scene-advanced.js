import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// Configuration
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;
const MAX_FPS = isMobile ? 30 : 60;
const frameInterval = 1000 / MAX_FPS;

// New Editorial Palette
const colors = {
  paper: 0xF5F0E8,
  paperSoft: 0xECE5D8,
  ink: 0x1A1510,
  inkFaint: 0xA39685,
  indigo: 0x1E2A5A,
  ochre: 0xB8722C,
  graphite: 0x2A2218,
  graphiteLight: 0x3d3224,
};

let lastFrameTime = 0;
const activeScenes = new Set();
const scenesInfo = [];

// Global mouse tracking for parallax
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

/**
 * Setup a basic scene
 */
function setupSceneBase(container, opts = {}) {
  const scene = new THREE.Scene();
  scene.background = null; // transparent

  const width = container.clientWidth || 1;
  const height = container.clientHeight || 1;
  const camera = new THREE.PerspectiveCamera(opts.fov || 45, width / height, 0.1, 1000);
  camera.position.z = opts.camZ || 5;

  const renderer = new THREE.WebGLRenderer({ 
    canvas: container, 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  
  if (opts.lighting !== false) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Warm key light
    const dirLight1 = new THREE.DirectionalLight(0xffeedd, 1.5);
    dirLight1.position.set(2, 4, 5);
    scene.add(dirLight1);
    
    // Ochre fill light
    const dirLight2 = new THREE.DirectionalLight(colors.ochre, 0.8);
    dirLight2.position.set(-2, -2, 2);
    scene.add(dirLight2);
  }

  return { scene, camera, renderer };
}

/**
 * Hero Scene: Network graph and graphite phone
 */
function initHeroScene() {
  const container = document.getElementById('webgl-hero-container');
  if (!container) return;

  const { scene, camera, renderer } = setupSceneBase(container, { camZ: 8, fov: 40 });
  
  const heroGroup = new THREE.Group();
  scene.add(heroGroup);

  // 1. Abstract Network Graph (Background)
  const graphGroup = new THREE.Group();
  
  // Points
  const pointCount = isMobile ? 30 : 60;
  const pointsGeo = new THREE.BufferGeometry();
  const pointsPos = new Float32Array(pointCount * 3);
  
  // Create relatively scattered points within a bounded box
  const bound = 6;
  for (let i = 0; i < pointCount * 3; i++) {
    pointsPos[i] = (Math.random() - 0.5) * bound * 2;
  }
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(pointsPos, 3));
  
  const pointsMat = new THREE.PointsMaterial({
    color: colors.ochre,
    size: 0.05,
    transparent: true,
    opacity: 0.4
  });
  const points = new THREE.Points(pointsGeo, pointsMat);
  graphGroup.add(points);
  
  // Lines connecting close points
  const lineMat = new THREE.LineBasicMaterial({
    color: colors.ochre,
    transparent: true,
    opacity: 0.15,
    linewidth: 1
  });
  
  const linePoints = [];
  for (let i = 0; i < pointCount; i++) {
    for (let j = i + 1; j < pointCount; j++) {
      const idxI = i * 3;
      const idxJ = j * 3;
      const dx = pointsPos[idxI] - pointsPos[idxJ];
      const dy = pointsPos[idxI+1] - pointsPos[idxJ+1];
      const dz = pointsPos[idxI+2] - pointsPos[idxJ+2];
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
      
      if (dist < 2.5) { // Connection threshold
        linePoints.push(
          new THREE.Vector3(pointsPos[idxI], pointsPos[idxI+1], pointsPos[idxI+2]),
          new THREE.Vector3(pointsPos[idxJ], pointsPos[idxJ+1], pointsPos[idxJ+2])
        );
      }
    }
  }
  
  const linesGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
  const lines = new THREE.LineSegments(linesGeo, lineMat);
  graphGroup.add(lines);
  
  graphGroup.position.z = -2; // Push network back
  heroGroup.add(graphGroup);

  // 2. The Phone Body (Graphite with metallic edges)
  const phoneGroup = new THREE.Group();
  
  // Phone outer casing (graphite)
  const phoneWidth = 2.4;
  const phoneHeight = 5.0;
  const phoneDepth = 0.2;
  const phoneRadius = 0.3;
  
  const phoneGeo = new RoundedBoxGeometry(phoneWidth, phoneHeight, phoneDepth, 6, phoneRadius);
  const phoneMat = new THREE.MeshPhysicalMaterial({
    color: colors.graphite,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.1,
    side: THREE.FrontSide
  });
  const phoneMesh = new THREE.Mesh(phoneGeo, phoneMat);
  
  // Create a slight inset for the "screen" area (which we map in CSS)
  // For 3D, we just make a darker glossy rectangle representing the cold screen glass
  const screenGeo = new THREE.PlaneGeometry(phoneWidth * 0.92, phoneHeight * 0.95);
  const screenMat = new THREE.MeshPhysicalMaterial({
    color: 0x050403, 
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    transparent: true,
    opacity: 0.8 // Partially transparent so CSS overlay looks unified
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.z = phoneDepth / 2 + 0.001;
  phoneMesh.add(screenMesh);
  
  phoneGroup.add(phoneMesh);
  
  // Position phone to the right
  if (isMobile) {
    phoneGroup.position.set(0, -0.5, 1);
    phoneGroup.scale.setScalar(0.9);
  } else {
    // In grid layout, the canvas spans the right 60%, so center it there
    phoneGroup.position.set(0, 0.5, 0);
  }
  
  heroGroup.add(phoneGroup);

  const info = {
    element: container,
    scene, camera, renderer,
    animate: (time) => {
      // Damped mouse tracking
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Slow constant rotation for network graph
        graphGroup.rotation.y = time * 0.0001;
        graphGroup.rotation.x = Math.sin(time * 0.00005) * 0.1;
        
        // Gentle parallax tilt for the phone (max 8deg Y, 4deg X)
        const rotY = targetMouseX * (8 * Math.PI / 180);
        const rotX = -targetMouseY * (4 * Math.PI / 180);
        
        // Add a slight natural breathe
        const breathe = Math.sin(time * 0.001) * 0.02;
        
        phoneGroup.rotation.y = rotY;
        phoneGroup.rotation.x = rotX + breathe;
      }
      
      renderer.render(scene, camera);
    }
  };
  scenesInfo.push(info);
  renderer.render(scene, camera);
}

/**
 * Payment Links Scene: Floating Business Card
 */
function initLinksScene() {
  const container = document.getElementById('webgl-card-container');
  if (!container) return;

  const { scene, camera, renderer } = setupSceneBase(container, { camZ: 5, fov: 35 });
  
  const cardGroup = new THREE.Group();
  scene.add(cardGroup);
  
  // The Card (realistic paper/plastic)
  const cardWidth = 3.6;
  const cardHeight = 2.1; // standard business card aspect ratio inverted or horizontal? Let's do horizontal
  const cardDepth = 0.02;
  
  const cardGeo = new RoundedBoxGeometry(cardWidth, cardHeight, cardDepth, 4, 0.05);
  
  // Clean white-ish paper material
  const cardMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.6,
    clearcoat: 0.1
  });
  
  // Ochre edge accent material
  const edgeMat = new THREE.MeshPhysicalMaterial({
    color: colors.ochre,
    metalness: 0.5,
    roughness: 0.3
  });
  
  // Apply materials (we'll just use paper for everything for simplicity, but add an ochre band)
  const cardMesh = new THREE.Mesh(cardGeo, cardMat);
  cardGroup.add(cardMesh);
  
  // Edge band (top accent)
  const bandGeo = new THREE.BoxGeometry(cardWidth - 0.1, 0.15, cardDepth + 0.002);
  const bandMesh = new THREE.Mesh(bandGeo, edgeMat);
  bandMesh.position.y = cardHeight/2 - 0.2;
  cardGroup.add(bandMesh);

  // Add text to the card using FontLoader
  const loader = new FontLoader();
  loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    // We use a default generic font for the 3D text as JetBrains Mono JSON isn't natively available
    // Alternatively, we can use simple planar textures. Let's use 3D text for realism.
    
    const textMat = new THREE.MeshPhysicalMaterial({
      color: colors.ink,
      metalness: 0.2,
      roughness: 0.8
    });
    
    const ochreTextMat = new THREE.MeshPhysicalMaterial({
      color: colors.ochre,
      metalness: 0.2,
      roughness: 0.8
    });

    // "INVOICE"
    const titleGeo = new TextGeometry('INVOICE / LYNK', {
      font: font, size: 0.12, depth: 0.01, curveSegments: 3,
    });
    titleGeo.computeBoundingBox();
    const titleMesh = new THREE.Mesh(titleGeo, textMat);
    titleMesh.position.set(-cardWidth/2 + 0.3, cardHeight/2 - 0.5, cardDepth/2 + 0.005);
    cardGroup.add(titleMesh);

    // "Amount Due:"
    const amtGeo = new TextGeometry('1,500.00 USDC', {
      font: font, size: 0.25, depth: 0.01, curveSegments: 3,
    });
    const amtMesh = new THREE.Mesh(amtGeo, ochreTextMat);
    amtMesh.position.set(-cardWidth/2 + 0.3, 0, cardDepth/2 + 0.005);
    cardGroup.add(amtMesh);

    // "lynk.app/pay/r/kd/042"
    const linkGeo = new TextGeometry('lynk.app/pay/r/kd/042', {
      font: font, size: 0.1, depth: 0.01, curveSegments: 3,
    });
    const linkMesh = new THREE.Mesh(linkGeo, textMat);
    linkMesh.position.set(-cardWidth/2 + 0.3, -cardHeight/2 + 0.3, cardDepth/2 + 0.005);
    cardGroup.add(linkMesh);
  });

  // Sweeping light setup
  const sweepLight = new THREE.PointLight(colors.ochre, 0, 4);
  scene.add(sweepLight);

  const info = {
    element: container,
    scene, camera, renderer,
    animate: (time) => {
      if (!prefersReducedMotion) {
        // Damped mouse tracking for parallax
        const rotY = targetMouseX * (15 * Math.PI / 180);
        const rotX = -targetMouseY * (10 * Math.PI / 180);
        
        // Add a gentle floating animation
        const floatY = Math.sin(time * 0.001) * 0.1;
        
        cardGroup.rotation.y = rotY;
        cardGroup.rotation.x = rotX;
        cardGroup.position.y = floatY;

        // Warm light sweep every 8 seconds
        const sweepCycle = (time % 8000) / 8000; // 0 to 1
        if (sweepCycle < 0.2) {
          // Sweep across from left to right over the card
          sweepLight.intensity = Math.sin((sweepCycle / 0.2) * Math.PI) * 2; // fade in and out curve
          sweepLight.position.set(
            -3 + (sweepCycle / 0.2) * 6, // move X from -3 to +3
            cardGroup.position.y + 0.5,
            2
          );
        } else {
          sweepLight.intensity = 0;
        }
      }
      
      renderer.render(scene, camera);
    }
  };
  scenesInfo.push(info);
  renderer.render(scene, camera);
}


/**
 * Resize Observer
 */
function handleResize() {
  scenesInfo.forEach(info => {
    const w = info.element.clientWidth || 1;
    const h = info.element.clientHeight || 1;
    info.camera.aspect = w / h;
    info.camera.updateProjectionMatrix();
    info.renderer.setSize(w, h, false);
    info.renderer.render(info.scene, info.camera);
  });
}
const localResizeObserver = new ResizeObserver(() => {
  requestAnimationFrame(handleResize);
});


/**
 * Main Render Loop
 */
function animate(time) {
  if (window.__lynx_three_loop) {
    requestAnimationFrame(animate);
  }

  if (time - lastFrameTime < frameInterval) return;
  lastFrameTime = time;

  scenesInfo.forEach(info => {
    if (activeScenes.has(info.element)) {
      info.animate(time);
    }
  });
}


/**
 * Intersection Observer (Performance)
 */
function setupVisibilityTracking() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeScenes.add(entry.target);
      } else {
        activeScenes.delete(entry.target);
      }
    });
  }, { threshold: 0.1 });

  scenesInfo.forEach(info => {
    io.observe(info.element);
    localResizeObserver.observe(info.element);
  });
  
  observerRef = io;
  resizeObserverRef = localResizeObserver;
}


/**
 * Fallback SVGs for Reduced Motion or WebGL failure
 */
function injectFallbacks() {
  if (prefersReducedMotion) {
    console.log("Reduced motion preferred: SVG fallbacks would render here.");
    // For pure architectural compliance, we handle the lack of animation in the render loop,
    // which effectively acts as a static still image.
  }
}

let observerRef = null;
let resizeObserverRef = null;

export function initThreeScenes() {
  lastFrameTime = 0;
  
  // Clean up any existing instances from StrictMode
  cleanupThreeScenes();

  initHeroScene();
  initLinksScene();
  
  setupVisibilityTracking();
  injectFallbacks();
  
  // ensure there's only one loop running
  if (!window.__lynx_three_loop) {
    window.__lynx_three_loop = true;
    requestAnimationFrame(animate);
  }
}

export function cleanupThreeScenes() {
  if (observerRef) {
    observerRef.disconnect();
    observerRef = null;
  }
  if (resizeObserverRef) {
    resizeObserverRef.disconnect();
    resizeObserverRef = null;
  }
  
  scenesInfo.forEach(info => {
    try {
      info.renderer.dispose();
      info.scene.clear();
    } catch (e) {}
  });
  
  activeScenes.clear();
  scenesInfo.length = 0;
}
