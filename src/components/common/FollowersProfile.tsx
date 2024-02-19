import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { doFollowing, doUnfollowing } from '../../api/followAPI';

import styled from 'styled-components';

import { GreenSmBtn, WhiteSmBtn } from './Button';
import { ProfileSm } from './Profile';

const FollowersProfile = ({ followingUser }: { followingUser: Author }) => {

  const [isMe, setIsMe] = useState<boolean>(false);
  const [isFollow, setIsFollow] = useState<boolean>(followingUser.isfollow as boolean)

  const navigate = useNavigate();

  const followBtnHandler = async (): Promise<void> => {
    await doFollowing(followingUser.accountname);
    setIsFollow(true);
  };

  const unFollowBtnHandler = async (): Promise<void> => {
    await doUnfollowing(followingUser.accountname);
    setIsFollow(false);
  };

  const followerClickHandler = (): void => {
    navigate(`/profile/${followingUser.accountname}`)
  }

  useEffect(() => {
    const accountname = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '{}').UserAtom.accountname : '';
    if (accountname === followingUser.accountname) {
      setIsMe(true)
    }
  }, [])


  return (
    <FollowersProfileStyle>
      <ProfileSm url={`${followingUser.image}`} />
      <div className='userInfo' onClick={followerClickHandler}>
        <p>{followingUser.username}</p>
        <span>{followingUser.intro}</span>
      </div>
      {
        !isMe ?
          isFollow ? (
            <WhiteSmBtn contents={'취소'} handleFunc={unFollowBtnHandler} type='button' />
          ) : (
            <GreenSmBtn contents={'팔로우'} handleFunc={followBtnHandler} type='button' />
          )
          : null
      }

    </FollowersProfileStyle>
  );
}

export default FollowersProfile

const FollowersProfileStyle = styled.div`
  position: relative;
  /* width: 358px; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  img {
    width: 50px;
    height: 50px;
  }

  .userInfo {
    position: absolute;
    padding-left: 62px;
    cursor: pointer;
    
    p,
    span {
      width: calc(358px * 0.6);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      padding-bottom: 6px;
      font-weight: var(--font--Medium);
      font-size: var(--font--size-md);
      color: var(--text-color-1)
    }
    span {
      display: inline-block;
      font-weight: var(--font--Regular);
      font-size: var(--font--size-sm);
      color: var(--text-color-3);
    }
  }
`;
