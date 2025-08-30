import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoSort from './components/TodoSort';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: '学习 React', completed: false, priority: 'high', createdAt: new Date().toISOString() },
      { id: 2, text: '构建 TodoList 应用', completed: false, priority: 'medium', createdAt: new Date().toISOString() },
      { id: 3, text: '喝咖啡休息一下', completed: true, priority: 'low', createdAt: new Date().toISOString() }
    ];
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority = 'medium', dueDate = null) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString()
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

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium'];
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'text':
        return a.text.localeCompare(b.text);
      case 'createdAt':
      default:
        return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
    }
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
          <div className="controls-row">
            <TodoFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeTodosCount}
              completedCount={todos.length - activeTodosCount}
              onClearCompleted={clearCompleted}
            />
            <TodoSort
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
          
          <TodoList
            todos={sortedTodos}
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