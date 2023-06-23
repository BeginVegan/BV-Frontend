import { css } from '@chakra-ui/react';

export const global = css`
  @font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  /* Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* Scrollbar Track */
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* Scrollbar Thumb */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* Hovered Scrollbar Thumb */
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  /* Active Scrollbar Thumb */
  &::-webkit-scrollbar-thumb:active {
    background-color: rgba(0, 0, 0, 0.9);
  }

  div {
    background-position: center center !important;
  }
`;
