var container;
var camera, scene, renderer;
var uniforms;
var startTime;

init();
animate();

function init() {
  container = document.getElementById('container');

  startTime = Date.now();
  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(16, 9);

  uniforms = {
    iGlobalTime: { type: "f", value: 1.0 },
    iResolution: { type: "v2", value: new THREE.Vector2() }
  };

  var material = new THREE.ShaderMaterial( {

    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent

  } );

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  container.appendChild(renderer.domElement);

  onWindowResize();

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(event) {
  uniforms.iResolution.value.x = window.innerWidth;
  uniforms.iResolution.value.y = window.innerHeight;

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var currentTime = Date.now();
  uniforms.iGlobalTime.value = (currentTime - startTime) * 0.001;
  renderer.render(scene, camera);
}