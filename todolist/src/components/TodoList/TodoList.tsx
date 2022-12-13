import { useState } from 'react';
import { Todo } from '../../@types/todo.type';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList/TaskList';
import styles from './todoList.module.scss';

const TodoList = () => {
    const [todo, setTodo] = useState<Todo[]>([]);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

    const doneTodos = todo.filter(todo => todo.done);
    const notDoneTodos = todo.filter(todo => !todo.done);

    const handleDoneTodo = (id: string, done: boolean) => {
        setTodo(prev => {
            return prev.map(todo => {
                if (todo.id === id) {
                    return { ...todo, done }
                }
                return todo
            })
        })
    }

    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        setTodo((prev) => [...prev, todo])
    }

    const startEditTodo = (id: string) => {
        const findedTodo = todo.find((todo) => todo.id === id);
        if (findedTodo) {
            setCurrentTodo(findedTodo)
        }
    }

    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) {
                return { ...prev, name }
            }
            return null
        });
    }

    const editFinishTodo = () => {
        setTodo((prev) => {
            return prev.map(todo => {
                if (todo.id === (currentTodo as Todo).id) {
                    return currentTodo as Todo
                } return todo
            })
        })
        setCurrentTodo(null)
    }


    const deleteTodo = (id: string) => {
        if(currentTodo){
            setCurrentTodo(null)
        }
        setTodo((prev) => {
            const findedIndexTodo = prev.findIndex(todo => todo.id === id)
            if (findedIndexTodo > -1) {
                const result = [...prev]
                prev.splice(findedIndexTodo, 1);
                return result
            }
            return prev
        })
    }

    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                TodoList
                <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} editFinishTodo={editFinishTodo} />
                <TaskList doneTaskList={false} todos={notDoneTodos} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
                <TaskList doneTaskList={true} todos={doneTodos} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
            </div>
        </div>
    );
};

export default TodoList;