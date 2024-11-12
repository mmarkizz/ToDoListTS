// useTodoStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

// Определяем интерфейс для задачи
interface Todo {
    id: number;
    text: string;
    completed: boolean; // новое свойство для состояния задачи
}

// Определяем интерфейс для состояния хранилища
interface TodoStore {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: number) => void;
    clearTodos: () => void;
    toggleTodo: (id: number) => void; // новая функция для переключения состояния
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
            toggleTodo: (id: number) => set(produce((state: TodoStore) => {
                const todo = state.todos.find(todo => todo.id === id);
                if (todo) {
                    todo.completed = !todo.completed; // переключаем состояние задачи
                }
            })),
        }),
        {
            name: 'todo-storage', // имя для локального хранилища
        }
    )
);

export default useTodoStore;
