import { ReactNode } from "react";
import styled, { css } from "styled-components";
import Colors from "../../styles/Colors";

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
  cursor: pointer;
  margin: 0;
`;

const Input = styled.input<{ disabled?: boolean }>`
  appearance: none;
  background: ${Colors.white};
  border: 1px solid ${Colors.gray};
  border-radius: 5px;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  padding: 0;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.125rem;
    background-color: ${Colors.lightGray};
    opacity: 0;
    pointer-events: none;
  }

  &:after {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 0.75rem;
    height: 0.3125rem;
    border: 0.1875rem solid ${Colors.green};
    border-right: 0;
    border-top: 0;
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
  }

  &:checked {
    border-color: ${Colors.greenLight};

    &:after {
      opacity: 1;
    }
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
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
