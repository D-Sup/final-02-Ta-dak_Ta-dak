import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../recoil/AtomUserState';

import { writeComment } from '../../api/commentAPI';

import styled from 'styled-components';

import { ProfileSm } from './Profile';
import { useState } from 'react';

interface CommentInputProps {
  postId: string | undefined,
  setReset: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentInput = ({ postId, setReset }: CommentInputProps) => {

  const userInfo = useRecoilValue(UserAtom)
  const [content, setContent] = useState<string>('');

  const handleSubmit = async (): Promise<void> => {
    setContent('')
    await writeComment(postId as string, content);
    setReset(true)
  }


  return (
    <InputContainerStyle>
      <div className="imgcontainer">
        <ProfileSm url={userInfo.image} />
      </div>
      <InputStyle type={'text'} placeholder='댓글 입력하기...' value={content} onChange={(event) => setContent(event.target.value)}></InputStyle>
      <button id="comment-post" onClick={handleSubmit}>게시</button>
    </InputContainerStyle>
  )
}

export default CommentInput

const InputContainerStyle = styled.div`
  width: var(--basic-width);
  min-height: 61px;
  display: flex;
  align-items: center;
  background-color: var(--background-color);

  .imgcontainer {
    width: 40px;
    height: 40px;
    margin: 0 16px;
  }

  input {
    width: 100%;
    font-size: var(--font--size-md);
    background-color: var(--background-color);
    color: var(--text-color-1);

    @media (min-width: 768px) {
      width: 393px;
    }
  }

  button {
    width: 55px;
    height: 19px;
    margin: 0 auto;
    padding-right: 10px;
    font-size: var(--font--size-md);
    color: #c4c4c4;
    display: inline-block;
    transition: 0.5s;
    &:hover {
      color: var(--basic-color-5);
    }
  }
`;
const InputStyle = styled.input`
  ::placeholder {
    color: var(--text-color-2);
  } 
`;

