import React from "react";
import styled from 'styled-components';
import MdParser from "../../MdParser";

const PreviewWrap = styled.div`
    width: 1000px;
    height: 500px;
    overflow: auto;
    box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25);
`;

const Preview = ({docData}) => {
    return (
        <PreviewWrap>
            <MdParser content={docData.content} />
        </PreviewWrap>
    )
}

export default Preview;