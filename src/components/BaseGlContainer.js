import { WebGLRenderer, PerspectiveCamera, Vector3, 
    Scene, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class GlContainer {

    constructor(canvas, hasOrbitalControl=true) {
        const renderer = new WebGLRenderer({
            alpha: false,
            antialias: true,
            canvas
        });

        const camera = new PerspectiveCamera(50, 1, 0.1, 3200);
        camera.position.set(0, 0, 100);
        camera.lookAt(new Vector3(0, 0, 0));

        const scene = new Scene();
        if(hasOrbitalControl) {
            this.control = new OrbitControls(camera, renderer.domElement);
        }

        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.size = new Vector2(0,0);
        this.camera.name = 'solar_cam';
        this.scene.name = 'solar_scene';

        // this.axis = new AxesHelper(50);
        // this.scene.add(this.axis);
    }

    // animate
    animate() {
        this.render();
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        if(this.controls) this.controls.update();
    }

    // render
    render() {
        this.renderer.render(this.scene, this.camera);
    }

    // update size of container
    updateSize(size) {
        if(size) {
            this.size = size;
            const [width, height] = size;
            this.renderer.setSize(width, height);
            this.camera.aspect = width/height;
        }

        this.camera.updateProjectionMatrix();
    }

    // destroy and clean up
    destroy() {
        cancelAnimationFrame(this.animationFrameId);
    }
    

}