import PropTypes from "prop-types";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { IPhone, Lights, Loader } from "..";
import { Suspense } from "react";

export const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-120%]" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 3.5]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

ModelView.propTypes = {
  index: PropTypes.number,
  groupRef: PropTypes.any,
  gsapType: PropTypes.string,
  controlRef: PropTypes.any,
  setRotationState: PropTypes.func,
  item: PropTypes.object,
  size: PropTypes.string,
};
