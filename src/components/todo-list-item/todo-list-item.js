import React from 'react';

import './todo-list-item.css';

const TodoListItem = (props) => {

    const { 
      label,
      done,
      important, 
      onDeleted, 
      onToggleDone, 
      onToggleImportant,
    } = props;

    let classes = 'todo-list-item';
    classes = done ? classes + ' done' : classes;
    classes = important ? classes + ' important' : classes;
  
    return (
      <span className={ classes }>
        <span
          className="todo-list-item-label"
          onClick = { onToggleDone }>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick = { onToggleImportant }>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick = { onDeleted }>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
}

export default TodoListItem;
