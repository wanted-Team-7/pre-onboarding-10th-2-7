import { createGlobalStyle } from 'styled-components';
import NanumSquareNeoTtf from './NanumSquareNeo.ttf';
import NanumSquareNeoWoff from './NanumSquareNeo.woff';
import NanumSquareNeoWoff2 from './NanumSquareNeo.woff2';

const FontStyles = createGlobalStyle`

@font-face {
  font-family: NanumSquareNeo-Variable;
  src: url(${NanumSquareNeoWoff2}) format('woff2'),
       url(${NanumSquareNeoWoff}) format('woff'),
       url(${NanumSquareNeoTtf}) format('ttf');
  font-weight: normal;
  font-style: normal;
  font-display: block; //FOUT로 적용
}
`;

export default FontStyles;
