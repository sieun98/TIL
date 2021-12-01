import { useState, useCallback, useReducer } from 'react'

function reducer(state, action) {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                [action.name]: action.value
            }
        case 'RESET':
            return  Object.keys(state).reduce((acc, current) => {
                acc[current] = ''
                return acc
              }, {})
        default:
            return state
    }
}

function useInputs(initialForm) {
    // const [form, setForm ] = useState(initialForm)
    const [form, dispatch] = useReducer(reducer, initialForm)
    const onChange = useCallback(event => {
        // const {name, value} = event.target
        // setForm(form => ({
        //     ...form,
        //     [name]: value
        // }))
        const {name, value} = event.target
        dispatch({
            type: 'CHANGE',
            name,
            value
        })
    }, [])
    const reset = useCallback(() => {
        // setForm(initialForm)
        dispatch({
            type: 'RESET',
        })
    }, [])

    return [form, onChange, reset]
}

export default useInputs