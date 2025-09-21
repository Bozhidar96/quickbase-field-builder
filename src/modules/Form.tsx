import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ComponentWrapper from "../components/builder/ComponentWrapper";
import Button, { ButtonEnums } from "../components/common/Button";
import Checkbox from "../components/common/Checkbox";
import InputText from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import Select from "../components/common/Select";

import Colors from "../styles/Colors";
import { FormRow, FormState } from "../types/form";
import { SelectOptionsType } from "../types/select";
import fieldService from "../service/formService";
import { formIds, rowTypes } from "../consts/constants";
import { validateChoices, validateLabelField } from "../utils/validator";
import { removeLocalStorage, setLocalStorage } from "../utils/persistence";

const { text, checkbox, select, textarea } = rowTypes;
const { fieldType, fieldLabel, defaultValue, choicesListbox, sortSelect } =
  formIds;

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  max-width: 45rem;
`;

const Label = styled.label`
  flex-basis: 30%;
  display: flex;
  margin: 0.5rem 0 1rem 0;
`;

const ControlWrapper = styled.div<{ multiple?: boolean }>`
  flex-basis: 70%;
  margin-bottom: 1rem;
  display: ${(props) => (props.multiple ? "flex" : "block")};
  align-items: ${(props) => (props.multiple ? "center" : "initial")};
`;

const MarginLeft = styled.div`
  margin-left: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem auto;
`;

const ButtonSeparator = styled.span`
  margin-left: 0.5rem;
`;

const CancelButton = styled(Button)`
  color: ${Colors.danger};
`;

const initialValidation = {
  [fieldLabel]: "",
  [choicesListbox]: "",
};

interface Props {
  data: FormState;
  storageKey: string;
  sortOptions: SelectOptionsType[];
}

const Form = ({ data, storageKey, sortOptions }: Props): JSX.Element => {
  const [formData, setFormData] = useState(data);
  const [formErrors, setFormErrors] = useState(initialValidation);
  const formDataRef = useRef(formData);
  const formHasErrors = Object.values(formErrors).some((error) => error !== "");

  const formRows: FormRow[] = [
    {
      rowLabel: "Label",
      type: text,
      id: fieldLabel,
      placeholder: "Field Label",
    },
    {
      rowLabel: "Type",
      type: checkbox,
      id: fieldType,
      label: "A value is required",
    },
    {
      rowLabel: "Default Value",
      type: text,
      id: defaultValue,
      placeholder: "Default value",
    },
    { rowLabel: "Choices", type: textarea, id: choicesListbox },
    { rowLabel: "Order", type: select, id: sortSelect },
  ];

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    formDataRef.current = formData;
    setFormErrors({
      [fieldLabel]: validateLabelField(formData[fieldLabel]),
      [choicesListbox]: validateChoices(formData[choicesListbox]),
    });
  }, [formData]);

  useEffect(() => {
    return () => {
      const refData = formDataRef.current;
      if (refData) setLocalStorage(storageKey, JSON.stringify(refData));
    };
  }, []);

  const renderRow = (row: FormRow) => {
    const handleChange = (value: string | boolean) =>
      setFormData({ ...formData, [row.id]: value });

    let control = null;

    if (row.type === text) {
      control = (
        <InputText
          id={row.id}
          placeholder={row.placeholder}
          noWrap
          value={formData[row.id] as string}
          onChange={handleChange}
          error={row.id === fieldLabel ? formErrors?.[fieldLabel] : undefined}
        />
      );
    }

    if (row.type === checkbox) {
      control = (
        <ControlWrapper multiple>
          <span>Multi-select</span>
          <MarginLeft>
            <Checkbox
              id={row.id}
              label={row.label}
              checked={formData[fieldType]}
              onChange={handleChange}
            />
          </MarginLeft>
        </ControlWrapper>
      );
    }

    if (row.type === textarea) {
      const handleTextAreaChange = (value: string) => {
        setFormData({ ...formData, [choicesListbox]: value.split(/\r?\n/) });
      };

      control = (
        <TextArea
          id={row.id}
          onChange={handleTextAreaChange}
          value={formData[choicesListbox].join("\r\n")}
          noWrap
          error={formErrors?.[choicesListbox]}
        />
      );
    }

    if (row.type === select) {
      const handleSelectChange = (value: SelectOptionsType) =>
        setFormData({ ...formData, [sortSelect]: value });
      control = (
        <Select
          id={row.id}
          options={sortOptions}
          value={formData[sortSelect]}
          onChange={handleSelectChange}
        />
      );
    }

    return (
      <Fragment key={row.id}>
        <Label htmlFor={row.id}>{row.rowLabel}</Label>
        <ControlWrapper>{control}</ControlWrapper>
      </Fragment>
    );
  };

  const handleSave = useCallback(() => {
    const choices = formData[choicesListbox].filter(Boolean);
    const saveData = {
      ...formData,
      [choicesListbox]: choices.includes(formData[defaultValue])
        ? choices
        : [...choices, formData[defaultValue]],
    };
    fieldService.saveField(saveData);
    removeLocalStorage(storageKey);
    setFormData(saveData);
  }, [formData]);

  const handleCancel = useCallback(() => setFormData(data), [data]);

  return (
    <ComponentWrapper title="Field Builder">
      <FormContainer>
        {formRows.map((row) => renderRow(row))}
        <ButtonWrapper>
          <Button
            disabled={formHasErrors}
            type={ButtonEnums.type.primary}
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <ButtonSeparator>or</ButtonSeparator>
          <CancelButton
            variant={ButtonEnums.variant.text}
            onClick={handleCancel}
          >
            Cancel
          </CancelButton>
        </ButtonWrapper>
      </FormContainer>
    </ComponentWrapper>
  );
};

export default Form;
