import { LineSegments, WireframeGeometry, SphereGeometry, Math, Vector3 } from 'three';

export default class ActiveGlow {

    constructor(geo, name) {
        const wireframe = new WireframeGeometry(geo);
        wireframe.scale(2, 2, 2);
        const line = new LineSegments(wireframe);
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;

        this.rotation = new Vector3(0,0,0);
        this.geo = geo;
        this.wireframe = wireframe;
        this.material = line.material;
        this.mesh = line;
        this.mesh.name = name;
    }

    setPosition(v3) {
        this.geo.position = v3;
    }

    setRotation(v3) {
        this.rotation = v3;
    }



    animate() {
        this.wireframe.rotateX(this.rotation.x * 0.1);
        this.wireframe.rotateY(this.rotation.y * 0.1);
    }
}