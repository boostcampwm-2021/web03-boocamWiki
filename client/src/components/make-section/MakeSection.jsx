import React, { useState, useRef } from "react";
import styled from "styled-components";
import MainHeader from "../SectionTitle";
import Title from "./make-section-components/InputTitle";
import EditorWithPreview from "./make-section-components/EditorWithPreview";
import Editor from "./make-section-components/Editor";
import Preview from "./make-section-components/Preview";

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

const MakePageSection = ({ history }) => {
    const [markdown, setMarkdown] = useState(``);
    const [canMake, setCanMake] = useState(false);
    const [inputStatus, setInputStatus] = useState('editor');
    const generation = useRef(0);
    const id = useRef('');
    const name = useRef('');

    const editorTypes = [
        {name: 'editor', text: '편집기', component: <Editor markdown={markdown} setMarkdown={setMarkdown} />},
        {name: 'preview', text: '미리보기', component: <Preview markdown={markdown} />},
        {name: 'editorWithPreview', text: '동시보기', component: <EditorWithPreview markdown={markdown} setMarkdown={setMarkdown} />}
    ]

    const handleBtn = (e) => {
        setInputStatus(e.target.value)
    }

    const addDocument = async () => {
        if(!canMake) alert('생성 가능 여부를 확인해주세요');
        else{
            await fetch('/documents',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "generation": generation.current.value,
                    "boostcamp_id": id.current.value,
                    "name": name.current.value,
                    "content": markdown,
                    "nickname": null,
                    "location": null,
                    "language": null,
                    "user_image": null,
                    "mbti": null,
                    "field": null,
                    "link": null,
                    "classification": 'camper',
                })
            }).then(res => res.json()).then(data => console.log(data));
            history.goBack();
        }
    }

    return (
        <Main>
            <MainHeader title='문서 생성' />
            <Title setCanMake={setCanMake} canMake={canMake} generation={generation} id={id} name={name} />
            <EditorType>
                {editorTypes.map((type) => (
                    <div key={type.name}>
                        <EditorTypeBtn onClick={handleBtn} value={type.name}>{type.text}</EditorTypeBtn>
                    </div>
                ))}
            </EditorType>
            {editorTypes.map((type) => (
                <div key={type.name}>
                    {type.name === inputStatus ? type.component : <></>}
                </div>
            ))}

            <button type='button' onClick={addDocument}>등록</button>
            
        </Main>
    )
}

export default MakePageSection;