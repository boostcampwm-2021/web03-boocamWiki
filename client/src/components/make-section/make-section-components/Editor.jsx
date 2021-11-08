import React from "react";
import styled from 'styled-components';

const EditorBox = styled.textarea`
    width: 90%;
    height: 500px;
    resize: none;
    font-size: 24px;
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