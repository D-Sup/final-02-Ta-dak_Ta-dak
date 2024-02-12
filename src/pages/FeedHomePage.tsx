import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useScrollBottom from '../hooks/useScrollBottom';

import { getPost, getPostAll } from '../api/postAPI';

import styled from 'styled-components';

import TopButton from '../components/common/TopButton';
import MainHeader from '../components/header/MainHeader';
import PostList from '../components/UserPostList/PostList';
import Loader from '../Loader/Loader';

const FeedHomePage = () => {

  const [loadPostSeq, setLoadPostSeq] = useState<number>(0);
  const [visiblePost, setVisiblePost] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const elementRef = useRef<HTMLDivElement>(null);
  const isBottom = useScrollBottom(elementRef);

  const navigate = useNavigate();
  const location = useLocation();

  const upDateFeed = async (value: number): Promise<GetPostResponse | null> => {
    if (location.pathname === '/feed') {
      const data = await getPost(value)
      setVisiblePost((PrevValue) => [...PrevValue, ...data.posts]);

      setLoading(false)
      return data
    }
    else if (location.pathname === '/recommendfeed') {
      const data = await getPostAll(value)
      setVisiblePost((PrevValue) => [...PrevValue, ...data.posts]);
      setLoading(false);
      return data;
    }
    return null
  }

  useEffect(() => {
    if (isBottom) {
      upDateFeed(loadPostSeq + 5)
      setLoadPostSeq((PrevValue) => PrevValue + 5)
    }
  }, [isBottom]);

  useEffect(() => {
    setLoading(true);
    const upDate = async () => {
      const data = await upDateFeed(0);
      if (data?.posts.length === 0) {
        navigate('/feed/nonfollow')
      };
    }
    if (location.pathname === '/feed') {
      upDate()

    }
    else if (location.pathname === '/recommendfeed') {
      upDateFeed(0);

    }
    setVisiblePost([]);
    setLoadPostSeq(0);
  }, [location.pathname])


  return (
    <>
      <MainHeader />
      <PostListStyle ref={elementRef}>
        {loading ? <Loader /> : visiblePost.length !== 0 && <PostList visiblePost={visiblePost} />}
      </PostListStyle>
      <TopButton elementRef={elementRef} />
    </>
  );
}

export default FeedHomePage

const PostListStyle = styled.div`
  height: var(--screen-nav-height);
  overflow-y: scroll; 
  overflow-x: hidden;
  ::-webkit-scrollbar {
  background-color: var(--background-color);
  width: 0px;
  }
`;