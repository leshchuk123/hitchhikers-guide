import styled from 'styled-components';

export const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid lightgrey;
`;

export const InputLabel = styled.label`
  font-weight: 700;
  padding-right: 20px;

  &::after {
    content: ":";
  }
`;
