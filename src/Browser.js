import React, { Component } from 'react';
import {observable,autorun,computed} from 'mobx';
import {observer} from 'mobx-react';

import Column from './Column';

export default class Browser extends Component {
  @observable columns = [];
  @observable selections = {};

  render() {
    let model;
    try {
      model = JSON.parse(this.props.json);
    } catch (exception) {
      return (<div>Error while parsing JSON: {exception.message}</div>);
    }
    this.columns = generateColumnsForSelectedKeys(this.selections, model)
    return (
      <div className="browser">
      {this.columns.map((column, index) => (
        <Column key={index} items={column.items} selections={column.selections} onChange={this.handleChange.bind(this)} />
      ))}
      </div>
    )
  }
  handleChange() {
    this.forceUpdate();
  }
}

const generateColumnsForSelectedKeys = function(selections, model) {
  var columns = []
  var iterSelections = selections;
  var iterModel = model;

  while (iterModel) {
    if (isScalar(iterModel)) break;
    autoInitSelectedKey(iterSelections, iterModel);
    var column = {
      items: convertToColumnItems(iterModel, iterSelections.selectedKey),
      selections: iterSelections
    }
    columns.push(column);
    if (iterSelections.selectedKey === undefined) break;
    autoInitChildren(iterSelections, iterModel);
    iterModel = iterModel[iterSelections.selectedKey];
    iterSelections = iterSelections.children[iterSelections.selectedKey];
  }
  return columns;
}

const autoInitSelectedKey = function(selections, model) {
  if (selections.selectedKey === undefined) {
    for (var key in model) {
      if (!isScalar(model[key])) { // select first key that has a non-scalar value
        selections.selectedKey = key;
        return;
      }
    }
  }
}

const autoInitChildren = function(selections, model) {
  if (selections.children === undefined) {
    selections.children = {};
  }
  for (var key in model) {
    if (selections.children[key] === undefined) {
      selections.children[key] = {};
    }
  }
}

const convertToColumnItems = function (json, selectedKey) {
  const keys = Object.keys(json);
  return keys.map((key) => {
    const value = json[key];
    return {
      key: key,
      type: getType(value),
      value: isScalar(value) ? value : undefined,
      count: getCount(value),
      selected: selectedKey === key
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
  if (isArray(value)) {
    return value.length;
  } else if (isObject(value)) {
    return Object.keys(value).length;
  }
}

const isScalar = function (value) {
  const type = getType(value);
  return type != 'object' && type != 'array';
}

const isArray = function (value) {
  return Array.isArray(value);
}

const isObject = function (value) {
  return (typeof value === 'object') && value !== null
}
