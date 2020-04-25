import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const Message = styled.div`
  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  transition: transform 0.5s ease;
  animation: toast-in-right 0.5s;
  background-color: #c16555;
  border-radius: 4px;
  padding: 1em 1em 1em 1.5em;
  font-size: 16px;
  font-style: italic;
  margin: 0.5em 0;
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: #ddd;
  height: 50%;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  padding: 0;
`;

export const Toast = ({ messages, removeMsg }) => {
  return (
    <Wrapper>
      {messages.map(msg => (
        <Message>
          <span>{msg.message}</span>
          <DeleteButton onClick={() => removeMsg(msg.id)}>X</DeleteButton>
        </Message>
      ))}
    </Wrapper>
  );
};
