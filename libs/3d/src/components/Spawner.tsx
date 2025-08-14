import * as THREE from 'three';
import { ReactNode, useState, useRef } from 'react';
import { WORLD_DURATION } from '../util/constants';
import { SpawnedElement } from '../util/types';
import { useFrame } from '@react-three/fiber';

interface SpawnerProps {
  startPosition: THREE.Vector3;
  endPosition: THREE.Vector3;
  duration?: number;
  spawnInterval: number;
  children: ReactNode;
}

// useFrame chạy mỗi frame (khoảng 60 lần/s, cung cấp delta(tgian giữa 2 frame_tính bằng s) )

export const Spawner = ({
  spawnInterval, // tạo đối tượng mới theo khoảng tgian định sẵn
  startPosition,
  endPosition,
  children,
  duration = WORLD_DURATION,
}: SpawnerProps) => {
  // export type SpawnedElement = {
  //   id: number
  //   progress: number
  // }

  // progress: Giá trị từ 0 đến 1, biểu thị tiến độ di chuyển của đối tượng
  // từ điểm bắt đầu (startPosition) đến điểm kết thúc (endPosition).

  const [elements, setElements] = useState<Array<SpawnedElement>>([]);
  // tạo Ref để lưu thời điểm (timestamp) của lần tạo đối tượng cuối cùng
  // dùng useRef vì nó giữ giá trị qua các lần render mà không gây re-render
  const lastSpawnTime = useRef<number>(Date.now());

  // hook của React3Fiber, chạy mỗi khung hình(frame) của cảnh 3D
  // _: Đối tượng state của Three.js (không dùng ở đây, nên để _).
  // delta: Thời gian (tính bằng giây) giữa khung hình hiện tại và khung hình trước,
  // giúp đảm bảo chuyển động mượt mà dù tốc độ khung hình thay đổi.
  //useFrame is a core hook in R3F that executes code on every frame render of the animation loop (similar to requestAnimationFrame).
  // 'delta' is automatically provided by useFrame from @react-three/fiber.
  // It represents the time (in seconds) since the last frame.
  // You do not need to pass it manually; useFrame injects it for you.
  // delta :  chênh lệch thời gian giữa 2 frame
  useFrame((_, delta) => {
    // delta represents the time (in seconds) that has passed since the last rendered frame.
    // The value of delta is automatically calculated and provided by the rendering engine (Three.js) every time a new frame is rendered.
    // If your app is running at 60 frames per second, delta will be roughly 1/60 ≈ 0.0167 seconds per frame.
    // If the frame rate drops, delta increases, so your animation speed stays consistent.
    // tính tgian kể từ lần tạo đtg cuối cùng(ms)
    // nếu tgian trôi qua >= spawnInterval => tạo đtg mới
    if (Date.now() - lastSpawnTime.current >= spawnInterval * 1000) {
      const id = Date.now();
      // update lại thởi điểm tạo đtg cuối cùng để bắt đầu đếm lại cho lần tạo tiếp theo
      lastSpawnTime.current = id;
      // thêm 1 SpawnedElement mới vào mảng elements
      // prevElements: mảng elements hiện tại
      // đtg mới có id là timestamp và progress = 0(bắt đầu từ điểm xuất phát)
      setElements((prevElements) => [...prevElements, { id, progress: 0 }]);
    }

    setElements((prevElements) =>
      prevElements
        .map((elem) => ({
          ...elem,
          // Updates all existing elements' progress
          // delta is the time passed since the last frame (seconds)
          // Removes elements that have completed their animation (progress >= 1)
          // tăng progress
          // delta / duration: tính phần tiến độ tăng lên trong khung hình này
          progress: elem.progress + delta / duration,
        }))
        .filter((elem) => elem.progress < 1),
    );
    // console.log("elements: ",elements);
  });

  return (
    <>  
      {/* lerpVectors tính toán đối tượng dựa trên progress */}
      {elements.map((elem) => {
        const position = new THREE.Vector3().lerpVectors(
          startPosition,
          endPosition,
          elem.progress,
        );
        return (
          // container của 3.js để đặt vị trí cho children như Car | BuildingSet
          <group key={elem.id} position={position}>
            {children}
          </group>
        );
      })}
    </>
  );
};
