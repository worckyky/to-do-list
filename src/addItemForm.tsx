import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from '@material-ui/core'
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void;
}

export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onAddTaskClick = () => {
        if (title.trim()) {
            addItem(title.trim());
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
        if (event.key === 'Enter') {
            onAddTaskClick()
        }
    };
    return (
        <div>
            <TextField
                type={'text'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                // className={error ? 'error' : ''}
                error={!!error}
                helperText={error}
                label={'Title'}
                variant={"standard"}
            />

            {/*<input type={'text'}*/}
            {/*       value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            <IconButton onClick={onAddTaskClick}
                        color={"primary"}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
}
