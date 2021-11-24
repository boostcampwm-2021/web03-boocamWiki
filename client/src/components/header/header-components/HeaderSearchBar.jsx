import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import search from '../../../resource/img/search.svg';
import drop from '../../../resource/img/drop.svg';
import SelectModal from '../../select-modal/SelectModal';
import { SelectTgContext, SelectTypeContext } from '../../../App';
import { BREAK_POINT_TABLET } from '../../../utils/display-width';

const searchTypeMap = {
  기수: 'generation',
  캠퍼번호: 'boostcamp_id',
  이름: 'name',
  내용: 'content',
};

const HeaderSearchBar = () => {
  const history = useHistory();
  const searchInput = useRef();
  const searchBtn = useRef();
  // const [searchType, setSearchType] = useState('이름');
  const { isSearchTypeOn } = useContext(SelectTgContext);
  const { searchType } = useContext(SelectTypeContext);

  const submitEvent = (e) => {
    e.preventDefault();
    const searchValue = searchInput.current.value;
    history.push(`/search?${searchTypeMap[searchType]}=${searchValue}`);
  };

  const keyPressEvent = (e) => {
    if (e.key === 'Enter') {
      searchBtn.current.click();
    }
  };

  return (
    <SearchBar>
      <SearchTypeWrapper className="TgSelect SelectSearchType">
        <SearchType className="TgSelect SelectSearchType">{searchType}</SearchType>
        <SelectModal
          className="SelectSearchType"
          content={Object.keys(searchTypeMap)}
          isSelectOn={isSearchTypeOn}
          move={{ top: '55px', left: '0px', translateX: '-20%' }}
        />
        <DropIcon src={drop} className="TgSelect SelectSearchType" />
      </SearchTypeWrapper>
      <SearchInput autocomplete="off" type="text" onKeyPress={keyPressEvent} ref={searchInput} />
      <SearchBtn onClick={submitEvent} ref={searchBtn}>
        <SearchSVG src={search} />
      </SearchBtn>
    </SearchBar>
  );
};

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 70px;
  width: 400px;
  height: 50px;
  padding: 10px 12px;
  background: white;
  border-radius: 10px;

  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    width: calc(100% - 20px);
    top: 65px;
    left: 10px;
  }
`;

const SearchTypeWrapper = styled.div`
  height: 38px;
  padding-right: 7px;
  border-right: 2px solid #e5e5e5;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const SearchType = styled.p`
  font-family: Noto Sans KR;
  font-weight: 500;
  font-size: 16px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0 10px;
  border: none;
  font-family: Noto Sans KR;
  font-weight: 400;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.button`
  height: 38px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding-left: 12px;
  border-left: 2px solid #e5e5e5;
`;

const SearchSVG = styled.img`
  width: 30px;
  height: 30px;
`;

export default HeaderSearchBar;
