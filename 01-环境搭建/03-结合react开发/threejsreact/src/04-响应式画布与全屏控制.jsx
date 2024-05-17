import './App.css'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/Addons.js'

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
	const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
	// 创建网格
	let parentCube = new THREE.Mesh(geometry, parentMaterial)
	const cube = new THREE.Mesh(geometry, material)
	parentCube.add(cube)
	parentCube.position.set(-3, 0, 0)
	// 父元素缩放子元素也跟着缩放，然后才是子元素的缩放
	// parentCube.scale.set(2, 2, 2)
	// 父元素旋转子元素也跟着旋转，然后才是子元素的旋转
	parentCube.rotation.x = Math.PI / 4

	// 设置网格位置
	// cube.position.x = 2
	// cube.position.y = 4
	// cube.position.z = 4
	cube.position.set(3, 0, 0)
	// 设置立方体的放大
	cube.scale.set(2, 2, 2)
	// 绕着x轴旋转
	cube.rotation.x = Math.PI / 4

	// 将网格添加到场景中
	scene.add(parentCube)

	// 设置相机位置
	camera.position.z = 2
	camera.position.y = 4
	camera.position.x = 4

	camera.lookAt(0, 0, 0)

	// 添加世界坐标辅助器
	const axesHelper = new THREE.AxesHelper(2)
	scene.add(axesHelper)

	// 添加轨道控制器
	const controls = new OrbitControls(camera, render.domElement)
	// 设置带阻尼惯性
	controls.enableDamping = true
	// 设置阻尼系数
	controls.dampingFactor = 0.15
	// 设置自动旋转
	controls.autoRotate = false

	// 渲染
	function animate() {
		controls.update()
		requestAnimationFrame(animate)
		// cube.rotation.x += 0.01
		// cube.rotation.y += 0.01
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

	const fullScreen = () => {
		// render.domElement.requestFullscreen()
		document.body.requestFullscreen()
	}

	const exitfullScreen = () => {
		document.exitFullscreen()
	}

	return (
		<>
			<div style={{ color: '#ffffff' }} onClick={fullScreen}>
				点击全屏
			</div>

			<div style={{ color: '#ffffff' }} onClick={exitfullScreen}>
				退出全屏
			</div>
		</>
	)
}

export default App
