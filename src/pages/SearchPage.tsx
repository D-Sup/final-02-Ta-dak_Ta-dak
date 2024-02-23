import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { getSearch } from '../api/searchAPI';
import SearchHeader from '../components/header/SearchHeader'
import SearchProfile from '../components/common/SearchProfile';
import useDebounce from '../hooks/useDebounce';


const SearchPage = () => {

  const location = useLocation();

  const [search, setSearch] = useState<string>(location.state || '')
  const [searchList, setSearchList] = useState<Author[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  const searchDebounced = useDebounce(search)

  useEffect(() => {
    const setResult = async () => {
      if (searchDebounced) {
        setSearchList(await getSearch(searchDebounced));
        setLoading(false)
      }
    };
    setResult();
  }, [searchDebounced]);

  useEffect(() => {
    if (search.length === 0) {
      setSearchList([]);
    } else {
      setLoading(true)
    }
  }, [search])

  useEffect(() => {
    setSearch(location.state || '');
  }, [location])

  return (
    <SearchPageContainer>
      {/* 입력값이 변경되었을 때 값을 추출해서 search에 저장 */}
      <div className='searchheader-container'>
        <SearchHeader value={search} setValue={setSearch}></SearchHeader>
      </div>
      <SearchPageStyle>
        <SearchResultWrapper>
          {
            loading && search.length !== 0 ?
              (
                Array(9).fill(1).map((item, index) => (
                  <li key={index} >
                    <SearchProfile info={item} loading={true} />
                  </li>
                ))
              ) : (
                searchList.map((item, index) => (
                  <li key={index} >
                    <SearchProfile info={item} />
                  </li>
                ))
              )
          }
        </SearchResultWrapper>
      </SearchPageStyle >
    </SearchPageContainer>
  );
}

export default SearchPage

const SearchPageContainer = styled.div`
  position: relative;

  .searchheader-container {
    display: block;
    
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const SearchPageStyle = styled.div`
  position: relative;
  padding: 20px 16px 0;
  width: 390px;
  height: var(--screen-nav-height);
  background-color: var(--backgroud-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    background-color: var(--background-color);
    width: 0px;
  }

  @media (min-width: 768px) {
    width: 500px;
    height: calc(var(--screen-height));
  }
`;

const SearchResultWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 15px;
  padding-bottom: 15px;
`