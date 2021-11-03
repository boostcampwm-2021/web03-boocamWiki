import {React, useRef} from "react";
import styled from 'styled-components';

const TitleWrap = styled.div`
    display: flex;
`;

const TextInputWrap = styled.div`
    display: flex;
`;

const Text = styled.div`

`;

const Input = styled.input`

`;

const ValidationBtn = styled.button`

`;


const Title = () => {
    const generation = useRef(0);
    const id = useRef('');
    const name = useRef('');

    return (
        <TitleWrap>
            <TextInputWrap>
                <Text>기수</Text>
                <Input type='text' ref={generation} />
            </TextInputWrap>
            <TextInputWrap>
                <Text>아이디</Text>
                <Input type='text' ref={id} />
            </TextInputWrap>
            <TextInputWrap>
                <Text>이름</Text>
                <Input type='text' ref={name} />
            </TextInputWrap>
            <ValidationBtn>생성 확인</ValidationBtn>
        </TitleWrap>
    )
}

export default Title;