/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var scene;
var renderer;
var camera;
var axes;
var spotLightHelper;
var cube;
var body;
var rightLeg;
var leftLeg;
var rightArm;
var leftArm;
var head;
var neck;
var rightEye;
var leftEye;
var plane;
var cubeGeometry;
var bodyCubeGeometry;
var rightLegCubeGeometry;
var leftLegCubeGeometry;
var rightArmCubeGeometry;
var leftArmCubeGeometry;
var headCubeGeometry;
var neckCubeGeometry;
var rightEyeCubeGeometry;
var leftEyeCubeGeometry;
var planeGeometry;
var cubeMaterial;
var bodyCubeMaterial;
var rightLegCubeMaterial;
var leftLegCubeMaterial;
var headCubeMaterial;
var rightArmCubeMaterial;
var leftArmCubeMaterial;
var neckCubeMaterial;
var rightEyeCubeMaterial;
var leftEyeCubeMaterial;
var planeMaterial;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var humanoid;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    // setup the default renderer
    setupRenderer();
    // setup the camera
    setupCamera();
    // Add an axis helper to the scene
    axes = new AxisHelper(15);
    axes.position.x = -14.5;
    axes.position.y = 0;
    axes.position.z = -14.5;
    scene.add(axes);
    console.log("Axis Helper added to the scene");
    // Add a Plane to the Scene
    planeGeometry = new PlaneGeometry(60, 30);
    planeMaterial = new LambertMaterial({ color: 0xFFFFFF });
    plane = new Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.z = -0.789;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    console.log("Plane added to the scene");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Ambient Light add to the Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("SpotLight Light added to the Scene");
    // Create a body Cube
    bodyCubeGeometry = new CubeGeometry(3, 7, 7);
    bodyCubeMaterial = new LambertMaterial({ color: 0xeeb2f7 });
    body = new Mesh(bodyCubeGeometry, bodyCubeMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.x = 0;
    body.position.y = 10;
    body.position.z = 0;
    console.log("Body cube created");
    // Create a neck cube 
    neckCubeGeometry = new CubeGeometry(1, 2, 1);
    neckCubeMaterial = new LambertMaterial({ color: 0xffe0bd });
    neck = new Mesh(neckCubeGeometry, neckCubeMaterial);
    neck.castShadow = true;
    neck.receiveShadow = true;
    neck.position.x = 0;
    neck.position.y = 14;
    neck.position.z = 0;
    console.log("Neck cube created");
    // Create head cube 
    headCubeGeometry = new CubeGeometry(3.25, 3.25, 3.25);
    headCubeMaterial = new LambertMaterial({ color: 0xffe0bd });
    head = new Mesh(headCubeGeometry, headCubeMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.x = 0;
    head.position.y = 16.5;
    head.position.z = 0;
    console.log("Head cube created");
    // Create right eye cube
    rightEyeCubeGeometry = new CubeGeometry(0.5, 0.5, 0.5);
    rightEyeCubeMaterial = new LambertMaterial({ color: 238206179 });
    rightEye = new Mesh(rightEyeCubeGeometry, rightEyeCubeMaterial);
    rightEye.castShadow = true;
    rightEye.receiveShadow = true;
    rightEye.position.x = -1.5;
    rightEye.position.y = 17.5;
    rightEye.position.z = -0.75;
    console.log("Right eye cube created");
    // Create left eye cube
    leftEyeCubeGeometry = new CubeGeometry(0.5, 0.5, 0.5);
    leftEyeCubeMaterial = new LambertMaterial({ color: 238206179 });
    leftEye = new Mesh(leftEyeCubeGeometry, leftEyeCubeMaterial);
    leftEye.castShadow = true;
    leftEye.receiveShadow = true;
    leftEye.position.x = -1.5;
    leftEye.position.y = 17.5;
    leftEye.position.z = 0.75;
    console.log("Left eye cube created");
    // Create right leg cube
    rightLegCubeGeometry = new CubeGeometry(2, 7, 2);
    rightLegCubeMaterial = new LambertMaterial({ color: 0xffe0bd });
    rightLeg = new Mesh(rightLegCubeGeometry, rightLegCubeMaterial);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    rightLeg.position.x = 0;
    rightLeg.position.y = 4.170;
    rightLeg.position.z = -2;
    console.log("Right leg cube created");
    // Create left leg cube
    leftLegCubeGeometry = new CubeGeometry(2, 7, 2);
    leftLegCubeMaterial = new LambertMaterial({ color: 0xffe0bd });
    leftLeg = new Mesh(leftLegCubeGeometry, leftLegCubeMaterial);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    leftLeg.position.x = 0;
    leftLeg.position.y = 4.170;
    leftLeg.position.z = 2;
    console.log("Left leg cube created");
    // Create right arm cube
    rightArmCubeGeometry = new CubeGeometry(1.5, 1.5, 5);
    rightArmCubeMaterial = new LambertMaterial({ color: 0xffe0bd });
    rightArm = new Mesh(rightArmCubeGeometry, rightArmCubeMaterial);
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    rightArm.position.x = 0;
    rightArm.position.y = 12.520;
    rightArm.position.z = -5;
    console.log("Right arm cube created");
    // Create left arm cube
    leftArmCubeGeometry = new CubeGeometry(1.5, 1.5, 5);
    leftArmCubeMaterial = new LambertMaterial({ color: 0xffe0bd });
    leftArm = new Mesh(leftArmCubeGeometry, leftArmCubeMaterial);
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    leftArm.position.x = 0;
    leftArm.position.y = 12.520;
    leftArm.position.z = 5;
    console.log("Left arm cube created");
    // Add all the parts to the humanoid object
    humanoid = new THREE.Object3D();
    humanoid.add(body);
    humanoid.add(rightLeg);
    humanoid.add(leftLeg);
    humanoid.add(rightArm);
    humanoid.add(leftArm);
    humanoid.add(head);
    humanoid.add(neck);
    humanoid.add(rightEye);
    humanoid.add(leftEye);
    // Add humanoid to the Scene
    scene.add(humanoid);
    console.log("Humanoid added to the scene");
    gui = new GUI();
    // Create object of Control class by calling is augmented constructor  
    control = new Control(0, 0.02, 0, "#ffe0bd", "#006ca7", "#ffe0bd", "#ffe0bd", "#ffe0bd", "#ffe0bd", "#ffe0bd");
    addControl(control);
    console.log("Controls added to the scene");
    // Add frame rate stats
    addStatsObject();
    console.log("Frame rate stats added to the scene");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function addControl(controlObject) {
    var rotationFolder = gui.addFolder('Rotation Control');
    rotationFolder.add(controlObject, 'x_rotationSpeed', 0, 0.2).listen();
    rotationFolder.add(controlObject, 'y_rotationSpeed', 0, 0.2).listen();
    rotationFolder.add(controlObject, 'z_rotationSpeed', 0, 0.2).listen();
    rotationFolder.add(controlObject, 'resetPosition').name('Reset');
    rotationFolder.open();
    var colorFolder = gui.addFolder('Color Control');
    colorFolder.add(controlObject, 'randomColors').name('Random Colors');
    colorFolder.add(controlObject, 'resetColours').name('Reset Colors');
    colorFolder.open();
}
// update the color of the body parts of the humanoid when user clicks on random colors control
function updateCubes() {
    body.material.setValues({ color: control.colorBody });
    rightLeg.material.setValues({ color: control.colorRightLeg });
    leftLeg.material.setValues({ color: control.colorLeftLeg });
    rightArm.material.setValues({ color: control.colorRightArm });
    leftArm.material.setValues({ color: control.colorLeftArm });
    head.material.setValues({ color: control.colorHead });
    neck.material.setValues({ color: control.colorNeck });
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    humanoid.rotation.x += control.x_rotationSpeed;
    humanoid.rotation.y += control.y_rotationSpeed;
    humanoid.rotation.z += control.z_rotationSpeed;
    // Render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // Render scene
    renderer.render(scene, camera);
    updateCubes();
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
