import styled, { css } from 'styled-components'
import { ReactNode } from 'react'
import Colors from '../../styles/Colors'

export const ButtonEnums = {
  type: {
    primary: 'primary',
    secondary: 'secondary'
  },
  variant: {
    default: 'default',
    outlined: 'outlined',
    text: 'text'
  }
} as const

interface ButtonProps {
  id?: string
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: keyof typeof ButtonEnums.type
  variant?: keyof typeof ButtonEnums.variant
  title?: string
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid;

  ${(props) =>
    props.type === 'primary' &&
    css`
      background-color: ${Colors.green};
      color: ${Colors.white};
      border-color: ${Colors.green};
      &:hover {
        background-color: ${Colors.greenLight};
        color: ${Colors.black};
      }
    `}

  ${(props) =>
    props.variant === 'outlined' &&
    css`
      background: none;
      border: 1px solid;
    `}
  ${(props) =>
    props.variant === 'text' &&
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
      background-color: ${Colors.lightGray};
      color: ${Colors.gray};
      border: 1px solid ${Colors.gray};
      cursor: not-allowed;
      &:hover {
        background-color: ${Colors.lightGray};
        color: ${Colors.gray};
      }
    `}
`

const Button = ({ id, children, onClick, disabled, type, variant, title }: ButtonProps) => {
  return (
    <StyledButton
      id={id}
      onClick={onClick}
      disabled={disabled}
      type={type}
      variant={variant}
      title={title}
    >
      {children}
    </StyledButton>
  )
}

export default Button
