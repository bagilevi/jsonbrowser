import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

export default class Browser extends Component {
  render() {
    return (
      <div className="browser">
        {this.props.json}
      </div>
    )
  }
}
