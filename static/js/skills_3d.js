const sScene = new THREE.Scene();
const sCamera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / 300,
    0.1,
    1000
);
const sRenderer = new THREE.WebGLRenderer({ alpha: true });
sRenderer.setSize(window.innerWidth, 300);
document.getElementById("skills-3d").appendChild(sRenderer.domElement);

// Center sphere
const center = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x00ffff })
);
sScene.add(center);

// Orbiters with proper spacing
const orbiters = [];
const baseRadius = 3; // increased distance
for (let i = 0; i < 5; i++) {
    const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true })
    );

    const radius = baseRadius + i * 0.6;
    const yOffset = (i - 2) * 0.5; // separate vertically
    orb.position.set(radius, yOffset, 0);

    sScene.add(orb);
    orbiters.push({ mesh: orb, radius, yOffset, index: i });
}

// Camera
sCamera.position.z = 8;

function animateSkills() {
    requestAnimationFrame(animateSkills);

    orbiters.forEach(o => {
        const angle = Date.now() * 0.001 + o.index;
        o.mesh.position.x = Math.cos(angle) * o.radius;
        o.mesh.position.z = Math.sin(angle) * o.radius;
        o.mesh.position.y = o.yOffset + Math.sin(Date.now() * 0.001 + o.index) * 0.2;
    });

    sRenderer.render(sScene, sCamera);
}

animateSkills();

// Resize listener for responsiveness
window.addEventListener("resize", () => {
    sCamera.aspect = window.innerWidth / 300;
    sCamera.updateProjectionMatrix();
    sRenderer.setSize(window.innerWidth, 300);
});
