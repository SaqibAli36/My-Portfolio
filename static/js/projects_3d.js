function create3D(id, type){
    const container = document.getElementById(id);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create object based on type
    let object;
    if(type === "cube"){
        object = new THREE.Mesh(
            new THREE.BoxGeometry(1.5,1.5,1.5),
            new THREE.MeshBasicMaterial({ color:0x00ffff, wireframe:true })
        );
    } else if(type === "sphere"){
        object = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshBasicMaterial({ color:0x00ffff, wireframe:true })
        );
    } else if(type === "cone"){
        object = new THREE.Mesh(
            new THREE.ConeGeometry(1, 2, 32),
            new THREE.MeshBasicMaterial({ color:0x00ffff, wireframe:true })
        );
    }

    scene.add(object);
    camera.position.z = 5;

    // Animate
    function animate(){
        requestAnimationFrame(animate);
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Make responsive
    window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Call the functions for each section
create3D("projects-3d", "cube");
create3D("skills-3d", "sphere");
create3D("contact-3d", "cone");
