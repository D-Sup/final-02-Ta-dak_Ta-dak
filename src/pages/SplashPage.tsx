import { useNavigate } from 'react-router-dom';

import styled, { keyframes } from 'styled-components'

import { ReactComponent as SubTitle } from '../assets/img/subtitle.svg';
import { ReactComponent as TadakTitle } from '../assets/img/tadaktitle.svg';

import splash from '../assets/img/splash.gif';

const SplashPage = () => {

  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/introduce')
  }, 6500)

  return (
    <SplashPageStyle>
      <SplashImg src={splash}></SplashImg>
      <SubTitleStyle></SubTitleStyle>
      <TitleStyle1  ></TitleStyle1>
      <TitleStyle2  ></TitleStyle2>
    </SplashPageStyle>
  )
}

export default SplashPage

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;


const fadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

const displayPhrases1 = keyframes`
0% {
  top: 40%
}
80% {
  opacity: 1;
  top: 50%;
}
100% {
  opacity: 0;
  top: 50%;
}
`;

const displayPhrases2 = keyframes`
0% {
  top: 40%
}
80% {
  opacity: 1;
  top: 45%;
}
100% {
  opacity: 0;
  top: 45%;
}
`;

const displayPhrases3 = keyframes`
0% {
  top: 50%
}
80% {
  opacity: 1;
  top: 55%;
}
100% {
  opacity: 0;
  top: 55%;
}
`;

const SplashPageStyle = styled.div`
background-color: var(--background-color);
position: relative;
width: 100vw;
height: 100vh;
animation: ${fadeOut} 1s ease forwards;
animation-delay: 5.5s;

&::after {
    position: absolute;
    top: 0;
    content: '';
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    animation: ${fadeIn} 1s ease forwards;
  }
`

const SplashImg = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
  object-fit: cover;
  animation: ${fadeOut} 1s ease forwards;
  animation-delay: 5.5s;
`;

const SubTitleStyle = styled(SubTitle)`
  position: absolute;
  z-index: 1;
  width: 300px;
  opacity: 0;
  left: 50%;
  color: var(--logo-color);
  transform: translate(-50%, -50%);
  animation: ${displayPhrases1} 1.5s ease forwards;
  animation-delay: 1.5s;
  @media (min-width: 768px) {
    width: 500px;
  }
`;

const TitleStyle1 = styled(TadakTitle)`
  position: absolute;
  z-index: 1;
  width: 100px;
  opacity: 0;
  left: 40%;
  color: var(--logo-color);
  transform: translate(-50%, -50%);
  animation: ${displayPhrases2} 2s ease forwards;
  animation-delay: 3.5s;
  @media (min-width: 768px) {
    left: 47%;
  }
`

const TitleStyle2 = styled(TadakTitle)`
  position: absolute;
  z-index: 1;
  width: 100px;
  opacity: 0;
  left: 60%;
  color: var(--logo-color);
  transform: translate(-50%, -50%);
  animation: ${displayPhrases3} 1.7s ease forwards;
  animation-delay: 3.8s;
  @media (min-width: 768px) {
    left: 53%;
  }
`;