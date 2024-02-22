import styled from 'styled-components';

import Post from '../common/Post';

import { ReactComponent as NoPost } from '../../assets/img/sleepbonfire.svg';

const PostList = ({ visiblePost, loading }: { visiblePost: Posts[], loading?: boolean }): JSX.Element => {

  return (
    <>
      <h2 className="a11y-hidden">포스트</h2>
      <PostListStyle>
        {visiblePost.length !== 0 ? (
          visiblePost.map((item, index) => (
            <Post post={item} key={index} loading={loading} />
          ))
        ) : (
          Array(3).fill(1).map((item, index) => (
            <Post post={item} key={index} loading={true} />
          ))
        )}
      </PostListStyle>
      {visiblePost.length === 0 && !loading &&
        <NoVisiblePost>
          <div className="noPostWrapper">
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

export default PostList;

const PostListStyle = styled.div`
  width: 100%;
  max-width: var(--basic-width);
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 0px;
  }

  p {
    display: -webkit-box;
    /* 7줄 넘어가면 말줄임 */
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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