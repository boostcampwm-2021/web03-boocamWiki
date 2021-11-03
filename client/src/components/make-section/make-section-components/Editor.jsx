import React from "react";
import styled from 'styled-components';

const EditorBox = styled.textarea`
    width: 90%;
    height: 500px;
    resize: none;
    font-size: 24px;
`;

const Editor = ({ markdown, setMarkdown }) => {
    const changeHandler = (e) => {
        setMarkdown(e.target.value);
    }
    return (
        <EditorBox onChange={changeHandler} value={markdown} />
    )
}

export default Editor;