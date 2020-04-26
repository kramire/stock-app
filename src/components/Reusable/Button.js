import styled from "styled-components";

export const Button = styled.button`
  border-radius: 5px;
  font-size: 16px;
  border: none;
  background-color: grey;
  color: white;

  :hover {
    background-color: #adadad;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;
