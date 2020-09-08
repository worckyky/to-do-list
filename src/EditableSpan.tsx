import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    value: string,
    changeValue: (value: string) => void
}

const EditableSpan: React.FC<EditableSpanType> = ({value, changeValue}) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);
    const activatedEditMode = () => {
        setEditMode(true)
    }

    const inputKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEditMode(false)
            if (title.trim()){
                changeValue(title)
            }
        }
    }

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const deActivatedEditMode = () => {
        setEditMode(false)
        if (title.trim()){
            changeValue(title)
        }
    }


    return editMode
        ? <TextField value={title}
                     onBlur={deActivatedEditMode}
                     autoFocus={true}
                     onChange={inputChangeHandler}
                     onKeyPress={inputKeyPressHandler}
                     variant={"outlined"}/>
        :
        <span onClick={activatedEditMode}>{value}</span>

}

export default EditableSpan