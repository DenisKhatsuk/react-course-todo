import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: '',
  };

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    });
    
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form 
        className = "item-add-form d-flex"
        onSubmit = { this.onSubmit }
      >
        <input 
          type = "text" 
          name = "add-item"
          autoComplete="off"
          placeholder = "Add new item"
          className = "form-control"
          onChange = { this.onChange }
          value = { this.state.label }
        />
        <button type = "button"
                className = "btn btn btn-outline-primary btn-md"
                onClick = { this.onSubmit }
        >
          Add Item
        </button>
      </form>
    );
  }

};
