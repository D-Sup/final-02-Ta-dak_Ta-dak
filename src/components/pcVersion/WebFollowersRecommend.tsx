import { useState, useEffect } from 'react';
import useUserInfo from 'hooks/useUserInfo';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { getRecFollowingList } from '../../api/followListAPI';

import styled from 'styled-components';

import FollowersProfile from "./../common/FollowersProfile";

const FollowersRecommend = () => {

  const [myFollowList, setMyFollowList] = useState<Author[]>([])
  const [recFollowList, setRecFollowList] = useState<Author[]>([])
  const [firstMount, setFirstMount] = useState<boolean>(true)

  const { accountname: myAccountname, id: myId } = useUserInfo()

  const fetchRecFollowList = () => {
    // 중복된 값을 저장할 Set
    const duplicatedFollowSet = new Set<Author>();

    // 중복된 값 제거한 myFollowList _id속성 Set에 추가
    const seen = new Set();

    myFollowList.forEach(async (item) => {
      let list = await getRecFollowingList(item.accountname);
      console.log(item.accountname);

      list.forEach((item) => {
        if (seen.has(item._id)) {
          let flag = true;

          // myFollowList(이미 팔로잉중인 리스트)에 포함되면 제외
          const myFollowArray = Array.from(myFollowList);
          const duplicatedFollowArray = Array.from(duplicatedFollowSet) as Author[];

          for (let i = 0; i < myFollowArray.length; i++) {
            if (myFollowArray[i]._id === item._id) {
              flag = false;
              break;
            }
          }

          // 나인 경우 제외
          if (myId === item._id) flag = false;

          // 이미 추천리스트에 들어가있는 경우 제외
          for (let i = 0; i < duplicatedFollowArray.length; i++) {
            if (duplicatedFollowArray[i]._id === item._id) {
              flag = false;
              break;
            }
          }
          flag && duplicatedFollowSet.add(item);

        } else {
          seen.add(item._id);
        }
      })
      setRecFollowList(Array.from(duplicatedFollowSet) as Author[]);
    })

  }

  useEffect(() => {
    const fetchMyFollowList = async () => {
      let list = await getRecFollowingList(myAccountname);
      setMyFollowList((prevValue) => [...prevValue, ...list]);
    }
    fetchMyFollowList();
  }, [myAccountname]);


  useEffect(() => {
    if (firstMount && myFollowList.length !== 0) {
      fetchRecFollowList();
      setFirstMount(false);
    }
  }, [myFollowList]);


  return (
    <RecWrapperStyle>
      <RecTitleStyle>팔로우 추천</RecTitleStyle>
      <RecBoxStyle>
        <div className='followListWrapper'>
          {recFollowList.length !== 0 ? (
            recFollowList.map((item, index) => (
              <FollowersProfile followingUser={item} key={index} />
            ))
          ) : (
            Array(6).fill(1).map((item, index) => (
              <FollowersProfile followingUser={item} key={index} />
            ))
          )}
        </div>
      </RecBoxStyle>
    </RecWrapperStyle>
  );
}

export default FollowersRecommend


const RecWrapperStyle = styled.div`
  width: 392px;
  min-height: 38px;
`;

// h태그 페이지 숫자 맞춰서 바꾸기
const RecTitleStyle = styled.h3`
  font-size: var(--font--size-lg);
  color: var(--text-color-2);
  margin-bottom: 20px;
`;

const RecBoxStyle = styled.div`
  height: 400px;
  overflow-y: auto;

  .followListWrapper {
    width: 362px;
  }

  ::-webkit-scrollbar {
    width: 30px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #e5e4df;
    background-clip: padding-box;
    border: 10px solid transparent;
    border-radius: 50px;
  }

  div {
    color: var(--text-color-1);
  }
`;

