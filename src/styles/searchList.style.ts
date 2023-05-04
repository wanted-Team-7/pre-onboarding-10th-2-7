import styled from 'styled-components';

export const searchListContainer = styled.div`
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  flex-direction: column;
  display: flex;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0px;
  margin-top: 8px;
  padding-top: 24px;
  padding-bottom: 16px;
  box-shadow: rgba(30, 32, 37, 0.1) 0px 2px 10px;
`;

export const recentSearchText = styled.div`
  color: rgb(106, 115, 123);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  padding-left: 24px;
  padding-right: 24px;
  font-family: inherit;
`;

export const recentSearchItem = styled.div`
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  display: flex;
  padding: 8px 24px;
  cursor: pointer;
`;

export const searchItemText = styled.div`
  font-family: inherit;
`;
