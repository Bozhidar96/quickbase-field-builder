import { validateLabelField, validateChoices } from '../validator'

describe('validator utilities', () => {
    describe('validateLabelField', () => {
        it('should return empty string when value is provided', () => {
            const result = validateLabelField('Valid label')
            expect(result).toBe('')
        })

        it('should return empty string when value has leading/trailing spaces but content', () => {
            const result = validateLabelField('  Valid label  ')
            expect(result).toBe('')
        })
    })

    describe('validateChoices', () => {
        it('should return empty string for valid choices', () => {
            const choices = ['Option 1', 'Option 2', 'Option 3']
            const result = validateChoices(choices)
            expect(result).toBe('')
        })

        it('should return empty string for empty array', () => {
            const result = validateChoices([])
            expect(result).toBe('')
        })

        it('should return error when choices exceed maximum limit', () => {
            const choices = Array.from({ length: 51 }, (_, i) => `Option ${i + 1}`)
            const result = validateChoices(choices)
            expect(result).toBe('Too many choices! Maximum is 50.')
        })

        it('should return error when choices are not unique', () => {
            const choices = ['Option 1', 'Option 2', 'Option 1']
            const result = validateChoices(choices)
            expect(result).toBe('Choices must be unique!')
        })

        it('should detect duplicates with different casing', () => {
            const choices = ['Option 1', 'option 1']
            const result = validateChoices(choices)
            expect(result).toBe('')
        })

        it('should detect exact duplicates case-sensitively', () => {
            const choices = ['Option 1', 'Option 1']
            const result = validateChoices(choices)
            expect(result).toBe('Choices must be unique!')
        })
    })
})
