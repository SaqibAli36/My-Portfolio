const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("reactor-container").appendChild(renderer.domElement);

/* Core Reactor Ring */
const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true
});

const reactor = new THREE.Mesh(geometry, material);
scene.add(reactor);

/* Inner Glow Sphere */
const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
const sphereMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const core = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(core);

camera.position.z = 6;

function animate() {
    requestAnimationFrame(animate);

    reactor.rotation.x += 0.01;
    reactor.rotation.y += 0.01;

    core.rotation.y -= 0.005;

    renderer.render(scene, camera);
}

animate();

/* Responsive */
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
