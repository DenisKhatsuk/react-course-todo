import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  idCounter = 0;

  createTodoItem = (label = 'New Item') => {
    return {
      label,
      important: false,
      done: false,
      id: this.idCounter++,
    };
  };

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    filterState: 'all',
    searchValue: '',
  };

  deleteTodoItem = (id) => {
    this.setState(({ todoData }) => {
      const itemToModifyIndex = todoData.findIndex((el) => el.id === id );
      return {
        todoData: [
          ...todoData.slice(0, itemToModifyIndex),
          ...todoData.slice(itemToModifyIndex + 1),
        ],
      };
    });
  };

  addTodoItem = (label) => {
    this.setState(( { todoData } ) => {
      return {
        todoData: [...todoData, this.createTodoItem(label)],
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const itemToModifyIndex = arr.findIndex((el) => el.id === id );
    const itemToModify = arr[itemToModifyIndex];
    const modifiedItem = {...itemToModify, [propName]: !itemToModify[propName]};
    
    return [
      ...arr.slice(0, itemToModifyIndex),
      modifiedItem,
      ...arr.slice(itemToModifyIndex + 1),
    ];
  }

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    });
  }
  
  toggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      }
    });
  }

  onFilterClick = (clickedButtonName) => {
    this.setState({
      filterState: clickedButtonName
    });
  };

  filterByDoneState = (items) => {
    if (this.state.filterState === 'active') {
      return items.filter((item) => !item.done);
    }
    if (this.state.filterState === 'done') {
      return items.filter((item) => item.done);
    }
    return items;
  };

  filterByValue = (items, value) => {
    if (!value) return items;
    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  };

  onSearchType = (value) => {
    this.setState({
      searchValue: value
    });
  };

  render() {
    const { todoData, searchValue, filterState } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    let visibleItems = this.filterByDoneState(todoData);
    visibleItems = this.filterByValue(visibleItems, searchValue);

    return (
      <div className="todo-app">
        <AppHeader 
          toDo={ todoCount } 
          done={ doneCount }
        />
        <div className="top-panel d-flex">
          <SearchPanel  
            onSearchType = { this.onSearchType }
          />
          <ItemStatusFilter
            onClick = { this.onFilterClick }
            filterState = { filterState }
          />
        </div>
  
        <TodoList 
          todos={ visibleItems }
          onDeleted = { this.deleteTodoItem }
          onToggleDone = { this.toggleDone }
          onToggleImportant = { this.toggleImportant }
        />
        <ItemAddForm onAdd = { this.addTodoItem } />
      </div>
    );
  }
};