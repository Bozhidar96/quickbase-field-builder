import axios from 'axios'

const API = {
    save: 'https://bozhidar-form-builder.free.beeceptor.com/api/save-field'
}

const fieldService = {
    getField: function (id: string) {
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
