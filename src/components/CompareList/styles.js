import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #FFF;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  position: relative;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 16px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #F5F5F5;
      }
    }
  }

  button {
    background: #63F5B8;
    border: 0;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    color: #FFF;
    cursor: pointer;
    height: 35px;
    &:hover {
      background: #52D89F;
    }
  }

  .deleteButton {
    width: 20px;
    height: 20px;
    background: #F00;
    border-radius: 0;
    position: absolute;
    right: 0;
    &:hover {
      background: #ff3030;
    }
  }
`;
