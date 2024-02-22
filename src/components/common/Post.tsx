import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../recoil/AtomUserState';
import { useModalStack } from '../../hooks/useModalStack';
import useLazyLoading from 'hooks/useLazyLoading';
import useWindowSize from 'hooks/useWindowSize';

import { postLike, deleteLike } from '../../api/heartAPI';
import { deletePost, reportPost } from '../../api/postAPI';

import styled, { keyframes } from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Modal from './Modal';
import Alert from './Alert';
import SearchProfile from './SearchProfile';

import { ReactComponent as IconLike } from './../../assets/img/s-icon-fire.svg';
import { ReactComponent as IconComment } from './../../assets/img/s-icon-message.svg';

import moreButtonIcon from './../../assets/img/s-icon-more.svg';
import downArrow from '../../assets/img/down-arrow.png';
import errorImg from '../../assets/img/UploadImage404.svg';

const Post = ({ post, loading }: { post: Posts, loading?: boolean }) => {

  const [contentMore, setContentMore] = useState<boolean>(true);
  const [like, setLike] = useState<boolean | undefined>(post.hearted);

  const { currentWidth } = useWindowSize();
  const { push, clear } = useModalStack();
  const myInfo = useRecoilValue(UserAtom);
  const observeImage = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useLazyLoading(observeImage, post.image);

  const isLike = post.hearted;
  const id = post.id || post._id || '';


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
          <SearchProfile info={post.author || ''} loading={loading} />
        </div>
        <PostContainerStyle locationPathname={location.pathname} contentMore={contentMore}>
          <Link to={`/postdetail/${id}`}>
            <h3 className='a11y-hidden'>포스트 내용</h3>
            <div onClick={() => setContentMore((prevValue) => !prevValue)}>
              {
                loading ?
                  <>
                    <Skeleton baseColor={'var(--skeleton-color)'} width={150} height={20} />
                    <Skeleton baseColor={'var(--skeleton-color)'} width={200} height={20} style={{ marginTop: '17px', marginBottom: '16px' }} />
                  </>
                  :
                  <pre>{post.content}</pre>
              }
              {post.content?.length >= 180 && <button className="moreContentBtn" ></button>}
            </div>
            {loading && <Skeleton baseColor={'var(--skeleton-color)'} height={currentWidth > 768 ? 332 : 228} style={{ width: '100%', marginBottom: '16px' }} />}
            {!loading && post.image !== 'false' &&
              <img
                src={post.image}
                ref={observeImage}
                style={{ display: loading ? 'none' : 'block' }}
                onError={(event) => {
                  (event.target as HTMLImageElement).src = errorImg;
                }}
                alt={`${!loading && post.author.accountname}의 포스팅 이미지`}
              />}
          </Link>
          {
            loading ?
              <Skeleton baseColor={'var(--skeleton-color)'} width={100} height={21} style={{ marginBottom: '16px' }} />
              :
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
                    stroke={like ? '#E73C3C' : 'var(--text-color-2)'}
                    onClick={like ? deleteLikeReq : postLikeReq}
                  />
                  {isLike ?
                    <span className='count'>{like ? post.heartCount : post.heartCount - 1}</span> :
                    <span className='count'>{like ? post.heartCount + 1 : post.heartCount}</span>
                  }
                </button>
                <Link to={`/postdetail/${id}`}>
                  <span className='a11y-hidden'>댓글 보기, 남기기</span>
                  <IconComment className='iconImg' stroke={'var(--text-color-2)'} />
                  <span className='count'>{post.comments?.length}</span>
                </Link>
              </div>
          }

          {
            loading ?
              <Skeleton baseColor={'var(--skeleton-color)'} width={130} height={17}
                style={{
                  position: 'absolute',
                  right: '0',
                  bottom: '0',
                  marginBottom: '35px'
                }}
              />
              :
              <span className='postDate'>
                {timeFormat(post.createdAt)}
              </span>
          }
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
  width: 100%;
  /* margin-bottom: 20px; */
  /* width: 358px; */
  /* background-color: var(--background-color); */
  border-radius: 10px;
  padding: 15px 10px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 100%;
  }

  .postMoreButton {
    position: absolute;
    top: 20px;
    right: 10px;
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
  /* padding-left: 54px; */
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
    /* width: 304px; */
    width: 100%;
    height: 228px;
    border-radius: 5px;
    margin-bottom: 16px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    img {
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
    position: absolute;
    right: 0;
    bottom: 0;
    font-weight: var(--font--Regular);
    font-size: var(--font--size-sm);
    line-height: 12px;
    color: var(--text-color-2);
  }
`;