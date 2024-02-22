import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useModalStack } from "../hooks/useModalStack";
import useUserInfo from "hooks/useUserInfo";

import { IsLogin, UserAtom } from '../recoil/AtomUserState';
import { getProfile } from "../api/profileAPI";
import { getProfilePost } from "../api/profileAPI";
import { getSaleItem } from "../api/profileAPI";
import { postAccountValid } from "../api/signupAPI";

import styled from "styled-components";

import BasicHeader from '../components/header/BasicHeader';
import UserProfile from "../components/common/UserProfile";
import UserPostList from '../components/UserPostList/UserPostList';
import Modal from './../components/common/Modal';
import Alert from './../components/common/Alert';


const ProfilePage = () => {

  const setUserValue = useSetRecoilState(UserAtom);
  const setIsLogin = useSetRecoilState(IsLogin);
  const [profileProps, setProfileProps] = useState<Author | null>(null);
  const [saleItemProps, setSaleItemProps] = useState<Product[]>([]);
  const [profilePostProps, setProfilePostProps] = useState<Posts[]>([]);
  const [isMyAccount, setIsMyAccount] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [firstMountPost, setFirstMountPost] = useState<boolean>(true);
  const [firstMountSaleItem, setFirstMountSaleItem] = useState<boolean>(true);

  const { push, clear } = useModalStack();

  const { accountname } = useParams() as { accountname: string };

  const { accountname: accountnameFromUserAtom } = useUserInfo();

  const navigate = useNavigate();
  const location = useLocation()

  const isValidAccountName = async (value: string) => {
    return await postAccountValid(value)
  }

  const loadProfilePage = async (value: string): Promise<void> => {
    const user = await getProfile(value);
    setProfileProps(user);
  };

  const loadPosts = async (): Promise<void> => {
    const saleItems = await getSaleItem(accountname);
    const profilePosts = await getProfilePost(accountname);
    setSaleItemProps([...saleItems.product]);
    Array.isArray(profilePosts.post) && setProfilePostProps([...(profilePosts.post as Posts[])]);
    setPostLoading(false);
    setProfileLoading(false);
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
    navigate('/introduce');
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
    const fetchData = async () => {
      setProfileLoading(true);
      setPostLoading(true);
      accountname === accountnameFromUserAtom ? setIsMyAccount(true) : setIsMyAccount(false)
      const data = await isValidAccountName(accountname);
      if (data === '이미 가입된 계정ID 입니다.') {
        await loadProfilePage(accountname)
        await loadPosts()
        setFirstMountPost(false);
      }
    }

    fetchData();
  }, [accountnameFromUserAtom, accountname])

  useEffect(() => {
    const fetchData = async () => {
      setPostLoading(true);
      await loadPosts()
    }
    if (!firstMountPost && firstMountSaleItem && location.pathname.includes('/saleitem')) {
      fetchData();
      setFirstMountSaleItem(false)
    }
  }, [location.pathname])


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

        <UserProfile
          profile={profileProps}
          isMyAccount={isMyAccount}
          loadProfilePage={loadProfilePage}
          loading={profileLoading}
        />
        <UserPostList saleItem={saleItemProps} post={profilePostProps} loading={postLoading} />
      </ProfilePageStyle>
    </>
  );
}

export default ProfilePage

const ProfilePageStyle = styled.section`
  position: relative;
  height: calc(var(--screen-height) - 12px);
  @media (min-width: 768px) {
    height: calc(var(--screen-nav-height));
  }
`;
