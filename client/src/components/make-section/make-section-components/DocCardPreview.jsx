import React from "react";
import styled from "styled-components";

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 90%;
  border: 1px solid #DDEEAA;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
`;

const CardData = styled.div`
  display: flex;
  justify-content: space-around;
  border: none;
  border-top: 1px solid #D7D7D7;
  width: 100%;
  height: 70px;
`;

const DataName = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  width: 30%;
  background-color: #DDEEAA;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataValue = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  width: 80%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const cardData = [
  {name: '별명', key: 'nickname'},
  {name: '지역', key: 'location'},
  {name: '주언어', key: 'language'},
  {name: 'MBTI', key: 'mbti'},
  {name: '분야', key: 'field'},
  {name: 'SNS 링크', key: 'link'},
]

const DocCardPreview = ({ docData }) => {
  return (
    <CardBox>
      <CardImg src='https://i.ytimg.com/vi/nhAR2-WIM-I/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDt47QnWrWAjzSou_NDsic-KwR6gQ'/>
      {cardData.map((item) => (
        <CardData>
          <DataName>{item.name}</DataName>
          <DataValue>{docData[item.key]}</DataValue>
        </CardData>
      ))}
    </CardBox>
  )
}

export default DocCardPreview;