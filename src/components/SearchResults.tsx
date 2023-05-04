import styled from 'styled-components';
import { ResultsType } from '../types/searchTypes';

type ResultsTypes = {
  searchResults: ResultsType[];
};

export default function SearchResults({ searchResults }: ResultsTypes) {
  return (
    <Style.Container>
      {searchResults.map((result, index) => {
        if (index < 7)
          return (
            <Style.SearchTerm key={result.id}>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
              </svg>
              {result.name}
            </Style.SearchTerm>
          );
      })}
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

  SearchTerm: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    font-size: 15px;
    :hover {
      background-color: #f8f8f8;
      cursor: pointer;
    }
    svg {
      margin-right: 12px;
      width: 16px;
      height: 16px;
      color: rgb(167, 175, 183);
    }
    span {
      font-weight: 900;
    }
  `,
};
