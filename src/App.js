import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { useResize } from './helpers/resize.hook';
import { useInfoData } from './helpers/nasaApi.hook';
import SolarSystem from './components/SolarSystem';
import { PlanetList, PlanetListItem }  from './components/PlanetList';
import { InfoList } from './components/InfoList';
import { solarSystemData } from './assets/solarSystemData';
import { 
          Main, Header, Footer, ThreeContainer,
          InfoContainer, NaviBack  } from './App.styles';

/**
 * APP
 */
function App() {

  const containerRef = useRef();
  const canvasRef = useRef();
  const glInstanceRef = useRef();
  const size = useResize(containerRef);
  const [keyword, setKeyword] = useState(null);
  const infoData = useInfoData(keyword);
  
  useEffect(() => {
    const container = containerRef.current;
    const glInstance = new SolarSystem(canvasRef.current, {
      onClick: name => setKeyword(name)
    });
    container.appendChild(glInstance.renderer.domElement);
    glInstance.animate();
    glInstanceRef.current = glInstance;

    glInstanceRef.current.addFromSolarData(solarSystemData);

    return () => {
      container.removeChild(glInstance.renderer.domElement);
      glInstance.destroy();
    }
  }, []);

  useEffect(() => {
    glInstanceRef.current.updateSize(size);
  }, [size]);

  const planetClickHandler = (event) => {
    if(event.name) {
      setKeyword(event.name);
      glInstanceRef.current.setActivePlanet(event.name);
    }
  }

  const backHandler = () => {
    setKeyword(null);
    glInstanceRef.current.setActivePlanet(null);
  }

  const { data, error } = infoData;

  return (
    <Main>
      <Header>
        <h1>Pupil Test :: Solar system 2D/3D</h1>
      </Header>
      <ThreeContainer ref={containerRef}/>
      <InfoContainer>
        { keyword ? <NaviBack onClick={backHandler}>Back</NaviBack> : null }
        {!keyword ? (<PlanetList>
          { Object.keys(solarSystemData).map(planet => <PlanetListItem key={planet} onClick={planetClickHandler} name={planet} data={solarSystemData[planet]}/>) }
        </PlanetList>) : null }
        { !keyword ? null : error ? 'Error' : (
            <InfoList 
              mass={solarSystemData[keyword].mass} 
              gravity={solarSystemData[keyword].gravity} 
              distance={solarSystemData[keyword].distance} 
              name={keyword} 
              infoData={data} /> 
          )
        }
      </InfoContainer>
      <Footer>
        <h5>made by <a href="https://h3nr7.com" targe="_blank">h3nr7</a></h5>
      </Footer>
    </Main>
  );
}

export default App;
