import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

export default class EntryForm extends Component {
  render() {
    return (
      <form className="entry-form" onSubmit={this.handleSubmit}>
        <div>
          <textarea name="json" style={{width: 600, height: 400}}/>
        </div>
        <div>
          <input type="submit"/>
        </div>
      </form>
    )
  }
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.onInput(ev.target.elements.namedItem('json').value);
  }
}
