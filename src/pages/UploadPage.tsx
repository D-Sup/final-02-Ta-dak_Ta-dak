import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useModalStack } from '../hooks/useModalStack';
import { UserAtom } from '../recoil/AtomUserState';
import useImageUploader from '../hooks/useImageUploader';

import { editPost } from '../api/postAPI';
import { upload } from '../api/uploadAPI';

import styled from 'styled-components';

import UploadHeader from '../components/header/UploadHeader';
import Alert from '../components/common/Alert';
import { ProfileMd } from '../components/common/Profile';
import { FileUploadMd } from '../components/common/FileUpload';

const UploadPage = () => {

  const userInfo = useRecoilValue(UserAtom);

  const location = useLocation();
  const locationValue = location.state;
  const [text, setText] = useState<string>(locationValue?.content || '');
  const [valid, setValid] = useState<boolean>(false);

  const { push } = useModalStack();
  const { handleImageChange, imageURL, imagePath, uploadValidity } =
    useImageUploader();

  const navigate = useNavigate();


  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = event.target.value;
    setText(newText);
    setValid(!!newText);
  };

  const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleUploadBtnClick = async (): Promise<void> => {
    if (location.pathname === '/upload') {
      const uploadPost = await upload(text, imagePath as string);
      navigate(`/profile/${uploadPost.post?.author.accountname}`);
    } else if (location.pathname === '/editpost') {
      await editPost(locationValue.id, text, imagePath || locationValue?.image);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (uploadValidity === '유효하지 않은 파일') {
      push(Alert,
        '잘못된 업로드입니다.',
        ['확인'],
        [null],
        'AlertModal'
      )
    }
    else if (location.pathname === '/editpost') {
      setValid(true);
    }
  }, [uploadValidity, location.pathname]);


  return (
    <>
      <h1 className="a11y-hidden">게시물 업로드</h1>
      <UploadHeader
        valid={valid}
        contents={'업로드'}
        handleUploadBtnClick={handleUploadBtnClick}
      />
      <UploadPageStyle>

        <PostWrapperStyle>
          <ProfileMd url={userInfo.image} />
          <div className="uploading">
            <textarea
              onChange={handleChange}
              value={text}
              name="uploading-post"
              id="uploading-post"
              placeholder="여러분의 캠핑을 기록해 주세요"
              onInput={autoResize}
            />
            {imageURL || locationValue?.image ? (
              <img
                src={imageURL || locationValue?.image}
                alt="게시글 이미지"
                className="showImg"
              />
            ) : null}

            <div className="uploadImgBtn">
              <FileUploadMd id={'uploading-img'} onChange={handleImageChange} aria-label="FileInput" />
            </div>
          </div>
        </PostWrapperStyle>
      </UploadPageStyle>
    </>
  );
}

export default UploadPage

const UploadPageStyle = styled.section`
  position: relative;
  height: calc(var(--screen-height));
  @media (min-width: 768px) {
    height: calc(var(--screen-height) - 48px);
  }

  .uploadImgBtn {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
`;

const PostWrapperStyle = styled.article`
  display: flex;
  padding: 20px 10px;
  max-height: 696px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0px;
    background-color: var(--background-color);
  }

  @media (min-width: 768px) {
    margin: 0px 10px 20px 10px;
  }

  .uploading {
    margin: 12px 0 0 12px;
    textarea {
      font-family: 'Noto Sans KR', sans-serif;
      width: 308px;
      min-height: 80px;
      resize: none;
      overflow: hidden;
      border: none;
      outline: none;
      resize: none;
      background-color: transparent;
      font-size: var(--font--size-md);
      text-align: justify;
      color: var(--text-color-1);
      ::placeholder {
        color: var(--text-color-2);
      }
      @media (min-width: 768px) {
        width: 420px;
      }
    }
    .showImg {
      width: 304px;
      aspect-ratio: 304/228;
      margin-top: 15px;
      border-radius: 10px;
      border: 0.5px solid var(--box-shadow-color);
      @media (min-width: 768px) {
        width: 404px;
      }
    }
  }
`;