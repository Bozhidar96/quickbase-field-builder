export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationMessage {
  errors: ValidationError[];
}
