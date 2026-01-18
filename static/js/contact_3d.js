const cScene = new THREE.Scene();
const cCamera = new THREE.PerspectiveCamera(60, window.innerWidth/300, 0.1, 1000);
const cRenderer = new THREE.WebGLRenderer({ alpha: true });

cRenderer.setSize(window.innerWidth, 300);
document.getElementById("contact-3d").appendChild(cRenderer.domElement);

const pyramidGeo = new THREE.ConeGeometry(1, 2, 4);
const pyramidMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true
});

const pyramid = new THREE.Mesh(pyramidGeo, pyramidMat);
cScene.add(pyramid);

cCamera.position.z = 5;

function animateContact(){
    requestAnimationFrame(animateContact);
    pyramid.rotation.y += 0.01;
    cRenderer.render(cScene, cCamera);
}
animateContact();
