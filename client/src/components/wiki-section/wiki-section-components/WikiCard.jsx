import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: fit-content;
  background-color: ${props => props.background};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: ${props => props.display};

  font-family: Noto Sans KR;
  font-style: normal;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const CardOwner = styled.div`
  width: 350px;
  height: 32px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  background-color: #DDEEAA;
  border: none;
  margin-bottom: 9px;
`;

const CardImg = styled.img`
  width: 342px;
  height: 342px;
  background: #F6F6F6;
  margin-bottom: 6px;
  margin-left: 4px;
`;

const CardDataWrap = styled.div`
  display: flex;
  width: 348px;
  height: 34px;
`;

const CardDataName = styled.div`
  width: 68px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardDataText = styled.div`
  width: 278px;
  height: 34px;
  border: 1px solid #D7D7D7;
  text-align: center;
  background-color: white;
  outline: none;
`;

const cardData = [
  {name: '별명', key: 'nickname'},
  {name: '지역', key: 'location'},
  {name: '주언어', key: 'language'},
  {name: 'MBTI', key: 'mbti'},
  {name: '분야', key: 'field'},
  {name: 'SNS 링크', key: 'link'},
]

const WikiCard = ({docData, name}) => {
  const [card, setCard] = useState(false);

  useEffect(() => {
    if(docData.user_image !== 'null') setCard(true);
    else if(docData.nickname !== 'null') setCard(true);
    else if(docData.location !== 'null') setCard(true);
    else if(docData.language !== 'null') setCard(true);
    else if(docData.mbti !== 'null') setCard(true);
    else if(docData.field !== 'null') setCard(true);
    else if(docData.link !== 'null') setCard(true);
    else setCard(false);
  }, [docData])
  

  return (
    <CardBox background={card ? '#DDEEAA' : 'white'} display={card ? 'block' : 'none'}>
      {card && <CardOwner>{name}</CardOwner>}
      {docData.user_image !== 'null' && <CardImg src={docData.user_image} />}
      {cardData.map((item) => (
        docData[item.key] !== 'null' &&
        <CardDataWrap key={item.name}>
          <CardDataName>{item.name}</CardDataName>
          <CardDataText>{docData[item.key]}</CardDataText>
        </CardDataWrap>
      ))}
    </CardBox>
  )
}

export default WikiCard;