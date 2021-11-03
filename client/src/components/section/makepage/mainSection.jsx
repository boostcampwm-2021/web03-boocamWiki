import React, { useState } from "react";
import styled from "styled-components";
import MainHeader from "./mainHeader";
import Title from "./inputTitle";
import EditorWithPreview from "./editorWithPreview";
import Editor from "./editor";
import Preview from "./preview";

const Main = styled.div`
    width: 1115px;
    height: 1200px;
    background: white;
    border: 1px solid #D7D7D7;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-right: 50px;
    margin-top: 10px;
`;

const EditorType = styled.div`
    display: flex;
`;

const EditorTypeBtn = styled.button`

`;

const MakePage = () => {
    const [markdown, setMarkdown] = useState(``);
    const [inputStatus, setInputStatus] = useState('editor');

    const editorTypes = [
        {name: 'editor', text: '편집기', component: <Editor markdown={markdown} setMarkdown={setMarkdown} />},
        {name: 'preview', text: '미리보기', component: <Preview markdown={markdown} />},
        {name: 'editorWithPreview', text: '동시보기', component: <EditorWithPreview markdown={markdown} setMarkdown={setMarkdown} />}
    ]

    const handleRadioBtn = (e) => {
        setInputStatus(e.target.value)
    }

    // const handleTmp = () => {
    //     console.log(window.getSelection().toString())
    //     if(window.getSelection().toString() !== ''){
    //         console.log(window.getSelection().anchorNode)
    //         console.log(window.getSelection().focusNode)
    //     }
    // }

    return (
        <Main>
            <MainHeader title='문서 생성' />
            <Title />
            <EditorType>
                {editorTypes.map((type) => (
                    <div key={type.name}>
                        <EditorTypeBtn onClick={handleRadioBtn} value={type.name}>{type.text}</EditorTypeBtn>
                    </div>
                ))}
            </EditorType>
            {editorTypes.map((type) => (
                <div key={type.name}>
                    {type.name === inputStatus ? type.component : <></>}
                </div>
            ))}

            <button type='button'>드래그</button>
            
        </Main>
    )
}

export default MakePage;