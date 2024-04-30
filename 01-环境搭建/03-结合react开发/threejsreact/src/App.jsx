import './App.css'
import * as THREE from 'three'

function App() {
	// 创建场景
	const scene = new THREE.Scene()

	// 创建相机                                // 视角fov // 宽高比 // 近平面 // 远平面
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

	// 创建渲染器
	const render = new THREE.WebGLRenderer()
	render.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(render.domElement)

	// 创建几何体
	const geometry = new THREE.BoxGeometry(1, 1, 1)
	// 创建材质
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
	// 创建网格
	const cube = new THREE.Mesh(geometry, material)
	// 将网格添加到场景中
	scene.add(cube)
	// 设置相机位置
	camera.position.z = 5
	camera.lookAt(0, 0, 0)
	// 渲染
	function animate() {
		requestAnimationFrame(animate)
		cube.rotation.x += 0.01
		cube.rotation.y += 0.01
		render.render(scene, camera)
	}
	animate()
	return <></>
}

export default App
