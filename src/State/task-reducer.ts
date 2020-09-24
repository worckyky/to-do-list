import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todo-list-reducer";

enum CONS {
    REMOVE_TASK = 'REMOVE-TASK',
    ADD_TASK = 'ADD-TASK',
    CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
}

export type RemoveTaskActionType = {
    type: CONS.REMOVE_TASK,
    taskID: string
    todolistID: string
}

export type AddTaskActionType = {
    type: CONS.ADD_TASK,
    title: string,
    todoListID: string
}

export type ChangeTaskStatusActionType = {
    type: CONS.CHANGE_TASK_STATUS,
    taskID: string,
    isDone: boolean,
    todoListID: string,
}

export type ChangeTaskTitleActionType = {
    type: CONS.CHANGE_TASK_TITLE,
    taskID: string,
    title: string,
    todoListID: string,
}


export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    let copyState;
    switch (action.type) {
        case CONS.REMOVE_TASK:
            copyState = {...state};
            let todoListTasks = copyState[action.todolistID];
            copyState[action.todolistID] = todoListTasks.filter(task => task.id !== action.taskID);
            return copyState;

        case  CONS.ADD_TASK:
            copyState = {...state}
            let tasks = copyState[action.todoListID];

            let newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            let newTasks = [newTask, ...tasks];

            copyState[action.todoListID] = newTasks;

            return copyState;

        case  CONS.CHANGE_TASK_STATUS:
            copyState = {...state};

            let todoListCopy1 = copyState[action.todoListID];
            let task1 = todoListCopy1.find(task => task.id === action.taskID);
            if (task1) {
                task1.isDone = action.isDone;
                return {...state}
            }
            return copyState;

        case  CONS.CHANGE_TASK_TITLE:
            copyState = {...state};
            let todoListCopy2 = copyState[action.todoListID];
            let task2 = todoListCopy2.find(task => task.id === action.taskID);

            if (task2) {
                task2.title = action.title
                return {...state}
            }
            return copyState
        case "ADD-TODOLIST":
            copyState = {...state};
            copyState[action.todoListID] = [];
            return copyState;
        case "REMOVE-TODOLIST":
            copyState = {...state};
            delete copyState[action.id]
            return copyState
        default:
            throw new Error('I dont understand this type')
    }
}


export const RemoveTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: CONS.REMOVE_TASK,
        taskID: taskID,
        todolistID: todolistID
    }
};

export const AddTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {
        type: CONS.ADD_TASK,
        title: title,
        todoListID: todoListID
    }
};

export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {
        type: CONS.CHANGE_TASK_STATUS,
        taskID: taskID,
        isDone: isDone,
        todoListID: todoListID,
    }
}

export const ChangeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {
        type: CONS.CHANGE_TASK_TITLE,
        taskID: taskID,
        title: title,
        todoListID: todoListID,
    }
}