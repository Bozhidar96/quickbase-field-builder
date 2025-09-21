import { ReactNode } from 'react'
import ComponentWrapper from '../components/builder/ComponentWrapper'
import Button from '../components/common/Button'


interface Props {
  title: string
  children?: ReactNode
}

const FormWrapper = ({ title, children }: Props): JSX.Element => {
  return (
  <ComponentWrapper title={title}>
    <Button>Save Changes</Button>
    <span>Or</span>
    <Button>Cancel</Button>
  </ComponentWrapper>
  )
}

export default FormWrapper