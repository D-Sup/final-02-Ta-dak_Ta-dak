import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useModalStack } from "../hooks/useModalStack";

import { IsLogin, UserAtom } from '../recoil/AtomUserState';
import { getProfile } from "../api/profileAPI";
import { getProfilePost } from "../api/profileAPI";
import { getSaleItem } from "../api/profileAPI";
import { postAccountValid } from "../api/signupAPI";

import styled from "styled-components";

import BasicHeader from '../components/header/BasicHeader';
import UserProfile from "../components/common/UserProfile";
import UserPostList from '../components/UserPostList/UserPostList';
import Loader from "../Loader/Loader";
import Modal from './../components/common/Modal';
import Alert from './../components/common/Alert';


const ProfilePage = () => {

  const setUserValue = useSetRecoilState(UserAtom);
  const setIsLogin = useSetRecoilState(IsLogin);
  const [profileProps, setProfileProps] = useState<Author | null>(null);
  const [saleItemProps, setSaleItemProps] = useState<Product[]>([]);
  const [profilePostProps, setProfilePostProps] = useState<Posts[]>([]);
  const [isMyAccount, setIsMyAccount] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const { push, clear } = useModalStack();


  const { accountname } = useParams() as { accountname: string };

  const navigate = useNavigate();

  const isValidAccountName = async (value: string) => {
    return await postAccountValid(value)
  }

  const loadProfilePage = async (value: string): Promise<void> => {
    const user = await getProfile(value);
    setProfileProps(user);
    setProfileLoading(true);
  };

  const loadPosts = async (): Promise<void> => {
    const saleItems = await getSaleItem(accountname);
    const profilePosts = await getProfilePost(accountname);
    setSaleItemProps([...saleItems.product]);
    Array.isArray(profilePosts.post) && setProfilePostProps([...(profilePosts.post as Posts[])]);
    setPostLoading(true);
  }

  const handleLogout = (): void => {
    setUserValue(
      {
        id: '',
        username: '',
        accountname: '',
        token: '',
        refreshToken: '',
        image: '',
        following: [],
        follower: [],
      },
    )
    setIsLogin(false)
    sessionStorage.removeItem('user')
    navigate('/splash');
    clear();
  }

  const openAlert = (): void => {
    push(Alert,
      '로그아웃 하시겠습니까?',
      ['취소', '로그아웃'],
      [null, handleLogout],
      'AlertModal'
    )
  }

  useEffect(() => {
    async function fetchData() {
      const data = await isValidAccountName(accountname);
      if (data !== '이미 가입된 계정ID 입니다.') {
        navigate('/404page');
      }
      else {
        setProfileLoading(false);
        setPostLoading(false);
        const myAccountName = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '{}').UserAtom.accountname : '';
        accountname === myAccountName ? setIsMyAccount(true) : setIsMyAccount(false)
        loadProfilePage(accountname)
        loadPosts()
      }
    }

    fetchData();
  }, [accountname])


  return (
    <>
      <ProfilePageStyle>
        {isMyAccount ? <BasicHeader isButton={true} handleFunc={() => {
          push(Modal,
            {},
            ['로그아웃'],
            [openAlert],
            'SlideUpModal'
          )
        }} /> : <BasicHeader isButton={false} />}
        {profileLoading && postLoading ? (
          <>
            <UserProfile
              profile={profileProps}
              isMyAccount={isMyAccount}
              loadProfilePage={loadProfilePage}
            />
            <UserPostList saleItem={saleItemProps} post={profilePostProps} />
          </>
        ) : (
          <Loader />
        )}
      </ProfilePageStyle>
    </>
  );
}

export default ProfilePage

const ProfilePageStyle = styled.section`
  height: calc(100vh - 60px);
`;
