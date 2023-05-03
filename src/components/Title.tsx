import styled from 'styled-components';

export default function Title() {
  return (
    <H2>
      국내 모든 임상시험 검색하고
      <br />
      온라인으로 참여하기
    </H2>
  );
}

const H2 = styled.h2`
  text-align: center;
  font-size: 2.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  margin-bottom: 40px;
`;
