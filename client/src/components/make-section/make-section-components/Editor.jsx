import React from "react";
import styled from 'styled-components';

const EditorBox = styled.textarea`
    width: 1000px;
    height: 500px;
    resize: none;
    font-size: 24px;
    box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25);
`;

const Editor = ({ docData, dispatch }) => {
    const changeHandler = (e) => {
        dispatch({
            type: 'INPUT_CONTENT',
            content: e.target.value,
        })
    }
    return (
        <>
            <EditorBox onChange={changeHandler} value={docData.content} />
        </>
    )
}

export default Editor;