import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { IsLogin, UserAtom } from '../recoil/AtomUserState';
import { getProfile } from "../api/profileAPI";
import { getProfilePost } from "../api/profileAPI";
import { getSaleItem } from "../api/profileAPI";
import { postAccountValid } from "../api/signupAPI";
import { useModalStack } from "../hooks/useModalStack";
import styled from "styled-components";

import BasicHeader from '../components/header/BasicHeader';
import UserProfile from "../components/common/UserProfile";
import UserPostList from '../components/UserPostList/UserPostList';
import Loader from "../Loader/Loader";
import Modal from './../components/common/Modal';
import Alert from './../components/common/Alert';


export default function ProfilePage() {

  const { push, clear } = useModalStack();

  const { accountname } = useParams();
  const navigate = useNavigate();

  const [profileProps, setProfileProps] = useState({});
  const [saleItemProps, setSaleItemProps] = useState([]);
  const [profilePostProps, setProfilePostProps] = useState([]);
  const [isMyAccount, setIsMyAccount] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const setUserValue = useSetRecoilState(UserAtom);
  const setIsLogin = useSetRecoilState(IsLogin);

  async function isValidAccountName(value) {
    return await postAccountValid(value)
  }

  const loadProfilePage = async () => {
    const user = await getProfile(accountname);
    setProfileProps({ ...user.profile });
    setProfileLoading(true);
  };

  const loadPosts = async () => {
    const saleItems = await getSaleItem(accountname);
    const profilePosts = await getProfilePost(accountname);
    setSaleItemProps([...saleItems.product]);
    setProfilePostProps([...profilePosts.post]);
    setPostLoading(true);
  }

  const handleLogout = (event) => {
    setUserValue({})
    setIsLogin(false)
    sessionStorage.removeItem('user')
    navigate('/splash');
    clear();
  }

  const openAlert = () => {
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
        const myAccountName = JSON.parse(sessionStorage.getItem('user')).UserAtom.accountname;
        accountname === myAccountName ? setIsMyAccount(true) : setIsMyAccount(false)
        loadProfilePage()
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

const ProfilePageStyle = styled.section`
  height: calc(100vh - 60px);
`;
