let myMesh;
let stars = [];
let star;
let tex = [];
let geo = [];
let landmark;
let max = 500; 
let min = -500;
let path;

class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 0.3 - 0.15;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}

function createEnvironment(scene) {
  console.log("Adding environment");

  const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
  pointLight.position.set( 0,200,-1000 );
  scene.add( pointLight );

  //landmarks
  let planetTexture = new THREE.TextureLoader().load("../assets/texture0.png");
  const planetMaterial = new THREE.MeshBasicMaterial( { map: planetTexture } );
  geo.push(new THREE.TorusGeometry( Math.random()*50, 3, 6, 16));
  geo.push(new THREE.SphereGeometry(Math.random()*100, 12, 12));

  for (let i=0; i<3; i++) {
    let planetTexture = new THREE.TextureLoader().load(`../assets/texture${i}.png`);
    tex.push(new THREE.MeshBasicMaterial( { map: planetTexture } ))
  }


  for (let i=0; i<20; i++) {
    landmark = new THREE.Mesh(geo[Math.floor(Math.random() * geo.length)], tex[Math.floor(Math.random() * tex.length)]);
    landmark.position.set(Math.random() * (max*4 - min*4) + min, Math.random() * 32, -Math.random() * max*4);
    // landmark.rotation.set(new THREE.Vector3( Math.random() * Math.PI / 2, Math.random() * Math.PI / 2, Math.random() * Math.PI / 2));
    scene.add(landmark);
  }

  //floating planes
  // path = new CustomSinCurve( 10 );
  // const starGeo = new THREE.TubeGeometry( path, 4, 0.1, 3, false );
  // const starGeo = new THREE.PlaneGeometry(  Math.random() * 3, 0.02, 1 );
  let myMaterial = new THREE.MeshToonMaterial({ color: 0xffffff });
  const starGeo = new THREE.SphereGeometry(Math.random()/2, 0.02, 1);
  for (let i=0; i<1000; i++) {
    star = new THREE.Mesh( starGeo, myMaterial );
    star.position.set(Math.random() * (max - min) + min, Math.random() * 32, -Math.random() * max);
    scene.add( star );
    stars.push(star);
  }
  
}


function updateEnvironment(scene) {
  // landmark.position.z -= 0.01;
  //show distance
  // document.getElementById("distance").innerHTML = glScene.playerGroup.position.distanceTo(clients[Object.keys(clients)[0]].desiredPosition);
}