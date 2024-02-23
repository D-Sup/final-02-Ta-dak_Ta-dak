import { useEffect, useState } from 'react'

import { useModalStack } from 'hooks/useModalStack'
import { getPostAll } from 'api/postAPI'

import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import CarouselModal from 'components/common/CarouselModal'
import { ProfileMd } from 'components/common/Profile'

const StoryBoard = () => {

  const [visiblePost, setVisiblePost] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstMount, setFirstMount] = useState<boolean>(true);

  const { push } = useModalStack();

  const upDateFeed = async (value: number): Promise<void> => {
    const data = await getPostAll(value)

    const arr: any[] = data.posts.filter(item => item.image !== 'false' && item.image !== '' && item.image !== null && !item.image.includes('data:'))

    let result: any[] = [];
    let map: any = {};

    for (let i = 0; i < arr.length; i++) {
      let id = arr[i].author.accountname;
      let images = arr[i].image.split(',').map((img: string) => img.trim());
      let content = arr[i].content;

      if (!map[id]) {
        map[id] = {
          author: { ...arr[i].author },
          image: [...images],
          content: images.map(() => content)
        };
        result.push(map[id]);
      } else {
        images.forEach((image: any) => {
          map[id].image.push(image);
          map[id].content.push(content);
        });
      }
    }

    setVisiblePost((PrevValue) => [...PrevValue, ...result]);
    // setTimeout(() => {
    setLoading(false)
    // }, 600)
  }

  useEffect(() => {
    if (firstMount) {
      upDateFeed(100)
      setFirstMount(false)
    }
  }, [])

  return (
    <StoryBoardStyle>
      {loading ? (
        Array(10).fill(1).map((_, index) => (
          <div key={index} className='skeleton-container'>
            <Skeleton baseColor={'var(--skeleton-color)'} width={50} height={50} circle={true} />
            <Skeleton baseColor={'var(--skeleton-color)'} width={50} height={15} style={{ marginTop: '10px', marginRight: '8px', borderRadius: '30px' }} />
          </div>
        ))
      ) : (
        <>
          {visiblePost.map((item, index) => (
            <div
              key={item.id || index}
              className='profile-container'
              onClick={() => {
                push(CarouselModal,
                  {
                    visiblePost,
                    selectedIndex: index
                  },
                  [''],
                  [null],
                  'CarouselModal'
                )
              }}
            >
              <ProfileMd url={item.author.image} loading={loading} style={{ border: '2px solid var(--basic-color-1)' }} />
              <span className='user-accountname'>
                {item.author.accountname}
              </span>
            </div>
          ))}
        </>
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
    padding-bottom: 6px;
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-accountname {
    padding: 10px 0;
    text-align: center;
    display: inline-block;
    width: 55px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-color-1);
    font-size: var(--font--size-sm);
  }

`