import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

import {AppDispatch, RootStateType} from '../store/setupStore'


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector