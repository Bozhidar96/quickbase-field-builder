import styled, { css } from "styled-components";
import { ReactNode } from "react";
import colors from "../../styles/theme/colors";

export const ButtonEnums = {
  type: {
    primary: "primary",
    secondary: "secondary",
  },
  variant: {
    default: "default",
    outlined: "outlined",
    text: "text",
  },
} as const;

interface ButtonProps {
  id?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: keyof typeof ButtonEnums.type;
  variant?: keyof typeof ButtonEnums.variant;
  title?: string;
  color?: string;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid;

  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${colors.green};
      color: ${colors.white};
      border-color: ${colors.green};
      &:hover {
        background-color: ${colors.greenLight};
        color: ${colors.black};
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
      background-color: ${colors.lightGray};
      color: ${colors.gray};
      border: 1px solid ${colors.gray};
      cursor: not-allowed;
      &:hover {
        background-color: ${colors.lightGray};
        color: ${colors.gray};
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
