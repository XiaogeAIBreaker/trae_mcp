import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: '学习 React', completed: false },
      { id: 2, text: '构建 TodoList 应用', completed: false },
      { id: 3, text: '喝咖啡休息一下', completed: true }
    ];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>我的待办清单</h1>
          <p className="subtitle">保持专注，完成任务 ✨</p>
        </header>

        <TodoForm onAddTodo={addTodo} />
        
        <div className="todo-section">
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeTodosCount}
            completedCount={todos.length - activeTodosCount}
            onClearCompleted={clearCompleted}
          />
          
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>

        {todos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>没有待办事项</h3>
            <p>添加你的第一个任务开始吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;