// TodoApp.tsx
import React, { useState } from 'react';
import useTodoStore from './useTodoStore';

// Компонент TodoApp
const TodoApp: React.FC = () => {
    const { todos, addTodo, removeTodo, clearTodos } = useTodoStore();
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            addTodo({ id: Date.now(), text: inputValue });
            setInputValue('');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Todo List</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Добавить задачу"
                style={{ width: '100%', padding: '10px' }}
            />
            <button onClick={handleAddTodo} style={{ padding: '10px', marginTop: '10px' }}>
                Добавить
            </button>
            <button onClick={clearTodos} style={{ padding: '10px', marginTop: '10px', marginLeft: '10px' }}>
                Очистить все
            </button>
            <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px' }}>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{todo.text}</span>
                        <button onClick={() => removeTodo(todo.id)} style={{ marginLeft: '10px' }}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
