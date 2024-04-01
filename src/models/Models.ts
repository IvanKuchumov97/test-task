export type TaskType = {
    title: string
    id: string
    status: StatusType
}

export type StatusType = 'planned' | 'inProgress' | 'done'