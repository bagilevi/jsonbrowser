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
      - onSelectedKey
*/
export default class Column extends Component {
  render() {
    return (
      <div className="column">
        {
          this.props.items.map((item, index) => (
            <div className="column-item" key={index}>
              <span>{item.key}</span>
              <span>: </span>
              <span>{item.value}</span>
            </div>
          ))
        }
      </div>
    )
  }
}
