import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0;
  padding: 10px;
`;

const Title = styled.h2`
    font-size: 24px;
`;

export const Ul = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    white-space: nowrap;
`;


export const Li = ({liData}) => {
    const { links, data } = liData || {};
    return (
        links ? (
            <li style={{ padding:"5px" }}>
                <p>{data[0].title}</p>
                <img style={{maxWidth: "300px"}} alt='' src={links[0].href} rel={links[0].ref}/>
            </li>
        ) : null
    );
}

export const InfoList = ({name, infoData, mass, gravity, distance}) => {
    return (
        <Container>
            <Title>About {name}</Title>
            <p>The planet {name} is {distance} * 10^6 km away from the sun, has mass of {mass} * 10^24 kg and gravity of {gravity}m/s^2</p>
            <Ul>
                { infoData.length > 0 ? infoData.map((item, index) => <Li key={index} liData={item} />) : null }
            </Ul>
        </Container>
    )
}