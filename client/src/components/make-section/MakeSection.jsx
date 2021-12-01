import React, { useState, useRef, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { BREAK_POINT_MOBILE } from '@utils/display-width';
import { initialDocData, docDataReducer } from '@reducer/doc-data-reducer';
import { font, flexBox } from '@styles/styled-components/mixin';
import { authFetch } from '@utils/login';
import { fetchIP } from '@utils/ip-check';
import WikiContentsIndex from '@components/common/WikiContentsIndex';
import InputTitle from './make-section-components/InputTitle';
import MakePageRule from './make-section-components/MakePageRule';
import DocCard from './make-section-components/DocCard';
import EditorBox from './make-section-components/EditorBox';
import TitleGuide from './make-section-components/TitleGuide';
import MainSection from '../common/MainSection';
import AlertConfirm from '../alert-confirm/AlertConfirm';

const MakeSection = ({ history }) => {
  const [canMake, setCanMake] = useState();
  const [docRule, setDocRule] = useState(false);
  const [alertState, setAlertState] = useState({ isAlertOn: false, msg: '' });
  const [docData, docDispatch] = useReducer(docDataReducer, initialDocData);
  const checkBoxRef = useRef(null);

  useEffect(async () => {
    const ip = await fetchIP();
    docDispatch({
      type: 'INPUT_DOC_DATA',
      payload: {
        ip,
      },
    });
  });

  const handleRule = (e) => {
    if (e.target.checked) setDocRule(true);
    else setDocRule(false);
  };

  const docValidation = () => {
    if (!canMake) setAlertState({ isAlertOn: true, msg: '생성가능 여부를 확인해주세요' });
    else if (!docRule) setAlertState({ isAlertOn: true, msg: '규정에 동의해주세요' });
    else if (!docData.content) setAlertState({ isAlertOn: true, msg: '내용을 입력해주세요' });
    const result = !canMake || !docRule || !docData.content;
    return result;
  };

  const fetchValidation = async (result) => {
    if (result.status === 200) {
      history.push(`/w/${docData.generation}_${docData.boostcamp_id}_${docData.name}`);
    } else if (result.status === 409) {
      setAlertState({
        isAlertOn: true,
        msg: '문서가 이미 생성되었습니다. 작성 내용을 클립보드나 메모장에 저장 후 페이지를 검색하여 진입해주세요. 필요시 편집 부탁드립니다.',
      });
    } else {
      const body = await result.json();
      setAlertState({
        isAlertOn: true,
        msg: `문서를 생성하는데 실패했습니다. 사유 [${result.status}] body: ${body.msg}`,
      });
    }
  };

  const addDocument = async () => {
    if (docValidation()) return;
    const result = await authFetch('/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(docData),
    });
    fetchValidation(result);
  };

  const closeAlert = ({ target }) => {
    const classList = target.className.split(' ');
    if (classList.includes('close-alert')) {
      setAlertState({ ...alertState, isAlertOn: false });
    }
  };

  const cancelAddDoc = () => {
    history.goBack();
  };

  const clickCheckBox = (e) => {
    const checkBox = checkBoxRef.current;
    checkBox.checked = !checkBox.checked;
  };

  return (
    <MainSection title="문서 작성">
      <MainContent onClick={closeAlert}>
        {alertState.isAlertOn && <AlertConfirm modalContent={alertState.msg} />}
        <TitleGuide />
        <InputTitle setCanMake={setCanMake} canMake={canMake} docData={docData} docDispatch={docDispatch} />

        <ListCardWrap>
          <WikiContentsIndex title="목차 미리보기" text={docData.content} />
          <DocCard docData={docData} docDispatch={docDispatch} />
        </ListCardWrap>

        <EditorBox docData={docData} docDispatch={docDispatch} />

        <RuleDiv>
          <input type="checkbox" style={{ margin: '11px 10px 9px 10px' }} onChange={handleRule} id="checkbox" />
          <RuleLabel htmlFor="checkbox">작성자는 아래 규정에 동의합니다.</RuleLabel>
        </RuleDiv>

        <ButtonWrap>
          <SubmitBtn onClick={addDocument}>등록</SubmitBtn>
          <CancelBtn onClick={cancelAddDoc}>취소</CancelBtn>
        </ButtonWrap>

        <MakePageRule />
      </MainContent>
    </MainSection>
  );
};

const MainContent = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center' })};
  padding: 0px 10px;
`;

const ListCardWrap = styled.div`
  ${flexBox({ justifyContent: 'space-between' })};
  height: fit-content;
  width: 100%;
  margin-top: 22px;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    ${flexBox({ direction: 'column', alignItems: 'center' })};
  }
`;

const RuleDiv = styled.div`
  ${flexBox({ alignItems: 'center' })};
  color: #222222;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const RuleLabel = styled.label`
  &:hover {
    cursor: default;
  }
`;

const ButtonWrap = styled.div``;

const SubmitBtn = styled.button`
  ${font({ size: '20px', weight: 'normal' })};
  width: 100px;
  height: 40px;
  color: white;
  background-color: #0055fb;
  border-radius: 11px;
  text-align: center;
  border: none;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const CancelBtn = styled.button`
  ${font({ size: '20px', weight: 'normal' })};
  width: 100px;
  height: 40px;
  color: white;
  background-color: #f45452;
  border-radius: 11px;
  text-align: center;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default MakeSection;
