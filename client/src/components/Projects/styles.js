import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: scroll;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 20px;
    h1 {
      font-size: 20px;
    }
    div {
      button {
        margin-left: 10px;
      }

      svg {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
`;

export const Project = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin: 0 0 20px;
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 18x;
  }

  div {

    svg {
      margin-left: 10px;
      cursor: pointer;
    }
    
  }
`;
