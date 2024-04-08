import { ACTIONS } from "./action"
import reducer from "./reducer"
import React, { createContext, useEffect, useReducer } from "react"

export const DataContext = createContext()

export const DataProvider = ({ chidlren }) => {
    const initState = {
        auth: {},
    }

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {}, [])

    return (
        <DataContext.Provider value={[state, dispatch]}>
            {chidlren}
        </DataContext.Provider>
    )
}
