import styled from 'styled-components';

export const Main = styled.div`
display: flex;
flex-direction: column;
/* align-items: stretch; */
align-content: center;
height: 100vh;
`;
export const Header = styled.div`
width: 100%;
height: 35px;
padding: 10px;
box-sizing: border-box;
text-align: left;
`;

export const Footer = styled.div`
width: 100%;
height: 25px;
padding: 10px;
text-align: left;
box-sizing: border-box;
`;

export const ThreeContainer = styled.div`
  width: 100%;
  height: 500px;

`;

export const InfoContainer = styled.div`
width: 100%;
height: auto;
`;

export const NaviBack = styled.div`
padding: 10px;
cursor: pointer;
text-decoration: none;

&:hover {
  text-decoration: underline;
}
`;
