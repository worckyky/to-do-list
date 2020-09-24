import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from './addItemForm'
import EditableSpan from "./EditableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};


type PropsType = {
    id: string
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    removeTask: (taskID: string, todoListID: string) => void,
    changeFilter: (value: FilterValuesType, todoListID: string) => void,
    addTask: (title: string, todoListID: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void,
    selectedAll: (value: boolean, todoListID: string) => void,
    removeTodoList: (todoListID: string) => void,
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function ToDoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    // let [title, setTitle] = useState<string>('');
    // let [error, setError] = useState<string | null>(null);

    // const onAddTaskClick = () => {
    //     if (title.trim()) {
    //         props.addTask(title.trim(), props.id);
    //         setTitle('');
    //     } else {
    //         setError('Title is required')
    //     }
    // };
    //
    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setError(null);
    //     setTitle(event.currentTarget.value)
    // };
    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (event.charCode === 13) {
    //         onAddTaskClick()
    //     }
    // };

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    };
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    };

    const allSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.selectedAll(event.currentTarget.checked, props.id);
    };

    const isSelectedAll = props.tasks.every(task => task.isDone);


    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    return (
        <div className="App">

            <div>
                <h3>
                    <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                    {/*<button onClick={()=>{*/}
                    {/*    props.removeTodoList(props.id)*/}
                    {/*}}> Delete list</button>*/}
                    <IconButton
                        onClick={()=>{
                        props.removeTodoList(props.id)
                    }}>
                        <Delete/>
                    </IconButton>
                </h3>
                <div>
                    <AddItemForm addItem={addTask}/>
                    <Checkbox checked={isSelectedAll} onChange={allSelectedHandler}/>
                    <span>Selected all</span>
                </div>
                <ul>
                    {
                        props.tasks.map(task => {

                            const removeTask = () => {
                                props.removeTask(task.id, props.id)
                            };
                            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = event.currentTarget.checked;
                                props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                            };
                            const changeTaskTitle = (title: string) => {
                                props.changeTaskTitle(task.id, title, props.id)
                            }

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done': ''}>
                                    <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                                    <EditableSpan value={task.title} changeValue={changeTaskTitle}/>
                                        <IconButton onClick={removeTask}>
                                            <Delete/>
                                        </IconButton>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <Button onClick={onAllClickHandler}
                            color={props.filter === 'all' ? 'secondary' : 'primary'}
                            variant={props.filter === 'all' ? 'contained' : 'outlined'}>
                            All
                    </Button>
                    <Button onClick={onActiveClickHandler}
                            color={props.filter === 'active' ? 'secondary' : 'primary'}
                            variant={props.filter === 'all' ? 'contained' : 'outlined'}>
                            Active
                    </Button>
                    <Button onClick={onCompletedClickHandler}
                            color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            variant={props.filter === 'all' ? 'contained' : 'outlined'}>
                            Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}