let myMesh;
let stars = [];
let star;
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

  let planetTexture = new THREE.TextureLoader().load("../assets/texture.png");
  const planetMaterial = new THREE.MeshBasicMaterial( { map: planetTexture } );

  let myGeometry = new THREE.SphereGeometry(100, 12, 12);

  let myMaterial = new THREE.MeshToonMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  myMesh = new THREE.Mesh(myGeometry, planetMaterial);
  myMesh.position.set(0, 0, -1000);
  scene.add(myMesh);


  //floating planes
  // path = new CustomSinCurve( 10 );
  // const starGeo = new THREE.TubeGeometry( path, 4, 0.1, 3, false );
  // const starGeo = new THREE.PlaneGeometry(  Math.random() * 3, 0.02, 1 );
  const starGeo = new THREE.SphereGeometry(Math.random(), 0.02, 1);
  for (let i=0; i<1000; i++) {
    star = new THREE.Mesh( starGeo, myMaterial );
    star.position.set(Math.random() * (max - min) + min, Math.random() * 8, -Math.random() * max);
    scene.add( star );
    stars.push(star);
  }
  
}


function updateEnvironment(scene) {
  myMesh.position.z -= 0.01;
}