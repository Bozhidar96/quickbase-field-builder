import { ReactNode } from "react";
import ComponentWrapper from "../components/builder/ComponentWrapper";
import Button, { ButtonEnums } from "../components/common/Button";
import Colors from "../styles/Colors";
import { FormRow } from "../types/form";
import { rowTypes, formIds } from "../consts/constants";
import Select from "../components/common/Select";
import Checkbox from "../components/common/Checkbox";
import Input from "../components/common/Input";

interface Props {
  title: string;
  children?: ReactNode;
}

const Form = ({ title }: Props): JSX.Element => {
  const formRows: FormRow[] = [
    {
      rowLabel: "Label",
      type: rowTypes.text,
      id: formIds.fieldLabel,
      placeholder: "Field Label",
    },
    {
      rowLabel: "Type",
      type: rowTypes.checkbox,
      id: formIds.fieldType,
      label: "A value is required",
    },
    {
      rowLabel: "Default Value",
      type: rowTypes.text,
      id: formIds.defaultValue,
      placeholder: "Default value",
    },
    {
      rowLabel: "Choices",
      type: rowTypes.textarea,
      id: formIds.choicesListbox,
    },
    {
      rowLabel: "Choices",
      type: rowTypes.select,
      id: formIds.sortSelect,
    },
  ];

  return (
    <ComponentWrapper title={title}>
        <Input></Input>
        <Checkbox></Checkbox>
      <Button type={ButtonEnums.type.primary}>Save Changes</Button>
      <span>Or</span>
      <Button color={Colors.danger} variant={ButtonEnums.variant.text}>
        Cancel
      </Button>
    </ComponentWrapper>
  );
};

export default Form;
