import { 
    SphereGeometry, MeshBasicMaterial, WireframeGeometry, 
    LineDashedMaterial, Line, Vector3, LineSegments, Mesh, BufferGeometry  } from 'three';

/**
 * Base Class for creating a planet
 */

export default class BasePlanet3D {

    constructor(diameter, color, name, speed=1) {
        this.geo = new SphereGeometry( diameter, 32, 32 );
        //planet
        this.mat = new MeshBasicMaterial( {color} );
        this.mesh = new Mesh( this.geo, this.mat );
        this.mesh.name = name;

        // active indicator
        this.activeGeo = new SphereGeometry( diameter * 1.3, 4, 2 );
        const wireframe = new WireframeGeometry(this.activeGeo);
        wireframe.scale(2, 2, 2);
        const line = new LineSegments(wireframe);
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;
        line.visible = false;
        this.rotation = new Vector3(0,0,0);
        this.wireframe = wireframe;
        this.activeMesh = line;
        this.active = false;

        this.rot = 0;
        this.speed = speed;

        // set orbit line
        this.orbitMat = new LineDashedMaterial( { 
            color: 0x333333,
            linewidth: 1,
            scale: 1,
            dashSize: 5,
            gapSize: 5,
        });
        this.orbitGeo = new BufferGeometry();
    }

    setOrbitRadius(r) {
        const segments = 64;
        const points = [];

        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * Math.PI * 2;
            points.push(new Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));            
        }

        this.orbitGeo.setFromPoints(points);
        this.orbitMesh = new Line(this.orbitGeo, this.orbitMat);
        this.orbitMesh.name = this.mesh.name;
        this.mesh.position.setX(r);
        this.activeMesh.position.setX(r);
        this.orbitRadius = r;
        this.isPauseOrbit = false;
    }

    pauseOrbit(state) {
        this.isPauseOrbit = state;
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
        this.activeMesh.visible = state;
    }

    setActiveRotation(v3) {
        this.rotation = v3;
    }

    animate() {
        if(!this.isPauseOrbit) {
            this.rot+=0.005 * 365.2/this.speed;
            this.mesh.position.set(Math.cos(this.rot) * this.orbitRadius, Math.sin(this.rot) * this.orbitRadius, 0);
            this.activeMesh.position.set(Math.cos(this.rot) * this.orbitRadius, Math.sin(this.rot) * this.orbitRadius, 0);
        }
        this.orbitMesh.computeLineDistances();
        this.wireframe.rotateX(this.rotation.x * 0.1);
        this.wireframe.rotateY(this.rotation.y * 0.1);
    }
}