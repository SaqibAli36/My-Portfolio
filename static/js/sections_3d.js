// Loader
const loader = new THREE.GLTFLoader();

// Generic function to load a 3D model in a section
function loadModel(containerId, modelPath, infoArray) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    let model;
    loader.load(modelPath, function(gltf){
        model = gltf.scene;
        model.scale.set(0.5,0.5,0.5);
        scene.add(model);
    });

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        if(model) model.rotation.y += 0.005; // slow spin
        renderer.render(scene, camera);
    }
    animate();

    // Update info box dynamically
    const infoBox = container.nextElementSibling;
    infoBox.innerHTML = "<ul>" + infoArray.map(i=>`<li>${i}</li>`).join('') + "</ul>";

    // Responsive
    window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Call sections with models and info
loadModel("projects-3d", "{{ url_for('static', filename='assets/models/helicopter.glb') }}", [
    "AI Voice Assistant",
    "5-Mic Voice Chat App",
    "Cybersecurity Tools"
]);

loadModel("skills-3d", "{{ url_for('static', filename='assets/models/tank.glb') }}", [
    "Python / Flask",
    "JavaScript / Three.js",
    "Cybersecurity"
]);

loadModel("contact-3d", "{{ url_for('static', filename='assets/models/ironman.glb') }}", [
    "Email: saqib@example.com",
    "GitHub: github.com/saqibali"
]);
