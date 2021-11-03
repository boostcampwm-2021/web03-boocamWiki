import React from "react";
import styled from 'styled-components';
import Markdown from "./MarkdownPreview";

const EditorWrap = styled.div`
    display: flex;
`;

const Editor = styled.textarea`
    width: 45%;
    height: 500px;
    resize: none;
    font-size: 24px;
`;

const Preview = styled.div`
    border: 1px solid red;
    width: 45%;
    height: 500px;
    padding-left: 40px;
`;

const EditorWithPreview = ({ markdown, setMarkdown }) => {
    const changeHandler = (e) => {
        setMarkdown(e.target.value);
    }
    return (
        <EditorWrap>
            <Editor onChange={changeHandler} value={markdown} />
            <Preview>
                <Markdown markdown={markdown}/>
            </Preview>
        </EditorWrap>
    )
}

export default EditorWithPreview;