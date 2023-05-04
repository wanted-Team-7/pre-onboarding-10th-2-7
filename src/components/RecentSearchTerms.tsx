import styled from 'styled-components';

export default function RecentSearchTerms() {
  return (
    <Style.Container>
      <p>최근 검색어</p>
      <Style.RecentSearchTerm>
        <span>최근 검색어가 없습니다.</span>
      </Style.RecentSearchTerm>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    width: 490px;
    margin-top: 5px;
    padding: 15px 0;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #00000015;
    p {
      padding: 5px 20px;
      font-size: 13px;
      color: #5d5d5d;

      letter-spacing: -0.04em;
    }
  `,

  RecentSearchTerm: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    font-size: 15px;

    span {
      color: #5d5d5d;
    }
  `,
};
