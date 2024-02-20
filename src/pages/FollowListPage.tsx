import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useScrollBottom from '../hooks/useScrollBottom';

import { getFollowerList, getFollowingList } from '../api/followListAPI';

import styled from 'styled-components';

import FollowersProfile from '../components/common/FollowersProfile';
import ChatHeader from '../components/header/ChatHeader';
import Loader from '../Loader/Loader';

const FollowListPage = () => {

  const [loadFollowSeq, setLoadFollowSeq] = useState<number>(0);
  const [followList, setFollowList] = useState<Author[]>([]);
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [firstMount, setFirstMount] = useState(true);

  const elementRef = useRef<HTMLDivElement>(null);
  const { accountname } = useParams() as { accountname: string };
  const isBottom = useScrollBottom(elementRef);
  const location = useLocation();

  const loadFollowList = async (value: number): Promise<void> => {
    let list: Author[];
    if (location.pathname === `/profile/${accountname}/following`) {
      list = await getFollowingList(accountname, value);
      setTitle('Followings');
      setTimeout(() => {
        setLoading(false);
      }, 300)
    } else if (location.pathname === `/profile/${accountname}/follower`) {
      list = await getFollowerList(accountname, value);
      setTitle('Followers');
      setTimeout(() => {
        setLoading(false);
      }, 300)
    }
    setFollowList((prevValue) => [...prevValue, ...list]);
  };

  if (firstMount) {
    loadFollowList(loadFollowSeq);
    setFirstMount(false);
  }

  useEffect(() => {
    if (isBottom) {
      loadFollowList(loadFollowSeq + 20);
      setLoadFollowSeq((PrevValue) => PrevValue + 20);
    }
  }, [isBottom]);


  return (
    <>
      <ChatHeader name={`${title}`} isButton={false} />
      <FollowListStyle ref={elementRef}>
        {
          followList.map((item) => (
            <FollowersProfile followingUser={item} key={item._id} loading={loading} />
          ))
        }
        {
          followList.length === 0 && !loading &&
          <NoFollowListStyle>
            {title === 'Followings' ? (
              <span>팔로잉한 사람이 없습니다</span>
            ) : (
              <span>팔로워가 없습니다</span>
            )}
          </NoFollowListStyle>
        }

      </FollowListStyle>
    </>
  );
}

export default FollowListPage

const FollowListStyle = styled.div`
  height: var(--screen-nav-height);
  padding: 16px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background-color: var(--background-color);
    width: 0px;
  }
`;

const NoFollowListStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: var(--text-color-1);
    font-size: var(--font--size-md);
  }
`;
