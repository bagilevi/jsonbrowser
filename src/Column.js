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
                <span className={this.classNameForItem(item)}>{JSON.stringify(item.value)}</span>
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
}
