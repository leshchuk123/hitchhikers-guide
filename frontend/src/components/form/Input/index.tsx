import React, { InputHTMLAttributes } from 'react';
import { forwardRef, ForwardedRef } from 'react';
import { FC } from 'react';
import styled from 'styled-components';

interface ILabeledInput extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  textarea?: boolean
}

const LabeledInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, ILabeledInput>((props, ref) => {
  const {
    label,
    className,
    textarea = false,
    ...rest
  } = props;
  return (
    <div className={className}>
      <InputLabel>{label}</InputLabel>
      {
        textarea ?
          <TextArea ref={ref as ForwardedRef<HTMLTextAreaElement>} rows={3} {...rest} /> :
          <Input ref={ref as ForwardedRef<HTMLInputElement>} {...rest} />
      }
    </div>
  );
});

export const StyledLabeledInput = styled(LabeledInput)`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 20px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid lightgrey;
  line-height: 1.5em;
  outline-color: #bbb;
  font-family: inherit;
  font-size: inherit;

  &::placeholder {
    color: #bbb;
  }

  ${StyledLabeledInput} & {
    flex: 1;
  }
`
export const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid lightgrey;
  outline-color: #bbb;
  font-family: inherit;
  font-size: inherit;

  &::placeholder {
    color: #bbb;
  }

  ${StyledLabeledInput} & {
    flex: 1;
  }
`;

export const InputLabel = styled.label`
  font-weight: 700;
  line-height: 1;
  padding-top: 10px;

  &::after {
    content: ":";
  }

  ${StyledLabeledInput} & {
    width: 150px;
    text-align: right;
  }
`;
