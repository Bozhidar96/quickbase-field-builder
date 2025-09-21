import { ReactNode } from 'react'
import ComponentWrapper from '../components/builder/ComponentWrapper'


interface Props {
  title: string
  children?: ReactNode
}

const FormWrapper = ({ title, children }: Props): JSX.Element => {
  return (
  <ComponentWrapper title={title}>{children}
    <span>Bozhidar Form</span>
  </ComponentWrapper>
  )
}

export default FormWrapper