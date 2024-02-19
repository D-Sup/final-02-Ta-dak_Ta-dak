import { useNavigate } from "react-router-dom"

import styled from "styled-components"

import MainHeader from "../components/header/MainHeader"

import { ReactComponent as BasicProfile } from '../assets/img/basic-profile.svg'
import { YellowBtn } from "../components/common/Button"

const UserTutorialPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <UserTutorialPageStyle>
        <BasicProfile />
        <p>유저를 검색해 팔로우 해보세요.</p>
        <YellowBtn contents={'검색하기'} handleFunc={() => { navigate('/search') }} type='button' />
        <YellowBtn contents={'추천 게시글 보기'} handleFunc={() => { navigate('/recommendfeed') }} type='button' />
      </UserTutorialPageStyle>
    </>
  )
}

export default UserTutorialPage

const UserTutorialPageStyle = styled.div`
  height: var(--screen-nav-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  p {
    font-weight: var(--font--Regular);
    font-size: var(--font--size-md);
    color: var(--text-color-1);
    padding-bottom: 18px;
  }
`;