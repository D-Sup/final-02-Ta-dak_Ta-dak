import styled, { css } from 'styled-components';

import BasicProfile from '../../assets/img/basic-profile.svg';
import { useRef } from 'react';
import useLazyLoading from '../../hooks/useLazyLoading';

const getProfileSrc = (url: string): string => {
  if (url !== '' && url.includes("https://") && url !== "http://146.56.183.55:5050/Ellipse.png") {
    return url;
  } else {
    return BasicProfile;
  }
}

interface ProfileProps {
  url: string,
  confirm?: boolean
}

export const ProfileLg = ({ url = '' }: ProfileProps): JSX.Element => {
  console.log('url', getProfileSrc(url));
  return <ProfileLgStyle src={url || BasicProfile} alt="Large Profile" />
}

export const ProfileMd = ({ url = '' }: ProfileProps): JSX.Element => {
  const observeImage = useRef(null);
  useLazyLoading(observeImage, getProfileSrc(url));
  return <ProfileMdStyle ref={observeImage} alt="Medium Profile" />
}

export const ProfileSm = ({ url = '', confirm = false }: ProfileProps) => {
  const observeImage = useRef(null);
  useLazyLoading(observeImage, getProfileSrc(url));
  return (
    <ProfileContainer confirm={confirm}>
      <ProfileSmStyle ref={observeImage} alt="Small Profile" />
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div<{ confirm: boolean }>`
  position: relative;
  &:after{
    position: absolute;
    top: 0;
    left: 15px;
    content: '';
    width:  12px;
    height: 12px;
    border-radius: 50%;
    background-color: #FF8B13;
    display: ${({ confirm }) => (confirm) ? 'block' : 'none'};
  }
`;

const ProfileCommonStyle = css`
  vertical-align: top;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileLgStyle = styled.img`
  ${ProfileCommonStyle}
  width: 110px;
  height: 110px;
`;

const ProfileMdStyle = styled.img`
  ${ProfileCommonStyle}
  width: 50px;
  height: 50px;
`;

const ProfileSmStyle = styled.img`
  ${ProfileCommonStyle}
  width: 40px;
  height: 40px;
`;