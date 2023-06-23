import { Routes, Route, Navigate } from 'react-router-dom';


import LoginPage from '../pages/LoginPage';
import UploadPage from '../pages/UploadPage';
import FeedHomePage from '../pages/FeedHomePage';
import AddProductPage from '../pages/AddProductPage';
import ProfileModificationPage from '../pages/ProfileModificationPage'
import SignUpPage from '../pages/SignUpPage';
import ProfileSettingPage from '../pages/ProfileSettingPage';
import SearchPage from '../pages/SearchPage';
import UserTutorialPage from '../pages/UserTutorialPage';

import ChatListPage from '../pages/ChatListPage'
import ChatRoomPage from '../pages/ChatRoomPage'
import PostDetail from '../pages/PostDetail';
import ProfilePage from '../pages/ProfilePage';
import PostList from '../components/UserPostList/PostList';
import AlbumList from '../components/UserPostList/AlbumList';
import SaleItemList from '../components/UserPostList/SaleItemList';
import FollowListPage from '../pages/FollowListPage';
import SplashPage from '../pages/SplashPage';
import Page404 from '../pages/404Page';
import { NavBar } from '../components/common/NavBar';
import ProductDetailModal from '../components/common/ProductDetailModal';
import { NonLoginProtectedRoute, LoginProtectedRoute } from '../Routes/ProtectedRoute';

export default function PageTest() {

  return (
    <div>
      <Routes>

        <Route path='/' element={<Navigate to='/splash' replace />} />
        <Route path='/404page' element={<Page404 />} />
        <Route path='/*' element={<Page404 />} />
        {/* 회원가입 */}

        <Route element={<LoginProtectedRoute />}>
          <Route path='/splash' element={<SplashPage />} />
          <Route path='/signup/' element={<SignUpPage />} />
          <Route path='/signup/profile' element={<ProfileSettingPage />} />
          {/* 로그인 */}
          <Route path='/login' element={<LoginPage />} />
        </Route>

        <Route element={<NonLoginProtectedRoute />}>
          {/* 게시물 업로드 */}
          <Route path='/upload' element={<UploadPage />} />
          <Route path='/feed/nonfollow' element={<UserTutorialPage />} />
          <Route path='/editpost' element={<UploadPage />} />
          <Route path='/feed' element={<FeedHomePage />} />
          <Route path='/recommendfeed' element={<FeedHomePage />} />
          <Route path='/addproduct' element={<AddProductPage />} />
          <Route path='/profilemodification' element={<ProfileModificationPage />} />
          <Route path='/chat' element={<ChatListPage />} />
          <Route path='/chatroom' element={<ChatRoomPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/postdetail/*' element={<PostDetail />} />
          <Route path='/addproduct' element={<AddProductPage />} />
          <Route path='/profilemodification' element={<ProfileModificationPage />} />
          <Route path='/profile/:accountname/*' element={<ProfilePage />} />
          <Route path='/profile/:accountname/follower' element={<FollowListPage />} />
          <Route path='/profile/:accountname/follower' element={<FollowListPage />} />
          <Route path='/profile/:accountname/following' element={<FollowListPage />} />
          <Route path='/productdetail' element={<ProductDetailModal />} />
          <Route path='/editproduct' element={<AddProductPage />} />

        </Route>

      </Routes>
      <NavBar />
    </div >
  );
}