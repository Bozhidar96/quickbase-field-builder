import { ReactNode } from "react";
import ComponentWrapper from "../components/builder/ComponentWrapper";
import Button, { ButtonEnums } from "../components/common/Button";
import Colors from "../styles/Colors";

interface Props {
  title: string;
  children?: ReactNode;
}

const FormWrapper = ({ title }: Props): JSX.Element => {
  return (
    <ComponentWrapper title={title}>
      <Button type={ButtonEnums.type.primary}>Save Changes</Button>
      <span>Or</span>
      <Button color={Colors.danger} variant={ButtonEnums.variant.text}>
        Cancel
      </Button>
    </ComponentWrapper>
  );
};

export default FormWrapper;
