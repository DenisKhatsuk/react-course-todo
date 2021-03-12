import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    value: ''
  };

  onChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
    this.props.onSearchType(value);
  };

  render() {
    return (
        <input 
          type="text"
          className="form-control search-input"
          placeholder="Type to search"
          onChange = { this.onChange }
        />
    );
  }
};
