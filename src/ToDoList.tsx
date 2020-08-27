import React, {ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";


// Типизация
type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};


type PropsType = {
    id: string
    title: string,
    inputText: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    removeTask: (taskID: string, todoListID: string) => void,
    changeFilter: (value: FilterValuesType, todoListID: string) => void,
    setToDoTitle: (value: string) => void,
    addTask:(todoListID: string) => void,
    changeTaskStatus:(id: string, isDone: boolean, todoListID: string) => void,
    setError: string | null,
    error: string | null,
    giveFilter: string,
    selectedAll: (value: boolean, todoListID: string) => void,
    removeTodoList: (todoListID: string) => void
}

export function ToDoList(props: PropsType) {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setToDoTitle(event.currentTarget.value)
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13){props.addTask(props.id)}
    };

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

    const onClickHandler = () => {
        props.addTask(props.id)
    };
    const isSelectedAll = props.tasks.every(task => task.isDone);

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3><button onClick={()=>{
                    props.removeTodoList(props.id)
            }}> Delete list</button>
                <div>
                    <input type={'text'}
                           value={props.inputText}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={props.error ? 'error' : ''}
                    />
                    <button onClick={onClickHandler}>add
                    </button>
                    <input type={'checkbox'} checked={isSelectedAll} onChange={allSelectedHandler}/><span>Selected all</span>
                    {props.error && <div className={'error-message'}>{props.setError}</div> }
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

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done': ''}>
                                    <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                                    <span>{task.title}</span>
                                    <button onClick={removeTask}>x
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button onClick={onAllClickHandler} className={props.giveFilter === 'all' ? 'active-filter' : ''}>All
                    </button>
                    <button onClick={onActiveClickHandler} className={props.giveFilter === 'active' ? 'active-filter' : ''}>Active
                    </button>
                    <button onClick={onCompletedClickHandler} className={props.giveFilter === 'complete' ? 'active-filter' : ''}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}