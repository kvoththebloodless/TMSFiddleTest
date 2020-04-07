let camera, scene, renderer, clock, rightArm;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.set(2, 2, -2);

  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
  light.position.set(0, 1, 0);
  scene.add(light);

  // model
  const loader = new THREE.GLTFLoader();
  loader.load(
    "https://drive.google.com/a/g.rit.edu/file/d/17DViKALHEoh4yFE1PkwzW7SkXyeZJcxj/view?usp=sharing",
    function(gltf) {
      const model = gltf.scene;
      /*  gltf.scene.traverse(child => {
       if (child.material) {
       child.material=new THREE.MeshStandardMaterial( {
    color: 0xff3333, // red
    flatShading: true,
      } );
      child.material.skinning = true;
    }})
        
        rightArm = model.getObjectByName( 'mixamorigRightArm' ); */

      scene.add(model);
    }
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.update();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  /* 	
	const t = clock.getElapsedTime();
	
	if ( rightArm ) {
	
	  rightArm.rotation.z += Math.sin( t ) * 0.005;
	    
	
	} */

  renderer.render(scene, camera);
}
