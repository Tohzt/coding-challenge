import { useEffect } from 'react';
import * as THREE from 'three';
import SceneInit from './sceneInit';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}

function Home() {
  useEffect(() => {
    const tjs = new SceneInit('ThreeJsCanvas');
    tjs.initialize();
    tjs.animate()

    // Human
    const assetLoader = new GLTFLoader();
    const playerUrl = new URL('../assets/Player.glb', import.meta.url)
    let player, enemy, enemy2;
    assetLoader.load(playerUrl.href, function(gltf) {
      player = gltf.scene;
      player.position.set(0,0,0)
      player.type = "Player";
      tjs.scene.add(player);
    }, undefined, function(err) {
      console.error(err);
    });
    const enemyUrl = new URL('../assets/Enemy.glb', import.meta.url)
    assetLoader.load(enemyUrl.href, function(gltf) {
      enemy = gltf.scene;
      enemy.position.set(0,0,-5)
      enemy.rotation.y = deg2rad(0)
      enemy.type = "Enemy";
      tjs.scene.add(enemy);
    }, undefined, function(err) {
      console.error(err);
    });
  }, []);

  return (
    <div>
      <canvas id="ThreeJsCanvas" />
    </div>
  );
}

export default Home;
