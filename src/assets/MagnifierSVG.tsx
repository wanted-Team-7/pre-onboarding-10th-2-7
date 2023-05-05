import styled from 'styled-components';

const SmallSearchSpan = styled.span`
  svg {
    width: 20px;
    fill: #afafaf;
  }
`;

const LargeSearchSpan = styled.span`
  background-color: #027be9;
  padding: 15px;
  border-radius: 100%;
  cursor: pointer;
  svg {
    width: 25px;
    fill: #fff;
  }
`;

const SmallSearchIcon = () => (
  <SmallSearchSpan>
    <svg viewBox="0 0 16 16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
    </svg>
  </SmallSearchSpan>
);

const LargeSearchIcon = () => (
  <LargeSearchSpan>
    <svg viewBox="0 0 16 16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
    </svg>
  </LargeSearchSpan>
);

export { SmallSearchIcon, LargeSearchIcon };
