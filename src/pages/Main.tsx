import styled from 'styled-components';
import SearchSection from '../components/SearchSection';
import { useState, useRef } from 'react';

export default function Main() {
  const outside = useRef<HTMLDivElement>(null);
  const [isVisibleSearchResults, setIsVisibleSearchResults] = useState(false);

  return (
    <Style.Container
      ref={outside}
      onClick={event => {
        if (event.target === outside.current) setIsVisibleSearchResults(false);
      }}
    >
      <Style.Title>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Style.Title>
      <SearchSection
        isVisibleSearchResults={isVisibleSearchResults}
        setIsVisibleSearchResults={setIsVisibleSearchResults}
      />
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    width: 100%;
    height: 500px;
    padding-top: 80px;
    background-color: #cae9ff;
  `,

  Title: styled.h2`
    margin: 0;
    margin-bottom: 40px;
    text-align: center;
    font-size: 2.125rem;
    font-weight: 700;
    letter-spacing: -0.018em;
    line-height: 1.6;
  `,
};
