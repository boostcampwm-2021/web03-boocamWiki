import React from "react";
import styled from 'styled-components';

const EditorBox = styled.textarea`
    width: 848px;
    height: 327px;
    resize: none;
    background: #F6F6F6;
    border: 1px solid #D7D7D7;
    box-sizing: border-box;
    border-radius: 10px;
    outline: none;
    padding: 10px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
`;

const Editor = ({ docData, dispatch }) => {
    const changeHandler = (e) => {
        dispatch({
            type: 'INPUT_CONTENT',
            content: e.target.value,
        })
    }
    return (
        <EditorBox onChange={changeHandler} value={docData.content} />
    )
}

export default Editor;