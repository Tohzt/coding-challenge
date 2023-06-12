import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function rad2deg(radians) {
  let degrees = radians * (180 / Math.PI);
  return Math.floor(degrees)
}

function areActorsFacingEachOther(player, enemy) {
  let player_opp = (rad2deg(player.rotation.y) + 180) % 360
  if (rad2deg(enemy.rotation.z) == player_opp) {
    enemy.position.y += 0.5;
    
    const position = new THREE.Vector3();
    position.setFromMatrixPosition(enemy.matrixWorld);
    console.log("Enemy Position: ", position)
  }
}

export default class SceneInit {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.scene = undefined;
    this.camera = undefined;
    this.controls = undefined;
    this.renderer = undefined;
  }

  initialize() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(10, 10, 10);
    this.scene = new THREE.Scene();
    
    const canvas = document.getElementById(this.canvasId);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    this.scene.add(new THREE.GridHelper(30))

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    const sceneChildren = this.scene.children;
    const childrenMap = {};
    let player, enemy;
    for (let i = 0; i < sceneChildren.length; i++) {
      if (sceneChildren[i].type == "Player")
        player = sceneChildren[i];
      if (sceneChildren[i].type == "Enemy")
        enemy = sceneChildren[i];
    }
    
    if (player && enemy) {
      player.rotation.y += .025
      areActorsFacingEachOther(player, enemy)
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
  

