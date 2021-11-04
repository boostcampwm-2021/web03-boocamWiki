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

const Title = ({ canMake, setCanMake }) => {
    const generation = useRef(0);
    const id = useRef('');
    const name = useRef('');

    const changeData = () => {
        if(canMake) setCanMake(false);
    }

    const titleCheckHandler = async () => {
        const result = await fetch(`http://localhost:3001/documents/search?generation=${generation.current.value}&boostcamp_id=${id.current.value}&name=${name.current.value}`);
        const data = await result.json();
        if(data.result.length === 0) setCanMake(true);
        else setCanMake(false);
    }

    return (
        <TitleWrap>
            <TextInputWrap>
                <Text>기수</Text>
                <Input type='text' ref={generation} onChange={changeData} />
            </TextInputWrap>
            <TextInputWrap>
                <Text>아이디</Text>
                <Input type='text' ref={id} onChange={changeData} />
            </TextInputWrap>
            <TextInputWrap>
                <Text>이름</Text>
                <Input type='text' ref={name} onChange={changeData} />
            </TextInputWrap>
            <ValidationBtn onClick={titleCheckHandler}>생성 확인</ValidationBtn>
            { canMake ? <div>생성 가능</div> : <div>생성 불가</div> }
        </TitleWrap>
    )
}

export default Title;