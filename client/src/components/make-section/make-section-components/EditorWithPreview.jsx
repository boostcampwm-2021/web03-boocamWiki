import React from "react";
import styled from 'styled-components';
import MdParser from "../../MdParser";

const EditorWrap = styled.div`
    display: flex;
`;

const Editor = styled.textarea`
    width: 500px;
    height: 500px;
    resize: none;
    font-size: 24px;
    box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25);
`;

const Preview = styled.div`
    width: 500px;
    height: 500px;
    overflow: auto;
    box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25);
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