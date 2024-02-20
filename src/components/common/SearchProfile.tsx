import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import UserId from './UserId';
import { ProfileMd } from './Profile'

const SearchProfile = ({ info, loading }: { info: Author, loading?: boolean }) => {

  const navigate = useNavigate();

  const followerClickHandler = (): void => {
    navigate(`/profile/${info.accountname}`);
  };


  return (
    <SearchProfileStyle>
      <>
        <div onClick={followerClickHandler} >
          <ProfileMd url={info.image} loading={loading} />
        </div>
        <div onClick={followerClickHandler}>
          <strong>{loading ? <Skeleton width={60} /> : info.username}</strong>
          <UserId id={info.accountname} loading={loading} />
        </div>
      </>
    </SearchProfileStyle>
  );
}

export default SearchProfile

const SearchProfileStyle = styled.section`
  height: 50px;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 1/1;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    margin-right: 12px;
  }

  div {
    cursor: pointer;
    strong {
      font-weight: var(--font--Medium);
      font-size: var(--font--size-md);
      line-height: 18px;
      margin-bottom: 2px;
      color : var(--text-color-1)
    }
  }
`;