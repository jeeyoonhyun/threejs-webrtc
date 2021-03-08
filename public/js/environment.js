let myMesh;
let stars = [];
let star;
let max = 500; 
let min = -500;

function createEnvironment(scene) {
  console.log("Adding environment");

  const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
  pointLight.position.set( 0,0,0 );
  scene.add( pointLight );

  // let texture = new THREE.TextureLoader().load("../assets/texture.png");
  let myGeometry = new THREE.SphereGeometry(3, 12, 12);
  let myMaterial = new THREE.MeshToonMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  myMesh = new THREE.Mesh(myGeometry, myMaterial);
  myMesh.position.set(5, 2, 5);
  scene.add(myMesh);

  //floating planes
  const starGeo = new THREE.PlaneGeometry(  Math.random() * 3, 0.02, 1 );
  for (let i=0; i<1000; i++) {
    star = new THREE.Mesh( starGeo, myMaterial );
    star.position.set(Math.random() * (max - min) + min, Math.random() * 8, -Math.random() * max);
    scene.add( star );
    stars.push(star);
  }
  
}


function updateEnvironment(scene) {
  myMesh.position.x += 0.01;
}