import { useEffect, useState } from 'react'
import { formIds, storageKeys } from './consts/constants'
import { SelectOptionsType } from './types/select'
import { FormState } from './types/form'
import fieldService from './service/formService'

import Form from './modules/Form'
import Header from './components/common/Header'

import { getLocalStorage } from './utils/persistence'
import styled from 'styled-components'

const AppContainer = styled.div`
    min-height: 100vh;
    background-color: #f8f9fa;
`

const MainContent = styled.main`
    display: flex;
    justify-content: center;
    padding: 2rem;
`

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 1.2rem;
    color: #666;
`

const { fieldType, fieldLabel, defaultValue, choicesListbox, sortSelect } = formIds

const sortTypes = {
    alphaAscending: 'alphaAscending',
    alphaDescending: 'alphaDescending'
}

const sortOptions: SelectOptionsType[] = [
    { id: sortTypes.alphaAscending, label: 'Choices in Alphabetical Asc' },
    { id: sortTypes.alphaDescending, label: 'Choices in Alphabetical Desc' }
]

const initialState: FormState = {
    [fieldLabel]: '',
    [fieldType]: false,
    [defaultValue]: '',
    [choicesListbox]: [],
    [sortSelect]: sortOptions[0]
}

const storageKeyValue = storageKeys.fieldTypeForm

const App = (): JSX.Element => {
    const [formData, setFormData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const apiRes = await fieldService.getField('test-id')
                console.log('apiRes', apiRes)
                if (apiRes) {
                    const stateData = {
                        [fieldLabel]: apiRes.label ?? initialState[fieldLabel],
                        [fieldType]: apiRes.required ?? initialState[fieldType],
                        [defaultValue]: apiRes.default ?? initialState[defaultValue],
                        [choicesListbox]: apiRes.choices ?? initialState[choicesListbox],
                        [sortSelect]:
                            (apiRes.displayAlpha ? sortOptions[0] : sortOptions[1]) ?? initialState[sortSelect]
                    }

                    console.log('API data loaded successfully:', stateData)
                    setFormData(stateData)
                } else {
                    console.log('No API data received, using initial state')
                    setFormData(initialState)
                }
            } catch (error) {
                console.error('Failed to load initial data:', error)
                setError('Failed to load form data')
                setFormData(initialState) // Use fallback data
            } finally {
                setIsLoading(false)
            }
        }

        loadInitialData()
    }, [])

    if (isLoading) {
        return (
            <AppContainer>
                <Header logoSrc='/logo.png' />
                <MainContent>
                    <LoadingContainer>Loading form data...</LoadingContainer>
                </MainContent>
            </AppContainer>
        )
    }

    if (error) {
        return (
            <AppContainer>
                <Header logoSrc='/logo.png' />
                <MainContent>
                    <LoadingContainer>
                        {error}
                        <br />
                        <small>Using default form data</small>
                    </LoadingContainer>
                </MainContent>
            </AppContainer>
        )
    }

    return (
        <AppContainer>
            <Header logoSrc='/logo.png' />
            <MainContent>
                <Form data={formData} storageKey={storageKeys.fieldTypeForm} sortOptions={sortOptions} />
            </MainContent>
        </AppContainer>
    )
}

export default App
