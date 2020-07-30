import { Raycaster, Vector2 } from 'three';
import BaseGlContainer from './BaseGlContainer';
import BasePlanet3D from './BasePlanet3D';

export default class SolarSystem extends BaseGlContainer {

    constructor(canvas, { onClick }={ onClick: null }) {
        super(canvas);
        this.onClick = onClick;
        this.planetSet = {};
        this.raycast = new Raycaster();
        this.mouse = new Vector2(9999, 9999);
        this.camera.position.set(0, 0, 500);
        this.activePlanet = null;
        this.renderer.domElement.addEventListener( 'mousemove', this.onMouseMoveHandler.bind(this), false );
        this.renderer.domElement.addEventListener( 'click', this.onClickHandler.bind(this), false );

    }
    
    setActivePlanet(name) {
        if(!name) {
            this.planetSet[this.pastActivePlanet.name].setActive(false);
            this.activePlanet = null;
            this.pastActivePlanet = null;
        } else {
            this.planetSet[name].setActive(true);
            this.pastActivePlanet = this.planetSet[name].mesh;
        }
    }

    onMouseMoveHandler(evt) {
        const [w, h] = this.size;
        const cX = evt.layerX !== undefined ? evt.layerX : evt.clientX
        const cY = evt.layerY !== undefined ? evt.layerY : evt.clientY;
        this.mouse.x = (cX/w) * 2 - 1;
        this.mouse.y = - (cY/h) * 2 + 1;
        Object.values(this.planetSet).forEach(item => item.setActiveRotation(new Vector2(this.mouse.x, this.mouse.y, 0)));
    }

    onClickHandler(evt) {
        if(this.onClick && this.activePlanet && this.activePlanet.name && this.activePlanet.name!=="") {
            if(this.pastActivePlanet && this.pastActivePlanet.name) this.planetSet[this.pastActivePlanet.name].setActive(false);
            this.onClick.call(evt, this.activePlanet.name);
            this.planetSet[this.activePlanet.name].setActive(true);
            this.pastActivePlanet = this.activePlanet;
        }
    }

    addFromSolarData(data) {
        Object.keys(data).map((name, index) => {
            const dia = Math.round(Math.pow(data[name].diameter * 0.1, 0.5))/10;
            const planet = new BasePlanet3D(dia, data[name].color, name, data[name].orbitalPeriod);
            planet.setOrbitRadius(index * 50);
            this.planetSet[name] = planet;
            this.scene.add(planet.orbitMesh);
            this.scene.add(planet.activeMesh);
            this.scene.add(planet.mesh);
        });
    }

    render() {
        super.render();

        Object.values(this.planetSet).forEach(item => item.animate());
        this.raycast.setFromCamera( this.mouse, this.camera );
        var intersects = this.raycast.intersectObjects( this.scene.children );

        this.activePlanet = null;
        document.getElementsByTagName("body")[0].style.cursor = 'default';
        Object.values(this.planetSet).forEach(item => item.pauseOrbit(false));
        for ( var i = 0; i < intersects.length; i++ ) {
            try {
                this.activePlanet = intersects[i].object;
                Object.values(this.planetSet).forEach(item => item.pauseOrbit(true));
                document.getElementsByTagName("body")[0].style.cursor = 'pointer';
            } catch(e) {
                console.error(e);
            }
        }
    }
    
}