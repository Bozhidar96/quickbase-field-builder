import axios from 'axios'

const API = {
    save: 'https://bozhidar-form-builder.free.beeceptor.com/api/save-field',
    get: 'https://bozhidar-form-builder.free.beeceptor.com/api/get-field'
}

interface FieldApiResponse {
    label: string
    required: boolean
    choices: string[]
    displayAlpha: boolean
    default: string
}

const fieldService = {
    getField: async function (id: string): Promise<FieldApiResponse | null> {
        try {
            const response = await axios.get<FieldApiResponse>(`${API.get}/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000 
            })
            console.log('response', response)
            return response.data
        } catch (error) {
            console.error('Error getting the fields:', error)

            // fallback fields
            return {
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
            }
        }
    },

    saveField: async function (formData: object) {
        try {
            console.log('Sending field data to Beeceptor:', formData)
            console.log('Payload:', JSON.stringify(formData, null, 2))

            const response = await axios.post(API.save, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: false
            })

            console.log('Beeceptor response:', response.data)
            return response.data
        } catch (error) {
            console.error('Error saving the fields:', error)
            throw error
        }
    }
}

export default fieldService
