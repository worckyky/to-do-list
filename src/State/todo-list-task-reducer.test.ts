import {TaskStateType, ToDoListType} from "../App";
import {AddTodoListAC, todoListReducer} from "./todo-list-reducer";
import {taskReducer} from "./task-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<ToDoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
});
