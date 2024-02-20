import { Link, useNavigate, useParams } from 'react-router-dom';

import { doFollowing, doUnfollowing } from '../../api/followAPI';

import styled, { css } from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import UserId from './UserId';
import { ProfileLg } from './Profile';
import { GreenMdBtn, WhiteMdBtn } from './Button';

import IconSmMessage from '../../assets/img/s-icon-message.svg';
import IconShare from '../../assets/img/icon-share.svg';

interface UserProfileProps {
  profile: Author | null,
  isMyAccount: boolean,
  loadProfilePage: (props: string) => void
  loading: boolean
}

const UserProfile = ({ profile, isMyAccount, loadProfilePage, loading }: UserProfileProps) => {

  const navigate = useNavigate();
  const { accountname } = useParams() as { accountname: string };

  const followBtnHandler = async (): Promise<void> => {
    await doFollowing(accountname);
    loadProfilePage(accountname);
  };

  const unFollowBtnHandler = async (): Promise<void> => {
    await doUnfollowing(accountname);
    loadProfilePage(accountname);
  };

  if (profile === null) {
    return
  }

  const handleProfileEdit = () => {
    navigate('/profilemodification',
      {
        state: {
          username: profile.username,
          accountname: profile.accountname,
          intro: profile.intro,
          image: profile.image
        }
      })
  }

  const handleChat = () => {
    navigate(`/chatroom/${profile.accountname}`, {
      state: {
        username: profile.username
      }
    });
  };

  return (
    <UserProfileStyle>
      <ProfileTopStyle>
        <div
          className="follow"
          onClick={() => {
            navigate(`/profile/${profile.accountname}/follower`);
          }}
        >
          <strong>{loading ? <Skeleton width={50} height={40} /> : profile.followerCount}</strong>
          <p>{!loading && 'followers'}</p>
        </div>

        <ProfileLg url={`${profile.image}`} loading={loading} />
        <div
          className="follow"
          onClick={() => {
            navigate(`/profile/${profile.accountname}/following`);
          }}
        >
          <strong>{loading ? <Skeleton width={50} height={40} /> : profile.followingCount}</strong>
          <p>{!loading && 'followings'}</p>
        </div>
      </ProfileTopStyle>

      {loading ?
        <>
          <Skeleton width={120} height={23} style={{ marginTop: '10px' }} />
          <Skeleton width={100} style={{ marginTop: '5px' }} />
          <Skeleton width={200} height={15} style={{ marginTop: '15px', marginBottom: '15px' }} />
        </>
        :
        <ProfileMiddleStyle>
          <h2>{profile.username}</h2>
          <UserId id={`${profile.accountname}`} />
          <span>{profile.intro}</span>
        </ProfileMiddleStyle>
      }

      <ProfileBottomStyle>
        {
          loading ?
            (
              <Skeleton width={300} height={38} borderRadius={30} style={{ marginTop: '20px' }} />
            ) : (
              isMyAccount ? (
                // 내 계정일 경우
                <>
                  <WhiteMdBtn contents={'프로필 수정'} handleFunc={handleProfileEdit} type='button' />
                  <div className='blank'></div>
                  <Link to='/addproduct'>
                    <WhiteMdBtn contents={'상품 등록'} type='button' />
                  </Link>
                </>
              ) : (
                // 다른사람 계정일 경우
                <>
                  <ChatStyle onClick={handleChat}>
                    <img src={IconSmMessage} alt="채팅하기" />
                  </ChatStyle>
                  {profile.isfollow ? (
                    // 팔로잉 한사람일 경우 - 언팔로우
                    <WhiteMdBtn
                      contents={'언팔로우'}
                      handleFunc={unFollowBtnHandler}
                      type='button'
                    />
                  ) : (
                    // 팔로잉 안한 사람일경우 - 팔로우
                    <GreenMdBtn contents={'팔로우'} handleFunc={followBtnHandler} type='button' />
                  )}
                  <ShareBtnStyle href={undefined}>
                    <img src={IconShare} alt="공유하기" />
                  </ShareBtnStyle>
                </>
              )
            )
        }
      </ProfileBottomStyle>
    </UserProfileStyle>
  );
}

export default UserProfile

const UserProfileStyle = styled.div`
  /* background-color: var(--background-color); */
  width: var(--basic-width);
  height: 314px;
  text-align: center;
`;

const ProfileTopStyle = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .follow {
    cursor: pointer;
    strong {
      font-weight: var(--font--Bold);
      font-size: 18px;
      color: var(--text-color-1);
    }
    p {
      padding-top: 6px;
      font-weight: var(--font--Regular);
      font-size: 10px;
      color: var(--text-color-1);
    }
  }
`;

const ProfileMiddleStyle = styled.div`
  margin: 15px 0 24px;

  h2 {
    padding-bottom: 5px;
    font-weight: var(--font--size-lg);
    font-size: 18px;
    color: var(--text-color-1);
  }
  
  span {
    display: inline-block;
    padding: 15px 30px;
    font-weight: var(--font--Regular);
    font-size: var(--font--size-md);
    color: var(--text-color-1);
  }
`;

const ProfileBottomStyle = styled.div`
  position: relative;

  img {
    width: 20px;
    height: 20px;
  }

  .blank{
    display: inline-block;
    width: 12px;
  }
`;

const ChatShareBtnCommonStyle = css`
  position: absolute;
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: inline-block;
  padding: 6px;
  background: var(--background-color);
  border: 1px solid var(--basic-color-6);
  border-radius: 50%;
`;

const ShareBtnStyle = styled.a`
  ${ChatShareBtnCommonStyle}
  right: 91px;
`;

const ChatStyle = styled.div`
  ${ChatShareBtnCommonStyle}
  left: 91px;
`;
