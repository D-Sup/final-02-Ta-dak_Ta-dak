import styled, { css } from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  url?: string,
  confirm?: boolean
  loading?: boolean
}

export const ProfileLg = ({ url = '', loading = false }: ProfileProps): JSX.Element => {
  return (
    <>
      {loading && <Skeleton width={110} height={110} circle={true} />}
      <ProfileLgStyle
        src={url || BasicProfile}
        alt="Large Profile"
        style={{ display: loading ? 'none' : 'block' }}
        onError={(event) => {
          (event.target as HTMLImageElement).src = BasicProfile;
        }}
      />
    </>
  )
}

export const ProfileMd = ({ url = '', loading = false }: ProfileProps): JSX.Element => {
  const observeImage = useRef<HTMLImageElement>(null);
  useLazyLoading(observeImage, getProfileSrc(url));
  return (
    <>
      {loading && <Skeleton width={50} height={50} circle={true} style={{ marginRight: '12px' }} />}
      <ProfileMdStyle
        ref={observeImage}
        alt="Medium Profile"
        style={{ display: loading ? 'none' : 'block' }}
        onError={(event) => {
          (event.target as HTMLImageElement).src = BasicProfile;
        }}
      />
    </>
  )
}

export const ProfileSm = ({ url = '', confirm = false, loading = false }: ProfileProps): JSX.Element => {
  const observeImage = useRef<HTMLImageElement>(null);
  useLazyLoading(observeImage, getProfileSrc(url));
  return (
    <ProfileContainer confirm={confirm}>
      {loading && <Skeleton width={40} height={40} circle={true} />}
      <ProfileSmStyle
        ref={observeImage}
        alt="Small Profile"
        style={{ display: loading ? 'none' : 'block' }}
        onError={(event) => {
          (event.target as HTMLImageElement).src = BasicProfile;
        }}

      />
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div<{ confirm: boolean }>`
  position: relative;
  &:after{
    position: absolute;
    top: 0;
    left: 0;
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
  max-width: 110px;
  max-height: 110px;
`;

const ProfileMdStyle = styled.img`
  ${ProfileCommonStyle}
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;

`;

const ProfileSmStyle = styled.img`
  ${ProfileCommonStyle}
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
`;