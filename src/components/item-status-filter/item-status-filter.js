import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'},
  ];

  render() {
    const { 
      onClick,
      filterState 
    } = this.props;
    const buttons = this.buttons.map(({name, label}) => {
      const clazz = filterState === name ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button 
          type="button"
          key = { name }
          className = {`btn ${clazz}`}
          onClick = { () => onClick(name) }
        >
          { label }
        </button>  
      );
    });
    
    return (
      <div className="btn-group">
        { buttons }
      </div>
    );
  }
}
