import styled from 'styled-components';

import Album from '../common/Album';

import { ReactComponent as NoPost } from '../../assets/img/sleepbonfire.svg';

const AlbumList = ({ visiblePost, loading }: { visiblePost: Posts[], loading: boolean }) => {




  return (
    <>
      <h2 className="a11y-hidden">앨범형 포스트</h2>
      <AlbumListStyle>
        {
          visiblePost.filter(item => item.image !== 'false').map((item) => (
            <Album post={item} key={item.id || item._id} loading={loading} />
          ))
        }
      </AlbumListStyle>
      {visiblePost.length === 0 && !loading &&
        <NoVisiblePost>
          <div className='noPostWrapper'>
            <div>
              <NoPost />
            </div>
            <span>포스트가 없습니다</span>
          </div>
        </NoVisiblePost>
      }
    </>
  );
}

export default AlbumList

const AlbumListStyle = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: var(--basic-width);
  padding: 30px;
  padding: 16px;
`;

const NoVisiblePost = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  position: relative;
  .noPostWrapper {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
  span {
    color: var(--text-color-1);
    font-size: var(--font--size-md);
  }
`;