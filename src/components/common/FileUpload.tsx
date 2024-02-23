import styled from 'styled-components';

import { ProfileLg } from './Profile';

import IconUploadMd from '../../assets/img/s-upload-file.svg'
import IconUploadSm from '../../assets/img/s-upload-file.svg'

interface FileUploadProps {
  id: string,
  url?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

export const FileUploadLg = ({ id, url = '', ...rest }: FileUploadProps): JSX.Element => {
  return (
    <>
      <FileLgLabelStyle htmlFor={id}>
        <ProfileLg url={url} />
      </FileLgLabelStyle>
      <FileInputStyle {...rest} id={id} aria-label="FileInput" type='file'></FileInputStyle>
    </>
  );
}

// 사진파일추가 36*36  => 50*50
export const FileUploadMd = ({ id, ...rest }: FileUploadProps): JSX.Element => {
  return (
    <>
      <FileMdLabelStyle htmlFor={id}></FileMdLabelStyle>
      <FileInputStyle {...rest} id={id} type='file'></FileInputStyle>
    </>
  );
}

// 사진파일추가 50*50  => 36*36
export const FileUploadSm = ({ id, ...rest }: FileUploadProps): JSX.Element => {
  return (
    <>
      <FileSmLabelStyle htmlFor={id}></FileSmLabelStyle>
      <FileInputStyle {...rest} id={id} type='file'></FileInputStyle>
    </>
  );
}

const FileLgLabelStyle = styled.label`
  display: inline-block;
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  cursor: pointer;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 36px;
    height: 36px;
    background: url(${IconUploadSm}) no-repeat center / auto 100%;
    cursor: pointer;
  }
`;

const FileMdLabelStyle = styled.label`
  display: inline-block;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background: url(${IconUploadMd}) no-repeat center / auto 100%;
`;

const FileSmLabelStyle = styled.label`
  display: inline-block;
  width: 36px;
  height: 36px;
  cursor: pointer;
  background: url(${IconUploadSm}) no-repeat center / auto 100%;
`;

const FileInputStyle = styled.input`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;