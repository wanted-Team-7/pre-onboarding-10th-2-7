import styled from 'styled-components';
import { ReactComponent as Magifier } from '../../assets/magnifier.svg';

const Container = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  display: flex;
  max-width: 490px;

  ul {
    border-radius: 20px;
    border-color: #ffffff;
    background-color: #ffffff;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
    display: flex;
    width: 100%;
    position: relative;
    padding: 30px 0px;
  }
`;

const Element = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin-bottom: 15px;
  padding: 10px 0px;

  &:hover {
    background-color: #dfdfdf;
  }
  p {
    margin-left: 15px;
  }
`;

const SVG = styled(Magifier)`
  margin-left: 20px;
`;

export const S = {
  Container,
  Element,
  SVG,
};
