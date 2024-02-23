import { useNavigate } from "react-router-dom"

import styled from "styled-components"

import MainHeader from "../components/header/MainHeader"

// import { ReactComponent as BasicProfile } from '../assets/img/basic-profile.webp'
import { YellowBtn } from "../components/common/Button"
import Loader from "Loader/Loader"

const UserTutorialPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <UserTutorialPageStyle>
        {/* <BasicProfile /> */}
        <div className='logo'>
          <Loader />
        </div>
        <p>유저를 검색해 팔로우 해보세요.</p>
        <YellowBtn contents={'검색하기'} handleFunc={() => { navigate('/search') }} type='button' />
      </UserTutorialPageStyle>
    </>
  )
}

export default UserTutorialPage

const UserTutorialPageStyle = styled.div`
  position: relative;
  height: var(--screen-nav-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .logo {
    position: relative;
    margin-bottom: 150px;
  }

  p {
    font-weight: var(--font--Regular);
    font-size: var(--font--size-md);
    color: var(--text-color-1);
    padding-bottom: 18px;
  }
`;