import React from "react";
import styled from 'styled-components';
import MdParser from "../../MdParser";

const PreviewWrap = styled.div`
    border: 1px solid red;
    width: 90%;
    height: 500px;
`;

const Preview = ({docData}) => {
    return (
        <PreviewWrap>
            <MdParser content={docData.content} />
        </PreviewWrap>
    )
}

export default Preview;