import { rowTypes, formIds } from '../consts/constants'
import { SelectOptionsType } from './select'

const { text, checkbox, select, listbox, textarea } = rowTypes
const { fieldType, fieldLabel, defaultValue, choicesListbox, sortSelect } = formIds

type FormId = keyof typeof formIds
type RowType = typeof rowTypes[keyof typeof rowTypes]

interface BaseRow<T extends RowType> {
  rowLabel: string
  type: T
  id: FormId
}

export interface InputRow extends BaseRow<typeof text> {
  placeholder?: string
}

export interface CheckboxRow extends BaseRow<typeof checkbox> {
  label?: string
}

export interface ListboxRow extends BaseRow<typeof listbox> {
  options: string[]
}

export interface SelectRow extends BaseRow<typeof select> {}

export interface TextAreaRow extends BaseRow<typeof textarea> {}

export type FormRow = InputRow | CheckboxRow | ListboxRow | SelectRow | TextAreaRow

export type FormState = {
  [fieldType]: boolean
  [fieldLabel]: string
  [defaultValue]: string
  [choicesListbox]: string[]
  [sortSelect]: SelectOptionsType | null
}
