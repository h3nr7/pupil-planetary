import React from 'react';
import styled from 'styled-components';

export const PlanetList = styled.ul`
    margin: 0;
    padding: 25px 0px;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
`;

const Li = styled.li`
    margin: 0;
    padding: 0;
    flex-grow: 1;
    min-width: 1%;
    align-items: center;
    text-align: center;
    cursor: pointer;
`

const Planet = styled.div`
    height: ${props => `${props.size}px`};
    width: ${props => `${props.size}px`};
    background-color: ${props => props.color};
    border-radius: 50%;
    display: block;
    margin: 5px auto;
`;

export const PlanetListItem = ({name, data, onClick}) => {

    const clickHandler = eve => onClick({name, data});
    // scaled by power of .5 so that planets are more visible
    const size = Math.round(Math.pow(data.diameter * 0.1, 0.5));
    return data.isSun ? null : (
    <Li onClick={clickHandler}>
        <Planet size={size} color={data.color || 'red'}/>
        {name}
    </Li>
    );
}