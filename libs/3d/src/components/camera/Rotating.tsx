import { useRef, useState } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'

import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

export const RotatingCamera = ({
  speed = 0.003, // càng lớn camera quay càng nhanh quanh tâm
  minFov = 30, // FOV: góc nhìn của camera -> nhỏ hơn thì zoom vào,lớn hơn thì thu nhiều cảnh hơn
  maxFov = 60,
  radius = 80,  // bk quỹ đạo quay , lớn => xa tâm hơn
}) => {
  // góc hiện tại của camera trên quỹ đạo tròn
  const [angle, setAngle] = useState(() => MathUtils.randInt(0, radius))
  // góc nhìn hiện tại của camera
  const [fov, setFov] = useState(() => MathUtils.randInt(minFov, maxFov))

  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useFrame((state, delta) => {
    if (cameraRef.current) {
      // cập nhật góc quay ,tăng angle mỗi frame để quay tròn
      setAngle((prevAngle) => (prevAngle + speed) % (2 * Math.PI))

      // Tính vị trí mới dựa trên góc , tính toạ độ mới , y cố định
      cameraRef.current.position.x = radius * Math.sin(angle)
      cameraRef.current.position.z = radius * Math.cos(angle)
      cameraRef.current.position.y = 200

      // luôn nhìn về điểm(1,0,1)
      cameraRef.current.lookAt(1, 0, 1)

      // hiệu ứng zoom in/out (dao động FOV)
      // tính biên độ dao động , Math.sin để tạo sóng lên xuống -> fov dao động giữa minFov và maxFov
      const amplitude = (maxFov - minFov) / 2
      const oscillationSpeed = 0.05
      setFov(
        minFov +
          amplitude +
          Math.sin(state.clock.elapsedTime * oscillationSpeed) * amplitude,
      )
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault // biến camera này thành camera mặc định của scene
        fov={fov}
        near={0.1}
        far={1000}
        position={[0, 100, 0]}
      />
    </>
  )
}
