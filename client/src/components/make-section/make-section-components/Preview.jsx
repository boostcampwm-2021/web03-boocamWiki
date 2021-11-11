import React from "react";
import styled from 'styled-components';
import MdParser from "../../MdParser";

const PreviewWrap = styled.div`
    width: 848px;
    height: 327px;
    overflow: auto;
    border: 1px solid #D7D7D7;
    box-sizing: border-box;
    border-radius: 10px;
`;

const Preview = ({docData}) => {
    return (
        <PreviewWrap>
            <MdParser content={docData.content} />
        </PreviewWrap>
    )
}

export default Preview;