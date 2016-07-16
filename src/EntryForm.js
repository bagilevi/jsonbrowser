import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

export default class EntryForm extends Component {
  render() {
    return (
      <form className="entry-form">
        <textarea name="json" placeholder="Paste your JSON here" onChange={this.handleSubmit}>{this.props.json}</textarea>
      </form>
    )
  }
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.onInput(ev.target.value);
  }
}
