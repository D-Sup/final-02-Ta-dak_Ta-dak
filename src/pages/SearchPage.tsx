import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { getSearch } from '../api/searchAPI';
import SearchHeader from '../components/header/SearchHeader'
import SearchProfile from '../components/common/SearchProfile';
import useDebounce from '../hooks/useDebounce';


const SearchPage = () => {

  const [search, setSearch] = useState<string>('')
  const [searchList, setSearchList] = useState<Author[]>([])

  const searchDebounced = useDebounce(search)

  useEffect(() => {
    const setResult = async () => {
      if (searchDebounced) {
        setSearchList(await getSearch(searchDebounced));
      } else {
        setSearchList([]);
      }
    };
    setResult();
  }, [searchDebounced]);


  return (
    <>
      {/* 입력값이 변경되었을 때 값을 추출해서 search에 저장 */}
      <SearchHeader value={search} setValue={setSearch}></SearchHeader>
      <SearchPageStyle>
        <SearchResultWrapper>
          {searchList.length
            ? searchList.map((item, index) => {
              return (
                <li key={index}>
                  <SearchProfile info={item} />
                </li>
              );
            })
            : null}
        </SearchResultWrapper>
      </SearchPageStyle>
    </>
  );
}

export default SearchPage

const SearchPageStyle = styled.div`
  padding: 20px 16px 0;
  width: 390px;
  height: var(--screen-nav-height);
  margin: 0 auto;
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
    height: calc(var(--screen-height) - 48px);
  }
`;

const SearchResultWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 15px;
  padding-bottom: 15px;
`