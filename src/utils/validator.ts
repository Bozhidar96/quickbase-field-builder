export const validateLabelField = (value: string): string => {
    return !value ? 'Label field is required!' : ''
}

export const validateChoices = (value: string[]): string => {
    if (value.length >= 50) {
        return 'Too many choices! Maximum is 50.';
    }
    if (new Set(value).size !== value.length) {
        return 'Choices must be unique!'
    }

    return ''
}
