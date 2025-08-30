import React, { useState } from 'react';
import '../styles/TodoForm.css';

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim(), priority, dueDate || null);
      setInputValue('');
      setPriority('medium');
      setDueDate('');
      setShowAdvanced(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className={`input-container ${isFocused ? 'focused' : ''}`}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="添加新的待办事项..."
          className="todo-input"
        />
        <button 
          type="submit" 
          className="add-button"
          disabled={!inputValue.trim()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          添加
        </button>
      </div>
      
      <button 
        type="button" 
        className="advanced-toggle"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? '收起高级选项' : '显示高级选项'}
      </button>

      {showAdvanced && (
        <div className="advanced-options">
          <div className="form-group">
            <label>优先级：</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>截止日期：</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoForm;