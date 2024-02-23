import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useModalStack } from '../hooks/useModalStack';
import useImageUploader from '../hooks/useImageUploader'
import { useLocation, useNavigate } from 'react-router-dom';
import UploadHeader from '../components/header/UploadHeader';

import { postAccountValid } from '../api/signupAPI';
import { profilemodificationReq } from '../api/profilemodificationAPI';

import styled from 'styled-components';

import Alert from '../components/common/Alert';
import Input from '../components/common/Input';
import { FileUploadLg } from '../components/common/FileUpload'
import { UserAtom } from '../recoil/AtomUserState';

const ProfileModificationPage = () => {

  const location = useLocation();
  const userInfo = location.state;

  const [userValue, setUserValue] = useRecoilState(UserAtom);
  const [idValid, setIdValid] = useState<boolean>(true);
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [idAlertMsg, setIdAlertMsg] = useState<string>('');
  const [nameAlertMsg, setNameAlertMsg] = useState<string>('')
  const [id, setId] = useState<string>(userInfo.accountname || '')
  const [name, setName] = useState<string>(userInfo.username || '')
  const [intro, setIntro] = useState<string>(userInfo.intro || '')

  const { push } = useModalStack();
  const { handleImageChange, imageURL, imagePath, uploadValidity } = useImageUploader();
  const navigate = useNavigate();


  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (value.length >= 2 && value.length <= 10) {
      setNameAlertMsg('')
      setNameValid(true)
    } else {
      setNameAlertMsg('2~10자 이내여야 합니다.')
      setNameValid(false)
    }
    setName(value)
  };

  const handleIdProfile = async (): Promise<void> => {
    const pattern = /^[A-Za-z0-9_.]+$/;
    if (pattern.test(id)) {
      const Msg = await postAccountValid(id)
      setIdAlertMsg(Msg)
      Msg === "사용 가능한 계정ID 입니다." ? setIdValid(true) : setIdValid(false)
    } else {
      setIdAlertMsg('*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.');
      setIdValid(false)
    }
  }

  const handleIdInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setId(event.target.value);
  };

  const handleIntroInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIntro(event.target.value);
  };

  const submitModification = async (): Promise<void> => {
    await profilemodificationReq(name || userInfo.username, id || userInfo.accountname, intro || userInfo.intro, imagePath || userInfo.image);
    setUserValue({ ...userValue, accountname: id, image: imagePath || userInfo.image });
    navigate(`/profile/${id || userInfo.accountname}`);
  }

  useEffect(() => {
    if (uploadValidity === '유효하지 않은 파일') {
      push(Alert,
        '잘못된 업로드입니다.',
        ['확인'],
        [null],
        'AlertModal'
      )
    }
  }, [uploadValidity])


  return (
    <>
      <UploadHeader valid={true} contents={'저장'} handleUploadBtnClick={submitModification} />
      <ProfileModificationStyle>
        <FileUploadStyle>
          <FileUploadLg onChange={handleImageChange} url={imageURL || userInfo.image} id={'profileEdit'} />
        </FileUploadStyle>
        <div className='profileInfo'>
          <Input id={'user-name'} type={'text'} label={'사용자 이름'} placeholder={'2~10자 이내여야 합니다.'} value={name} onChange={handleNameInput} valid={nameValid} alertMsg={nameAlertMsg} />
          <Input id={'user-id'} type={'text'} label={'계정 ID'} placeholder={'영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'} value={id} onChange={handleIdInput} valid={idValid} onBlur={handleIdProfile} alertMsg={idAlertMsg} />
          <Input id={'user-intro'} type={'text'} label={'소개'} placeholder={'자신과 판매할 상품에 대해 소개해 주세요!'} value={intro} onChange={handleIntroInput} valid={true} />
        </div>
      </ProfileModificationStyle>
    </>
  )
}

export default ProfileModificationPage

const ProfileModificationStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: var(--screen-height);

  .profileInfo {
    margin: 30px 34px 16px 34px;
  }

  @media (min-width: 768px) {
    height: calc(var(--screen-height) - 48px);
    .profileInfo{
      margin: 30px 0px;
    }
  }
`;

const FileUploadStyle = styled.div`
  padding-top: 78px;

  label {
    display: block;
    margin: auto;
  }

  @media (min-width: 768px) {
    padding-top: 20px;
  }
`;