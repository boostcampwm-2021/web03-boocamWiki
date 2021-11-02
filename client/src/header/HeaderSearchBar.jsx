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
    height: 40px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: none;
`;

const SearchBtn = styled.button`
    background: white;
    border: none;
    height: 40px;
    &:hover{
        cursor: pointer;
    }
    border-left:1px solid #E5E5E5;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const SearchSVG = styled.img`
    width: 30px;
    height: 30px;
    padding-right: 10px;
    padding-left: 5px;
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