import { ReactNode } from "react";
import styled, { css } from "styled-components";

import InputWrapper from "./InputWrapper";
import colors from "../../styles/theme/colors";

interface Props {
  id: string;
  name?: string;
  noWrap?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  customStyles?: string;
  label?: ReactNode;
  error?: string;
}

const Label = styled.label`
  margin-right: 1rem;
`;

const Container = styled.div<{ customStyles?: string }>`
  ${(props) =>
    props.customStyles &&
    css`
      ${props.customStyles}
    `}
`;

const StyledTextArea = styled.textarea<{ disabled?: boolean }>`
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  border: 1px solid ${colors.lightGray};
  height: 8rem;
  resize: none;
  width: 100%;
  box-sizing: border-box;

  &:focus,
  &:active,
  &:focus-visible {
    outline: 1px solid ${colors.gray};
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${colors.lightGray};
      cursor: not-allowed;
    `}
`;

const ErrorText = styled.p`
  margin-bottom: 0;
  color: ${colors.danger};
`;

const TextArea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  customStyles,
  label,
  noWrap,
  error,
}: Props): JSX.Element => {
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <InputWrapper noWrap={noWrap}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Container customStyles={customStyles}>
        <StyledTextArea
          id={id}
          name={name}
          value={value}
          onChange={disabled ? undefined : handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </Container>
    </InputWrapper>
  );
};

export default TextArea;
