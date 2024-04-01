import React, {ChangeEvent, MouseEvent, useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'

import BasketIcon from '../../assets/basket.svg?react'
import CheckmarkIcon from '../../assets/checkmark.svg?react'
import {taskSlice} from '../../store/slice/TaskSlice'
import {useAppDispatch} from '../../hooks/redux'
import './TaskCard.css'
import type {TaskType} from '../../models/Models'

type TaskPropsType = {
    task: TaskType
    index: number
}

export const TaskCard = ({task, index}: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [taskTitle, setTaskTitleTitle] = useState<string>(task.title)
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (taskTitle.trim() !== '') {
            setIsEditMode(false)
            dispatch(taskSlice.actions.changeTaskTitle({task: {...task, title: taskTitle}, index}))

        } else {
            setError('Title is required!')
        }
    }

    const deleteTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(taskSlice.actions.deleteTask({task, index}))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitleTitle(e.currentTarget.value)
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div className={'TaskCard'}
                     onClick={() => setIsEditMode(true)}
                     onBlur={() => setIsEditMode(false)}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                >
                    {isEditMode ?
                        (
                            <>
                                <input placeholder={error ?? ''}
                                       type={'text'}
                                       value={taskTitle}
                                       onChange={onChangeHandler}
                                />
                                <button onClick={changeTaskTitleHandler}>
                                    <CheckmarkIcon width={20} height={20}/>
                                </button>
                            </>
                        )
                        : (
                            <>
                                {task.title}
                                <button onClick={deleteTaskHandler}>
                                    <BasketIcon width={20} height={20}/>
                                </button>
                            </>
                        )}
                </div>
            )}
        </Draggable>
    )
}
