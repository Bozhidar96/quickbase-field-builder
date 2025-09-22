import { ReactNode } from "react";
import styled, { css } from "styled-components";
import colors from "../../styles/theme/colors";

interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  position: relative;
  margin: 0;
`;

const Input = styled.input<{ disabled?: boolean }>`
  appearance: none;
  background: ${colors.white};
  border: 1px solid ${colors.gray};
  margin-right: 0.5rem;
  border-radius: 5px;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  position: relative;

  &:before {
    content: "";
    width: 1.25rem;
    height: 1.25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.2rem;
    background-color: ${colors.lightGray};
    opacity: 0;
  }

  &:after {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 0.75rem;
    height: 0.3rem;
    border: 0.2rem solid ${colors.green};
    border-right: 0;
    border-top: 0;
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
  }

  &:checked {
    border-color: ${colors.greenLight};

    &:after {
      opacity: 1;
    }
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}
`;

const Checkbox = ({
  id,
  name,
  checked,
  onChange,
  disabled,
  label,
}: CheckboxProps) => {
  const handleChange = () => {
    onChange?.(!checked);
  };

  return (
    <Wrapper>
      <Label>
        <Input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={disabled ? undefined : handleChange}
          disabled={disabled}
        />
        {label && <span>{label}</span>}
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
