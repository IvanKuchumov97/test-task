import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import type {StatusType, TaskType} from '../../models/Models'

export type TaskState = {
    [key: StatusType]: TaskType[]
}

const initialState: TaskState = {
    planned: [],
    inProgress: [],
    done: [],
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<TaskType>) {
            state[action.payload.status].push(action.payload)
        },
        changeTaskTitle(state, action: PayloadAction<{ task: TaskType, index: number }>) {
            state[action.payload.task.status][action.payload.index].title = action.payload.task.title
        },
        deleteTask(state, action: PayloadAction<{ task: TaskType, index: number }>) {
            state[action.payload.task.status].splice(action.payload.index, 1)
        },
        changeTaskIndex(state, action: PayloadAction<{
            droppableId: StatusType,
            destinationIndex: number,
            sourceIndex: number,
        }>) {
            [
                state[action.payload.droppableId][action.payload.destinationIndex],
                state[action.payload.droppableId][action.payload.sourceIndex]
            ] =
                [
                    state[action.payload.droppableId][action.payload.sourceIndex],
                    state[action.payload.droppableId][action.payload.destinationIndex]
                ]
        },
        moveTask(state, action: PayloadAction<{
            droppableId: StatusType,
            sourceId: StatusType,
            destinationIndex: number,
            sourceIndex: number,
        }>) {
            const task = state[action.payload.sourceId][action.payload.sourceIndex]
            task.status = action.payload.droppableId
            state[action.payload.droppableId]
                .splice(action.payload.destinationIndex, 0, task)
            state[action.payload.sourceId].splice(action.payload.sourceIndex, 1)
        },
    },
})

export default taskSlice.reducer