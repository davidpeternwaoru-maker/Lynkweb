import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function initThreeScenes() {
  initHero();
  initSteps();
  initCoin();
}

function initHero() {
  const sceneEl = document.getElementById('hero-scene');
  const webglEl = document.getElementById('webgl-hero-container');
  const cssEl = document.getElementById('css-hero-container');
  const uiEl = document.getElementById('phone-ui');
  
  if (!sceneEl || !webglEl || !cssEl || !uiEl) return;
  
  const width = sceneEl.clientWidth;
  const height = sceneEl.clientHeight;
  
  const scene = new THREE.Scene();
  const cssScene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
  camera.position.set(0, 0, 900);
  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  webglEl.appendChild(renderer.domElement);
  
  const cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(width, height);
  cssEl.appendChild(cssRenderer.domElement);
  
  // Phone Dimensions (to match UI exactly)
  const phoneW = 320;
  const phoneH = 680;
  const phoneD = 24; 
  
  uiEl.style.opacity = '1';
  uiEl.style.visibility = 'visible'; 
  const cssObj = new CSS3DObject(uiEl);
  cssObj.position.set(0, 0, phoneD / 2 + 1);
  cssScene.add(cssObj);
  
  const geometry = new RoundedBoxGeometry(phoneW + 16, phoneH + 16, phoneD, 8, 24);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.15,
    roughness: 0.2,
    transmission: 0.1,
    thickness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  const phoneMesh = new THREE.Mesh(geometry, material);
  scene.add(phoneMesh);

  // Decorative floating objects
  const bgSphere = new THREE.Mesh(
    new THREE.SphereGeometry(150, 64, 64),
    new THREE.MeshStandardMaterial({ color: 0x00A884, roughness: 0.3, metalness: 0.1 })
  );
  bgSphere.position.set(-300, 150, -300);
  scene.add(bgSphere);

  const bgTorus = new THREE.Mesh(
    new THREE.TorusGeometry(120, 30, 32, 64),
    new THREE.MeshStandardMaterial({ color: 0xE8F7F2, roughness: 0.4 })
  );
  bgTorus.position.set(350, -200, -250);
  scene.add(bgTorus);
  
  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(100, 300, 400);
  scene.add(dirLight);
  const pointLight = new THREE.PointLight(0x00A884, 1.5, 800);
  pointLight.position.set(-200, -100, 300);
  scene.add(pointLight);
  
  // Resize handler
  const resizeObserver = new ResizeObserver(() => {
    const w = sceneEl.clientWidth;
    const h = sceneEl.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    cssRenderer.setSize(w, h);
  });
  resizeObserver.observe(sceneEl);

  const clock = new THREE.Clock();
  let mouseX = 0; let mouseY = 0;
  
  sceneEl.addEventListener('mousemove', (e) => {
    const rect = sceneEl.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / sceneEl.clientWidth) * 2 - 1;
    mouseY = -((e.clientY - rect.top) / sceneEl.clientHeight) * 2 + 1;
  });
  sceneEl.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    
    const floatY = Math.sin(t * 1.5) * 15;
    const floatRotX = Math.sin(t * 1.0) * 0.05;
    const floatRotY = Math.cos(t * 0.8) * 0.05;
    
    // Smooth target tracking
    const targetRotX = mouseY * 0.15 + floatRotX;
    const targetRotY = mouseX * 0.25 + floatRotY - 0.25; // default tilt to left slightly
    
    phoneMesh.position.y = floatY;
    cssObj.position.y = floatY;
    
    phoneMesh.rotation.x += (targetRotX - phoneMesh.rotation.x) * 0.05;
    phoneMesh.rotation.y += (targetRotY - phoneMesh.rotation.y) * 0.05;
    cssObj.rotation.x = phoneMesh.rotation.x;
    cssObj.rotation.y = phoneMesh.rotation.y;
    cssObj.rotation.z = phoneMesh.rotation.z;

    bgSphere.position.y = 150 + Math.sin(t * 2) * 30;
    bgTorus.rotation.x = t * 0.3;
    bgTorus.rotation.y = t * 0.2;
    
    renderer.render(scene, camera);
    cssRenderer.render(cssScene, camera);
  }
  animate();
}

function initSteps() {
  const steps = [
    { id: 'step1-scene', type: 'node' },
    { id: 'step2-scene', type: 'exchange' },
    { id: 'step3-scene', type: 'speed' }
  ];
  
  steps.forEach((stepConf) => {
    const el = document.getElementById(stepConf.id);
    if (!el) return;
    
    const width = el.clientWidth || 300;
    const height = el.clientHeight || 140;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFAFAF7); 
    
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 10;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);
    
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(2, 5, 5);
    scene.add(dir);
    
    const objects = [];
    
    if (stepConf.type === 'node') {
      const geo = new THREE.IcosahedronGeometry(1.5, 2);
      const mat = new THREE.MeshStandardMaterial({ color: 0x00A884, wireframe: true });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      objects.push(mesh);
      
      const geo2 = new THREE.IcosahedronGeometry(0.8, 2);
      const mat2 = new THREE.MeshStandardMaterial({ color: 0x00A884, roughness: 0.2 });
      const mesh2 = new THREE.Mesh(geo2, mat2);
      scene.add(mesh2);
      objects.push({ animate: (t) => {
        mesh2.rotation.x = -t * 0.5;
        mesh2.rotation.y = -t * 0.3;
      }});
    } 
    else if (stepConf.type === 'exchange') {
      const geo = new THREE.TorusGeometry(1.2, 0.3, 32, 64);
      const mat = new THREE.MeshStandardMaterial({ color: 0x0A0A0A, roughness: 0.4 });
      const t1 = new THREE.Mesh(geo, mat);
      t1.position.x = -0.6;
      scene.add(t1);
      
      const mat2 = new THREE.MeshStandardMaterial({ color: 0x00A884, roughness: 0.4 });
      const t2 = new THREE.Mesh(geo, mat2);
      t2.position.x = 0.6;
      scene.add(t2);
      
      objects.push({ animate: (t) => {
        t1.rotation.y = t * 1.2;
        t1.rotation.x = Math.sin(t) * 0.5;
        t2.rotation.y = -t * 1.2;
        t2.rotation.x = Math.cos(t) * 0.5;
      }});
    }
    else if (stepConf.type === 'speed') {
      const geo = new THREE.CapsuleGeometry(0.6, 1.2, 32, 32);
      const mat = new THREE.MeshPhysicalMaterial({ color: 0x00A884, roughness: 0.1, metalness: 0.5, clearcoat: 1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = Math.PI / 2;
      scene.add(mesh);
      
      for(let i=0; i<8; i++) {
        const lineGeo = new THREE.BoxGeometry(2, 0.04, 0.04);
        const lineMat = new THREE.MeshBasicMaterial({ color: 0x00A884, transparent: true, opacity: 0.4 });
        const line = new THREE.Mesh(lineGeo, lineMat);
        const yPos = (Math.random()-0.5)*2.5;
        const zPos = (Math.random()-0.5)*2.5;
        scene.add(line);
        objects.push({ animate: (t) => {
          line.position.set( ( (t*8 + i*1.5) % 8 ) - 4, yPos, zPos );
        }});
      }
      
      objects.push({ animate: (t) => {
         mesh.position.y = Math.sin(t*10) * 0.15;
      }});
    }
    
    const resizeObserver = new ResizeObserver(() => {
      if(el.clientWidth === 0) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    });
    resizeObserver.observe(el);

    const clock = new THREE.Clock();
    function render() {
      requestAnimationFrame(render);
      const t = clock.getElapsedTime();
      
      objects.forEach(obj => {
         if(obj.animate) obj.animate(t);
         else if(obj.isMesh) {
           obj.rotation.x = t * 0.5;
           obj.rotation.y = t * 0.8;
         }
      });
      renderer.render(scene, camera);
    }
    render();
  });
}

function initCoin() {
  const canvas = document.getElementById('price-coin-canvas');
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const width = canvas.clientWidth || 300;
  const height = canvas.clientHeight || 300;
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.z = 10;
  
  const geo = new THREE.CylinderGeometry(2.8, 2.8, 0.4, 64);
  geo.rotateX(Math.PI / 2);
  const mat = new THREE.MeshPhysicalMaterial({ 
    color: 0x00A884, 
    metalness: 0.7, 
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  const coin = new THREE.Mesh(geo, mat);
  scene.add(coin);
  
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const dir = new THREE.DirectionalLight(0xffffff, 2.5);
  dir.position.set(5, 5, 5);
  scene.add(dir);
  const dir2 = new THREE.DirectionalLight(0x00A884, 1.5);
  dir2.position.set(-5, -5, -5);
  scene.add(dir2);
  
  const clock = new THREE.Clock();
  function render() {
    requestAnimationFrame(render);
    const t = clock.getElapsedTime();
    coin.rotation.y = t * 2;
    coin.position.y = Math.sin(t * 3) * 0.4;
    renderer.render(scene, camera);
  }
  render();
}
