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
      - onSelectedKey
*/
export default class Column extends Component {
  render() {
    return (
      <div className="column">
        {
          this.props.items.map((item, index) => {
            var selectedClass = (item.selected ? 'selected' : null);
            return (
              <div className={["column-item", selectedClass].join(' ')} key={index}>
                <span>{item.key}</span>
                <span>: </span>
                <span>{item.value}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
}
