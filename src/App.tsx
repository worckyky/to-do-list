import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from 'uuid'
import {AddItemForm} from './addItemForm';
import {Button, IconButton, Toolbar, Typography, AppBar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {


    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Dobri den', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TaskStateType>({
        ['todoListID1']: [
            {id: v1(), title: "HTML&CSS", isDone: true,},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false,}
        ],
        ['todoListID2']: [
            {id: v1(), title: "Dog", isDone: true,},
            {id: v1(), title: "Cat", isDone: true},
            {id: v1(), title: "Rich", isDone: false,}]
    });

    function AddTodoList(title: string) {
        let newTodoListID = v1();
        let newTodoList: ToDoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        // Создаем новый тудулист
        setTodoLists([...todoLists, newTodoList]);
        // Создаем новое место для задач по новый тудулист
        // Используем предыдущие задачи и кладем новый массив
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todoList = todoLists.find(tl => tl.id === todolistID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    const removeTask = (taskID: string, todolistID: string) => {
        // Зачем мы создаем промежуточную переменную?
        let todoList = tasks[todolistID];
        // Мы при помощи ссылки перезаписываем новый данные в уже существующий массив?
        tasks[todolistID] = todoList.filter(task => task.id !== taskID);
        setTasks({...tasks})
    };

    const addTask = (title: string, todoListID: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let todoList = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoList];
        setTasks({...tasks});
    };


    const changeStatus = (id: string, isDone: boolean, todoListID: string) => {

        let todoList = tasks[todoListID];
        let task = todoList.find(task => task.id === id);

        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    };

    const selectedAll = (value: boolean, todoListID: string) => {
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

    const changeTaskTitle = (id: string, title: string, todoListID: string) => {

        let todoList = tasks[todoListID];
        let task = todoList.find(task => task.id === id);

        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    };
    const changeTodoListTitle = (title: string, todoListID: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListID);

        if (todoList) {
            todoList.title = title;
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className={'App'}>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container>
                    <AddItemForm addItem={AddTodoList}/>
                </Grid>
                <Grid container spacing={3}>
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
                                <Grid item
                                      key={todoList.id}>
                                    <Paper style={{padding: "10px"}}>
                                    <ToDoList
                                        id={todoList.id}
                                        title={todoList.title}
                                        filter={todoList.filter}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        selectedAll={selectedAll}
                                        removeTodoList={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}


export default App;
