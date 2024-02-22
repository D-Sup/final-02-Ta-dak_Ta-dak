import { useEffect, useState } from 'react'


import { getPostAll } from 'api/postAPI'

import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { ProfileMd } from 'components/common/Profile'

const StoryBoard = () => {

  const [visiblePost, setVisiblePost] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const upDateFeed = async (value: number): Promise<void> => {
    const data = await getPostAll(value)
    setVisiblePost((PrevValue) => [...PrevValue, ...data.posts]);
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }

  useEffect(() => {
    upDateFeed(30)
  }, [])

  return (
    <StoryBoardStyle>
      {loading ? (
        Array(10).fill(1).map((_, index) => (
          <div key={index} className='skeleton-container'>
            <Skeleton baseColor={'var(--skeleton-color)'} width={50} height={50} circle={true} />
            <Skeleton baseColor={'var(--skeleton-color)'} width={50} height={15} style={{ marginTop: '10px', borderRadius: '30px' }} />
          </div>
        ))
      ) : (
        visiblePost.map((item, index) => (
          <div key={item.id || index}>
            <ProfileMd url={item.image} loading={loading} style={{ border: '2px solid var(--basic-color-1)' }} />
            <span className='user-accountname'>{item.author.accountname}</span>
          </div>
        ))
      )}
    </StoryBoardStyle>
  );
}

export default StoryBoard;

const StoryBoardStyle = styled.div`
  margin-top: 10px;
  padding-bottom: 10px;
  position: relative;
  border: 10px solid var(--background-color);
  display: flex;
  gap: 15px;
  overflow-x: scroll;
  overflow-y: hidden;
  transition: .3s;
  ::-webkit-scrollbar {
      height: 7px;
    }
  ::-webkit-scrollbar-thumb {
      background-color: rgb(232, 231, 227); 
      border-radius: 30px;
    }
  
  .skeleton-container{
    padding-bottom: 14px;
  }

  .user-accountname {
    padding: 10px 0;
    display: inline-block;
    width: 55px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-color-1);
  }

`