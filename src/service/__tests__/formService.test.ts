import axios from 'axios'
import fieldService from '../formService'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('formService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getField', () => {
        const mockApiResponse = {
            label: 'Test Field',
            required: true,
            choices: ['Choice 1', 'Choice 2'],
            displayAlpha: true,
            default: 'Choice 1'
        }

        it('should successfully fetch field data', async () => {
            mockedAxios.get.mockResolvedValue({
                data: mockApiResponse
            })

            const result = await fieldService.getField('test-id')

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://bozhidar-form-builder.free.beeceptor.com/api/get-field/test-id',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                }
            )
            expect(result).toEqual(mockApiResponse)
        })

        it('should return fallback data when API call fails', async () => {
            const mockError = new Error('Network error')
            mockedAxios.get.mockRejectedValue(mockError)

            const result = await fieldService.getField('test-id')

            expect(result).toEqual({
                label: 'Sales region',
                required: false,
                choices: [
                    'Asia',
                    'Australia',
                    'Western Europe',
                    'North America',
                    'Eastern Europe',
                    'Latin America',
                    'Middle East and Africa'
                ],
                displayAlpha: true,
                default: 'North America'
            })
        })


        it('should handle different field IDs correctly', async () => {
            mockedAxios.get.mockResolvedValue({
                data: mockApiResponse
            })

            await fieldService.getField('different-id')

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://bozhidar-form-builder.free.beeceptor.com/api/get-field/different-id',
                expect.any(Object)
            )
        })
    })

    describe('saveField', () => {
        const mockFormData = {
            fieldLabel: 'Test Label',
            fieldType: true,
            defaultValue: 'Test Default',
            choicesListbox: ['Option 1', 'Option 2'],
            sortSelect: { id: 'alphaAscending', label: 'Alphabetical Ascending' }
        }

        const mockSaveResponse = {
            success: true,
            message: 'Field saved successfully'
        }

        it('should successfully save field data', async () => {
            mockedAxios.post.mockResolvedValue({
                data: mockSaveResponse
            })

            const result = await fieldService.saveField(mockFormData)

            expect(mockedAxios.post).toHaveBeenCalledWith(
                'https://bozhidar-form-builder.free.beeceptor.com/api/save-field',
                mockFormData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: false
                }
            )
            expect(result).toEqual(mockSaveResponse)
        })

     
        it('should handle empty form data', async () => {
            mockedAxios.post.mockResolvedValue({
                data: mockSaveResponse
            })

            const emptyFormData = {}
            const result = await fieldService.saveField(emptyFormData)

            expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), emptyFormData, expect.any(Object))
            expect(result).toEqual(mockSaveResponse)
        })
    })
})
