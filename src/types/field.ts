import { info } from "console";

export interface FieldConfig {
  label: string;
  isRequired: boolean;
  isMultiSelect: boolean;
  defaultValue: string;
  choices: string[];
  order: "alphabetical" | "custom";
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FieldBuilderProps {
  initialConfig?: Partial<FieldConfig>;
  onSave?: (config: FieldConfig) => void;
  onCancel?: () => void;
}

export interface InputComponentProps {
  label: string;
  type: "text" | "textarea" | "select" | "checkbox";
  value?: string | boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  rows?: number;
  hasError?: boolean;
  onChange: (value: string | boolean) => void;
  info?: string;
  datalist?: string[];
}

export interface ValidationMessage {
  errors: ValidationError[];
}

export interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  isValid: boolean;
}
