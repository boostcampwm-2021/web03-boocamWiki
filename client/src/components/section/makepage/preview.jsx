import React from "react";
import styled from 'styled-components';
import Markdown from "./markdownPreview";

const PreviewWrap = styled.div`
    border: 1px solid red;
    width: 90%;
    height: 500px;
    padding-left: 40px;
`;

const Preview = ({markdown}) => {
    return (
        <PreviewWrap>
            <Markdown markdown={markdown}/>
        </PreviewWrap>
    )
}

export default Preview;