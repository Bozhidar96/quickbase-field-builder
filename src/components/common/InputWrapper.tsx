import { ReactNode } from 'react'
import styled from 'styled-components'

interface InputWrapperProps {
    children: ReactNode
    noWrap?: boolean
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`

const InputWrapper = ({ children, noWrap }: InputWrapperProps): JSX.Element => {
    return noWrap ? <>{children}</> : <Wrapper>{children}</Wrapper>
}

export default InputWrapper
