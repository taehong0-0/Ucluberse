import styled from 'styled-components';

export const MainBoardDiv = styled.div`
  width : 280px;
  height: 191px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 3px 3px 0.625rem #dddae0;
  opacity: 1;
  padding-left: 1.5rem;
  padding-top: 1.563rem;
  img {
    height: 18px;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-top: 1.25rem;
    span {
      font: normal normal normal 0.875rem Noto Sans KR;
      letter-spacing: -1.05px;
      color: #1a1917;
      opacity: 1;
    }
    a:link {
      text-decoration: none;
    }
    a:visited {
      text-decoration: none;
    }
    a:hover {
      text-decoration: none;
    }
    a:active {
      text-decoration: none;
    }
    a {
      height: 1.25rem;
    }
    a:nth-child(n+2) {
        padding-top: 6px;
      }
  }
`;

export const MainBoardContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60rem;
  margin: 5rem auto;
`;
