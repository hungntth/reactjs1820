import React, { useState } from 'react';
import { Todo } from '../../@types/todo.type';
import styles from './taskInput.module.scss'

interface TaskInputProps {
    addTodo: (name: string) => void
    currentTodo: Todo | null
    editTodo: (name: string) => void
    editFinishTodo: () => void
}

const TaskInput = (props: TaskInputProps) => {

    const { addTodo, currentTodo, editTodo, editFinishTodo } = props;
    const [name,setName] = useState<string>('');

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(currentTodo){
            editFinishTodo()
            if(name) setName('')
        }else{
            addTodo(name);
            setName('');
        }
    }

    const onChangeInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if(currentTodo){
            editTodo(value);
        } else{
            setName(value);
        }
    }


    return (
        <div className = 'mb-2'>
            <h1 className={styles.title}>To do list typeScript</h1>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder='caption goes here' value = {currentTodo ? currentTodo.name : name} onChange= {onChangeInput}/>
                <button type='submit'>{currentTodo ? '✔' : '➕'}</button>
            </form>
        </div>
    );
};

export default TaskInput;