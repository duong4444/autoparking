import { MeshProps } from '@react-three/fiber'
import { yellowColor,roadColor } from '../util/constants'

export interface SquareProps extends MeshProps {
  position: [number, number, number]
  size?: [number, number]
  borderColor?: string
}

// mesh là một đối tượng 3D cơ bản gồm:
// Hình dạng (geometry) – ví dụ: hình hộp, hình cầu, mặt phẳng…
// Chất liệu (material) – định nghĩa màu sắc, texture, độ bóng, trong suốt…
// Nói đơn giản: mesh = geometry + material, và nó là thứ sẽ được hiển thị trong cảnh 3D.


// geometry: như khung xương , material: như lớp da , mesh là toàn bộ mô hình hoàn chỉnh 

export const Square: React.FC<SquareProps> = ({
  position,
  size = [5, 3],
  borderColor = yellowColor,
  ...props
}) => {
  const halfWidth = size[0] / 2
  const halfLength = size[1] / 2
  const borderThickness = 0.2

  return (
    <>
      {/* Top border */}
      <mesh
        position={[
          position[0],
          position[1],
          position[2] + halfLength - borderThickness / 2,
        ]}
        {...props}
      >
        <boxGeometry args={[size[0], borderThickness, borderThickness]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* Bottom border */}
      <mesh
        position={[
          position[0],
          position[1],
          position[2] - halfLength + borderThickness / 2,
        ]}
        {...props}
      >
        <boxGeometry args={[size[0], borderThickness, borderThickness]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* Left border */}
      <mesh
        position={[
          position[0] - halfWidth + borderThickness / 2,
          position[1],
          position[2],
        ]}
        {...props}
      >
        <boxGeometry
          args={[
            borderThickness,
            borderThickness,
            size[1] - 2 * borderThickness,
          ]}
        />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* Right border */}
      <mesh
        position={[
          position[0] + halfWidth - borderThickness / 2,
          position[1],
          position[2],
        ]}
        {...props}
      >
        <boxGeometry
          args={[
            borderThickness,
            borderThickness,
            size[1] - 2 * borderThickness,
          ]}
        />
        <meshBasicMaterial color={borderColor} />
      </mesh>
    </>
  )
}
