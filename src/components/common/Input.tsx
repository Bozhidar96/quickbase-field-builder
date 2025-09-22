import { ReactNode } from "react";
import styled, { css } from "styled-components";
import colors from "../../styles/theme/colors";

import InputWrapper from "./InputWrapper";

interface InputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: ReactNode;
  noWrap?: boolean;
  error?: string;
}
const Label = styled.label`
  margin-right: 1rem;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const StyledInput = styled.input<{ disabled?: boolean }>`
  width: 100%;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  border: 1px solid ${colors.gray};
  box-sizing: border-box;

  &:focus,
  &:active,
  &:focus-visible {
    outline: 1px solid ${colors.gray};
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${colors.gray};
      cursor: not-allowed;
    `}
`;

const ErrorText = styled.p`
  margin-bottom: 0;
  color: ${colors.danger};
`;

const Input = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  label,
  noWrap,
  error,
}: InputProps): JSX.Element => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <InputWrapper noWrap={noWrap}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputContainer>
        <StyledInput
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={disabled ? undefined : handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    </InputWrapper>
  );
};

export default Input;
