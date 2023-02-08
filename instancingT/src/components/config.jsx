import * as THREE from 'three'
import niceColors from 'nice-color-palettes'

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(10000).fill().map(() => niceColors[2][Math.floor(Math.random() * 5)])

const WIDTH = 100
const HEIGHT = 100
const SIZE = 1
const NB_ITEMS = WIDTH * HEIGHT
const centerGroup = [(-WIDTH + SIZE) / 2, 0, (-HEIGHT + SIZE) / 2]

export { tempObject, tempColor, colors, WIDTH, HEIGHT, SIZE, NB_ITEMS, centerGroup }
