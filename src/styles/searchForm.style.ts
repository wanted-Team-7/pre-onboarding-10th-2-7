import styled from 'styled-components';

export const wrapper = styled.div`
  background-color: lime;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  max-width: 490px;
  width: 100%;
  margin: 0 auto;
`;

export const container = styled.div`
  border-radius: 42px;
  border: 2px solid;
  border-color: #ffffff;
  background-color: #ffffff;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  position: relative;
  padding-right: 8px;
`;

export const wrapper2 = styled.div`
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 20px 10px 20px 24px;
  font-weight: 400;
`;

export const searchInput = styled.input`
  padding-right: 25px;
  width: 100%;
  border: 0;
  background-color: transparent;
  min-width: 0;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
`;
