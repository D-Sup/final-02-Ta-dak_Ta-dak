import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModalStack } from '../../hooks/useModalStack';

import styled from 'styled-components'
import DarkModeBtn from '../DarkModeBtn';

import { ReactComponent as Tadak } from '../../assets/img/tadaktadaktitle.svg';
import { ReactComponent as IconLogout } from '../../assets/img/icon-logout.svg';

import { useSetRecoilState } from 'recoil'
import { IsLogin, UserAtom } from '../../recoil/AtomUserState';

import SearchHeader from 'components/header/SearchHeader';
import Alert from '../common/Alert';

const WebHeader = () => {

  const setUserValue = useSetRecoilState(UserAtom);
  const setIsLogin = useSetRecoilState(IsLogin);

  const [search, setSearch] = useState<string>('')
  const [firstMount, setFirstMount] = useState<boolean>(true);

  const { push } = useModalStack();
  const navigate = useNavigate()
  const location = useLocation();

  const hideHeaderPaths = [
    '/splash',
    '/introduce',
    '/login',
    '/signup',
    '/signup/profile'
  ]

  const hideHeader = hideHeaderPaths.includes(location.pathname);

  const handleGoFeed = (): void => {
    navigate('/feed');
  }

  const handleLogout = (): void => {
    setUserValue({
      id: '',
      username: '',
      accountname: '',
      token: '',
      refreshToken: '',
      image: '',
      following: [],
      follower: [],
    })
    setIsLogin(false)
    sessionStorage.removeItem('user')
    navigate('/introduce');
  }

  useEffect(() => {
    if (!firstMount) {
      navigate('/search', {
        state: search
      })
    }
    setFirstMount(false)
  }, [search])


  return (
    <>
      {!hideHeader &&
        <WebHeaderStyle>
          <WebLogoStyle>
            <TadakStyle>
              <Tadak onClick={handleGoFeed} width={70} height={25} fill={'var(--logo-color)'} />
            </TadakStyle>
          </WebLogoStyle>
          <div className='searchheader-container'>
            <SearchHeader value={search} setValue={setSearch} />
          </div>
          <BtnStyle>
            <DarkModeBtn />
            <IconLogout onClick={() => {
              push(Alert,
                '로그아웃 하시겠습니까?',
                ['취소', '로그아웃'],
                [null, handleLogout],
                'AlertModal'
              )
            }} style={{ width: '22px', height: '22px', cursor: 'pointer' }} />
          </BtnStyle>
        </WebHeaderStyle>
      }
    </>
  )
}

export default WebHeader

const WebHeaderStyle = styled.div`
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 50px;
  background-color: var(--background-color);
  box-shadow: 0 1px 0 var(--invert-color);
  display: flex;
  justify-content: space-between;

  .searchheader-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    
    @media (min-width: 768px) {
      display: block;
    }
  }
`;

const WebLogoStyle = styled.div`
  padding-top: 22px;
  gap: 16px;
  margin-left: 0%;
  @media (min-width: 1023px) {
    margin-left: 17%;
  }
`;

const TadakStyle = styled.div`
  position: relative;
  top: -10px; 
`;

const BtnStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  margin-right: 0%;
  @media (min-width: 1023px) {
    margin-right: 13%;
  }
`;
