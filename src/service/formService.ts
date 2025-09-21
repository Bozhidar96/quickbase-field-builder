import axios from 'axios'

const API = {
    save: 'https://bozhidar-form-builder.free.beeceptor.com/api/save-field'
}

const fieldService = {
    getField: function (id: string) {
        console.log(id)
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
    saveField: async function (fieldJson: object) {
        try {
            console.log('Sending field data to Beeceptor:', fieldJson)

            const response = await axios.post(API.save, fieldJson, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: false
            })

            console.log('Beeceptor response:', response.data)
            return response.data
        } catch (error) {
            console.error('Error saving field to Beeceptor:', error)
            throw error
        }
    }
}

export default fieldService
