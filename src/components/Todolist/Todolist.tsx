import React, {ChangeEvent, useState} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import {v4 as uuid} from 'uuid'

import {TaskCard} from '../TaskCard/TaskCard'
import PlusIcon from '../../assets/plus.svg?react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {taskSlice} from '../../store/slice/TaskSlice'
import './Todolist.css'
import type {StatusType} from '../../models/Models'

type TodolistPropsType = {
    title: string
    status: StatusType
}

export const Todolist = ({title, status}: TodolistPropsType) => {
    const {[status]: taskList} = useAppSelector(state => state.taskReducer)
    const dispatch = useAppDispatch()

    const [taskTitle, setTaskTitleTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            dispatch(taskSlice.actions.addTask({id: uuid(), status, title: taskTitle}))
            setTaskTitleTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitleTitle(e.currentTarget.value)
    }

    return (

        <div className={'Todolist'}>
            <h2>{title}</h2>
            <div
                className={'Todolist_InputForm'}
            >
                <input
                    className={'Todolist_Input'}
                    type={'text'}
                    placeholder={'Enter task title'}
                    value={taskTitle}
                    onChange={onChangeHandler}
                />
                <button type={'submit'} onClick={addTaskHandler}>
                    <PlusIcon width={16} height={16}/>
                </button>
            </div>
            {error ?? null}
            <Droppable droppableId={status}>
                {(provided) => (
                    <div className={'Todolist_TaskContainer'} ref={provided.innerRef} {...provided.droppableProps}>
                        {taskList.map((task, index) => <TaskCard key={task.id} task={task} index={index}/>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>

    )
}
