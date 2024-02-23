import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import { useRecoilValue } from 'recoil'
import { DarkModeAtom } from './recoil/AtomDarkModeState'

import styled from 'styled-components'

import { ModalStack } from './utils/ModalStack';

import DefaultTheme from './style/theme/DefaultTheme'
import DarkTheme from './style/theme/DarkTheme'

import { NonLoginProtectedRoute, LoginProtectedRoute } from 'Routes/ProtectedRoute';

import Page404 from './pages/404Page';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfileSettingPage from './pages/ProfileSettingPage';
import UserTutorialPage from './pages/UserTutorialPage';
import NavBar from './components/common/NavBar';
import FeedHomePage from './pages/FeedHomePage';
import PostDetail from './pages/PostDetail';
import UploadPage from './pages/UploadPage';
import ChatListPage from './pages/ChatListPage'
import ChatRoomPage from './pages/ChatRoomPage'
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import FollowListPage from './pages/FollowListPage';
import ProfileModificationPage from './pages/ProfileModificationPage'
import AddProductPage from './pages/AddProductPage';
import WebHeader from './components/pcVersion/WebHeader';
import WebNavBar from './components/pcVersion/WebNavBar';
import WebFollowersRecommend from './components/pcVersion/WebFollowersRecommend';
import WebBillboard from './components/pcVersion/WebBillboard';
import IntroducePage from 'pages/IntroducePage';


const App = () => {

  const darkMode = useRecoilValue<boolean>(DarkModeAtom);

  const location = useLocation();

  const { currentWidth } = useWindowSize();

  const basedMarginPaths = [
    '/splash',
    '/login',
    '/signup',
    '/signup/profile'
  ]
  const basedWidthPaths = [
    '/splash'
  ]

  const basedMargin = basedMarginPaths.includes(location.pathname);
  const basedWidth = basedWidthPaths.includes(location.pathname);


  return (
    <PcStyle>
      <WebHeaderStyle>
        <WebHeader />
      </WebHeaderStyle>
      <MainStyle>
        <WebNavBarStyle>
          <WebNavBar />
        </WebNavBarStyle>

        <WrapperStyle basedMargin={basedMargin}>
          <BaseSizeStyle basedWidth={basedWidth} currentWidth={currentWidth}>
            <Routes>
              <Route path='/' element={<Navigate to='/splash' replace />} />
              <Route path='/404page' element={<Page404 />} />
              <Route path='/*' element={<Page404 />} />
              {/* 회원가입 */}

              <Route element={<LoginProtectedRoute />}>
                <Route path='/splash' element={<SplashPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/introduce' element={<IntroducePage />} />
                <Route path='/signup/profile' element={<ProfileSettingPage />} />
                {/* 로그인 */}
                <Route path='/login' element={<LoginPage />} />
              </Route>

              <Route element={<NonLoginProtectedRoute />}>
                {/* 게시물 업로드 */}
                <Route path='/upload' element={<UploadPage />} />
                <Route path='/editpost' element={<UploadPage />} />
                <Route path='/feed/nonfollow' element={<UserTutorialPage />} />
                <Route path='/feed' element={<FeedHomePage />} />
                <Route path='/recommendfeed' element={<FeedHomePage />} />
                <Route path='/postdetail/*' element={<PostDetail />} />
                <Route path='/chat' element={<ChatListPage />} />
                <Route path='/chatroom/*' element={<ChatRoomPage />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/profile/:accountname/*' element={<ProfilePage />} />
                <Route path='/profile/:accountname/follower' element={<FollowListPage />} />
                <Route path='/profile/:accountname/follower' element={<FollowListPage />} />
                <Route path='/profile/:accountname/following' element={<FollowListPage />} />
                <Route path='/profilemodification' element={<ProfileModificationPage />} />
                <Route path='/profilemodification' element={<ProfileModificationPage />} />
                <Route path='/addproduct' element={<AddProductPage />} />
                <Route path='/addproduct' element={<AddProductPage />} />
                <Route path='/editproduct' element={<AddProductPage />} />
              </Route>
            </Routes>
            <NavBar />
          </BaseSizeStyle>
        </WrapperStyle>

        <WebFollowersRecommendStyle>
          <Routes>
            <Route path='/feed' element={<WebFollowersRecommend />} />
            <Route path='/recommendfeed' element={<WebFollowersRecommend />} />
            <Route path='/profile/*' element={<WebFollowersRecommend />} />
            <Route path='/postdetail/*' element={<WebFollowersRecommend />} />
            <Route path='/chat' element={<WebFollowersRecommend />} />
            <Route path='/chatroom/*' element={<WebFollowersRecommend />} />
            <Route path='/search' element={<WebFollowersRecommend />} />
          </Routes>
          <WebBillboard />
        </WebFollowersRecommendStyle>
      </MainStyle>
      {darkMode ? <DarkTheme /> : <DefaultTheme />}
      <ModalStack />
    </PcStyle>
  )
}

export default App

const PcStyle = styled.div`
  background-color: var(--background-color);
`

const WebHeaderStyle = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MainStyle = styled.div`
  display: flex;
  justify-content: center;   
`;

const WebNavBarStyle = styled.div`
  margin-top: 8%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const WebFollowersRecommendStyle = styled.div`
  margin-top: 4%;
  display: none;
  
  @media (min-width: 1500px) {
    display: block;
  }
`;

const WrapperStyle = styled.div<{ basedMargin: boolean }>`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    /* margin-top: ${(props) => (props.basedMargin ? '0px' : '26px')}; */
  }
`;

const BaseSizeStyle = styled.div<{ basedWidth: boolean, currentWidth: number }>`
  position: relative;
  margin: 0;
  width: ${(props) => (props.basedWidth ? '100vw' : 'var(--basic-width)')};
  background-color: ${(props) => (props.currentWidth > 768 ? 'none' : 'var(--header-color)')};
  overflow: hidden;

  &::before {
    overflow: hidden;
    content: '';
    transition: .3s;
    background-color: var(--background-color);
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
    height: 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }

  @media (min-width: 1500px) {
    margin: 0 110px;
  }
`;

