import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainSection from '../common/MainSection';
import Loading from '../common/Loading';
import MdParser from '../common/MdParser';

const MainDoor = () => {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getContent = async () => {
      const res = await fetch('/api/documents/?generation=0&boostcamp_id=J000&name=대문');
      if (res.status !== 200) {
        history.push('/error');
      }
      const { result } = await res.json();
      setContent(result[0].content);
      setLoading(false);
    };

    getContent();

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <MainSection title="대문">
      {loading && <Loading />}
      {!loading && <MdParser content={content} />}
    </MainSection>
  );
};

export default MainDoor;
