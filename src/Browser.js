import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import Column from './Column';

export default class Browser extends Component {
  @observable columns = [];

  render() {
    let model;
    try {
      model = JSON.parse(this.props.json);
    } catch (exception) {
      return (<div>Error while parsing JSON: {exception.message}</div>);
    }
    this.columns = [
      {
        key: '0',
        items: convertToColumnItems(model)
      }
    ];
    return (
      <div className="browser">
      {this.columns.map((column, index) => (
        <Column key={index} items={column.items} onSelectedKey={this.handleSelectedKey} />
      ))}
      </div>
    )
  }
  handleSelectedKey(key) {

  }
}

const convertToColumnItems = function (json) {
  const keys = Object.keys(json);
  return keys.map((key) => {
    const value = json[key];
    return {
      key: key,
      type: getType(value),
      value: isScalar(value) ? value : undefined,
      count: getCount(value)
    }
  })
}


const getType = function (value) {
  if (value === null) {
    return 'null';
  } else if (Array.isArray(value)) {
    return 'array';
  } else {
    return typeof value;
  }
}

const getCount = function (value) {
  if (Array.isArray(value)) {
    return value.length;
  } else if (typeof value === 'object') {
    return Object.keys(value).length;
  }
}

const isScalar = function (value) {
  const type = getType(value);
  return type != 'object' && type != 'array';
}
