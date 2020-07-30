import { 
    SphereGeometry, MeshBasicMaterial, WireframeGeometry, 
    Vector3, LineSegments, Mesh  } from 'three';

/**
 * Base Class for creating a planet
 */

export default class BasePlanet3D {

    constructor(diameter, color, name) {
        this.geo = new SphereGeometry( diameter, 32, 32 );

        this.mat = new MeshBasicMaterial( {color} );
        this.mesh = new Mesh( this.geo, this.mat );
        this.mesh.name = name;

        this.activeGeo = new SphereGeometry( diameter * 1.3, 4, 2 );
        const wireframe = new WireframeGeometry(this.activeGeo);
        wireframe.scale(2, 2, 2);
        const line = new LineSegments(wireframe);
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;
        line.material.visible = false;
        this.rotation = new Vector3(0,0,0);
        this.wireframe = wireframe;
        this.activeMesh = line;
        this.active = false;
    }

    setXPos(x) {
        this.mesh.position.setX(x);
        this.activeMesh.position.setX(x);
    }

    setYPos(y) {
        this.mesh.position.setY(y);
        this.activeMesh.position.setY(y);
    }

    setActive(state) {
        this.activeMesh.material.visible = state;
    }

    setActiveRotation(v3) {
        this.rotation = v3;
    }

    animate() {
        this.wireframe.rotateX(this.rotation.x * 0.1);
        this.wireframe.rotateY(this.rotation.y * 0.1);
    }
}