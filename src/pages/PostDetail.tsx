import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { useRecoilValue } from 'recoil'

import { UserAtom } from '../recoil/AtomUserState'
import { getPostDetail } from '../api/postAPI'
import { getComment } from '../api/commentAPI'

import styled from "styled-components"

import BasicHeader from "../components/header/BasicHeader"
import Post from "../components/common/Post"
import Comment from "../components/common/Comment"
import CommentInput from "../components/common/CommentInput"
import Loader from '../Loader/Loader';

const PostDetail = () => {

  const myInfo = useRecoilValue(UserAtom)
  const [post, setPost] = useState<Posts | null>(null);
  const [comment, setComment] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const location = useLocation();

  const postId = location.pathname.replace('/postdetail/', '');

  const getReq = async (): Promise<void> => {
    const [prePost, preComment] = await Promise.all([getPostDetail(postId), getComment(postId)]);
    setPost(prePost.post !== undefined ? prePost.post : null);
    setComment(preComment.comments);
    setLoading(true);
  };

  useEffect(() => {
    getReq()
    setReset(false)
  }, [reset])


  return (
    <>
      <BasicHeader isButton={false} />
      <PostContainer>
        {loading && post !== null ?
          <PostStyle>
            <Post post={post}></Post>
          </PostStyle> :
          <Loader />}
        <CommentStyle>
          {loading ? comment.map((item) => (
            item.content && (
              <li key={item.id}>
                <Comment item={item} myInfo={myInfo} setReset={setReset} />
              </li>
            ))) : undefined}
        </CommentStyle>
        {loading && post !== null ? <CommentInput postId={post.id} setReset={setReset} /> : null}
      </PostContainer>
    </>
  )
}

export default PostDetail

const PostContainer = styled.div`
  height: var(--screen-nav-height);
  display: flex;
  flex-direction: column;
`;

const PostStyle = styled.div`
  margin: 20px;
  max-height: 700px;

  @media (min-width: 768px) {
    margin: 0px;
  }
`;

const CommentStyle = styled.ul`
  box-shadow: 0px -1px var(--basic-color-6);
  border-bottom: 1px solid var(--basic-color-6);
  flex-grow: 1;
  flex-basis: 0;
  overflow: scroll;
  overflow-x: hidden;
  padding-top: 20px;
::-webkit-scrollbar {
  background-color: var(--background-color);
  width: 0px;
}
`;