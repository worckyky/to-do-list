import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string,
    id: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType,
    id: string
}
type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListID
    }
};

export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    }
};

export const ChangeTodolistTitleAC = (filter: FilterValuesType, TodoListID: string  ) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: filter,
        id: TodoListID
    }
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, TodoListID: string  ) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: filter,
        id: TodoListID
    }
}




export const todoListReducer = (state: Array<ToDoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newToDoList: ToDoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            };
            return [...state, newToDoList];
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id);

            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
                return [...state]
            }
            return state;
        default:
            throw new Error('I dont understand this type')
    }
};

