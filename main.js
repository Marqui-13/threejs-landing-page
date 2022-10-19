// Run using Vite localhost:3000 - done, configure gui for debugging
// commented because impoprted using cloudflare in index.html: (import * as dat from 'node_modules/dat.gui')


// Comment code to explain whats happening
// let scene, camera, renderer, gui;

// Texture Loader
//const loader = new THREE.TextureLoader();
//const cross = loader.load('https://static.vecteezy.com/system/resources/thumbnails/002/112/517/small/glow-isolated-blue-effect-lens-flare-explosion-glitter-line-sun-flash-spark-and-stars-vector.jpg');



// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);

for(let i = 0; i < particlesCnt * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))


// Materials
const material = new THREE.PointsMaterial(
  {
    size: 0.005
  }
);

const particlesMaterial = new THREE.PointsMaterial(
  {
    size: 0.005,
    color: 'blue'
    }
);



// Mesh
const sphere = new THREE.Points(geometry,material);
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(sphere, particlesMesh);


/*
 * Lights Section Starts
*/
const pointLight = new THREE.PointLight(0x2082d9, 5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/*
 * Lights Section Starts
*/


/**
 * Sizes Section Starts
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


/**
 * Renderer Section Starts
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color('#21282a'), 1)
/**
 * Renderer Section Ends
 */


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Sizes Section Ends
 */




/**
 * Camera Section Starts
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

//gui.add(camera.position, 'y').min(-5).max(10)

/**
 * Camera Section Ends
 */




// Controls
const controls = new THREE.OrbitControls(camera, canvas)
// controls.enableDamping = true



/*
 * Mouse Section Starts
*/

document.addEventListener("mousemove", animateParticles)

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
  mouseY = event.clientY;
  mouseX = event.clientX;

}

//const mouse = new THREE.Vector2();

//window.addEventListener('mousemove', (event) => {
  //mouse.x = event.clientX / sizes.width * 2 - 1;
  //mouse.y = -(event.clientY / sizes.height) * 2 + 1;


//})

/*
 * Mouse Section Ends
*/






/**
 * Animate Section Starts
 */

//const raycaster = new THREE.Raycaster();

const clock = new THREE.Clock();
// runs rapidly over and over
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = 0.5 * elapsedTime;
    particlesMesh.rotation.y = -0.1 * elapsedTime;

    if (mouseX > 0) {
    particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00008);
    particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.00008);
    }
    /* 
     * Raycaster Section Starts
    */

    //raycaster.setFromCamera(mouse, camera);
    //const intersects = raycaster.intersectObjects(objs);

    //for (const intersect of intersects) {
      //gsap.to(intersect.object.scale, {x: 1.7, y: 1.7});
      //gsap.to(intersect.object.rotation, {y: -0.5});
      //gsap.to(intersect.object.position, {z: -0.9});

    //}

    //for (const object of objs) {
      //if(!intersects.find(intersect => intersect.object === object)) {
        //gsap.to(object.scale, {x: 1, y: 1});
        //gsap.to(object.rotation, {y: 0});
        //gsap.to(object.position, {z: 0});
      //}
    //}

    /* 
     * Raycaster Section Starts
    */

    //camera.position.y = -position;

    // Update Orbital Controls
     controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
};

/**
 * Animate Section Ends
 */






/**
 * Function Call Section Starts
 */

tick();

/**
 * Function Call Section Ends
 */
