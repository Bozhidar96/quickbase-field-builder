import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import colors from '../styles/theme/colors'
import { FormRow, FormState } from '../types/form'
import { SelectOptionsType } from '../types/select'
import fieldService from '../service/formService'
import { buttonOptions, formIds, rowTypes } from '../consts/constants'
import { validateChoices, validateLabelField } from '../utils/validator'
import { removeLocalStorage, setLocalStorage } from '../utils/persistence'

import ComponentWrapper from '../components/builder/ComponentWrapper'
import Button from '../components/common/Button'
import Checkbox from '../components/common/Checkbox'
import InputText from '../components/common/Input'
import TextArea from '../components/common/TextArea'
import Select from '../components/common/Select'

const { text, checkbox, select, textarea } = rowTypes
const { fieldType, fieldLabel, defaultValue, choicesListbox, sortSelect } = formIds

const FormContainer = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Label = styled.label`
    flex-basis: 30%;
    display: flex;
    margin: 0.5rem 0 1rem 0;
`

const ControlWrapper = styled.div<{ multiple?: boolean }>`
    flex-basis: 70%;
    margin-bottom: 1rem;
    display: ${(props) => (props.multiple ? 'flex' : 'block')};
    align-items: ${(props) => (props.multiple ? 'center' : 'initial')};
`

const MarginLeft = styled.div`
    margin-left: 1rem;
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem auto;
`

const ButtonSeparator = styled.span`
    margin-left: 0.5rem;
`

const CancelButton = styled(Button)`
    color: ${colors.danger};
`

const initialValidation = {
    [fieldLabel]: '',
    [choicesListbox]: ''
}

interface Props {
    data: FormState
    storageKey: string
    sortOptions: SelectOptionsType[]
}

const Form = ({ data, storageKey, sortOptions }: Props): JSX.Element => {
    const [formData, setFormData] = useState(data)
    const [formErrors, setFormErrors] = useState(initialValidation)
    const formDataRef = useRef(formData)
    const formHasErrors = Object.values(formErrors).some((error) => error !== '')

    const formRows: FormRow[] = [
        {
            id: fieldLabel,
            rowLabel: 'Label',
            type: text,
            placeholder: 'Field Label'
        },
        {
            id: fieldType,
            rowLabel: 'Type',
            type: checkbox,
            label: 'A value is required'
        },
        {
            id: defaultValue,
            rowLabel: 'Default Value',
            type: text,
            placeholder: 'Default value'
        },
        {
            id: choicesListbox,
            rowLabel: 'Choices',
            type: textarea
        },
        {
            id: sortSelect,
            rowLabel: 'Order',
            type: select
        }
    ]

    useEffect(() => {
        setFormData(data)
    }, [data])

    useEffect(() => {
        formDataRef.current = formData
        setFormErrors({
            [fieldLabel]: validateLabelField(formData[fieldLabel]),
            [choicesListbox]: validateChoices(formData[choicesListbox])
        })
    }, [formData])

    useEffect(() => {
        return () => {
            const refData = formDataRef.current
            if (refData) setLocalStorage(storageKey, JSON.stringify(refData))
        }
    }, [])

    const renderRow = (row: FormRow) => {
        const handleChange = (value: string | boolean) => setFormData({ ...formData, [row.id]: value })

        let control = null

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
            )
        }

        if (row.type === checkbox) {
            control = (
                <ControlWrapper multiple>
                    <span>Multi-select</span>
                    <MarginLeft>
                        <Checkbox id={row.id} label={row.label} checked={formData[fieldType]} onChange={handleChange} />
                    </MarginLeft>
                </ControlWrapper>
            )
        }

        if (row.type === textarea) {
            const handleTextAreaChange = (value: string) => {
                const choices = value.split(/\r?\n/).filter((line) => line.trim() !== '')
                setFormData({ ...formData, [choicesListbox]: choices })
            }

            control = (
                <TextArea
                    id={row.id}
                    onChange={handleTextAreaChange}
                    value={formData[choicesListbox].join('\r\n')}
                    noWrap
                    error={formErrors?.[choicesListbox]}
                />
            )
        }

        if (row.type === select) {
            const handleSelectChange = (value: SelectOptionsType) => setFormData({ ...formData, [sortSelect]: value })
            control = (
                <Select id={row.id} options={sortOptions} value={formData[sortSelect]} onChange={handleSelectChange} />
            )
        }

        return (
            <Fragment key={row.id}>
                <Label htmlFor={row.id}>{row.rowLabel}</Label>
                <ControlWrapper>{control}</ControlWrapper>
            </Fragment>
        )
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleSave = useCallback(
        async (e?: React.MouseEvent) => {
            if (e) e.preventDefault()
            try {
                const choices = formData[choicesListbox].filter(Boolean)
                const defaultValues = formData[defaultValue]

                const needsDefaultValues = defaultValues && defaultValues.trim() !== ''
                   && !choices.includes(defaultValues);
                const saveData = {
                    ...formData,
                    [choicesListbox]: needsDefaultValues 
                    ? [...choices, defaultValues] 
                    : choices
                }

                const response = await fieldService.saveField(saveData)
                console.log('Save response:', response)
                removeLocalStorage(storageKey)
                setFormData(saveData)
            } catch (error) {
                console.error('Save failed:', error)
            }
        },
        [formData]
    )

    const handleCancel = useCallback(
        (e?: React.MouseEvent) => {
            if (e) e.preventDefault()
            setFormData(data)
        },
        [data]
    )

    return (
        <ComponentWrapper title='Field Builder'>
            <FormContainer onSubmit={handleFormSubmit}>
                {formRows.map((row) => renderRow(row))}
                <ButtonWrapper>
                    <Button disabled={formHasErrors} type={buttonOptions.type.primary} onClick={handleSave}>
                        Save Changes
                    </Button>
                    <ButtonSeparator>Or</ButtonSeparator>
                    <CancelButton
                        variant={buttonOptions.variant.text}
                        type={buttonOptions.type.secondary}
                        onClick={handleCancel}
                    >
                        Cancel
                    </CancelButton>
                </ButtonWrapper>
            </FormContainer>
        </ComponentWrapper>
    )
}

export default Form
