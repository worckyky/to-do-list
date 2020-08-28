import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type TaskType = {
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
    removeTodoList: (todoListID: string) => void
}

export function ToDoList(props: PropsType) {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onAddTaskClick = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.id);
            setTitle('');
        } else {
            setError('Title is required')
        }
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(event.currentTarget.value)
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13) {
            onAddTaskClick()
        }
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

    const isSelectedAll = props.tasks.every(task => task.isDone);

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3><button onClick={()=>{
                    props.removeTodoList(props.id)
            }}> Delete list</button>
                <div>
                    <input type={'text'}
                           value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={onAddTaskClick}>add
                    </button>
                    <input type={'checkbox'} checked={isSelectedAll} onChange={allSelectedHandler}/><span>Selected all</span>
                    {error && <div className={'error-message'}>{error}</div> }
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
                    <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All
                    </button>
                    <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter' : ''}>Active
                    </button>
                    <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}