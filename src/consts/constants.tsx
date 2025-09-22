export const rowTypes = {
  text: "text",
  checkbox: "checkbox",
  listbox: "listbox",
  select: "select",
  textarea: "textarea",
} as const;

export const formIds = {
  fieldLabel: "fieldLabel",
  fieldType: "fieldType", 
  defaultValue: "defaultValue",
  choicesListbox: "choicesListbox",
  sortSelect: "sortSelect",
} as const;

export const storageKeys = {
  fieldTypeForm: "fieldTypeForm",
} as const;

export const buttonOptions = {
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

