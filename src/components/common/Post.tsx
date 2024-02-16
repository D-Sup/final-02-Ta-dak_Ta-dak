import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../recoil/AtomUserState';
import { useModalStack } from '../../hooks/useModalStack';

import { postLike, deleteLike } from '../../api/heartAPI';
import { deletePost, reportPost } from '../../api/postAPI';

import styled, { keyframes } from 'styled-components';

import Modal from './Modal';
import Alert from './Alert';
import SearchProfile from './SearchProfile';
import useLazyLoading from '../../hooks/useLazyLoading';

import { ReactComponent as IconLike } from './../../assets/img/s-icon-fire.svg';
import { ReactComponent as IconComment } from './../../assets/img/s-icon-message.svg';

import moreButtonIcon from './../../assets/img/s-icon-more.svg';
import downArrow from '../../assets/img/down-arrow.png';
import errorImg from '../../assets/img/UploadImage404.svg';

const Post = ({ post }: { post: Posts }) => {

  const [contentMore, setContentMore] = useState<boolean>(true);
  const [like, setLike] = useState<boolean | undefined>(post.hearted);

  const { push, clear } = useModalStack();
  const myInfo = useRecoilValue(UserAtom);
  const observeImage = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isLike = post.hearted;
  const id = post.id || post._id || '';
  useLazyLoading(observeImage, post.image);


  const postLikeReq = (): void => {
    postLike(id);
  }

  const deleteLikeReq = (): void => {
    deleteLike(id);
  }

  const reportPostReq = async (): Promise<void> => {
    const response = await reportPost(id);
    if (response) {
      push(Alert,
        '신고가 접수되었습니다.',
        ['확인'],
        [clear],
        'AlertModal'
      )
    }
  }

  const updatePostDirection = async (): Promise<void> => {
    navigate('/editpost', {
      state: {
        id: id,
        content: post.content,
        image: post.image
      }
    })
  }

  const deletePostReq = async (): Promise<void> => {
    if (location.pathname.includes('/postdetail')) {
      await deletePost(id)
      navigate(-1);
    } else {
      await deletePost(id)
      window.location.reload();
    }
    clear();
  }

  const deletePostConfirm = async (): Promise<void> => {
    push(Alert,
      '게시글을 삭제할까요?',
      ['취소', '확인'],
      [null, deletePostReq],
      'AlertModal'
    )
  }


  const timeFormat = (time: string): string => {
    const originalDate = new Date(time);
    const formattedDate = `
      ${originalDate.getFullYear()}년 
      ${originalDate.getMonth() + 1}월 
      ${originalDate.getDate()}일`;
    return formattedDate
  }


  return (
    <>
      <PostStyle>
        <button className='postMoreButton' aria-label="PostMoreBtn" onClick={() => {
          post.author?.accountname === myInfo.accountname ?
            push(Modal,
              {},
              ['삭제', '수정'],
              [deletePostConfirm, updatePostDirection],
              'SlideUpModal'
            ) :
            push(Modal,
              {},
              ['신고'],
              [reportPostReq],
              'SlideUpModal'
            )
        }} />
        <div className='profileComponent'>
          <SearchProfile info={post.author} />
        </div>
        <PostContainerStyle locationPathname={location.pathname} contentMore={contentMore}>
          <Link to={`/postdetail/${id}`}>
            <h3 className='a11y-hidden'>포스트 내용</h3>
            <div onClick={() => setContentMore((prevValue) => !prevValue)}>
              <pre>{post.content}</pre>
              {post.content?.length >= 180 && <button className="moreContentBtn" ></button>}
            </div>
            {contentMore && post.image && (
              <img
                ref={observeImage}
                // data-src={post.image} // 이미지 URL을 설정하세요
                // src={post.image}
                alt={`${post.author.accountname}의 포스팅 이미지`}
                onError={(event) => {
                  (event.target as HTMLImageElement).src = errorImg;
                }}
              />
            )}
          </Link>
          <div className='likeCommentCount'>
            <button
              className='likeButton'
              onClick={() => {
                setLike((prev) => !prev);
              }}
            >
              <span className='a11y-hidden'>좋아요 버튼</span>
              <IconLike
                className='iconImg'
                fill={like ? '#E73C3C' : 'var(--background-color)'}
                stroke={like ? '#E73C3C' : '#767676'}
                onClick={like ? deleteLikeReq : postLikeReq}
              />
              {isLike ?
                <span className='count'>{like ? post.heartCount : post.heartCount - 1}</span> :
                <span className='count'>{like ? post.heartCount + 1 : post.heartCount}</span>
              }
            </button>
            <Link to={`/postdetail/${id}`}>
              <span className='a11y-hidden'>댓글 보기, 남기기</span>
              <IconComment className='iconImg' />
              <span className='count'>{post.comments?.length}</span>
            </Link>
          </div>
          <span className='postDate'>{timeFormat(post.createdAt)}</span>
        </PostContainerStyle>
      </PostStyle>
    </>
  );
}

export default Post

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const PostStyle = styled.article`
  position: relative;
  margin-bottom: 20px;
  width: 358px;

  @media (min-width: 768px) {
    width: 500px;
  }

  .postMoreButton {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 18px;
    height: 18px;
    background: url(${moreButtonIcon}) no-repeat center / auto 100%;

    @media (min-width: 768px) {
      width: 25px;
      height: 25px;
    }
  }
  .profileComponent {
    margin-bottom: 12px;
  }
`;

const PostContainerStyle = styled.div<{ locationPathname: string, contentMore: boolean }>`
  padding-left: 54px;
  position: relative;
  
  .moreContentBtn {
    transition: .3s;
    margin: 0 auto 16px auto;
    background: url(${downArrow}) no-repeat center center;
    filter: invert(50%);
    background-size: cover;
    width: 16px;
    height: 16px;
    display: ${({ locationPathname }) => (locationPathname.includes('/postdetail')) ? 'block' : 'none'};
    transform: ${({ contentMore }) => (contentMore) ? 'rotate(0)' : 'rotate(180deg)'};
  }

  pre {
    font-weight: var(--font--Regular);
    font-size: var(--font--size-md);
    line-height: 19px;
    margin-bottom: 16px;
    word-break: break-all;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: var(--text-color-1);
    /* transition: 1s; */
    max-height: ${({ locationPathname, contentMore }) =>
    (!locationPathname.includes('/postdetail')
    ) ? '77px' : contentMore ? '110px' : '300px'};
    text-overflow: ${({ locationPathname }) =>
    (!locationPathname.includes('/postdetail')
    ) ? 'ellipsis' : 'none'};
    overflow: ${({ locationPathname }) =>
    (!locationPathname.includes('/postdetail')) ? 'hidden' : 'scroll'};
    display: -webkit-box;
      -webkit-line-clamp: ${({ locationPathname }) => (locationPathname === '/feed') ? '6' : ''};
      -webkit-box-orient: vertical;
      overflow-y: scroll; 
      overflow-x: hidden;
    ::-webkit-scrollbar {
      background-color: var(--background-color);
      width: 0px;
    } 
  }

  img {
    animation: ${fadeIn} 1s ease-in;
    width: 304px;
    height: 228px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    margin-bottom: 16px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    img {
      width: 436px;
      height: 332px;
    }
  }

  .likeCommentCount {
    margin-bottom: 16px;
    .likeButton {
      margin-right: 18px;
    }
    .iconImg {
      vertical-align: bottom;
      width: 20px;
      height: 20px;
      margin: 0 6px 0 0;
    }
    .count {
      font-size: var(--font--size-sm);
      font-weight: var(--font--Regular);
      line-height: 12px;
      color: var(--text-color-2);
    }
  }

  .postDate {
    font-weight: var(--font--Regular);
    font-size: var(--font--size-sm);
    line-height: 12px;
    color: var(--text-color-2);
  }
`;