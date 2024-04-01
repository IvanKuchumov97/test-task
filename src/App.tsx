import {DragDropContext, DropResult} from 'react-beautiful-dnd'

import {Todolist} from './components/Todolist/Todolist'
import {useAppDispatch} from './hooks/redux'
import {taskSlice} from './store/slice/TaskSlice'
import {StatusType} from './models/Models'
import './App.css'

export const App = () => {
    const dispatch = useAppDispatch()

    const onDragEndHandler = (result: DropResult) => {
        const {destination, source} = result
        console.log(result)

        if (!destination) return

        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (destination.droppableId === source.droppableId) {
            dispatch(taskSlice.actions.changeTaskIndex({
                droppableId: destination.droppableId as StatusType,
                destinationIndex: destination.index,
                sourceIndex: source.index
            }))
        } else {
            dispatch(taskSlice.actions.moveTask({
                droppableId: destination.droppableId as StatusType,
                sourceId: source.droppableId as StatusType,
                destinationIndex: destination.index,
                sourceIndex: source.index
            }))
        }

    }

    return (
        <DragDropContext onDragEnd={onDragEndHandler}>
            <div className={'App'}>
                <div className={'App_TodolistContainer'}>
                    <Todolist title={'Planned'} status={'planned'}/>
                    <Todolist title={'InProgress'} status={'inProgress'}/>
                    <Todolist title={'Done'} status={'done'}/>
                </div>
            </div>
        </DragDropContext>

    )
}
