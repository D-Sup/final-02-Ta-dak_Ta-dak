import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { GreenBackBtn } from '../components/common/Button';

import { ReactComponent as CantFindPage } from '../assets/img/cant-find-page.svg';

const Page404 = () => {

  const navigate = useNavigate();

  const handleGoHome = (): void => {
    navigate('/feed');
  }


  return (
    <>
      <Page404Wrapper>
        <CantFindPage />
        <p>페이지를 찾을 수 없습니다. :(</p>
        <GreenBackBtn handleFunc={handleGoHome} type='button' contents={'홈으로 돌아가기'} />
      </Page404Wrapper>
    </>
  )
}

export default Page404

const Page404Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 220px;
  width: var(--basic-width);
  height: var(--basic-height);
  background-color: var(--background-color);

  button {
    margin-top: 30px;
  }
`;