import { useEffect, useState } from 'react';
import { Todo } from '../../@types/todo.type';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList/TaskList';
import styles from './todoList.module.scss';

// interface handleNewTodos {
//     (todo: Todo[]): Todo[]
// }

type handleNewTodos =(todo: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: handleNewTodos) => {
    const todosString = localStorage.getItem('todos');
    const todosObj: Todo[] = JSON.parse(todosString || '[]');
    const newTodosObj = handleNewTodos(todosObj)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

const TodoList = () => {
    const [todo, setTodo] = useState<Todo[]>([]);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
    const doneTodos = todo.filter(todo => todo.done);
    const notDoneTodos = todo.filter(todo => !todo.done);

    useEffect(() => {
        const todosString = localStorage.getItem('todos');
        const todosObj: Todo[] = JSON.parse(todosString || '[]');
        setTodo(todosObj)
    },[])

    const handleDoneTodo = (id: string, done: boolean) => {
        const handler = (todosObj: Todo[]) => {
            return todosObj.map(todo => {
                if (todo.id === id) {
                    return { ...todo, done }
                }
                return todo
            })
        }
        setTodo(handler);
        syncReactToLocal(handler);
    }

    const addTodo = (name: string) => {
        const handler = (todosObj: Todo[]) => {
            return [...todosObj, todoz]
        }
        const todoz: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        setTodo(handler)
        syncReactToLocal(handler)
       
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
        const handler = (todosObj: Todo[]) => {
            return todosObj.map(todo => {
                if (todo.id === (currentTodo as Todo).id) {
                    return currentTodo as Todo
                } return todo
            })
        }
        setTodo(handler)
        setCurrentTodo(null);
        syncReactToLocal(handler);
    }


    const deleteTodo = (id: string) => {
        if(currentTodo){
            setCurrentTodo(null)
        }
        const handler = (todosObj: Todo[]) => {
            const findedIndexTodo = todosObj.findIndex(todo => todo.id === id)
            if (findedIndexTodo > -1) {
                const result = [...todosObj]
                result.splice(findedIndexTodo, 1);
                return result
            }
            return todosObj
        }
        setTodo(handler);
        syncReactToLocal(handler);
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