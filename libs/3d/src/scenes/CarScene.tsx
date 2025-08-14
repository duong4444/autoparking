import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei';
import { radians } from '../util';
import { Spawner } from '../components/Spawner';
import {
  WORLD_DURATION,
  WORLD_END,
  WORLD_START,
  roadColor,
} from '../util/constants';
import * as THREE from 'three';
import { Square } from '../components/Square';
import { Car } from '../components/Car';
import { Building } from '../components/Building';
import { BuildingSet } from '../components/BuildingSet';

export const CarScene = ({
  children,
  camera,
  className = 'h-[calc(100vh-2rem)]',
  orbitControls = true,
  hideAllComments = false,
}: {
  camera?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  orbitControls?: boolean;
  hideAllComments?: boolean;
}) => {
  // AuthLayout call:
  // <CarScene
  //     orbitControls={false}
  //     camera={<RotatingCamera />}
  //     hideAllComments
  //   />

  return (
    // Canvas tạo khung WebGL để render cảnh 3D
    <Canvas
      style={{
        background:
          'linear-gradient(to top right, hsl(184, 98%, 50%), hsl(213 98% 50%))',
      }}
    >
      {camera || (
        <PerspectiveCamera
          makeDefault
          fov={45} // field of view 45 độ
          near={0.1} // kcach gan nhat ma camera co the thay
          far={1000} // kcach xa nhat ma camera co the thay
          position={[40, 200, 40]} // x-y-z toạ độ camera
          rotation={[radians(60), 0, 0]} // camera xoay 60độ quang x-axis 
        />
      )}
      {children}

      {orbitControls ? (
        <OrbitControls
          // polar angle: góc giữa hướng nhìn của camera
          // và trục Y dương(tính từ đỉnh xuống)
          // 0 rad: nhìn thẳng từ trên xuống(trục Y dương)
          // pi/2 rad: nhìn ngang( song song măt đất)

          // limit góc nhìn theo trục dọc từ 0 đến 30độ(chỉ nhìn trên xuống , ko thể từ dưới lên)
          minPolarAngle={radians(0)}
          maxPolarAngle={radians(30)}

          // Khoảng cách tối thiểu và tối đa của camera đến tâm xoay (target).
          // kcach zoom từ 30 đến 180 đơn vị
          // minDistance={30} → không thể zoom gần hơn 30 đơn vị.
          // maxDistance={180} → không thể zoom xa hơn 180 đơn vị.
          minDistance={30}
          maxDistance={180}
        />
      ) : null}

      {/* Road */}

      <Plane
        // width: chiều dài(theo trục X)
        // height: chiều rộng(theo trục Y của hình phẳng)
        args={[1000, 24]}
        // đặt mp xuống dưới 1 chút Y=-0.2
        position={[0, -0.2, 0]}
        // quay mặt phẳng 90 quanh trục X để mp nằm ngang, như 1 con đường
        rotation={[radians(-90), 0, 0]}
      >
        <meshBasicMaterial color={roadColor} />
      </Plane>

      {/* Cars */}

      <Spawner
        spawnInterval={8.2}
        duration={WORLD_DURATION - 6}
        startPosition={new THREE.Vector3(WORLD_START, 0, -10)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -10)}
      >
        <Car
          forward={false}
          searching
          comment={!hideAllComments && true}
          color={'#109'}
        />
      </Spawner>
      <Spawner
        spawnInterval={4.3}
        duration={WORLD_DURATION - 12}
        startPosition={new THREE.Vector3(WORLD_START, 0, -6)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -6)}
      >
        <Car forward={false} color={'#444'} />
      </Spawner>
      <Spawner
        spawnInterval={7.4}
        duration={WORLD_DURATION - 18}
        startPosition={new THREE.Vector3(WORLD_START, 0, -2)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -2)}
      >
        <Car forward={false} color={'#03fcf0'} />
      </Spawner>

      <Spawner
        spawnInterval={9.8}
        duration={WORLD_DURATION - 18}
        endPosition={new THREE.Vector3(WORLD_START, 0, 2)}
        startPosition={new THREE.Vector3(WORLD_END, 0, 2)}
      >
        <Car color={'#e303fc'} />
      </Spawner>
      <Spawner
        spawnInterval={7}
        duration={WORLD_DURATION - 12}
        endPosition={new THREE.Vector3(WORLD_START, 0, 6)}
        startPosition={new THREE.Vector3(WORLD_END, 0, 6)}
      >
        <Car color={'#fc3d03'} />
      </Spawner>
      {/* My Car */}
      <group position={new THREE.Vector3(0, 0, 10)}>
        <Car searching comment={!hideAllComments && true} color={'#72d681'} />
      </group>

      {/* Buildings Left */}
      <Spawner
        spawnInterval={3.6}
        duration={WORLD_DURATION}
        startPosition={new THREE.Vector3(WORLD_START, 0, 76)}
        endPosition={new THREE.Vector3(WORLD_END, 0,76)}
      >
        <BuildingSet />
      </Spawner>
      {/* Buildings Right */}
      <Spawner
        spawnInterval={3.6}
        duration={WORLD_DURATION}
        startPosition={new THREE.Vector3(WORLD_START, 0, -76)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -76)}
      >
        <BuildingSet />
      </Spawner>
    </Canvas>
  );
};
