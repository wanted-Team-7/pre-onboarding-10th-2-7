import styled from 'styled-components';
export const Container = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  display: flex;
  max-width: 490px;
  height: 75px;
`;

export const FormContainer = styled.form<{ isFocus: boolean }>`
  position: relative;
  border-radius: 42px;
  border: ${props => (props.isFocus ? '2px solid rgb(25, 118, 210)' : '2px solid #ffffff')};
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  display: flex;
  width: 100%;
  position: relative;
  padding-right: 8px;
`;

const Focus = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  z-index: 999;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: rgb(255, 255, 255);
    background-color: rgb(167, 175, 183);
    cursor: pointer;
  }

  input {
    outline: none;
    border: none;
    margin-left: 30px;
    caret-color: rgb(25, 118, 210);
    width: 90%;
    background-color: transparent;
  }
`;

const NotFocus = styled.div`
  position: absolute;
  flex-direction: row;
  flex: 1;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  display: flex;
  padding: 20px 10px 20px 24px;
  font-weight: 400;
  align-items: center;

  div {
    margin-left: 15px;
    color: #a7afb7;
    font-size: 1.125rem;
    font-weight: 400;
  }
`;

const Button = styled.button`
  border-radius: 100%;
  align-items: center;
  width: 48px;
  height: 48px;
  display: flex;
  font-weight: 500;
  display: inline-flex;
  border: 0;
  cursor: pointer;
  background-color: #007be9;
  display: flex;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const S = {
  Container,
  FormContainer,
  Button,
  NotFocus,
  Focus,
};
