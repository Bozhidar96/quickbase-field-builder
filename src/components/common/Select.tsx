import { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { SelectOptionsType } from '../../types/select'
import colors from '../../styles/theme/colors'

interface SelectProps {
    id: string
    value: SelectOptionsType | null
    onChange: (option: SelectOptionsType) => void
    disabled?: boolean
    label?: ReactNode
    options?: SelectOptionsType[]
    placeholder?: string
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
`

const Label = styled.label`
    margin-right: 1rem;
`

const ValueBox = styled.div<{ disabled?: boolean }>`
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    border: 1px solid ${colors.gray};
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &::after {
        content: '▼';
        font-size: 0.7rem;
        color: ${colors.gray};
        margin-left: 0.5rem;
        transition: transform 0.2s ease;
    }

    &:focus,
    &:active,
    &:focus-visible {
        outline: 1px solid ${colors.gray};
    }

    ${(props) =>
        props.disabled &&
        `
      background-color: ${colors.gray};
    `}
`

const ListBox = styled.ul<{ disabled?: boolean }>`
    max-height: 10rem;
    overflow-y: auto;
    list-style: none;
    margin: 0;
    padding: 0 0 0.4rem 0;
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${colors.gray};
    position: absolute;
    left: 0;
    top: 100%;
    background: ${colors.white};
    z-index: 10;

    ${(props) =>
        props.disabled &&
        `
      opacity: 0.5;
    `}
`

const ListItem = styled.li<{ selected?: boolean }>`
    padding: 0.2rem 0.8rem;

    &:hover {
        background: ${colors.lightGray};
    }

    ${(props) =>
        props.selected &&
        `
      background: ${colors.gray};

      &:hover {
        background: ${colors.gray};
      }
    `}
`

const Select = ({ id, value, onChange, disabled, label, options, placeholder }: SelectProps) => {
    const [expanded, setExpanded] = useState(false)
    const menuId = `${id}-combolist`

    const handleOnClick = () => {
        if (!disabled) setExpanded(!expanded)
    }

    const handleOnChange = (option: SelectOptionsType) => {
        onChange(option)
        setExpanded(false)
    }

    return (
        <Wrapper>
            {label && <Label htmlFor={id}>{label}</Label>}
            <ValueBox
                id={id}
                role='combobox'
                aria-expanded={expanded}
                tabIndex={0}
                aria-activedescendant={expanded ? menuId : undefined}
                onClick={handleOnClick}
                disabled={disabled}
            >
                {value?.label || placeholder}
            </ValueBox>
            {expanded && options?.length ? (
                <ListBox id={menuId} role='listbox' disabled={disabled}>
                    {options.map((option) => {
                        const isSelected = value?.id === option.id
                        return (
                            <ListItem
                                key={option.id}
                                role='option'
                                aria-selected={isSelected}
                                onClick={() => handleOnChange(option)}
                                selected={isSelected}
                            >
                                {option.label}
                            </ListItem>
                        )
                    })}
                </ListBox>
            ) : null}
        </Wrapper>
    )
}

export default Select
