// useTodoStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

// Определяем интерфейс для задачи
interface Todo {
    id: number;
    text: string;
}

// Определяем интерфейс для состояния хранилища
interface TodoStore {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: number) => void;
    clearTodos: () => void;
}

// Создаем Zustand store с использованием persist и immer
const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            todos: [],
            addTodo: (todo: Todo) => set(produce((state: TodoStore) => {
                state.todos.push(todo);
            })),
            removeTodo: (id: number) => set(produce((state: TodoStore) => {
                state.todos = state.todos.filter(todo => todo.id !== id);
            })),
            clearTodos: () => set({ todos: [] }),
        }),
        {
            name: 'todo-storage', // имя для локального хранилища
        }
    )
);

export default useTodoStore;
