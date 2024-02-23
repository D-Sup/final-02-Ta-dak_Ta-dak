import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useLazyLoading from 'hooks/useLazyLoading';

import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import errorImg from '../../assets/img/UploadImage404.svg';

const Album = ({ post, loading }: { post: Posts, loading: boolean }) => {

  const observeImage = useRef<HTMLImageElement>(null);
  useLazyLoading(observeImage, post.image);

  return (
    post.image &&
    <AlbumStyle>
      <Link to={`/postdetail/${post.id}`}>
        {loading ?
          <Skeleton baseColor={'var(--skeleton-color)'} style={{ width: '100%', aspectRatio: '1/1' }} />
          :
          <img
            ref={observeImage}
            src={post.image}
            alt={`${post.author.username}의 포스팅 이미지`}
            onError={(event) => {
              (event.target as HTMLImageElement).src = errorImg;
            }}
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