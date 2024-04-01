import {combineReducers, configureStore} from '@reduxjs/toolkit'

import taskReducer from './slice/TaskSlice'


const rootReducer = combineReducers({taskReducer})

export const setupStore = () => {
    return configureStore({reducer: rootReducer})
}

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatch = AppStoreType['dispatch']