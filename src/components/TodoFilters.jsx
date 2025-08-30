import React from 'react';
import '../styles/TodoFilters.css';

function TodoFilters({ 
  currentFilter, 
  onFilterChange, 
  activeCount, 
  completedCount, 
  onClearCompleted 
}) {
  const filters = [
    { value: 'all', label: '全部', count: activeCount + completedCount },
    { value: 'active', label: '进行中', count: activeCount },
    { value: 'completed', label: '已完成', count: completedCount }
  ];

  return (
    <div className="todo-filters">
      <div className="filter-tabs">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-tab ${currentFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
            <span className="count-badge">{filter.count}</span>
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button 
          className="clear-completed-btn"
          onClick={onClearCompleted}
        >
          清除已完成
        </button>
      )}
    </div>
  );
}

export default TodoFilters;