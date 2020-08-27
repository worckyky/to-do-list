import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from 'uuid'

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed';

type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string] : Array<TaskType>
}



function App() {
    // Хук
    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true,},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false,}
    // ]);


    let [toDoTitle, setToDoTitle] = useState<string>('');
    // let [filter, setFilter] = useState<FilterValuesType>("all");
    let [error, setError] = useState<string | null>(null);
    let todoListID1 = v1();
    let todoListID2 = v1();
    let [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Dobri den', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState <TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true,},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false,}
        ],
        [todoListID2]: [
            {id: v1(), title: "Dog", isDone: true,},
            {id: v1(), title: "Cat", isDone: true},
            {id: v1(), title: "Bitch", isDone: false,}]
    });

    // function changeFilter(value: FilterValuesType) {
    //     setFilter(value);
    // }


    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todoList = todoLists.find(tl => tl.id === todolistID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    const removeTask = (taskID: string, todolistID: string) => {
        let todoList = tasks[todolistID];
        tasks[todolistID] = todoList.filter(task => task.id !== taskID);
        setTasks({...tasks})
    };

    const addTask = (todoListID: string) => {

        let newTask =  {
            id: v1(),
            title: toDoTitle,
            isDone: false
        };

        let todoList = tasks[todoListID];

        if (toDoTitle.trim() !== '') {
            tasks[todoListID] = [newTask, ...todoList];
            setTasks({...tasks});
            setToDoTitle('');
            setError('');
        } else {
            setError('Field is required')
        }
    };


    const changeStatus = (id: string, isDone: boolean, todoListID: string) => {
        let todoList = tasks[todoListID]
        let task = todoList.find(task => task.id === id);

        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }


    };

    const selectedAll = (value: boolean , todoListID: string) => {
        let todoList = tasks[todoListID];
        const newTasks = todoList.map(task => (
            {...task, isDone: value}
        ));
        setTasks({newTasks})
    };

    function removeTodolist(todoListID: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
        setTodoLists(newTodoLists);
        delete tasks[todoListID];
        setTasks({...tasks});

    }
    return (
        <div className={'App'}>
            {
                todoLists.map(todoList => {

                    let tasksForTodoList = tasks[todoList.id];

                    if (todoList.filter === 'active') {
                        tasksForTodoList = tasks[todoList.id].filter(task => task.isDone === false)
                    }

                    if (todoList.filter === 'completed') {
                        tasksForTodoList = tasks[todoList.id].filter(task => task.isDone === true)
                    }


                    return (
                        <ToDoList
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            inputText={toDoTitle}
                            setToDoTitle={setToDoTitle}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            error={error}
                            setError={error}
                            giveFilter={todoList.filter}
                            selectedAll={selectedAll}
                            id={todoList.id}
                            key={todoList.id}
                            title={todoList.title}
                            filter={todoList.filter}
                            removeTodoList={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}


export default App;
