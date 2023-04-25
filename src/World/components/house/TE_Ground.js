import { Box3, Vector3 } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { setupModel } from './setupModel'

async function loadBaseGround() {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  const groundData = await gltfLoader.loadAsync('/assets/models/baseGround.glb')
  const ground = setupModel(groundData)
  ground.traverse(n => {
    if (n.isMesh) {
      if (n.material.name === 'm_none') {
        n.castShadow = false
      } else {
        n.castShadow = true
        n.receiveShadow = true
      }
    }
  })
  return { ground }

  


}

export { loadBaseGround }