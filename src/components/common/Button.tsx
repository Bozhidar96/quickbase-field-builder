
import { ReactNode } from "react";
import styled, { css } from "styled-components";
import colors from "../../styles/theme/colors";
import { buttonOptions } from "../../consts/constants";

interface ButtonProps {
  id?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: keyof typeof buttonOptions.type;
  variant?: keyof typeof buttonOptions.variant;
  title?: string;
  color?: string;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid;

  ${(props) =>
    props.type === "primary" &&
    css`
      color: ${colors.white};
      background-color: ${colors.green};
      border-color: ${colors.green};
      &:hover {
        color: ${colors.black};
        background-color: ${colors.greenLight};
      }
    `}

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.variant === "outlined" &&
    css`
      background: none;
      border: 1px solid;
    `}
  ${(props) =>
    props.variant === "text" &&
    css`
      background: none;
      border: none;
      &:hover {
        text-decoration: underline;
      }
    `}
  ${(props) =>
    props.disabled &&
    css`
      color: ${colors.gray};
      background-color: ${colors.gray};
      border: 1px solid ${colors.gray};
      &:hover {
        color: ${colors.gray};
        background-color: ${colors.gray};
      }
    `}
`;

const Button = ({
  id,
  children,
  onClick,
  disabled,
  type,
  variant,
  title,
  color,
}: ButtonProps) => {
  return (
    <StyledButton
      id={id}
      onClick={onClick}
      disabled={disabled}
      type={type}
      variant={variant}
      title={title}
      color={color}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
