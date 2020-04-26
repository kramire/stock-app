import styled from "styled-components";

export const Button = styled.button`
  border-radius: 5px;
  font-size: 16px;
  border: none;
  background-color: grey;
  color: white;

  :hover {
    cursor: pointer;
  }

  :active {
    background-color: #adadad;
  }

  :focus {
    outline: none;
  }

  @media (min-width: 767px) {
    :hover {
      background-color: #adadad;
    }
  }
`;
