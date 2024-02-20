import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Album = ({ post, loading }: { post: Posts, loading: boolean }) => {

  return (
    post.image &&
    <AlbumStyle>
      <Link to={`/postdetail/${post.id}`}>
        {loading ?
          <Skeleton style={{ width: '100%', aspectRatio: '1/1' }} />
          :
          <img
            src={post.image}
            alt={`${post.author.username}의 포스팅 이미지`}
          />
        }
      </Link>
    </AlbumStyle>
  );
}

export default Album

const AlbumStyle = styled.li`
  display: inline-block;
  width: calc((var(--basic-width) - 48) / 3) px;
  aspect-ratio: 1/1;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    vertical-align: top;
    object-fit: cover;
  }
`;