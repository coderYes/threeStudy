import './App.css'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/Addons.js'
// 导入lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

function App() {
	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
	const render = new THREE.WebGLRenderer()
	render.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(render.domElement)

	const geometry = new THREE.BoxGeometry(1, 1, 1)
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
	const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
	// 设置父元素材质为线框
	parentMaterial.wireframe = true
	let parentCube = new THREE.Mesh(geometry, parentMaterial)
	const cube = new THREE.Mesh(geometry, material)
	parentCube.add(cube)
	parentCube.position.set(-3, 0, 0)
	parentCube.rotation.x = Math.PI / 4
	cube.position.set(3, 0, 0)
	cube.scale.set(2, 2, 2)
	cube.rotation.x = Math.PI / 4

	scene.add(parentCube)

	camera.position.z = 2
	camera.position.y = 4
	camera.position.x = 4
	camera.lookAt(0, 0, 0)

	const axesHelper = new THREE.AxesHelper(2)
	scene.add(axesHelper)

	const controls = new OrbitControls(camera, render.domElement)
	controls.enableDamping = true
	controls.dampingFactor = 0.15
	controls.autoRotate = false

	function animate() {
		controls.update()
		requestAnimationFrame(animate)
		render.render(scene, camera)
	}
	animate()

	window.addEventListener('resize', () => {
		// 重置渲染器宽高比
		render.setSize(window.innerWidth, window.innerHeight)
		// 重置相机宽高比
		camera.aspect = window.innerWidth / window.innerHeight
		// 更新相机投影矩阵
		camera.updateProjectionMatrix()
	})

	let eventObj = {
		Fullscreen: function () {
			document.body.requestFullscreen()
		},
		ExitFullscreen: function () {
			document.exitFullscreen()
		},
	}

	// 创建GUI
	const gui = new GUI()
	gui.add(eventObj, 'Fullscreen')
	gui.add(eventObj, 'ExitFullscreen')
	// 控制立方体位置
	// gui.add(cube.position, 'x', -5, 5).name('立方体x轴位置')
	let folder = gui.addFolder('立方体位置')
	folder
		.add(cube.position, 'x')
		.min(-5)
		.max(5)
		.step(0.1)
		.name('立方体x轴位置')
		.onChange((val) => console.log(val))
		.onFinishChange(() => console.log('finish'))
	folder
		.add(cube.position, 'y')
		.min(-5)
		.max(5)
		.step(0.1)
		.name('立方体y轴位置')
		.onChange((val) => console.log(val))
		.onFinishChange(() => console.log('finish'))
	folder
		.add(cube.position, 'z')
		.min(-5)
		.max(5)
		.step(0.1)
		.name('立方体z轴位置')
		.onChange((val) => console.log(val))
		.onFinishChange(() => console.log('finish'))
	gui.add(parentMaterial, 'wireframe').name('父元素线框模式')

	let colorParams = {
		cubeColor: '#ff0000',
	}
	gui
		.add(colorParams, 'cubeColor')
		.name('立方体颜色')
		.onChange((val) => {
			cube.material.color.set(val)
		})
	return <></>
}

export default App
