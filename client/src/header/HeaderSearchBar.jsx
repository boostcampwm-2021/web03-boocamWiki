import React from "react";
import styled from "styled-components";
import HeaderUser from "./HeaderUser";
import search from '../resource/img/search.svg';

const SearchBar = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderInput = styled.input`
    width: 440px;
    height: 66px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const SearchBtn = styled.button`
    background: white;
    border: none;
    height: 66px;
    cursor: pointer;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    filter: drop-shadow(-1px 4px 4px rgba(0, 0, 0, 0.25));
    margin-right: 30px;
`;

const SearchSVG = styled.img`
    width: 60px;
    height: 66px;
    padding-right: 10px;
    padding-left: 5px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const HeaderSearchBar = () => {
    return(
        <SearchBar>
            <HeaderInput type='text' />
            <SearchBtn><SearchSVG src={search} /></SearchBtn>
            <HeaderUser />
        </SearchBar>
    )
}

export default HeaderSearchBar;