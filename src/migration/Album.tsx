import { Link } from 'react-router-dom';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';

export default function Album({
  post
}: any) {
  return (
    post.image && 
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <AlbumStyle>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Link to={`/postdetail/${post.id}`}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img
          src={post.image}
          alt={`${post.author.username}의 포스팅 이미지`}
        />
      </Link>
    </AlbumStyle>
  );
}

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