import React from "react";
import styled from 'styled-components';
import MdParser from "../../MdParser";

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
    overflow: auto;
`;

const EditorWithPreview = ({ docData, dispatch }) => {
    const changeHandler = (e) => {
        dispatch({
            type: 'INPUT_CONTENT',
            content: e.target.value,
        })
    }
    return (
        <EditorWrap>
            <Editor onChange={changeHandler} value={docData.content} />
            <Preview>
                <MdParser content={docData.content} />
            </Preview>
        </EditorWrap>
    )
}

export default EditorWithPreview;