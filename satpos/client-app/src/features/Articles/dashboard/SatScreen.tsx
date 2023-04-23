import { Canvas } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { OrbitControls } from '@react-three/drei';
import { Color, LinearEncoding, NoToneMapping, PMREMGenerator } from 'three';



interface Props {
  isEditmode : boolean
  isAutoAnimationExec : boolean;
}

export default observer( function SatScreen({isEditmode, isAutoAnimationExec}: Props) {


  return (
      <Canvas
        gl={{ 
          antialias: true, 
          outputEncoding : LinearEncoding,
          toneMapping: NoToneMapping,
        }}
        onCreated={({ gl, scene }) => {
          //gl.toneMappingExposure = Math.pow(2, selectedArticle?.exposure ? selectedArticle.exposure : 0.0);
          scene.environment = null;

          scene.background = new Color("#000000")
        }}
        //linear={selectedArticle?.gammaOutput}        
        //flat={true}    
        camera={{ 
          fov:45
          ,position:[3,3,3]
          ,near:1
          ,far:6350000
          }} 
      >
      

      <OrbitControls
        enableDamping={false}
        attach="orbitControls"
        autoRotate={false}
        autoRotateSpeed={1}
        makeDefault
      />

      </Canvas>
  );
});