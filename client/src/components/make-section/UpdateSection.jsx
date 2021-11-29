import React, { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import MainSection from '../common/MainSection';
import MakePageRule from './make-section-components/MakePageRule';
import DocCard from './make-section-components/DocCard';
import WikiContentsIndex from './make-section-components/WikiContentsIndex';
import EditorBox from './make-section-components/EditorBox';
import Loading from '../common/Loading';
import { Utils } from '../../utils';
import { BREAK_POINT_MOBILE } from '../../utils/display-width';
import { initialDocData, docDataReducer } from '../../reducer/doc-data-reducer';
import { font, flexBox } from '../../styles/styled-components/mixin';
import AlertModal from '../custom-alert/AlertModal';
import { authFetch } from '../../utils/login';
import { fetchIP } from '../../utils/ip-check';

const UpdateSection = ({ history, generation, boostcampId, name }) => {
  const [docRule, setDocRule] = useState(false);
  const [alertState, setAlertState] = useState({ isAlertOn: false, msg: '' });
  const [loading, setLoading] = useState(true);
  const [docData, docDispatch] = useReducer(docDataReducer, initialDocData);

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

  const fetchValidation = async (result) => {
    if (result.status === 200) {
      history.goBack();
    } else if (result.status === 409) {
      setAlertState({
        isAlertOn: true,
        msg: '문서가 수정되었습니다. 변경 내용을 클립보드나 메모장에 저장하고 편집페이지로 다시 진입해주세요.',
      });
    } else {
      const body = await result.json();
      setAlertState({
        isAlertOn: true,
        msg: `문서를 수정하는데 실패했습니다. 사유 [${result.status}] body: ${body.msg}`,
      });
    }
  };

  const updateDocument = async () => {
    if (!docRule) setAlertState({ isAlertOn: true, msg: '규정에 동의해주세요' });
    else if (!docData.content) setAlertState({ isAlertOn: true, msg: '내용을 입력해주세요' });
    else {
      const result = await authFetch('/api/documents', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(docData),
      });
      fetchValidation(result);
    }
  };

  const cancelAddDoc = () => {
    history.goBack();
  };

  const closeAlert = ({ target }) => {
    const classList = target.className.split(' ');
    if (classList.includes('close-alert')) {
      setAlertState({ ...alertState, isAlertOn: false });
    }
  };

  useEffect(() => {
    const getContent = async () => {
      const res = await fetch(`/api/documents/?generation=${generation}&boostcamp_id=${boostcampId}&name=${name}`);
      if (res.status !== 200) {
        history.push('/error');
      }
      const { result } = await res.json();
      const { content, field, language, link, location, mbti, nickname, user_image, updated_at } = result;
      const updateData = {
        type: 'INPUT_DOC_DATA',
        payload: {
          name,
          generation,
          boostcamp_id: boostcampId,
          content,
          field,
          language,
          link,
          location,
          mbti,
          nickname,
          user_image,
          updated_at,
        },
      };
      docDispatch(updateData);
      setLoading(false);
    };

    getContent();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <MainSection title={Utils.docTitleGen({ name, boostcampId, generation }, 0)}>
          <MainContent onClick={closeAlert}>
            {alertState.isAlertOn && <AlertModal modalContent={alertState.msg} />}
            <ListCardWrap>
              <WikiContentsIndex title="목차 미리보기" text={docData.content} />
              <DocCard docData={docData} docDispatch={docDispatch} />
            </ListCardWrap>

            <EditorBox docData={docData} docDispatch={docDispatch} />

            <RuleDiv>
              <input type="checkbox" style={{ margin: '10px' }} onChange={handleRule} id="checkbox" />
              <RuleLabel htmlFor="checkbox">작성자는 아래 규정에 동의합니다.</RuleLabel>
            </RuleDiv>

            <ButtonWrap>
              <SubmitBtn onClick={updateDocument}>등록</SubmitBtn>
              <CancelBtn onClick={cancelAddDoc}>취소</CancelBtn>
            </ButtonWrap>

            <MakePageRule />
          </MainContent>
        </MainSection>
      )}
    </>
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
  ${font({ size: '24px', weight: 'bold' })};
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
  ${font({ size: '24px', weight: 'bold' })};
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

export default UpdateSection;
