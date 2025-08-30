import React from 'react';
import '../styles/TodoSort.css';

function TodoSort({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'createdAt', label: '创建时间' },
    { value: 'priority', label: '优先级' },
    { value: 'dueDate', label: '截止日期' },
    { value: 'text', label: '任务名称' }
  ];

  return (
    <div className="todo-sort">
      <label htmlFor="sort-select">排序方式：</label>
      <select 
        id="sort-select"
        value={sortBy} 
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TodoSort;