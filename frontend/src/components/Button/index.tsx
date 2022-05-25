import styled from "styled-components";

export const Button = styled.button`
  min-width: 80px;
  padding: 10px;
  background-color: #eee;
  border: 1px solid #555;
  border-radius: 4px;
  cursor: pointer;

  &:hover:not([disabled]) {
    box-shadow: 0 0 3px 2px #8d8d8d85;
  }
`;