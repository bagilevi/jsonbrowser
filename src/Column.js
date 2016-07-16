import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

/*
    props:
      - items
        - []
          - key
          - type : {null|number|boolean|string|array|object}
          - value
          - count
          - selected
      - selections
      - onChange
*/
export default class Column extends Component {
  render() {
    return (
      <div className="column">
        {
          this.props.items.map((item, index) => {
            var selectedClass = (item.selected ? 'selected' : null);
            return (
              <div className={["column-item", selectedClass].join(' ')} key={index} onClick={this.handleClick.bind(this, item)}>
                <span className="key">{item.key}</span>
                <span className="punctuation">: </span>
                <span className={this.classNameForItem(item)}>{this.valuify(item)}</span>
                {this.renderObjectSummary(item)}
                {this.renderArraySummary(item)}
              </div>
            )
          })
        }
      </div>
    )
  }
  handleClick(item) {
    this.props.selections.selectedKey = item.key;
    this.props.onChange();
  }
  classNameForItem(item) {
    if (item.type == 'boolean' || item.type === 'null') {
      return `${JSON.stringify(item.value)}-value`
    } else {
      return `${item.type}-value`
    }
  }
  renderObjectSummary(item) {
    if (item.type === 'object') {
      return <span className="object-summary">{"{"}<span className="number">{}</span>{"}"}</span>
    }
  }
  renderArraySummary(item) {
    if (item.type === 'array') {
      return <span className="array-summary">{"["}<span className="number">{item.count}</span>{"]"}</span>
    }
  }
  valuify(item) {
    return JSON.stringify(item.value);
  }
}
