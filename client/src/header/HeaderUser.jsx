import React from "react";
import styled from "styled-components";
import user from '../resource/img/user.svg';

const UserBtn = styled.button`
    background: #E8A20C;
    border: none;
    margin-left: 5px;
    &:hover{
        cursor: pointer;
    }
`;

const UserSVG = styled.img`
    width: 40px;
    height: 40px;
`;

const HeaderUser = () => {
    return(
        <UserBtn><UserSVG src={user}/></UserBtn>
    )
}

export default HeaderUser;