import { CanvasTexture, Euler, Vector3 } from 'three'
import { radians } from '../util'
import { useMemo } from 'react'
import { roadColor } from '../util/constants'

export const GradientPlane = ({
  position,
  rotation = new Euler(radians(-90), 0, 0),
  size,
}: {
  position: Vector3
  size: [number, number]
  rotation?: Euler
}) => {
  // tạo texture 1 lần duy nhất khi cpn mount để tối ưu hiệu suất
  const texture = useMemo(() => {
    // tạo canvas 2d 256x256 pixel
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Failed to get canvas 2D context')
    }

    // tạo gradient x=0 -> x=256
    const gradient = ctx.createLinearGradient(0, 0, 256, 0)
    gradient.addColorStop(0, 'gray')
    gradient.addColorStop(1, roadColor)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
    // chuyển canvas thành texture có thể sử dụng trong 3.js
    return new CanvasTexture(canvas)
  }, [])

  return (
    <mesh position={position} rotation={rotation}>
      {/* mp vs kích thước từ size truyền vào */}
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
